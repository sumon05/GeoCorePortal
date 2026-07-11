const BoreholeService = require("../services/borehole.service");

const BoreholeController = {
  getAll(req, res) {
    const boreholes = BoreholeService.getAll();
    res.json(boreholes);
  },
  getById(req, res) {
    const borehole = BoreholeService.getById(Number(req.params.id));
    if (!borehole) {
      return res.status(404).json({
        success: false,
        message: "Borehole not found.",
      });
    }
    res.json(borehole);
  },
  update(req, res) {
    const borehole = BoreholeService.update(Number(req.params.id), req.body);
    if (!borehole) {
      return res.status(404).json({
        success: false,
        message: "Borehole not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Borehole updated successfully.",
      data: borehole,
    });
  },
  delete(req, res) {
    const deleted = BoreholeService.delete(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Borehole not found.",
      });
    }
    res.json({
      success: true,
      message: "Borehole deleted successfully.",
    });
  },
  create(req, res) {
    const borehole = BoreholeService.create(req.body);

    res.status(201).json(borehole);
  },
};

module.exports = BoreholeController;
