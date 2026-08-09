"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { BlogComment, BlogCommentInsert } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchComments,
  insertComment,
  isSupabaseConfigured,
  subscribeToComments,
  toggleCommentLike,
} from "@/services/supabase";
import { useVisitorId } from "@/hooks/use-visitor-id";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Comments({ postSlug }: { postSlug: string }) {
  const configured = isSupabaseConfigured();
  const visitorId = useVisitorId();

  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<BlogCommentInsert>({
    post_slug: postSlug,
    name: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await fetchComments(postSlug);
      if (!cancelled) {
        setComments(data);
        setLoading(false);
      }
    }

    load();

    const unsubscribe = subscribeToComments(postSlug, (comment) => {
      setComments((previous) =>
        previous.some((item) => item.id === comment.id)
          ? previous
          : [comment, ...previous],
      );
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [postSlug]);

  const totalLikes = comments.reduce((acc, comment) => acc + comment.likes, 0);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const trimmed = {
        name: form.name.trim(),
        message: form.message.trim(),
      };

      setNameError(trimmed.name ? null : "Please add your name.");
      setMessageError(trimmed.message ? null : "Please write a comment first.");

      if (!trimmed.name || !trimmed.message) return;

      setSubmitting(true);
      const result = await insertComment({
        post_slug: postSlug,
        name: trimmed.name,
        message: trimmed.message,
      });
      setSubmitting(false);

      if (!result.ok) {
        toast.error(result.error ?? "Failed to post your comment.", {
          description: "Check the Supabase setup and try again.",
        });
        return;
      }

      toast.success("Comment posted — it just appeared on this page. ✨", {
        description: "Realtime is doing its thing.",
      });
      setForm((previous) => ({ ...previous, message: "" }));
    },
    [form.name, form.message, postSlug],
  );

  const handleLike = useCallback(
    async (commentId: string) => {
      if (!visitorId) return;
      const result = await toggleCommentLike(commentId, visitorId);
      if (!result.ok) return;
      setComments((previous) =>
        previous.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: comment.likes + (result.liked ? 1 : -1),
                liked_by: result.liked
                  ? [...(comment.liked_by ?? []), visitorId]
                  : (comment.liked_by ?? []).filter((id) => id !== visitorId),
              }
            : comment,
        ),
      );
    },
    [visitorId],
  );

  return (
    <section aria-labelledby="comments-heading" className="mt-16">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <h2 id="comments-heading" className="font-display text-xl font-semibold">
            Comments
          </h2>
          <p className="text-xs text-muted-foreground">
            {comments.length} {comments.length === 1 ? "comment" : "comments"} ·{" "}
            {totalLikes} {totalLikes === 1 ? "like" : "likes"}
          </p>
        </div>
      </div>

      {!configured ? (
        <div className="mt-6 rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
          Comments are powered by Supabase — add{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          to enable realtime comments. Schema is in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            supabase/schema.sql
          </code>
          .
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="glass mt-6 space-y-4 rounded-2xl border p-5"
            aria-label="Add a comment"
          >
            <div>
              <Label htmlFor="comment-name">Name</Label>
              <Input
                id="comment-name"
                value={form.name}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                placeholder="Your name"
                className="mt-1.5"
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "comment-name-error" : undefined}
              />
              {nameError ? (
                <p id="comment-name-error" className="mt-1 text-xs text-destructive">
                  {nameError}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="comment-message">Message</Label>
              <Textarea
                id="comment-message"
                value={form.message}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    message: event.target.value,
                  }))
                }
                placeholder="Share your thoughts…"
                className="mt-1.5"
                aria-invalid={Boolean(messageError)}
                aria-describedby={messageError ? "comment-message-error" : undefined}
              />
              {messageError ? (
                <p id="comment-message-error" className="mt-1 text-xs text-destructive">
                  {messageError}
                </p>
              ) : null}
            </div>
            <Button type="submit" disabled={submitting} variant="gradient">
              {submitting ? "Posting…" : "Post comment"}
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 space-y-4" aria-live="polite">
            {loading ? (
              <div className="space-y-4">
                {[0, 1].map((item) => (
                  <Skeleton key={item} className="h-28 rounded-2xl" />
                ))}
              </div>
            ) : comments.length === 0 ? (
              <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                No comments yet — be the first to start the conversation.
              </p>
            ) : (
              <ul className="space-y-4">
                <AnimatePresence initial={false}>
                  {comments.map((comment) => {
                    const liked = (comment.liked_by ?? []).includes(visitorId);
                    return (
                      <motion.li
                        key={comment.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="rounded-2xl border bg-card p-5 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground font-mono text-sm font-bold text-background">
                              {comment.name.charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <p className="text-sm font-semibold">{comment.name}</p>
                              <time
                                dateTime={comment.created_at}
                                className="text-xs text-muted-foreground"
                              >
                                {formatDate(comment.created_at)}
                              </time>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleLike(comment.id)}
                            aria-pressed={liked}
                            aria-label={`${liked ? "Unlike" : "Like"} ${comment.name}'s comment`}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                              liked
                                ? "border-primary/40 bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <Heart
                              className={cn("h-3.5 w-3.5", liked && "fill-current")}
                            />
                            {comment.likes}
                          </button>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                          {comment.message}
                        </p>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
}