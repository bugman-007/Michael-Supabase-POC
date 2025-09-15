create table readings (
    id uuid primary key default gen_random_uuid(),
    session_id uuid not null references sessions(id) on delete cascade,
    asset_id uuid not null references assets(id) on delete cascade,
    value double precision not null,
    recorded_at timestamptz not null default now()
);
