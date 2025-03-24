const getAlbums = (req, res) => {
  db.query('SELECT * FROM albums', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
};

module.exports = { getAlbums };