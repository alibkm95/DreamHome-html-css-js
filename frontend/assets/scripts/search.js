import {
  RenderNotFound,
  RenderItemBox,
  GetUrlParams,
  RedirectToHome,
  baseURL,
  NextPageHandler,
  PrevPageHandler,
  JumpToPageHandler
} from './functions/functions.js'

let searchQuery = GetUrlParams('search')
let itemPerPage = getComputedStyle(document.documentElement).getPropertyValue('--item-per-page')
let page = GetUrlParams('page')
let totalPages = null

window.addEventListener('load', async () => {

  if (!searchQuery) {
    RedirectToHome()
    return
  }

  const result = await fetch(`${baseURL}/ads?page=${page ? page : 1}&itemPerPage=${itemPerPage}&search=${searchQuery}`)
  const response = await result.json()

  const ads = response.ads
  totalPages = response.numOfPages

  if (!ads.length) {
    const mainElem = document.querySelector('.main')
    return RenderNotFound(mainElem)
  }

  const resultParentElem = document.querySelector('.result')
  const paginationParent = document.querySelector('.pagination')
  const nextBtn = document.querySelector('.next-btn')
  const prevBtn = document.querySelector('.prev-btn')
  const pagesInfoElem = document.querySelector('.pagination__current')
  const jumpInput = document.getElementById('jump-input')
  const jumpBtn = document.querySelector('.jump-btn')
  const resultWrapper = document.getElementById('result-wrapper')

  resultParentElem.classList.remove('hide')
  RenderItemBox(resultWrapper, ads)

  if (totalPages > 1) {
    paginationParent.classList.remove('hide')
  }

  nextBtn.addEventListener('click', () => NextPageHandler(page ? page : 1, totalPages))
  prevBtn.addEventListener('click', () => PrevPageHandler(page ? page : 1))
  jumpBtn.addEventListener('click', () => JumpToPageHandler(jumpInput.value.trim(), totalPages))

  pagesInfoElem.insertAdjacentHTML('afterbegin', `
    Page <span class="pagination__current-active">${page ? page : 1}</span> of ${totalPages}
  `)
})

window.addEventListener('resize', () => {
  itemPerPage = getComputedStyle(document.documentElement).getPropertyValue('--item-per-page')
})