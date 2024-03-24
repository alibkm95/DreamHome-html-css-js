import {
  GetCookie,
  baseURL,
  ToastBox
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

export const ValidateAdInputs = (inputGroup) => {

  let isTitleProvided = IsNotEmpty(inputGroup.titleInput.value)
  if (!isTitleProvided) {
    ToastBox('error', 'Title is required', 3000, null, null)
    inputGroup.titleInput.classList.add('is-invalid')
    return false
  }

  let isAreaProvided = IsNotEmpty(inputGroup.areaInput.value)
  if (!isAreaProvided) {
    ToastBox('error', 'Area units is required', 3000, null, null)
    inputGroup.areaInput.classList.add('is-invalid')
    return false
  }

  let isAreaNumber = IsNumber(inputGroup.areaInput.value)
  if (!isAreaNumber) {
    ToastBox('error', 'Area units must be a number', 3000, null, null)
    inputGroup.areaInput.classList.add('is-invalid')
    return false
  }

  let isPrimaryPriceNumber = IsNumber(inputGroup.primaryPriceInput.value)
  if (!isPrimaryPriceNumber && IsNotEmpty(inputGroup.primaryPriceInput.value)) {
    ToastBox('error', 'Primary price must be a number or empty', 3000, null, null)
    inputGroup.primaryPriceInput.classList.add('is-invalid')
    return false
  }

  let isSecondaryPriceNumber = IsNumber(inputGroup.secondaryPriceInput.value)
  if (!isSecondaryPriceNumber && IsNotEmpty(inputGroup.secondaryPriceInput.value)) {
    ToastBox('error', 'Secondary price must be a number or empty', 3000, null, null)
    inputGroup.secondaryPriceInput.classList.add('is-invalid')
    return false
  }

  let isCoverProvided = IsNotEmpty(inputGroup.coverImageInput.value)
  if (!isCoverProvided) {
    ToastBox('error', 'Cover image is required. please use cover image uploader', 3000, null, null)
    inputGroup.coverImageInput.classList.add('is-invalid')
    return false
  }

  let isPanoramaProvided = IsNotEmpty(inputGroup.panoramaImageInput.value)
  if (!isPanoramaProvided) {
    ToastBox('error', 'Panorama image is required. please use panorama image uploader', 3000, null, null)
    inputGroup.panoramaImageInput.classList.add('is-invalid')
    return false
  }

  let isRoomsProvided = IsNotEmpty(inputGroup.roomsInput.value)
  if (!isRoomsProvided) {
    ToastBox('error', 'Rooms count is required', 3000, null, null)
    inputGroup.roomsInput.classList.add('is-invalid')
    return false
  }

  let isRoomsNumber = IsNumber(inputGroup.roomsInput.value)
  if (!isRoomsNumber) {
    ToastBox('error', 'Rooms count must be a number', 3000, null, null)
    inputGroup.roomsInput.classList.add('is-invalid')
    return false
  }

  let isYOCNumber = IsNumber(inputGroup.YOCInput.value)
  if (!isYOCNumber && IsNotEmpty(inputGroup.YOCInput.value)) {
    ToastBox('error', 'The year of cunstruction must be a number or empty', 3000, null, null)
    inputGroup.YOCInput.classList.add('is-invalid')
    return false
  }

  let isFloorsNumber = IsNumber(inputGroup.floorInput.value)
  if (!isFloorsNumber && IsNotEmpty(inputGroup.floorInput.value)) {
    ToastBox('error', 'Floor level must be a number or empty', 3000, null, null)
    inputGroup.floorInput.classList.add('is-invalid')
    return false
  }

  let isTotalFloorsNumber = IsNumber(inputGroup.totalFloorsInput.value)
  if (!isTotalFloorsNumber && IsNotEmpty(inputGroup.totalFloorsInput.value)) {
    ToastBox('error', 'Floor level must be a number or empty', 3000, null, null)
    inputGroup.totalFloorsInput.classList.add('is-invalid')
    return false
  }

  let isDistrictNumber = IsNumber(inputGroup.districtInput.value)
  if (!isDistrictNumber && IsNotEmpty(inputGroup.districtInput.value)) {
    ToastBox('error', 'District must be a number', 3000, null, null)
    inputGroup.districtInput.classList.add('is-invalid')
    return false
  }

  let isDescProvided = IsNotEmpty(inputGroup.descriptionInput.value)
  if (!isDescProvided) {
    ToastBox('error', 'Description is required', 3000, null, null)
    inputGroup.descriptionInput.classList.add('is-invalid')
    return false
  }

  return true
}

export const IsNotEmpty = (value) => {
  return value.trim().length <= 0 ? false : true
}

export const IsNumber = (value) => {
  const numberValidationPattern = /^\d+$/g
  return numberValidationPattern.test(value.trim())
}