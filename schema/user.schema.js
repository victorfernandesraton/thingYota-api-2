const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

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

// Encriptador de senha
userSchema.pre('save', async function (next) {
  // hash de senha
  const hashPassword = await bcrypt.hash(this.password, 10);
  // alteração dos valores
  this.password = hashPassword;
  next();
})


module.exports = mongoose.model("User", userSchema);
