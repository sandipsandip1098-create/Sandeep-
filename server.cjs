const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Health check endpoint for container probes
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist directory
app.use(express.static(DIST_DIR));

// SPA catch-all route to index.html
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application build in progress or not found.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
