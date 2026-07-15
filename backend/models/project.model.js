const ProjectStatus = require("../constants/project-status");

class Project {
  constructor({
    projectId,
    projectName,
    clientName,
    projectLocation,
    projectStatus = ProjectStatus.ACTIVE,
    startDate,
    endDate,
    description,
  }) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.clientName = clientName;
    this.projectLocation = projectLocation;
    this.projectStatus = projectStatus;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }

  validate() {
    if (!this.projectName?.trim()) {
      throw new Error("Project name is required.");
    }

    if (!this.clientName?.trim()) {
      throw new Error("Client name is required.");
    }

    if (!this.startDate) {
      throw new Error("Start date is required.");
    }
    if (!Object.values(ProjectStatus).includes(this.projectStatus)) {
      throw new Error("Invalid project status.");
    }
  }

  activate() {
    this.projectStatus = ProjectStatus.ACTIVE;
  }

  complete() {
    if (!this.endDate) {
      throw new Error("Completed projects require an end date.");
    }

    this.projectStatus = ProjectStatus.COMPLETED;
  }

  archive() {
    this.projectStatus = ProjectStatus.ARCHIVED;
  }

  isActive() {
    return this.projectStatus === ProjectStatus.ACTIVE;
  }

  isCompleted() {
    return this.projectStatus === ProjectStatus.COMPLETED;
  }
  isArchived() {
    return this.projectStatus === ProjectStatus.ARCHIVED;
  }

  rename(newName) {
    if (!newName || newName.trim() === "") {
      throw new Error("Project name cannot be empty.");
    }

    this.projectName = newName.trim();
  }

  toJSON() {
    return {
      projectId: this.projectId,
      projectName: this.projectName,
      clientName: this.clientName,
      projectLocation: this.projectLocation,
      projectStatus: this.projectStatus,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
    };
  }
}

module.exports = Project;
