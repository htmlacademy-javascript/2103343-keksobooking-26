const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

const userPhotoChooser = document.querySelector('#avatar');
const userPhotoPreview = document.querySelector('.ad-form-header__preview img');
const advPhotoChooser = document.querySelector('#images');
const advPhotoPreview = document.querySelector('.ad-form__photo');

userPhotoChooser.addEventListener('change', () => {
  const file = userPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    userPhotoPreview.src = URL.createObjectURL(file);
  }
});

advPhotoChooser.addEventListener('change', () => {
  const file = advPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    advPhotoPreview.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    advPhotoPreview.append(photo);
  }
});

const resetPhotos = () =>{
  advPhotoPreview.innerHTML = '';
  userPhotoPreview.src = DEFAULT_AVATAR_IMAGE;
};

export {resetPhotos};

