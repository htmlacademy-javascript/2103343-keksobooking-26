//выбор правильных окончаний слов
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
//Нажатие ESC
const isEscapeKey = (evt) => evt.key === 'Escape';
//Функция debounce для устранения дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {getRoomEnds, getGuestsEnds, getCardRoomEnds, isEscapeKey, debounce};
