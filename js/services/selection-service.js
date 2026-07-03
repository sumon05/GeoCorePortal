const SelectionService = {
  selectedBorehole: null,
  select(borehole) {
    this.selectedBorehole = borehole;
    BoreholeList.highlight(borehole.metadata.id);
    MetadataPanel.render(borehole.metadata);
    TableRenderer.render(borehole.intervals);
    MapService.zoomToMarker(borehole.marker);
  },
};

window.SelectionService = SelectionService;
