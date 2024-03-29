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

  if (emailAllreadyExist) {
    throw new CustomError.BadRequestError('inserted email allready exist. please pick another one')
  }

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? "ROOTADMIN" : "USER"

  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({ email, name, phone, password, role, verificationToken })

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: process.env.ORIGIN
  })

  res.status(StatusCodes.CREATED).json({ msg: 'your account created successfully. please verify your account with the verification email sent by us.' })
}

const login = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('providing email and password is required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.UnauthenticatedError('no such a user with provided email address')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('password is incorrect')
  }

  const tokenUser = createTokenUser(user)

  let refreshToken = ''

  const existingToken = await Token.findOne({ user: user._id })

  if (existingToken) {
    const { isValid } = existingToken

    if (!isValid) {
      throw new CustomError.UnauthenticatedError('information is not valid')
    }

    refreshToken = existingToken.refreshToken
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ user: tokenUser })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')

  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId })

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })

  res.status(StatusCodes.OK).json({ msg: 'loged out successfully' })
}

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.UnauthenticatedError('error! no such a user exist.')
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('error! verification token is corrupted')
  }

  user.isVerified = true
  user.verifiedIn = Date.now()
  user.verificationToken = ''

  await user.save()

  const tokenUser = createTokenUser(user)

  let refreshToken = ''

  const existingToken = await Token.findOne({ user: user._id })

  if (existingToken) {
    const { isValid } = existingToken

    if (!isValid) {
      throw new CustomError.UnauthenticatedError('information is not valid')
    }

    refreshToken = existingToken.refreshToken
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ user: tokenUser, msg: 'your account verified successfully' })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')

  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })
  res.status(StatusCodes.OK).json({ user: tokenUser, msg: 'your account verified successfully' })
}

const forgetPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new CustomError.BadRequestError('email is required to send reset link')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.NotFoundError('there is no such a user with entered email')
  }

  const passwordToken = crypto.randomBytes(70).toString('hex')

  await sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: passwordToken,
    origin: process.env.RESET_ORIGIN
  })

  const tenMinutes = 1000 * 60 * 10
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

  user.passwordToken = createHash(passwordToken)
  user.passwordTokenExpirationDate = passwordTokenExpirationDate

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'reset password link sent to your email' })
}

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body

  if (!email || !password || !token) {
    throw new CustomError.BadRequestError('reset password error!')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.NotFoundError('there is no such a user')
  }

  const currentDate = new Date()

  if (user.passwordToken === createHash(token) && user.passwordTokenExpirationDate > currentDate) {
    user.password = password
    user.passwordToken = null
    user.passwordTokenExpirationDate = null

    await user.save()
  } else {
    throw new CustomError.BadRequestError('the rest password link is expired')
  }

  res.status(StatusCodes.OK).json({ msg: 'reseting password successfull' })
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
}