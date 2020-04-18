const Register = require('../model/register.schema');
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
      .skip(parseInt(offset) || 0)
      .exec()

    const total =await Register.estimatedDocumentCount()

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
 * @description Get one register using your PK value id
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
    const data = await Register.findById(req.params.id);
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
 * @description Create Register
 * @param {{body: {Item: String, Fk_device: String, value: String, type: String}}} req
 * @param {Response} res
 * @param {next} next
 * @requires body.Item
 * @requires body.Fk_device
 * @requires body.value
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

  const bodyNotFound = validaionBodyEmpty(req.body, ['Fk_iten', 'Fk_device', 'value', 'type']);

  if(bodyNotFound.length < 0) {
    return res.send(422, {
      res: false,
      error: {
        message: "The parans request not found",
        data: bodyNotFound
      }
    })
  }

  const {
    Fk_iten,
    Fk_device,
    value,
    type,
    status,
    Fk_bucket
  } = req.body;

  const resgister = new Register({
    Fk_iten,
    Fk_device,
    value,
    type,
    status,
    Fk_bucket,
    create_at: Date()
  })

  resgister.save()
    .then(data => {
      res.send(201, {
        res: true,
        data: data,
      })
      // envio de dados para cliente do socket
      req.io.notification.emit("responseRegister", data)
    })
    .catch(error => res.send(500, {
      res: false,
      error: {message: "Error in store ", error}
    }))
}



module.exports = {
  find,
  findOne,
  create
}

