const TableRenderer = {
  render: function (intervals) {
    const thead = $("#logTable thead");

    const tbody = $("#logTable tbody");

    thead.empty();
    tbody.empty();

    const headers = Object.keys(intervals[0]);

    let headerRow = "<tr>";

    headers.forEach((header) => {
      headerRow += `<th>${header}</th>`;
    });

    headerRow += "</tr>";

    thead.append(headerRow);

    intervals.forEach((interval) => {
      const tr = $("<tr>");

      headers.forEach((header) => {
        tr.append(`<td>${interval[header] ?? ""}</td>`);
      });

      tr.on("click", function () {
        $("#logTable tr").removeClass("selected");

        $(this).addClass("selected");

        DetailPanel.show(interval);
      });

      tbody.append(tr);
    });
  },
};
window.TableRenderer = TableRenderer;
