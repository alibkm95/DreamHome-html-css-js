import { RegisterUser } from "./functions/utils.js"


window.addEventListener('load', () => {
  const registerForm = document.querySelector('.register__form')
  const registerInputs = document.querySelectorAll('.register__input')

  registerInputs.forEach(input => {
    input.classList.remove('is-invalid')
    input.addEventListener('focus', (event) => {
      event.target.classList.remove('is-invalid')
    })
  })

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const isSuccess = await RegisterUser(registerInputs)
  })
})