const Response = {
  success(res, data, status = 200) {
    return res.status(status).json({
      success: true,
      data,
    });
  },

  created(res, data) {
    return res.status(201).json({
      success: true,
      data,
    });
  },

  notFound(res, entity) {
    return res.status(404).json({
      success: false,
      message: `${entity} not found.`,
    });
  },
  deleted(res, entity) {
    return res.status(200).json({
      success: true,
      message: `${entity} deleted successfully.`,
    });
  },

  badRequest(res, message) {
    return res.status(400).json({
      success: false,
      message,
    });
  },

  forbidden(res, message = "Forbidden") {
    return res.status(403).json({
      success: false,
      message,
    });
  },

  serverError(res, message = "Internal Server Error") {
    return res.status(500).json({
      success: false,
      message,
    });
  },
};

module.exports = Response;
