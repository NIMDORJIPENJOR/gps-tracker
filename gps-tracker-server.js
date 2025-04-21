const net = require('net');
const http = require('http');

// Replace this with your actual Google Apps Script deployment ID
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbRSvuTos__HlwAUb_Ys8qv1ZRUghVc1L-i6K54e33UZcl95nnGhwi0l_OHkNdCFoFLQ/exec';

const server = net.createServer((socket) => {
  console.log('New connection from:', socket.remoteAddress);

  socket.on('data', (data) => {
    const raw = data.toString();
    console.log('Raw Data:', raw);

    // ⚠️ You must adapt this parsing based on the actual message from your tracker
    const example = {
      imei: '888880100103585',
      lat: '27.7172',
      lng: '85.3240',
      speed: '30',
      battery: '85'
    };

    // Send data to your Apps Script web app (Google Sheet)
    const url = `${GOOGLE_SCRIPT_URL}?imei=${example.imei}&lat=${example.lat}&lng=${example.lng}&speed=${example.speed}&battery=${example.battery}`;
    
    http.get(url, res => {
      console.log('Forwarded to Google Sheet, status:', res.statusCode);
    });
  });

  socket.on('error', (err) => {
    console.error('Connection error:', err.message);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
