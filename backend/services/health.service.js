const HealthService = {
  getStatus() {
    return {
      application: "GeoCorePortal",

      version: "2.0.0",

      status: "Running",
    };
  },
};

module.exports = HealthService;
