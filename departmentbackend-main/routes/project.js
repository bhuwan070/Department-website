const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');
const { adminAuth } = require('../middlewares/authAdmin');

//can handle both image and pdf upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'file') {
      cb(null, 'uploads/project');
    } else {
      cb(new Error('Invalid fieldname'));
    }
  },
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDFs are allowed'));
    }
    cb(null, true);
  },
});

router.get('/', projectController.getAllProjects);
router.post(
  '/',
  adminAuth,
  upload.single('file'),
  projectController.handleNewProject
);
router.get('/search', projectController.searchProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', adminAuth, projectController.deleteProject);
router.put(
  '/:id',
  adminAuth,
  upload.single('file'),
  projectController.updateProject
);

module.exports = router;
