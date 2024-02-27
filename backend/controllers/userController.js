const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto')
const CustomError = require('../errors')
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
  const user = await User.findOne({ _id: req.params.id }).select('-password')

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
  res.json({ msg: 'update user role' })
}

const deleteUser = async (req, res) => {
  res.json({ msg: 'delete user' })
}

const uploadUserProfile = async (req, res) => {
  res.json({ msg: 'upload user profile' })
}

const bannUser = async (req, res) => {
  res.json({ msg: 'bann user' })
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