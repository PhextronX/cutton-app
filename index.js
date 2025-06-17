const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files in 'public' directory (รวมถึง css/, javascript/, รูปภาพ ฯลฯ)
app.use(express.static(path.join(__dirname, 'public')));

// เสิร์ฟ index.html เมื่อเข้าหน้าแรก
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
