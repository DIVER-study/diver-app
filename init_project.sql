-- User Management
-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone not null default now(),
  display_name text not null unique default EMPTY,
  avatar_url text not null default EMPTY,
  email text not null,
  accepted_ranking boolean not null default false,

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

-- User study progress
create table if not exists user_study_progress (
    id uuid references public.profiles on delete cascade not null primary key,
    updated_at timestamp with time zone not null default now(),
    behaviorism int not null default 0,
    gestalt int not null default 0,
    tsc int not null default 0
);

-- setup RLS
alter table if exists user_study_progress
  enable row level security;

drop policy if exists "Users view their progress" on public.user_study_progress;
create policy "Users view their progress" on user_study_progress
  for select using ((select auth.uid()) = id);

drop policy if exists "Users can insert their own progress" on public.user_study_progress;
create policy "Users can insert their own progress" on user_study_progress
  for insert with check ((select auth.uid()) = id);

drop policy if exists "Users can update own progress" on public.user_study_progress;
create policy "Users can update own progress" on user_study_progress
  for update using ((select auth.uid()) = id);

create or replace function public.handle_new_user_progress()
returns trigger
set search_path = ''
as $$
begin
  insert into public.user_study_progress (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_profile_created
  after insert or update on public.profiles
  for each row execute procedure public.handle_new_user_progress();

-- Exrcise related tables
-- tema
create table if not exists tema (
  id bigint primary key generated always as identity,
  updated_at timestamp with time zone not null default now(),
  name text not null default ''
);
-- setup RLS
alter table if exists tema
  enable row level security;

drop policy if exists "Users can select tema" on public.tema;
create policy "Users can select tema" on tema
  for select using ((select auth.role()) = 'authenticated');

-- modules
create table if not exists modules (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone not null default now(),
  name text not null default '',
  description text not null default '',
  level text not null default 'easy',
  tema_id bigint references public.tema.id not null
);
-- setup RLS
alter table if exists modules
  enable row level security;

drop policy if exists "Users can select modules" on public.modules;
create policy "Users can select modules" on modules
  for select using ((select auth.role()) = 'authenticated'));


-- exercises
create table if not exists exercises (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone not null default now(),
  module_id bigint references public.modules.id on delete cascade not null,
  question text not null default ''::text,
  options json,
  answer text not null default 'a'::text,
  explanation text not null default ''::text
);
-- setup RLS
alter table if exists exercises
  enable row level security;

drop policy if exists "Users can select exercises" on public.exercises;
create policy "Users can select exercises" on exercises
  for select using ((select auth.role()) = 'authenticated');

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
