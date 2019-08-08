const config = require('config');

const http = require('http');

const app = require('./app');

const port = process.env.PORT || config.get('app.webServer.port');

const server = http.createServer(app);

server.listen(port);
