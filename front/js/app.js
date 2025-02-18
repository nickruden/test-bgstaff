Fancybox.bind("[data-fancybox]");

const header = document.querySelector('.header')
const maskOptions = {
    mask: '+{7} (#00) 000 00 00',
    definitions: {
        '#': /[1-7]|[9]/
    }
};
const burger = document.querySelector('.header-burger')
const inputPhone = [...document.querySelectorAll('input[name="phone"]'), ...document.querySelectorAll('.phone')];
const sliderDefault = [
    {name: '.team-slider', option: {loop: true}},
    {name: '.reviews-slider'},
]
const logos = document.querySelectorAll('.logos-slider.swiper')
let closeId = null
const swiperList = {
    'cases-tabs .swiper': {
        swiper: null,
        key: 'cases-tabs .swiper',
        init() {
            swiperResizeUnit({
                self: this, init: innerWidth < 768
            })
        },
        option: {
            navigation: {
                nextEl: '.cases-tabs .swiper-button-next',
                prevEl: '.cases-tabs .swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            allowTouchMove: false,
            on: {
                init: function () {
                    let active = 0
                    this.slides.forEach((i, idx) => {
                        active = i.classList.contains('active') ? idx : active
                    })
                    this.slideTo(active, 0)
                },
                slideChange: function () {
                    this.slides[this.activeIndex].click()
                }
            }
        }
    }
}

window.addEventListener('load', () => {
    anchors(null, location.hash)
    lazyLoad()
    tooltip()
    fixedHeader()
    sliderDefault.forEach(slide => {
        new Swiper(slide.name + ' .swiper', {
            slidesPerView: 'auto',
            slideDuplicateClass: '-duplicate',
            navigation: {
                nextEl: slide.name + ' .swiper-button-next',
                prevEl: slide.name + ' .swiper-button-prev',
            },
            ...slide.option
        });
    })
    for (let key in swiperList) {
        swiperList[key].init()
    }
})
document.addEventListener('scroll', () => {
    fixedHeader()
})
window.addEventListener('resize', () => {
    for (let key in swiperList) {
        swiperList[key].init()
    }
    tooltip()
})
document.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup')
    const active = document.querySelector('.popup.open')
    const close = e.target.closest('.js-close') || e.target.classList.contains('js-backdrop')
    const modal = e.target.closest('[data-modal]')
    
    console.log(e.target)

    if (!popup && active || close) {
        closeModal(active)
    }

    if (modal) {
        e.preventDefault()
        openPopup(modal)
    }
})

toggleBlock('.candidates-item')
tabsInit()

if (logos) {
    logos.forEach((i, idx) => {
        new Swiper(i, {
            slidesPerView: 'auto',
            speed: 4000,
            loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: idx % 2
            }
        });
    })
}

const popupNavLi = [...document.querySelectorAll('.popup-header .header-nav-item')]
popupNavLi.forEach(li => {
    const item = li.querySelector('.header-nav-link')
    const body = li.querySelector('.header-nav-hover')
    const hidden = li.querySelector('.header-nav-hover_hidden')

    if (!body) return;

    item.addEventListener('click', async (e) => {
        e.preventDefault()
        li.style.setProperty('--height', hidden.clientHeight + 'px')

        setTimeout(() => {
            li.classList.toggle('active')

            if (li.classList.contains('active')) {
                body.ontransitionend = () => {
                    li.style.setProperty('--height', 'auto')
                }
            }

        }, 0)
    })
})

inputPhone.forEach(item => {
    maskPhone(item)
})

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active')
    })
}

const hover = [...document.querySelectorAll('.scheme-hover')]
hover.forEach(item => {
    const id = item.dataset.id
    const list = id ? hover.filter(item => item.dataset.id === id) : [item]

    item.onmouseenter = () => {
        list.forEach(i => i.classList.add('hover'))
    }
    item.onmouseleave = () => {
        list.forEach(i => i.classList.remove('hover'))
    }
})

const directionButtons = [...document.querySelectorAll('.direction-list .btn')]
directionInit()

function directionInit() {
    let active = 0
    directionButtons.forEach((btn, idx) => {
        btn.onclick = ({target}) => {
            if (!touchSupport()) return;
            if (!target.classList.contains('btn')) return;

            if (active === idx) {
                directionButtons[active].classList.toggle('hover')
                return
            }
            directionButtons[active].classList.remove('hover')
            active = idx
            directionButtons[active].classList.add('hover')
        }
        btn.onmouseenter = () => {
            if (touchSupport()) return;
            active = idx
            directionButtons[active].classList.add('hover')
        }
        btn.onmouseleave = () => {
            directionButtons[active].classList.remove('hover')
        }
    })
}

function lazyLoad() {
    const lazy = [...document.querySelectorAll('.lazy')]
    lazy.forEach(i => {
        if (i.tagName === 'OBJECT') {
            i.data = i.dataset.src
            return
        }
        i.src = i.dataset.src
    })
}

