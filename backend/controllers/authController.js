const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash
} = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
  res.json({ msg: 'register' })
}

const login = async (req, res) => {
  res.json({ msg: 'login' })
}

const logout = async (req, res) => {
  res.json({ msg: 'logout' })
}

const verifyEmail = async (req, res) => {
  res.json({ msg: 'verifyEmail' })
}

const forgetPassword = async (req, res) => {
  res.json({ msg: 'forgetPassword' })
}

const resetPassword = async (req, res) => {
  res.json({ msg: 'resetPassword' })
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
}