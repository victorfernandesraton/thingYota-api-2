const {
  authArduino,
  authArduinoToken
} = require('./auth.socket')

/**
 * @description Handler for socket on connected
 * @param {function} socket
 */
const onConnectArduino = socket => {
  // implementação de coneão genérica
  console.log("new connection")

  // calback intened
  socket.on('arduinoAuth', (data) => {
    authArduino(data, socket)
  })
}

module.exports = {
  onConnectArduino
}
