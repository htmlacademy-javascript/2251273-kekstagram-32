const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const maxRandomThumbnails = 10;


// функция установки активного фильтра
const setFilter = (evt) => {
  const activeFilter = imgFilters.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};


// функция отображения по умолчанию
const setDefault = (cb) => {
  filterDefault.addEventListener('click', (evt) => {
    setFilter(evt);
    cb();
  });
};

// функция сортировки по умолчанию (id)
const sortDefault = (array) => array.sort((first, last) => first.id - last.id);


// функция выбора случайного отображения
const setRandom = (cb) => {
  filterRandom.addEventListener('click', (evt) => {
    setFilter(evt);
    cb();
  });
};

// функция сортировки по случайному отображению
const sortRandom = (array) => array.sort(() => Math.random() - 0.5).slice(0, maxRandomThumbnails);


// функция выбора отображения самых обсуждаемых миниатюр
const setDiscussed = (cb) => {
  filterDiscussed.addEventListener('click', (evt) => {
    setFilter(evt);
    cb();
  });
};

// функция сортировки по количеству комментариев
const sortDiscussed = (array) => array.sort((first, last) => last.comments.length - first.comments.length);


export { setDefault, setRandom, setDiscussed, sortDefault, sortRandom, sortDiscussed };

