import { getData, downloadErrorOuput } from './get_data.js';
import { drawsPhotos } from './photos.js';
import './send_data.js';
import { uploadOpen } from './uploadform.js';

getData((data) => drawsPhotos(data), () => downloadErrorOuput());

uploadOpen();
