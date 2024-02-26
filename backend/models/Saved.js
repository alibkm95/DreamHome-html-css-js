const mongoose = require('mongoose')

const SavedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ad: {
    type: mongoose.Types.ObjectId,
    ref: 'Ads',
    required: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Saved', SavedSchema)