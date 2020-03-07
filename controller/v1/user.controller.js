const User = require('../../model/user.model');

/**
 * @description Get alll users use queeryparans to filter then
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const getAll = async (req,res,next) => {
  const limit = req.query.limit;
  const offset = req.query.page * limit;
  try{
    const user = await User.findAll();
    if (!user || user.length == 0) {
      return res.status(404).json({
        res: false,
        error: {message: "empty list"}
      })
    }
    res.status(200).json({
      res: true,
      data: user,
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
  const {firstName, lastName, userName} = req.body;
  if(!userName || !firstName) {
    data= ['firstName', 'userName'].filter(key => !req.body.hasOwnProperty(key))
    return res.status(422).json({
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  User.create(req.body)
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
    const data = await User.findByPk(req.params.id);
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
    const data = await User.update({
      ...req.body
    }, {returning: true, where: {id: req.params.id} })
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
