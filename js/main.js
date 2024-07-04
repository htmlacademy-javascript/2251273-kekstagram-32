import { PHOTOS } from './data.js';

const RESULT = PHOTOS.listPhotos;
RESULT.sort((a, b) => a.likes - b.likes);

export { RESULT };
