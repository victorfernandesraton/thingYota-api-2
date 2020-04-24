const mongoose= require('mongoose');

const bucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Sensors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensor'
    }
  ],
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
