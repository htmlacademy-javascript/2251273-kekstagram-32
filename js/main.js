// функция генерации случайного числа
const getRandomInt = (min = 0, max = 100) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

// likes
const likes = new function () {
  this.MIN = 15;
  this.MAX = 200;
  this.set = new Set();
  this.random = getRandomInt(this.MIN, this.MAX);
};

// comments
const comments = new function () {
  this.MIN = 0;
  this.MAX = 30;
  this.listComents = {
    'best': [
      'Великолепно!',
      'Восхитительно!!!',
      'Супер!!!',
      'Всё отлично!!!'
    ],
    'good': [
      'Отлично.',
      'Хорошо.',
      'В целом всё неплохо. Но не всё.'
    ],
    'normal': [
      'Норм',
      'Неплохо',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',

    ],
    'bad': [
      'Плохо',
      'Отвратительно',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    ]
  };
  this.random = getRandomInt(this.MIN, this.MAX);
  this.indexComent = 1;
  this.getIndex = () => this.indexComent++;
  this.getRandomComent = () => {
    const keys = Object.keys(this.listComents);
    const index = getRandomInt(0, keys.length - 1);
    return this.listComents[keys[index]][getRandomInt(0, this.listComents[keys[index]].length - 1)];
  };
};

// users
const users = new function () {
  this.AVATAR_MIN = 1;
  this.AVATAR_MAX = 6;
  this.firstNameFemale = [
    'Ксения',
    'Виктория',
    'Александра',
    'Елизавета',
    'Алиса',
    'Арина',
    'Стефания',
    'Яна',
    'Ева',
    'Алёна',
  ];
  this.lastNameFemale = [
    'Сорокина',
    'Зимина',
    'Краснова',
    'Титова',
    'Федотова',
    'Игнатьева',
    'Егорова',
    'Соколова',
    'Федорова',
    'Артемова',
  ];
  this.firstNameMale = [
    'Даниил',
    'Платон',
    'Роман',
    'Артемий',
    'Роман',
    'Константин',
    'Демьян',
    'Николай',
    'Вячеслав',
    'Платон'
  ];
  this.lastNameMale = [
    'Гришин',
    'Симонов',
    'Нестеров',
    'Фролов',
    'Орлов',
    'Павлов',
    'Макаров',
    'Широков',
    'Крючков',
    'Гаврилов',
  ];
  this.listUsers = new Array();
  this.random = getRandomInt(this.MIN, this.MAX);
  this.randomUser = null;
  this.createRandomUser = () => {
    let userName;
    // генерация рандомного пользователя
    if (getRandomInt() % 2 === 0) {
      userName = `${this.firstNameFemale[getRandomInt(0, this.firstNameFemale.length - 1)]} ${this.lastNameFemale[getRandomInt(0, this.lastNameFemale.length - 1)]}`;
    } else {
      userName = `${this.firstNameMale[getRandomInt(0, this.firstNameMale.length - 1)]} ${this.lastNameMale[getRandomInt(0, this.lastNameMale.length - 1)]}`;
    }
    // проверка на уникальность
    for (let index = 0; index < this.listUsers.length - 1; index++) {
      if (this.listUsers[index]?.name === userName) {
        return;
      }
    }
    // добавление пользователя
    this.listUsers.push(new Object({ name: userName, avatar: `img/avatar-${getRandomInt(this.AVATAR_MIN, this.AVATAR_MAX)}.svg` }));
  };
  this.getRandomUser = () => {
    this.createRandomUser();
    this.randomUser = this.listUsers[getRandomInt(0, this.listUsers.length - 1)];
    return this.randomUser;
  };
};


// console.time('time');

const photos = new Array(25)
  .fill()
  .map((elementPhoto, indexPhoto) => new Object({
    id: ++indexPhoto,
    url: `photos/${indexPhoto}.jpg`,
    description: `photo ${indexPhoto}`,
    likes: likes.random,
    comments: new Array(comments.random)
      .fill()
      .map((elementComents, indexComments) => new Object({
        id: comments.getIndex(),
        avatar: users.getRandomUser()?.avatar,
        message: `${comments.getRandomComent()} ${indexComments}`,
        name: users.randomUser?.name
      }))
  }));


export { getRandomInt, photos};
// console.timeEnd('time');

// console.log(getRandomInt(0.9, 100));
// console.log(photos[24]);

// console.log(photos.at(-1));
// console.log(photos[0]);
// avatars.set.add(getRandomInt(avatars.MIN, avatars.MAX));
// avatars.set.add(getRandomInt(avatars.MIN, avatars.MAX));
// avatars.set.add(getRandomInt(avatars.MIN, avatars.MAX));
// console.log(Object.keys(comments.listComents)[getRandomInt(0, Object.keys(comments.listComents).length - 1)]);
// console.log(comments.listComents[Object.keys(comments.listComents)[getRandomInt(0, Object.keys(comments.listComents).length - 1)]][0]);
// console.log(users.listUsers.length);

