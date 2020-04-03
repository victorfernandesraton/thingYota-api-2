const
  jwt = require('jsonwebtoken'),
  Device = require('../model/device.schema')

/**
 * @description Função que valida o token de um arduino via socketio
 * @param {JSON} data
 * @param {WebSocketEventMap} socket
 * @param {WebSocket} io
 */
const authUserToken = (data , socket, io) => {
  const {authorization} = data;
  jwt.verify(authorization, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
    if(err)  {
      socket.emit("responseError", {
        res: false,
        error: {message: "token is not valid"}
      })
      return false
    }
  })

  const payload = jwt.decode(authorization)
  // priovate roon
  const private = socket.join(authorization)

  socket.emit("responseOk", {
    res: true,
    data: {authorization, payload}
  })
  return true;
}

/**
 * @description Autenticação de arduino no socket
 * @param {WebSocket} socket
 * @param {Object} data
 */
const authArduino = async (socket, data) => {
  try {
    const device = await Device.findOne(data)
    if (!device) {
      socket.emit("responseError" ,{
        res: false,
        error: {message: "device not found"}
      })
      return false
    } else {
      const token = await jwt.sign({
        name: device.name,
        mac_addres: device.mac_addres,
        id: device._id,
        entity: "Device"
      }, process.env.ACESS_TOKEN_SECRET)
      const private = socket.join(token)
      private.emit("responseToken", {
        data :{
          ...device,
          token
        }
      })
    }
  } catch(error) {
    console.log(error)
    socket.emit("responseError" ,{
      res: false,
      error: {message: "error as occures", data: error}
    })
    return false
  }
}

module.exports = {
  authUserToken,
  authArduino
}
