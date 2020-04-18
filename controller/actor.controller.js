const Actor = require('../model/actor.schema')
const Device = require('../model/device.schema')
const {validaionBodyEmpty} = require("../utils/common")
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
      .exec()

    const total =await Actor.estimatedDocumentCount()

    if (offset >= total && total != 0) return res.send(new errors.LengthRequiredError("out of rnge"))

    if (!data || data.length == 0) return res.send(new errors.NotFoundError("Sensor not found"))

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
    const data = await Actor.findById(id);

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

  try {
    const device = await Device.findById(device_parent)

    if (!device) return res.send(new errors.NotFoundError(`Device._id ${device_parent} not found`))

    const actor = new Actor({
      create_at: Date(),
      name,
      type,
      device_parent,
      port
    })

    actor.save()
      .then(data => {
        device.update({
          $push: {
            Actors: actor._id
          }
        })
          .then(data => res.send(201, {
              data: actor,
          }))
          .catch(error =>  res.send(new errors.InternalServerError(`${error}`)))
      })
      .catch(error =>  res.send(new errors.InternalServerError(`${error}`)))
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

  const {device_parent, name, type, status} = req.body

  if (!id) return res.send(new errors.InvalidArgumentError("id not found"));

  try {
    const actor = await Actor.findById(id)

    if (!actor) return res.send(new errors.NotFoundError(`Actor_id ${id} not found`))

    if (device_parent) {
      const device = await Device.findById(req.body.device_parent)

      if (!device) return res.send(new errors.NotFoundError(`Device_id ${device_parent} not found`))

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

    return res.send(200, {
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
