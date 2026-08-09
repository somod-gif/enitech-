import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/lib/config";
import type { BlogComment } from "@/types";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (!SUPABASE.url || !SUPABASE.anonKey) return null;
  if (!browserClient) {
    browserClient = createClient(SUPABASE.url, SUPABASE.anonKey, {
      auth: { persistSession: false },
    });
  }
  return browserClient;
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE.url && SUPABASE.anonKey);
}

export async function fetchComments(postSlug: string): Promise<BlogComment[]> {
  const client = getSupabaseBrowserClient();
  if (!client) return [];
  const { data, error } = await client
    .from("blog_comments")
    .select("*")
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[supabase] failed to fetch comments:", error);
    return [];
  }
  return (data ?? []) as BlogComment[];
}

export function subscribeToComments(
  postSlug: string,
  onInsert: (comment: BlogComment) => void,
) {
  const client = getSupabaseBrowserClient();
  if (!client) return () => undefined;

  const channel = client
    .channel(`comments:${postSlug}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "blog_comments",
        filter: `post_slug=eq.${postSlug}`,
      },
      (payload) => {
        onInsert(payload.new as BlogComment);
      },
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}

export async function insertComment(
  comment: { post_slug: string; name: string; message: string },
): Promise<{ ok: boolean; error?: string }> {
  const client = getSupabaseBrowserClient();
  if (!client) return { ok: false, error: "Supabase is not configured." };
  const { error } = await client.from("blog_comments").insert(comment);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function toggleCommentLike(commentId: string, visitorId: string) {
  const client = getSupabaseBrowserClient();
  if (!client) return { ok: false };
  const { data, error } = await client
    .from("blog_comments")
    .select("likes, liked_by")
    .eq("id", commentId)
    .single();
  if (error || !data) return { ok: false };

  const likedBy: string[] = Array.isArray(data.liked_by) ? data.liked_by : [];
  const hasLiked = likedBy.includes(visitorId);
  const nextLikes = data.likes ?? 0;

  const { error: updateError } = await client
    .from("blog_comments")
    .update({
      likes: hasLiked ? Math.max(0, nextLikes - 1) : nextLikes + 1,
      liked_by: hasLiked
        ? likedBy.filter((id) => id !== visitorId)
        : [...likedBy, visitorId],
    })
    .eq("id", commentId);

  if (updateError) return { ok: false };
  return { ok: true, liked: !hasLiked };
}
