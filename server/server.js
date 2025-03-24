// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = 5000;

// const artistRoutes = require('./routes/artistRoutes');
// const songRoutes = require('./routes/songRoutes');
// const albumRoutes = require('./routes/albumRoutes');

// app.use(cors());
// app.use(express.json());

// app.use('/artists', artistRoutes);
// app.use('/songs', songRoutes);
// app.use('/albums', albumRoutes);

// const db = mysql.createConnection({
//   host: 'webcourse.cs.nuim.ie', // your host
//   user: 'u240213', // your username
//   password: 'ooJ8Eimoo9ainahX', // your password
//   database: 'cs230_u240213', // your database name
//   port: 3306, // MySQL default port
// });


// db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//     } else {
//       console.log('Connected to MySQL');
//     }
// });
  
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const db = require('./db'); // Import the database connection

// const app = express();
// const port = 5000;

// const artistRoutes = require('./routes/artistRoutes');
// const songRoutes = require('./routes/songRoutes');
// const albumRoutes = require('./routes/albumRoutes');

// app.use(cors());
// app.use(express.json());

// app.use('/artists', artistRoutes);
// app.use('/songs', songRoutes);
// app.use('/albums', albumRoutes);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

const express = require('express');
const cors = require('cors');  // Import the cors package
const db = require('./db'); // Import the db connection

const app = express();
const port = 5000;

// Use CORS
app.use(cors());  // This allows all domains to access your API

const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');

app.use(express.json());

// Routes
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);
app.use('/albums', albumRoutes);

// Test the database connection (with a simple query)
app.get('/test-db', (req, res) => {
  db.query('SELECT 1+1 AS result', (err, results) => {
    if (err) {
      console.error('Query Error:', err);
      res.status(500).send('Database query error');
    } else {
      console.log('Query Result:', results[0].result);
      res.send(`Database test query result: ${results[0].result}`);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

