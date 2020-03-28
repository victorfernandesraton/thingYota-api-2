const mongoose = require("mongoose");
const md5 = require('md5')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    default: 'client'
  },
  status: {
    type: Boolean,
    default: true
  },
  create_at: {
    type: Date,
    required: true
  },
  last_change: {
    type: Date,
    default: Date.now
  }
})

// // Encriptador de senha
// userSchema.pre('save', async function (next) {
//   // alteração dos valores
//   this.password = md5(password);
//   next();
// })


module.exports = mongoose.model("User", userSchema);
