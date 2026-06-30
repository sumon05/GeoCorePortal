const BoreholeList = {
  render(boreholes) {
    const list = $("<ul>");

    boreholes.forEach((borehole) => {
      const item = $("<li>");

      item.text(borehole.metadata.id);

      item.on("click", function () {
        SelectionService.select(borehole);
      });

      list.append(item);
    });

    $("#boreholeList").empty().append(list);
  },
};

window.BoreholeList = BoreholeList;
