$("#importBtn").click(function () {
  const file = $("#excelFile")[0].files[0];

  if (!file) {
    alert("Bitte Excel-Datei wählen");
    return;
  }

  function showDetails(interval) {
    let html = "";

    Object.entries(interval).forEach(([key, value]) => {
      html += `
       <div class="detail-row">
       
       <strong>${key}</strong>
       
       <br>
       
       ${value ?? ""}
       
       </div>
       
       <hr>
       
       `;
    });

    $("#detailPanel").html(html);
  }

  function renderTable(intervals) {
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

        showDetails(interval);
      });

      tbody.append(tr);
    });
  }

  ExcelReader.read(file, function (rows) {
    console.log("Raw Excel:");
    console.table(rows);

    // Find header row
    const headerIndex = rows.findIndex(
      (row) => row.includes("Teufe [m]") && row.includes("Lithologie"),
    );

    if (headerIndex === -1) {
      alert("Header-Zeile nicht gefunden!");

      return;
    }

    console.log("Header gefunden in Zeile:", headerIndex);

    const headers = rows[headerIndex];

    console.log("Headers:");
    console.table(headers);

    // Data rows below header
    const dataRows = rows.slice(headerIndex + 1);

    // Remove empty rows
    const validRows = dataRows.filter((row) => row[0]);

    console.log("Valid Rows:");
    console.table(validRows);

    // Convert rows into objects dynamically
    const intervals = validRows.map((row) => {
      return Object.fromEntries(
        headers.map((header, index) => [header, row[index]]),
      );
    });

    console.log("Intervals:");
    console.table(intervals);
    renderTable(intervals);
  });
});
