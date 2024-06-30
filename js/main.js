// константы
const MIN_NUM_LIKES = 15;
const MAX_NUM_LIKES = 200;

const MIN_NUM_COMMENTS = 0;
const MAX_NUM_COMMENTS = 30;

const MIN_NUM_AVATARS = 1;
const MAX_NUM_AVATARS = 6;

const MAX_NUM_PHOTO = 25;


// функция генерации случайного числа
const getRandomInt = (min = 0, max = 100) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

// функция генерации случайного описания
const getRandomDescription = () => {
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

  return `${this.listDescription[getRandomInt(0, this.listDescription.length - 1)]} в ${this.listCity[getRandomInt(0, this.listCity.length - 1)]} ${getRandomInt(1, 29)}/${getRandomInt(1, 12)}/${getRandomInt(1991, 2023)}. Во время ${this.listEvents[getRandomInt(0, this.listEvents.length - 1)]} ${this.listPeople[getRandomInt(0, this.listPeople.length - 1)]}.`;
};

// функция генерации случайного количество лайков
const likes = new function () {
  this.random = () => getRandomInt(MIN_NUM_LIKES, MAX_NUM_LIKES);
};

// функция генерации случайного комментария
const comments = new function () {
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
  this.random = () => getRandomInt(MIN_NUM_COMMENTS, MAX_NUM_COMMENTS);
  this.indexComent = 1;
  this.getIndex = () => this.indexComent++;
  this.getRandomComent = () => {
    const keys = Object.keys(this.listComents);
    const index = getRandomInt(0, keys.length - 1);
    return this.listComents[keys[index]][getRandomInt(0, this.listComents[keys[index]].length - 1)];
  };
};

// функция генерации случайного пользователя
const users = new function () {
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
    this.listUsers.push(new Object({ name: userName, avatar: `img/avatar-${getRandomInt(MIN_NUM_AVATARS, MAX_NUM_AVATARS)}.svg` }));
  };
  this.getRandomUser = () => {
    this.createRandomUser();
    this.randomUser = this.listUsers[getRandomInt(0, this.listUsers.length - 1)];
    return this.randomUser;
  };
};


const photos = new Array(MAX_NUM_PHOTO)
  .fill()
  .map((elementPhoto, indexPhoto) => new Object({
    id: ++indexPhoto,
    url: `photos/${indexPhoto}.jpg`,
    description: getRandomDescription(),
    likes: likes.random(),
    comments: new Array(comments.random())
      .fill()
      .map(() => new Object({
        id: comments.getIndex(),
        avatar: users.getRandomUser()?.avatar,
        message: `${comments.getRandomComent()}`,
        name: users.randomUser?.name
      }))
  }));


export { photos };
