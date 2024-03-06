import {
  RenderLatestAds,
  RenderMostViewedAds
} from './functions/functions.js'

window.addEventListener('load', async () => {
  await RenderLatestAds()
  await RenderMostViewedAds()

  const scrollerElem = document.querySelector('.trust__body')

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && scrollerElem !== null) {
    addAnimation(scrollerElem)
  }
})

function addAnimation(elem) {
  elem.setAttribute('data-animated', true)
  const scroolerListElem = elem.querySelector('.trust__body-list')
  const scrollerContents = Array.from(scroolerListElem.children)

  scrollerContents.forEach(item => {
    const duplicatedItem = item.cloneNode(true)
    duplicatedItem.setAttribute('aria-hidden', true)
    scroolerListElem.appendChild(duplicatedItem)
  })
}