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
  socialCommentShownCount.textContent = comments.length > displayedComments ? displayedComments : comments.length;
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


// функция отрисовки коментариев
const drawsComments = (comments) => {
  console.log('drawsComments');
  let displayedComments = 0;

  const showComments = () => {
    console.log('showComments');
    displayedComments += commentShownCount;

    socialComments.innerHTML = '';
    comments.slice(0, displayedComments).forEach((element) => {
      socialComments.append(createComment(element));
    });
    isAllComments(comments, displayedComments);
  };

  showComments();

  socialCommentsLoader.addEventListener('click', showComments, { once: true });
};


// const drawsComments = (comments) => {
//   console.log('drawsComments');
//   let displayedComments = commentShownCount;

//   socialComments.innerHTML = '';
//   comments.slice(0, displayedComments).forEach((element) => {
//     socialComments.append(createComment(element));
//   });

//   isAllComments(comments, displayedComments);

//   socialCommentsLoader.addEventListener('click', () => {
//     console.log('showComments');
//     displayedComments += commentShownCount;
//     socialComments.innerHTML = '';
//     comments.slice(0, displayedComments).forEach((element) => {
//       socialComments.append(createComment(element));
//     });
//     isAllComments(comments, displayedComments);
//   });
// };


export { drawsComments };
