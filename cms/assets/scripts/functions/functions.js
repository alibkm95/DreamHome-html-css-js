
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
    <div class="not-found">
      <div class="container">
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

export const GetAllRequests = async (reqOptions = null) => {

  let reqURL = `${baseURL}/request`

  if (reqOptions) {
    reqURL += '?'

    const reqParams = Object.entries(reqOptions);
    reqParams.forEach(([key, value]) => {
      if (value) {
        reqURL += `${key}=${value}`
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
        reqURL += `${key}=${value}`
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
        reqURL += `${key}=${value}`
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