// gps-tracker-server.js

const http = require('http'); // Import Node's built-in HTTP module

// Use the port from Railway environment or default to 5000 locally
const PORT = process.env.PORT || 5000; // ✅ Required for Railway

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  console.log(`📡 New connection from: ${req.socket.remoteAddress}`);

  // Collect incoming data (if any)
  let rawData = '';
  req.on('data', chunk => {
    rawData += chunk;
  });

  // Once all data is received
  req.on('end', () => {
    console.log('📨 Raw Data:', rawData);

    // Optionally, parse or log the request headers if needed
    // console.log('🔍 Headers:', req.headers);

    // Respond with a success message
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  });

  // Handle errors gracefully
  req.on('error', err => {
    console.error('❌ Request error:', err);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ GPS Tracker Server is running on port ${PORT}`);
});
