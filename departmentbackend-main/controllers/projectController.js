const { db } = require('../connection/db');
const fs = require('fs');

exports.handleNewProject = async (req, res) => {
  const { title, category } = req.body;
  const file = req.file;
  if (!title || !['minor', 'major'].includes(category) || !file) {
    if (req.file) {
      await fs.promises.unlink(req.file.path);
    }
    return res.status(400).json({
      status: 'error',
      message: 'Please provide all required fields!!!',
    });
  }
  let fileUrl;
  if (file) {
    fileUrl = file.destination + '/' + file.filename;
  }
  const sql = 'insert into project (title,file,category) values (?,?,?)';

  db.query(sql, [title, fileUrl, category], (error, result) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    res.status(200).json({
      status: 'success',
      data: { id: result.insertId, title, category, file: fileUrl },
    });
  });
};
exports.getAllProjects = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  let q = `select * from project order by created_at DESC`;
  db.query(q, (error, r) => {
    const offset = (page - 1) * limit;
    q2 = `select * from project order by created_at desc limit ${limit} offset ${offset}`;
    db.query(q2, (error, results) => {
      res.status(200).json({
        data: results,
        total_data: r.length,
        total_pages: Math.ceil(r.length / limit),
      });
    });
  });
};
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;
  const sql = 'SELECT * FROM project WHERE id = ?';

  db.query(sql, [projectId], (error, results) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Project not found' });
    }
    return res.status(200).json({ status: 'success', data: results[0] });
  });
};
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const sql = 'DELETE FROM project WHERE id = ?';

  db.query(sql, [projectId], (error, results) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Project not found' });
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Project deleted successfully' });
  });
};
exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  console.log(req.params.id);
  const { title, category } = req.body;
  const file = req.file;

  let sql, params;

  if (file) {
    const fileUrl = file.destination + '/' + file.filename;
    sql = 'UPDATE project SET title = ?, file = ?, category = ? WHERE id = ?';
    params = [title, fileUrl, category, projectId];
  } else {
    sql = 'UPDATE project SET title = ?, category = ? WHERE id = ?';
    params = [title, category, projectId];
  }

  db.query(sql, params, (error, results) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Project not found' });
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Project updated successfully' });
  });
};

// exports.searchProjects = async (req, res) => {
//   const values = req.query;
//   const { page, limit } = values;
//   const offset = (page - 1) * limit;
//   console.log(page, limit, offset);
//   let q = `select * from project order by created_at DESC`;
//   db.query(q, (error, r) => {
//     let sql = `select * from project where title like ? and category like ? order by created_at desc limit ${limit} offset ${offset}`;
//     db.query(
//       sql,
//       [`%${values.title}%`, `%${values.category}%`],
//       (error, results) => {
//         if (error) {
//           return res
//             .status(500)
//             .json({ status: 'error', message: error.message });
//         }
//         // console.log(results);
//         return res.status(200).json({
//           status: 'success',
//           data: results,
//           total_data: r.length,
//           total_pages: Math.ceil(r.length / limit),
//         });
//       }
//     );
//   });
// };

exports.searchProjects = async (req, res) => {
  const values = req.query;
  let { page, limit, title, category } = values;

  // Validate and set default values if needed
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  title = title || '';
  category = category || '';

  const offset = (page - 1) * limit;
  console.log(page, limit, offset);

  // Query to get the total number of records
  const countQuery = `SELECT COUNT(*) AS total FROM project WHERE title LIKE ? AND category LIKE ?`;

  db.query(
    countQuery,
    [`%${values.title}%`, `%${values.category}%`],
    (error, countResult) => {
      if (error) {
        return res
          .status(500)
          .json({ status: 'error', message: error.message });
      }

      const totalRecords = countResult[0].total;
      const totalPages = Math.ceil(totalRecords / limit);

      // Main query to fetch the data
      const dataQuery = `SELECT * FROM project WHERE title LIKE ? AND category LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;

      db.query(
        dataQuery,
        [`%${values.title}%`, `%${values.category}%`, limit, offset],
        (error, results) => {
          if (error) {
            return res
              .status(500)
              .json({ status: 'error', message: error.message });
          }

          return res.status(200).json({
            status: 'success',
            data: results,
            total_data: totalRecords,
            total_pages: totalPages,
          });
        }
      );
    }
  );
};
