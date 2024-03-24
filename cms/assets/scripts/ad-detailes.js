import {
  GetUrlParams,
  UploadCoverImage,
  UploadPanoramaImage,
  RemoveAd,
  CreateNewAd,
  UpdateCurrentAd,
  RenderAdCharts,
  GetAdDetailes,
  ToastBox,
  RedirectTo,
  MsgBox,
  ToggleGlobalLoader
} from "./functions/functions.js"

window.addEventListener('load', async () => {
  ToggleGlobalLoader('Loading...')
  const adId = GetUrlParams('item')
  const containerHeaderTxtElem = document.getElementById('container-header-text')
  const breadcrumbParent = document.querySelector('ol.breadcrumb')
  const uploadCoverForm = document.getElementById('upload-cover')
  const coverFileInput = document.getElementById('cover-input')
  const coverImagePlaceholder = document.getElementById('upload-cover-img')
  const uploadPanoramaForm = document.getElementById('upload-panorama')
  const panoramaFileInput = document.getElementById('panorama-input')
  const panoramaImagePlaceholder = document.getElementById('upload-panorama-img')
  const adForm = document.getElementById('ads-form')
  const adFormControlsWrapeer = document.getElementById('ad-form-controls-wrapper')
  const chartsContainer = document.querySelector('.charts')
  const adFormsInputGroup = {
    titleInput: document.getElementById('title-input'),
    areaInput: document.getElementById('area-input'),
    propTypeInput: document.getElementById('propType-input'),
    adTypeInput: document.getElementById('adType-input'),
    primaryPriceInput: document.getElementById('primary-price-input'),
    secondaryPriceInput: document.getElementById('secondary-price-input'),
    coverImageInput: document.getElementById('cover-image-input'),
    panoramaImageInput: document.getElementById('panorama-image-input'),
    roomsInput: document.getElementById('rooms-input'),
    YOCInput: document.getElementById('YOC-input'),
    locationInput: document.getElementById('location-input'),
    publishInput: document.getElementById('publish-input'),
    floorInput: document.getElementById('floor-input'),
    totalFloorsInput: document.getElementById('total-floors-input'),
    elavatorInput: document.getElementById('elavator-input'),
    parkingInput: document.getElementById('parking-input'),
    warehousInput: document.getElementById('warehous-input'),
    descriptionInput: document.getElementById('description-input'),
    districtInput: document.getElementById('district-input'),
  }

  Object.values(adFormsInputGroup).forEach(input => {
    input.addEventListener('focus', event => {
      event.target.classList.remove('is-invalid')
    })
  })

  uploadCoverForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await UploadCoverImage()
  })

  uploadPanoramaForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await UploadPanoramaImage()
  })

  coverFileInput.addEventListener('change', event => {
    if (event.target.files.length) {
      const file = event.target.files[0]
      const objectURL = URL.createObjectURL(file)
      coverImagePlaceholder.style.opacity = '0.3'
      coverImagePlaceholder.src = objectURL
    }
  })

  panoramaFileInput.addEventListener('change', event => {
    if (event.target.files.length) {
      const file = event.target.files[0]
      const objectURL = URL.createObjectURL(file)
      panoramaImagePlaceholder.style.opacity = '0.3'
      panoramaImagePlaceholder.src = objectURL
    }
  })

  adForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (adId) {
      return MsgBox(
        'warning',
        'Are you sure about updating info?? after update, old datas cannot be recovered.',
        'cancel',
        'save changes',
        async () => { await UpdateCurrentAd(adId, adFormsInputGroup) },
        null
      )
    }

    await CreateNewAd(adFormsInputGroup)

  })

  if (!adId) {
    containerHeaderTxtElem.innerHTML = `
    <i class="fa-solid fa-plus-square"></i>
    Create New`

    breadcrumbParent.insertAdjacentHTML('beforeend', `
    <li class="breadcrumb-item active" aria-current="page">
      Create new
    </li>
    `)

    adFormControlsWrapeer.insertAdjacentHTML('beforeend', `
    <button class="btn-style ads-form__controls-btn create-btn" type="submit">
      <i class="fa-solid fa-plus-square"></i>
      Create
    </button>
    `)

    ToggleGlobalLoader()

    return
  }

  chartsContainer.classList.remove('hide')
  await RenderAdCharts(adId)

  containerHeaderTxtElem.innerHTML = `<i class="fa-solid fa-list"></i>Detailes & Edit`

  breadcrumbParent.insertAdjacentHTML('beforeend', `
    <li class="breadcrumb-item active" aria-current="page">
      Detailes & edit
    </li>
    `)

  adFormControlsWrapeer.insertAdjacentHTML('beforeend', `
    <button class="btn-style ads-form__controls-btn edit-btn" type="submit">
      <i class="fa-solid fa-save"></i>
      Save changes
    </button>
    <button class="btn-style ads-form__controls-btn delete-btn" type="button" id="remove-ad-btn">
      <i class="fa-solid fa-trash"></i>
      Delete ad
    </button>
    <a href="./ad-detailes.html" class="btn-style ads-form__controls-btn create-new-btn">
      <i class="fa-solid fa-plus-square"></i>
      Create new ad
    </a>
    `)

  const ad = await GetAdDetailes(adId)

  if (!ad) {
    return ToastBox('error', 'can not get ad information', 3000, 'OK', () => {
      RedirectTo('./ads.html')
    })
  }

  adFormsInputGroup.titleInput.value = ad.title
  adFormsInputGroup.areaInput.value = ad.area
  adFormsInputGroup.propTypeInput.value = ad.propType
  adFormsInputGroup.adTypeInput.value = ad.adType
  adFormsInputGroup.primaryPriceInput.value = ad.primaryPrice
  adFormsInputGroup.secondaryPriceInput.value = ad.secondaryPrice
  adFormsInputGroup.coverImageInput.value = ad.cover
  adFormsInputGroup.panoramaImageInput.value = ad.panorama
  adFormsInputGroup.roomsInput.value = ad.rooms
  adFormsInputGroup.YOCInput.value = ad.yearOfCunstruction
  adFormsInputGroup.locationInput.value = ad.location
  adFormsInputGroup.publishInput.selectedIndex = ad.publish ? 0 : 1
  adFormsInputGroup.floorInput.value = ad.floorLevel
  adFormsInputGroup.totalFloorsInput.value = ad.totalFloors
  adFormsInputGroup.elavatorInput.checked = ad.elevator ? true : false
  adFormsInputGroup.parkingInput.checked = ad.parking ? true : false
  adFormsInputGroup.warehousInput.checked = ad.warehous ? true : false
  adFormsInputGroup.descriptionInput.value = ad.description
  adFormsInputGroup.districtInput.value = ad.district
  coverImagePlaceholder.src = ad.cover
  coverImagePlaceholder.style.opacity = '1'
  panoramaImagePlaceholder.src = ad.panorama
  panoramaImagePlaceholder.style.opacity = '1'

  document.getElementById('remove-ad-btn').addEventListener('click', async () => { await RemoveAd() })
  ToggleGlobalLoader()
})

