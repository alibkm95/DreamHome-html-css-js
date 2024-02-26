require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss')
const cors = require('cors')
const mogoSanitize = require('express-mongo-sanitize')

const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

// err
const notFoundMiddleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

// err middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`server running on port: ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()