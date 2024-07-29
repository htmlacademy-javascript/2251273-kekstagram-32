import { PHOTOS } from './data.js';
import { drawsPhotos } from './photos.js';
import { uploadOpen } from './uploadform.js';
import './image_filter.js';


drawsPhotos(PHOTOS);
uploadOpen();


export { PHOTOS };

