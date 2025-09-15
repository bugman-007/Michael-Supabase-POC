# Supabase POC - Trial Slice

This is a minimal proof-of-concept (POC) demonstrating:

- Supabase/Postgres database with **3 tables**: Assets, Sessions, Readings
- **Realtime updates** of sensor readings in a React frontend
- **Supabase Auth + RLS** (roles: viewer/admin)
- Seeded **mock data** for testing
- **Dockerized setup** for easy local development

---

## **Project Structure**
```supabase-poc/
├── backend/ # SQL schema & seed scripts
│ ├── assets.sql
│ ├── sessions.sql
│ ├── readings.sql
│ └── seed.sql
├── frontend/ # React + TypeScript frontend
│ ├── src/
│ │ ├── App.tsx
│ │ └── index.tsx
│ ├── package.json
│ └── tsconfig.json
├── docker-compose.yml
├── README.md
└── ERD.png # Database diagram
```

---

## **Setup & Run**

### 1. Start Docker containers

```bash
docker compose up
```

### **2. Backend (DB)**

Run the SQL schema and seed scripts to populate the tables:

```
psql -h localhost -U postgres -d postgres -f backend/assets.sql
psql -h localhost -U postgres -d postgres -f backend/sessions.sql
psql -h localhost -U postgres -d backend/readings.sql
psql -h localhost -U postgres -d backend/seed.sql
```

This will create tables and insert mock data

### **3. Frontend**
```
cd frontend
npm install
npm run dev
```

Open your browser: http://localhost:5173

You’ll see a table updating realtime with mock readings


### **Notes**

- Minimal UI: only to prove the flow works

- Realtime is implemented using Supabase subscriptions

- Schema is designed for expandability (CSV export, full auth UI) in the next phase

- Roles: viewer (read-only), admin (read/insert/delete) via RLS