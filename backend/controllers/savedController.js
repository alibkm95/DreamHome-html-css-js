const Saved = require('../models/Saved')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const toggleSave = async (req, res) => {

  const { userId } = req.user
  const { selectedAd } = req.body

  if (!selectedAd) {
    throw new CustomError.BadRequestError('no ad provided to save!')
  }

  const alreadySaved = await Saved.findOne({ user: userId, ad: selectedAd })

  if (alreadySaved) {
    await alreadySaved.remove()

    res.status(StatusCodes.OK).json({ msg: 'ad removed from your saved list' })
    return
  }

  const newSave = await Saved.create({ user: userId, ad: selectedAd })

  if (!newSave) {
    throw new CustomError.BadRequestError('error! saving selected ad failed')
  }

  res.status(StatusCodes.OK).json({ msg: 'ad saved successfully' })
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