const BaseRepository = require("./base.repository");
const GeologicalIntervalMapper = require("../mappers/geological-interval.mapper");
class GeologicalIntervalRepository extends BaseRepository {
  constructor() {
    super();
  }
  async findAll() {
    const result = await this.query(`
      SELECT *
      FROM geological_intervals
      ORDER BY from_depth;
    `);
    return result.rows.map(GeologicalIntervalMapper.toDomain);
  }
  async findById(id) {
    const result = await this.query(
      `
      SELECT *
      FROM geological_intervals
      WHERE interval_id = $1
    `,
      [id],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return GeologicalIntervalMapper.toDomain(result.rows[0]);
  }
  async create(geologicalInterval) {
    const dbGeologicalInterval = GeologicalIntervalMapper.toPersistence(geologicalInterval);
    const result = await this.query(
      `
      INSERT INTO geological_intervals (borehole_id, from_depth, to_depth, lithology, weathering, alteration, strength, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
      [
        dbGeologicalInterval.borehole_id,
        dbGeologicalInterval.from_depth,
        dbGeologicalInterval.to_depth,
        dbGeologicalInterval.lithology,
        dbGeologicalInterval.weathering,
        dbGeologicalInterval.alteration,
        dbGeologicalInterval.strength,
        dbGeologicalInterval.description,
      ],
    );
    return GeologicalIntervalMapper.toDomain(result.rows[0]);
  }
  async update(id, geologicalInterval) {
    const dbGeologicalInterval = GeologicalIntervalMapper.toPersistence(geologicalInterval);
    const result = await this.query(
      `
      UPDATE geological_intervals
      SET borehole_id = $1, from_depth = $2, to_depth = $3, lithology = $4, weathering = $5, alteration = $6, strength = $7, description = $8
      WHERE interval_id = $9
      RETURNING *
    `,
      [
        dbGeologicalInterval.borehole_id,
        dbGeologicalInterval.from_depth,
        dbGeologicalInterval.to_depth,
        dbGeologicalInterval.lithology,
        dbGeologicalInterval.weathering,
        dbGeologicalInterval.alteration,
        dbGeologicalInterval.strength,
        dbGeologicalInterval.description,
        id,
      ],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return GeologicalIntervalMapper.toDomain(result.rows[0]);
  }

  async findByBoreholeId(boreholeId) {
    const result = await this.query(
      `
      SELECT *
      FROM geological_intervals
      WHERE borehole_id = $1
      ORDER BY from_depth;
    `,
      [boreholeId],
    );
    return result.rows.map(GeologicalIntervalMapper.toDomain);
  }
  async remove(id) {
    const result = await this.query(
      `
      DELETE FROM geological_intervals
      WHERE interval_id = $1
      RETURNING *
    `,
      [id],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return GeologicalIntervalMapper.toDomain(result.rows[0]);
  }
}

module.exports = new GeologicalIntervalRepository();
