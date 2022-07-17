import { isEscapeKey } from './util.js';
//Время показа сообщения
const SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const events = (evtObj) => {
  const eventOnEsc = (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      evtObj.remove();
      document.removeEventListener('keydown', eventOnEsc);
    }
  };
  document.addEventListener('keydown', eventOnEsc);

  const eventOnClick = () => {
    document.removeEventListener('click', eventOnClick);
    evtObj.remove();
  };
  document.addEventListener('click', eventOnClick);
};

//Сообщение об успешной отправке
const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  events(message);
  setTimeout(() => {
    message.remove();
  }, SHOW_TIME);
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
  events(message);
};
// Сообщение об ошибке загрузки данных с сервера
const showAlert = (alertMessage) => {
  const alert = document.createElement('div');
  alert.classList.add('allert');
  alert.textContent = alertMessage;
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, SHOW_TIME);
};
export {showSuccessMessage, showErrorMessage, showAlert};
