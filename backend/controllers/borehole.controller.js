const BoreholeService = require("../services/borehole.service");

const BoreholeController = {
  async getAll(req, res) {
    const boreholes = await BoreholeService.getAll();
    return res.json({
      success: true,
      data: boreholes,
    });
  },
  async getById(req, res) {
    const borehole = await BoreholeService.getById(req.params.id);
    if (!borehole) {
      return res.status(404).json({
        success: false,
        message: "Borehole not found.",
      });
    }
    return res.json({
      success: true,
      data: borehole,
    });
  },
  async update(req, res) {
    const borehole = await BoreholeService.update(req.params.id, req.body);
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
  async remove(req, res) {
    const removed = await BoreholeService.remove(req.params.id);
    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Borehole not found.",
      });
    }
    return res.json({
      success: true,
      message: "Borehole deleted successfully.",
      data: removed,
    });
  },
  async create(req, res) {
    const borehole = await BoreholeService.create(req.body);
    return res.status(201).json({
      success: true,
      data: borehole,
    });
  },
};

module.exports = BoreholeController;
