const mongoose = require('mongoose')
const Ticket = require('./Ticket')
const Request = require('./Request')
const Saved = require('./Saved')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email must be provided.'],
    validate: {
      validator: validator.isEmail,
      message: 'please provide a valid email.'
    }
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, 'full name must be provided']
  },
  phone: {
    type: String,
    maxlength: 15,
    required: [true, 'please provide a valid phone number in international format']
  },
  profile: {
    type: String,
    default: './assets/images/user.svg'
  },
  role: {
    type: String,
    enum: {
      values: ['USER', 'ADMIN', 'ROOTADMIN'],
      message: '{VALUE} is not supported as a valid role'
    },
    default: 'USER'
  },
  password: {
    type: String,
    minlength: [8, 'password must be more than 8 characters'],
    required: [true, 'password must be provided']
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedIn: Date,
  passwordToken: String,
  passwordTokenExpirationDate: Date,
  isBanned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.pre('remove', async function () {
  try {
    await Ticket.deleteMany({ user: this._id })
    await Request.deleteMany({ user: this._id })
    await Saved.deleteMany({ user: this._id })
  } catch (error) {
    console.log(error)
  }
})

UserSchema.methods.comparePassword = async function (insertedPassword) {
  const isMatch = await bcrypt.compare(insertedPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)