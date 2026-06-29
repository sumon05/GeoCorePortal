function getValueByLabel(rows, label) {
  for (const row of rows) {
    const index = row.indexOf(label);

    if (index !== -1) {
      return row[index + 1] ?? "";
    }
  }

  return "";
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
      editedOn: DateUtils.excelDateToString(getValueByLabel(rows, "Datum:")),
    };
  },
};
