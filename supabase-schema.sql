-- Our Little Castle: initial secure identity + presence schema
-- Run in Supabase SQL Editor only after creating the two user accounts.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (display_name in ('نگار','آوین')),
  created_at timestamptz not null default now()
);
create table if not exists public.user_presence (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'away' check (status in ('online','sleep','away')),
  last_seen_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.user_presence enable row level security;
create policy "profiles readable by authenticated pair" on public.profiles
  for select to authenticated using (true);
create policy "profile owner inserts own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profile owner updates own profile" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "presence readable by authenticated pair" on public.user_presence
  for select to authenticated using (true);
create policy "presence owner writes own row" on public.user_presence
  for insert to authenticated with check (auth.uid() = user_id);
create policy "presence owner updates own row" on public.user_presence
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter publication supabase_realtime add table public.user_presence;
