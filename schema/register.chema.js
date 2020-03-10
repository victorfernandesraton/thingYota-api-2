const mongoose= require('mongoose');

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Relação belongsto
  bucket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bucket',
      required: true,
  },

  sensor: {
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true,
    },
    value: {
      type: {}
    }
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
