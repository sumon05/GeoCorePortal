const Project = require("../models/project.model");
const BaseService = require("./base.service");
const ProjectRepository = require("../repositories/project.repository");

class ProjectService extends BaseService {
  constructor() {
    super(ProjectRepository, "Project");
  }
  async create(data) {
    const project = new Project(data);
    project.validate();
    return await this.repository.create(project);
  }
  async update(id, data) {
    const project = new Project(data);
    project.validate();
    return await this.repository.update(id, project);
  }
  async getProjectWithBoreholes(projectId) {
    return await this.repository.findWithBoreholes(projectId);
  }
}

module.exports = new ProjectService();
