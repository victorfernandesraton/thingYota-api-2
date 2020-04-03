const
  jwt = require('jsonwebtoken')
const {
  authUserToken,
  authArduino
} = require('./auth.socket')

/**
 * @description Handler for socket 'on connected
 * @param {function} socket
 */
const onConnectUser = (socket, io) => {
  // implementação de coneão genérica
  console.log("new connection")

  // autenticação
  socket.on('arduinoAuth', (data) => {
    authUser(data, socket, io)
  })
}
/**
 * @description Handler for socket 'on connected
 * @param {function} socket
 */
const onConnectArduino = (socket, io) => {
  // implementação de coneão genérica
  console.log("new connection")
  // calback intened
  socket.on('arduinoAuth', async (data) => {
    // gera o token do socket para arduino
    // await authUser(data)
    authUserToken(data, socket, io)
  })
}

module.exports = {
  onConnectArduino,
  onConnectUser
}
