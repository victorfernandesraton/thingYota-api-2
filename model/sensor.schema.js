const mongoose= require('mongoose');


const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  GPIO: {
    type: Number,
    required: true
  },
  // Relação belongsto
  bucket_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
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
