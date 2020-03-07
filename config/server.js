const express = require('express');
const bodyparser = require('body-parser');

// handlers de error
const error = require('../utils/error');
const server = express();

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}))

// Error do cliente
server.use(error.clientErrorHandler)
// Logs de erro
server.use(error.logErrors)
// error handler
server.use(error.errorHandler)

module.exports = server;
