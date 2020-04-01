const
  User = require('../model/user.schema'),
  Device = require('../model/device.schema'),
  md5 = require('md5'),
  jwt = require('jsonwebtoken')

const authUser = async (req, res, send) => {
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }
  let {username, email, password} = req.body
  if ((!username && !email) || !password) {
    const data= ['username', 'password', 'email'].filter(key => !req.body.hasOwnProperty(key))
    return res.send(200, {
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  password = await md5(password.toString())
  let query = {
    username,
    password,
    email
  }

  if (email) {
    delete query['username']
  } else if (username) {
    delete query['email']
  }

  const user = await User.findOne(query);
  if (!user  || user.length == 0) {
    return res.send(404, {
      res: false,
      error: {message: "user not found", user}
    })
  }
  const token = await jwt.sign({
    username: user.username,
    password: user.password,
    id: user._id,
    entity: "User"
  }, process.env.ACESS_TOKEN_SECRET);
  return res.send(200, {
    res: true,
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
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }
  let {mac_addres} = req.body
  if (!mac_addres) {
    const data= ['mac_addres'].filter(key => !req.body.hasOwnProperty(key))
    return res.send(404, {
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  let query = {
    mac_addres
  }


  const device = await Device.findOne(query);
  if (!device  || device.length == 0) {
    return res.send(404, {
      res: false,
      error: {message: "user not found", user}
    })
  }
  const token = await jwt.sign({
    name: device.name,
    mac_addres: device.mac_addres,
    id: device._id,
    entity: "Device"
  }, process.env.ACESS_TOKEN_SECRET);
  return res.send(200, {
    res: true,
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
  }, process.env.ACESS_TOKEN_SECRET_GUEST);
  return res.send(200, {
    res: true,
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
  if (!token || token == null) return res.send(403, {
    res: false,
    error: {message: "token not found"}
  })
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET_GUEST, (err, decoded) => {
    if(err) return res.send(403, {
      res: false,
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
const authUserToken = (req,res,send) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token || token == null) return res.send(403, {
    res: false,
    error: {message: "token not found"}
  })
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.send(403, {
      res: false,
      error: {message: "token is not valid"}
    })
    req.token = token
    send()
  })
}


module.exports = {
  authUser,
  authDevice,
  authUserToken,
  authGuest,
  authGuestToken
}
