const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersElement.querySelectorAll('select, fieldset');
const sliderElement = document.querySelector('.ad-form__slider');

// Переключение атрибутов элементов
const setDisabled = (elements, flag) => elements.forEach((element) => {
  element.disabled = flag;
});
// Неактивное состояние.
const disableForm = () => {
  adFormElement.classList.add('.ad-form--disabled');
  sliderElement.classList.add('.ad-form__slider--disabled');
  setDisabled(adFormElements, true);

};
// Активное состояние.
const enableForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  sliderElement.classList.remove('.ad-form__slider--disabled');
  setDisabled(adFormElements, false);
};
//Активное состояние формы фильтра.
const enableFormFilter = () => {
  mapFiltersElement.classList.remove('.map__filters--disabled');
  setDisabled(mapFiltersElements, false);
};
//Неактивное состояние формы фильтра.
const disableFormFilter = () => {
  mapFiltersElement.classList.add('.map__filters--disabled');
  setDisabled(mapFiltersElements, true);
};

export {disableForm, enableForm, enableFormFilter, disableFormFilter};


