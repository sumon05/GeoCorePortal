const express = require("express");
const router = express.Router();

const BoreholeController = require("../controllers/borehole.controller");
const validateBorehole = require("../middleware/validate-borehole.middleware");
const asyncHandler = require("../utils/async-handler");

// GET
router.get("/", asyncHandler(BoreholeController.getAll));
router.get("/:id", asyncHandler(BoreholeController.getById));

// POST
router.post("/", validateBorehole, asyncHandler(BoreholeController.create));

// PUT
router.put("/:id", validateBorehole, asyncHandler(BoreholeController.update));

// DELETE
router.delete("/:id", asyncHandler(BoreholeController.delete));

module.exports = router;
