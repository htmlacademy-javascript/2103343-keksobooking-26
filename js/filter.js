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

const filterMarkers = (cards) => {
  markerGroup.clearLayers();
  const getFilteredCard = (card) => {
    const {price, type, rooms, guests, features} = card.offer;

    const mapFilterType = document.querySelector('#housing-type');
    const mapFilterPrice = document.querySelector('#housing-price');
    const mapFilterRooms = document.querySelector('#housing-rooms');
    const mapFilterGuests = document.querySelector('#housing-guests');
    const mapSelectedFeatures = document.querySelectorAll('input[name="features"]:checked');

    const checkAdvType = () => mapFilterType.value === DEFAULT_VALUE || type === mapFilterType.value;
    const checkPrice = () =>  mapFilterPrice.value === DEFAULT_VALUE || price <= priceRange[mapFilterPrice.value].max && price >= priceRange[mapFilterPrice.value].min;
    const checkRoomsCount = () => mapFilterRooms.value === DEFAULT_VALUE || rooms === Number(mapFilterRooms.value);
    const checkGuestsCount = () => mapFilterGuests.value === DEFAULT_VALUE || guests === Number(mapFilterGuests.value);
    const getSelectedCheckboxes = () => {const values = Array.from(mapSelectedFeatures, ({value}) => value);
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


  const filteredArr = [];

  for (const elem of cards) {
    if (getFilteredCard(elem)) {
      filteredArr.push(elem);
    }
    if (filteredArr.length === MARKERS_COUNT) {
      break;
    }
  }

  filteredArr.forEach(createMarker);

};
const onFilterChange = (cb) => {
  const filterForm = document.querySelector('.map__filters');
  filterForm.addEventListener('change', cb);
};

export {filterMarkers, onFilterChange};
