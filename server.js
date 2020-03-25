const path = require('path');

require('dotenv').config({
  path: process.env.NODE_ENV == "development" ? path.resolve('.env.development'): path.resolve('.env')
});

const server = require('./config/server')
const router = require('./routes');
const mongodb = require('./database/mongodb');
const io = require('socket.io')(server);

mongodb
  .then(data => console.log('momgobd has coonected'))
  .catch(error => console.log("eeror on first connection"))

// Rotas
router.applyRoutes(server, '')

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

server.listen(process.env.PORT || 8000 , () => {
  console.info(`Server runs in localhost:${server.address().port}`);
  console.info("Press CTRL+C to kill then")
})
