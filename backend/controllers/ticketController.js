const Ticket = require('../models/Ticket')
const Conversation = require('../models/Conversation')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createTicket = async (req, res) => {

  const { subject, message } = req.body

  if (!subject || !message) {
    throw new CustomError.BadRequestError('required fields are not provided')
  }

  const newTicketObject = {
    subject,
    user: req.user.userId
  }

  const ticket = await Ticket.create(newTicketObject)

  if (!ticket) {
    throw new CustomError.BadRequestError('error! creating new ticket failed')
  }

  const newMessageObject = {
    senderName: req.user.name,
    senderRole: req.user.role,
    ticket: ticket._id,
    message
  }

  const newMessage = await Conversation.create(newMessageObject)

  if (!newMessage) {
    await ticket.remove()
    throw new CustomError.BadRequestError('error! creating new ticket failed')
  }

  res.status(StatusCodes.CREATED).json({ msg: 'ticket created successfully' })
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