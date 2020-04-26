const server = require('./config/server');
const socketIo = require('socket.io');
const router = require('./routes');
const logger = require('morgan')

const {
  onConnectArduino,
  onConnectUser
} = require('./socket/onConnect')

const io = socketIo.listen(server.server);

const notification = io.of('/notification');
const arduinoSocket = io.of('/arduino');
const userSocket = io.of('/user');

// setando handler para socket
arduinoSocket.on('connection', socket => onConnectArduino(socket, io))
userSocket.on('connection', socket => onConnectUser(socket, io))

// socket
server.use((req, res, next) => {
  // socket
  req.io = {
    arduinoSocket,
    userSocket,
    notification
  }
  return next();
});

server.use(logger('dev'))

// routers
router.applyRoutes(server)

server.get("/helth", (req, res, next) => {
  return res.send(200, { data: "OK" })
});

server.on('error', (error) => {
  console.info(error)
})

server.on('listening', data => {
  console.info(`Server is run in ${server.address().address}${server.address().port}`);
})
module.exports = server;
