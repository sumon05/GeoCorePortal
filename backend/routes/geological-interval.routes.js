const express = require("express");
const router = express.Router();

const GeologicalIntervalController = require("../controllers/geological-interval.controller");

//GET
router.get("/", GeologicalIntervalController.getAll);
router.get("/borehole/:boreholeId", GeologicalIntervalController.getIntervalsByBoreholeId);
router.get("/:id", GeologicalIntervalController.getById);
//POST
router.post("/", GeologicalIntervalController.create);
//PUT
router.put("/:id", GeologicalIntervalController.update);
//DELETE
router.delete("/:id", GeologicalIntervalController.remove);

module.exports = router;
