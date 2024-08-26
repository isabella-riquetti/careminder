CREATE TABLE IF NOT EXISTS actions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    frequency VARCHAR(50),
    estimated_cost DECIMAL(10, 2)
);
