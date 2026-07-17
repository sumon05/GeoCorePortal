const BaseRepository = require("./base.repository");
const ProjectMapper = require("../mappers/project.mapper");
const ProjectAssembler = require("../assemblers/project.assembler");
class ProjectRepository extends BaseRepository {
  constructor() {
    super();
  }
  async findAll() {
    const result = await this.query(`
    SELECT *
    FROM projects
    ORDER BY created_at;
  `);

    return result.rows.map(ProjectMapper.toDomain);
  }
  async findById(id) {
    const result = await this.query(
      `
    SELECT *
    FROM projects
    WHERE project_id = $1;
    `,
      [id],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async create(project) {
    const dbProject = ProjectMapper.toPersistence(project);
    const result = await this.query(
      `
    INSERT INTO projects (project_name, client_name, project_location, project_status, start_date, end_date, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
      [
        dbProject.project_name,
        dbProject.client_name,
        dbProject.project_location,
        dbProject.project_status,
        dbProject.start_date,
        dbProject.end_date,
        dbProject.description,
      ],
    );
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async update(id, project) {
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
    );
    if (result.rows.length === 0) {
      return null;
    }
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async remove(id) {
    const result = await this.query(
      `
    DELETE FROM projects
    WHERE project_id = $1
    RETURNING *;
    `,
      [id],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return ProjectMapper.toDomain(result.rows[0]);
  }
  async findWithBoreholes(projectId) {
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
    );

    return ProjectAssembler.assemble(result.rows);
  }
}

module.exports = new ProjectRepository();
