"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="ml-auto hidden items-center gap-1 md:flex">
      {NAV_LINKS.slice(0, -1).map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {link.label}
          </Link>
        );
      })}
      <Button asChild size="sm" variant="gradient" className="ml-2 h-9 rounded-full">
        <Link href="/contact" onClick={onNavigate}>
          Get in touch
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "mt-4 flex items-center rounded-full border px-3 py-2 transition-all duration-300",
            "glass-strong border-border/60 shadow-lg shadow-black/[0.03] dark:shadow-black/20",
          )}
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-full px-2 py-1"
            aria-label="Eniola.dev — home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
              E
            </span>
            <span className="hidden font-mono text-sm font-medium tracking-tight sm:block">
              Enitech
            </span>
          </Link>

          <NavLinks pathname={pathname} />

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                asChild
                aria-label="Open navigation menu"
              >
                <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="gap-0" aria-label="Mobile navigation">
                <div className="mt-10 flex flex-col">
                  {NAV_LINKS.map((link, index) => {
                    const active =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                          active
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        )}
                      >
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-xs text-muted-foreground">
                            0{index + 1}
                          </span>
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 transition-opacity",
                            active ? "opacity-100" : "opacity-30",
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-auto space-y-4 border-t pt-5">
                  <p className="text-xs text-muted-foreground">
                    {SITE.availability}
                  </p>
                  <Button asChild variant="gradient" className="w-full">
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Get in touch
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}