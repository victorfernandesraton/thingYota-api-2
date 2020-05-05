const env = require('./config/env');
const server = require('./config/server');
const socketIo = require('socket.io');
const router = require('./routes');
const logger = require('morgan');
const mqtt = require('mqtt');

const {
  onConnectArduino,
  onConnectUser
} = require('./socket/onConnect')

const io = socketIo.listen(server.server);
const arduino = socketIo.listen(server.server, {
  path: "/arduino",
})
io.set('log level', 1);

const notification = io.of('/notification');
const arduinoSocket = io.of('/arduino');
const userSocket = io.of('/user');
const bucketSocket = io.of("/bucket");

// setando handler para socket
arduinoSocket.on('connection', socket => onConnectArduino(socket, io))
userSocket.on('connection', socket => onConnectUser(socket, io))

io.on("authArduino", data => {
  console.log(data)
})
// mqtt
const clientMqtt = mqtt.connect(`http://${env.mqtt.host}:${env.mqtt.port}`);
clientMqtt.on('connect', data => {
  console.info(`connected sucessful in mqtt broker at ${env.mqtt.host}::${env.mqtt.port}`)
})
// socket
server.use((req, res, next) => {
  // socket
  let io = {
    arduinoSocket,
    userSocket,
    notification,
    bucketSocket,
    arduino,
    io
  }
  let mqtt = {
    client: clientMqtt
  }
  req.io = io
  req.mqtt = mqtt
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
