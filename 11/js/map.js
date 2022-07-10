import {disableForm, enableForm} from './ad-form.js';
import {createAdvertisementArray} from './data.js';
import {createCard} from './create-card.js';

//Координаты Токио
const START_LAT = 35.68950;
const START_LNG = 139.69200;
const ROUND_UP_TO = 5;


// Отображение карты и дальнейший переход страницы в активное состояние после инициализации карты.
disableForm();

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


//1 Напишите код, который будет добавлять на карту специальную, «главную», метку. Иконка для метки есть в обновлении, файл main-pin.svg.
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

//2 Реализуйте с помощью API карт выбор адреса путём перемещения главной метки.
const addressInput = document.querySelector('#address');
addressInput.readOnly = true;
addressInput.value = `${START_LAT.toFixed(ROUND_UP_TO)}, ${START_LNG.toFixed(ROUND_UP_TO)}`;
mainPinMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(ROUND_UP_TO)}, ${evt.target.getLatLng().lng.toFixed(ROUND_UP_TO)}`;
});

//3 Напишите код, который добавит на карту метки объявлений, «обычные».
const markerGroup = L.layerGroup().addTo(map);

const ordinaryPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//4 С помощью API карт реализуйте показ балуна с подробной информацией об объявлении.
const advertisementCard = createAdvertisementArray();

//const createMarker = (card)

//advertisementCard.forEach(createMarker());
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

