const mongoose = require('mongoose')

const connect = process.env.MDB_USER ? `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}/${process.env.MDB_DOC}`: `'mongodb://${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB}`
module.exports =  mongoose.connect('mongodb://localhost:4000/myapp', {useNewUrlParser: true});
