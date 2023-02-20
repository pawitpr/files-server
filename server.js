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

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('Port is ' + PORT);
  
})
console.log('received file name : ' + 'files.bin') 