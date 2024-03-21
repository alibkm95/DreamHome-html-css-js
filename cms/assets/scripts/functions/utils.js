import {
  GetCookie,
  baseURL
} from './functions.js'

export const GetMe = async () => {

  const isLoggedIn = GetCookie('isLoggedIn')

  if (!isLoggedIn) return false

  const result = await fetch(`${baseURL}/users/showMe`, {
    credentials: 'include'
  })

  const response = await result.json()

  if (result.status === 200) {
    return response.user
  } else {
    return false
  }
}

export const GetUserInfos = async (userId) => {
  const result = await fetch(`${baseURL}/users/${userId}`, {
    credentials: 'include'
  })

  const response = await result.json()

  if (result.status === 200) {
    return response.user
  } else {
    return false
  }
}