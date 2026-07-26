class Borehole {
  constructor({
    id,
    projectId,
    boreholeCode,
    drillingCompany,
    drillingRig,
    totalDepth,
    coordinateSystem = "EPSG:25832",
    easting,
    northing,
    elevation,
    remarks,
  }) {
    this.id = id;

    this.projectId = projectId;

    this.boreholeCode = boreholeCode;

    this.drillingCompany = drillingCompany;

    this.drillingRig = drillingRig;

    this.totalDepth = totalDepth;

    this.coordinateSystem = coordinateSystem;

    this.easting = easting;

    this.northing = northing;

    this.elevation = elevation;

    this.remarks = remarks;
  }
  validate() {
    if (!this.boreholeCode) throw new Error("Borehole code is required.");

    if (typeof this.totalDepth !== "number" || this.totalDepth <= 0) {
      throw new Error("Depth must be greater than zero.");
    }

    if (!this.coordinateSystem) throw new Error("Coordinate system is required.");

    if (!this.projectId) {
      throw new Error("Project ID is required.");
    }
  }
  getCoordinates() {
    return {
      easting: this.easting,
      northing: this.northing,
      elevation: this.elevation,
    };
  }
  getLocation() {
    return `${this.easting}, ${this.northing}`;
  }
  hasCoordinates() {
    return this.easting !== undefined && this.northing !== undefined;
  }
  hasElevation() {
    return this.elevation !== undefined;
  }
  getDepth() {
    return this.totalDepth;
  }
  isDeepBorehole() {
    return this.totalDepth >= 100;
  }
  toJSON() {
    return {
      id: this.id,

      projectId: this.projectId,

      boreholeCode: this.boreholeCode,

      drillingCompany: this.drillingCompany,

      drillingRig: this.drillingRig,

      totalDepth: this.totalDepth,

      coordinateSystem: this.coordinateSystem,

      easting: this.easting,

      northing: this.northing,

      elevation: this.elevation,

      remarks: this.remarks,
    };
  }
  isValidCoordinateSystem() {
    return ["UTM32", "EPSG:25832", "WGS84"].includes(this.coordinateSystem);
  }
  getDisplayName() {
    return `${this.boreholeCode} (${this.drillingCompany})`;
  }
}

module.exports = Borehole;
