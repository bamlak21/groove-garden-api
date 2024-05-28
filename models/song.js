const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String },
  artist: { type: String },
  url: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("song", songSchema);
