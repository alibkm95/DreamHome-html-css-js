import {
  ValidateAdInputs,
  IsNotEmpty
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

const ClassGenerator = (status) => {
  if (status === 'pending') {
    return 'text-warning'
  }

  if (status === 'completed' || status === 'answered') {
    return 'text-success'
  }

  if (status === 'canceled' || status === 'closed') {
    return 'text-danger'
  }
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
  parentElem.innerHTML = ''
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

export const RenderRequestsTable = (parentElem, items, page, itemPerPage) => {
  parentElem.innerHTML = ''
  items.map((item, index) => {
    parentElem.insertAdjacentHTML('beforeend', `
      <tr>
        <th scope="row">
          ${(index + 1) + ((page - 1) * itemPerPage)}
        </th>
        <td>
          ${item.ad.title}
        </td>
        <td>
          ${item.user.name}
        </td>
        <td>
          ${new Date(item.createdAt).toLocaleDateString('en-CA')}
        </td>
        <td class="${ClassGenerator(item.status)}">
          ${item.status}
        </td>
        <td>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownBtn" data-bs-toggle="dropdown"
              aria-expanded="false">
              actions
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownBtn">
              <li>
                <button class="dropdown-item" onclick="ShowRequestDetailesModal('${item._id}')">
                  Detailes
                </button>
              </li>
              <li>
                <button class="dropdown-item" onclick="ShowRequestStatusModal('${item._id}', '${item.status}', '${item.user.email}')">
                  Manage status
                </button>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <button class="dropdown-item text-danger" onclick="DeleteRequest('${item._id}')">
                  Delete request
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    `)
  })
}

export const RenderTicketsTable = (parentElem, items, page, itemPerPage) => {
  parentElem.innerHTML = ''
  items.map((item, index) => {
    parentElem.insertAdjacentHTML('beforeend', `
      <tr>
        <th scope="row">
        ${(index + 1) + ((page - 1) * itemPerPage)}
        </th>
        <td>
          ${item.subject}
        </td>
        <td>
          <p class="sender-name">${item.user.name}</p>
          <p class="sender-email">${item.user.email}</p>
        </td>
        <td>
          ${new Date(item.createdAt).toLocaleDateString('en-CA')}
        </td>
        <td class="${ClassGenerator(item.ticketStatus)}">
          ${item.ticketStatus}
        </td>
        <td>
          <a href="./ticket-detailes.html?item=${item._id}" class="btn-style tickets__link">
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
    publish: inputGroup.publishInput.selectedIndex === 0 ? true : false,
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

export const GetTicketDetailes = async (ticketID) => {

  if (!ticketID) return null

  const response = await fetch(`${baseURL}/tickets/${ticketID}`, {
    credentials: 'include'
  })

  if (response.status === 200) {
    const result = await response.json()
    return result.ticket
  }

  return null
}

export const RenderRequestCharts = async () => {
  const requestChartWrapper = document.getElementById('charts-request-wrapper')
  const statusChartWrapper = document.getElementById('charts-status-wrapper')

  const requestsData = await GetAllRequests({ itemPerPage: 100 })

  if (requestsData && requestsData.requests?.length) {

    const requestsGroup = GroupData(requestsData.requests)

    const statusCounts = {
      pending: 0,
      completed: 0,
      canceled: 0,
    }

    requestsData.requests.forEach(request => {
      const status = request.status;
      statusCounts[status]++
    })

    let requestCountChartConfigs = {
      type: 'line',
      data: {
        labels: requestsGroup.map(req => { return req[0] }),
        datasets: [{
          label: 'Requests (top 100)',
          data: requestsGroup.map(req => { return req[1] }),
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

    let requestStatusChartConfigs = {
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

    CreateChart(requestChartWrapper, requestCountChartConfigs)
    CreateChart(statusChartWrapper, requestStatusChartConfigs)
  } else {
    requestChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)

    viewChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }
}

export const RenderTicketCharts = async () => {
  const ticketChartWrapper = document.getElementById('charts-ticket-wrapper')
  const statusChartWrapper = document.getElementById('charts-status-wrapper')

  const ticketsData = await GetAllTickets({ itemPerPage: 100 })

  if (ticketsData && ticketsData.tickets?.length) {

    const ticketsGroup = GroupData(ticketsData.tickets)

    const statusCounts = {
      pending: 0,
      answered: 0,
      closed: 0,
    }

    ticketsData.tickets.forEach(ticket => {
      const status = ticket.ticketStatus;
      statusCounts[status]++
    })

    let ticketCountChartConfigs = {
      type: 'line',
      data: {
        labels: ticketsGroup.map(req => { return req[0] }),
        datasets: [{
          label: 'Tickets (top 100)',
          data: ticketsGroup.map(req => { return req[1] }),
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

    let ticketStatusChartConfigs = {
      type: 'bar',
      data: {
        labels: ['pending', 'answered', 'closed'],
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

    CreateChart(ticketChartWrapper, ticketCountChartConfigs)
    CreateChart(statusChartWrapper, ticketStatusChartConfigs)

  } else {
    ticketChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)

    statusChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }
}

const GroupData = (data) => {
  const result = data.reduce((acc, item) => {
    const date = new Date(item.createdAt).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(result);
}

export const ShowRequestDetailesModal = async (reqID) => {
  ToggleGlobalLoader('Getting data ...')

  const response = await fetch(`${baseURL}/request/${reqID}`, {
    credentials: 'include'
  })

  const result = await response.json()

  if (response.status !== 200) {
    ToggleGlobalLoader()
    console.log(response)
    return ToastBox(
      'error',
      `error ${response.status} - refresh page and try again!`,
      3000,
      null,
      null
    )
  }

  const request = result.request[0]
  const detailesModalParent = document.querySelector('.detailes-modal')
  const detailesModalDataWrapper = document.querySelector('.detailes-modal__body')
  const detailesModalCloseBtn = document.getElementById('detailes-modal-close')

  detailesModalDataWrapper.innerHTML = ''
  detailesModalDataWrapper.insertAdjacentHTML('beforeend', `
    <ul class="ad mb-4">
      <li class="ad-cover">
        <img class="d-block w-100 rounded" src="${request.ad.cover}">
      </li>
      <li class="ad-title">
        Title:
        <span>
          ${request.ad.title}
        </span>
      </li>
      <li class="ad-propType">
        Property type:
        <span>
          ${request.ad.propType}
        </span>
      </li>
      <li class="ad-adType">
        Ad type:
        <span>
          ${request.ad.adType}
        </span>
      </li>
      <li class="ad-primaryPrice">
        ${TitleGenerator(request.ad.adType)[0]}
        <span>
          ${request.ad.primaryPrice.toLocaleString()}
        </span>
      </li>
      <li class="ad-secondaryPrice">
      ${TitleGenerator(request.ad.adType)[1]}
        <span>
        ${request.ad.secondaryPrice.toLocaleString()}
        </span>
      </li>
      <li class="ad-full-info">
        <a href="./ad-detailes.html?item=${request.ad._id}" class="ad-info-btn btn-style">
          ad's full info
        </a>
      </li>
    </ul>
    <ul class="applicant mt-2 pt-4 border-top">
      <li class="applicant-profile">
        <img src="${request.user.profile}" class="d-block w-100">
      </li>
      <li class="applicant-name">
        Name:
        <span>
          ${request.user.name}
        </span>
      </li>
      <li class="applicant-email">
        Email:
        <span>
          ${request.user.email}
        </span>
      </li>
      <li class="applicant-phone">
        Phone:
        <span>
          ${request.user.phone}
        </span>
      </li>
    </ul>
  `)

  detailesModalCloseBtn.addEventListener('click', () => {
    detailesModalParent.classList.add('hide')
  })

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      detailesModalParent.classList.add('hide')
    }
  })

  detailesModalParent.classList.remove('hide')

  ToggleGlobalLoader()
}

export const ShowRequestStatusModal = async (reqID, reqState, email) => {
  const statusModal = document.querySelector('.status-modal')
  const statusForm = document.querySelector('.status-form')
  const pendingRadioBtn = document.getElementById('pending-rdo')
  const completeRadioBtn = document.getElementById('complete-rdo')
  const cancelRadioBtn = document.getElementById('cancel-rdo')
  const subjectInput = document.getElementById('subject-input')
  const messageInput = document.getElementById('msg-input')
  const statusModalCloseBtn = document.getElementById('status-modal-close')

  subjectInput.value = ''
  messageInput.value = ''

  switch (reqState) {
    case 'pending':
      pendingRadioBtn.checked = true
      break;
    case 'completed':
      completeRadioBtn.checked = true
      break;
    case 'canceled':
      cancelRadioBtn.checked = true
      break;
    default:
      statusModal.classList.add('hide')
      break;
  }

  statusForm.setAttribute('data-id', reqID)
  statusForm.setAttribute('data-user', email)
  statusModal.classList.remove('hide')

  statusModalCloseBtn.addEventListener('click', () => {
    statusModal.classList.add('hide')
  })

  window.addEventListener('click', event => {
    if (event.target == statusModal) {
      statusModal.classList.add('hide')
    }
  })

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      statusModal.classList.add('hide')
    }
  })
}

export const UpdateRequestStatus = async (target) => {
  const statusModal = document.querySelector('.status-modal')

  ToggleGlobalLoader('Updating ...')
  statusModal.classList.add('hide')

  const pendingRadioBtn = document.getElementById('pending-rdo')
  const completeRadioBtn = document.getElementById('complete-rdo')
  const cancelRadioBtn = document.getElementById('cancel-rdo')
  const subjectInput = document.getElementById('subject-input')
  const messageInput = document.getElementById('msg-input')
  const email = target.getAttribute('data-user')
  const id = target.getAttribute('data-id')
  let state = null

  switch (true) {
    case pendingRadioBtn.checked:
      state = 'pending'
      break;
    case completeRadioBtn.checked:
      state = 'completed'
      break;
    case cancelRadioBtn.checked:
      state = 'canceled'
      break;
    default:
      state = null
      break;
  }

  let bodyObject = {
    email,
    message: IsNotEmpty(messageInput.value.trim()) ? messageInput.value.trim() : null,
    subject: IsNotEmpty(subjectInput.value.trim()) ? subjectInput.value.trim() : null
  }

  const response = await fetch(`${baseURL}/request/${id}?status=${state}`, {
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
      result.msg,
      3000,
      null,
      () => { window.location.reload() }
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

export const DeleteRequest = async (reqID) => {

  MsgBox(
    'warning',
    'Are you sure about delete this request? after delete there is no war to recover data!',
    'Cancel',
    'Remove',
    async () => {

      ToggleGlobalLoader('Removing ...')

      const response = await fetch(`${baseURL}/request/${reqID}`, {
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
          null,
          () => { window.location.reload() }
        )
      } else if (response.status === 403) {
        ToggleGlobalLoader()
        ToastBox(
          'error',
          'only root admin able to remove request',
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
    },
    null
  )
}

export const RenderTicketDetailes = async (ticketID, ticketObject = null) => {
  let ticket = null

  if (ticketObject) {
    ticket = ticketObject
  } else {
    ticket = await GetTicketDetailes(ticketID)
  }

  if (!ticket) {
    return RedirectTo('./tickets.html')
  }

  const ticketInfosContainer = document.querySelector('.ticket__info-container')
  ticketInfosContainer.innerHTML = ''

  ticketInfosContainer.insertAdjacentHTML('afterbegin', `
    <span class="ticket__info-title">
      <i class="fa-solid fa-circle"></i>
      title:
    </span>
    <p class="ticket__info-text title-text fs-5" id="ticket-title">
      ${ticket.subject}
    </p>
    <span class="ticket__info-title">
      <i class="fa-solid fa-clock"></i>
      created at:
    </span>
    <p class="ticket__info-text" id="ticket-date">
      ${new Date(ticket.createdAt).toLocaleString('en-CA')}
    </p>
    <span class="ticket__info-title">
      <i class="fa-solid fa-mug-hot"></i>
      status:
    </span>
    <p class="ticket__info-text" id="ticket-status">
      ${ticket.ticketStatus}
    </p>
    <span class="ticket__info-title">
      <i class="fa-solid fa-user"></i>
      creator:
    </span>
    <p class="ticket__info-text" id="ticket-user">
      ${ticket.user.name}
    </p>
    ${ticket.ticketStatus !== 'closed' ?
      `
      <button class="ticket__info-delete btn btn-warning" onclick="CloseTicket('${ticket._id}')">
        close this ticket
      </button>
      `
      :
      `
      <div class="alert alert-warning text-center my-0">
        this ticket is closed !!!
      </div>
      `
    }
    <button class="ticket__info-delete btn btn-danger" onclick="DeleteTicket('${ticket._id}')">
      Delete this ticket
    </button>
  `)

  RenderConversations(ticket.conversations)
}

export const RenderConversations = (messages) => {
  const messagesWrapper = document.getElementById('message-wrapper')
  messagesWrapper.innerHTML = ''

  messages.forEach(msg => {
    messagesWrapper.insertAdjacentHTML('beforeend', `
      <div class="msg ${msg.creator.role === 'USER' ? 'msg-user' : 'msg-admin'}">
        <div class="msg__header">
          <img src="${msg.creator.profile}" alt="user" class="msg__header-img">
          <div class="msg__header-info">
            <span class="msg__header-info-user">
            ${msg.creator.name}
            </span>
            <span class="msg__header-info-date">
            ${new Date(msg.createdAt).toLocaleDateString() + ' - ' + new Date(msg.createdAt).toLocaleTimeString()}
            </span>
            <span class="msg__header-info-role">
            ${msg.creator.role.toLowerCase()}
            </span>
          </div>
        </div>
        <div class="msg__body">
          <div class="msg__body-text">
            ${msg.message}
          </div>
          <div class="msg__body-seen">
          ${msg.creator.role !== 'USER' ? `
            <i class="fa-solid ${msg.seenByUser ? 'fa-check-double' : 'fa-check'}"></i>
            ` : ''}
          </div>
        </div>
      </div>
    `)
  })
}

export const DeleteTicket = (ticketID) => {
  MsgBox(
    'warning',
    'Are you sure? after deleting there is no way to recover data!',
    'Cancel',
    'Delete',
    async () => {
      ToggleGlobalLoader('Deleting ...')

      const response = await fetch(`${baseURL}/tickets/${ticketID}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const result = await response.json()

      if (response.status === 200) {
        ToggleGlobalLoader()
        RedirectTo('./tickets.html')
      } else if (response.status === 403) {
        ToggleGlobalLoader()
        ToastBox(
          'error',
          'only root admin able to remove ticket',
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
    },
    null
  )
}

export const CloseTicket = (ticketID) => {
  MsgBox(
    'warning',
    'Are you sure?? after closing ticket, can not open it again!',
    'Cancel',
    'Close ticket',
    async () => {
      ToggleGlobalLoader('Closing ...')

      const response = await fetch(`${baseURL}/tickets/${ticketID}`, {
        method: "PATCH",
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
          null,
          async () => {
            await RenderTicketDetailes(ticketID, null)
          }
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

export const SendNewMessage = async (parent, ticketID) => {
  ToggleGlobalLoader('Sending ...')
  const messageInput = document.getElementById('message-input')

  messageInput.addEventListener('focus', () => {
    parent.classList.remove('border-danger')
  })

  const isMessageProvided = IsNotEmpty(messageInput.value)
  if (!isMessageProvided) {
    ToggleGlobalLoader()
    ToastBox('error', 'message content is required', 3000, null, null)
    parent.classList.add('border-danger')
    return
  }

  const bodyObject = {
    newMessage: messageInput.value.trim()
  }

  const response = await fetch(`${baseURL}/tickets/addNewMsg/${ticketID}`, {
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
    messageInput.value = ''
    await RenderTicketDetailes(result.ticket._id, result.ticket)
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