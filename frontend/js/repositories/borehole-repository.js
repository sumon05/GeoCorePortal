const BoreholeRepository = {
  boreholes: [],

  add(borehole) {
    this.boreholes.push(borehole);
  },

  getAll() {
    return this.boreholes;
  },

  findById(id) {
    return this.boreholes.find((borehole) => borehole.metadata.id === id);
  },
};

window.BoreholeRepository = BoreholeRepository;
