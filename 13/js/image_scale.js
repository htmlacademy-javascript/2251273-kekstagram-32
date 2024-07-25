const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const imgUploadPreview = imgUploadPreviewContainer.querySelector('.img-upload__preview').querySelector('img');

const scaleControlValue = imgUploadPreviewContainer.querySelector('.scale__control--value');

const decreaseImageButton = imgUploadPreviewContainer.querySelector('.scale__control--smaller');
const increaseImageButton = imgUploadPreviewContainer.querySelector('.scale__control--bigger');

const scaleControl = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

// функция изменения масштаба
const scaleImage = () => {
  imgUploadPreview.style.transform = `scale(${Number(scaleControlValue.value.replace('%', '')) / scaleControl.MAX})`;
};

// функции уменьшения масштаба
const decreaseImage = () => {
  const scaleValue = Number(scaleControlValue.value.replace('%', ''));

  scaleControlValue.value = scaleValue - scaleControl.STEP < scaleControl.MIN ? `${scaleControl.MIN}%` : `${scaleValue - scaleControl.STEP}%`;
  scaleImage();
};

// функции увеличения масштаба
const increaseImage = () => {
  const scaleValue = Number(scaleControlValue.value.replace('%', ''));

  scaleControlValue.value = (scaleValue + scaleControl.STEP) > scaleControl.MAX ? `${scaleControl.MAX}%` : `${scaleValue + scaleControl.STEP}%`;
  scaleImage();
};

// функции контроля изменения масштаба
const transformImage = () => {
  decreaseImageButton.addEventListener('click', decreaseImage);
  increaseImageButton.addEventListener('click', increaseImage);
};

export { transformImage };
