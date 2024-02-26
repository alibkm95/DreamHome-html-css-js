const mongooes = require('mongoose')

mongooes.set('strictQuery', false)

const connectDB = (url) => {
  return mongooes.connect(url)
}

module.exports = connectDB