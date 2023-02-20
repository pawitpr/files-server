echo "Installing pm2"
npm install
npm install pm2
pm2 start server.js
pm2 start download.js
