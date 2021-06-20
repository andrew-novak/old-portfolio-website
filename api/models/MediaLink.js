const mongoose = require("mongoose");

const MediaLinkSchema = new mongoose.Schema({
  id: Number,
  variant: String,
  url: String
});

const MediaLink = mongoose.model("MediaLink", MediaLinkSchema);

module.exports = { MediaLinkSchema, MediaLink };
