const { db } = require('../connection/db');
const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');

require('dotenv').config();

// Connect to the database
db.connect((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

const createNewAdmin = async ({ username, password }) => {
  const q = 'select * from `admin` where username=?';

  db.query(q, [username], (err, data) => {
    if (err) return console.log(err);
    if (data.length) return console.log('User already exists');

    const salt = bcrypt.genSaltSync(10);
    console.log('Salt: ' + salt);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = 'insert into admin(`username`,`password`) value (?) ';

    const values = [username, hashedPassword];

    db.query(q, [values], (err, data) => {
      if (err) return console.log(err);
      return console.log('user has been created');
    });
  });
};

createNewAdmin({
  username: 'admin',
  password: 'oneforall',
});
