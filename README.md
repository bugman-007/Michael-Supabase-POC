````markdown
# Supabase Realtime POC

## Setup

1. Install dependencies:

```bash
npm install
# or
yarn
````

2. Create `.env` with your Supabase project info:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Run dev server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser at `http://localhost:5173` (default Vite port).

## Features

* Realtime updates from Supabase `readings` table
* Auto-generated fake readings every 5 seconds for demo
* Fully TypeScript-safe

## Notes

* Make sure your Supabase table `readings` exists with columns: `id`, `asset_id`, `session_id`, `value`, `recorded_at`
* RLS policies should be configured as requested for viewer/admin roles

```

---

✅ With this setup, you can:

1. Push the full repo to GitHub.  
2. Deploy to **Vercel/Netlify** using the `.env` values.  
3. Send the **live demo link** to the client showing realtime updates.  

---

If you want, I can now **write the exact step-by-step deployment guide for Vercel**, including setting environment variables so your live demo works without any setup by the client.  

Do you want me to do that next?
```