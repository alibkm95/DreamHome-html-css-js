import { LoginUser } from "./functions/utils.js";

window.addEventListener('load', async (event) => {
  const loginForm = document.querySelector('.login__form')
  const emailInput = document.getElementById('email-input')
  const passwordInput = document.getElementById('password-input')

  const loginInputs = [emailInput, passwordInput]

  loginInputs.forEach(input => {
    input.addEventListener('focus', (event) => {
      event.target.classList.remove('is-invalid')
    })
  })

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await LoginUser(emailInput, passwordInput)
  })
})