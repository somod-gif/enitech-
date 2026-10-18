"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Tone = "lime" | "blue" | "purple" | "cyan";

const TONE_STYLES: Record<Tone, string> = {
  lime: "border-brand-solid/30 bg-brand-solid/10 text-brand-solid",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
};

const TONE_MONOGRAMS: Record<Tone, string> = {
  lime: "border-brand-solid/40 bg-brand-solid/20 text-brand-solid",
  blue: "border-blue-500/40 bg-blue-500/20 text-blue-400",
  purple: "border-purple-500/40 bg-purple-500/20 text-purple-400",
  cyan: "border-cyan-500/40 bg-cyan-500/20 text-cyan-400",
};

type Project = {
  name: string;
  tag: string;
  tone: Tone;
  domain: string;
  monogram: string;
  systemTitle: string;
  systemSub: string;
  note: string;
  description: string;
  caseStudy: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    name: "BizStock",
    tag: "Live system",
    tone: "lime",
    domain: "bizstock.sh",
    monogram: "BS",
    systemTitle: "BizStock Engine",
    systemSub: "Stock ledger & WhatsApp receipts",
    note: "Inventory & sales OS",
    description:
      "Inventory and sales operating system for retailers — real-time stock ledger, cashier transactions, digital receipts and WhatsApp order automation with Paystack payment verification.",
    caseStudy:
      "Commerce and inventory OS combining stock control, sales logging and automated customer messaging — built so a single operator can run an entire shop without spreadsheets.",
  },
  {
    name: "Aluvity Care",
    tag: "Professional experience",
    tone: "blue",
    domain: "aluvity",
    monogram: "AC",
    systemTitle: "Aluvity Care",
    systemSub: "AI clinical navigation",
    note: "Healthcare triage AI",
    description:
      "AI clinical navigator that guides patients through symptom assessment and routes them to the right care pathway — with clinical safety review and human handoff built in.",
    caseStudy:
      "Professional engineering on an AI healthcare product: patient triage conversations, structured symptom capture and safe escalation to clinicians.",
  },
  {
    name: "Carticom",
    tag: "Live system",
    tone: "lime",
    domain: "carticom.cv",
    monogram: "CC",
    systemTitle: "Carticom Commerce OS",
    systemSub: "Multi-currency retail engine",
    note: "Cabo Verde & West Africa",
    description:
      "AI-assisted commerce operating system designed for merchants in Cabo Verde and West Africa, featuring inventory sync, multi-currency support, and sales automation.",
    caseStudy:
      "Commerce OS tailored for West African retail merchants with catalog sync and automated sales channels.",
    href: "http://carticom.cv/",
  },
  {
    name: "BanffPay",
    tag: "Professional experience",
    tone: "blue",
    domain: "banffpay.com",
    monogram: "BP",
    systemTitle: "BanffPay Engine",
    systemSub: "Cross-border payout workflows",
    note: "FINTRAC regulated MSB",
    description:
      "Software engineering contribution to cross-border payment operations, multi-currency ledger entries, and automated financial transaction processing.",
    caseStudy:
      "Engineering involvement in cross-border remittance architecture, transaction reconciliation, and compliance flows.",
    href: "https://www.banffpay.com/",
  },
  {
    name: "Rekon",
    tag: "Product concept",
    tone: "purple",
    domain: "rekon · prototype",
    monogram: "RK",
    systemTitle: "Rekon QR Engine",
    systemSub: "QR payment & auto-reconciliation",
    note: "Cashier payment verification",
    description:
      "Instant QR-code payment acceptance and automated bank transfer reconciliation product concept — verifying customer payments at the counter in seconds.",
    caseStudy:
      "QR payment verification and instant bank reconciliation product prototype designed for physical retail counters.",
  },
  {
    name: "Opportunity AI",
    tag: "Independent build",
    tone: "cyan",
    domain: "opportunity-ai",
    monogram: "OP",
    systemTitle: "Opportunity AI",
    systemSub: "AI career intelligence pipeline",
    note: "LLM skill alignment",
    description:
      "Intelligent career opportunity workflow that analyzes candidate profiles, extracts skill scorecards, and drafts personalized application proposals using LLMs.",
    caseStudy:
      "AI pipeline analyzing skill alignment and automatically structuring custom proposal drafts using LLMs.",
  },
];

export function WorkGrid() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className="card-hover group flex flex-col justify-between overflow-hidden rounded-2xl border bg-card"
          >
            <div>
              {/* Structured system mockup banner */}
              <div className="relative flex h-44 flex-col justify-between border-b bg-[#0b0d10] p-4 font-mono">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span
                    className={cn(
                      "rounded border px-2 py-0.5 uppercase",
                      TONE_STYLES[project.tone],
                    )}
                  >
                    {project.tag}
                  </span>
                  <span>{project.domain}</span>
                </div>

                <div className="my-auto flex items-center gap-3 rounded border border-white/10 bg-[#12151b] p-3">
                  <div
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded border font-bold",
                      TONE_MONOGRAMS[project.tone],
                    )}
                  >
                    {project.monogram}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold uppercase tracking-wide text-white">
                      {project.systemTitle}
                    </div>
                    <div className="truncate text-[10px] text-gray-400">
                      {project.systemSub}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[10px] text-gray-500">
                  {project.note}
                </div>
              </div>

              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <span
                    className={cn(
                      "shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] uppercase",
                      TONE_STYLES[project.tone],
                    )}
                  >
                    {project.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 pt-0">
              <button
                type="button"
                onClick={() => setActive(project)}
                className="flex items-center gap-1 font-mono text-xs font-bold text-brand transition-colors hover:text-foreground"
              >
                Read case study
                <ChevronRight className="h-3 w-3" />
              </button>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name}`}
                  className="rounded-lg border p-2 text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-xl" aria-label="Case study">
          <DialogHeader>
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand">
              Case study overview
            </p>
            <DialogTitle className="pt-1 text-xl font-bold">
              {active?.name}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="leading-relaxed">
            {active?.caseStudy}
          </DialogDescription>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="font-mono text-xs text-muted-foreground">
              ENITECH Engineering Studio
            </span>
            {active?.href ? (
              <Button asChild size="sm" variant="gradient">
                <Link href={active.href} target="_blank" rel="noopener noreferrer">
                  Visit live site
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
