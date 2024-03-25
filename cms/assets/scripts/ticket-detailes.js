import {
  GetUrlParams,
  RedirectTo,
  ToggleGlobalLoader,
  RenderTicketDetailes,
  SendNewMessage,
  DeleteTicket,
  CloseTicket
} from './functions/functions.js'

window.DeleteTicket = DeleteTicket
window.CloseTicket = CloseTicket

window.addEventListener('load', async () => {

  ToggleGlobalLoader('Getting data ...')

  const ticketID = GetUrlParams('item')

  if (!ticketID) {
    return RedirectTo('./tickets.html')
  }

  await RenderTicketDetailes(ticketID, null)

  const newMessageForm = document.getElementById('new-message-form')
  newMessageForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await SendNewMessage(event.target, ticketID)
  })

  ToggleGlobalLoader()
})