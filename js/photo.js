const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

const userPhotoChooser = document.querySelector('#avatar');
const userPhotoPreview = document.querySelector('.ad-form-header__preview img');
const advPhotoChooser = document.querySelector('#images');
const advPhotoPreview = document.querySelector('.ad-form__photo');

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
userPhotoChooser.addEventListener('change', () => {
  userPhotoPreview.src = getPhotoUrl(userPhotoChooser);
});

// Выбор фото жилья
advPhotoChooser.addEventListener('change', () => {
  advPhotoPreview.innerHTML = '';
  const photo = document.createElement('img');
  photo.classList.add('ad-form__photo');
  photo.src = getPhotoUrl(advPhotoChooser);
  advPhotoPreview.append(photo);
});

// Очистка формы
const resetPhotos = () =>{
  advPhotoPreview.innerHTML = '';
  userPhotoPreview.src = DEFAULT_AVATAR_IMAGE;
};

export {resetPhotos};

