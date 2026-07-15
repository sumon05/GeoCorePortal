proj4.defs(
  "EPSG:25832",
  "+proj=utm +zone=32 +ellps=GRS80 +datum=ETRS89 +units=m +no_defs +type=crs",
);
console.log(proj4.defs("EPSG:25832"));
proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs +type=crs");
const CoordinateService = {
  toLatLng(location) {
    if (!location) {
      return null;
    }

    const utm32 = "EPSG:25832";

    const wgs84 = "EPSG:4326";
    console.log(proj4.defs("EPSG:25832"));
    const result = proj4(
      utm32,

      wgs84,

      [location.easting, location.northing],
    );

    return {
      lng: result[0],

      lat: result[1],
    };
  },
};

window.CoordinateService = CoordinateService;
