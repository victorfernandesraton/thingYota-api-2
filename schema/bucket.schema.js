const mongoose= require('mongoose');
const bcrypt = require('bcryptjs')

const bucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // sensors: [],
  type: {
    type: String,
    default: 'wather-bucket'
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


module.exports = mongoose.model("Bucket", bucketSchema);
