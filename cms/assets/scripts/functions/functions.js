import {
  ValidateAdInputs
} from './utils.js'

export const baseURL = 'http://localhost:5000/api/v1'

export const ToggleSidebarMenu = (rotateElem, applicable) => {
  applicable.classList.toggle('active')

  if (applicable.classList.contains('active')) {
    rotateElem.style.transform = 'rotate(90deg)'
  } else {
    rotateElem.style.transform = 'rotate(0deg)'
  }

  applicable.addEventListener('click', () => {
    ToggleSidebarMenu(rotateElem, applicable)
  })
}

export const ToastBox = (
  icon,
  text,
  timer,
  confirmBtnText = null,
  handler = null) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: confirmBtnText ? true : false,
    confirmButtonText: confirmBtnText ? confirmBtnText : '',
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    didClose: (toast) => {
      handler !== null && handler()
    }
  });
  Toast.fire({
    icon,
    text
  });
}

export const RedirectTo = (path) => {
  window.location = path
}

export const GetUrlParams = (key) => {
  const urlParam = new URLSearchParams(window.location.search);
  return urlParam.get(key)
}

export const AddParamToUrl = (paramsArr) => {
  let url = new URL(location.href)
  let searchParams = url.searchParams

  paramsArr.map(param => {
    searchParams.set(param.key, param.value)
  })

  url.search = searchParams.toString()
  location.href = url.toString()
}

export const RemoveParamsFromUrl = (paramsArr) => {
  let url = new URL(location.href);
  let searchParams = url.searchParams;

  paramsArr.forEach(param => {
    searchParams.delete(param);
  });

  url.search = searchParams.toString();
  location.href = url.toString();
}

export const ToggleGlobalLoader = (loaderText = null) => {
  const loaderElem = document.querySelector('.loader')

  if (loaderText) {
    document.getElementById('loader-text').innerText = loaderText
  }

  loaderElem.classList.toggle('hide')
}

export const GetCookie = (cookieName) => {
  cookieName += '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith(cookieName)) {
      return cookies[i].substring(cookieName.length)
    }
  }
  return null
}

const TitleGenerator = (adType) => {
  if (adType === 'mortgage-and-rent') {
    return ['Mortgage cost:', 'Rent cost:']
  }

  return ['Total price:', 'Price per sq.meter:']
}

export const RenderNotFound = (parentElem) => {
  parentElem.innerHTML = ''
  parentElem.insertAdjacentHTML('afterbegin', `
  <div class="not-found h-100">
    <div class="not-found__container">
      <img class="not-found__img" src="./assets/images/404.svg" alt="Not Found">
      <p class="not-found__text text-center fs-3">
        Sorry. We could not find any results ...
      </p>
      <a href="./index.html" class="not-found__link btn-style">
        Back to Home
        <i class="fa-solid fa-home"></i>
      </a>
    </div>
  </div>
  `)
}

export const MsgBox = (icon, text, cancelBtnText, confirmBtnText, submitHandler, rejectHandler) => {
  Swal.fire({
    text,
    icon,
    showCancelButton: cancelBtnText ? true : false,
    confirmButtonColor: 'var(--bs-indigo)',
    cancelButtonColor: "var(--orange)",
    confirmButtonText: confirmBtnText,
    cancelButtonText: cancelBtnText
  }).then((result) => {
    if (result.isConfirmed) {
      submitHandler && submitHandler()
    } else {
      rejectHandler && rejectHandler()
    }
  })
}

export const NextPageHandler = (currentPage, totalPages,) => {
  currentPage++

  if (currentPage > totalPages) return

  let urlParamArr = [
    { key: 'page', value: currentPage }
  ]

  AddParamToUrl(urlParamArr)
}

export const PrevPageHandler = (currentPage,) => {
  currentPage--

  if (currentPage < 1) return

  let urlParamArr = [
    { key: 'page', value: currentPage }
  ]

  AddParamToUrl(urlParamArr)
}

export const JumpToPageHandler = (value, totalPages) => {
  let requestPage = 1

  const regex = /^\d+$/g

  let isNumber = regex.test(value)

  if (!isNumber) {
    return
  }

  requestPage = value

  if (requestPage < 1) {
    requestPage = 1
  }

  if (requestPage > totalPages) {
    requestPage = totalPages
  }

  let urlParamArr = [
    { key: 'page', value: requestPage }
  ]

  AddParamToUrl(urlParamArr)
}

