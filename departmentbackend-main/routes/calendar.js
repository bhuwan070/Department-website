const express = require('express');
const router = express.Router();
const multer = require('multer');
const { adminAuth } = require('../middlewares/authAdmin');
const {
  createCalendar,
  getCalendar,
  deleteCalendar,
} = require('../controllers/calendarController');

const storage = multer.diskStorage({
  destination: 'uploads/calendar',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', adminAuth, upload.single('file'), createCalendar);
router.get('/', getCalendar);
router.delete('/:id', adminAuth, deleteCalendar);

module.exports = router;
