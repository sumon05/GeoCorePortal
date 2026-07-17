CREATE TABLE geological_intervals (

    interval_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    borehole_id UUID NOT NULL,

    from_depth NUMERIC(10,2) NOT NULL,

    to_depth NUMERIC(10,2) NOT NULL,

    lithology VARCHAR(100) NOT NULL,

    weathering VARCHAR(100),

    alteration VARCHAR(100),

    strength VARCHAR(100),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_interval_borehole
        FOREIGN KEY (borehole_id)
        REFERENCES boreholes(borehole_id)
        ON DELETE CASCADE
);