CREATE TABLE IF NOT EXISTS projects (

    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_name VARCHAR(255) NOT NULL,

    client_name VARCHAR(255),

    project_location VARCHAR(255),

    project_status VARCHAR(50),

    start_date DATE,

    end_date DATE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);