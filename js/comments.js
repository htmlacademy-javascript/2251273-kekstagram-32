const picture = document.querySelector('.big-picture');
const socialComments = picture.querySelector('.social__comments');
const socialCommentShownCount = picture.querySelector('.social__comment-shown-count');
const commentShownCount = socialCommentShownCount.textContent;
const socialCommentTotalCount = picture.querySelector('.social__comment-total-count');
const socialCommentsLoader = picture.querySelector('.social__comments-loader');


const commentsLoader = (comments) => {
  socialCommentsLoader.addEventListener('click', () => {
  });
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
const drawComments = (comments) => {
  const counter = 5;

  let inner = () => {
    socialComments.innerHTML = '';
    comments.slice(0, counter).forEach((element) => {
      socialComments.append(createComment(element));
    });
  };

  inner();
  // socialCommentShownCount.textContent = comments.length > counter ? counter : comments.length;
  // socialCommentTotalCount.textContent = comments.length;

  commentsLoader(comments);
};

export { drawComments };
