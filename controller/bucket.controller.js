const
  Bucket = require('../model/bucket.schema')
/**
 * @description Get all buckets in database
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const find = async (req,res,next) => {
  const {limit} = req.query
  const offset = (req.query.offset -1) * limit || 0
  try{
    const data = await Bucket.find()
      .limit(parseInt(limit) || 0)
      .skip(parseInt(offset) || 0)
      .exec()

    const total =await Bucket.estimatedDocumentCount()

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
 * @description Get one bucket using your PK value id
 * @param {{params: {id: string}}} req
 * @param {Response} res
 * @requires params.id
 * @param {*} next
 */
const findOne = async (req,res,next) => {
  const {id} = req.params;
  if (!id) {
    return res.send(404, {
      res: false,
      error: {
        message: "id parmas as required"
      }
    })
  }
  try{
    const data = await Bucket.findById(req.params.id);
    if (!data || data.length == 0) {
      return res.send(404, {
        res: false,
        message: `Bucket._id ${id} not found`
      })
    }
    res.send(200, {
      res: true,
      data: data,
    })
  } catch(error) {
    res.send(500, {
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
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }
  const {name, type} = req.body;
  const bodyNotFound = validaionBodyEmpty(req.body, ['name', 'type']);

  if(bodyNotFound.length < 0) {
    return res.send(422, {
      res: false,
      error: {
        message: "The parans request not found",
        data: bodyNotFound
      }
    })
  }

  Bucket.create({...req.body, create_at: Date()})
    .then(data => res.send(201, {
        res: true,
        data: data,

    }))
    .catch(error => res.send(500, {
      res: false,

    }))
}

/**
 * @description Put data update in refs by pk id
 * @param {{params: {id: String}, body:{name?: String, type?: String, send: Boolean}}} req
 * @param {Response} res
 * @param {*} send
 */
const put = (req,res,send) => {
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }
  const {id} = req.params
  const {name, type, status} = req.body
  if (!id) {
    return res.send(422, {
      res: false,
      error: {message: "id is required"}
    })
  }
  const bucket = Bucket.findById(id)
  if (!bucket) {
    return res.send( 404, {
      res: false,
      error: {message: `Bucket._id ${id} not found`}
    })
  }

  bucket.update({
    name,
    type,
    status
  })
    .then(data => {
      return res.send(200, {
        res: true,
        data
      })
    })
    .catch(error => {
      return res.send(500, {
        res: false,
        error: {message: ""}
      })
    })
}

module.exports = {
  findOne,
  find,
  create,
  put
}
