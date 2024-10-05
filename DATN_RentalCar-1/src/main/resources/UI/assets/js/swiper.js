new Swiper('.img-slider', {
  slidesPerView: 3,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    576: {
      slidesPerView: 2,
    },
  },
  autoplay: {
    delay: 1800,
  },
})

new Swiper('.address-list', {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  },
})

new Swiper('.topdes-slider', {
  slidesPerView: 4,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next-topdes',
    prevEl: '.swiper-button-prev-topdes',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  },
})

new Swiper('.blog-slider', {
  slidesPerView: 2,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next-blog',
    prevEl: '.swiper-button-prev-blog',
  },
})

new Swiper('.slider-2', {
  slidesPerView: 5,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
  },
})

new Swiper('.slider-video', {
  slidesPerView: 3,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
})

new Swiper('.slider-brand', {
  slidesPerView: 5,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
  },
})

new Swiper('.slider-footer')

// new Swiper('.mySwiper', {
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// })

// new Swiper('.mySwiper2', {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// })

// new Swiper('.mySwiper3', {
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// })
const menuEl = document.querySelector('.menu-mobile1')
const closeEl = document.querySelector('.close-menu')
const openMenuEl = document.querySelector('.menu-mobile')

closeEl.addEventListener('click', () => {
  menuEl.classList.add('move-left')
})

openMenuEl.addEventListener('click', () => {
  menuEl.classList.remove('move-left')
})
