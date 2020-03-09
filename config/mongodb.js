const mongoose = require('mongoose')

module.exports =  mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}/${process.env.MDB_DOC}`, {useNewUrlParser: true});
