const BaseRepository = require("./base.repository");
const ProjectMapper = require("../mappers/project.mapper");
const ProjectAssembler = require("../assemblers/project.assembler");
class ProjectRepository extends BaseRepository {
  async findAll(client = null) {
    const result = await this.query(
      `
    SELECT *
    FROM projects
    ORDER BY created_at;
    `,
      client,
    );
    return result.rows.map(ProjectMapper.toDomain);
  }
  async findById(id, client = null) {
    const result = await this.query(
      `
    SELECT *
    FROM projects
    WHERE project_id = $1;
    `,
      [id],
      client,
    );
    if (result.rows.length === 0) {
      return null;
    }
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async create(project, client = null) {
    project.validate();
    const persistenceProject = ProjectMapper.toPersistence(project);
    const result = await this.query(
      `
    INSERT INTO projects (project_name, client_name, project_location, project_status, start_date, end_date, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
      [
        persistenceProject.project_name,
        persistenceProject.client_name,
        persistenceProject.project_location,
        persistenceProject.project_status,
        persistenceProject.start_date,
        persistenceProject.end_date,
        persistenceProject.description,
      ],
      client,
    );
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async update(id, project, client = null) {
    const result = await this.query(
      `
    UPDATE projects
    SET project_name = $1, client_name = $2, project_location = $3, project_status = $4, start_date = $5, end_date = $6, description = $7
    WHERE project_id = $8
    RETURNING *;
    `,
      [
        project.projectName,
        project.clientName,
        project.projectLocation,
        project.projectStatus,
        project.startDate,
        project.endDate,
        project.description,
        id,
      ],
      client,
    );
    if (result.rows.length === 0) {
      return null;
    }
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async remove(id, client = null) {
    const result = await this.query(
      `
    DELETE FROM projects
    WHERE project_id = $1
    RETURNING *;
    `,
      [id],
      client,
    );
    if (result.rows.length === 0) {
      return null;
    }
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async findWithBoreholes(projectId, client = null) {
    const result = await this.query(
      `
    SELECT
        p.project_id,
        p.project_name,
        p.client_name,
        p.project_location,
        p.project_status,
        p.start_date,
        p.end_date,
        p.description,

        b.borehole_id,
        b.borehole_code,
        b.total_depth,
        b.drilling_company,
        b.drilling_rig,
        b.coordinate_system,
        b.easting,
        b.northing,
        b.elevation,
        b.remarks

    FROM projects p

    LEFT JOIN boreholes b
        ON p.project_id = b.project_id

    WHERE p.project_id = $1;
    `,
      [projectId],
      client,
    );

    return ProjectAssembler.assemble(result.rows);
  }
}

module.exports = new ProjectRepository();
