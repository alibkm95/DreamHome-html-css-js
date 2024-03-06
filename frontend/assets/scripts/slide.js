

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

const similarSwiper = new Swiper('.similarSwiper', {

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



