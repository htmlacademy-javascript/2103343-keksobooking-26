import {getCardRoomEnds, getGuestsEnds} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typeToName = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
//Создание картоки объявления
const createCard = (card) => {

  const cardElement = cardTemplate.cloneNode(true);
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = card.offer;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar ;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typeToName[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getCardRoomEnds(rooms)} для ${guests} ${getGuestsEnds(guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresListElement = cardElement.querySelector('.popup__features');
  if(features) {
    const featuresListElements = featuresListElement.querySelectorAll('.popup__feature');
    featuresListElements.forEach((featureItem) => {
      if(!features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`)))
      {
        featureItem.remove();
      }
    });
  }
  else {
    featuresListElement.classList.add('hidden');
  }

  cardElement.querySelector('.popup__description').textContent = description;

  const photoListElement = cardElement.querySelector('.popup__photos');
  if(photos) {
    const photoListElements = photoListElement.querySelector('.popup__photo');
    photoListElements.remove();
    photos.forEach((photo) => {
      const photoElement = photoListElements.cloneNode(true);
      photoElement.src = photo;
      photoListElement.append(photoElement);
    });
  }
  else {
    photoListElement.classList.add('hidden');
  }

  return cardElement;
};

export {createCard};
