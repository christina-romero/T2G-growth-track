# Turning on accounts (Supabase) — ~5 minutes

The app ships in **anonymous "local mode"** until you complete these steps. When you paste your keys
into `src/supabaseConfig.ts` and push, **email login + per-user progress + the admin dashboard turn
on automatically**.

## 1. Create a Supabase project
1. Go to https://supabase.com → sign in → **New project**.
2. Name it (e.g. `t2g-growth-track`), set a database password, pick a region, create it. Wait ~1 min.

## 2. Create the database tables
1. In the project: **SQL Editor → New query**.
2. Open [`db/schema.sql`](db/schema.sql) from this repo, copy the whole file, paste it, and click **Run**.
   - This creates `profiles` + `user_progress`, a signup trigger, an `is_admin()` helper, and Row
     Level Security so each teacher can only see their own progress (admins see everyone).

## 3. (Recommended) Make signups instant
By default Supabase emails a confirmation link before a new account can sign in.
- For the smoothest experience: **Authentication → Providers → Email →** turn **off**
  "Confirm email" → Save. New teachers can then sign in immediately.
- If you leave it **on**, that's fine — teachers just confirm via the email they receive first.

## 4. Get your two keys
**Project Settings → API**, copy:
- **Project URL** (looks like `https://abcdxyz.supabase.co`)
- **anon public** key (a long `eyJ...` string — this is safe to commit; it's meant for the browser)

> Do **not** copy the `service_role` key. It must never be committed.

## 5. Give the keys to me (or paste them yourself)
Paste both values into [`src/supabaseConfig.ts`](src/supabaseConfig.ts):

```ts
export const SUPABASE_URL = 'https://abcdxyz.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJ...your-anon-key...'
```

Then commit + push (or just send me the two values and I'll do it). On deploy, the login screen
appears and progress starts saving to each teacher's account.

## 6. Make yourself the admin
1. Open the live site, **sign up** with your email once.
2. Back in Supabase **SQL Editor**, run:
   ```sql
   update public.profiles set role = 'admin'
   where email = 'christina.romero@2hourlearning.com';
   ```
3. Refresh the app — an **Admin** link appears in the nav, showing every teacher's progress.

---

### What changes for teachers
- They sign up / sign in with email + password.
- Progress saves to their account and follows them across devices/browsers.
- Everything else (the 7-step modules, shuffled answers, certification) works exactly the same.

### Security notes
- The **anon key is public by design**; data is protected by Row Level Security (a teacher can only
  read/write their own `user_progress` row; only `is_admin()` users can read all rows).
- GitHub Pages is static, so there's no server secret to leak — all access goes through Supabase
  with RLS enforced server-side.
