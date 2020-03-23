const User = require('../../schema/user.schema');
/**
 * @description Get alll users use queeryparans to filter then
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const getAll = async (req,res,next) => {
  const limit = parseInt(req.query.limit) || 0;
  const offset = parseInt(req.query.page) || 0;
  const total = await User.count()
  if (limit* offset > total) {
    return res.status(404).json({
      res: false,
      error: {message: "out of range"}
    })
  }
  try{
    const user = await User.find()
      .limit(limit).skip(offset);
    if (!user || user.length == 0) {
      return res.status(404).json({
        res: false,
        error: {message: "empty list"}
      })
    }
    res.status(200).json({
      res: true,
      data: user,
      metadata: {limit, offset, total: await User.count()}
    })
  } catch(error) {
    res.status(500).json({
      error,
      res: false
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
  const {username, first_name, password, email} = req.body;
  if(!username, !first_name, !password, !email) {
    data= ['username', 'email', 'first_name'].filter(key => !req.body.hasOwnProperty(key))
    return res.status(422).json({
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  User.create({...req.body, create_at: Date()})
    .then(data => res.status(201).json({
        res: true,
        data: data,
        metadata: "teste"
    }))
    .catch(error => res.status(500).json({
      res: false,
      error: error
    }))
}

const getOne = async (req,res,next) => {
  if (!req.params.id) {
    return res.status(422).json({
      res: false,
      error: "id is required"
    })
  }
  try {
    const data = await User.findById(req.params.id);
    if (!data || data.length == 0) {
      return res.status(404).json({
        res: false,
        error: {message: "User not found"}
      })
    }
    res.status(200).json({
      res: true,
      data: data,
      metadata: "teste"
    })
  } catch(error) {
    res.status(500).json({res: false, error: {error}})
  }
}

const putData = async (req,res,send) => {
  if (!req.params.id) {
    return res.status(422).json({
      res: false,
      error: "id is required"
    })
  }
  try {
    const data = await User.updateOne({_id: req.params.id},{...req.body})
    res.status(204).json({
      res: true,
      data: data
    })
  } catch(error) {
    res.status(500).json({res: false, error: {error}})
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  putData
}
