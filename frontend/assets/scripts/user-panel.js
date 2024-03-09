import {
  RedirectToCMS,
  GetUrlParams,
  AddParamToUrl,
  UploadUserProfile,
  RenderAccountInfo,
  RenderUsersSaveList,
  RenderUserTickets,
  RenderUserRequests,
  ToggleGlobalLoader,
  RedirectToHome
} from './functions/functions.js'

import {
  GetUserInfos,
  LogoutUser
} from './functions/utils.js'

window.addEventListener('load', async () => {
  ToggleGlobalLoader()

  const activeSection = GetUrlParams('activeSection') || "account-info"
  const userID = GetUrlParams('user')

  if(!userID) return RedirectToHome()

  const user = await GetUserInfos(userID)

  const profileElem = document.querySelector('.panel__user-profile-img')
  const uploadInput = document.getElementById('new-profile')
  const userInfoParent = document.querySelector('.panel__user-info-list')

  profileElem.setAttribute('src', user.profile)
  userInfoParent.innerHTML = ''
  userInfoParent.insertAdjacentHTML('afterbegin', `
    <li class="panel__user-info-list-item">
      ${user.email}
    </li>
    <li class="panel__user-info-list-item">
    ${user.name}
    </li>
    <li class="panel__user-info-list-item">
      joined on: ${new Date(user.createdAt).toLocaleDateString()}
    </li>
  `)

  uploadInput.addEventListener('change', async (event) => {
    if (event.target.files.length) {
      const image = await UploadUserProfile(event.target.files[0])

      if (image) {
        profileElem.setAttribute('src', image)
      }
    }
  })

  const controlBtnsWrapper = document.querySelector('.panel__user-controls-list')

  if (user.role === 'ADMIN' || user.role === 'ROOTADMIN') {
    controlBtnsWrapper.insertAdjacentHTML('afterbegin', `
      <li class="panel__user-controls-list-item">
        <button class="panel__user-btn" data-redirect="admin-dashboard">
          <i class="fa-solid fa-chart-line"></i>
          Admin panel
        </button>
      </li>
    `)
  }

  const controlBtnElems = document.querySelectorAll('.panel__user-btn')

  controlBtnElems.forEach(btn => {
    if (btn.getAttribute('data-redirect') === activeSection) {
      btn.classList.add('active')
    }
  })

  controlBtnElems.forEach(btn => {
    btn.addEventListener('click', async (event) => {

      if (event.target.getAttribute('data-redirect') === 'log-out') {
        await LogoutUser()
      }

      if (event.target.getAttribute('data-redirect') === 'admin-dashboard') {
        RedirectToCMS()
      }

      let paramArr = [
        { key: 'activeSection', value: event.target.getAttribute('data-redirect') },
      ]

      AddParamToUrl(paramArr)
    })
  })

  switch (activeSection) {
    case "account-info":
      await RenderAccountInfo(user)
      break;
    case "saved":
      await RenderUsersSaveList()
      break;
    case "tickets":
      await RenderUserTickets()
      break;
    case "requests":
      await RenderUserRequests()
      break;
    default:
      await RenderAccountInfo(user)
      break;
  }

  ToggleGlobalLoader()
})