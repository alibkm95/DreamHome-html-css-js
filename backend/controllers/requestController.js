const Request = require('../models/Request')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createRequest = async (req, res) => {

  const { userId } = req.user
  const { selectedAd } = req.body

  if (!selectedAd) {
    throw new CustomError.BadRequestError('for request, candidate ad must be provided')
  }

  const alreadyRequested = await Request.findOne({ user: userId, ad: selectedAd })

  if (alreadyRequested && alreadyRequested.status === 'pending') {
    throw new CustomError.BadRequestError('error! duplicated request')
  }

  const requestObject = {
    user: userId,
    ad: selectedAd,
    status: 'pending'
  }

  const newRequest = await Request.create(requestObject)

  if (!newRequest) {
    throw new CustomError.BadRequestError('error! creating new request failed')
  }

  res.status(StatusCodes.CREATED).json({ msg: 'request created successfully' })
}

const getAllRequests = async (req, res) => {

  const { maxDate, minDate } = req.query

  let queryObject = {}

  if (maxDate && minDate) {
    queryObject.createdAt = {
      $gt: new Date(minDate),
      $lt: new Date(maxDate),
    }
  }

  let result = Request.find(queryObject)
    .populate({
      path: 'user',
      select: '_id name email'
    })
    .populate({
      path: 'ad',
      select: '_id title propType adType '
    })

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.itemPerPage) || 20
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const requests = await result

  const totalrequests = await Request.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalrequests / limit)

  res.status(StatusCodes.OK).json({ requests, totalrequests, numOfPages })
}

const getSingleRequest = async (req, res) => {
  res.json({ msg: 'getSingleRequest' })
}

const getUserRequests = async (req, res) => {
  res.json({ msg: 'getUserRequests' })
}

const updateRequest = async (req, res) => {
  res.json({ msg: 'updateRequest' })
}

const deleteRequest = async (req, res) => {
  res.json({ msg: 'deleteRequest' })
}

module.exports = {
  createRequest,
  getAllRequests,
  getSingleRequest,
  getUserRequests,
  updateRequest,
  deleteRequest,
}