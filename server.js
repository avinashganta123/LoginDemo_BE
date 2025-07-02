const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
