const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();


const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true
});

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log('Server is running on port 3001!');
});

app.post('/create', (req, res) => {
  console.log(req.body);
  const { name, age, gender } = req.body;

  db.query(
    'INSERT INTO employees (name, age, gender) VALUES (?,?,?)',
    [ name, age, gender ], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/employees', (req, res) => {
  db.query(
    'SELECT * FROM employees', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})


