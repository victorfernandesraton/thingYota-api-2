const mongoose= require('mongoose');

const registerSchema = new mongoose.Schema({
  Fk_device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true
  },
  // // Relação belongsto
  Fk_bucket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bucket',
      // required: true,
  },

  Fk_sensor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true,
  },
  value: {
    type: String,
    default: "0",
    required: true
  },
  // registers: [],
  type: {
    type: String,
    default: 'wather-register'
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

module.exports = mongoose.model("Register", registerSchema);
