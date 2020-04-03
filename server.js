const
  path = require('path')

require('dotenv').config({
  path: process.env.NODE_ENV == "production" ? path.resolve('.env'): path.resolve('.env.development')
});

const
  server = require('./config/server'),
  mongodb = require('./database/mongodb'),
  socketIo = require('socket.io')

const {
  onConnectArduino,
  onConnectUser
} = require('./socket/onConnect.socket')

mongodb
  .then(data => console.log('momgobd has coonected'))
  .catch(error => console.log("eeror on first connection", error))

// Rotas
require('./routes/bucket.route').applyRoutes(server, '/bucket');
require('./routes/user.route').applyRoutes(server, '/user');
require('./routes/sensor.route').applyRoutes(server, '/sensor');
require('./routes/device.route').applyRoutes(server, '/device');
require('./routes/auth.route').applyRoutes(server, '/auth');
require('./routes/register.route').applyRoutes(server, '/register');
require('./routes/singup.route').applyRoutes(server,'/singup');

const
  io = socketIo.listen(server.server);

const
  arduinoSocket = io.of('/arduino'),
  notificaationSocket = io.of('/notification');

// setando handler para socket
arduinoSocket.on('connect', socket => onConnectArduino(socket, io))
notificaationSocket.on('connection', socket => onConnectUser(socket, io))

// socket
server.use((req, res, next) => {
  // socket
  req.io= {
    arduinoSocket,
    notificaationSocket
  }
  return next();
});

server.get("/", (req,res, next) => {
  return res.send(200, {data: {server}})
});

server.listen(process.env.PORT || 8000 , () => {
  console.info(`Server runs in localhost:${server.address().port}`);
  console.info("Press CTRL+C to kill then")
})
