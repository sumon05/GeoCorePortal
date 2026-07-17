const Project = require("../models/project.model");

const ProjectMapper = {
  toDomain(row) {
    return new Project({
      projectId: row.project_id,
      projectName: row.project_name,
      clientName: row.client_name,
      projectLocation: row.project_location,
      projectStatus: row.project_status,
      startDate: row.start_date,
      endDate: row.end_date,
      description: row.description,
    });
  },
  toPersistence(project) {
    return {
      project_name: project.projectName,
      client_name: project.clientName,
      project_location: project.projectLocation,
      project_status: project.projectStatus,
      start_date: project.startDate,
      end_date: project.endDate,
      description: project.description,
    };
  },
};

module.exports = ProjectMapper;
