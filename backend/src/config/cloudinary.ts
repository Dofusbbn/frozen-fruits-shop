import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dqi4blplz',
  api_key: '678184156322332',
  api_secret: 'JlGJLBMQTHczLilu2u2pSR0lxAs'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'frozen-fruits',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  } as any
});

export const upload = multer({ storage: storage });