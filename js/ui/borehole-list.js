const BoreholeList = {
  render(boreholes) {
    let html = "<ul>";

    boreholes.forEach((borehole) => {
      html += `
                <li>
                    ${borehole.metadata.id}
                </li>
            `;
    });

    html += "</ul>";

    $("#boreholeList").html(html);
  },
};

window.BoreholeList = BoreholeList;
