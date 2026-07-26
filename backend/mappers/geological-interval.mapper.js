const GeologicalInterval = require("../models/geological-interval.model");

const GeologicalIntervalMapper = {
  toDomain(row) {
    return new GeologicalInterval({
      intervalId: row.interval_id,
      boreholeId: row.borehole_id,
      fromDepth: Number(row.from_depth),
      toDepth: Number(row.to_depth),
      classification: row.classification,
      lithology: row.lithology,
      crystallinity: row.crystallinity,
      mineralContent: row.mineral_content,
      texture: row.texture,
      structures: row.structures,
      alteration: row.alteration,
      remark: row.remark,
    });
  },

  toPersistence(interval) {
    return {
      borehole_id: interval.boreholeId,
      from_depth: interval.fromDepth,
      to_depth: interval.toDepth,
      classification: interval.classification,
      lithology: interval.lithology,
      crystallinity: interval.crystallinity,
      mineral_content: interval.mineralContent,
      texture: interval.texture,
      structures: interval.structures,
      alteration: interval.alteration,
      remark: interval.remark,
    };
  },
};

module.exports = GeologicalIntervalMapper;
