CREATE TABLE IF NOT EXISTS user_actions (
    id SERIAL PRIMARY KEY,
    group_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    action_id INT8 NOT NULL,
    all_day BOOLEAN NOT NULL,
    start_at timestamptz NOT NULL,
    end_at timestamptz NOT NULL
);
