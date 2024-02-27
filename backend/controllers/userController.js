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
  res.json({ msg: 'update user infos' })
}

const updateUserPassword = async (req, res) => {
  res.json({ msg: 'update user pass' })
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