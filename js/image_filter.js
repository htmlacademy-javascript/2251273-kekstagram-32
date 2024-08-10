import { transformImage } from './image_scale.js';
import { debounce, corectValue } from './utils';

const timeDelayFilter = 500;
const previewContainer = document.querySelector('.img-upload__preview-container');
const imgUploadPreview = previewContainer.querySelector('.img-upload__preview img');
const sliderContainer = previewContainer.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effects = document.querySelector('.img-upload__effects');
const effectLevelValue = document.querySelector('.effect-level__value');


// создание слайдера
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower'
});


// настройки слайдера
const filterSettings = {
  none: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    style: 'none'
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    style: 'grayscale'
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    style: 'sepia'
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%'
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px'
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'brightness'
  },
};


// функция получения эффекта
const getEffect = () => effects.querySelector('input:checked').value;

// функция отображения слайдера
const displaySlider = (effect = 'none') => {
  if (effect !== 'none') {
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }
};

// функция обновления эффекта
const updateEffect = (effect = 'none', value) => {
  if (effect !== 'none') {
    imgUploadPreview.style.filter = `${filterSettings[effect].style}(${value}${filterSettings[effect].unit || ''})` || 'none';
  } else {
    imgUploadPreview.style.filter = 'none';
  }
};

const updateEffectDebounced = debounce(updateEffect, timeDelayFilter);

// функция обновления слайдера
const updateSlider = () => {
  const number = Number(slider.noUiSlider.get());
  effectLevelValue.value = corectValue(number);
  displaySlider(getEffect());
  updateEffectDebounced(getEffect(), effectLevelValue.value);
};

// функция выбора эффекта
const setFilter = () => {
  effectLevelValue.value = filterSettings[getEffect()].start;
  slider.noUiSlider.updateOptions(filterSettings[getEffect()]);
};

// функция создания слайдера
const createSlider = () => {
  slider.noUiSlider.on('update', updateSlider);
  effects.addEventListener('change', setFilter);
  transformImage();
};


export { createSlider };
