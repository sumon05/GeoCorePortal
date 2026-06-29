const MetadataPanel = {
  labels: {
    id: "Bohrloch-ID",
    company: "Bohrfirma",
    drillingMachine: "Bohrgerät",
    depth: "Bohrtiefe",
    date: "Bohrdatum",
    editedBy: "Bearbeiter",
    editedOn: "Bearbeitet am",
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
      html += `
        <tr>
          <th>${this.labels[key] ?? key}</th>
          <td>${value || "-"}</td>
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
