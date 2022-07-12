import {disableForm, enableForm} from './ad-form.js';
import {createAdvertisementArray} from './data.js';
import {createCard} from './create-card.js';

//Координаты Токио
const START_LAT = 35.68950;
const START_LNG = 139.69200;
// Количество знаков после запятой
const ROUND_UP_TO = 5;
// Масштаб
const SCALE = 10;

// Отображение карты и дальнейший переход страницы в активное состояние после инициализации карты.
disableForm();

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

//Выбор адреса путём перемещения главной метки.
const roundUp = (coord) => coord.toFixed(ROUND_UP_TO);

const addressInput = document.querySelector('#address');
addressInput.readOnly = true;
addressInput.value = `${roundUp(START_LAT)}, ${roundUp(START_LNG)}`;
mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  addressInput.value = `${roundUp(latLng.lat)}, ${roundUp(latLng.lng)}`;
});

// Добавление на карту меток объявлений, «обычных».
const markerGroup = L.layerGroup().addTo(map);

const ordinaryPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Показ балуна с подробной информацией об объявлении.
const advertisementCard = createAdvertisementArray();

advertisementCard.forEach((card) =>  {
  const marker = L.marker({
    lat: card.location.lat,
    lng: card.location.lng,
  }, {
    ordinaryPinIcon,
  }, );

  marker
    .addTo(markerGroup)
    .bindPopup(createCard(card));
});

