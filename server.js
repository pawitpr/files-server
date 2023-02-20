const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    if (message instanceof Buffer) {
      console.log('Received file');

      fs.writeFile('files.bin', message, (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File saved');
        }
      });
    }
  });
});

const http = require('http');

const server = http.createServer( (req,res ) => {
   // ..
   if (req.url !== '/') {
    return res.end();
   }

   console.log("Request is comming !");
   const readSteam = fs.createReadStream('files.bin');
   readSteam.pipe(res);
});
const dotenv = require('dotenv').config();

const PORT =  3000
server.listen(PORT, () => {
  console.log('Port is ' + PORT);
  
})
console.log('received file name : ' + 'files.bin') 

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
