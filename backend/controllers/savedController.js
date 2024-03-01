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

  let result = Saved.find()
    .populate({
      path: 'user',
      select: '_id name email'
    })
    .populate({
      path: 'ad',
      select: '_id title propType adType'
    })
    .sort('-createdAt')

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.itemPerPage) || 20
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const savedList = await result

  const totalSavedCount = await Saved.countDocuments()
  const numOfPages = Math.ceil(totalSavedCount / limit)

  res.status(StatusCodes.OK).json({ savedList, totalSavedCount, numOfPages })
}

const getUsersSaves = async (req, res) => {

  const { userId } = req.user

  const userSaveList = await Saved.find({ user: userId })
    .populate({
      path: 'ad',
      select: '_id title propType adType '
    })

  res.status(StatusCodes.OK).json({ userSaveList })
}

module.exports = {
  toggleSave,
  getAllSaves,
  getUsersSaves,
}