const burgerBtn = document.querySelector('.hamburger__checkbox');
const menu = document.querySelector('.header__nav-menu');
const phone = document.querySelector('.header__phone');
const headerOverlay = document.querySelector('.header__overlay');
const reserveBtn = document.querySelector('.intro__button');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');

// Поключение небольшой gsap анимации и плавного скрола
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5,
    effects: true
  })

  gsap.fromTo('.intro', { opacity: 1 }, {
    opacity: 0,
    scrollTrigger: {
      trigger: '.intro',
      start: '200',
      end: '700',
      scrub: true
    }
  })

  gsap.fromTo('.menu__interior-photos', { x: 200, opacity: 0 }, {
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: '.menu__items',
      start: '-600',
      end: '-200',
      scrub: true
    }
  })
}

// Подключение свайпера
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Обработка отправки формы
$('.popup__form').submit(function (evt) {
  evt.preventDefault();
  if (validation(this) == true) {

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      contentType: false,
      cache: false,
      processData: false,
      data: new FormData(this),
      success: function (result) {
        // Вывод текста результата отправки
        alert(result);
        closePopup();
      },
      // Вывод статуса ошибки
      error: function (error) {
        console.log(error.status);
        closePopup();
      }
    });
  }
  return false;
});

// Простенькая валидация формы
function validation(form) {

  let result = true;
  const allInputs = form.querySelectorAll('.popup__input');

  allInputs.forEach(input => {

    removeError(input);

    if (input.value == '') {
      createError(input, `Please enter ${input.name}`);
      result = false;
    }
  });

  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains('popup__error')) {
      parent.querySelector('.popup__error-message').remove();
      parent.classList.remove('popup__error');
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorMessage = document.createElement('label');
    errorMessage.classList.add('popup__error-message');
    errorMessage.textContent = text;
    parent.classList.add('popup__error');
    parent.append(errorMessage);
  }

  return result;
}

// Обработчик открытия и закрытия меню
function changeMenuVisibility() {
  menu.classList.toggle('header__nav-menu_opened');
  phone.classList.toggle('header__phone-menu_opened');
  headerOverlay.classList.toggle('header__overlay_opened');
}

// Открытие формы заявки
function openPopup() {
  popup.classList.add('popup_opened');
  closePopupBtn.addEventListener('click', closePopup);
}

// Закрытие формы заявки на кнопку закрытия
function closePopup() {
  popup.classList.remove('popup_opened');
  closePopupBtn.removeEventListener('click', closePopup);
}

// Слушатели событий
burgerBtn.addEventListener('click', changeMenuVisibility);
reserveBtn.addEventListener('click', openPopup);

// Закрытие попапа при нажатии на оверлей
popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
});

// Закрытие попапа ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
});
