$(document).ready(function () {
  MapService.init();
});

$("#importBtn").click(function () {
  const file = $("#excelFile")[0].files[0];

  if (!file) {
    alert("Bitte Excel-Datei wählen");
    return;
  }

  ExcelReader.read(file, function (workbook) {
    workbook.SheetNames.forEach(function (sheetName) {
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

    BoreholeList.render(BoreholeRepository.getAll());

    MapService.fitToMarkers();

    // Select first borehole automatically

    const first = BoreholeRepository.getAll()[0];

    if (first) {
      const test = SelectionService.select(first);
    }
  });
});
