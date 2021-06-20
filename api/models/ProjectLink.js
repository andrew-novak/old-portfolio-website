const mongoose = require("mongoose");

const ProjectLinkSchema = new mongoose.Schema({
  text: String,
  url: String
});

const ProjectLink = mongoose.model("ProjectLink", ProjectLinkSchema);

module.exports = { ProjectLinkSchema, ProjectLink };
