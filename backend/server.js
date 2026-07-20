require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

// const PORT = 3000;
const PORT = process.env.PORT;
const healthRoutes = require("./routes/health.routes");
const boreholeRoutes = require("./routes/borehole.routes");
const projectRoutes = require("./routes/project.routes");
const geologicalIntervalRoutes = require("./routes/geological-interval.routes");
const excelImportRoutes = require("./routes/excel-import.routes");
const errorHandler = require("./middleware/error-handler.middleware");

app.use("/api/health", healthRoutes);
app.use("/api/boreholes", boreholeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/geological-intervals", geologicalIntervalRoutes);
app.use("/api/import", excelImportRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} Backend started on port ${PORT}`);
});
