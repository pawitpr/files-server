const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const fs = require('fs');

const PORT = 8000;
const HOST = '127.0.0.1';

server.on('listening', function () {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('message', function (message, remote) {
  console.log(`Received ${message.length} bytes from ${remote.address}:${remote.port}`);
  const fileName = 'files.bin'; // the name of the file to be sent
  const file = fs.readFileSync(fileName); // read the contents of the file
  server.send(file, 0, file.length, remote.port, remote.address, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`File sent to ${remote.address}:${remote.port}`);
    }
  });
});

server.bind(PORT, HOST);
