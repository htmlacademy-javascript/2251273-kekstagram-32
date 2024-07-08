const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContrainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

// функция отриcовки карточек (элемеенты карточек добавляются по одной)
const drawsThumbnails = (listPhotos) => {
  listPhotos.forEach((elementPhoto) => {
    const element = templatePicture.cloneNode(true);
    const imageThumbnail = element.querySelector('.picture__img');
    imageThumbnail.src = elementPhoto.url;
    imageThumbnail.alt = elementPhoto.description;
    element.querySelector('.picture__likes').textContent = elementPhoto.likes;
    element.querySelector('.picture__comments').textContent = elementPhoto.comments.length;
    picturesContrainer.append(element);
  });
};

// функция отрисовки карточек 2 (элемеенты карточек добавляются по одной в контейнер fragment, а потом в контейнер picturesContrainer)
const drawsThumbnails2 = (listPhotos) => {
  listPhotos.forEach((elementPhoto) => {
    const element = templatePicture.cloneNode(true);
    const imageThumbnail = element.querySelector('.picture__img');
    imageThumbnail.src = elementPhoto.url;
    imageThumbnail.alt = elementPhoto.description;
    element.querySelector('.picture__likes').textContent = elementPhoto.likes;
    element.querySelector('.picture__comments').textContent = elementPhoto.comments.length;
    fragment.append(element);
  });

  picturesContrainer.append(fragment);
};


export { drawsThumbnails, drawsThumbnails2 };
