import {
  GetAllAds,
  GetUrlParams,
  RenderNotFound,
  RenderAdsTable,
  AddParamToUrl,
  ToggleGlobalLoader,
  NextPageHandler,
  PrevPageHandler,
  JumpToPageHandler
} from "./functions/functions.js";


let propType = GetUrlParams('propType') || 'all'
let adType = GetUrlParams('adType') || 'all'
let sort = GetUrlParams('sort') || 'newest'
let search = GetUrlParams('search') || ''
let publish = GetUrlParams('publish') || 'all'
let page = GetUrlParams('page') || 1
let itemPerPage = 20
let totalPages = null

window.addEventListener('load', async () => {
  ToggleGlobalLoader('Loading...')

  const filterBar = document.getElementById('filter-form')
  const searchInputElem = document.getElementById('filter-search-input')
  const adTypeElem = document.getElementById('ad-type')
  const propTypeElem = document.getElementById('prop-type')
  const sortTypeElem = document.getElementById('sort-type')
  const publishTypeElem = document.getElementById('publish-type')

  searchInputElem.value = search
  adTypeElem.value = adType
  propTypeElem.value = propType
  sortTypeElem.value = sort
  publishTypeElem.value = publish

  const adsData = await GetAllAds({
    propType,
    adType,
    sort,
    search: search.length ? search : null,
    publish,
    page,
    itemPerPage
  })

  const ads = adsData.ads
  totalPages = adsData.numOfPages

  if (!ads.length) {
    const adsWrapperElem = document.getElementById('ads-wrapper')
    const filterBarParent = document.querySelector('.filter')
    filterBarParent.classList.add('hide')
    ToggleGlobalLoader()
    return RenderNotFound(adsWrapperElem)
  }

  const paginationParent = document.querySelector('.pagination')
  const nextBtn = document.querySelector('.next-btn')
  const prevBtn = document.querySelector('.prev-btn')
  const pagesInfoElem = document.querySelector('.pagination__current')
  const jumpInput = document.getElementById('jump-input')
  const jumpBtn = document.querySelector('.jump-btn')
  const dataTabelParentElem = document.getElementById('data-container')

  RenderAdsTable(dataTabelParentElem, ads, page, itemPerPage)

  filterBar.addEventListener('submit', event => {
    event.preventDefault()

    const filterPropsArr = [
      { key: 'propType', value: propTypeElem.value },
      { key: 'adType', value: adTypeElem.value },
      { key: 'sort', value: sortTypeElem.value },
      { key: 'search', value: searchInputElem.value.trim().length ? searchInputElem.value.trim() : '' },
      { key: 'publish', value: publishTypeElem.value },
      { key: 'page', value: 1 }
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