const primaryPriceHelp = tippy('#primary-price-help', {
  content: `
    <p>
      + default value is (0) and considered as negotiable
    </p>
    <p>
      + if ad type is mortgage and rent this value considered as mortgage price otherwise it's represents the property's total price
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const secondaryPriceHelp = tippy('#secondary-price-help', {
  content: `
    <p>
      + default value is (0) and considered as negotiable
    </p>
    <p>
      + if ad type is mortgage and rent this value considered as rent price otherwise it's represents the property's price per square meter
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const coverImageHelp = tippy('#cover-image-help', {
  content: `
    <p>
      + this field is required
    </p>
    <p>
      + maximum size of the image file must be less than 10MB
    </p>
    <p>
      + as soon as the cover image uploaded, this field automatically fills with uploaded images direct link
    </p>
  `,
  placement: 'top',
  zIndex: 100000,
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const panoramaImageHelp = tippy('#panorama-image-help', {
  content: `
    <p>
      + this field is required
    </p>
    <p>
      + maximum size of the image file must be less than 10MB
    </p>
    <p>
      + as soon as the panorama image uploaded, this field automatically fills with uploaded images direct link
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const roomsHelp = tippy('#rooms-help', {
  content: `
    <p>
      + this field is required
    </p>
    <p>
      + for properties that do not have rooms, consider the value (0)
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const yocHelp = tippy('#YOC-help', {
  content: `
    <p>
      + (0) is default and considered as unknown
    </p>
  `,
  placement: 'top',
  zIndex: 100000,
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const locationHelp = tippy('#location-help', {
  content: `
    <p>
      + if you do not send a value to this field, it will be treated as unknown
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const floorHelp = tippy('#floor-help', {
  content: `
    <p>
      + default value for both floor level and total floors fields is (0)
    </p>
    <p>
      + The value 0 will be considered as the ground floor
    </p>
  `,
  placement: 'top',
  zIndex: 100000,
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})