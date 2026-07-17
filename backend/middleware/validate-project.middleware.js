const validateProject = (req, res, next) => {
  const project = req.body;

  if (!project || Object.keys(project).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body is required.",
    });
  }

  if (!project.projectName) {
    return res.status(400).json({
      success: false,
      message: "Project name is required.",
    });
  }

  if (!project.description) {
    return res.status(400).json({
      success: false,
      message: "Project description is required.",
    });
  }

  next();
};

module.exports = validateProject;
