const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto')
const CustomError = require('../errors')
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermisions
} = require('../utils')

const getAllUsers = async (req, res) => {
  res.json({ msg: 'get all users' })
}

const getSingleUser = async (req, res) => {
  res.json({ msg: 'get single user' })
}

const showCurrentUser = async (req, res) => {
  res.json({ msg: 'show current user' })
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