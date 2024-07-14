import { getRandomInt } from './functions.js';

// константы
const MAX_NUM_PHOTO = 25;

const NUM_LIKES = {
  MIN: 15,
  MAX: 200
};

const NUM_COMMENTS = {
  MIN: 0,
  MAX: 30
};

const NUM_AVATARS = {
  MIN: 1,
  MAX: 6
};

const DATE_DESCRIPTION = {
  MIN_DAY: 1,
  MAX_DAY: 29,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MIN_YEAR: 1991,
  MAX_YEAR: 2023
};

// функция генерации случайного описания DESCRIPTION
const DESCRIPTION = new function () {
  this.listDescription = [
    'Эта фотография сделана',
    'Это фото сделано',
    'Снимок сделан',
    'Момент запечатлен'
  ];
  this.listCity = [
    'Москве',
    'Санкт-Петербурге',
    'Новосибирске',
    'Красноярске',
    'Екатеринбурге',
    'Минске',
    'Витебске',
    'Севастополе',
    'Брянске',
    'Владивостоке',
    'Бресте'
  ];
  this.listPeople = [
    'c подругой',
    'c другом',
    'c друзьями',
    'c подругами',
  ];
  this.listEvents = [
    'путешествия',
    'прогулки',
    'фотосессии',
    'отдыха'
  ];


  this.getRandomDescription = () => `${this.listDescription[getRandomInt(0, this.listDescription.length - 1)]} в ${this.listCity[getRandomInt(0, this.listCity.length - 1)]} ${getRandomInt(DATE_DESCRIPTION.MIN_DAY, DATE_DESCRIPTION.MAX_DAY)}/${getRandomInt(DATE_DESCRIPTION.MIN_MONTH, DATE_DESCRIPTION.MAX_MONTH)}/${getRandomInt(DATE_DESCRIPTION.MIN_YEAR, DATE_DESCRIPTION.MAX_YEAR, DATE_DESCRIPTION.MAX_YEAR)}. Во время ${this.listEvents[getRandomInt(0, this.listEvents.length - 1)]} ${this.listPeople[getRandomInt(0, this.listPeople.length - 1)]}.`;
};

// функция генерации случайного количество лайков LIKES
const LIKES = new function () {
  this.random = () => getRandomInt(NUM_LIKES.MIN, NUM_LIKES.MAX);
};

// функция генерации случайного комментария COMMENTS
const COMMENTS = new function () {
  this.listComents = {
    'best': [
      'Великолепно! Приятно удивили!',
      'Восхитительно!',
      'Супер!',
      'Всё отлично! Круто!',
      'Прекрасно!',
    ],
    'good': [
      'Отлично.',
      'Хорошо.',
      'В целом всё неплохо. Но не всё.',
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
  this.random = () => getRandomInt(NUM_COMMENTS.MIN, NUM_COMMENTS.MAX);
  this.indexComent = 1;
  this.getIndex = () => this.indexComent++;
  this.getRandomComent = () => {
    const keys = Object.keys(this.listComents);
    const index = getRandomInt(0, keys.length - 1);
    return this.listComents[keys[index]][getRandomInt(0, this.listComents[keys[index]].length - 1)];
  };
};

// функция генерации случайного пользователя USERS
const USERS = new function () {
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
    this.listUsers.push(new Object({ name: userName, avatar: `img/avatar-${getRandomInt(NUM_AVATARS.MIN, NUM_AVATARS.MAX)}.svg` }));
  };
  this.getRandomUser = () => {
    this.createRandomUser();
    this.randomUser = this.listUsers[getRandomInt(0, this.listUsers.length - 1)];
    return this.randomUser;
  };
};


// функция генерации случайного фото
const PHOTOS = new Array(MAX_NUM_PHOTO)
  .fill()
  .map((elementPhoto, indexPhoto) => new Object({
    id: indexPhoto + 1,
    url: `./photos/${(indexPhoto % 25) + 1}.jpg`,
    description: DESCRIPTION.getRandomDescription(),
    likes: LIKES.random(),
    comments: new Array(COMMENTS.random())
      .fill()
      .map(() => new Object({
        id: COMMENTS.getIndex(),
        avatar: USERS.getRandomUser()?.avatar,
        message: COMMENTS.getRandomComent(),
        name: USERS.randomUser?.name
      }))
  }));


export { PHOTOS, NUM_AVATARS };
