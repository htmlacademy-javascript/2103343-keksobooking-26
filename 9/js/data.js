import {getRandom, getRandomFloat, getRandomArrayElement, getRandomArrayOfElements, getRandomArrayNoRepeat} from './util.js';

const ADV_COUNT = 10;
const ROOM_TYPE = ['place', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00','13:00', '14:00'];
const ROOM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOM_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const GUESTS_COUNT_MIN = 1;
const GUESTS_COUNT_MAX = 100;
const ROOM_DESCRIPTION = ['room1', 'room2', 'room3', 'room4', 'room5'];
const PRICE_MIN = 0;
const PRICE_MAX = 100000;
const ROOM_COUNT_MIN = 1;
const ROOM_COUNT_MAX = 5;
const MIN_PHOTOS_COUNT = 1;
const MAX_PHOTOS_COUNT = 3;

const createAdvertisement = (i) => {
  const lat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
  const lng = getRandomFloat(LNG_MIN, LNG_MAX, 5);

  return {
    author:{
      avatar:  `img/avatars/user${String(i).padStart(2, '0')}.png`
    },
    offer:{
      title: `Объявление №${i}`,
      address: `${lat}, ${lng}`,
      price:getRandom(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(ROOM_TYPE),
      rooms: getRandom(ROOM_COUNT_MIN, ROOM_COUNT_MAX),
      guests:getRandom(GUESTS_COUNT_MIN, GUESTS_COUNT_MAX),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArrayNoRepeat(ROOM_FEATURES.slice()),
      description:getRandomArrayElement(ROOM_DESCRIPTION),
      photos: getRandomArrayOfElements(ROOM_PHOTOS, getRandom(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT)),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };

};
//создание массива из 10 объектов
const createAdvertisementArray = () => {
  const mainArray = [];
  for (let i = 1; i <= ADV_COUNT; i++) {
    mainArray.push(createAdvertisement(i));
  }
  return mainArray;
};


export {createAdvertisementArray};
