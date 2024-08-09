const fileChooser = document.querySelector('#upload-file');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const loadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  // const effectsPreview = document.querySelectorAll('.effects__preview');

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreview.forEach((icon) => {
      icon.style.backgroundImage = `url('${preview.src}')`;
    });
  }
};


export { loadImage };

