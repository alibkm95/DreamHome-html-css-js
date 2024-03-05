import {
  ResetPassword
} from './functions/utils.js'

import {
  GetUrlParams
} from './functions/functions.js'

window.addEventListener('load', async (event) => {
  const token = GetUrlParams('token')
  const email = GetUrlParams('email')
  const resetPassForm = document.querySelector('.resetpass__form')
  const newPasswordInput = document.getElementById('password-input')
  const repeatNewPasswordInput = document.getElementById('repeat-password-input')

  const resetInputs = [newPasswordInput, repeatNewPasswordInput]

  resetInputs.forEach(input => {
    input.addEventListener('focus', event => {
      event.target.classList.remove('is-invalid')
    })
  })

  resetPassForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await ResetPassword(token, email, newPasswordInput, repeatNewPasswordInput)
  })
})