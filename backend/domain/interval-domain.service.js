class IntervalDomainService {
  findOverlaps(intervals) {
    const sorted = [...intervals].sort((a, b) => a.fromDepth - b.fromDepth);
    const overlaps = [];

    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].toDepth > sorted[i + 1].fromDepth) {
        overlaps.push({
          first: sorted[i],
          second: sorted[i + 1],
        });
      }
    }

    return overlaps;
  }
  findGaps(intervals) {
    const sorted = [...intervals].sort((a, b) => a.fromDepth - b.fromDepth);
    const gaps = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      if (current.toDepth < next.fromDepth) {
        gaps.push({
          fromDepth: current.toDepth,
          toDepth: next.fromDepth,
        });
      }
    }
    return gaps;
  }

  calculateCoveredDepth(intervals) {
    let coveredDepth = 0;
    intervals.forEach((interval) => {
      coveredDepth += interval.toDepth - interval.fromDepth;
    });
    return coveredDepth;
  }

  calculateTotalDepth(intervals) {
    if (intervals.length === 0) {
      return 0;
    }
    return Math.max(...intervals.map((i) => i.toDepth));
  }

  calculateCoverage(intervals) {
    const coveredDepth = this.calculateCoveredDepth(intervals);
    const totalDepth = this.calculateTotalDepth(intervals);
    return totalDepth > 0 ? Number(((coveredDepth / totalDepth) * 100).toFixed(2)) : 0;
  }

  validateIntervals(intervals) {
    const overlaps = this.findOverlaps(intervals);
    const gaps = this.findGaps(intervals);
    const coveredDepth = this.calculateCoveredDepth(intervals);
    const totalDepth = this.calculateTotalDepth(intervals);
    const coverage = this.calculateCoverage(intervals);
    return {
      valid: overlaps.length === 0,
      warnings: {
        gaps: gaps.length > 0 ? { type: "GAP", count: gaps.length } : null,
      },

      overlaps: overlaps.length > 0 ? { type: "OVERLAP", count: overlaps.length } : null,

      gaps,

      coveredDepth,

      totalDepth,

      coverage,
    };
  }
}
module.exports = new IntervalDomainService();
