const AppController = {
  init() {
    MapService.init();

    this.registerEvents();
  },

  registerEvents() {
    $("#importBtn").on("click", () => {
      this.importWorkbook();
    });

    $("#searchInput").on("keyup", () => {
      this.handleSearch();
    });

    $("#showAllBtn").on("click", () => {
      MapService.fitToMarkers();
    });
  },

  importWorkbook() {
    const file = $("#excelFile")[0].files[0];

    if (!file) {
      alert("Bitte Excel-Datei wählen");
      return;
    }

    ExcelReader.read(file, (workbook) => {
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        });

        try {
          const borehole = ImportService.import(rows);

          BoreholeRepository.add(borehole);

          const point = CoordinateService.toLatLng(borehole.metadata.location);

          const marker = MapService.addMarker(point, borehole.metadata.id);
          borehole.marker = marker;
        } catch (error) {
          console.error(error);

          alert(error);
        }
      });

      this.renderApplication();
    });
  },

  handleSearch() {
    const text = $("#searchInput").val();

    const filtered = SearchService.filter(BoreholeRepository.getAll(), text);

    BoreholeList.render(filtered);

    if (filtered.length) {
      SelectionService.select(filtered[0]);
    }
  },

  renderApplication() {
    BoreholeList.render(BoreholeRepository.getAll());

    MapService.fitToMarkers();

    const first = BoreholeRepository.getAll()[0];

    if (first) {
      SelectionService.select(first);
    }
    StatisticsPanel.render(BoreholeRepository.getAll());
  },
};

window.AppController = AppController;
