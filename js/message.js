const SHOW_TIME = 5000;

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');

const addMessageListeners = (messageElement) => {
  const onKeydown = (evt) => {
    if(evt.key === 'Escape'){
      evt.preventDefault();
      messageElement.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  const onClick = () => {
    document.removeEventListener('click', onClick);
    messageElement.remove();
  };
  document.addEventListener('click', onClick);
};

//Сообщение об успешной отправке
const showSuccessMessage = () => {
  const element = successMessageTemplateElement.cloneNode(true);
  document.body.appendChild(element);
  addMessageListeners(element);
};
//Сообщение ошибки
const showErrorMessage = () => {
  const element = errorMessageTemplateElement.cloneNode(true);
  document.body.appendChild(element);
  const errorMessageCloseButtonElement = document.querySelector('.error__button');
  document.querySelector('.error__message').textContent = 'Не удалось отправить';

  errorMessageCloseButtonElement.addEventListener('click', () => {
    element.remove();
  });
  addMessageListeners(element);
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
