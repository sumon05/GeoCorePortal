const ProjectStatus = require("../constants/project-status");

class Project {
  constructor({
    id,
    clientId,
    name,
    description,
    status = ProjectStatus.PLANNING,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.clientId = clientId;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate() {
    if (!this.name) {
      throw new Error("Project name is required.");
    }

    if (!this.clientId) {
      throw new Error("Client is required.");
    }
  }

  activate() {
    this.status = ProjectStatus.ACTIVE;
    this.updatedAt = new Date();
  }

  complete() {
    this.status = ProjectStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  archive() {
    this.status = ProjectStatus.ARCHIVED;
    this.updatedAt = new Date();
  }

  isActive() {
    return this.status === ProjectStatus.ACTIVE;
  }

  isCompleted() {
    return this.status === ProjectStatus.COMPLETED;
  }

  rename(newName) {
    this.name = newName;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      clientId: this.clientId,
      name: this.name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Project;
