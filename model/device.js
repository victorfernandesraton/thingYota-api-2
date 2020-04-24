const mongoose= require('mongoose');

const deviceSchemme = new mongoose.Schema({
  name: {
    type: String
  },
  mac_addres: {
    type: String,
    required: true,
    unique: true
  },
  create_at: {
    type: Date,
    required: true
  },
  Sensors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor"
  }],
  Actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actor"
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
