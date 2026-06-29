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
      console.log("Current Sheet:", sheetName);
      console.table(rows);

      // Parse intervals
      try {
        const borehole = ImportService.import(rows);
        BoreholeRepository.add(borehole);

        MetadataPanel.render(borehole.metadata);

        TableRenderer.render(borehole.intervals);

        BoreholeList.render(BoreholeRepository.getAll());
      } catch (error) {
        alert(error.message);
      }
    });
  });
});
