-- enum types
DO $$ BEGIN
    CREATE TYPE realms AS (behaviorism, gestalt, tsc);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- User Management
-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone not null default now(),
  display_name text not null unique default EMPTY,
  avatar_url text not null default EMPTY,
  email text not null,
  accepted_ranking boolean not null default false,
  xp numeric not null default '0'::numeric,

  constraint display_name_length check (char_length(display_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table if exists profiles
  enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url, email)
  values (new.id, new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'avatar_url', new.email)
  on conflict (id) do update
  set (display_name, avatar_url, email) = (new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'avatar_url', new.email);
  return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute procedure public.handle_new_user();

creates table if not exists library_blogs (
  id bigint primary key generated always as identity,
  title text not null,
  markdown text not null,
  slug text not null unique,
  category text not null
)

-- setup RLS
alter table if exists subjects
  enable row level security;

drop policy if exists "Users can select blogs" on public.library_blogs;
create policy "Users can select blogs" on library_blogs
  for select using (true);

-- Exrcise related tables
-- tema
create table if not exists subjects (
  id bigint primary key generated always as identity,
  name text not null default ''::text,
  realm realms not null default 'behaviorism'::realms,
  description text not null default ''::text,
  orientation text not null default ''::text,
  slug text references public.library_blogs on delete do nothing not null
);
-- setup RLS
alter table if exists subjects
  enable row level security;

drop policy if exists "Users can select subjects" on public.subjects;
create policy "Users can select subjects" on subjects
  for select using (true);

-- modules
create table if not exists modules (
  id bigint primary key generated always as identity,
  subject_id bigint references public.subjects.id not null
);
-- setup RLS
alter table if exists modules
  enable row level security;

drop policy if exists "Users can select modules" on public.modules;
create policy "Users can select modules" on modules
  for select using (true);

-- User study progress
create table if not exists user_completed_modules (
  id bigint primary key generated always as identity,
  user_id uuid references public.profiles.id on delete cascade not null default (auth.uid()),
  module_id bigint references public.modules.id on delete cascade not null,
  subject_id bigint references public.subjects.id on delete cascade not null,
  completed boolean not null default false,
  realm realms not null default 'behaviorism'::realms
);

-- setup RLS
alter table if exists user_completed_modules
  enable row level security;

drop policy if exists "Users view their progress" on public.user_completed_modules;
create policy "Users view their progress" on user_completed_modules
  for select using ((select auth.uid()) = id);

drop policy if exists "Users can insert their own progress" on public.user_completed_modules;
create policy "Users can insert their own progress" on user_completed_modules
  for insert with check ((select auth.uid()) = id);

drop policy if exists "Users can update own progress" on public.user_completed_modules;
create policy "Users can update own progress" on user_completed_modules
  for update using ((select auth.uid()) = id);

-- exercises
create table if not exists exercises (
  id bigint primary key generated always as identity,
  module_id bigint references public.modules.id on delete cascade not null,
  question text not null default ''::text,
  options text[] not null default '{""}'::text[],
  answer bigint not null default '0'::bigint,
  explanation text not null default ''::text
);
-- setup RLS
alter table if exists exercises
  enable row level security;

drop policy if exists "Users can select exercises" on public.exercises;
create policy "Users can select exercises" on exercises
  for select using (true);

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('profile-pictures', 'profile-pictures')
  on conflict (id) do nothing;

-- Set up access controls for storage.
drop policy if exists "Avatar images are publicly accessible." on storage.objects;
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'profile-pictures');

drop policy if exists "Anyone can upload an avatar." on storage.objects;
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'profile-pictures');

drop policy if exists "Authenticated users can delete their avatar." on storage.objects;
create policy "Authenticated users can delete their avatar." on storage.objects
  for delete using (bucket_id = 'profile-pictures' and (select auth.role()) = 'authenticated');
