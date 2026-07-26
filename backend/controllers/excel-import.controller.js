const ExcelImportService = require("../services/excel-import.service");

class ExcelImportController {
  async importExcel(req, res) {
    const result = await ExcelImportService.importExcel(req.files);

    return res.json({
      success: true,
      ...result,
    });
  }
}

module.exports = new ExcelImportController();
