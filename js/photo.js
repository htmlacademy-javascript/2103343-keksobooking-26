const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

const userPhotoChooserElement = document.querySelector('#avatar');
const userPhotoPreviewElement = document.querySelector('.ad-form-header__preview img');
const advPhotoChooserElement = document.querySelector('#images');
const advPhotoPreviewElement = document.querySelector('.ad-form__photo');
// Получение ссылки
const getPhotoUrl = (photoChooser) => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    return URL.createObjectURL(file);
  }
};
//Выбор фото аватара
userPhotoChooserElement.addEventListener('change', () => {
  userPhotoPreviewElement.src = getPhotoUrl(userPhotoChooserElement);
});
// Выбор фото жилья
advPhotoChooserElement.addEventListener('change', () => {
  advPhotoPreviewElement.innerHTML = '';
  const photoElement = document.createElement('img');
  photoElement.classList.add('ad-form__photo');
  photoElement.src = getPhotoUrl(advPhotoChooserElement);
  advPhotoPreviewElement.append(photoElement);
});
// Очистка формы
const onFormPhotosReset = () =>{
  advPhotoPreviewElement.innerHTML = '';
  userPhotoPreviewElement.src = DEFAULT_AVATAR_IMAGE;
};

export {onFormPhotosReset};

