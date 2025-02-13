-- MySQL Schema and Queries

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL
);

ALTER TABLE users MODIFY password VARCHAR(255);

-- Insert new user (Registration)
INSERT INTO users (name, email, password, role) 
VALUES ('John Doe', 'john@example.com', SHA2('password123', 256), 'USER');

-- Fetch all users
SELECT * FROM users;

-- Update user details
UPDATE users 
SET name = 'Jane Doe', email = 'jane@example.com' 
WHERE id = 1;

-- Delete a user
DELETE FROM users WHERE id = 1;

-- JWT Authentication Token Storage
CREATE TABLE tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token TEXT NOT NULL,
    expiry TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
