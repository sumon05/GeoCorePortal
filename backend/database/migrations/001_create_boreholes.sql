CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS boreholes (

    borehole_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID,

    borehole_code VARCHAR(100) NOT NULL,

    drilling_company VARCHAR(255),

    drilling_rig VARCHAR(255),

    total_depth DECIMAL(8,2) NOT NULL,

    coordinate_system VARCHAR(50) NOT NULL,

    easting DOUBLE PRECISION,

    northing DOUBLE PRECISION,

    elevation DOUBLE PRECISION,

    remarks TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);