const Views = require('../models/Views')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllViews = async (req, res) => {

  const views = await Views.find()

  if (!views) {
    throw new CustomError.NotFoundError('there is no views data to show')
  }

  const viewsGroup = groupData(views)

  res.status(StatusCodes.OK).json({ viewsGroup })
}

const getSingleAdViews = async (req, res) => {

  const { id: adId } = req.params

  const views = await Views.find({ ad: adId })

  if (!views) {
    throw new CustomError.NotFoundError('there is no viwes recorded for requested ad')
  }

    const viewsGroup = groupData(views)

  res.status(StatusCodes.OK).json({ viewsGroup })
}

const groupData = (data) => {
  const result = data.reduce((acc, item) => {
    const date = new Date(item.createdAt).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(result);
}

module.exports = { getAllViews, getSingleAdViews }