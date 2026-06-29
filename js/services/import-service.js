const ImportService = {
  import(rows) {
    const borehole = new Borehole();

    borehole.metadata = MetadataParser.parse(rows);

    borehole.intervals = IntervalParser.parse(rows);

    return borehole;
  },
};

window.ImportService = ImportService;
