const DateUtils = require("../utils/date-utils");
function findValueByLabel(rows, label) {
  for (const row of rows) {
    const index = row.indexOf(label);

    if (index !== -1) {
      return row[index + 1] ?? "";
    }
  }

  return "";
}
function parseCoordinate(coordinateString) {
  if (!coordinateString) {
    return null;
  }

  const parts = coordinateString.split(",");

  if (parts.length !== 2) {
    return null;
  }

  return {
    easting: parseFloat(parts[0].trim()),
    northing: parseFloat(parts[1].trim()),
  };
}

const MetadataParser = {
  parse(rows) {
    const depth = findValueByLabel(rows, "Bohrteufe:");
    const totalDepth = Number.parseFloat(String(depth).replace(",", "."));
    return {
      id: findValueByLabel(rows, "Bohrloch-ID:"),
      company: findValueByLabel(rows, "Bohrfima:"),
      drillingRig: findValueByLabel(rows, "Bohrgerät:"),

      totalDepth,

      date: findValueByLabel(rows, "Datum der Bohrung:"),
      editedBy: findValueByLabel(rows, "Bearbeiter:"),
      editedOn: DateUtils.excelDateToISO(findValueByLabel(rows, "Datum:")),

      coordinates: parseCoordinate(findValueByLabel(rows, "Koordinaten/UTM32:")),

      coordinateSystem: "EPSG:25832",

      elevation: null,

      remark: null,
    };
  },
};

module.exports = MetadataParser;
