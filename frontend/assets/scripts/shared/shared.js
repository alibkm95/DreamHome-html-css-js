import {
  OpenMenu,
  CloseMenu,
  OpenSubMenu,
  CloseSubMenues,
  ToggleNotif,
  RedirectToHome
} from '../functions/functions.js'

import {
  GetMe
} from '../functions/utils.js'

window.addEventListener('load', async () => {
  const openMenuBtn = document.querySelector('.menu__open')
  const menuCloseBtn = document.querySelector('.menu__close-btn')
  const notifBtn = document.querySelector('.menu__actions-notification')
  const menuLinkElems = document.querySelectorAll('.menu__link')
  const subMenuParentElems = document.querySelectorAll('.has-submenu')
  const subMenuLinkElems = document.querySelectorAll('.submenu__link')
  const openSearchLogElem = document.querySelector('.search-trigger')
  const redirectToPanelElem = document.getElementById('panels-user-name')

  openMenuBtn.addEventListener('click', () => {
    OpenMenu()
  })

  menuCloseBtn.addEventListener('click', () => {
    CloseMenu()
  })

  menuLinkElems.forEach(elem => {
    elem.addEventListener('click', () => {
      CloseMenu()
    })
  })

  subMenuParentElems.forEach(parent => {
    const parentHeaderElem = parent.querySelector('.menu__list-item-header')
    const childSubmenu = parent.querySelector('.submenu')
    parentHeaderElem.addEventListener('click', () => {
      OpenSubMenu(childSubmenu)
    })
  })

  subMenuLinkElems.forEach(elem => {
    elem.addEventListener('click', () => {
      CloseSubMenues()
    })
  })

  notifBtn.addEventListener('click', () => {
    ToggleNotif()
  })

  openSearchLogElem.addEventListener('click', () => {
    Swal.fire({
      title: "Search in ads",
      input: "text",
      inputPlaceholder: "Type your key words here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      confirmButtonText: "Search",
      confirmButtonColor: "var(--bs-indigo)",
      showCancelButton: true,
      cancelButtonColor: "var(--orange)"
    })
      .then(result => {
        if (result.isConfirmed) {
          window.location.href = `./search.html?search=${result.value}`
        }
      })
  })

  const user = await GetMe()

  if (user) {
    const isInLogin = document.querySelector('main[data-page="login"]')
    const isInRegister = document.querySelector('main[data-page="register"]')

    if (isInLogin || isInRegister) {
      return RedirectToHome()
    }

    let userNameFlag = user.name
    userNameFlag = userNameFlag.length > 9 ? userNameFlag.slice(0, 8).concat('...') : userNameFlag
    redirectToPanelElem.innerHTML = ''
    redirectToPanelElem.insertAdjacentHTML('afterbegin', `
      <span class="menu__text">
        ${userNameFlag}
      </span>
    `)
    redirectToPanelElem.classList.remove('cta')
    redirectToPanelElem.setAttribute('href', `./user-panel.html?user=${user.userId}`)
  } else {
    const isInUserPanel = document.querySelector('main[data-page="user-panel"]')

    if (isInUserPanel) return RedirectToHome()

    redirectToPanelElem.innerHTML = ''
    redirectToPanelElem.insertAdjacentHTML('afterbegin', `
    <div class="menu__icon-not">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>
    <span class="menu__text">
      Login
    </span>
    `)
    redirectToPanelElem.classList.add('cta')
    redirectToPanelElem.setAttribute('href', `./login.html`)
  }
})

