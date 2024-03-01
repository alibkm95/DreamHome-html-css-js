const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  toggleSave,
  getAllSaves,
  getUsersSaves,
} = require('../controllers/savedController')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getAllSaves)
  .post(authenticateUser, toggleSave)

router
  .route('/u')
  .get(authenticateUser, getUsersSaves)

module.exports = router