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

  const { search, ticketStatus } = req.query

  let queryObject = {}

  if (ticketStatus && ticketStatus !== 'all') {
    queryObject.ticketStatus = ticketStatus
  }

  if (search) {
    queryObject.subject = { $regex: search, $options: 'i' }
  }

  let result = Ticket.find(queryObject).populate({
    path: 'user',
    select: 'name role'
  })

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.itemPerPage) || 20
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const tickets = await result

  const totalTickets = await Ticket.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalTickets / limit)

  res.status(StatusCodes.OK).json({ tickets, totalTickets, numOfPages })
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