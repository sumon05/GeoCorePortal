let boreholes = [];

const BoreholeRepository = {
  findAll() {
    return boreholes;
  },
  findById(id) {
    return boreholes.find((borehole) => borehole.id === id);
  },

  create(borehole) {
    boreholes.push(borehole);

    return borehole;
  },
  update(id, updatedBorehole) {
    const index = boreholes.findIndex((borehole) => borehole.id === id);

    if (index === -1) {
      return null;
    }

    const existingBorehole = boreholes[index];
    const mergedBorehole = {
      ...existingBorehole,
      ...updatedBorehole,
      id: existingBorehole.id,
    };

    boreholes[index] = mergedBorehole;

    return mergedBorehole;
  },
  delete(id) {
    const index = boreholes.findIndex((borehole) => borehole.id === id);

    if (index === -1) {
      return false;
    }

    boreholes.splice(index, 1);

    return true;
  },
};

module.exports = BoreholeRepository;
