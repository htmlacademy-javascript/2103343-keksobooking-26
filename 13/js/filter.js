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


const checkAdvType = ({offer}) => {
  const advTypeValue = document.querySelector('#housing-type').value;
  return advTypeValue === DEFAULT_VALUE || offer.type === advTypeValue ;
};

const checkPrice = ({offer}) => {
  const priceValue = document.querySelector('#housing-price').value;
  return priceValue === DEFAULT_VALUE || offer.price <= priceRange[priceValue].max && offer.price >= priceRange[priceValue].min;
};

const checkRoomsCount = ({offer}) => {
  const roomsCountValue = document.querySelector('#housing-rooms').value;
  return roomsCountValue === DEFAULT_VALUE || offer.rooms === Number(roomsCountValue);
};

const checkGuestsCount = ({offer}) => {
  const guestsCountValue = document.querySelector('#housing-guests').value;
  return guestsCountValue === DEFAULT_VALUE ||offer.guests === Number(guestsCountValue);
};


const getSelectedCheckboxes = () => {
  const selectedCheckboxes = document.querySelectorAll('input[name="features"]:checked');
  const values = Array.from(selectedCheckboxes, ({value}) => value);
  return values;
};

const checkFeatures = ({offer}) => {
  const filtersFeatures = getSelectedCheckboxes();

  if (offer.features) {
    return filtersFeatures.every((feature) => offer.features.includes(feature));
  }
  return false;
};

const filterMarkers = (cards) => {
  markerGroup.clearLayers();
  const cardFilter = cards.filter((card) => (checkAdvType(card) && checkPrice(card) &&
  checkRoomsCount(card) && checkGuestsCount(card) && checkFeatures(card))).slice(0, MARKERS_COUNT);

  cardFilter.forEach(createMarker);
};

const onFilterChange = (cb) => {
  const filterForm = document.querySelector('.map__filters');
  filterForm.addEventListener('change', cb);
};

export{filterMarkers, onFilterChange};
