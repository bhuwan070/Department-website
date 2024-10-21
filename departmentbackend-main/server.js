const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { db } = require('./connection/db');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//setting cors
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://department-nine.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

// Connect to the database
db.connect((err, connection) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

//Routes
app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

//admin authentication routes
app.use('/admin', require('./routes/admin'));

//Other admin routes
app.use('/admin/notice/', require('./routes/notice'));
app.use('/admin/routine/', require('./routes/routine'));
app.use('/api/project/', require('./routes/project'));
app.use('/api/calendar/', require('./routes/calendar'));
app.use('/api/gallery/', require('./routes/gallery'));

// setting port for server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
