const GeologicalInterval = require("../models/geological-interval.model");
const BaseService = require("./base.service");
const GeologicalIntervalRepository = require("../repositories/geological-interval.repository");
const ValidationError = require("../errors/validation.error");
const IntervalDomainService = require("../domain/interval-domain.service");

class GeologicalIntervalService extends BaseService {
  constructor() {
    super(GeologicalIntervalRepository, "GeologicalInterval");
  }
  //introduce findGaps during creation and update of intervals
  async create(data) {
    const geologicalInterval = new GeologicalInterval(data);
    geologicalInterval.validate();
    const existingIntervals = await this.repository.findByBoreholeId(geologicalInterval.boreholeId);
    const report = IntervalDomainService.validateIntervals([
      ...existingIntervals,
      geologicalInterval,
    ]);
    if (report.overlaps.length > 0) {
      throw new ValidationError("Geological intervals overlap.", report);
    }
    return await this.repository.create(geologicalInterval);
  }
  async update(id, data) {
    const geologicalInterval = new GeologicalInterval(data);
    geologicalInterval.validate();
    const existingIntervals = await this.repository.findByBoreholeId(geologicalInterval.boreholeId);
    const otherIntervals = existingIntervals.filter((interval) => interval.intervalId !== id);
    const report = IntervalDomainService.validateIntervals([...otherIntervals, geologicalInterval]);
    if (report.overlaps.length > 0) {
      throw new ValidationError("Geological intervals overlap.", report);
    }
    return await this.repository.update(id, geologicalInterval);
  }
  async getIntervalsByBoreholeId(boreholeId) {
    return await this.repository.findByBoreholeId(boreholeId);
  }
  async validateByBoreholeId(boreholeId) {
    const intervals = await this.repository.findByBoreholeId(boreholeId);

    return IntervalDomainService.validateIntervals(intervals);
  }
}
module.exports = new GeologicalIntervalService();
