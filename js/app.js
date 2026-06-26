$("#importBtn").click(function () {
  const file = $("#excelFile")[0].files[0];

  if (!file) {
    alert("Bitte Excel-Datei wählen");
    return;
  }

  ExcelReader.read(file, function (rows) {
    console.log("Raw Excel:");
    console.table(rows);

    // Parse intervals
    try {
      const intervals = IntervalParser.parse(rows);

      TableRenderer.render(intervals);
    } catch (error) {
      alert(error.message);
    }
  });
});
