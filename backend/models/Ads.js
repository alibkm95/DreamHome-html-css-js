const mongoose = require('mongoose')

const AdsSchema = mongoose.Schema({
  area: {
    type: Number,
    required: [true, 'property area value must be provided']
  },
  propType: {
    type: String,
    required: [true, 'property type must be provided'],
    enum: {
      values: ['apartment', 'villa-bungalow', 'lands', 'commercials'],
      message: '{VALUE} is not a valid property type'
    }
  },
  adType: {
    type: String,
    required: [true, 'ad type must be provided'],
    enum: {
      values: ['buy-and-sell', 'mortgage-and-rent', 'partnering-construction'],
      message: '{VALUE} is not a valid ad type'
    }
  },
  primaryPrice: {
    type: Number,
    default: 0
  },
  secondaryPrice: {
    type: Number,
    default: 0
  },
  cover: {
    type: String,
    required: [true, 'ad cover image must be provided']
  },
  panorama: {
    type: String,
    required: [true, 'ad panorama image must be provided']
  },
  rooms: {
    type: Number,
    required: [true, 'rroms count must be provided']
  },
  floorLevel: {
    type: Number,
    default: 0
  },
  totalFloors: {
    type: Number,
    default: 0
  },
  elavator: {
    type: Boolean,
    required: [true, 'property options (elevator) must be provided']
  },
  parking: {
    type: Boolean,
    required: [true, 'property options (parking) must be provided']
  },
  warehouse: {
    type: Boolean,
    required: [true, 'property options (warehouse) must be provided']
  },
  yearOfCunstruction: {
    type: Number,
    default: 0
  },
  location: String,
  district: {
    type: Number,
    default: 0
  },
  publish: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: [true, 'property description must be provided'],
    maxlength: 2000
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Ads', AdsSchema)