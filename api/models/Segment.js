const mongoose = require("mongoose");

const SegmentSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  header: String,
  text: String
});

const Segment = mongoose.model("Segment", SegmentSchema);

module.exports = { SegmentSchema, Segment };
