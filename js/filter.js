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

const filterFormElement = document.querySelector('.map__filters');
const mapFilterTypeElement = document.querySelector('#housing-type');
const mapFilterPriceElement = document.querySelector('#housing-price');
const mapFilterRoomsElement = document.querySelector('#housing-rooms');
const mapFilterGuestsElement = document.querySelector('#housing-guests');

const checkAdvType = ({offer}) => mapFilterTypeElement.value === DEFAULT_VALUE || offer.type === mapFilterTypeElement.value;
const checkPrice = ({offer}) =>  mapFilterPriceElement.value === DEFAULT_VALUE || offer.price <= levelToPriceRange[mapFilterPriceElement.value].max && offer.price >= levelToPriceRange[mapFilterPriceElement.value].min;
const checkRoomsCount = ({offer}) => mapFilterRoomsElement.value === DEFAULT_VALUE || offer.rooms === Number(mapFilterRoomsElement.value);
const checkGuestsCount = ({offer}) => mapFilterGuestsElement.value === DEFAULT_VALUE || offer.guests === Number(mapFilterGuestsElement.value);
const checkFeatures = ({offer}) => {
  const mapSelectedFeaturesElement = document.querySelectorAll('input[name="features"]:checked');
  const values = Array.from(mapSelectedFeaturesElement, ({value}) => value);
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
  filterFormElement.addEventListener('change', listener);
};
//Сброс формы фильтра
const resetFilterForm = () =>{
  filterFormElement.reset();
};

export {filterMarkers, addFilterFormListener, resetFilterForm};
