import {
  RenderRequestCharts,
  RenderNotFound,
  GetUrlParams,
  GetAllRequests,
  RenderRequestsTable,
  ShowRequestDetailesModal,
  ShowRequestStatusModal,
  DeleteRequest,
  AddParamToUrl,
  ToggleGlobalLoader,
  UpdateRequestStatus,
  NextPageHandler,
  PrevPageHandler,
  JumpToPageHandler,
} from './functions/functions.js'

window.ShowRequestDetailesModal = ShowRequestDetailesModal
window.ShowRequestStatusModal = ShowRequestStatusModal
window.DeleteRequest = DeleteRequest

window.addEventListener('load', async () => {
  ToggleGlobalLoader('Loading ...')

  let maxDate = GetUrlParams('maxDate') || ''
  let minDate = GetUrlParams('minDate') || ''
  let reqStatus = GetUrlParams('status') || 'all'
  let userEmail = GetUrlParams('user') || ''
  let page = GetUrlParams('page') || 1
  let itemPerPage = 20
  let totalPages = null

  const filterBar = document.getElementById('filter-form')
  const maxDateInput = document.getElementById('max-date')
  const minDateInput = document.getElementById('min-date')
  const statusTypeInput = document.getElementById('status-type')
  const userInput = document.getElementById('user-type')
  const statusForm = document.querySelector('.status-form')

  maxDateInput.value = maxDate
  minDateInput.value = minDate
  statusTypeInput.value = reqStatus
  userInput.value = userEmail

  await RenderRequestCharts()

  let reqOptions = {
    status: reqStatus,
    page,
    itemPerPage,
  }

  if (
    !isNaN(Date.parse(new Date(maxDate).toLocaleDateString('en-CA'))) &&
    !isNaN(Date.parse(new Date(minDate).toLocaleDateString('en-CA')))
  ) {
    reqOptions.maxDate = maxDate
    reqOptions.minDate = minDate
  }

  if (userEmail.length) {
    reqOptions.user = userEmail
  }

  const requestsData = await GetAllRequests(reqOptions)

  const requests = requestsData.requests
  totalPages = requestsData.numOfPages

  if (!requests.length) {
    document.querySelector('.charts').classList.add('hide')
    document.querySelector('.filter').classList.add('hide')
    RenderNotFound(document.querySelector('.requests__body'))
    ToggleGlobalLoader()
    return
  }

  const dataTabelParentElem = document.getElementById('data-container')

  RenderRequestsTable(dataTabelParentElem, requests, page, itemPerPage)

  filterBar.addEventListener('submit', event => {
    event.preventDefault()

    const filterPropsArr = [
      { key: 'maxDate', value: maxDateInput.value.length ? new Date(maxDateInput.value).toLocaleDateString('en-CA') : '' },
      { key: 'minDate', value: minDateInput.value.length ? new Date(minDateInput.value).toLocaleDateString('en-CA') : '' },
      { key: 'status', value: statusTypeInput.value },
      { key: 'user', value: userInput.value.trim().length ? userInput.value.trim() : '' },
      { key: 'page', value: 1 },
    ]

    AddParamToUrl(filterPropsArr)
  })

  statusForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    await UpdateRequestStatus(event.target, dataTabelParentElem, page, itemPerPage)
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
