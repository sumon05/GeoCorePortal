const ExcelReader = {
  read(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const workbook = XLSX.read(e.target.result, {
        type: "binary",
      });

      callback(workbook);
    };

    reader.readAsBinaryString(file);
  },
};

window.ExcelReader = ExcelReader;
