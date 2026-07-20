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
    return {
      id: findValueByLabel(rows, "Bohrloch-ID:"),
      company: findValueByLabel(rows, "Bohrfima:"),
      drillingMachine: findValueByLabel(rows, "Bohrgerät:"),
      depth: findValueByLabel(rows, "Bohrteufe:"),
      date: findValueByLabel(rows, "Datum der Bohrung:"),
      editedBy: findValueByLabel(rows, "Bearbeiter:"),
      editedOn: findValueByLabel(rows, "Datum:"),
      location: parseCoordinate(findValueByLabel(rows, "Koordinaten/UTM32:")),
    };
  },
};

module.exports = MetadataParser;
