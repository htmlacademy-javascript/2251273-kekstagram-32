// сырой работаю над слайдером
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectValue = sliderContainer.querySelector('.effect-level__value');

const effects = document.querySelector('.img-upload__effects');

const filterSettings = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    style: 'none',
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    style: 'grayscale',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'sepia',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'brightness',
  },
};


// функция скрытия слайдера
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};


// функция отображения слайдера
const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};


hideSlider();


noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 10,
  connect: 'lower'
});


// функция обновления слайдера
const updateSlider = () => {
  effectValue.value = slider.noUiSlider.get();
};

// функция выбора эффекта
const setFilter = () => {
  const effect = effects.querySelector('input:checked').value;
  if (effect === 'none') {
    hideSlider();
  } else {
    showSlider();
    slider.noUiSlider.updateOptions(filterSettings[effect]);
  }
};


effects.addEventListener('change', setFilter);
slider.noUiSlider.on('update', updateSlider);


export { sliderContainer };
