const ExcelReader = require("../parsers/excel-reader");
const MetadataParser = require("../parsers/metadata-parser");
const IntervalParser = require("../parsers/interval-parser");
const IntervalDomainService = require("../domain/interval-domain.service");
const ExcelPersistenceService = require("./excel-persistence.service");
const XLSX = require("xlsx");

class ExcelImportService {
  async importExcel(files) {
    const parsedFiles = files.map((file) => {
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

        const validation = IntervalDomainService.validateIntervals(intervals);

        return {
          sheetName,
          metadata,
          intervals,
          validation,
        };
      });

      return {
        fileName: file.originalname,
        boreholes,
      };
    });
    const project = {
      projectName: parsedFiles[0].fileName.replace(".xlsx", ""),
      clientName: null,
      projectLocation: null,
      description: "Imported from Excel",
    };
    const result = {
      project,
      files: parsedFiles,
    };
    // console.log(JSON.stringify(result.files[0], null, 2));
    await ExcelPersistenceService.saveImport(result);
    return result;
  }
}

module.exports = new ExcelImportService();
