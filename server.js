const express = require('express');
const path = require('path');

const app = express();

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root '/' to index.html in public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
