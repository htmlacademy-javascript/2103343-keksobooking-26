import {endings} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_PRICE = 100000;
const MIN_ROOM_PRICE = 0;
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

const checkPriceInput = (value) => value >= MIN_ROOM_PRICE && value <= MAX_ROOM_PRICE;
pristine.addValidator(form.querySelector('#price'), checkPriceInput);


const guestsCountInput = form.querySelector('#capacity');
const roomsCountInput = form.querySelector('#room_number');

const advOption  = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};


const validateAdv = () => advOption[roomsCountInput.value].includes(Number(guestsCountInput.value));

const roomEnds = (rooms) => endings(rooms, ['комната', 'комнат', 'комнат']);
const guestsEnds = (guests) => endings(guests, ['гостя', 'гостей', 'гостей']);


const guestsErorrMessage = () => {
  const guestsCount = Number(guestsCountInput.value);
  if (guestsCount === NO_GUESTS) {
    return 'Не для гостей';
  }
  return `Необходимо не менее ${guestsCount} ${roomEnds(guestsCount)} `;
};

const roomsErorrMessage = () => {
  const roomsCount = Number(roomsCountInput.value);
  if (roomsCount === MAX_ROOMS) {
    return 'Не для гостей';
  }
  return `Не больше ${roomsCount} ${guestsEnds(roomsCount)}`;
};

pristine.addValidator(roomsCountInput, validateAdv, roomsErorrMessage);
pristine.addValidator(guestsCountInput, validateAdv, guestsErorrMessage);
