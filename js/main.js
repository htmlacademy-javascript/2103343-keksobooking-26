const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
getRandom(0, 1);

function getRandomFloat (min, max, count) {
  if (min < max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(count));
  } else {
    throw new Error('Неверный диапозон');}
}
getRandomFloat (1.1,1.2,5);
