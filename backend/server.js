require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

// const PORT = 3000;
const PORT = process.env.PORT;
const healthRoutes = require("./routes/health.routes");
const boreholeRoutes = require("./routes/borehole.routes");
const errorHandler = require("./middleware/error-handler.middleware");

app.use("/api/health", healthRoutes);
app.use("/api/boreholes", boreholeRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} started on port ${PORT}`);
});
