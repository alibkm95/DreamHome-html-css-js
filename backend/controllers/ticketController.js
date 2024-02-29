const Ticket = require('../models/Ticket')
const Conversation = require('../models/Conversation')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createTicket = async (req, res) => {
  res.json({ msg: 'createTicket' })
}

const getAllTickets = async (req, res) => {
  res.json({ msg: 'getAllTickets' })
}

const getCurrentUserTickets = async (req, res) => {
  res.json({ msg: 'getCurrentUserTickets' })
}

const getSingleTicket = async (req, res) => {
  res.json({ msg: 'getSingleTicket' })
}

const addNewMessage = async (req, res) => {
  res.json({ msg: 'addNewMessage' })
}

const updateTicket = async (req, res) => {
  res.json({ msg: 'updateTicket' })
}

const deleteTicket = async (req, res) => {
  res.json({ msg: 'deleteTicket' })
}

module.exports = {
  createTicket,
  getAllTickets,
  getCurrentUserTickets,
  getSingleTicket,
  addNewMessage,
  updateTicket,
  deleteTicket
}