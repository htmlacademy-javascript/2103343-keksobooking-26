import { createMarker, markerGroup } from './map.js';

const MARKERS_COUNT = 10;
const DEFAULT_VALUE = 'any';

const  levelToPriceRange = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};

const formElement = document.querySelector('.map__filters');

const checkAdvType = ({offer}) => formElement['housing-type'].value === DEFAULT_VALUE || offer.type === formElement['housing-type'].value;
const checkPrice = ({offer}) =>  formElement['housing-price'].value === DEFAULT_VALUE || offer.price <= levelToPriceRange[formElement['housing-price'].value].max && offer.price >= levelToPriceRange[formElement['housing-price'].value].min;
const checkRoomsCount = ({offer}) => formElement['housing-rooms'].value === DEFAULT_VALUE || offer.rooms === Number(formElement['housing-rooms'].value);
const checkGuestsCount = ({offer}) => formElement['housing-guests'].value === DEFAULT_VALUE || offer.guests === Number(formElement['housing-guests'].value);
const checkFeatures = ({offer}) => {
  const selectedElements = formElement.querySelectorAll('input[name="features"]:checked');
  const values = Array.from(selectedElements, ({value}) => value);
  if (offer.features) {
    return values.every((feature) => offer.features.includes(feature));
  }
  return false;
};


const getFilteredCard = ({offer}) => checkAdvType({offer}) && checkPrice({offer}) &&
    checkRoomsCount({offer}) && checkGuestsCount({offer}) && checkFeatures({offer});

const filterMarkers = (cards) => {
  markerGroup.clearLayers();
  const filteredCards = [];

  for (const el of cards) {
    if (getFilteredCard(el)) {
      filteredCards.push(el);
    }
    if (filteredCards.length === MARKERS_COUNT) {
      break;
    }
  }

  filteredCards.forEach(createMarker);
};

const addFilterFormListener = (listener) => {
  formElement.addEventListener('change', listener);
};
//Сброс формы фильтра
const resetFilterForm = () =>{
  formElement.reset();
};

export {filterMarkers, addFilterFormListener, resetFilterForm};
