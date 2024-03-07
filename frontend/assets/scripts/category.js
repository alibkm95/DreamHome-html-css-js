import {
  RenderNotFound,
  RenderItemBox,
  GetUrlParams,
  baseURL,
  NextPageHandler,
  PrevPageHandler,
  JumpToPageHandler,
  RenderLatestAds,
  RenderMostViewedAds,
  ToggleGlobalLoader,
  AddParamToUrl
} from './functions/functions.js'

let propType = GetUrlParams('propType') || 'all'
let adType = GetUrlParams('adType') || 'all'
let sort = GetUrlParams('sort') || 'newest'
let itemPerPage = getComputedStyle(document.documentElement).getPropertyValue('--item-per-page')
let page = GetUrlParams('page')
let totalPages = null

window.addEventListener('load', async () => {
  ToggleGlobalLoader()

  const filterBar = document.getElementById('filter-form')
  const propTypeElem = document.getElementById('prop-type')
  const adTypeElem = document.getElementById('ad-type')
  const sortElem = document.getElementById('sort-type')

  propTypeElem.value = propType
  adTypeElem.value = adType
  sortElem.value = sort

  const result = await fetch(`${baseURL}/ads?page=${page ? page : 1}&itemPerPage=${itemPerPage}&propType=${propType}&adType=${adType}&sort=${sort}`)
  const response = await result.json()

  const ads = response.ads
  totalPages = response.numOfPages

  await RenderLatestAds()
  await RenderMostViewedAds()

  if (!ads.length) {
    const mainElem = document.querySelector('.main')
    return RenderNotFound(mainElem)
  }

  const categoryParentElem = document.querySelector('.category')
  const paginationParent = document.querySelector('.pagination')
  const nextBtn = document.querySelector('.next-btn')
  const prevBtn = document.querySelector('.prev-btn')
  const pagesInfoElem = document.querySelector('.pagination__current')
  const jumpInput = document.getElementById('jump-input')
  const jumpBtn = document.querySelector('.jump-btn')
  const categoryWrapper = document.getElementById('category-wrapper')

  categoryParentElem.classList.remove('hide')
  RenderItemBox(categoryWrapper, ads)

  filterBar.addEventListener('submit', event => {
    event.preventDefault()

    const filterPropsArr = [
      { key: 'propType', value: propTypeElem.value },
      { key: 'adType', value: adTypeElem.value },
      { key: 'sort', value: sortElem.value },
      { key: 'page', value: 1 },
      { key: 'itemPerPage', value: itemPerPage },
    ]

    AddParamToUrl(filterPropsArr)
  })

  ToggleGlobalLoader()

  if (totalPages <= 1) {
    return
  }

  paginationParent.classList.remove('hide')

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