export const CreateChart = (wrapperElem, options) => {
  new Chart(wrapperElem, options)
}

export const GetAllViewsData = async () => {
  const response = await fetch(`${baseURL}/view`, {
    credentials: 'include'
  })

  const result = await response.json()

  if (response.status === 200) {
    return result.viewsGroup
  }

  return null
}

export const GetSingleAdViewsData = async (adId) => {
  const response = await fetch(`${baseURL}/view/${adId}`, {
    credentials: 'include'
  })

  const result = await response.json()

  if (response.status === 200) {
    return result.viewsGroup
  }

  return null
}

export const GetAllRequests = async (reqOptions = null) => {

  let reqURL = `${baseURL}/request`

  if (reqOptions) {
    reqURL += '?'

    const reqParams = Object.entries(reqOptions);
    reqParams.forEach(([key, value]) => {
      if (value) {
        reqURL += `${key}=${value}&`
      }
    })
  }

  const response = await fetch(reqURL, {
    credentials: 'include'
  })

  if (response.status === 200) {
    const result = await response.json()
    return result
  }

  return null
}

export const GetAllTickets = async (reqOptions = null) => {

  let reqURL = `${baseURL}/tickets`

  if (reqOptions) {
    reqURL += '?'

    const reqParams = Object.entries(reqOptions);
    reqParams.forEach(([key, value]) => {
      if (value) {
        reqURL += `${key}=${value}&`
      }
    })
  }

  const response = await fetch(reqURL, {
    credentials: 'include'
  })

  if (response.status === 200) {
    const result = await response.json()
    return result
  }

  return null
}

export const GetAllUsers = async (reqOptions = null) => {
  let reqURL = `${baseURL}/users`

  if (reqOptions) {
    reqURL += '?'

    const reqParams = Object.entries(reqOptions);
    reqParams.forEach(([key, value]) => {
      if (value) {
        reqURL += `${key}=${value}&`
      }
    })
  }

  const response = await fetch(reqURL, {
    credentials: 'include'
  })

  if (response.status === 200) {
    const result = await response.json()
    return result
  }

  return null

}

export const GetAllAds = async (reqOptions = null) => {

  let reqURL = `${baseURL}/ads`

  if (reqOptions) {
    reqURL += '?'

    const reqParams = Object.entries(reqOptions);
    reqParams.forEach(([key, value], index) => {
      if (value) {
        reqURL += `${key}=${value}&`
      }
    })
  }

  const response = await fetch(reqURL, {
    credentials: 'include'
  })

  if (response.status === 200) {
    const result = await response.json()
    return result
  }

  return null
}

export const RenderAdsTable = (parentElem, items, page, itemPerPage) => {
  items.map((item, index) => {
    parentElem.insertAdjacentHTML('beforeend', `
      <tr>
        <th scope="row">
        ${(index + 1) + ((page - 1) * itemPerPage)}
        </th>
        <td>
          <img src="${item.cover}" alt="cover">
        </td>
        <td>
        ${item.title}
        </td>
        <td>
        ${new Intl.DateTimeFormat('en-CA').format(new Date(item.createdAt))}
        </td>
        <td>
        ${new Intl.DateTimeFormat('en-CA').format(new Date(item.updatedAt))}
        </td>
        <td>
          <a href="./ad-detailes.html?item=${item._id}" class="table__link">
            Detailes
          </a>
        </td>
      </tr>
    `)
  })
}

export const UploadCoverImage = async () => {
  const coverFileInput = document.getElementById('cover-input')
  const coverProccess = document.getElementById('cover-upload-proc')
  const selectedImageElem = document.getElementById('upload-cover-img')
  const imageFile = coverFileInput.files[0]
  const imagePath = await UploadImage(imageFile, coverProccess)

  if (imagePath) {
    selectedImageElem.src = imagePath
    selectedImageElem.style.opacity = '1'
    document.getElementById('cover-image-input').value = imagePath
  }
}

export const UploadPanoramaImage = async () => {
  const panoramaFileInput = document.getElementById('panorama-input')
  const panoramaProccess = document.getElementById('panorama-upload-proc')
  const selectedImageElem = document.getElementById('upload-panorama-img')
  const imageFile = panoramaFileInput.files[0]
  const imagePath = await UploadImage(imageFile, panoramaProccess)

  if (imagePath) {
    selectedImageElem.src = imagePath
    selectedImageElem.style.opacity = '1'
    document.getElementById('panorama-image-input').value = imagePath
  }
}

