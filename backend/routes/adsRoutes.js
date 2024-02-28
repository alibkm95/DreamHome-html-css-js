const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  createNewAd,
  getAllAds,
  getSingleAd,
  updateAd,
  uploadAdImage,
  deleteAd
} = require('../controllers/adsController')

router
  .route('/')
  .get(getAllAds)
  .post(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), createNewAd)

router
  .route('/uploadImage')
  .post(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), uploadAdImage)

router
  .route('/:id')
  .get(getSingleAd)
  .patch(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), updateAd)
  .delete(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), deleteAd)

module.exports = router