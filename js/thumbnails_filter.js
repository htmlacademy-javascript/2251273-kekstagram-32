const imgFilters = document.querySelector('.img-filters');

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');


// функция установки активного фильтра
const setFilter = (evt) => {
  const activeFilter = imgFilters.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

// функция отображения фильтров
const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');

  filterDefault.addEventListener('click', (evt) => {
    setFilter(evt);
  });
  filterRandom.addEventListener('click', (evt) => setFilter(evt));
  filterDiscussed.addEventListener('click', (evt) => setFilter(evt));
};


export { showFilters };
