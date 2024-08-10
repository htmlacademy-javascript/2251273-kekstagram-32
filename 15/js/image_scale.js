const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const imgUploadPreview = imgUploadPreviewContainer.querySelector('.img-upload__preview img');
const scaleControlValue = imgUploadPreviewContainer.querySelector('.scale__control--value');
const decreaseImageButton = imgUploadPreviewContainer.querySelector('.scale__control--smaller');
const increaseImageButton = imgUploadPreviewContainer.querySelector('.scale__control--bigger');

const ScaleControl = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

// функция изменения масштаба
const scaleImage = () => {
  imgUploadPreview.style.transform = `scale(${Number(scaleControlValue.value.replace('%', '')) / ScaleControl.MAX})`;
};

// функции уменьшения масштаба
const decreaseImage = () => {
  const scaleValue = Number(scaleControlValue.value.replace('%', ''));

  scaleControlValue.value = scaleValue - ScaleControl.STEP < ScaleControl.MIN ? `${ScaleControl.MIN}%` : `${scaleValue - ScaleControl.STEP}%`;
  scaleImage();
};

// функции увеличения масштаба
const increaseImage = () => {
  const scaleValue = Number(scaleControlValue.value.replace('%', ''));

  scaleControlValue.value = (scaleValue + ScaleControl.STEP) > ScaleControl.MAX ? `${ScaleControl.MAX}%` : `${scaleValue + ScaleControl.STEP}%`;
  scaleImage();
};

// функции контроля изменения масштаба
const transformImage = () => {
  scaleImage();

  decreaseImageButton.addEventListener('click', decreaseImage);
  increaseImageButton.addEventListener('click', increaseImage);
};

export { transformImage };
