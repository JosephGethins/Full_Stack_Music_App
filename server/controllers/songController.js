const db = require('../db');

const getSongs = (req, res) => {
  db.query('SELECT * FROM songs', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
};

module.exports = { getSongs };