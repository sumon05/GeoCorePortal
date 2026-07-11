const HealthService = require("../services/health.service");

const HealthController = {
  getStatus(req, res) {
    const result = HealthService.getStatus();

    res.json(result);
  },
};

module.exports = HealthController;
