const latestSwiper = new Swiper('.latestSwiper', {

  speed: 400,
  spaceBetween: 20,
  loop: true,

  breakpoints: {
    576: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    }
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
  },
  grabCursor: true,
  autoplay: {
    delay: 5000
  }
})

const topViewedSwiper = new Swiper('.topViewedSwiper', {

  speed: 400,
  spaceBetween: 20,
  loop: true,

  breakpoints: {
    576: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    }
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
  },
  grabCursor: true,
  autoplay: {
    delay: 5000
  }
})

const scrollerElem = document.querySelector('.trust__body')

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation()
}

function addAnimation () {
  scrollerElem.setAttribute('data-animated', true)
  const scroolerListElem = scrollerElem.querySelector('.trust__body-list')
  const scrollerContents = Array.from(scroolerListElem.children)

  scrollerContents.forEach(item => {
    const duplicatedItem = item.cloneNode(true)
    duplicatedItem.setAttribute('aria-hidden', true)
    scroolerListElem.appendChild(duplicatedItem)
  })
}