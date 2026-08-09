"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function PasswordGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cv/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setError(result.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Network error — try again.");
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell flex flex-col items-center">
        <form
          onSubmit={submit}
          className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm"
          aria-label="CV access"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-foreground text-background">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="font-display mt-5 text-xl font-semibold">
            Private area
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            The CV builder is password-protected and never linked or indexed.
          </p>

          <div className="mt-6">
            <Label htmlFor="cv-password">Password</Label>
            <Input
              id="cv-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5"
              aria-invalid={Boolean(error)}
            />
            {error ? (
              <p className="mt-1.5 text-xs text-destructive">{error}</p>
            ) : null}
          </div>

          <Button type="submit" disabled={loading || !password} className="mt-5 w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking…
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                Unlock
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}