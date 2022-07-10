const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');
const sliderElement = document.querySelector('.ad-form__slider');

// Переключение атрибутов элементов
const switchElements = (elements, toggle) => elements.forEach((element) => {
  element.disabled = toggle;
});
// Неактивное состояние.
const disableForm = () => {
  adForm.classList.add('.ad-form--disabled');
  mapFilters.classList.add('.map__filters--disabled');
  sliderElement.classList.add('.ad-form__slider--disabled');
  switchElements(adFormElements, true);
  switchElements(mapFiltersElements, true);
};
// Активное состояние.
const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('.map__filters--disabled');
  sliderElement.classList.remove('.ad-form__slider--disabled');
  switchElements(adFormElements, false);
  switchElements(mapFiltersElements, false);
};

export {disableForm, enableForm};


