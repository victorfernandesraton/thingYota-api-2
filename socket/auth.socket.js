const
  jwt = require('jsonwebtoken'),
  Device = require('../model/device.schema')

/**
 * @description Função que valida o token de um arduino via socketio
 * @param {Rwquest} req
 * @param {Response} res
 * @param {Send'} send
 */
const authUserToken = (data , socket) => {
  const authHeader = data.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token || token == null) socket.emit("responseError", {
    res: false,
    error: {message: "token not found"}
  })
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET_USER, (err, decoded) => {
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

/**
 * @description handler in socketio
 * @param {[mac_addres: String]} payload
 * @param {function} socket
 * @requires payload.mac_addres
 * @requires socket
 */
const authDevice = async (payload, socket) => {
  console.log(payload)
  let {mac_addres} = payload
  if (!mac_addres) {
    const data= ['mac_addres'].filter(key => !req.body.hasOwnProperty(key))
    socket.emit('responseError', {
      res: false,
      error: {
        message: "paramter not fond",
        data
      }
    })
  }
  let query = {
    mac_addres
  }
  const device = await Device.findOne(query);
  if (!device  || device.length == 0) {
    socket.emit('responseError', {
      res: false,
      error: {
        message: "device not found",
        data: query
      }
    })
  }
  const token = await jwt.sign({
    name: device.name,
    mac_addres: device.mac_addres,
    id: device._id
  }, process.env.ACESS_TOKEN_SECRET_ARDUINO);
  socket.emit('responseToken', {
    res: true,
    data: {token}
  })
}

module.exports = {
  authDevice,
  authUserToken
}
