-- Database initialization script
-- Creates the database and user for AdyX E-commerce platform

CREATE USER IF NOT EXISTS adyx_user WITH PASSWORD 'secure_password_123';
CREATE DATABASE IF NOT EXISTS adyx_ecommerce;
GRANT ALL PRIVILEGES ON DATABASE adyx_ecommerce TO adyx_user;
