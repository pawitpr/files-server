echo "Installing pm2"
npm install
sudo npm install -g pm2
pm2 start server.js
pm2 start download.js
pm2 log download.js
