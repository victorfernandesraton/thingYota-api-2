const User = require('../model/user.schema');
const md5 = require('md5');
const {validaionBodyEmpty} = require("../utils/common");
/**
 * @description Get alll users use queeryparans to filter then
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const find = async (req,res,next) => {
  const {limit} = req.query
  const offset = (req.query.offset -1) * limit || 0
  try{
    const data = await User.find()
      .limit(parseInt(limit) || 0)
      .skip(parseInt(offset) || 0)
      .exec()

    const total =await User.estimatedDocumentCount()

    if (offset >= total && total != 0) {
      return res.send(404, {
        res: false,
        error: {message: "out of range"}
      })
    }

    if (!data || data.length == 0) {
      return res.send(404, {
        res: false,
        error: {message: "empty list"}
      })
    }
    return res.send(200, {
      res: true,
      data: data,
      metadata: {limit, offset, total }
    })
  } catch(error) {
    return res.send(500, {
      res: false,
      error
    })
  }
}

/**
 * @description Create user
 * @param {{body: {fristName: String, userName: String, lastName?: String}}} req
 * @param {Response} res
 * @param {next} next
 * @requires req
 */
const create = (req,res,next) => {
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }

  const bodyNotFound = validaionBodyEmpty(req.body, ['username', 'email', 'first_name', 'password']);

  if(bodyNotFound.length < 0) {
    return res.send(422, {
      res: false,
      error: {
        message: "The parans request not found",
        data: bodyNotFound
      }
    })
  }

  const {username, first_name, last_name, password, email} = req.body;

  const user = new User({
    username,
    first_name,
    last_name,
    email,
    password: md5(password.toString()),
    create_at: Date()
  })
  user.save()
    .then(data => res.send(201, {
      res: true,
      data: data,
    })).catch(data => console.log(data))
    .catch(error => res.send(500, {
      res: false,
      error: {message: "Error create user", data: error}
    }))
}

const findOne = async (req,res,next) => {
  if (!req.params.id) {
    return res.send(422, {
      res: false,
      error: "id is required"
    })
  }
  try {
    const data = await User.findById(req.params.id);
    if (!data || data.length == 0) {
      return res.send(404, {
        res: false,
        error: {message: "User not found"}
      })
    }
    return res.send(200, {
      res: true,
      data: data,
    })
  } catch(error) {
    res.send(500, {res: false, error: {error}})
  }
}

const put = async (req,res,send) => {
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }
  const {id} = req.params
  const {
    type,
    status,
    username,
    first_name,
    last_name,
    email
  } = req.body

  if (!id) {
    return res.send(422, {
      res: false,
      error: "id is required"
    })
  }

  try {
    const data = await User.findById(id)

    if (!data) {
      return res.send(404, {
        res: false,
        message: `User._id ${id} not found`
      })
    }

    await data.update({
      type,
      status,
      username,
      first_name,
      last_name,
      email
    })

    return res.send(200, {
      res: true,
      data: data
    })

  } catch(error) {
    return res.send(500, {res: false, error: {error}})
  }
}

module.exports = {
  find,
  findOne,
  create,
  put
}
