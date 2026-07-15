const BoreholeList = {
  render(boreholes) {
    $("#boreholeList").empty();

    boreholes.forEach((borehole) => {
      const card = $(`
        <div class="card mb-2 borehole-card">

          <div class="card-body">

            <h6 class="card-title">
              📍 ${borehole.metadata.id}
            </h6>

            <p class="mb-1">
              🏢 ${borehole.metadata.company || "Unknown"}
            </p>

            <small>
              📏 ${borehole.metadata.depth || "-"}
            </small>

          </div>

        </div>
      `);
      card.attr("data-id", borehole.metadata.id);

      card.on("click", function () {
        SelectionService.select(borehole);
      });

      $("#boreholeList").append(card);
    });
  },
  highlight(id) {
    $(".borehole-card").removeClass("selected");

    $(".borehole-card").each(function () {
      const cardId = $(this).data("id");

      if (cardId === id) {
        $(this).addClass("selected");
      }
    });
  },
};

window.BoreholeList = BoreholeList;
