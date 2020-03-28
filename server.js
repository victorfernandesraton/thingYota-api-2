const path = require('path');

require('dotenv').config({
  path: process.env.NODE_ENV == "development" ? path.resolve('.env.development'): path.resolve('.env')
});

const
  server = require('./config/server'),
  mongodb = require('./database/mongodb'),
  io = require('socket.io')(server)

mongodb
  .then(data => console.log('momgobd has coonected'))
  .catch(error => console.log("eeror on first connection"))

// Rotas
require('./routes/bucket.route').applyRoutes(server, '/bucket')
require('./routes/user.route').applyRoutes(server, '/user')
require('./routes/sensor.route').applyRoutes(server, '/sensor')
require('./routes/device.route').applyRoutes(server, '/device')
require('./routes/auth.route').applyRoutes(server, '/auth')

// socket
let connectedUsers = {};

io.on('connection', socket => {
  // implementação de coneão genérica
  const {user_id} =socket.handshake.query;
  connectedUsers[user_id] =socket.id
})

// // setando handler para socket
server.use((req, res, next) => {
  // socket
  req.io= io;
  // usuários conectados
  req.connectedUsers = connectedUsers;
  return next();
})

server.get("/", (req,res, next) => {
  return res.send(200, {data: server})
})

server.listen(process.env.PORT || 8000 , () => {
  console.info(`Server runs in localhost:${server.address().port}`);
  console.info("Press CTRL+C to kill then")
})
