const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
getRandom(0, 1);

const getRandomFloat = (min, max, count) => (min < max) ? ((Math.random() * (max - min + 1)) + min).toFixed(count) : console.log('Неверный диапозон');
getRandomFloat (4,5,1);
