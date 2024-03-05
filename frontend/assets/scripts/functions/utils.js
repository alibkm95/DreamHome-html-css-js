import {
  ToastBox,
  RedirectToHome,
  GetUrlParams,
  ToggleGlobalLoader,
  baseURL,
  RenderVerificationErr,
  RenderVerificationSuccess
} from '../functions/functions.js'

export const GetMe = async () => {
  // TODO => check for current loged in user
}

export const RegisterUser = async (inputGroup) => {
  let emailInput, nameInput, phoneInput, passwordInput, repeatPasswordInput

  inputGroup.forEach(input => {
    switch (input.id) {
      case 'email-input':
        emailInput = input
        break;
      case 'name-input':
        nameInput = input
        break;
      case 'phone-input':
        phoneInput = input
        break;
      case 'password-input':
        passwordInput = input
        break;
      case 'repeat-password-input':
        repeatPasswordInput = input
        break;
      default:
        console.log('can\'t recognize input')
        break;
    }
  })

  const isInputsOK = ValidateRegisterInputs(emailInput, nameInput, phoneInput, passwordInput, repeatPasswordInput)

  if (!isInputsOK) return

  ToggleGlobalLoader()

  let bodyObject = {
    email: emailInput.value.trim(),
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim()
  }

  let result = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject),
    credentials: 'include'
  })

  const response = await result.json()


  if (result.status === 201) {
    ToggleGlobalLoader()
    inputGroup.forEach(input => input.value = '')
    ToastBox('success', response.msg, 3000, null, RedirectToHome)
  } else {
    ToggleGlobalLoader()
    ToastBox('error', response.msg, 3000, 'ok', null)
  }
}

export const LoginUser = async () => {
  // TODO => login user
}

export const LogoutUser = async () => {
  // TODO => log out user
}

export const GetRecoverEmail = async () => {
  // TODO => send user reset password email
}

export const ResetPassword = async () => {
  // TODO => reset users password
}

export const VerifyEmail = async () => {
  ToggleGlobalLoader()
  const email = GetUrlParams('email')
  const verificationToken = GetUrlParams('token')

  let bodyObject = {
    email,
    verificationToken
  }

  const result = await fetch(`${baseURL}/auth/verifyEmail`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject),
    credentials: 'include'
  })
  
  if (result.status === 200) {
    RenderVerificationSuccess()
    ToggleGlobalLoader()
    setTimeout(() => {
      RedirectToHome()
    }, 3000);
  } else {
    RenderVerificationErr()
    ToggleGlobalLoader()
  }
}

export const ValidateRegisterInputs = (emailInput, nameInput, phoneInput, passwordInput, repeatPasswordInput) => {

  let isEmailProvided = IsNotEmpty(emailInput)
  if (!isEmailProvided) {
    ToastBox('error', 'email is required', 3000, null, null)
    emailInput.classList.add('is-invalid')
    return false
  }

  let isValidEmail = IsValidEmail(emailInput.value)
  if (!isValidEmail) {
    ToastBox('error', 'provided email is not valid', 3000, null, null)
    emailInput.classList.add('is-invalid')
    return false
  }

  let isNameProvided = IsNotEmpty(nameInput)
  if (!isNameProvided) {
    ToastBox('error', 'full name is required', 3000, null, null)
    nameInput.classList.add('is-invalid')
    return false
  }

  let isPhoneProvided = IsNotEmpty(phoneInput)
  if (!isPhoneProvided) {
    ToastBox('error', 'phone number is required', 3000, null, null)
    phoneInput.classList.add('is-invalid')
    return false
  }

  let isValidPhone = IsValidPhone(phoneInput.value)
  if (!isValidPhone) {
    ToastBox('error', 'phone number must be in international format: "+1-212-456-7890"', 3000, null, null)
    phoneInput.classList.add('is-invalid')
    return false
  }

  let isPasswordsProvided = IsNotEmpty(passwordInput) && IsNotEmpty(repeatPasswordInput)
  if (!isPasswordsProvided) {
    ToastBox('error', 'passwords must be provided', 3000, null, null)
    passwordInput.classList.add('is-invalid')
    repeatPasswordInput.classList.add('is-invalid')
    return false
  }

  let isValidPassword = IsValidPassword(passwordInput.value)
  if (isValidPassword) {
    let isPasswordsSame = IsPasswordSame(passwordInput.value, repeatPasswordInput.value)

    if (!isPasswordsSame) {
      ToastBox('error', 'password is not match', 3000, null, null)
      passwordInput.classList.add('is-invalid')
      repeatPasswordInput.classList.add('is-invalid')
      return false
    }
  } else {
    ToastBox('error', 'password must be between 6 and 12 characters and most contain numbers and at least 1 upper case letter. simbols not allowed.', 3000, null, null)
    passwordInput.classList.add('is-invalid')
    return false
  }

  return true
}

export const IsPasswordSame = (passwordValue, repeatPasswordValue) => {
  return passwordValue.trim() === repeatPasswordValue.trim() ? true : false
}

export const IsValidEmail = (emailValue) => {
  const emailValidationPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  return emailValidationPattern.test(emailValue.trim())
}

export const IsValidPassword = (passwordValue) => {
  const passwordValidationPattern = /^(?=.*[A-Z])[a-zA-Z0-9]{6,12}$/g
  return passwordValidationPattern.test(passwordValue.trim())
}

export const IsValidPhone = (phoneValue) => {
  const phoneValidationPattern = /^\+[0-9]{10,13}$/g
  return phoneValidationPattern.test(phoneValue.trim())
}

export const IsNotEmpty = (elem) => {
  return elem.value.trim().length <= 0 ? false : true
}

