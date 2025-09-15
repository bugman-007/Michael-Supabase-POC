create table if not exists assets (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    created_at timestamptz not null default now()
);
