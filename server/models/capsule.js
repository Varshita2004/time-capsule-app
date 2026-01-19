const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  unlockDate: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Capsule", capsuleSchema);
