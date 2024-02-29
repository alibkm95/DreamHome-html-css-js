const Views = require('../models/Views')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllViews = async (req, res) => {

  const views = await Views.find()

  const viewsGroup = groupData(views)

  res.status(StatusCodes.OK).json({ viewsGroup })
}

const getSingleAdViews = async (req, res) => {
  res.json({ msg: 'getSingleAdViews' })
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