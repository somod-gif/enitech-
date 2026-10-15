import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  Globe,
  PhoneCall,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

const OFFERS = [
  {
    icon: Globe,
    name: "Business website",
    price: "from ₦50,000",
    timeline: "Live in 5 days",
    description:
      "A fast, modern site that makes your business look professional on every screen — contact form, WhatsApp chat, maps and all.",
    features: ["Up to 5 pages", "Mobile-first", "SEO setup"],
    href: "/services",
    highlighted: false,
  },
  {
    icon: CalendarCheck,
    name: "Booking system",
    price: "from ₦75,000",
    timeline: "Live in 10 days",
    description:
      "Your website books appointments, takes deposits and sends reminders automatically — while you focus on the work.",
    features: ["Online scheduling", "Reminders", "Payments"],
    href: "/services",
    highlighted: true,
  },
  {
    icon: PhoneCall,
    name: "Call & lead management",
    price: "from ₦100,000",
    timeline: "Live in 14 days",
    description:
      "Never lose a customer to a missed call. Every call, form and WhatsApp message lands in one inbox with automatic follow-up.",
    features: ["Missed-call capture", "Follow-up automation", "Lead dashboard"],
    href: "/services",
    highlighted: false,
  },
] as const;

const INDUSTRIES = [
  "Salons & Spas",
  "Clinics",
  "Gyms",
  "Restaurants",
  "Hotels & Shortlets",
  "Real Estate",
  "Schools",
  "Events",
  "Auto Shops",
  "Fashion",
  "Logistics",
  "Consultants",
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Free discovery call",
    description: "A 15-minute call or WhatsApp chat about your business.",
  },
  {
    step: "02",
    title: "50% deposit to start",
    description: "Fixed quote, no surprises. You approve the scope first.",
  },
  {
    step: "03",
    title: "Build & review",
    description: "See a live preview within days and give feedback.",
  },
  {
    step: "04",
    title: "Launch & handover",
    description: "We deploy, train you, and stay on for support.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="pt-32 sm:pt-40">
        <div className="section-shell text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-emerald">
              Enitech — web &amp; smart systems
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your business, online and taking bookings — in days
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We build fast websites, appointment booking systems and call
              management for small businesses — with fixed prices and no agency
              markups.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="gradient">
                <Link href="/contact">
                  Get a free quote
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">See pricing</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                "From ₦50,000",
                "5-day delivery",
                "50% deposit to start",
                "You own everything",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offers */}
      <section aria-labelledby="offers" className="py-24 sm:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="What we build"
            title="One studio, three ways to grow"
            description="Every project is built for you — designed around how your customers actually find and book you."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {OFFERS.map((offer, index) => (
              <Reveal key={offer.name} delay={index * 0.08}>
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm sm:p-8 ${
                    offer.highlighted
                      ? "border-emerald/50 shadow-xl shadow-emerald/10 ring-1 ring-emerald/30"
                      : ""
                  }`}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <offer.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {offer.name}
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold tracking-tight">
                    {offer.price}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald">
                    {offer.timeline}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {offer.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {offer.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 shrink-0 text-emerald" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-6 w-full rounded-xl">
                    <Link href={offer.href}>
                      Learn more
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section aria-labelledby="industries" className="border-y bg-muted/30 py-24 sm:py-32">
        <div className="section-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Live demos"
              title="Built for your industry"
              description="We've built booking-ready demos for salons, clinics, gyms, hotels and more — ask for a live link and we'll rebrand it for your business in 48 hours."
            />
            <Reveal delay={0.2} className="shrink-0">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/demos">
                  Browse demos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              {INDUSTRIES.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground shadow-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="py-24 sm:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="How it works"
            title="From first message to live in days"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08}>
                <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.step}
                  </span>
                  <p className="mt-3 font-display-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta" className="py-8">
        <div className="section-shell">
          <Reveal>
            <div className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm sm:px-16 sm:py-20">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald">
                Ready when you are
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Let&apos;s get your business online this week
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                Tell us what you need — a website, bookings on autopilot, or
                never missing a customer call again — and get a fixed quote
                today.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" variant="gradient">
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">See full pricing</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
