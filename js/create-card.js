import {getCardRoomEnds, getGuestsEnds} from './util.js';

const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const typeToName = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
//Создание картоки объявления
const createCard = (card) => {

  const cardElement = cardTemplateElement.cloneNode(true);
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
    const featuresElements = featuresListElement.querySelectorAll('.popup__feature');
    featuresElements.forEach((element) => {
      if(!features.some((feature) => element.classList.contains(`popup__feature--${feature}`)))
      {
        element.remove();
      }
    });
  }
  else {
    featuresListElement.classList.add('hidden');
  }

  cardElement.querySelector('.popup__description').textContent = description;

  const photoListElement = cardElement.querySelector('.popup__photos');
  if(photos) {
    const photoTemplateElement = photoListElement.querySelector('.popup__photo');
    photoTemplateElement.remove();
    photos.forEach((photo) => {
      const photoElement = photoTemplateElement.cloneNode(true);
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
