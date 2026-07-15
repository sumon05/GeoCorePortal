const MapService = {
  map: null,
  markers: [],
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
  addMarker(point, title) {
    if (!point) {
      return;
    }
    const marker = L.marker([point.lat, point.lng]).addTo(this.map).bindPopup(title);

    this.markers.push(marker);
    return marker;
  },
  zoomToMarker(point) {
    if (!point) {
      return;
    }

    this.map.flyTo([point.lat, point.lng], 13);
  },
  fitToMarkers() {
    if (this.markers.length === 0) {
      return;
    }

    const group = L.featureGroup(this.markers);

    this.map.fitBounds(group.getBounds());
  },
  zoomToMarker(marker) {
    if (!marker) {
      return;
    }

    this.map.flyTo(marker.getLatLng(), 14, {
      duration: 1.5,
    });

    marker.openPopup();
  },
};

window.MapService = MapService;
