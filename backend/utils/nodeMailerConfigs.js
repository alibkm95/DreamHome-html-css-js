module.exports = {
  service: process.env.EMAIL_SERVICE ,
  host: process.env.EMAIL_HOST ,
  port: process.env.EMAIL_HOST_PORT ,
  secure: false,
  auth: {
    user: process.env.EMAIL_AUTH_USER ,
    pass: process.env.EMAIL_AUTH_PASSWORD 
  }
} 