const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({ name, email, verificationToken, origin }) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`

  const message = `
    <p>please verify your email by clicking <a href="${verifyEmail}">verify!</a></p>
  `
  
  return sendEmail({
    to: email,
    subject: 'email varification',
    html: `<h4>hi there ${name} !</h4> ${message}`
  })
}

module.exports = sendVerificationEmail