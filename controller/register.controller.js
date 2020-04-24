const Register = require('../model/register.schema');
const {validaionBodyEmpty, trimObjctt} = require('../utils/common')
const errors = require('restify-errors')
/**
 * @description Rota que retorna registros de dados
 * @param {Request} req
 * @param {Response} res
 * @param {Send} send
 */
const find = async (req, res, send) => {
  const {limit} = req.query
  const offset = (req.query.offset -1) * limit || 0
  try{
    const data = await Register.find()
      .limit(parseInt(limit) || 0)
      .skip(parseInt(offset) || 0).populate('Fk_device').populate('Fk_iten')
      .exec()

    const total =await Register.estimatedDocumentCount()

    if (offset >= total && total != 0) return res.send(new errors.LengthRequiredError("out of rnge"))

    if (!data || data.length == 0) return res.send(new errors.NotFoundError("Register not found"))

    return res.send(200, {
      data: data,
      metadata: {limit, offset, total }
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

/**
 * @description Get one register using your PK value id
 * @param {{params: {id: string}}} req
 * @param {Response} res
 * @requires params.id
 * @param {*} next
 */
const findOne = async (req,res,next) => {
  const {id} = req.params;

  if (!id) return res.send(new errors.InvalidArgumentError("id not found"));

  try{
    const data = await Register.findById(req.params.id);

    if (!data || data.length == 0) return res.send(new errors.NotFoundError(`Register._id ${id} not found`))

    res.send(200, {
      data: data,
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

/**
 * @description Create Register
 * @param {{body: {Item: String, Fk_device: String, value: String, type: String}}} req
 * @param {Response} res
 * @param {next} next
 * @requires body.Item
 * @requires body.Fk_device
 * @requires body.value
 * @requires body.type
 */
const create = async (req,res,next) => {
  if (req.body == null || req.body == undefined) return res.send(new errors.InvalidArgumentError("body is empty"))

  const bodyNotFound = validaionBodyEmpty(req.body, ['Fk_device', 'value', 'type']);

  if(bodyNotFound.length > 0) return res.send(new errors.NotFoundError(`not found params : ${bodyNotFound.join(',')}`))

  const {
    Fk_Sensor,
    Fk_Actor,
    Fk_device,
    value,
    type,
    status,
    Fk_bucket
  } = req.body;

  const sendData = trimObjctt({
    Fk_Sensor,
    Fk_Actor,
    Fk_device,
    value,
    type,
    status,
    Fk_bucket,
    create_at: Date()
  })

  try {
    const data = await Register.create(sendData);

    req.io.notification.emit("responseRegister", data)

    return res.send(200, {
      data: data
    })
  } catch(error)  {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

module.exports = {
  find,
  findOne,
  create
}

