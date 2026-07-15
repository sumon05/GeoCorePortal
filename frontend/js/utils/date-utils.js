const DateUtils = {
  excelDateToString(excelDate) {
    if (typeof excelDate !== "number") {
      return excelDate;
    }

    const date = XLSX.SSF.parse_date_code(excelDate);

    return `${String(date.d).padStart(2, "0")}/${String(date.m).padStart(
      2,
      "0",
    )}/${date.y}`;
  },
};

window.DateUtils = DateUtils;
