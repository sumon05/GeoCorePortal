const Borehole = require("../models/borehole.model");
const BoreholeRepository = require("../repositories/borehole.repository");

const BoreholeService = {
  async create(data) {
    const borehole = new Borehole(data);
    borehole.validate();
    return await BoreholeRepository.create(borehole);
  },
  async getAll() {
    return await BoreholeRepository.findAll();
  },
  async getById(id) {
    return await BoreholeRepository.findById(id);
  },
  async update(id, data) {
    const borehole = new Borehole(data);

    borehole.validate();

    return await BoreholeRepository.update(id, borehole);
  },
  async remove(id) {
    return await BoreholeRepository.remove(id);
  },
};

module.exports = BoreholeService;
