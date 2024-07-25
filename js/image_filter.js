// сырой работаю над слайдером
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const effectLevelSlider = imgUploadPreviewContainer.querySelector('.effect-level__slider');
// const effectLevelValue = imgUploadPreviewContainer.querySelector('.effect-level__value');
const imgUploadEffects = imgUploadPreviewContainer.querySelector('.img-upload__effects');

imgUploadEffects.addEventListener('change', () => {
  // console.log('change');
});


// console.log(document.activeElement);


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower'
});

const updateSlider = () => {
  // const value = effectLevelSlider.noUiSlider.get();
  // console.log(value);
};


effectLevelSlider.noUiSlider.on('update', updateSlider);


export { imgUploadPreviewContainer };
