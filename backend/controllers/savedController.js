const Saved = require('../models/Saved')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const toggleSave = async (req, res) => {
  res.json({ msg: 'toggleSave' })
}

const getAllSaves = async (req, res) => {
  res.json({ msg: 'getAllSaves' })
}

const getUsersSaves = async (req, res) => {
  res.json({ msg: 'getUsersSaves' })
}

module.exports = {
  toggleSave,
  getAllSaves,
  getUsersSaves,
}