const express = require("express");

const { Project } = require("../../models/Project");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.find({})
    .sort({ id: -1 })
    .exec((err, projects) => {
      if (err) return res.status(500).json(null);
      const trimmedProjects = projects.map((project, index) => {
        const { id, imageUrl, title, shortDescription: description } = project;
        return {
          id,
          imageUrl,
          title,
          description
        };
      });
      res.status(200).json({ projects: trimmedProjects });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Project.findOne({ id }).exec((err, project) => {
    if (err) return res.status(500).json(null);
    if (!project) return res.status(400).json(null);
    const {
      id,
      imageUrl,
      imageUrlExtra,
      title,
      fullDescription: description,
      links
    } = project;
    const trimmedProject = {
      id,
      imageUrl,
      imageUrlExtra,
      title,
      description,
      links
    };
    res.status(200).json({ project: trimmedProject });
  });
});

module.exports = router;
