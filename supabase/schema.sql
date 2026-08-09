-- ============================================================================
-- Eniola.dev — Blog comments & likes
-- Run this in the Supabase SQL editor. Enables anonymous realtime comments.
-- ============================================================================

-- Comments table (likes live on the row; a JSONB array tracks who liked,
-- so one visitor can only like a comment once).
create table if not exists public.blog_comments (
  id         uuid primary key default gen_random_uuid(),
  post_slug  text not null,
  name       text not null check (char_length(name) between 1 and 80),
  message    text not null check (char_length(message) between 1 and 2000),
  likes      integer not null default 0,
  liked_by   text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_post_idx
  on public.blog_comments (post_slug, created_at desc);

-- Comment likes table (optional normalized store if you prefer it to
-- the liked_by array; kept for compatibility with the "likes" table).
create table if not exists public.blog_likes (
  id         uuid primary key default gen_random_uuid(),
  post_slug  text not null,
  comment_id uuid references public.blog_comments (id) on delete cascade,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (comment_id, visitor_id)
);

-- Read access for everyone.
alter table public.blog_comments enable row level security;
alter table public.blog_likes    enable row level security;

drop policy if exists "comments are readable by everyone" on public.blog_comments;
create policy "comments are readable by everyone"
  on public.blog_comments for select
  using (true);

-- Anyone may post a comment (simple spam hygiene: apply a rate limit or
-- moderation queue later by adding a `moderated` column).
drop policy if exists "anyone can insert comments" on public.blog_comments;
create policy "anyone can insert comments"
  on public.blog_comments for insert
  with check (true);

-- Realtime: broadcast new comments on blog_comments.
alter publication supabase_realtime add table public.blog_comments;