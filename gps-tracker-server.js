// gps-tracker-server.js (for TCP-based GPS tracker)
const net = require('net'); // Use net module for raw TCP

const PORT = process.env.PORT || 8080; // Railway port or fallback

// Create a raw TCP server
const server = net.createServer(socket => {
  const clientIP = socket.remoteAddress;
  console.log(`📡 New tracker connected: ${clientIP}`);

  socket.on('data', data => {
    const rawData = data.toString();
    console.log(`📨 Data from ${clientIP}: ${rawData}`);

    // Send back an "OK" response if needed
    socket.write('OK\n');
  });

  socket.on('error', err => {
    console.error(`❌ Error from ${clientIP}:`, err.message);
  });

  socket.on('end', () => {
    console.log(`🔌 Connection closed: ${clientIP}`);
  });
});

server.listen(PORT, () => {
  console.log(`✅ TCP GPS Tracker Server is running on port ${PORT}`);
});
