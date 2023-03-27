document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
	stickyHeader()
	mobMenuToggle()
	accordion('.accordion-item-js', {
		closeItem: false
	})
	videoPopup()
	switchPrice()

})
window.addEventListener('load', function () {
	smoothScroll()
})
// мобильное меню
function mobMenuToggle() {
	let btn = document.querySelector('.header__navigation-btn-menu')
	let menu = document.querySelector(btn.dataset.toggle)
	let header = document.querySelector('.header')
	btn.addEventListener('click', function (e) {
		btn.classList.toggle('active')
		menu.classList.toggle('active')
		header.classList.toggle('active')
	})
}

function accordion(accordionItemSelector, mode) {
	let accordionElements = document.querySelectorAll(accordionItemSelector)
	let openedElement
	for (let i = 0; i < accordionElements.length; i++) {

		if (accordionElements[i].classList.contains('open')) {
			openedElement = accordionElements[i]
		}
		accordionElements[i].addEventListener('click', function (e) {
			if (mode.closeItem) {
				if (openedElement && openedElement !== e.currentTarget) {

					openedElement.classList.remove('open')
				}
				openedElement = e.currentTarget
				if (openedElement.classList.contains('open') && e.target.classList.contains(mode.closeTarget)) {
					openedElement.classList.remove('open')
				} else {
					openedElement.classList.add('open')
				}

			} else {
				if (openedElement) {
					openedElement.classList.remove('open')
				}
				openedElement = e.currentTarget
				openedElement.classList.add('open')
			}

		})
	}
}

function stickyHeader() {
	let header = document.querySelector('.header')

	if (document.body.getBoundingClientRect().top < 0) {
		header.classList.add('sticky')
	} else {
		header.classList.remove('sticky')
	}

	document.addEventListener('scroll', function () {
		if (document.body.getBoundingClientRect().top < 0) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}

	})
}


function videoPopup() {
	let btn = document.querySelector('a[href*="www.youtube.com"]')

	if (!btn) {
		return
	}
	let popup = document.querySelector('.popup')
	btn.addEventListener('click', function (e) {
		e.preventDefault()
		popup.classList.add('active')
	})
	btn.addEventListener('click', function (e) {
		let videoId = e.currentTarget.href.split('watch?v=').pop()
		let popupInner = popup.querySelector('.popup__inner')
		let frame = document.createElement('iframe')
		frame.classList.add('popup__frame')
		frame.src = "https://www.youtube.com/embed/" + videoId
		frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
		frame.setAttribute('allowfullscreen', true)
		popupInner.appendChild(frame)
	})

	popup.addEventListener('click', function (e) {
		if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
			popup.classList.remove('active')
			popup.querySelector('iframe').remove()
		}
	})
}

function smoothScroll() {
	let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = document.querySelector('.header').getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset // производим прокрутка прокрутка
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) // к id элемента, к которому нужно перейти
			let t = tar.getBoundingClientRect().top - headerHeight // отступ от окна браузера до id
			let start = null;
			requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash // URL с хэшем
				}
			}
		}, false);
	}
}

function switchPrice() {
	let form = document.querySelector('.switch')
	if (!form) return
	let prices = document.querySelectorAll('.js-change-price')
	form.addEventListener('change', function (e) {
		for (let i = 0; i < prices.length; i++) {
			prices[i].innerHTML = prices[i].dataset[e.target.value] + '$'
		}
	})
}