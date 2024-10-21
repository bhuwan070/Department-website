const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

const multer = require('multer');
const { adminAuth } = require('../middlewares/authAdmin');

//can handle both image and pdf upload
const storage = multer.diskStorage({
  destination: 'uploads/notice',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  '/',
  adminAuth,
  upload.single('file'),
  noticeController.handleNewNotice
);
router.get('/', noticeController.getAllNotice);
router.get('/recent', noticeController.getRecentNotice);
router.get('/:id', noticeController.getSingleNotice);

router.delete('/:id', adminAuth, noticeController.deleteNotice);

module.exports = router;
