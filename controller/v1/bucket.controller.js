const Bucket = require('../../model/bucket.model')

/**
 * @description Get all buckets in database
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const getAll = async (req,res,next) => {
  const limit = req.query.limit;
  const offset = req.query.page * limit;
  try{
    const data = await Bucket.findAll();
    if (!data || data.length == 0) {
      return res.status(404).json({
        res: false,
        error: {message: "empty list"}
      })
    }
    res.status(200).json({
      res: true,
      data: data,
    })
  } catch(error) {
    res.status(500).json({
      error,
      res: false
    })
  }
}

/**
 * @description Get one bucket using your PK value id
 * @param {{params: {id: string}}} req
 * @param {Response} res
 * @requires params.id
 * @param {*} next
 */
const getOne = async (req,res,next) => {
  const limit = req.query.limit;
  const offset = req.query.page * limit;
  if (!req.params.id) {
    return res.status(404).json({
      res: false,
      error: {
        message: "id parmas as required"
      }
    })
  }
  try{
    const data = await Bucket.findByPk(req.params.id);
    if (!data || data.length == 0) {
      return res.status(404).json({
        res: false,
        error: {message: "empty list"}
      })
    }
    res.status(200).json({
      res: true,
      data: data,
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
 * @param {{body: {st_name: String, type: String}}} req
 * @param {Response} res
 * @param {next} next
 * @requires body.st_name
 * @requires body.type
 */
const create = (req,res,next) => {
  const {st_name, type} = req.body;
  if(!st_name || !type) {
    data= ['st_name', 'type'].filter(key => !req.body.hasOwnProperty(key))
    return res.status(422).json({
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  Bucket.create(req.body)
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

/**
 * @description Put data update in refs by pk id
 * @param {{params: {id: String}, body:{st_name?: String, type?: String, status: Boolean}}} req
 * @param {Response} res
 * @param {*} send
 */
const putData = async (req,res,send) => {
  if (!req.params.id) {
    return res.status(422).json({
      res: false,
      error: "id is required"
    })
  }
  try {
    const data = await Bucket.update({
      ...req.body
    }, {returning: true, where: {id: req.params.id} })

    return res.status(204).json({
      res: true,
      data: data
    })
  } catch(error) {
    res.status(500).json({res: false, error: {error}})
  }
}

module.exports = {
  getOne,
  getAll,
  create,
  putData
}
