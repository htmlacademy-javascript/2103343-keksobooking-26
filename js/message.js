import { onEventEsc } from './util.js';

const SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onMessageClose = (evtObj) => {
  const onEventEscKeydown = (evt) => {
    if(onEventEsc(evt)){
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
  onMessageClose(message);
};
//Сообщение ошибки
const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  const errorMessageCloseButtonElement = document.querySelector('.error__button');
  document.querySelector('.error__message').textContent = 'Не удалось отправить';

  errorMessageCloseButtonElement.addEventListener('click', () => {
    message.remove();
  });
  onMessageClose(message);
};
// Сообщение об ошибке загрузки данных с сервера
const showAlert = () => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('allert');
  alertElement.textContent = 'Ошибка загрузки данных с сервера!';
  document.body.append(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, SHOW_TIME);
};
export {showSuccessMessage, showErrorMessage, showAlert};
