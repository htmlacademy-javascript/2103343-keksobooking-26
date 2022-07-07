const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloat = (min, max, count) => {
  if (min >= 0 && min < max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(count));
  }
  throw new Error('Неверный диапозон');
};

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];
//массив случайной длины
const getRandomArrayOfElements = (elements, length) => Array.from({length: length}, () => getRandomArrayElement(elements));
//массив случайной длины без повторений
const getRandomArrayNoRepeat = (elements) => Array.from({length: getRandom(1, elements.length)}, () => elements.splice(getRandom(0, elements.length - 1), 1)[0]);

const getWordEndings = (value, word) => {

  if (value === 1) {
    return word[0];
  }
  if (value > 1 && value <= 4){
    return word [1];
  }
  if (value > 4){
    return word [2];
  }
};
const getCardRoomEnds = (rooms) => getWordEndings(rooms, ['комната', 'комнаты', 'комнат']);
const getRoomEnds = (rooms) => getWordEndings(rooms, ['комнаты', 'комнат', 'комнат']);
const getGuestsEnds = (guests) => getWordEndings(guests, ['гостя', 'гостей', 'гостей']);

export {getRandom, getRandomFloat, getRandomArrayElement, getRandomArrayOfElements, getRandomArrayNoRepeat, getRoomEnds, getGuestsEnds, getCardRoomEnds};
