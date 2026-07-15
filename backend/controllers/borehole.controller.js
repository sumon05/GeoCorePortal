const BoreholeService = require("../services/borehole.service");
const Response = require("../helpers/response.helper");
const BoreholeController = {
  async getAll(req, res) {
    const boreholes = await BoreholeService.getAll();
    return Response.success(res, boreholes);
  },
  async getById(req, res) {
    const borehole = await BoreholeService.getById(req.params.id);
    return Response.success(res, borehole);
  },
  async update(req, res) {
    const borehole = await BoreholeService.update(req.params.id, req.body);
    if (!borehole) {
      return Response.notFound(res, "Borehole");
    }
    return Response.success(res, borehole);
  },
  async remove(req, res) {
    const removed = await BoreholeService.remove(req.params.id);
    return Response.deleted(res, "Borehole");
  },

  async create(req, res) {
    const borehole = await BoreholeService.create(req.body);
    return Response.created(res, borehole);
  },
};

module.exports = BoreholeController;
