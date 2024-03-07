import {
  CreateTicket
} from './functions/functions.js'

window.addEventListener('load', () => {
  
  const supportForm = document.getElementById('support-form')
  const subjectInputElem = document.getElementById('title-input')
  const messageInputElem = document.getElementById('msg-input')

  const inputs = [subjectInputElem, messageInputElem]

  inputs.forEach(input => {
    input.addEventListener('focus', event => {
      event.target.classList.remove('is-invalid')
    })
  })

  supportForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await CreateTicket(subjectInputElem, messageInputElem)
  })

})