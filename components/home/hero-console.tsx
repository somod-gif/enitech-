"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "running" | "done";

const STATUS_BY_PHASE: Record<Phase, string> = {
  idle: "> WhatsApp receipt sent to customer (+234…809)",
  running: "> Triggering stock deduction & payment webhook…",
  done: "> WhatsApp receipt generated & sent to customer!",
};

const LATENCY_BY_PHASE: Record<Phase, string> = {
  idle: "Ready",
  running: "Processing…",
  done: "Executed (38ms)",
};

const LEDGER_ROWS = [
  { icon: Check, label: "SKU-8821 stock updated", meta: "−1 unit" },
  { icon: Check, label: "Paystack webhook verified", meta: "₦45,000.00" },
] as const;

export function HeroConsole() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const simulate = () => {
    if (phase === "running") return;
    setPhase("running");
    timer.current = window.setTimeout(() => setPhase("done"), 900);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-3 font-mono text-xs text-gray-200 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3 text-[11px] text-gray-400">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] uppercase tracking-widest">
          BizStock Engine v2.4
        </span>
        <span className="text-[10px] font-bold uppercase text-brand-solid">
          Live pipeline
        </span>
      </div>

      <div className="mt-2 space-y-4 rounded-b-lg bg-[#08090b] p-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div>
            <div className="text-[10px] uppercase text-gray-500">
              System operation
            </div>
            <div className="text-xs font-bold text-white">
              Stock ledger &amp; WhatsApp receipt dispatch
            </div>
          </div>
          <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
            Synced
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded border border-white/5 bg-[#12151b] p-3">
            <div className="text-[10px] text-gray-500">TOTAL SKU ITEMS</div>
            <div className="mt-0.5 text-sm font-bold text-white">
              1,482 active
            </div>
          </div>
          <div className="rounded border border-white/5 bg-[#12151b] p-3">
            <div className="text-[10px] text-gray-500">AUTO-RECEIPTS</div>
            <div className="mt-0.5 text-sm font-bold text-brand-solid">
              99.9% success
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded border border-white/5 bg-[#030405] p-3 text-[10px]">
          <div className="flex justify-between border-b border-white/5 pb-1 text-gray-400">
            <span>EVENT LOG</span>
            <span>LATENCY: 42MS</span>
          </div>
          {LEDGER_ROWS.map((row) => (
            <div key={row.label} className="flex justify-between text-gray-300">
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-400" />
                {row.label}
              </span>
              <span className="text-gray-500">{row.meta}</span>
            </div>
          ))}
          <p
            className="text-brand-solid"
            role="status"
            aria-live="polite"
          >
            {STATUS_BY_PHASE[phase]}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={simulate}
            className={cn(
              "flex items-center gap-1.5 rounded bg-brand-solid px-3 py-1.5 text-[10px] font-bold uppercase text-black transition-colors hover:bg-brand-solid-dark",
              phase === "running" && "opacity-70",
            )}
          >
            <Zap className="h-3 w-3" />
            Simulate automation
          </button>
          <span className="text-[10px] text-gray-500">
            {LATENCY_BY_PHASE[phase]}
          </span>
        </div>
      </div>
    </div>
  );
}
