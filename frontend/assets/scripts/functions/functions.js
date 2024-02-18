const menuContentElem = document.querySelector('.menu__content')
const subMenuElems = document.querySelectorAll('.submenu')

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