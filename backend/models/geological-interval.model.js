class GeologicalInterval {
  constructor({
    intervalId,
    boreholeId,
    fromDepth,
    toDepth,
    classification,
    lithology,
    crystallinity,
    mineralContent,
    texture,
    structures,
    alteration,
    remark,
  }) {
    this.intervalId = intervalId;
    this.boreholeId = boreholeId;
    this.fromDepth = fromDepth;
    this.toDepth = toDepth;
    this.classification = classification;
    this.lithology = lithology;
    this.crystallinity = crystallinity;
    this.mineralContent = mineralContent;
    this.texture = texture;
    this.structures = structures;
    this.alteration = alteration;
    this.remark = remark;
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
    if (!this.classification?.trim()) {
      throw new Error("Classification is required.");
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
      crystallinity: this.crystallinity,
      mineralContent: this.mineralContent,
      texture: this.texture,
      structures: this.structures,
      alteration: this.alteration,
      remark: this.remark,
    };
  }
}

module.exports = GeologicalInterval;