function anchors(e, link) {
    let idItem = document.getElementById(link.slice(1))

    if (!idItem) return
    if (e) e.preventDefault()

    const top = idItem.getBoundingClientRect().y + pageYOffset + 5
    let scrollTop = top - header.clientHeight;

    window.scrollTo({
        top: scrollTop,
        behavior: "smooth"
    });
}

function tooltip() {
    const tooltips = document.querySelectorAll('.js-tooltip')
    if (!tooltips.length) return;

    tooltips.forEach(item => {
        item.style.setProperty('--left', null)
        item.style.setProperty('--tail', null)
        const left = item.getBoundingClientRect().x + item.clientWidth
        const padding = 15
        if (left > innerWidth) {
            item.style.setProperty('--left', Math.floor(left - innerWidth + padding) * -1 + 'px')
            item.style.setProperty('--tail', Math.floor(left - innerWidth) + 'px')
        }
    })
}

function toggleBlock(name) {
    const block = [...document.querySelectorAll(name)]
    block.forEach(item => {
        const header = item.querySelector(`${name}-header`)
        const wrap = item.querySelector(`${name}-hidden`)
        header.onclick = () => {
            item.style.setProperty('--height', wrap.clientHeight + 'px')

            if (item.classList.contains('active')) {
                item.classList.remove('active')
            } else {
                item.classList.add('active')
            }
        }
    })
}

function maskPhone(item) {
    let mask = IMask(item, maskOptions);

    item.onfocus = function () {
        mask.updateOptions({
            lazy: false,
        })
    }
    item.onblur = function () {
        mask.updateOptions({
            lazy: true,
        })
    }

    return mask
}

function fixedHeader() {
    if (pageYOffset > 0) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
    }
}

function tabsInit() {
    const tabsBlock = document.querySelectorAll('.tabs-block')
    if (!tabsBlock.length) return
    tabsBlock.forEach(block => {
        const buttons = block.querySelector('.tabs-block__buttons')
        const list = block.querySelector('.tabs-block__list')

        const btns = buttons ? buttons.querySelectorAll('.tabs-btn') : block.querySelectorAll('.tabs-btn')
        const items = list ? block.querySelectorAll('.tabs-block__list > .tabs-item') : block.querySelectorAll('.tabs-item')

        let activeBtn = 0,
            activeItem = 0

        btns.forEach((b, i) => {
            if (b.classList.contains('active')) {
                activeBtn = i
                activeItem = i
            }
            b.addEventListener('click', () => {

                if (b.dataset.tabs === '+1') {
                    btns[activeBtn].classList.remove('active')
                    items.forEach(t => t.classList.remove('active'))

                    activeBtn = i

                    if (i === 0) {
                        btns[activeBtn].classList.add('active')
                        items.forEach(t => t.classList.add('active'))
                        return;
                    }

                    btns[activeBtn].classList.add('active')
                    items[activeBtn - 1].classList.add('active')
                    return
                }

                btns[activeBtn].classList.remove('active')
                items[activeItem].classList.remove('active')

                activeBtn = i
                activeItem = items.length - 1 < i ? 0 : i

                btns[activeBtn].classList.add('active')
                items[activeItem].classList.add('active')
            })
        })
    })
}

function swiperResizeUnit(props) {
    const self = props.self
    const el = document.querySelector(`.${self.key}`)
    if (!el) return

    if (props.init) {
        if (!swiperList[self.key].swiper) {
            swiperList[self.key].swiper = new Swiper(`.${self.key}`, {
                slidesPerView: 'auto',
                slideDuplicateClass: '-duplicate',
                ...props.self?.option
            });
        }
    } else {
        if (swiperList[self.key].swiper) {
            swiperList[self.key].swiper.destroy(true, true);
            swiperList[self.key].swiper = null;
        }
    }
}

function openPopup(btn) {
    const id = btn.dataset.modal

    const modal = document.getElementById(id)
    if (!modal) return
    if (modal.classList.contains('open')) return;

    const container = modal.querySelector('.popup-container')
    modal.classList.add('open')
    bodyLock()
}

function closeModal(modal) {
    header.classList.remove('header_burger')

    modal.classList.add('close')

    closeId = setTimeout(() => {
        modal.classList.remove('close', 'open')
        const openModal = document.querySelectorAll('.popup.open')
        if (!openModal.length) bodyUnLock()

    }, 500)
}

function bodyLock() {
    const lockPadding = document.querySelectorAll('.lock-padding');
    const body = document.querySelector('body');
    const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.overflow = 'hidden'
    body.classList.add('hidden')
}

function bodyUnLock() {
    const lockPadding = document.querySelectorAll('.lock-padding');
    const body = document.querySelector('body');
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = null
        }
    }
    body.style.overflow = null
    body.classList.remove('hidden')
}

function touchSupport() {
    return 'ontouchstart' in window
        || window.DocumentTouch && document instanceof window.DocumentTouch;
}
