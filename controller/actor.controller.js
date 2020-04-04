const Actor = require('../model/actor.schema')
const Device = require('../model/device.schema')
/**
 * @description Get all devices in database
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const find = async (req,res,next) => {
  const {limit} = req.query
  const offset = (req.query.offset -1) * limit || 0
  try{
    const data = await Actor.find()
      .limit(parseInt(limit) || 0)
      .skip(parseInt(offset) || 0)
      .exec()

    const total =await Actor.estimatedDocumentCount()

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
 * @description Get one Device using your PK value id
 * @param {{params: {id: string}}} req
 * @param {Response} res
 * @requires params.id
 * @param {*} next
 */
const findOne = async (req,res,next) => {
  const limit = req.query.limit;
  const offset = req.query.page * limit;
  if (!req.params.id) {
    return res.send(404, {
      res: false,
      error: {
        message: "id parmas as required"
      }
    })
  }
  try{
    const data = await Actor.findById(req.params.id);
    if (!data || data.length == 0) {
      return res.send(404, {
        res: false,
        error: {message: "empty list"}
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
const create = async (req,res,next) => {
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }

  const {name, type, device_parent, GPIO} = req.body;

  if(!name || !type || !device_parent || !GPIO) {
    let data= ['name', 'type', 'device_parent', 'GPIO'].filter(key => !req.body.hasOwnProperty(key))
    return res.send(422, {
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }

  const device = await Device.findById(device_parent)
  if (!device) {
    return res.send(404, {
      res: false,
      error :{message: `device ${device_parent} not found`}
    })
  }
  const actor = new Actor({
    create_at: Date(),
    name,
    type,
    device_parent,
    GPIO
  })

  device.update({
    $push: {
      Actors: actor._id
    }
  })
    .then(device => {
      actor.save()
        .then(data => res.send(201, {
            res: true,
            data: data,
        }))
        .catch(error => res.send(500, {
          res: false,
          error: {message: `Don't save Actor ${actor}`}
        }))
      })
      .catch(error => res.send(500, {
        res: false,
        error: {message: `Don't update Device ${device}`}
      }))
}

/**
 * @description Put data update in refs by pk id
 * @param {{params: {id: String}, body:{name?: String, type?: String, send: Boolean}}} req
 * @param {Response} res
 * @param {*} send
 */
const put = async (req,res,send) => {
  if (req.body == null || req.body == undefined) {
    return res.send(409, {
      res: false,
      error: {
        message: "body is required"
      }
    })
  }
  const {device_parent, name, type, status} = req.body
  const {id} = req.params;
  if (!id) {
    return res.send(422, {
      res: false,
      error: {message: `Actor._id ${id} is required`}
    })
  }
  try {
    const actor = await Actor.findById(id)

    if (!actor) {
      return res.send(404, {
        res: false,
        error: {message: `Actor._id ${id} not found`}
      })
    }

    if (device_parent) {
      const device = await Device.findById(req.body.device_parent)

      if (!device) {
        return res.send(404, {
          res: false,
          error: {message: `Device._id ${device_parent} not found`}
        })
      }

      device.update({
        $push: {
          Actors: await Actor.findById(id)
        }
      })
    }
    const data = await Actor.findByIdAndUpdate(id, {
      device_parent,
      name,
      type,
      status
    })

    return res.send(204, {
      res: true,
      data: data
    })
  } catch(error) {
    return res.send(500, {res: false, error: {error}})
  }
}

module.exports = {
  findOne,
  find,
  create,
  put
}
