const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserInfos,
  updateUserRole,
  deleteUser,
  uploadUserProfile,
  bannUser,
} = require('../controllers/userController')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getAllUsers)

router
  .route('/showMe')
  .get(authenticateUser, showCurrentUser)

router
  .route('/updateUser')
  .patch(authenticateUser, updateUserInfos)

router
  .route('/profile')
  .patch(authenticateUser, uploadUserProfile)

router
  .route('/updateUserRole/:id')
  .patch(authenticateUser, authorizePermissions('ROOTADMIN'), updateUserRole)

router
  .route('/deleteUser/:id')
  .delete(authenticateUser, authorizePermissions('ROOTADMIN'), deleteUser)

router
  .route('/bannUser/:id')
  .patch(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), bannUser)

router
  .route('/:id')
  .get(authenticateUser, getSingleUser)

module.exports = router