const express = require("express");

const router = express.Router();

const HealthController = require("../controllers/health.controller");

router.get("/", HealthController.getStatus);

module.exports = router;
