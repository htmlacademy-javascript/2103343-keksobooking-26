import {getGuestsEnds} from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {resetMap} from './map.js';
import {resetPhotos} from './photo.js';
import {resetFilterForm} from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_PRICE = 100000;
const MAX_ROOMS = 100;
const NO_GUESTS = 0;

const advRoomNumberToCapacity  = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const advTypeToPrice = {
  bungalow : 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const formElement = document.querySelector('.ad-form');
const guestsCountInputElement = formElement.querySelector('#capacity');
const roomsCountInputElement = formElement.querySelector('#room_number');
const priceInputElement = formElement.querySelector('#price');
const advTypeFieldElement = formElement.querySelector('#type');
const sliderElement = formElement.querySelector('.ad-form__slider');
const checkInFieldElement = formElement.querySelector('#timein');
const checkOutFieldElement = formElement.querySelector('#timeout');
const submitButtonElement = formElement.querySelector('.ad-form__submit');
const resetButtonElement = formElement.querySelector('.ad-form__reset');
// Валидация формы
const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error',
});

const checkTitleInput =  (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
pristine.addValidator(formElement.querySelector('#title'), checkTitleInput);

const validateAdv = () => advRoomNumberToCapacity[roomsCountInputElement.value].includes(Number(guestsCountInputElement.value));

const selectRoomsErorrMessage = () => {
  const roomsCount = Number(roomsCountInputElement.value);
  const guestsCount = Number(guestsCountInputElement.value);
  if (roomsCount === MAX_ROOMS) {
    return 'Не для гостей';
  }
  if(guestsCount === NO_GUESTS) {
    return `Не менее ${roomsCount} ${getGuestsEnds(roomsCount)}`;
  }

  return `Не больше ${roomsCount} ${getGuestsEnds(roomsCount)}`;
};

pristine.addValidator(guestsCountInputElement, validateAdv, selectRoomsErorrMessage);

roomsCountInputElement.addEventListener('change', () => {
  pristine.validate(guestsCountInputElement);
});

const getMinPrice = () => Number(advTypeToPrice[advTypeFieldElement.value]);


const validateType = (value) => value >= getMinPrice() && value <= MAX_ROOM_PRICE;

const getAdvPriceErrorMessage = () => {
  if(priceInputElement.value <= getMinPrice()) {
    return `Минимальная цена ${getMinPrice()}руб.`;
  }
};

pristine.addValidator(priceInputElement, validateType, getAdvPriceErrorMessage);
// Слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_ROOM_PRICE,
  },
  start: getMinPrice(),
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});
priceInputElement.placeholder = getMinPrice();

priceInputElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceInputElement.value);
});

sliderElement.noUiSlider.on('slide', () => {
  priceInputElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceInputElement);
});

const getMinPriceForSlider = (minPrice) => {
  if (minPrice > priceInputElement.value) {
    return minPrice;
  }

  return Number(priceInputElement.value);
};

const resetSlider = () => {
  sliderElement.noUiSlider.set(getMinPrice());
  priceInputElement.placeholder = getMinPrice();
};

advTypeFieldElement.addEventListener('change', (evt) => {
  const minRoomPrice = advTypeToPrice[evt.target.value];
  priceInputElement.placeholder = minRoomPrice;
  priceInputElement.min = minRoomPrice;
  pristine.validate(priceInputElement);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_ROOM_PRICE,
    },
    start: getMinPriceForSlider(minRoomPrice),
  });
});

checkInFieldElement.addEventListener('change', (evt) => {
  checkOutFieldElement.value = evt.target.value;
});

checkOutFieldElement.addEventListener('change', (evt) => {
  checkInFieldElement.value = evt.target.value;
});

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};
// Очистка формы
const resetAll = () => {
  formElement.reset();
  resetSlider();
  pristine.reset();
  resetMap();
  resetPhotos();
  resetFilterForm();
};

resetButtonElement.addEventListener('click', (evt) => {evt.preventDefault(); resetAll();});
// Публикация формы
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();
  sendData(
    () => {
      showSuccessMessage();
      unblockSubmitButton();
      resetAll();
    },
    () => {
      showErrorMessage();
      unblockSubmitButton();
    },
    new FormData(evt.target),
  );
});


