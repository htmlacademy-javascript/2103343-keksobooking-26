import {getRoomEnds, getGuestsEnds} from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {resetMap} from './map.js';
import { onFormPhotosReset } from './photo.js';
import { onFilterFormReset } from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_PRICE = 100000;
const MAX_ROOMS = 100;
const NO_GUESTS = 0;

const AdvOptions  = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const AdvTypePrices = {
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
const advTypeFieldElement = document.querySelector('#type');
const sliderElement = document.querySelector('.ad-form__slider');
const checkInFieldElement = document.querySelector('#timein');
const checkOutFieldElement = document.querySelector('#timeout');
const submitButtonElement = document.querySelector('.ad-form__submit');
const resetButtonElement = document.querySelector('.ad-form__reset');
// Валидация формы
const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error',
},false);

const checkTitleInput =  (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
pristine.addValidator(formElement.querySelector('#title'), checkTitleInput);

const validateAdv = () => AdvOptions[roomsCountInputElement.value].includes(Number(guestsCountInputElement.value));

const selectGuestsErorrMessage = () => {
  const guestsCount = Number(guestsCountInputElement.value);
  if (guestsCount === NO_GUESTS) {
    return 'Не для гостей';
  }
  return `Необходимо не менее ${guestsCount} ${getRoomEnds(guestsCount)} `;
};

const selectRoomsErorrMessage = () => {
  const roomsCount = Number(roomsCountInputElement.value);
  if (roomsCount === MAX_ROOMS) {
    return 'Не для гостей';
  }
  return `Не больше ${roomsCount} ${getGuestsEnds(roomsCount)}`;
};

pristine.addValidator(roomsCountInputElement, validateAdv, selectRoomsErorrMessage);
pristine.addValidator(guestsCountInputElement, validateAdv, selectGuestsErorrMessage);

const getMinPrice = () => Number(AdvTypePrices[advTypeFieldElement.value]);

const validateType = (value) => value >= getMinPrice() && value <= MAX_ROOM_PRICE;

const getAdvPriceErrorMessage = () => `Минимальная цена ${getMinPrice()}, максимальная цена ${MAX_ROOM_PRICE}`;

pristine.addValidator(priceInputElement, validateType, getAdvPriceErrorMessage);
// Слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: getMinPrice(),
    max: MAX_ROOM_PRICE,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

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


const typeChanging = (evt) => {
  const minRoomPrice = AdvTypePrices[evt.target.value];
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
};
advTypeFieldElement.addEventListener('change', typeChanging);

checkInFieldElement.addEventListener('change', (evt) => {
  checkOutFieldElement.value = evt.target.value;
});

checkOutFieldElement.addEventListener('change', (evt) => {
  checkInFieldElement.value = evt.target.value;
});

const onSubmitButtonBlock = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const onSubmitButtonUnblock = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};
// Очистка формы
const onFormReset = () => {
  formElement.reset();
  sliderElement.noUiSlider.set(priceInputElement.placeholder);
  priceInputElement.placeholder = getMinPrice();
  resetMap();
  onFormPhotosReset();
  onFilterFormReset();
};

resetButtonElement.addEventListener('click', (evt) => {evt.preventDefault(); onFormReset();});
// Публикация формы
const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    onSubmitButtonBlock();
    sendData(
      () => {
        showSuccessMessage();
        onSubmitButtonUnblock();
        onFormReset();
      },
      () => {
        showErrorMessage();
        onSubmitButtonUnblock();
      },
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit();
