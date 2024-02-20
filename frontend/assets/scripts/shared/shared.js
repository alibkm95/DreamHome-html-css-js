import {
  OpenMenu,
  CloseMenu,
  OpenSubMenu,
  CloseSubMenues,
  ToggleNotif
} from '../functions/functions.js'

window.addEventListener('load', () => {
  const openMenuBtn = document.querySelector('.menu__open')
  const menuCloseBtn = document.querySelector('.menu__close-btn')
  const notifBtn = document.querySelector('.menu__actions-notification')
  const menuLinkElems = document.querySelectorAll('.menu__link')
  const subMenuParentElems = document.querySelectorAll('.has-submenu')
  const subMenuLinkElems = document.querySelectorAll('.submenu__link')

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

})

