const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContrainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

// функция отрисовки карточки
const drawsPhoto = (photo) => {
  const element = templatePicture.cloneNode(true);
  const elementImage = element.querySelector('.picture__img');
  elementImage.src = photo.url;
  elementImage.alt = photo.description;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  elementImage.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log(`click on ${photo.url}`);
  });
  return element;
};

// функция отриcовки карточек
const drawsPhotos = (listPhotos) => {
  listPhotos.forEach((elementPhoto) => {
    fragment.append(drawsPhoto(elementPhoto));
  });
  picturesContrainer.append(fragment);
};


export { drawsPhotos };
