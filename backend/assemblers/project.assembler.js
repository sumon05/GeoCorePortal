const BoreholeMapper = require("../mappers/borehole.mapper");
const ProjectAssembler = {
  assemble(rows) {
    if (rows.length === 0) {
      return null;
    }

    const first = rows[0];

    return {
      projectId: first.project_id,
      projectName: first.project_name,
      clientName: first.client_name,
      projectLocation: first.project_location,
      projectStatus: first.project_status,
      startDate: first.start_date,
      endDate: first.end_date,
      description: first.description,

      boreholes: rows.filter((row) => row.borehole_id).map(BoreholeMapper.toDomain),
    };
  },
};

module.exports = ProjectAssembler;
