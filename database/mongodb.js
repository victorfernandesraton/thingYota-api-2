const mongoose = require('mongoose')
const config = require('../config/env')

const url = config.db.username ?
  `${config.db.url}://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.database}` :
  `${config.db.url}://${config.db.host}/${config.db.database}`

module.exports =  mongoose.connect(url, {useNewUrlParser: true});
