const User = require('../model/user.schema');
const Device = require('../model/device.schema');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const {validaionBodyEmpty} = require('../utils/common');
const errors = require('restify-errors');

const authUser = async (req, res, send) => {
  if (req.body == null || req.body == undefined) return res.send(new errors.InvalidArgumentError("body is empty"))

  const bodyNotFound = validaionBodyEmpty(req.body, ['username', 'password']);

  if(bodyNotFound.length > 0) return res.send(new errors.NotFoundError(`not found params : ${bodyNotFound.join(',')}`))

  let {username, email, password} = req.body

  let query = {
    password: md5(password),
    email: username
  }

  const user = await User.findOne(query);

  if (!user  || user.length == 0) return res.send(new errors.NotFoundError("User not found"))


  const token = await jwt.sign({
    username: user.username,
    password: user.password,
    id: user._id,
    entity: "User"
  }, config.secret.user);
  return res.send(200, {
    data: {
      token,
      user
    }
  })
}

/**
 * @description Auth Device in system
 * @param {Request} req
 * @param {Response} res
 * @param {Send} send
 * @requires req.body.mac_addres
 */
const authDevice = async (req, res, send) => {
  if (req.body == null || req.body == undefined) {
    return res.send(new errors.InvalidArgumentError("body is empty"))
  }

  const bodyNotFound = validaionBodyEmpty(req.body, ['mac_addres']);

  if(bodyNotFound.length > 0) return res.send(new errors.NotFoundError(`not found params : ${bodyNotFound.join(',')}`))

  let query = {
    mac_addres
  }

  const device = await Device.findOne(query);

  if (!device  || device.length == 0) return res.send(new errors.NotFoundError("Device not found"))


  const token = await jwt.sign({
    name: device.name,
    mac_addres: device.mac_addres,
    id: device._id,
    entity: "Device"
  }, config.secret.user);
  return res.send(200, {
    data: {
      token,
      device
    }
  })
}

/**
 * @description Auth guest in system
 * @param {Request} req
 * @param {Response} res
 * @param {Send} send
 */
const authGuest = async (req, res, send) => {
  const token = await jwt.sign({
    entity: "Guest"
  }, config.secret.guest);
  return res.send(200, {
    data: {
      token
    }
  })
}

/**
 * @description Função que valida o token de huest
 * @param {Rwquest} req
 * @param {Response} res
 * @param {Send'} send
 */
const authGuestToken = async (req,res,send) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token || token == null) return res.send(new errors.InvalidHeaderError("Token not found"))

  jwt.verify(token, config.secret.guest, (err, decoded) => {
    if (err) return res.send(403, {
      error: {message: "token is not valid"}
    })
    req.token = token
    send()
  })
}

/**
 * @description Função que valida o token de um usuário
 * @param {Rwquest} req
 * @param {Response} res
 * @param {Send'} send
 */
const authUserToken = async (req,res,send) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token || token == null) return res.send(new errors.InvalidHeaderError("Token not found"))

  jwt.verify(token, config.secret.user, (err, decoded) => {
    if(err) return res.send(new errors.InvalidHeaderError("Invalid Token"))
  })

  const {entity, id} = jwt.decode(token)
    if (!entity) return res.send(new errors.InvalidArgumentError("Entity info not found "))
    let data = {};

    switch(entity) {
      case "User":
        data = await User.findById(id)
      case "Device":
        data = await Device.findById(id)
      case "Guest":
        data = {entity}
      default:
        data = {}
    }

    if (!data) return res.send(new errors.InvalidArgumentError(`Entity ${entity} id (${id}) not found`))
    req.token = token
    send()
}


module.exports = {
  authUser,
  authDevice,
  authUserToken,
  authGuest,
  authGuestToken
}
