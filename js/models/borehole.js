class Borehole {
  constructor(intervals = []) {
    this.metadata = {
      id: "",

      company: "",

      coordinates: "",

      drillingDate: "",

      depth: "",

      operator: "",
    };

    this.intervals = intervals;

    this.documents = [];

    this.scans = [];
  }
}
window.Borehole = Borehole;
