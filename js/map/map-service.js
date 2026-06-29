const MapService = {
  map: null,

  init() {
    if (this.map) {
      return;
    }

    this.map = L.map("map");

    this.map.setView([49.0069, 8.4037], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);
  },
};

window.MapService = MapService;
