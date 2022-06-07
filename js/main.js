const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
getRandom(0, 1);

const getRandomFloat = (min, max, count) => {
  if (min >= 0 && min < max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(count));
  } 
  throw new Error('Неверный диапозон');
};
getRandomFloat (1.1,1.2,5);
