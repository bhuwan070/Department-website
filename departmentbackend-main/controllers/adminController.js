// const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../connection/db');

const adminLogin = async (req, res) => {
  console.log(req.body);
  const q = 'select * from `admin` where `username`=?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0)
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });

    const checkPassword = bcrypt.compare(req.body.password, data[0].password);
    if (!checkPassword)
      return res
        .status(400)
        .json({ status: 'error', message: 'Password not matched!' });

    //Generating token
    const token = jwt.sign({ id: data[0].id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });

    const updateQuery = 'update `admin` set `token`=? where `id`=?';
    db.query(updateQuery, [token, data[0].id], (updateErr, updateResult) => {
      if (updateErr) return res.status(500).json(updateErr);
      const { password, ...others } = data[0];
      console.log(data);
      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1000,
        })
        .status(200)
        .json({ status: 'success', data: others });
    });
  });
};

const adminLogout = async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie('token');

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

const getAdmin = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return req
      .status(200)
      .json({ status: 'success', message: 'Admin route hit' });
  } else {
    return req
      .status(400)
      .json({ status: 'success', message: 'Not authenticated' });
  }
};

const isAdmin = async (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Invalid Token' });
  }
  return res.status(200).json({
    status: 'success',
  });
};

module.exports = { adminLogin, adminLogout, isAdmin, getAdmin };
