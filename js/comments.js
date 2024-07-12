const picture = document.querySelector('.big-picture');
const socialComments = picture.querySelector('.social__comments');
const socialCommentShownCount = picture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = picture.querySelector('.social__comment-total-count');
const socialCommentsLoader = picture.querySelector('.social__comments-loader');

const commentShownCount = 5;


// функция проверки вывода всех коментариев

const isAllComments = (comments, displayedComments) => {
  if (comments.length <= displayedComments) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

// функция отрисовки коментария
const createComment = (comment) => {
  const element = document.createElement('li');
  element.classList.add('social__comment');

  const elementPicture = document.createElement('img');
  elementPicture.classList.add('social__picture');
  elementPicture.src = comment.avatar;
  elementPicture.alt = comment.name;

  const elementText = document.createElement('p');
  elementText.classList.add('social__text');
  elementText.textContent = comment.message;
  element.append(elementPicture, elementText);

  return element;
};

// функция отрисовки коментариев
const drawsComments = (comments, displayedComments = commentShownCount) => {
  socialComments.innerHTML = '';
  comments.slice(0, displayedComments).forEach((element) => {
    socialComments.append(createComment(element));
  });
  socialCommentShownCount.textContent = comments.length > displayedComments ? displayedComments : comments.length;
  socialCommentTotalCount.textContent = comments.length;
  isAllComments(comments, displayedComments);
  socialCommentsLoader.addEventListener('click', () => {
    drawsComments(comments, displayedComments + commentShownCount);
  });
};


export { drawsComments };
