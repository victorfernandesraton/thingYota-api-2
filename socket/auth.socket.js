const
  jwt = require('jsonwebtoken')
/**
 * @description Função que valida o token de um arduino via socketio
 * @param {Rwquest} req
 * @param {Response} res
 * @param {Send'} send
 */
const authUser = (data , socket) => {
  const authHeader = data.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token || token == null) socket.emit("responseError", {
    res: false,
    error: {message: "token not found"}
  })
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
    if(err) socket.emit("responseError", {
      res: false,
      error: {message: "token is not valid"}
    })

    socket.emit("responseOk", {
      res: true,
      data: {token}
    })
  })
}

module.exports = {
  authUser
}
