const mongoose= require('mongoose');


const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  port: {
    type: String,
    required: true
  },
  device_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true
  },
  type: {
    type: String,
    default: 'wather-sensor'
  },
  value: {
    type: Object
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
