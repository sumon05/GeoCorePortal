const db = require("../database/db");

const Project = require("../models/project.model");
const Borehole = require("../models/borehole.model");
const GeologicalInterval = require("../models/geological-interval.model");

const ProjectRepository = require("../repositories/project.repository");
const BoreholeRepository = require("../repositories/borehole.repository");
const GeologicalIntervalRepository = require("../repositories/geological-interval.repository");

class ExcelPersistenceService {
  async saveImport(importResult) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const project = new Project(importResult.project);

      project.validate();

      const savedProject = await ProjectRepository.create(project, client);
      for (const file of importResult.files) {
        for (const parsedBorehole of file.boreholes) {
          // We'll create one Borehole here
          const metadata = parsedBorehole.metadata;

          const borehole = new Borehole({
            projectId: savedProject.projectId,
            boreholeCode: metadata.id,
            drillingCompany: metadata.company,
            drillingRig: metadata.drillingRig,
            totalDepth: metadata.totalDepth,
            coordinateSystem: metadata.coordinateSystem,
            easting: metadata.coordinates?.easting,
            northing: metadata.coordinates?.northing,
            elevation: metadata.elevation,
            remarks: metadata.remark,
          });

          borehole.validate();
          const savedBorehole = await BoreholeRepository.create(borehole, client);

          for (const intervalData of parsedBorehole.intervals) {
            const interval = new GeologicalInterval({
              boreholeId: savedBorehole.id,

              fromDepth: intervalData.fromDepth,
              toDepth: intervalData.toDepth,

              classification: intervalData.classification,
              lithology: intervalData.lithology,
              crystallinity: intervalData.crystallinity,
              mineralContent: intervalData.mineralContent,
              texture: intervalData.texture,
              structures: intervalData.structures,
              alteration: intervalData.alteration,
              remark: intervalData.remark,
            });

            interval.validate();

            const savedInterval = await GeologicalIntervalRepository.create(interval, client);

            // console.log(`Saved interval ${savedInterval.fromDepth} - ${savedInterval.toDepth}`);
          }
        }
      }

      await client.query("COMMIT");

      return {
        success: true,
        project: savedProject,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new ExcelPersistenceService();
