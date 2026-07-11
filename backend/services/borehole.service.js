const Borehole = require("../models/borehole.model");
const BoreholeRepository = require("../repositories/borehole.repository");

const BoreholeService = {
  create(data) {
    const borehole = new Borehole(data);
    borehole.validate();
    return BoreholeRepository.create(borehole);
  },
  getAll() {
    return BoreholeRepository.findAll();
  },
  getById(id) {
    return BoreholeRepository.findById(id);
  },
  update(id, data) {
    return BoreholeRepository.update(id, data);
  },
  delete(id) {
    return BoreholeRepository.delete(id);
  },
};

module.exports = BoreholeService;
