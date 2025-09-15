-- Seed Assets
insert into assets (name, description) values
('Sensor A', 'Test sensor A'),
('Sensor B', 'Test sensor B');

-- Seed Sessions
insert into sessions (asset_id, started_at) 
select id, now() from assets;

-- Seed Readings
insert into readings (session_id, asset_id, value, recorded_at)
select s.id, a.id, random()*100, now()
from sessions s
join assets a on a.id = s.asset_id;
