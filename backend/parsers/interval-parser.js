const IntervalParser = {
  parse(rows) {
    // Find the header row
    const headerIndex = rows.findIndex(
      (row) => row.includes("Teufe [m]") && row.includes("Lithologie"),
    );

    if (headerIndex === -1) {
      throw new Error("Interval table header not found.");
    }

    // Read header row
    const headers = rows[headerIndex];

    // Build a lookup map for header names
    const headerMap = Object.fromEntries(headers.map((header, index) => [header, index]));

    // Read interval rows
    const dataRows = rows.slice(headerIndex + 1);

    // Keep only rows that contain a depth range
    const validRows = dataRows.filter((row) => typeof row[0] === "string" && row[0].includes("-"));

    // Helper to safely read a column by its header
    const get = (row, headerName) => {
      return row[headerMap[headerName]] ?? "";
    };

    // Helper to parse depth ranges like "0,0-0,7"
    function parseDepthRange(depthRange) {
      const parts = depthRange.split("-");

      if (parts.length !== 2) {
        throw new Error(`Invalid depth range: ${depthRange}`);
      }

      return {
        fromDepth: parseFloat(parts[0].replace(",", ".")),
        toDepth: parseFloat(parts[1].replace(",", ".")),
      };
    }

    // Convert Excel rows into domain objects
    return validRows.map((row) => {
      const depth = parseDepthRange(row[0]);

      return {
        fromDepth: depth.fromDepth,
        toDepth: depth.toDepth,

        classification: get(row, "Klassifizierung"),

        lithology: get(row, "Lithologie"),

        crystallinity: get(row, "Kristallinität"),

        mineralContent: get(row, "Mineralbestand"),

        texture: get(row, "Gefüge (Ansprache, Textur)"),

        structures: get(row, "Strukturen"),

        alteration: get(row, "Alteration/Mineralisierung"),

        remark: get(row, "Bemerkung"),
      };
    });
  },
};

module.exports = IntervalParser;
