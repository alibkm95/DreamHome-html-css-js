module.exports = {
  service: process.env.EMAIL_SERVICE ,//|| 'gmail',
  host: process.env.EMAIL_HOST ,//|| 'smtp.gmail.com',
  port: process.env.EMAIL_HOST_PORT ,//|| 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_AUTH_USER ,//|| 'rocketcarmail@gmail.com',
    pass: process.env.EMAIL_AUTH_PASSWORD //|| 'cdwhdngatnwngmhu'
  }
} 