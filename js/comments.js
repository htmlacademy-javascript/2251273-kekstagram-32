const COMMENT_SHOWN_COUNT = 5;


// функция отрисовки коментариев
const showNumberComments = (pictureCloned, comments) => {
  const socialComments = pictureCloned.querySelector('.social__comments');
  const socialCommentShownCount = pictureCloned.querySelector('.social__comment-shown-count');
  const socialCommentTotalCount = pictureCloned.querySelector('.social__comment-total-count');
  const socialCommentsLoader = pictureCloned.querySelector('.social__comments-loader');
  // проверка количества коментариев
  if (comments.length <= socialComments.childElementCount) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
  // отображение количества коментариев
  socialCommentShownCount.textContent = socialComments.childElementCount;
  socialCommentTotalCount.textContent = comments.length;
};


// функция отрисовки коментария
const createComment = (comment) => {
  // создание коментария
  const element = document.createElement('li');
  element.classList.add('social__comment');

  // создание аватара коментатора
  const elementPicture = document.createElement('img');
  elementPicture.classList.add('social__picture');
  elementPicture.src = comment.avatar;
  elementPicture.alt = comment.name;

  // создание текста коментария
  const elementText = document.createElement('p');
  elementText.classList.add('social__text');
  elementText.textContent = comment.message;
  element.append(elementPicture, elementText);

  return element;
};


// функция отрисовки следующих коментариев
const showNextComents = (pictureCloned, comments, displayedComments) => {
  const socialComments = pictureCloned.querySelector('.social__comments');
  comments.slice(displayedComments - COMMENT_SHOWN_COUNT, displayedComments).forEach((comment) => {
    socialComments.append(createComment(comment));
  });
  showNumberComments(pictureCloned, comments);
};

// функция отрисовки коментариев
const drawsComments = (pictureCloned, comments) => {
  const socialComments = pictureCloned.querySelector('.social__comments');
  let displayedComments = COMMENT_SHOWN_COUNT;
  socialComments.innerHTML = '';

  const socialCommentsLoader = pictureCloned.querySelector('.social__comments-loader');
  showNextComents(pictureCloned, comments, displayedComments);

  socialCommentsLoader.addEventListener('click', () => {
    showNextComents(pictureCloned, comments, displayedComments += COMMENT_SHOWN_COUNT);
  });
};


export { drawsComments };

