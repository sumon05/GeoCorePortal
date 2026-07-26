CREATE TABLE geological_intervals (

    interval_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    borehole_id UUID NOT NULL,

    from_depth NUMERIC(10,2) NOT NULL,

    to_depth NUMERIC(10,2) NOT NULL,

    classification VARCHAR(100),

    lithology VARCHAR(100) NOT NULL,

    crystallinity VARCHAR(100),

    mineral_content VARCHAR(100),

    texture VARCHAR(255),

    structures VARCHAR(255),

    alteration VARCHAR(100),

    remark TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_interval_borehole
        FOREIGN KEY (borehole_id)
        REFERENCES boreholes(borehole_id)
        ON DELETE CASCADE
);