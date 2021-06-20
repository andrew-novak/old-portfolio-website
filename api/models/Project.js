const mongoose = require("mongoose");

const { ProjectLinkSchema } = require("./ProjectLink");

const ProjectSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  imageUrlExtra: String,
  title: String,
  shortDescription: String,
  fullDescription: String,
  links: [ProjectLinkSchema]
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = { ProjectSchema, Project };
