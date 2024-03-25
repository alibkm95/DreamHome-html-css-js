import {
  GetTicketDetailes,
  RedirectToHome,
  ToggleGlobalLoader,
  MsgBox,
  RenderConversation,
  SendNewMessage
} from './functions/functions.js'

window.addEventListener('load', async () => {
  ToggleGlobalLoader()

  const ticket = await GetTicketDetailes()
  if (!ticket) {
    MsgBox(
      'error',
      'unable to get ticket information',
      null,
      'Home',
      RedirectToHome,
      null
    )
  }

  const ticketTitleElem = document.getElementById('ticket-title')
  const ticketDateElem = document.getElementById('ticket-date')
  const ticketStatusElem = document.getElementById('ticket-status')

  ticketTitleElem.innerText = ticket.subject
  ticketDateElem.innerText = `${new Date(ticket.createdAt).toLocaleDateString()} - ${new Date(ticket.createdAt).toLocaleTimeString()}`

  // switch (ticket.ticketStatus) {
  //   case 'pending':
  //     ticketStatusElem.classList.add('text-warning')
  //     break;
  //   case 'answered':
  //     ticketStatusElem.classList.add('text-success')
  //     break;
  //   case 'closed':
  //     ticketStatusElem.classList.add('text-danger')
  //     break;
  //   default:
  //     ticketStatusElem.classList.add(' ')
  //     break;
  // }

  ticketStatusElem.innerText = `${ticket.ticketStatus}`

  RenderConversation(ticket)

  const newMessageForm =document.getElementById('new-message-form')

  newMessageForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await SendNewMessage(newMessageForm)
  })

  ToggleGlobalLoader()
})
