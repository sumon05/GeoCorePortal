const ExcelImportService = require("../services/excel-import.service");

class ExcelImportController {
  importExcel(req, res) {
    const result = ExcelImportService.importExcel(req.files);

    return res.json({
      success: true,
      files: result,
    });
  }
}

module.exports = new ExcelImportController();
