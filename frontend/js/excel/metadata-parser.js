function getValueByLabel(rows, label) {
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
    return {
      id: getValueByLabel(rows, "Bohrloch-ID:"),
      company: getValueByLabel(rows, "Bohrfima:"),
      drillingMachine: getValueByLabel(rows, "Bohrgerät:"),
      depth: getValueByLabel(rows, "Bohrteufe:"),
      date: getValueByLabel(rows, "Datum der Bohrung:"),
      editedBy: getValueByLabel(rows, "Bearbeiter:"),
      editedOn: DateUtils.excelDateToDisplay(getValueByLabel(rows, "Datum:")),
      location: parseCoordinate(getValueByLabel(rows, "Koordinaten/UTM32:")),
    };
  },
};
