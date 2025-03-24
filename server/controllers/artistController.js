const db = require('../db');

const getArtists = (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
};

module.exports = { getArtists };
