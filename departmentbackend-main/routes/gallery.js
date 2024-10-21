const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/galleryController');

//storage
const storage = multer.diskStorage({
  destination: 'uploads/gallery',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', upload.array('files'), galleryController.addNewGallery);
router.post(
  '/:galleryId/images',
  upload.array('files'),
  galleryController.addImagesToGallery
);
router.get('/', galleryController.getAllGallery);
router.get('/info', galleryController.getGalleryWithImageID);
router.get('/:id', galleryController.getGalleryById);
router.put('/:id', upload.array('files'), galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);
router.delete(
  '/:galleryId/images/:imageId',
  galleryController.deleteGalleryImage
);
module.exports = router;
