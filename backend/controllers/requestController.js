const Request = require('../models/Request')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createRequest = async (req, res) => {
  res.json({ msg: 'createRequest' })
}

const getAllRequests = async (req, res) => {
  res.json({ msg: 'getAllRequests' })
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