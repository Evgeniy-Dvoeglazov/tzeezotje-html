const burgerBtn = document.querySelector('.navigation__checkbox');
const menu = document.querySelector('.header__nav-menu');
const phone = document.querySelector('.header__phone');
const headerOverlay = document.querySelector('.header__overlay');
const reserveBtn = document.querySelector('.intro__button');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');

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
  return false;
});

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
