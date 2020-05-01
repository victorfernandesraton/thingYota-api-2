const Actor = require('../model/actor');
const Device = require('../model/device');
const Bucket = require('../model/bucket');
const {validaionBodyEmpty, trimObjctt} = require("../utils/common")
const errors = require('restify-errors');

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
      .populate('device_parent')
      .exec()

    const total =await Actor.estimatedDocumentCount()

    if (offset >= total && total != 0) return res.send(new errors.LengthRequiredError("out of rnge"))

    if (!data || data.length == 0) return res.send(new errors.NotFoundError("Actors not found"))

    return res.send(200, {
      data: data,
      metadata: {limit, offset, total }
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
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

  if (!id) return res.send(new errors.InvalidArgumentError("id not found"));

  try{
    const data = await Actor.findById(id).populate('device_parent');

    if (!data || data.length == 0) return res.send(new errors.NotFoundError("Sensor not found"))

    res.send(200, {
      res: true,
      data: data,
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
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
  if (req.body == null || req.body == undefined) return res.send(new errors.InvalidArgumentError("body is empty"))

  const bodyNotFound = validaionBodyEmpty(req.body,['name', 'type', 'device_parent', 'port'])

  if(bodyNotFound.length > 0) return res.send(new errors.NotFoundError(`not found params : ${bodyNotFound.join(',')}`))

  let {name, type, device_parent, port} = req.body;

  const sendData = trimObjctt({name, type, device_parent, port, create_at: Date.now()});

  try {
    const device = await Device.findById(device_parent)

    if (!device) return res.send(new errors.NotFoundError(`Device._id ${device_parent} not found`))

    const data = await Actor.create(sendData)
    await device.update({
      $push: {
        Actors: data._id
      }
    })
    return res.send(200, {data: data})
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

/**
 * @description Put data update in refs by pk id
 * @param {{params: {id: String}, body:{name?: String, type?: String, send: Boolean}}} req
 * @param {Response} res
 * @param {*} send
 */
const put = async (req,res,send) => {
  if (req.body == null || req.body == undefined) return res.send(new errors.InvalidArgumentError("body is empty"))

  const {device_parent, name, type, status, port} = req.body
  const {id} = req.params;

  if (!id) return res.send(new errors.InvalidArgumentError("id not found"));

  try {
    const sensor = await Actor.findById(id)

    if (!sensor) return res.send(new errors.NotFoundError(`Actor_id ${id} not found`))

    if (device_parent) {
      const device = await Device.findById(req.body.device_parent)

      if (!device) return res.send(new errors.NotFoundError(`Device_id ${device_parent} not found`))

      device.update({
        $push: {
          Actors: await Actor.findById(id)
        }
      })
    }

    let sendData = trimObjctt({
      device_parent,
      name,
      type,
      status,
      port
    })



    const data = await Actor.findByIdAndUpdate(id,sendData, {new: true, useFindAndModify: false })

    const buckets = await Bucket.find({Actors: {"$in" : {_id: id}}})

    if(buckets.length > 0) {
      buckets.forEach(el => {
        const dispatch = req.io.io.of(`/Bucket_${el._id}`);

        dispatch.emit("updated", {
          data: {
            Actor: data,
            entity: "Actors",
            Bucket: el
          }
        })
      })
    }
    return res.send(200, {
      data: data
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

module.exports = {
  findOne,
  find,
  create,
  put
}
