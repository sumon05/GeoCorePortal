const express = require("express");
const router = express.Router();

const ProjectController = require("../controllers/project.controller");
const validateProject = require("../middleware/validate-project.middleware");
const asyncHandler = require("../utils/async-handler");

//GET
router.get("/", asyncHandler(ProjectController.getAll));
router.get("/:id", asyncHandler(ProjectController.getById));
router.get("/:id/boreholes", asyncHandler(ProjectController.getProjectWithBoreholes));
//POST
router.post("/", validateProject, asyncHandler(ProjectController.create));

//PUT
router.put("/:id", validateProject, asyncHandler(ProjectController.update));

//DELETE
router.delete("/:id", asyncHandler(ProjectController.remove));

module.exports = router;
