const express = require("express");
const router = express.Router();

const ProjectController = require("../controllers/project.controller");

router.post("/", ProjectController.create);

router.get("/", ProjectController.findAll);

module.exports = router;
