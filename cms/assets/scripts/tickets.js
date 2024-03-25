import {
  GetUrlParams,
  ToggleGlobalLoader,
  RenderTicketCharts,
  GetAllTickets,
  RenderTicketsTable,
  AddParamToUrl,
  RenderNotFound,
  NextPageHandler,
  PrevPageHandler,
  JumpToPageHandler,
} from "./functions/functions.js"

window.addEventListener('load', async () => {
  ToggleGlobalLoader('Loading ...')

  let maxDate = GetUrlParams('maxDate') || ''
  let minDate = GetUrlParams('minDate') || ''
  let ticketStatus = GetUrlParams('ticketStatus') || 'all'
  let userEmail = GetUrlParams('user') || ''
  let search = GetUrlParams('search') || ''
  let page = GetUrlParams('page') || 1
  let itemPerPage = 20
  let totalPages = null

  const filterBar = document.getElementById('filter-form')
  const maxDateInput = document.getElementById('max-date')
  const minDateInput = document.getElementById('min-date')
  const statusTypeInput = document.getElementById('status-type')
  const userInput = document.getElementById('user-mail')
  const searchInput = document.getElementById('filter-search')

  maxDateInput.value = maxDate
  minDateInput.value = minDate
  statusTypeInput.value = ticketStatus
  userInput.value = userEmail
  searchInput.value = search

  await RenderTicketCharts()

  let reqOptions = {
    ticketStatus,
    page,
    itemPerPage
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

  if (search.length) {
    reqOptions.search = search
  }

  const ticketsData = await GetAllTickets(reqOptions)

  const tickets = ticketsData.tickets
  totalPages = ticketsData.numOfPages

  if (!tickets.length) {
    document.querySelector('.charts').classList.add('hide')
    document.querySelector('.filter').classList.add('hide')
    RenderNotFound(document.querySelector('.tickets__body'))
    ToggleGlobalLoader()
    return
  }

  const dataTabelParentElem = document.getElementById('data-container')

  RenderTicketsTable(dataTabelParentElem, tickets, page, itemPerPage)

  filterBar.addEventListener('submit', event => {
    event.preventDefault()

    const filterPropsArr = [
      { key: 'maxDate', value: maxDateInput.value.length ? new Date(maxDateInput.value).toLocaleDateString('en-CA') : '' },
      { key: 'minDate', value: minDateInput.value.length ? new Date(minDateInput.value).toLocaleDateString('en-CA') : '' },
      { key: 'ticketStatus', value: statusTypeInput.value },
      { key: 'user', value: userInput.value.trim().length ? userInput.value.trim() : '' },
      { key: 'search', value: searchInput.value.trim().length ? searchInput.value.trim() : '' },
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