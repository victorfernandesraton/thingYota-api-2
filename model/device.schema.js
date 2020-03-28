const mongoose= require('mongoose');

const deviceSchemme = new mongoose.Schema({
  name: {
    type: String
  },
  mac_addres: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    required: true
  },
  Sensors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor"
  }],
  last_change: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model("Device",deviceSchemme )
