const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkpermissions = require('./checkpermissions');
const sendVerificationEmail = require('./sendVerificationEmail')
const sendResetPasswordEmail = require('./sendResetPasswordEmail')
const createHash = require('./createHash')
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkpermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash
};