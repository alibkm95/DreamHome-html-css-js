import {
  VerifyEmail
} from './functions/utils.js'

window.addEventListener('load', async (event) => {
  await VerifyEmail()
})