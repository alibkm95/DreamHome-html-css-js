require('dotenv').config()
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

  const { email, name, phone, password } = req.body

  const emailAllreadyExist = await User.findOne({ email })

  if(emailAllreadyExist){
    throw new CustomError.BadRequestError('inserted email allready exist. please pick another one')
  }

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? "ROOTADMIN" : "USER"

  const verificationToken= crypto.randomBytes(40).toString('hex')

  const user = await User.create({email, name, phone, password, role, verificationToken})

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: process.env.ORIGIN
  })

  res.status(StatusCodes.CREATED).json({msg: 'your account created successfully. please verify your account with the verification email sent by us.'})
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