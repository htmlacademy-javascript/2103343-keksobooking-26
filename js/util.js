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

export {getRandom, getRandomFloat, getRandomArrayElement, getRandomArrayOfElements, getRandomArrayNoRepeat};
