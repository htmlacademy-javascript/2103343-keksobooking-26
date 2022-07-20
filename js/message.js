import { isEscapeKey } from './util.js';
//Время показа сообщения
const SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const messageCloseHandler = (evtObj) => {
  const onEventEscKeydown = (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      evtObj.remove();
      document.removeEventListener('keydown', onEventEscKeydown);
    }
  };
  document.addEventListener('keydown', onEventEscKeydown);

  const onEventClick = () => {
    document.removeEventListener('click', onEventClick);
    evtObj.remove();
  };
  document.addEventListener('click', onEventClick);
};

//Сообщение об успешной отправке
const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  messageCloseHandler(message);
};
//Сообщение ошибки
const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  const errorMessageCloseButton = document.querySelector('.error__button');
  document.querySelector('.error__message').textContent = 'Не удалось отправить';

  errorMessageCloseButton.addEventListener('click', () => {
    message.remove();
  });
  messageCloseHandler(message);
};
// Сообщение об ошибке загрузки данных с сервера
const showAlert = () => {
  const alert = document.createElement('div');
  alert.classList.add('allert');
  alert.textContent = 'Ошибка загрузки данных с сервера!';
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, SHOW_TIME);
};
export {showSuccessMessage, showErrorMessage, showAlert};
