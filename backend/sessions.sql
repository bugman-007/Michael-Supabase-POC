create table if not exists sessions (
    id uuid primary key default gen_random_uuid(),
    asset_id uuid not null references assets(id) on delete cascade,
    started_at timestamptz not null default now(),
    ended_at timestamptz
);
