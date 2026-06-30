const SelectionService = {
  selectedBorehole: null,

  select(borehole) {
    this.selectedBorehole = borehole;
    console.log("Selected:", borehole.metadata.id);
    MetadataPanel.render(borehole.metadata);
    TableRenderer.render(borehole.intervals);
    MapService.zoomToMarker(borehole.marker);
  },
};

window.SelectionService = SelectionService;
