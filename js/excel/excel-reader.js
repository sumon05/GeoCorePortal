const ExcelReader = {
  read(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const workbook = XLSX.read(e.target.result, {
        type: "binary",
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });

      callback(rows);
    };

    reader.readAsBinaryString(file);
  },
};
