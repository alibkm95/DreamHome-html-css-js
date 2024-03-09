const mongoose = require('mongoose')

const ConversationsSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticket: {
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  message: {
    type: String,
    maxlength: 1000,
    required: [true, 'message must be provided']
  },
  seenByAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  seenByUser: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Conversations', ConversationsSchema)