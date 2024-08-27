CREATE TABLE IF NOT EXISTS actions (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    suggested_frequency JSONB,
    estimated_starting_cost DECIMAL(10, 2),
    estimated_ending_cost DECIMAL(10, 2)
);
