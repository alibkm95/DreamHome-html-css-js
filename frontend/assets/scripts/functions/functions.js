const menuContentElem = document.querySelector('.menu__content')
const subMenuElems = document.querySelectorAll('.submenu')
const baseURL = 'http://localhost:5000/api/v1'

export const OpenMenu = () => {
  menuContentElem.classList.add('active')

  window.addEventListener('click', event => {
    if (event.target.id === 'menu-content') {
      CloseMenu()
    }
  })
}

export const CloseMenu = () => {
  menuContentElem.classList.remove('active')
}

export const OpenSubMenu = (element = null) => {
  subMenuElems.forEach(submenu => {
    if (submenu !== element) {
      submenu.classList.remove('active')
    }
  })

  if (element !== null) {
    element.classList.toggle('active')
  }
}

export const CloseSubMenues = () => {
  subMenuElems.forEach(submenu => {
    submenu.classList.remove('active')
  })
}

export const ToggleNotif = () => {
  const notifWrapperElem = document.querySelector('.menu__actions-notification-wrapper')
  notifWrapperElem.classList.toggle('active')
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

export const RedirectToHome = () => {
  window.location = './index.html'
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