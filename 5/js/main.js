import { photos } from './data.js';

const result = photos.listPhotos;
result.sort((a, b) => a.likes - b.likes);

export { result };