export const UploadImage = async (imgFile, proccess) => {
  let formData = new FormData()
  const proccessBar = proccess.querySelector('.progress-bar')

  proccess.classList.remove('hide')
  proccessBar.style.width = '0%'
  formData.append('image', imgFile)
  proccessBar.style.width = '20%'

  const response = await fetch(`${baseURL}/ads/uploadImage`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  })

  console.log(response)

  const result = await response.json()

  if (response.status !== 200) {
    ToastBox('error', result.msg, 3000, null, null)
    proccess.classList.add('hide')
    return null
  }

  proccessBar.style.width = '100%'
  proccess.classList.add('hide')
  ToastBox('success', 'image uploaded successfully!', 3000, null, null)
  return result.image

}

export const RemoveAd = async () => {
  const adId = GetUrlParams('item')

  if (!adId) return

  MsgBox(
    'warning',
    'Are you sure?? after deleting there is no way to recover data!',
    'Cancel',
    'Delete',
    async () => {
      ToggleGlobalLoader('Deleteing ...')

      const response = await fetch(`${baseURL}/ads/${adId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const result = await response.json()

      if (response.status === 200) {
        ToggleGlobalLoader()
        ToastBox(
          'success',
          result.msg,
          3000,
          'OK',
          () => { RedirectTo(`./ads.html`) }
        )
      } else {
        ToggleGlobalLoader()
        ToastBox(
          'error',
          result.msg,
          3000,
          null,
          null
        )
      }
    },
    null
  )
}

export const CreateNewAd = async (inputGroup) => {
  ToggleGlobalLoader('Creating ...')
  const isInputsOK = ValidateAdInputs(inputGroup)

  if (!isInputsOK) return ToggleGlobalLoader()

  const bodyObject = {
    title: inputGroup.titleInput.value.trim(),
    area: Number(inputGroup.areaInput.value.trim()),
    propType: inputGroup.propTypeInput.value.trim(),
    adType: inputGroup.adTypeInput.value.trim(),
    primaryPrice: inputGroup.primaryPriceInput.value.trim().length ? Number(inputGroup.primaryPriceInput.value.trim()) : 0,
    secondaryPrice: inputGroup.secondaryPriceInput.value.trim().length ? Number(inputGroup.secondaryPriceInput.value.trim()) : 0,
    cover: inputGroup.coverImageInput.value.trim(),
    panorama: inputGroup.panoramaImageInput.value.trim(),
    rooms: Number(inputGroup.roomsInput.value.trim()),
    floorLevel: inputGroup.floorInput.value.trim().length ? Number(inputGroup.floorInput.value.trim()) : 0,
    totalFloors: inputGroup.totalFloorsInput.value.trim().length ? Number(inputGroup.totalFloorsInput.value.trim()) : 0,
    elavator: inputGroup.elavatorInput.checked ? true : false,
    parking: inputGroup.parkingInput.checked ? true : false,
    warehouse: inputGroup.warehousInput.checked ? true : false,
    yearOfCunstruction: inputGroup.YOCInput.value.trim().length ? Number(inputGroup.YOCInput.value.trim()) : 0,
    location: inputGroup.locationInput.value.trim(),
    district: inputGroup.districtInput.value.trim().length ? Number(inputGroup.districtInput.value.trim()) : 0,
    publish: inputGroup.publishInput.checked ? true : false,
    description: inputGroup.descriptionInput.value.trim()
  }

  const response = await fetch(`${baseURL}/ads`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject),
    credentials: 'include'
  })

  console.log(response.status)

  const result = await response.json()

  if (response.status === 201) {
    ToggleGlobalLoader()
    ToastBox(
      'success',
      result.msg,
      3000,
      'OK',
      () => { RedirectTo(`./ad-detailes.html?item=${result.ad._id}`) }
    )
  } else {
    ToggleGlobalLoader()
    ToastBox(
      'error',
      result.msg,
      3000,
      null,
      null
    )
  }
}

export const UpdateCurrentAd = async (adId, inputGroup) => {
  ToggleGlobalLoader('Updating ...')
  const isInputsOK = ValidateAdInputs(inputGroup)

  if (!isInputsOK) return ToggleGlobalLoader()

  const bodyObject = {
    title: inputGroup.titleInput.value.trim(),
    area: Number(inputGroup.areaInput.value.trim()),
    propType: inputGroup.propTypeInput.value.trim(),
    adType: inputGroup.adTypeInput.value.trim(),
    primaryPrice: inputGroup.primaryPriceInput.value.trim().length ? Number(inputGroup.primaryPriceInput.value.trim()) : 0,
    secondaryPrice: inputGroup.secondaryPriceInput.value.trim().length ? Number(inputGroup.secondaryPriceInput.value.trim()) : 0,
    cover: inputGroup.coverImageInput.value.trim(),
    panorama: inputGroup.panoramaImageInput.value.trim(),
    rooms: Number(inputGroup.roomsInput.value.trim()),
    floorLevel: inputGroup.floorInput.value.trim().length ? Number(inputGroup.floorInput.value.trim()) : 0,
    totalFloors: inputGroup.totalFloorsInput.value.trim().length ? Number(inputGroup.totalFloorsInput.value.trim()) : 0,
    elavator: inputGroup.elavatorInput.checked ? true : false,
    parking: inputGroup.parkingInput.checked ? true : false,
    warehouse: inputGroup.warehousInput.checked ? true : false,
    yearOfCunstruction: inputGroup.YOCInput.value.trim().length ? Number(inputGroup.YOCInput.value.trim()) : 0,
    location: inputGroup.locationInput.value.trim(),
    district: inputGroup.districtInput.value.trim().length ? Number(inputGroup.districtInput.value.trim()) : 0,
    publish: inputGroup.publishInput.checked ? true : false,
    description: inputGroup.descriptionInput.value.trim()
  }

  const response = await fetch(`${baseURL}/ads/${adId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject),
    credentials: 'include'
  })

  const result = await response.json()

  if (response.status === 200) {
    ToggleGlobalLoader()
    ToastBox(
      'success',
      'Success! update completed',
      3000,
      null,
      null
    )
  } else {
    ToggleGlobalLoader()
    ToastBox(
      'error',
      result.msg,
      3000,
      null,
      null
    )
  }
}

export const RenderAdCharts = async (adId) => {
  const viewChartWrapper = document.getElementById('charts-view-wrapper')
  const requestChartWrapper = document.getElementById('charts-request-wrapper')
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000))

  const adViewsData = await GetSingleAdViewsData(adId)
  const adRequestsData = await GetAllRequests({ itemPerPage: 100, ad: adId })

  if (adViewsData && adViewsData.length) {

    const filteredData = adViewsData.map((item) => {
      if (new Date(item[0]) >= thirtyDaysAgo && new Date(item[0]) <= today) {
        return item
      }
    })

    let chartConfigs = {
      type: 'line',
      data: {
        labels: filteredData.map(data => data[0]),
        datasets: [{
          label: 'Views (last 30 days)',
          data: filteredData.map(data => data[1]),
          backgroundColor: 'rgba(70, 10, 255, 0.5)',
          borderColor: 'rgba(70, 10, 255, 1)',
          borderWidth: 2,
          lineTension: 0.4,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            min: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }

    CreateChart(viewChartWrapper, chartConfigs)
  } else {
    viewChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }

  if (adRequestsData && adRequestsData.requests?.length) {

    const statusCounts = {
      completed: 0,
      canceled: 0,
      pending: 0,
    }

    adRequestsData.requests.forEach(request => {
      const status = request.status;
      statusCounts[status]++
    })

    let chartConfigs = {
      type: 'bar',
      data: {
        labels: ['pending', 'completed', 'canceled'],
        datasets: [
          {
            label: '',
            data: Object.values(statusCounts),
            backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
            borderWidth: 2,
            lineTension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 0,
            }
          },
          title: {
            display: true,
            text: 'Top 100 request states'
          }
        }
      }
    }

    CreateChart(requestChartWrapper, chartConfigs)
  } else {
    requestChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }
}

export const GetAdDetailes = async (adId) => {

  if (!adId) return null

  const response = await fetch(`${baseURL}/ads/${adId}`, {
    credentials: 'include'
  })

  if (response.status === 200) {
    const result = await response.json()
    return result.ad
  }

  return null
}

