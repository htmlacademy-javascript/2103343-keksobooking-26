import { createMarker, markerGroup } from './map.js';

const MARKERS_COUNT = 10;
const DEFAULT_VALUE = 'any';

const priceRange = {
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
//Фильтр карточек
const filterMarkers = (cards) => {
  markerGroup.clearLayers();
  const getFilteredCard = (card) => {
    const {price, type, rooms, guests, features} = card.offer;

    const mapFilterTypeElement = document.querySelector('#housing-type');
    const mapFilterPriceElement = document.querySelector('#housing-price');
    const mapFilterRoomsElement = document.querySelector('#housing-rooms');
    const mapFilterGuestsElement = document.querySelector('#housing-guests');
    const mapSelectedFeaturesElement = document.querySelectorAll('input[name="features"]:checked');

    const checkAdvType = () => mapFilterTypeElement.value === DEFAULT_VALUE || type === mapFilterTypeElement.value;
    const checkPrice = () =>  mapFilterPriceElement.value === DEFAULT_VALUE || price <= priceRange[mapFilterPriceElement.value].max && price >= priceRange[mapFilterPriceElement.value].min;
    const checkRoomsCount = () => mapFilterRoomsElement.value === DEFAULT_VALUE || rooms === Number(mapFilterRoomsElement.value);
    const checkGuestsCount = () => mapFilterGuestsElement.value === DEFAULT_VALUE || guests === Number(mapFilterGuestsElement.value);
    const getSelectedCheckboxes = () => {const values = Array.from(mapSelectedFeaturesElement, ({value}) => value);
      return values;
    };

    const checkFeatures = () => {
      const filtersFeatures = getSelectedCheckboxes();
      if (features) {
        return filtersFeatures.every((feature) => features.includes(feature));
      }
      return false;
    };
    return (checkAdvType(card) && checkPrice(card) &&
  checkRoomsCount(card) && checkGuestsCount(card) && checkFeatures(card));
  };

  //Массив из 10 карточек по подходящих под условия фильтра
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

const onFilterChange = (cb) => {
  filterFormElement.addEventListener('change', cb);
};
//Сброс формы фильтра
const onFilterFormReset = () =>{
  filterFormElement.reset();
};

export {filterMarkers, onFilterChange, onFilterFormReset};
