const nodeMailer = require('nodemailer')
const nodeMailerConfig = require('./nodeMailerConfigs')

const sendEmail = async ({to, subject, html}) => {

  const transporter = nodeMailer.createTransport(nodeMailerConfig);

  return transporter.sendMail({
    from: 'DREAM_HOME',
    to,
    subject,
    html,
  })
}


module.exports = sendEmail