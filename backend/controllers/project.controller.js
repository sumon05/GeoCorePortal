const ProjectService = require("../services/project.service");
const Response = require("../helpers/response.helper");
const ProjectController = {
  async getAll(req, res) {
    const projects = await ProjectService.getAll();
    return Response.success(res, projects);
  },
  async getById(req, res) {
    const project = await ProjectService.getById(req.params.id);
    return Response.success(res, project);
  },
  async update(req, res) {
    const project = await ProjectService.update(req.params.id, req.body);
    if (!project) {
      return Response.notFound(res, "Project");
    }
    return Response.success(res, project);
  },
  async remove(req, res) {
    const removed = await ProjectService.remove(req.params.id);
    return Response.deleted(res, "Project");
  },
  async create(req, res) {
    const project = await ProjectService.create(req.body);
    return Response.created(res, project);
  },
  async getProjectWithBoreholes(req, res) {
    const data = await ProjectService.getProjectWithBoreholes(req.params.id);

    return Response.success(res, data);
  },
};

module.exports = ProjectController;
