ALTER TABLE boreholes
ADD CONSTRAINT fk_borehole_project
FOREIGN KEY (project_id)
REFERENCES projects(project_id)
ON DELETE RESTRICT
ON UPDATE CASCADE;