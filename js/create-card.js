import {getCardRoomEnds, getGuestsEnds} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesMatch = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const createCard = (card) => {

  const cardElement = cardTemplate.cloneNode(true);
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = card.offer;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar ;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesMatch[type];


  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getCardRoomEnds(rooms)} для ${guests} ${getGuestsEnds(guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;


  const featuresList = cardElement.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    if (!features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`))) {
      featureItem.remove();
    }
  });
  if (features.length === 0) {
    featuresList.classList.add('hidden');
  }
  cardElement.querySelector('.popup__description').textContent = description;

  const photoList = cardElement.querySelector('.popup__photos');
  const photoElements = photoList.querySelector('.popup__photo');
  photoElements.remove();
  photos.forEach((photo) => {
    const photoElement = photoElements.cloneNode(true);
    photoElement.src = photo;
    photoList.append(photoElement);
  });
  if (photoList.length === 0) {
    photoList.classList.add('hidden');
  }
  return cardElement;
};

export {createCard};
