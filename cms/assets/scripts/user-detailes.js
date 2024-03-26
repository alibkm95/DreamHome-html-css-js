import {
  GetUrlParams,
  RedirectTo,
  RenderUserInfos,
  ChangeUserRole,
  UserBlockingManager,
  DeleteUser,
  SendEmailToUser
} from "./functions/functions.js"

window.ChangeUserRole = ChangeUserRole
window.UserBlockingManager = UserBlockingManager
window.DeleteUser = DeleteUser

window.addEventListener('load', async () => {

  const userID = GetUrlParams('user')

  if (!userID) {
    return RedirectTo('./users.html')
  }

  await RenderUserInfos(userID)

  const sendMailForm = document.querySelector('.send-mail__form')
  const subjectInput = document.getElementById('subject-input')
  const messageInput = document.getElementById('msg-input')

  sendMailForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await SendEmailToUser(userID)
  })

  subjectInput.addEventListener('focus', event => {
    event.target.classList.remove('is-invalid')
  })

  messageInput.addEventListener('focus', event => {
    event.target.classList.remove('is-invalid')
  })
})