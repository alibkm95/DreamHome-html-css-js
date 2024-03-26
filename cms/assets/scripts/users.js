import {
  GetUrlParams,
  ToggleGlobalLoader,
  GetAllUsers,
  RenderNotFound,
  RenderUsersTable,
  AddParamToUrl,
  NextPageHandler,
  PrevPageHandler,
  JumpToPageHandler,
} from './functions/functions.js'

window.addEventListener('load', async () => {
  ToggleGlobalLoader('Getting data ...')

  let nameSearch = GetUrlParams('nameSearch') || ''
  let emailSearch = GetUrlParams('emailSearch') || ''
  let verified = GetUrlParams('verified') || 'all'
  let userRole = GetUrlParams('userRole') || 'all'
  let banned = GetUrlParams('banned') || 'all'
  let page = GetUrlParams('page') || 1
  let itemPerPage = 20
  let totalPages = null

  const filterBar = document.getElementById('filter-form')
  const userNameInput = document.getElementById('user-name')
  const userEmailInput = document.getElementById('user-email')
  const verifiedInput = document.getElementById('acc-type')
  const userRoleInput = document.getElementById('role-type')
  const bannInput = document.getElementById('bann-type')

  userNameInput.value = nameSearch
  userEmailInput.value = emailSearch
  verifiedInput.value = verified
  userRoleInput.value = userRole
  bannInput.value = banned

  let reqOptions = {
    nameSearch,
    emailSearch,
    verified,
    userRole,
    banned,
    page,
    itemPerPage
  }

  const usersData = await GetAllUsers(reqOptions)
  const users = usersData.users
  totalPages = usersData.numOfPages

  if (!users.length) {
    document.querySelector('.filter').classList.add('hide')
    RenderNotFound(document.querySelector('.users__body'))
    ToggleGlobalLoader()
    return
  }

  const dataTabelParentElem = document.getElementById('data-container')

  RenderUsersTable(dataTabelParentElem, users, page, itemPerPage)

  filterBar.addEventListener('submit', event => {
    event.preventDefault()

    const filterPropsArr = [
      { key: 'nameSearch', value: userNameInput.value.trim().length ? userNameInput.value.trim() : '' },
      { key: 'emailSearch', value: userEmailInput.value.trim().length ? userEmailInput.value.trim() : '' },
      { key: 'verified', value: verifiedInput.value },
      { key: 'userRole', value: userRoleInput.value },
      { key: 'banned', value: bannInput.value },
      { key: 'page', value: 1 },
    ]

    AddParamToUrl(filterPropsArr)
  })

  ToggleGlobalLoader()

  if (totalPages <= 1) {
    return
  }

  const paginationParent = document.querySelector('.pagination')
  const nextBtn = document.querySelector('.next-btn')
  const prevBtn = document.querySelector('.prev-btn')
  const pagesInfoElem = document.querySelector('.pagination__current')
  const jumpInput = document.getElementById('jump-input')
  const jumpBtn = document.querySelector('.jump-btn')

  paginationParent.classList.remove('hide')

  nextBtn.addEventListener('click', () => NextPageHandler(page ? page : 1, totalPages))
  prevBtn.addEventListener('click', () => PrevPageHandler(page ? page : 1))
  jumpBtn.addEventListener('click', () => JumpToPageHandler(jumpInput.value.trim(), totalPages))

  pagesInfoElem.insertAdjacentHTML('afterbegin', `
    Page <span class="pagination__current-active">${page ? page : 1}</span> of ${totalPages}
  `)
})