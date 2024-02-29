const mongoose = require('mongoose')

const ViewSchema = new mongoose.Schema({
  ad: {
    type: mongoose.Types.ObjectId,
    ref: 'Ads',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('View', ViewSchema)