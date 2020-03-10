const mongoose= require('mongoose');
const bcrypt = require('bcryptjs')

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Relação belongsto
  bucket_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
    required: true,
  },
  // sensors: [],
  type: {
    type: String,
    default: 'wather-sensor'
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

module.exports = mongoose.model("Sensor", sensorSchema);
