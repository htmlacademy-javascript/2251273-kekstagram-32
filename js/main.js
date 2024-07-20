import { PHOTOS } from './data.js';
import { drawsPhotos } from './photos.js';
// import { picture } from './picture.js';
import { uploadOpen } from './uploadform.js';


drawsPhotos(PHOTOS);
uploadOpen();


export { PHOTOS };

