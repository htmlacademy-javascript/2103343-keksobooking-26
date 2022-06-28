const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

// Неактивное состояние.
const disableForm = (form, elements) => {
  form.classList.add('.ad-form--disabled');
  elements.forEach((element) => {
    element.disabled = true;
  });
};
// Активное состояние.
const enableForm = (form, elements) => {
  form.classList.remove('ad-form--disabled');
  elements.forEach((element) => {
    element.disabled = false;
  });
};
disableForm(mapFilters, mapFiltersElements);
enableForm(adForm, adFormElements);
