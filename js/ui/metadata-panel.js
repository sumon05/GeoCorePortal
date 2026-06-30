const MetadataPanel = {
  labels: {
    id: "Bohrloch-ID",
    company: "Bohrfirma",
    drillingMachine: "Bohrgerät",
    depth: "Bohrtiefe",
    date: "Bohrdatum",
    editedBy: "Bearbeiter",
    editedOn: "Bearbeitet am",
    location: "Koordinaten (UTM32)",
  },
  formatValue(key, value) {
    if (key === "location" && value) {
      return `${value.easting}, ${value.northing}`;
    }

    return value ?? "";
  },

  render(metadata) {
    if (!metadata) {
      $("#metadataPanel").html("<p>Keine Metadaten vorhanden.</p>");
      return;
    }

    let html = `
      <table class="metadata-table">
        <tbody>
    `;

    Object.entries(metadata).forEach(([key, value]) => {
      /* if (key === "location" && value) {
        value = `${"Easting:"}${value.easting}, ${"Northing:"}${value.northing}`;
      } */

      html += `
        <tr>
          <th>${this.labels[key] ?? key}</th>
          <td>${this.formatValue(key, value) || "-"}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    $("#metadataPanel").html(html);
  },
};

window.MetadataPanel = MetadataPanel;
