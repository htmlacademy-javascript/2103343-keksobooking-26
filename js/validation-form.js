const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_ROOM_PRICE = 0;
const MAX_ROOM_PRICE = 100000;


const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error',
}, false);

const titleInput = form.querySelector('#title');
pristine.addValidator(titleInput, (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH);

const priceInput = form.querySelector('#price');
pristine.addValidator(priceInput, (value) => value >= MIN_ROOM_PRICE && value <= MAX_ROOM_PRICE);
