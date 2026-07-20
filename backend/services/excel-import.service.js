const ExcelReader = require("../parsers/excel-reader");
const MetadataParser = require("../parsers/metadata-parser");
const IntervalParser = require("../parsers/interval-parser");
const XLSX = require("xlsx");

class ExcelImportService {
  importExcel(files) {
    return files.map((file) => {
      const workbook = ExcelReader.read(file);

      const boreholes = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: "",
        });
        /* console.log(`\n===== ${sheetName} =====`);
        console.table(rows.slice(0, 20)); */

        const metadata = MetadataParser.parse(rows);
        const intervals = IntervalParser.parse(rows);

        return {
          sheetName,
          metadata,
          intervals,
        };
      });

      return {
        fileName: file.originalname,
        boreholes,
      };
    });
  }
}

module.exports = new ExcelImportService();
