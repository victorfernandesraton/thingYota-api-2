const Sensor = require('../../schema/sensor.schema')
const Bucket = require('../../schema/bucket.schema')
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
    const data = await Sensor.find();
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
    const data = await Sensor.findById(req.params.id);
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
 * @param {{body: {name: String, type: String}}} req
 * @param {Response} res
 * @param {next} next
 * @requires body.name
 * @requires body.type
 */
const create = (req,res,next) => {
  const {name, type, bucket_parent} = req.body;
  if(!name || !type || !bucket_parent) {
    data= ['name', 'type', 'bucket_parent'].filter(key => !req.body.hasOwnProperty(key))
    return res.status(422).json({
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }

  Bucket.findById(bucket_parent)
    .then(bucket => {
      Sensor.create({...req.body, create_at: Date()})
        .then(data => res.status(201).json({
            res: true,
            data: data,
            metadata: "teste"
        }))
        .catch(error => res.status(500).json({
          res: false,
          error: error
        }))
    })
    .catch(error => res.status(500).json({
      res: false,
      error: error
    }))

}

/**
 * @description Put data update in refs by pk id
 * @param {{params: {id: String}, body:{name?: String, type?: String, status: Boolean}}} req
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

  if (req.body.bucket_parent) {
    Bucket.findById(req.body.bucket_parent)
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            res: false,
            error: {message: 'bucket not found'}
            })
          }
      })
      .catch(error => res.status(500).json({
        res: false,
        error: error
      }))
  }
  try {
    const data = await Sensor.update({_id: req.params.id}, {...req.body}, {upsert:true})

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
