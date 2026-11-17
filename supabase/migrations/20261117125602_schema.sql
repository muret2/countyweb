create type public.app_role as enum ('student','officer','admin');
create type public.application_status as enum
  ('draft','submitted','under_review','shortlisted','approved','rejected','withdrawn');
create type public.placement_type as enum ('attachment','internship');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, phone text, national_id text, institution text,
  course text, reg_number text, year_of_study text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now()
);

create table public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null, description text,
  slots int not null default 0,
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  department_id uuid references public.departments(id),
  placement_type public.placement_type not null default 'attachment',
  status public.application_status not null default 'draft',
  motivation text, start_date date, end_date date,
  review_notes text, reviewed_by uuid, reviewed_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  user_id uuid not null,
  doc_type text not null, file_name text, file_path text not null,
  created_at timestamptz not null default now()
);

create function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles
                 where user_id = _user_id and role in ('officer','admin'))
$$;
