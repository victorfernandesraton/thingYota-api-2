const Device = require('../model/device.schema')

/**
 * @description Get all Devices in database
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const getAll = async (req,res,next) => {
  const limit = req.query.limit || 0;
  const offset = req.query.offset|| 0;
  try{
    const data = await Device.find().limit(limit).skip(offset);
    if (!data || data.length == 0) {
      return res.send(404, {
        res: false,
        error: {message: "empty list"}
      })
    }
    res.send(200, {
      res: true,
      data: data,
      metadata: {limit, ofsset, total: await Device.count()}
    })
  } catch(error) {
    res.send(500, {
      error,
      res: false
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
const getOne = async (req,res,next) => {
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
    const data = await Device.findById(req.params.id);
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
    return res.send(422, {
      res: false,
      error: "id is required"
    })
  }
  try {
    const data = await Device.update({_id: req.params.id}, {...req.body}, {upsert:true})
    return res.send(204, {
      res: true,
      data: data
    })
  } catch(error) {
    res.send(500, {res: false, error: {error}})
  }
}

module.exports = {
  getOne,
  getAll,
  create,
  putData
}
