import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  Headphones,
  PhoneCall,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Services & Pricing",
  description:
    "Websites, online booking systems, and call-management systems for small businesses — starter packages from ₦50,000. Fixed pricing, 50% deposit to start.",
  path: "/services",
});

const TIERS = [
  {
    name: "Starter Website",
    price: "₦50,000",
    usd: "≈ $49 international",
    timeline: "Delivered in 5 days",
    summary:
      "A fast, modern website that makes your business look professional on every screen.",
    features: [
      "Up to 5 pages (home, services, about, gallery, contact)",
      "Mobile-first design, dark & light ready",
      "Contact form + WhatsApp chat button",
      "Google Maps, social links & basic SEO setup",
      "Domain & hosting deployment help",
      "1 revision round",
    ],
    highlighted: false,
  },
  {
    name: "Booking System",
    price: "₦75,000",
    usd: "≈ $79 international",
    timeline: "Delivered in 10 days",
    summary:
      "Everything in Starter, plus a website that books appointments, takes deposits, and sends reminders — while you sleep.",
    features: [
      "Everything in Starter Website",
      "Online appointment booking (your calendar, your rules)",
      "Automated email/SMS/WhatsApp reminders",
      "Optional deposits or full payment at booking",
      "Admin dashboard to manage appointments",
      "No-show reduction — clients confirm themselves",
      "2 revision rounds",
    ],
    highlighted: true,
  },
  {
    name: "Growth Stack",
    price: "₦100,000",
    usd: "≈ $99 international",
    timeline: "Delivered in 14 days",
    summary:
      "Website + booking + a call & lead management system so you never lose another customer to a missed call.",
    features: [
      "Everything in Booking System",
      "Missed-call & form-lead capture into one inbox",
      "Automated WhatsApp/SMS follow-up sequences",
      "Lead pipeline dashboard (who called, who booked, who paid)",
      "AI receptionist add-on available (answers FAQs & books 24/7)",
      "Monthly performance report",
      "Unlimited revisions in build window",
    ],
    highlighted: false,
  },
] as const;

const ADDONS = [
  {
    icon: Sparkles,
    title: "AI receptionist",
    price: "from ₦25,000",
    description:
      "A voice or chat agent that answers questions, qualifies leads and books appointments 24/7.",
  },
  {
    icon: PhoneCall,
    title: "Call & WhatsApp automation",
    price: "from ₦20,000",
    description:
      "Missed calls trigger an instant WhatsApp reply, so hot leads never go cold.",
  },
  {
    icon: Headphones,
    title: "Care plan",
    price: "₦10,000 / month",
    description:
      "Hosting, backups, uptime monitoring, content edits and priority fixes.",
  },
] as const;

const PROCESS = [
  {
    icon: Users,
    step: "01",
    title: "Free discovery call",
    description:
      "A 15-minute call (or WhatsApp chat) to understand your business and what you need.",
  },
  {
    icon: Rocket,
    step: "02",
    title: "50% deposit to start",
    description:
      "Fixed quote, no surprises. You approve the scope before a single line of code is written.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Build & review",
    description:
      "You see a live preview link within days and give feedback until it feels right.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Launch & handover",
    description:
      "We deploy, train you on the dashboard, and stay on for support whenever you need it.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services & pricing"
          title="Websites & smart systems for your business"
          description="Fixed prices, clear timelines, no agency markups. Everything is built for you — booking, payments, and follow-ups included so your website actually earns its keep."
        />

        {/* Pricing tiers */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card p-6 sm:p-8",
                  tier.highlighted
                    ? "border-emerald/50 shadow-xl shadow-emerald/10 ring-1 ring-emerald/30"
                    : "shadow-sm",
                )}
              >
                {tier.highlighted ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-background">
                    Most popular
                  </span>
                ) : null}

                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {tier.name}
                </p>
                <p className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {tier.price}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{tier.usd}</p>
                <p className="mt-1 inline-flex w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                  {tier.timeline}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {tier.summary}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={tier.highlighted ? "gradient" : "outline"}
                  className="mt-8 w-full rounded-xl"
                >
                  <Link href="/contact">
                    Get started
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Terms bar */}
        <Reveal delay={0.1}>
          <div className="glass mt-8 flex flex-col items-center gap-4 rounded-2xl border p-6 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="font-display-sm font-semibold">
                50% deposit to start — balance on launch
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                International clients are billed in USD (Payoneer, Wise or bank
                transfer). Local clients can pay by transfer. You own every file
                we produce — full handover, no lock-in.
              </p>
            </div>
            <Button asChild variant="gradient" className="shrink-0 rounded-xl">
              <Link href="/contact">Request a free quote</Link>
            </Button>
          </div>
        </Reveal>

        {/* Add-ons */}
        <section aria-labelledby="addons" className="mt-24">
          <SectionHeading
            eyebrow="Add-ons"
            title="Make it smarter"
            description="Bolt any of these onto a package — or onto a website you already have."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {ADDONS.map((addon, index) => (
              <Reveal key={addon.title} delay={index * 0.08}>
                <div className="card-hover h-full rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <addon.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 flex items-baseline justify-between gap-2">
                    <p className="font-display-sm font-semibold">{addon.title}</p>
                    <p className="whitespace-nowrap font-mono text-xs text-emerald">
                      {addon.price}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {addon.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section aria-labelledby="process" className="mt-24">
          <SectionHeading
            eyebrow="How it works"
            title="From first message to live in days"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08}>
                <div className="h-full rounded-2xl border bg-muted/30 p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.step}
                    </span>
                  </div>
                  <p className="mt-4 font-display-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="mt-24 rounded-2xl border bg-card px-6 py-16 text-center shadow-sm sm:px-16">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald">
              Ready when you are
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Let&apos;s get your business online this week
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Tell us what you need — a website, bookings on autopilot, or never
              missing a customer call again — and get a fixed quote today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="gradient">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/demos">See live demos</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
