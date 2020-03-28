const
  Register = require('../model/register.schema'),

const find = (req, res , send) => {
  res.send(200, {res: true, data : {message: "OKs"}})
}

module.exports = {
  find
}

