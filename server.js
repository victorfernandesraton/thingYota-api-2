const path = require('path');

require('dotenv').config({
  path:
    process.env.NODE_ENV == "production" ?
      path.resolve(__dirname,'config','prod.env') :
      path.resolve(__dirname,'config','dev.env')
});

const server = require('./config/server');
const mongodb = require('./database/mongodb');
const socketIo = require('socket.io');
const router = require('./routes/');

const {
  onConnectArduino,
  onConnectUser
} = require('./socket/onConnect.socket')


mongodb
  .then(data => console.log('momgobd has coonected', data.connection.db.databaseName))
  .catch(error => console.log("eeror on first connection", error))


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
  req.io= {
    arduinoSocket,
    userSocket,
    notification
  }
  return next();
});

router.applyRoutes(server)

server.get("/", (req,res, next) => {
  return res.send(200, {data: {server}})
});

server.listen(process.env.PORT || 8000 , () => {
  console.info(`Server runs in localhost:${server.address().port}`);
  console.info("Press CTRL+C to kill then")
})
