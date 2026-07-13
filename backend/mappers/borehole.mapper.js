const Borehole = require("../models/borehole.model");

const BoreholeMapper = {
  toDomain(row) {
    return new Borehole({
      id: row.borehole_id,

      projectId: row.project_id,

      boreholeCode: row.borehole_code,

      drillingCompany: row.drilling_company,

      drillingRig: row.drilling_rig,

      totalDepth: Number(row.total_depth),

      coordinateSystem: row.coordinate_system,

      easting: row.easting,

      northing: row.northing,

      elevation: row.elevation,

      remarks: row.remarks,
    });
  },
};

module.exports = BoreholeMapper;
