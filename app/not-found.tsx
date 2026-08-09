import Link from "next/link";
import { Compass, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
          Error 404
        </p>
        <h1 className="font-display mt-4 text-5xl font-semibold">
          Lost in the stack
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist (or moved).
          Let&apos;s get you back to something productive.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild variant="gradient">
            <Link href="/">
              <MoveLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">
              <Compass className="h-4 w-4" />
              Browse projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}