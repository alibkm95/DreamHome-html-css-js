import {
  ToggleSidebarMenu
} from '../functions/functions.js'

window.addEventListener('load', async () => {
  const menuTogglerOuterElem = document.getElementById('menu-toggler-outer')
  const sidebarElem = document.querySelector('.sidebar')

  menuTogglerOuterElem.addEventListener('click', () => {
    ToggleSidebarMenu(menuTogglerOuterElem, sidebarElem)
  })
})