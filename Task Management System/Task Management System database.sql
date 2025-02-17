CREATE DATABASE auth_db;
USE auth_db;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(20),
  password VARCHAR(255),
  login_time TIMESTAMP NULL,
  logout_time TIMESTAMP NULL,
  status ENUM('active', 'inactive') DEFAULT 'inactive'
);
