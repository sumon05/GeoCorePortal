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

  async create(geologicalInterval, client = null) {
    geologicalInterval.validate();

    const dbGeologicalInterval = GeologicalIntervalMapper.toPersistence(geologicalInterval);

    const result = await this.query(
      `
      INSERT INTO geological_intervals (
        borehole_id,
        from_depth,
        to_depth,
        classification,
        lithology,
        crystallinity,
        mineral_content,
        texture,
        structures,
        alteration,
        remark
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
      `,
      [
        dbGeologicalInterval.borehole_id,
        dbGeologicalInterval.from_depth,
        dbGeologicalInterval.to_depth,
        dbGeologicalInterval.classification,
        dbGeologicalInterval.lithology,
        dbGeologicalInterval.crystallinity,
        dbGeologicalInterval.mineral_content,
        dbGeologicalInterval.texture,
        dbGeologicalInterval.structures,
        dbGeologicalInterval.alteration,
        dbGeologicalInterval.remark,
      ],
      client,
    );

    return GeologicalIntervalMapper.toDomain(result.rows[0]);
  }

  async update(id, geologicalInterval, client = null) {
    geologicalInterval.validate();

    const dbGeologicalInterval = GeologicalIntervalMapper.toPersistence(geologicalInterval);

    const result = await this.query(
      `
      UPDATE geological_intervals
      SET
        borehole_id = $1,
        from_depth = $2,
        to_depth = $3,
        classification = $4,
        lithology = $5,
        crystallinity = $6,
        mineral_content = $7,
        texture = $8,
        structures = $9,
        alteration = $10,
        remark = $11
      WHERE interval_id = $12
      RETURNING *;
      `,
      [
        dbGeologicalInterval.borehole_id,
        dbGeologicalInterval.from_depth,
        dbGeologicalInterval.to_depth,
        dbGeologicalInterval.classification,
        dbGeologicalInterval.lithology,
        dbGeologicalInterval.crystallinity,
        dbGeologicalInterval.mineral_content,
        dbGeologicalInterval.texture,
        dbGeologicalInterval.structures,
        dbGeologicalInterval.alteration,
        dbGeologicalInterval.remark,
        id,
      ],
      client,
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

  async remove(id, client = null) {
    const result = await this.query(
      `
      DELETE FROM geological_intervals
      WHERE interval_id = $1
      RETURNING *;
      `,
      [id],
      client,
    );

    if (result.rows.length === 0) {
      return null;
    }

    return GeologicalIntervalMapper.toDomain(result.rows[0]);
  }
}

module.exports = new GeologicalIntervalRepository();
