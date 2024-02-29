const Views = require('../models/Views')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllViews = async (req, res) => {
  res.json({ msg: 'getAllViews' })
}

const getSingleAdViews = async (req, res) => {
  res.json({ msg: 'getSingleAdViews' })
}

module.exports = { getAllViews, getSingleAdViews }