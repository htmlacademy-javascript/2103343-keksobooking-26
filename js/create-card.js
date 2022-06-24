import {createAdvertisementArray} from './data.js';

const randomCard = createAdvertisementArray();
console.log(createAdvertisementArray());
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();
const cardListElement = document.querySelector('#map-canvas');

randomCard.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar ;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  const typesMatch = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  cardElement.querySelector('.popup__type').textContent = typesMatch[offer.type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = cardElement.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    if (!offer.features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`))) {
      featureItem.remove();
    }
  });
  if (offer.features.length === 0) {
    featuresList.classList.add('hidden');
  }
  cardElement.querySelector('.popup__description').textContent = offer.description;

  const photoList = cardElement.querySelector('.popup__photos');
  const photoElements = photoList.querySelector('.popup__photo');
  photoElements.remove();
  for (let i = 0; i < offer.photos.length; i++) {
    const photoElement = photoElements.cloneNode(true);
    photoElement.src = offer.photos[i];
    photoList.append(photoElement);
  }
  if (photoList.length === 0) {
    photoList.classList.add('hidden');
  }
  /*
  const photoList = cardElement.querySelector('.popup__photos');
  photoList.replaceChildren(...offer.photos.map(
    (photo) => {
      const photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;

      return photoElement;
    }
  ));

  if (photoList.length === 0) {
    photoList.classList.add('hidden');
  }
  */
  fragment.append(cardElement);


});

cardListElement.append(fragment);

