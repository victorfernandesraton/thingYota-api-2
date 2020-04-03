const mongoose= require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  GPIO: {
    type: Number,
    required: true
  },
  device_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true
  },
  type: {
    type: String,
    default: 'motor'
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

module.exports = mongoose.model("Actor", actorSchema);
