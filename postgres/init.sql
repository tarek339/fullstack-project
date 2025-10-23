-- Initialize database with basic setup
-- This script runs when the PostgreSQL container starts for the first time

-- Create additional databases if needed
-- CREATE DATABASE fullstack_test;

-- Create extensions if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant permissions
-- GRANT ALL PRIVILEGES ON DATABASE fullstack_dev TO dev_user;
-- GRANT ALL PRIVILEGES ON DATABASE fullstack_prod TO prod_user;

-- You can add your initial schema and seed data here
-- Example:
-- CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO users (email, name) VALUES
-- ('admin@example.com', 'Admin User'),
-- ('user@example.com', 'Regular User');

\echo 'Database initialization completed successfully!';