const serverConfig = require('./config/serverConfig')

const http = require('http');

const app = require('./app');

const port = process.env.PORT || serverConfig.port;

const server = http.createServer(app);
server.listen(port);