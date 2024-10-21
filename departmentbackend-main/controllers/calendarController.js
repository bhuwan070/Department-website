const { db } = require('../connection/db');
const fs = require('fs');

exports.createCalendar = (req, res) => {
  const file = req.file;
  let fileUrl;
  if (file) {
    fileUrl = file.destination + '/' + file.filename;
  }
  db.query('select * from calendar', async (calendarError, calendarResult) => {
    if (calendarError) {
      if (req.file) {
        await fs.promises.unlink(req.file.path);
      }
      return res.status(500).json({ status: 'error', message: error.message });
    }
    if (calendarResult.length == 0) {
      const sql = 'insert into calendar (file) values (?)';
      db.query(sql, [fileUrl], (error, result) => {
        if (error)
          return res
            .status(500)
            .json({ status: 'error', message: error.message });
        return res.status(200).json({
          status: 'success',
          data: { id: result.insertId, file: fileUrl },
        });
      });
    } else {
      if (req.file) {
        await fs.promises.unlink(req.file.path);
      }
      return res.status(400).json({
        status: 'error',
        message:
          'You have to delete the existing academic calendar to post new academic calendar.',
      });
    }
  });
};

exports.getCalendar = (req, res) => {
  db.query('select * from calendar', (error, result) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    return res.status(200).json({ status: 'success', data: result });
  });
};

exports.deleteCalendar = (req, res) => {
  const id = req.params.id;
  db.query('delete from calendar where id=?', [id], (error, result) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    if (result.affectedRows === 0)
      return res.status(400).json({
        status: 'error',
        message: `Calendar with id ${id} does not exist`,
      });
    return res.status(200).json({
      status: 'success',
      message: 'Calendar was deleted successfully!!!',
    });
  });
};
