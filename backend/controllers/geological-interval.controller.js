const GeologicalIntervalService = require("../services/geological-interval.service");
const Response = require("../helpers/response.helper");
const GeologicalIntervalController = {
  async getAll(req, res) {
    const intervals = await GeologicalIntervalService.getAll();
    return Response.success(res, intervals);
  },
  async getById(req, res) {
    const interval = await GeologicalIntervalService.getById(req.params.id);
    return Response.success(res, interval);
  },
  async update(req, res) {
    const interval = await GeologicalIntervalService.update(req.params.id, req.body);
    if (!interval) {
      return Response.notFound(res, "GeologicalInterval");
    }
    return Response.success(res, interval);
  },
  async remove(req, res) {
    const removed = await GeologicalIntervalService.remove(req.params.id);
    if (!removed) {
      return Response.notFound(res, "GeologicalInterval");
    }
    return Response.deleted(res, "GeologicalInterval");
  },
  async create(req, res) {
    const interval = await GeologicalIntervalService.create(req.body);
    return Response.created(res, interval);
  },
  async getIntervalsByBoreholeId(req, res) {
    const intervals = await GeologicalIntervalService.getIntervalsByBoreholeId(
      req.params.boreholeId,
    );
    return Response.success(res, intervals);
  },
};

module.exports = GeologicalIntervalController;
