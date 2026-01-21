create table if not exists public.messages (
  id bigserial primary key,
  sender text not null,
  text text,
  created_at timestamptz default now(),
  avatar text,
  file_url text,
  reply_to bigint references public.messages(id) on delete set null
);
