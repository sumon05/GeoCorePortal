const IntervalParser = {
  parse(rows) {
    const headerIndex = rows.findIndex(
      (row) => row.includes("Teufe [m]") && row.includes("Lithologie"),
    );

    if (headerIndex === -1) {
      throw new Error("Header row not found.");
    }

    const headers = rows[headerIndex];

    const dataRows = rows.slice(headerIndex + 1);

    // Remove empty rows
    const validRows = dataRows.filter((row) => row[0]);

    // Convert rows into objects dynamically
    const intervals = validRows.map((row) => {
      return Object.fromEntries(
        headers.map((header, index) => [header, row[index]]),
      );
    });
    return intervals;
  },
};
window.IntervalParser = IntervalParser;
