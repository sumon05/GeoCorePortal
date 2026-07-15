const Borehole = require("../models/borehole.model");
const BaseService = require("./base.service");
const BoreholeRepository = require("../repositories/borehole.repository");
class BoreholeService extends BaseService {
  constructor() {
    super(BoreholeRepository, "Borehole");
  }
  async create(data) {
    const borehole = new Borehole(data);
    borehole.validate();
    return await this.repository.create(borehole);
  }
  async update(id, data) {
    const borehole = new Borehole(data);

    borehole.validate();

    return this.repository.update(id, borehole);
  }
}

module.exports = new BoreholeService();
