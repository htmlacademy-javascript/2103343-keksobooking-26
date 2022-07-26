//Выбор правильных окончаний слов
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
const getGuestsEnds = (guests) => getWordEndings(guests, ['гостя', 'гостей', 'гостей']);
//Функция debounce для устранения дребезга
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {getGuestsEnds, getCardRoomEnds, debounce};
