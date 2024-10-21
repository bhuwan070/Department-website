const routineController = require('../controllers/routineController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { adminAuth } = require('../middlewares/authAdmin');

//storage
const storage = multer.diskStorage({
  destination: 'uploads/routine',
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
  upload.array('image'),
  routineController.createRoutine
);
router.get('/', routineController.getRoutine);
router.delete('/', adminAuth, routineController.deleteRoutine);

module.exports = router;
