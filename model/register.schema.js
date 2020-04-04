const mongoose= require('mongoose');

const registerSchema = new mongoose.Schema({
  Fk_device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true
  },
  // No use refer because is have varios types
  Fk_iten: {
    type: mongoose.Schema.Types.ObjectId
  },
  value: {
    type: String,
    default: "0",
    required: true
  },
  type: {
    type: String,
    default: 'Sensor'
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
