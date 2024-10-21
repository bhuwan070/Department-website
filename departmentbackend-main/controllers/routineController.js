const { db } = require('../connection/db');

// const createRoutine = (req, res) => {
//   // const title = req.body.title;
//   const year = req.body.year;
//   const faculty = req.body.faculty;
//   const image = req.file;

//   let imageUrl;
//   if (image) {
//     imageUrl = image.destination + '/' + image.filename;
//   }

//   if (image && image.mimetype == 'application/pdf') {
//     console.log('pdf upload');
//     res.setHeader('Content-Type', 'application/pdf'); // Set content type to PDF
//     res.setHeader(
//       'Content-Disposition',
//       `inline; filename="${image.filename}"`
//     ); // Display PDF inline in browser
//   }

//   if (!title) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'Title is a required field',
//     });
//   }
//   try {
//     const q1 = 'select * from routine where title=?';
//     db.query(q1, [req.body.title], (error, result) => {
//       if (error) return res.status(500).json(error);
//       if (result.length !== 0)
//         return res
//           .status(400)
//           .json({ status: 'error', message: 'Routine Already exists' });
//       const q = 'insert into routine(`title`,`image`) value(?,?)';
//       db.query(q, [req.body.title, imageUrl], (err, result) => {
//         if (err)
//           return res
//             .status(500)
//             .json({ status: 'error', message: `Server Error: ${err}` });
//         return res.status(200).json({
//           status: 'success',
//           message: 'Routine uploaded successfully',
//           data: result,
//         });
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: 'error', message: `Server Error ${error}` });
//   }
// };

const createRoutine = async (req, res) => {
  const year = req.body.year;
  const faculty = req.body.faculty;
  const images = [];
  const fileUrls = req.files.map((file) => {
    const url = file.destination + '/' + file.filename;
    images.push(url);

    return {
      originalName: file.originalname,
      url: url,
    };
  });
  const imagesJSON = JSON.stringify(images);
  try {
    const q = 'insert into routine(`year`,`faculty`,`images`) value(?,?,?)';

    db.query(q, [year, faculty, imagesJSON], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ status: 'error', message: `Server Error: ${err}` });
      return res.status(200).json({
        status: 'success',
        message: 'Routine published successfully',
        data: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

const getRoutine = (req, res) => {
  console.log(req.query);
  let q = `select * from routine where year=? and faculty=?`;
  db.query(q, [req.query.year, req.query.faculty], (error, results) => {
    if (error)
      return res.status(500).json({ status: 'error', message: 'Server Error' });
    if (results.length === 0)
      return res
        .status(404)
        .json({ status: 'error', message: 'Routine Not Found!!!' });
    return res.status(200).json({
      status: 'success',
      data: results,
    });
  });
};

const deleteRoutine = (req, res) => {
  const { year, faculty } = req.query;

  if (!year || !faculty) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Year and faculty are required' });
  }

  const sql = 'DELETE FROM routine WHERE year = ? AND faculty = ?';

  db.query(sql, [year, faculty], (error, result) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Routine not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Routine deleted successfully',
    });
  });
};

module.exports = { createRoutine, getRoutine, deleteRoutine };
