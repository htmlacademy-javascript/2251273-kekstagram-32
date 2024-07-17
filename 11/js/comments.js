const picture = document.querySelector('.big-picture');
const socialComments = picture.querySelector('.social__comments');
const socialCommentShownCount = picture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = picture.querySelector('.social__comment-total-count');
const socialCommentsLoader = picture.querySelector('.social__comments-loader');

const commentShownCount = 5;


// функция проверки вывода всех коментариев

const isAllComments = (comments) => {
  if (comments.length <= socialComments.childElementCount) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
  socialCommentShownCount.textContent = socialComments.childElementCount;
  socialCommentTotalCount.textContent = comments.length;
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


// функция отрисовки следующих коментариев
const showNextComents = (comments, displayedComments) => {
  // console.log('click');

  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.slice(0, displayedComments).forEach((element) => {
    fragment.append(createComment(element));
  });

  socialComments.append(fragment);
  isAllComments(comments, displayedComments);
};

// функция отрисовки коментариев
const drawsComments = (comments) => {

  let displayedComments = commentShownCount;
  showNextComents(comments, displayedComments);

  socialCommentsLoader.addEventListener('click', () => {
    displayedComments += commentShownCount;
    showNextComents(comments, displayedComments);
  });
};


export { drawsComments };
