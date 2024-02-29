const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions
} = require('../middlewares/authentication')

const {
  createTicket,
  getAllTickets,
  getCurrentUserTickets,
  getSingleTicket,
  addNewMessage,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController')

router
  .route('/')
  .post(authenticateUser, createTicket)
  .get(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), getAllTickets)

router
  .route('/showMyTickets')
  .get(authenticateUser, getCurrentUserTickets)

router
  .route('/addNewMsg/:id')
  .patch(authenticateUser, addNewMessage)

router
  .route('/:id')
  .get(authenticateUser, getSingleTicket)
  .patch(authenticateUser, authorizePermissions('ROOTADMIN', 'ADMIN'), updateTicket)
  .delete(authenticateUser, authorizePermissions('ROOTADMIN'), deleteTicket)

module.exports = router