import {disableForm, disableFormFilter, enableForm} from './ad-form.js';
import {createCard} from './create-card.js';
import {getData} from './api.js';
import { onFilterChange, filterMarkers } from './filter.js';
import { debounce } from './util.js';

const START_LAT = 35.68950;
const START_LNG = 139.69200;
const ROUND_UP_TO = 5;
const SCALE = 10;
const CARDS_COUNT = 10;

//Округление координат
const roundUp = (coord) => coord.toFixed(ROUND_UP_TO);
//Поле адреса
const addressInputElement = document.querySelector('#address');
const onAddressInputSet = () => {
  addressInputElement.readOnly = true;
  addressInputElement.value = `${roundUp(START_LAT)}, ${roundUp(START_LNG)}`;
};

// Отображение карты и дальнейший переход страницы в активное состояние после инициализации карты.
disableForm();
disableFormFilter();

const map = L.map('map-canvas')
  .on('load', enableForm)
  .setView({
    lat: START_LAT,
    lng: START_LNG,
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


//Добавление на карту специальной, «главной», метки.
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: START_LAT,
  lng: START_LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
}, );

mainPinMarker.addTo(map);

onAddressInputSet();

//Выбор адреса путём перемещения главной метки.
mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  addressInputElement.value = `${roundUp(latLng.lat)}, ${roundUp(latLng.lng)}`;
});

// Добавление на карту меток объявлений, «обычных».
const markerGroup = L.layerGroup().addTo(map);

const ordinaryPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Создание обьявлений.
const createMarker = (card) =>  {
  const marker = L.marker({
    lat: card.location.lat,
    lng: card.location.lng,
  }, {
    ordinaryPinIcon,
  }, );

  marker
    .addTo(markerGroup)
    .bindPopup(createCard(card));

};
//Отрисовка 10 объявлений
const createMarkers = () => {
  getData((cards) => {
    cards
      .slice(0, CARDS_COUNT)
      .forEach(createMarker);
    onFilterChange(debounce(() => {
      filterMarkers(cards);}));
  });

};

createMarkers();

// Сброс карты
const resetMap = () => {
  onAddressInputSet();
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });
  map
    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, SCALE)
    .closePopup();
};

export {createMarker, resetMap, markerGroup, createMarkers};
