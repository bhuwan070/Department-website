const { db } = require('../connection/db');
const Notice = require('../model/Notice');
const fs = require('fs');
// const handleNewNotice = async (req, res) => {
//   const title = req.body.title;
//   const content = req.body.content;
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
//     const q = 'insert into notice(`title`,`image`,`content`) value(?,?,?)';

//     db.query(q, [req.body.title, imageUrl, req.body.content], (err, result) => {
//       if (err)
//         return res
//           .status(500)
//           .json({ status: 'error', message: `Server Error: ${err}` });
//       return res.status(200).json({
//         status: 'success',
//         message: 'Notice published successfully',
//         data: result,
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: `Server Error ${error}` });
//   }
// };

const handleNewNotice = async (req, res) => {
  const title = req.body.title;
  const file = req.file;
  let fileUrl;
  if (!title) {
    await fs.promises.unlink(req.file.path);
    return res
      .status(500)
      .json({ status: 'error', message: 'Notice title is required!!!' });
  }

  if (file) {
    fileUrl = file.destination + '/' + file.filename;
  }
  db.query('select * from notice', async (noticeError, noticeResult) => {
    if (noticeError) {
      if (req.file) {
        await fs.promises.unlink(req.file.path);
      }
      return res.status(500).json({ status: 'error', message: error.message });
    }
    const sql = 'insert into notice (title,file) values (?,?)';
    db.query(sql, [title, fileUrl], (error, result) => {
      if (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ status: 'error', message: error.message });
      }
      return res.status(200).json({
        status: 'success',
        data: { id: result.insertId, title: title, file: fileUrl },
      });
    });
  });
};

const getAllNotice = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  let q = `select * from notice order by created_at DESC`;
  db.query(q, (error, r) => {
    const offset = (page - 1) * limit;
    q2 = `select * from notice order by created_at desc limit ${limit} offset ${offset}`;
    db.query(q2, (error, results) => {
      res.status(200).json({
        data: results,
        total_data: r.length,
        total_pages: Math.ceil(r.length / limit),
      });
    });
  });
};

const getSingleNotice = async (req, res) => {
  const values = req.params;

  let sql = 'select * from notice where id=?';
  db.query(sql, [values.id], (error, results) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    console.log(results);
    return res.status(200).json({ status: 'success', data: results });
  });
};

const getRecentNotice = async (req, res) => {
  let sql = 'select * from notice order by created_at desc limit 5 ';
  db.query(sql, (error, results) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    // console.log(results);
    return res.status(200).json({ status: 'success', data: results });
  });
};

const deleteNotice = async (req, res) => {
  const values = req.params;
  let sql = 'delete from notice where id=?';
  db.query(sql, [values.id], (error, results) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    return res.status(200).json({
      status: 'success',
      message: 'Notice deleted successfully',
      data: results,
    });
  });
};

module.exports = {
  handleNewNotice,
  getAllNotice,
  getSingleNotice,
  getRecentNotice,
  deleteNotice,
};
