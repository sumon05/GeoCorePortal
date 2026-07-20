const XLSX = require("xlsx");

class ExcelReader {
  read(file) {
    return XLSX.read(file.buffer, {
      type: "buffer",
    });
  }
}

module.exports = new ExcelReader();
