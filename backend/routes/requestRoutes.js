const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  createRequest,
  getAllRequests,
  getSingleRequest,
  getUserRequests,
  updateRequest,
  deleteRequest,
} = require('../controllers/requestController')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getAllRequests)
  .post(authenticateUser, createRequest)

router
  .route('/u')
  .get(authenticateUser, getUserRequests)

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getSingleRequest)
  .patch(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), updateRequest)
  .delete(authenticateUser, authorizePermissions('ROOTADMIN'), deleteRequest)

module.exports = router