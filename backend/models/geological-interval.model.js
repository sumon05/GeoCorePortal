class GeologicalInterval {
  constructor({
    intervalId,
    boreholeId,
    fromDepth,
    toDepth,
    lithology,
    weathering,
    alteration,
    strength,
    description,
  }) {
    this.intervalId = intervalId;
    this.boreholeId = boreholeId;
    this.fromDepth = fromDepth;
    this.toDepth = toDepth;
    this.lithology = lithology;
    this.weathering = weathering;
    this.alteration = alteration;
    this.strength = strength;
    this.description = description;
  }

  validate() {
    if (this.fromDepth >= this.toDepth) {
      throw new Error("From depth must be less than to depth.");
    }
    //Depth cannnot be negative
    if (this.fromDepth < 0 || this.toDepth < 0) {
      throw new Error("Depth values cannot be negative.");
    }
    //Lithology is mandetory
    if (!this.lithology?.trim()) {
      throw new Error("Lithology is required.");
    }
    if (!this.boreholeId) {
      throw new Error("Borehole ID is required.");
    }
  }
  toJSON() {
    return {
      intervalId: this.intervalId,
      boreholeId: this.boreholeId,
      fromDepth: this.fromDepth,
      toDepth: this.toDepth,
      lithology: this.lithology,
      weathering: this.weathering,
      alteration: this.alteration,
      strength: this.strength,
      description: this.description,
    };
  }
}

module.exports = GeologicalInterval;
