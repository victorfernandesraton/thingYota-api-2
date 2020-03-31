const path = require('path');

require('dotenv').config({
  path: process.env.NODE_ENV == "development" ? path.resolve('.env.development'): path.resolve('.env')
});

const
  server = require('./config/server'),
  mongodb = require('./database/mongodb'),
  socketIo = require('socket.io')

const
  {onConnectArduino} = require('./socket/handlers.socket')

mongodb
  .then(data => console.log('momgobd has coonected'))
  .catch(error => console.log("eeror on first connection"))

// Rotas
require('./routes/bucket.route').applyRoutes(server, '/bucket')
require('./routes/user.route').applyRoutes(server, '/user')
require('./routes/sensor.route').applyRoutes(server, '/sensor')
require('./routes/device.route').applyRoutes(server, '/device')
require('./routes/auth.route').applyRoutes(server, '/auth')
require('./routes/register.route').applyRoutes(server, '/register')

const io = socketIo.listen(server.server)

const arduinoSocket = io.of('/arduino');
const notificaationSocket = io.of('/notification');

// setando handler para socket
arduinoSocket.on('connection', onConnectArduino)

// socket
server.use((req, res, next) => {
  // socket
  req.io= {
    arduinoSocket,
    notificaationSocket
  }
  return next();
})

server.get("/", (req,res, next) => {
  return res.send(200, {data: server.toString()})
})

server.listen(process.env.PORT || 8000 , () => {
  console.info(`Server runs in localhost:${server.address().port}`);
  console.info("Press CTRL+C to kill then")
})
