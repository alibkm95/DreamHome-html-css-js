const Ads = require('../models/Ads')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const fs = require('fs')
const path = require('path')

const createNewAd = async (req, res) => {

  req.body.creator = req.user.userId

  const {
    title,
    area,
    propType,
    adType,
    cover,
    panorama,
    rooms,
    description,
  } = req.body

  if (
    !title ||
    !area ||
    !propType ||
    !adType ||
    !cover ||
    !panorama ||
    !rooms ||
    !description
  ) {
    throw new CustomError.BadRequestError('necessary fields are not provided')
  }

  try {
    const ad = await Ads.create(req.body)
    res.status(StatusCodes.CREATED).json({ ad, msg: 'ad created successfully' })
  } catch (error) {
    throw new CustomError.BadRequestError('creating new ad failed')
  }
}

const getAllAds = async (req, res) => {
  res.json({ msg: 'getAllAds' })
}

const getSingleAd = async (req, res) => {
  res.json({ msg: 'getSingleAd' })
}

const updateAd = async (req, res) => {
  res.json({ msg: 'updateAd' })
}

const uploadAdImage = async (req, res) => {
  res.json({ msg: 'uploadAdImage' })
}

const deleteAd = async (req, res) => {
  res.json({ msg: 'deleteAd' })
}

module.exports = {
  createNewAd,
  getAllAds,
  getSingleAd,
  updateAd,
  uploadAdImage,
  deleteAd
}