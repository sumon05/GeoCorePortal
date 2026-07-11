const projects = [];

const ProjectRepository = {
  findAll() {
    return projects;
  },

  findById(id) {
    return projects.find((project) => project.id === id);
  },

  create(project) {
    projects.push(project);
    return project;
  },
};

module.exports = ProjectRepository;
