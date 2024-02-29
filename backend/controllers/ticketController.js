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

  const tickets = await Ticket.find({ user: req.user.userId })

  if (!tickets) {
    throw new CustomError.NotFoundError('there is no tickets')
  }

  res.status(StatusCodes.OK).json({ tickets, count: tickets.length })
}

const getSingleTicket = async (req, res) => {

  const { id: ticketId } = req.params

  const ticket = await Ticket.findOne({ _id: ticketId })
    .populate({
      path: 'user',
      select: 'name role'
    })
    .populate('conversations')

  if (!ticket) {
    throw new CustomError.NotFoundError('there is no such a ticket')
  }

  if (req.user.role === 'USER' && req.user.userId !== ticket.user._id.toString()) {
    throw new CustomError.UnauthorizedError('you cant access to the tickets other than yours')
  }

  res.status(StatusCodes.OK).json({ ticket })
}

const addNewMessage = async (req, res) => {

  const { id: ticketId } = req.params
  const { newMessage } = req.body

  const ticket = await Ticket.findOne({ _id: ticketId })
    .populate({
      path: 'user',
      select: 'name role'
    })
    .populate('conversations')

  if (!ticket) {
    throw new CustomError.NotFoundError('there is no such a ticket')
  }

  if (ticket.ticketStatus === 'closed') {
    throw new CustomError.BadRequestError('this ticket is closed')
  }

  if (req.user.role === 'USER' && req.user.userId !== ticket.user._id.toString()) {
    throw new CustomError.UnauthorizedError('you cant access to the tickets other than yours')
  }

  if (req.user.role === 'USER') {
    await Conversation.updateMany(
      { ticket: ticketId },
      { seenByUser: true }
    )
  }

  if (req.user.role === 'ROOTADMIN' || req.user.role === 'ADMIN') {
    await Conversation.updateMany(
      { ticket: ticketId },
      { seenByAdmin: true }
    )
  }

  const newMessageObject = {
    senderName: req.user.name,
    senderRole: req.user.role,
    ticket: ticketId,
    message: newMessage
  }

  const newMessageInserting = await Conversation.create(newMessageObject)

  if (!newMessageInserting) {
    throw new CustomError.BadRequestError('unable to send new message!')
  }

  if (req.user.role === 'ADMIN' || req.user.role === 'ROOTADMIN') {
    ticket.ticketStatus = 'answered'
    await ticket.save()
  }

  if (req.user.role === 'USER') {
    ticket.ticketStatus = 'pending'
    await ticket.save()
  }

  res.status(StatusCodes.OK).json({ ticket })
}

const updateTicket = async (req, res) => {

  const { id: ticketId } = req.params

  const ticket = await Ticket.findOne({ _id: ticketId })

  if (!ticket) {
    throw new CustomError.NotFoundError('there is no such a ticket')
  }

  await Conversation.updateMany(
    { ticket: ticketId },
    { seenByAdmin: true, seenByUser: true }
  )

  ticket.ticketStatus = 'closed'
  await ticket.save()

  res.status(StatusCodes.OK).json({ msg: 'ticket closed successfully' })
}

const deleteTicket = async (req, res) => {

  const { id: ticketId } = req.params

  const ticket = await Ticket.findOne({ _id: ticketId })

  if (!ticket) {
    throw new CustomError.NotFoundError('there is no such a ticket')
  }

  await ticket.remove()

  res.status(StatusCodes.OK).json({ msg: 'ticket removed successfully' })
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