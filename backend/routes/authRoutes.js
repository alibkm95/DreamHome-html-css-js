const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middlewares/authentication')

const {
  register,
  login,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', authenticateUser, logout)
router.post('/verifyEmail', verifyEmail)
router.post('/resetPassword', resetPassword)
router.post('/forgetPassword', forgetPassword)

module.exports = router