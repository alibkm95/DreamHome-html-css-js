const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto')
const CustomError = require('../errors')
const fs = require('fs')
const path = require('path')
const {
  createTokenUser,
  attachCookiesToResponse,
  checkpermissions
} = require('../utils')

const getAllUsers = async (req, res) => {

  const { emailSearch, nameSearch, verified, userRole, banned } = req.query

  let queryObject = {}

  if (emailSearch) {
    queryObject.email = { $regex: emailSearch, $options: 'i' }
  }

  if (nameSearch) {
    queryObject.name = { $regex: nameSearch, options: 'i' }
  }

  if (verified) {
    queryObject.isVerified = verified === 'true' ? true : false
  }

  if (userRole) {
    queryObject.role = userRole === 'ADMIN' ? 'ADMIN' : 'USER'
  }

  if (banned) {
    queryObject.isBanned = banned === 'true' ? true : false
  }

  let result = User.find(queryObject).select('-password').sort('-createdAt')

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.itemPerPage) || 12
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const users = await result
  const totalUsers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalUsers / limit)

  res.status(StatusCodes.OK).json({ users, numOfPages, totalUsers })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password -passwordToken -passwordTokenExpirationDate -verificationToken')

  if (!user) {
    throw new CustomError.NotFoundError('there is no such a user')
  }

  checkpermissions(req.user, user._id)

  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUserInfos = async (req, res) => {

  const { email, name, phone } = req.body

  if (!email || !phone || !name) {
    throw new CustomError.BadRequestError('required parameters must be provided')
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.phone = phone
  user.name = name

  await user.save()

  const tokenUser = createTokenUser(user)

  await Token.findOneAndDelete({ user: user._id })

  const refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {

  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('required parapeters must be provided')
  }

  const user = await User.findOne({ _id: req.user.userId })

  const isPasswordCorrect = await user.comparePassword(oldPassword)

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('old password is not correct')
  }

  user.password = newPassword

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'password updated successfully' })
}

const updateUserRole = async (req, res) => {

  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError('there is no such a user')
  }

  if (user.role === 'ADMIN') {
    user.role = 'USER'
    user.save()
    res.status(StatusCodes.OK).json({ msg: 'user role updated successfully to USER' })
    return
  }

  if (user.role === 'USER') {
    user.role = 'ADMIN'
    user.save()
    res.status(StatusCodes.OK).json({ msg: 'user role updated successfully to ADMIN' })
    return
  }

  throw new CustomError.BadRequestError('requested action can not be done')
}

const deleteUser = async (req, res) => {

  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError('there is no such a user')
  }

  const profileImage = user.profile
  const profileImagePath = path.parse(profileImage);

  if (fs.existsSync(path.join(__dirname, `../public/uploads/profile/${profileImagePath.base}`))) {
    fs.unlinkSync(path.join(__dirname, `../public/uploads/profile/${profileImagePath.base}`), err => {
      if (err) console.log(err)
    })
  }

  await user.remove()

  res.status(StatusCodes.OK).json({ msg: 'user removed successfully' })
}

const uploadUserProfile = async (req, res) => {

  const user = await User.findOne({ _id: req.user.userId }).select('-password -passwordToken -passwordTokenExpirationDate -verificationToken')

  if (!user) {
    throw new CustomError.NotFoundError('there is no such a user')
  }

  checkpermissions(req.user, user._id)

  const profileDirectory = path.join(__dirname, '../public/uploads/profile');

  if (!fs.existsSync(profileDirectory)) {
    fs.mkdirSync(profileDirectory);
  }

  if (!req.files) {
    throw new CustomError.BadRequestError('no file selected for upload');
  }

  const profileImage = req.files.image;

  if (!profileImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('only image files allowed(*.png  *.jpg)');
  }

  const maxSize = 1024 * 1024;

  if (profileImage.size > maxSize) {
    throw new CustomError.BadRequestError('selected file size must be less than 1MB');
  }

  profileImage.name = profileImage.name.replaceAll(' ', '_');

  const fileName = `${new Date().getTime()}_${profileImage.name}`;

  const imagePath = path.join(__dirname, `../public/uploads/profile/${fileName}`);

  try {
    await profileImage.mv(imagePath);
  } catch (error) {
    throw new CustomError.BadRequestError('upload file error')
  }

  user.profile = `${req.protocol}://${req.get('host')}/uploads/profile/${fileName}`

  await user.save()

  res.status(StatusCodes.OK).json({ user });
}

const bannUser = async (req, res) => {

  const { id: userId } = req.params

  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError.NotFoundError('there is no such user')
  }

  const { isBanned } = user

  user.isBanned = isBanned ? false : true

  user.save()

  res.status(StatusCodes.OK).json({ msg: `the user ${user.name} | ${user.email} - is ${user.isBanned ? 'blocked' : 'unblocked'} successfully` })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserInfos,
  updateUserPassword,
  updateUserRole,
  deleteUser,
  uploadUserProfile,
  bannUser,
}