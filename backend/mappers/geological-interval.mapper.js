const GeologicalInterval = require("../models/geological-interval.model");

const GeologicalIntervalMapper = {
  toDomain(row) {
    return new GeologicalInterval({
      intervalId: row.interval_id,
      boreholeId: row.borehole_id,
      fromDepth: Number(row.from_depth),
      toDepth: Number(row.to_depth),
      lithology: row.lithology,
      weathering: row.weathering,
      alteration: row.alteration,
      strength: row.strength,
      description: row.description,
    });
  },

  toPersistence(interval) {
    return {
      borehole_id: interval.boreholeId,
      from_depth: interval.fromDepth,
      to_depth: interval.toDepth,
      lithology: interval.lithology,
      weathering: interval.weathering,
      alteration: interval.alteration,
      strength: interval.strength,
      description: interval.description,
    };
  },
};

module.exports = GeologicalIntervalMapper;
