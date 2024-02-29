const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const { getAllViews, getSingleAdViews } = require('../controllers/viewController')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getAllViews)

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getSingleAdViews)

module.exports = router