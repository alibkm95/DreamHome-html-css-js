const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermissions = require('./checkPrimissions');
const sendVerificationEmail = require('./sendVerificationEmail')
const sendResetasswordEmail = require('./sendResetPasswordEmail')
const createHash = require('./createHash')
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetasswordEmail,
  createHash
};