create extension if not exists pgcrypto;
create table if not exists public.institutions (id uuid primary key default gen_random_uuid(),name text not null,type text,city text,contact_email text,contact_phone text,active boolean not null default true,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table if not exists public.repository_folders (id uuid primary key default gen_random_uuid(),institution_id uuid not null references public.institutions(id) on delete cascade,parent_id uuid references public.repository_folders(id) on delete cascade,name text not null,created_at timestamptz not null default now(),unique(institution_id,parent_id,name));
create table if not exists public.repository_documents (id uuid primary key default gen_random_uuid(),institution_id uuid not null references public.institutions(id) on delete cascade,folder_id uuid references public.repository_folders(id) on delete cascade,name text not null,storage_path text not null unique,mime_type text,size_bytes bigint,created_at timestamptz not null default now());
create index if not exists repository_folders_institution_idx on public.repository_folders(institution_id,parent_id);
create index if not exists repository_documents_institution_idx on public.repository_documents(institution_id,folder_id);
alter table public.institutions enable row level security; alter table public.repository_folders enable row level security; alter table public.repository_documents enable row level security;
-- El panel actual usa la anon key y autenticación local; estas políticas mantienen compatibilidad con ese esquema actual.
-- Cuando migres el panel a Supabase Auth, reemplázalas por políticas para usuarios autenticados/roles administrativos.
do $$ begin
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='institutions' and policyname='admin_public_institutions') then create policy admin_public_institutions on public.institutions for all to anon using(true) with check(true); end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='repository_folders' and policyname='admin_public_repository_folders') then create policy admin_public_repository_folders on public.repository_folders for all to anon using(true) with check(true); end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='repository_documents' and policyname='admin_public_repository_documents') then create policy admin_public_repository_documents on public.repository_documents for all to anon using(true) with check(true); end if;
end $$;
insert into storage.buckets(id,name,public) values('institution-documents','institution-documents',false) on conflict(id) do nothing;
do $$ begin
 if not exists(select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='admin_public_institution_documents') then create policy admin_public_institution_documents on storage.objects for all to anon using(bucket_id='institution-documents') with check(bucket_id='institution-documents'); end if;
end $$;
