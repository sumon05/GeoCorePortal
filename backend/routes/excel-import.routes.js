const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const ExcelImportController = require("../controllers/excel-import.controller");

// Upload multiple Excel files
router.post(
  "/excel",
  upload.array("files", 50), // maximum 50 files
  ExcelImportController.importExcel,
);

module.exports = router;
