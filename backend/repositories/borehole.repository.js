const BaseRepository = require("./base.repository");
const BoreholeMapper = require("../mappers/borehole.mapper");

class BoreholeRepository extends BaseRepository {
  constructor() {
    super();
  }
  async findAll(client = null) {
    const result = await this.query(
      `
    SELECT *
    FROM boreholes
    ORDER BY created_at;
  `,
      client,
    );

    return result.rows.map(BoreholeMapper.toDomain);
  }
  async findById(id, client = null) {
    const result = await this.query(
      `
    SELECT *
    FROM boreholes
    WHERE borehole_id = $1;
    `,
      [id],
      client,
    );

    if (result.rows.length === 0) {
      return null;
    }

    return BoreholeMapper.toDomain(result.rows[0]);
  }

  async create(borehole, client = null) {
    const result = await this.query(
      `
    INSERT INTO boreholes (
        project_id,
        borehole_code,
        drilling_company,
        drilling_rig,
        total_depth,
        coordinate_system,
        easting,
        northing,
        elevation,
        remarks
    )
    VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
    )
    RETURNING *;
    `,
      [
        borehole.projectId,
        borehole.boreholeCode,
        borehole.drillingCompany,
        borehole.drillingRig,
        borehole.totalDepth,
        borehole.coordinateSystem,
        borehole.easting,
        borehole.northing,
        borehole.elevation,
        borehole.remarks,
      ],
      client,
    );

    return BoreholeMapper.toDomain(result.rows[0]);
  }
  async update(id, updatedBorehole, client = null) {
    const result = await this.query(
      `
    UPDATE boreholes
    SET
        project_id = $1,
        borehole_code = $2,
        drilling_company = $3,
        drilling_rig = $4,
        total_depth = $5,
        coordinate_system = $6,
        easting = $7,
        northing = $8,
        elevation = $9,
        remarks = $10
    WHERE borehole_id = $11
    RETURNING *;
    `,
      [
        updatedBorehole.projectId,
        updatedBorehole.boreholeCode,
        updatedBorehole.drillingCompany,
        updatedBorehole.drillingRig,
        updatedBorehole.totalDepth,
        updatedBorehole.coordinateSystem,
        updatedBorehole.easting,
        updatedBorehole.northing,
        updatedBorehole.elevation,
        updatedBorehole.remarks,
        id,
      ],
      client,
    );
    if (result.rows.length === 0) {
      return null;
    }
    return BoreholeMapper.toDomain(result.rows[0]);
  }
  async remove(id, client = null) {
    const result = await this.query("DELETE FROM boreholes WHERE borehole_id = $1 RETURNING *;", [
      id,
      client,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return BoreholeMapper.toDomain(result.rows[0]);
  }
}

module.exports = new BoreholeRepository();
