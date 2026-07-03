const StatisticsPanel = {
  render(boreholes) {
    const total = boreholes.length;

    let maxDepth = 0;
    let totalDepth = 0;

    const companies = new Set();

    boreholes.forEach((borehole) => {
      const depth = parseFloat(borehole.metadata.depth) || 0;

      totalDepth += depth;

      if (depth > maxDepth) {
        maxDepth = depth;
      }

      if (borehole.metadata.company) {
        companies.add(borehole.metadata.company);
      }
    });

    const average = total === 0 ? 0 : totalDepth / total;

    $("#statisticsPanel").html(`
    
<div class="row g-2">

    <div class="col-6">
        <div class="card statistic-card">
            <div class="card-body text-center">
                <h3>📍${total}</h3>
                <small>Boreholes</small>
            </div>
        </div>
    </div>

    <div class="col-6">
        <div class="card statistic-card">
            <div class="card-body text-center">
                <h3>🏢${companies.size}</h3>
                <small>Companies</small>
            </div>
        </div>
    </div>

    <div class="col-6">
        <div class="card statistic-card">
            <div class="card-body text-center">
                <h3>📏${average.toFixed(1)}</h3>
                <small>Avg. Depth (m)</small>
            </div>
        </div>
    </div>

    <div class="col-6">
        <div class="card statistic-card">
            <div class="card-body text-center">
                <h3>⛰${maxDepth.toFixed(1)}</h3>
                <small>Max. Depth (m)</small>
            </div>
        </div>
    </div>

</div>

`);
  },
};

window.StatisticsPanel = StatisticsPanel;
