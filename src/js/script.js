const WindowBreakpoints = {
    TABLET: 767
};

const wrapperBtnMenu = document.querySelector('.header__menu-btn-wrapper');
const menuBtn = wrapperBtnMenu.querySelector('.header__menu-controller')
const burger = menuBtn.querySelector('.header__burger');
const cross = menuBtn.querySelector('.header__cross');
const menu = document.querySelector('.header__menu');
const menuItems = menu.querySelectorAll('.header__menu-item');
const overlay = document.querySelector('.overlay');

const headerOpenedClass = 'header--menu-opened';
const AnswerOpenedClass = 'answers--answer-opened';

const specialsBtn = document.querySelector('.specials__button');

const adjustDesktopAndTablet = () => {
    if (menu.classList.contains('header__block--hidden')) {
        menu.classList.remove('header__block--hidden');
    }
    if (!wrapperBtnMenu.classList.contains('header__block--hidden')) {
        wrapperBtnMenu.classList.add('header__block--hidden');
    }
    if (menuBtn.classList.contains('header--menu-opened')) {
        menuBtn.classList.remove('header--menu-opened');
    }
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
    }
    if (specialsBtn.classList.contains('button')) {
        specialsBtn.classList.remove('button');
    }
    menuItems.forEach(item => item.classList.remove('button'));
    // sliderDestroy();
};

const adjustMobile = () => {
    if (!menu.classList.contains('header__block--hidden')) {
        menu.classList.add('header__block--hidden');
    }

    if (wrapperBtnMenu.classList.contains('header__block--hidden')) {
        wrapperBtnMenu.classList.remove('header__block--hidden');
    }

    if (!cross.classList.contains('header__block--hidden')) {
        cross.classList.add('header__block--hidden');
    }

    if (burger.classList.contains('header__block--hidden')) {
        burger.classList.remove('header__block--hidden');
    }

    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
    }

    if (!specialsBtn.classList.contains('button')) {
        specialsBtn.classList.add('button');
    }

    menuItems.forEach(item => item.classList.add('button'));
    // sliderInit();
}

const checkWindowWidth = () => {
    if (window.matchMedia(`(max-width: ${WindowBreakpoints.TABLET}px)`).matches) {
        return WindowBreakpoints.TABLET;
    }
};

let lastWindowMode = -1;
const adjustMenu = () => {
    const currentWindowMode = checkWindowWidth();
    if (lastWindowMode !== currentWindowMode) {
        switch (currentWindowMode) {
            case WindowBreakpoints.TABLET:
                adjustMobile();
                break;
            default:
                adjustDesktopAndTablet();
                break;
        }
        lastWindowMode = currentWindowMode;
    }
};

let resizeTimeout;

function resizeThrottler() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
            resizeTimeout = null;
            adjustMenu();
        }, 10);
    }
}

window.addEventListener('resize', resizeThrottler, false);
adjustMenu();

const closeMenu = () => {
    menuBtn.classList.remove(headerOpenedClass);
    menu.classList.add('header__block--hidden');
    burger.classList.remove('header__block--hidden');
    cross.classList.add('header__block--hidden');
    overlay.classList.remove('active');
};

const openMenu = () => {
    menuBtn.classList.add(headerOpenedClass);
    burger.classList.add('header__block--hidden');
    overlay.classList.add('active');
    cross.classList.remove('header__block--hidden');
    menu.classList.remove('header__block--hidden');
};

menuBtn.addEventListener('click', () => {
    if (menuBtn.classList.contains(headerOpenedClass)) {
        closeMenu();
    } else {
        openMenu();
    }
});

// function sliderInit() {
//     container.classList.add('swiper');
//     wrapper.classList.add('swiper-wrapper');
//     slides.forEach((slide) => {
//         slide.classList.add('swiper-slide');
//     });

//     slider = new Swiper(container, {
//         width: 284,
//         spaceBetween: 20,
//         loop: true,
//         slidesPerView: 1,
//         observer: true,
//         observeParents: true,
//         navigation: {
//             nextEl: '.specials__arrow--right',
//             prevEl: '.specials__arrow--left',
//             disabledClass: 'disabled',
//         },
//     });
// }

// function sliderDestroy() {
//     slider.destroy();
//     container.classList.remove('swiper');
//     wrapper.classList.remove('swiper-wrapper');
//     slides.forEach((slide) => {
//         slide.classList.remove('swiper-slide');
//     });
// }

// СЛАЙДЕРЫЫЫЫЫ



class RecomendationSlider {
    constructor(sliderContent, btnPrev, btnNext, activeClass) {
        this.sliderContent = document.querySelectorAll(sliderContent);
        this.sliderContentLength = this.sliderContent.length;
        this.btnPrev = document.querySelector(btnPrev);
        this.btnNext = document.querySelector(btnNext);
        this.activeClass = activeClass;

        this.index = 0;
    }

    slider() {
        this.sliderContent[this.index].classList.add(this.activeClass);

        this.btnNext.addEventListener('click', () => {

            if (this.index == this.sliderContentLength - 1) {
                this.index = 0;

            } else {
                this.index++;

            }
            this.sliderContent.forEach(item => {
                item.classList.remove(this.activeClass);
            });
            this.sliderContent[this.index].classList.add(this.activeClass);
        });

        this.btnPrev.addEventListener('click', () => {
            if (this.index == 0) {
                this.index = this.sliderContentLength - 1;
            } else {
                this.index--;
            }
            this.sliderContent.forEach(item => {
                item.classList.remove(this.activeClass);
            });
            this.sliderContent[this.index].classList.add(this.activeClass);
        });
    }
}

new RecomendationSlider(
        '.specials__slider-item',
        '.specials__arrow--left',
        '.specials__arrow--right',
        'specials__slider-item--active')
    .slider();