// Establecer las variables de entorno 
require('dotenv').config();

var cron = require('node-cron');

const Server = require('./models/server');

const server = new Server();

server.listen();
