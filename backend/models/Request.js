const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ad: {
    type: mongoose.Types.ObjectId,
    ref: 'Ads',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['pending', 'completed', 'canceled'],
      message: '{VALUE} is not supported as a valid status'
    }
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Request', RequestSchema)