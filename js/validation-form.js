import {getRoomEnds, getGuestsEnds} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_PRICE = 100000;
const MAX_ROOMS = 100;
const NO_GUESTS = 0;

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error',
},false);

const checkTitleInput =  (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
pristine.addValidator(form.querySelector('#title'), checkTitleInput);

const guestsCountInput = form.querySelector('#capacity');
const roomsCountInput = form.querySelector('#room_number');

const advOption  = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};


const validateAdv = () => advOption[roomsCountInput.value].includes(Number(guestsCountInput.value));


const selectGuestsErorrMessage = () => {
  const guestsCount = Number(guestsCountInput.value);
  if (guestsCount === NO_GUESTS) {
    return 'Не для гостей';
  }
  return `Необходимо не менее ${guestsCount} ${getRoomEnds(guestsCount)} `;
};

const selectRoomsErorrMessage = () => {
  const roomsCount = Number(roomsCountInput.value);
  if (roomsCount === MAX_ROOMS) {
    return 'Не для гостей';
  }
  return `Не больше ${roomsCount} ${getGuestsEnds(roomsCount)}`;
};

pristine.addValidator(roomsCountInput, validateAdv, selectRoomsErorrMessage);
pristine.addValidator(guestsCountInput, validateAdv, selectGuestsErorrMessage);

const priceInput = form.querySelector('#price');
const advTypeField = document.querySelector('#type');
const advTypePrice = {
  bungalow : 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const getMinPrice = () => Number(advTypePrice[advTypeField.value]);

const validateType = (value) => value >= getMinPrice() && value <= MAX_ROOM_PRICE;

const getAdvPriceErrorMessage = () => `Минимальная цена ${getMinPrice()}, максимальная цена ${MAX_ROOM_PRICE}`;

pristine.addValidator(priceInput, validateType, getAdvPriceErrorMessage);

const typeChanging = (evt) => {priceInput.placeholder = advTypePrice[evt.target.value];
  pristine.validate(priceInput);
};
advTypeField.addEventListener('change', typeChanging);

const checkInField = document.querySelector('#timein');
const checkOutField = document.querySelector('#timeout');

checkInField.addEventListener('change', (evt) => {
  checkOutField.value = evt.target.value;
});

checkOutField.addEventListener('change', (evt) => {
  checkInField.value = evt.target.value;
});


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});