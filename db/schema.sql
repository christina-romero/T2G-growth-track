-- ===========================================================================
-- T2G Growth Track — Supabase schema
-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query
-- -> paste this whole file -> Run.
-- ===========================================================================

-- ---- profiles: one row per auth user (email + role) -----------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'teacher',   -- 'teacher' | 'admin'
  created_at  timestamptz not null default now()
);

-- ---- user_progress: one JSON blob per user (mirrors the app's progress) ----
create table if not exists public.user_progress (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- ---- auto-create a profile row whenever someone signs up ------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- helper: is the current user an admin? --------------------------------
-- SECURITY DEFINER so it bypasses RLS (avoids recursive policy evaluation).
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---- Row Level Security ----------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.user_progress enable row level security;

-- profiles: a user sees/edits their own row; admins can read all
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_insert" on public.profiles;
create policy "profiles_insert" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles
  for update using (auth.uid() = id);

-- user_progress: a user reads/writes only their own; admins can read all
drop policy if exists "progress_select" on public.user_progress;
create policy "progress_select" on public.user_progress
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "progress_insert" on public.user_progress;
create policy "progress_insert" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update" on public.user_progress;
create policy "progress_update" on public.user_progress
  for update using (auth.uid() = user_id);

-- ===========================================================================
-- AFTER you have signed up once in the app, make yourself an admin by running:
--
--   update public.profiles set role = 'admin'
--   where email = 'christina.romero@2hourlearning.com';
--
-- ===========================================================================
