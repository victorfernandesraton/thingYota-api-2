const Device = require('../model/device.schema')

/**
 * @description Get all Devices in database
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const find = async (req,res,next) => {
  const {limit} = req.query
  const offset = (req.query.offset -1) * limit || 0
  try{
    const data = await Device.find()
      .limit(parseInt(limit) || 0)
      .skip(parseInt(offset) || 0)
      .exec()

    const total =await Device.estimatedDocumentCount()

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
  }catch(error) {
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
    const data = await Device.findById(id);
    if (!data || data.length == 0) {
      return res.send(404, {
        res: false,
        message: `Device._id ${id} not found`
      })
    }
    return res.send(200, {
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
  const {name, type, mac_addres} = req.body;
  if(!name || !type || !mac_addres) {
    data= ['name', 'type','mac_addres'].filter(key => !req.body.hasOwnProperty(key))
    return res.send(422, {
      res: false,
      error: {
        message: "The parans request not found",
        data
      }
    })
  }
  Device.create({...req.body, create_at: Date.now()})
    .then(data => res.send(201, {
        res: true,
        data: data,
        metadata: "teste"
    }))
    .catch(error => res.send(500, {
      res: false,

    }))
}

/**
 * @description Put data update in refs by pk id
 * @param {{params: {id: String}, body:{name?: String, type?: String, status: Boolean}}} req
 * @param {Response} res
 * @param {*} send
 */
const put = async (req,res,send) => {
  const {id} = req.params
  const {name, type, mac_addres, status} = req.body
  if (!id) {
    return res.send(422, {
      res: false,
      error: "id is required"
    })
  }
  try {
    const device = await Device.findById(id)

    if (!device) {
      return res.send(404, {
        res: true,
        message: `Device._id ${id} not found`
      })
    }

    const data = await device.update({
      name,
      type,
      mac_addres,
      status
    })
    return res.send(204, {
      res: true,
      data: data
    })
  } catch(error) {
    res.send(500, {res: false, error: {error}})
  }
}

module.exports = {
  findOne,
  find,
  create,
  put
}
