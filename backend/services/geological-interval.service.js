const GeologicalInterval = require("../models/geological-interval.model");
const BaseService = require("./base.service");
const GeologicalIntervalRepository = require("../repositories/geological-interval.repository");
const ValidationError = require("../errors/validation.error");

class GeologicalIntervalService extends BaseService {
  constructor() {
    super(GeologicalIntervalRepository, "GeologicalInterval");
  }
  async create(data) {
    const geologicalInterval = new GeologicalInterval(data);
    geologicalInterval.validate();
    const existingIntervals = await this.repository.findByBoreholeId(geologicalInterval.boreholeId);
    if (this.hasOverlap(geologicalInterval, existingIntervals)) {
      throw new ValidationError("GeologicalInterval overlaps with existing intervals.");
    }
    return await this.repository.create(geologicalInterval);
  }
  async update(id, data) {
    const geologicalInterval = new GeologicalInterval(data);
    geologicalInterval.validate();
    const existingIntervals = await this.repository.findByBoreholeId(geologicalInterval.boreholeId);
    const otherIntervals = existingIntervals.filter((interval) => interval.intervalId !== id);
    if (this.hasOverlap(geologicalInterval, otherIntervals)) {
      throw new ValidationError("GeologicalInterval overlaps with an existing intervals.");
    }
    return await this.repository.update(id, geologicalInterval);
  }
  async getIntervalsByBoreholeId(boreholeId) {
    return await this.repository.findByBoreholeId(boreholeId);
  }
  hasOverlap(newInterval, existingIntervals) {
    return existingIntervals.some((interval) => {
      return newInterval.fromDepth < interval.toDepth && newInterval.toDepth > interval.fromDepth;
    });
  }
}
module.exports = new GeologicalIntervalService();
