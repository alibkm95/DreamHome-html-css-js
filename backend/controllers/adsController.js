const Ads = require('../models/Ads')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const fs = require('fs')
const path = require('path')

const createNewAd = async (req, res) => {
  res.json({ msg: 'createNewAd' })
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