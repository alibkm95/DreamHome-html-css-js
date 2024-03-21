import {
  RedirectTo,
  ToggleSidebarMenu
} from '../functions/functions.js'
import { GetMe, GetUserInfos } from '../functions/utils.js'

window.addEventListener('load', async () => {
  const menuTogglerOuterElem = document.getElementById('menu-toggler-outer')
  const sidebarElem = document.querySelector('.sidebar')
  const adminProfileElem = document.getElementById('header-user-profile-img')
  const adminNameElem = document.querySelector('.topbar__user-infos-name')
  const adminRoleElem = document.querySelector('.topbar__user-infos-role')

  menuTogglerOuterElem.addEventListener('click', () => {
    ToggleSidebarMenu(menuTogglerOuterElem, sidebarElem)
  })

  const user = await GetMe()

  if (user) {
    const userInfos = await GetUserInfos(user.userId)

    if (userInfos.role !== 'ROOTADMIN' && userInfos.role !== 'ADMIN') {
      RedirectTo('../frontend/index.html')
    }

    adminProfileElem.setAttribute('src', userInfos.profile)
    adminNameElem.innerText = userInfos.name
    adminRoleElem.innerText = userInfos.role
  } else {
    RedirectTo('../frontend/index.html')
  }
})