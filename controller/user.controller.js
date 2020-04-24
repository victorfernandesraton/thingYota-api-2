const User = require('../model/user.schema');
const md5 = require('md5');
const {validaionBodyEmpty, trimObjctt} = require("../utils/common");
const errors = require('restify-errors');

/**
 * @description Get alll users use queeryparans to filter then
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const find = async (req,res,next) => {
  const {limit} = req.query
  const offset = (req.query.offset -1) * limit || 0
  try{
    const data = await User.find()
      .limit(parseInt(limit) || 0)
      .skip(parseInt(offset) || 0)
      .exec()

    const total =await User.estimatedDocumentCount()

    if (offset >= total && total != 0) return res.send(new errors.LengthRequiredError("out of rnge"))

    if (!data || data.length == 0) return res.send(new errors.NotFoundError("User not found"))

    return res.send(200, {
      data: data,
      metadata: {limit, offset, total }
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

/**
 * @description Create user
 * @param {{body: {fristName: String, userName: String, lastName?: String}}} req
 * @param {Response} res
 * @param {next} next
 * @requires req
 */
const create = (req,res,next) => {
  if (req.body == null || req.body == undefined) return res.send(new errors.InvalidArgumentError("body is empty"))

  const bodyNotFound = validaionBodyEmpty(req.body, ['username', 'email', 'first_name', 'password']);

  if(bodyNotFound.length > 0) return res.send(new errors.NotFoundError(`not found params : ${bodyNotFound.join(',')}`))

  const {username, first_name, last_name, password, email} = req.body;

  const user = new User({
    username,
    first_name,
    last_name,
    email,
    password: md5(password.toString()),
    create_at: Date()
  })
  user.save()
    .then(data => res.send(201, {
      data: data,
    }))
    .catch(error => res.send(new errors.InternalServerError(`${error}`)))
}

const findOne = async (req,res,next) => {
  const {id} = req.params
  if (!id) return res.send(new errors.InvalidArgumentError("id not found"));

  try {
    const data = await User.findById(req.params.id);

    if (!data || data.length == 0) return res.send(new errors.NotFoundError(`User_id ${id} not found`))

    return res.send(200, {
      res: true,
      data: data,
    })
  } catch(error) {
    return res.send(new errors.InternalServerError(`${error}`))
  }
}

const put = async (req,res,send) => {
  if (req.body == null || req.body == undefined) return res.send(new errors.InvalidArgumentError("body is empty"))

  const {id} = req.params
  const {
    type,
    status,
    username,
    first_name,
    last_name,
    email
  } = req.body

  if (!id) return res.send(new errors.InvalidArgumentError("id not found"));

  let sendParans = trimObjctt({
    type,
    status,
    username,
    first_name,
    last_name,
    email
  });

  try {
    const user = await User.findByIdAndUpdate(id, sendParans, {useFindAndModify: false })

    if (!user || user.length == 0) return res.send(new errors.NotFoundError(`User_id ${id} not found`));

    return res.send(200, {data: user})

  } catch(error) {
    res.send(new errors.InternalServerError(`${error}`))
  }
}

module.exports = {
  find,
  findOne,
  create,
  put
}
