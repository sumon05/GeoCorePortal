const XLSX = require("xlsx");

const DateUtils = {
  excelDateToISO(excelDate) {
    if (typeof excelDate !== "number") {
      return excelDate;
    }

    const date = XLSX.SSF.parse_date_code(excelDate);

    return `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
  },

  excelDateToDisplay(excelDate) {
    if (typeof excelDate !== "number") {
      return excelDate;
    }

    const date = XLSX.SSF.parse_date_code(excelDate);

    return `${String(date.d).padStart(2, "0")}/${String(date.m).padStart(2, "0")}/${date.y}`;
  },
};

module.exports = DateUtils;
