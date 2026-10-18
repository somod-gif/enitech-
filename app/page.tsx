import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Check,
  Clock3,
  Code2,
  CreditCard,
  ExternalLink,
  Globe,
  Layers,
  Linkedin,
  Github,
  Mail,
  MessageSquareText,
  Phone,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { HeroConsole } from "@/components/home/hero-console";
import { WorkGrid } from "@/components/home/work-grid";
import { InquiryForm } from "@/components/home/inquiry-form";
import { CopyEmail } from "@/components/home/copy-email";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({ path: "/" });

const HERO_PILLS = [
  { label: "Professional websites", highlighted: false },
  { label: "Inventory & sales OS", highlighted: false },
  { label: "E-commerce stores", highlighted: false },
  { label: "AI & WhatsApp automation", highlighted: true },
] as const;

const TRUST_ITEMS = [
  "Projects from ₦50,000",
  "First delivery in days",
  "50% deposit to start",
  "You own everything",
] as const;

const SERVICES = [
  {
    icon: Globe,
    title: "Professional websites & landing pages",
    description:
      "High-converting, performance-focused company websites engineered to establish authority, present your offering clearly, and turn visitors into qualified leads.",
    tag: "Speed & conversion optimisation",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce websites & stores",
    description:
      "Frictionless online storefronts with smooth checkout flows, multi-currency support, order notification pipelines and inventory sync.",
    tag: "High-conversion retail engines",
  },
  {
    icon: Boxes,
    title: "Inventory, sales & order systems",
    description:
      "Custom software to track real-time stock levels, issue digital receipts, log cashier transactions and prevent stock shrinkage.",
    tag: "Real-time stock & sales control",
  },
  {
    icon: Building2,
    title: "Custom business management software",
    description:
      "Bespoke web applications built around your organisation's exact workflows, employee permissions, approval chains and internal data.",
    tag: "Tailored operational workflows",
  },
  {
    icon: Bot,
    title: "AI-powered business automation",
    description:
      "Intelligent customer assistants, automated document processing, lead scoring and task routing that reduce operating costs.",
    tag: "Automated labour savings",
  },
  {
    icon: MessageSquareText,
    title: "WhatsApp & customer follow-up",
    description:
      "Automated WhatsApp integrations for instant payment confirmations, delivery updates, appointment reminders and re-engagement sequences.",
    tag: "Direct channel engagement",
  },
  {
    icon: BarChart3,
    title: "Business dashboards & analytics",
    description:
      "Executive analytics portals that consolidate payment records, sales trends, inventory turnover and operational KPIs into clear visuals.",
    tag: "Data-driven decisions",
  },
  {
    icon: CreditCard,
    title: "Payment integrations & portals",
    description:
      "Secure payment gateway setups, customer self-service billing portals, automated invoicing and bank-transfer reconciliation.",
    tag: "Seamless payment workflows",
  },
  {
    icon: Smartphone,
    title: "Mobile applications & custom software",
    description:
      "Cross-platform iOS and Android applications for field operations, customer self-service and specialised digital product experiences.",
    tag: "Native cross-platform mobility",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "We clarify the business outcome, review existing assets and document the operational requirements.",
  },
  {
    step: "02",
    title: "Scope",
    description:
      "A fixed proposal with deliverables, milestone schedule, payment points and clear completion criteria.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Iterative engineering with progress updates, staging previews and thorough quality testing.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Production deployment, domain setup, staff walkthroughs, source handoff and optional maintenance plans.",
  },
] as const;

const AGENCY_PILLARS = [
  { icon: Sparkles, label: "Strict NDA protection" },
  { icon: Code2, label: "Clean, maintainable code" },
  { icon: Clock3, label: "On-time milestone delivery" },
] as const;

const CALENDAR_URL = "https://cal.com/eniola-badmus-40skkk/15min";

export default function HomePage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="grid-surface relative pt-32 sm:pt-36">
        <div className="section-shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-8 lg:col-span-7">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-solid opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-solid" />
                  </span>
                  Full-stack digital engineering &amp; white-label capacity
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                  Engineering digital products that{" "}
                  <span className="text-gradient">move businesses forward.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  We partner with businesses, founders and creative agencies to
                  design and engineer custom business software, inventory
                  systems, e-commerce stores, AI automations and web
                  applications.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {HERO_PILLS.map((pill) => (
                    <span
                      key={pill.label}
                      className={
                        pill.highlighted
                          ? "rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 font-medium text-brand"
                          : "rounded-lg border bg-card px-3 py-1.5 font-medium text-muted-foreground"
                      }
                    >
                      {pill.label}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button asChild size="lg" variant="gradient">
                    <a href="#contact">
                      Discuss a project
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/services">
                      See pricing
                      <Layers className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  {TRUST_ITEMS.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-brand" />
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-5">
              <HeroConsole />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 sm:py-28">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Business outcomes & solutions"
            title="What we build for our clients"
            description="Clients don't buy code or frameworks — they hire us to solve operational friction, automate manual work, increase revenue and ship reliable software."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={(index % 3) * 0.05}>
                <div className="card-hover flex h-full flex-col justify-between rounded-2xl border bg-card p-6">
                  <div className="space-y-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                      <service.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <p className="mt-6 border-t pt-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-brand">
                    {service.tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-6 sm:flex-row">
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border bg-muted text-brand">
                  <Wrench className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">
                    Website maintenance &amp; ongoing support
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Security monitoring, speed optimisation, updates, bug fixes
                    and feature additions — monthly care plans.
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <a href="#contact">
                  Ask about maintenance
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="border-y py-24 sm:py-28">
        <div className="section-shell">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected projects & case studies"
              title="Engineered software & digital products"
              description="Case studies span inventory management, healthcare triage, commerce platforms, payment reconciliation and AI workflow automation."
            />
            <Reveal delay={0.1}>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/demos">
                  Browse live demos
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <WorkGrid />
        </div>
      </section>

      {/* Agency partnership */}
      <section id="agency" className="py-20">
        <div className="section-shell">
          <Reveal>
            <div className="rounded-3xl border border-brand-solid/30 bg-[#0b0d10] p-8 sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-8">
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-solid">
                    White-label development capacity for agencies
                  </p>
                  <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Your development partner behind the scenes.
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-gray-300">
                    Need extra engineering capacity for a client project? We
                    support design studios and creative agencies with web
                    application execution, frontend implementation, custom
                    e-commerce stores and backend integrations — under strict
                    NDA protection.
                  </p>
                  <div className="grid gap-3 pt-2 font-mono text-xs sm:grid-cols-3">
                    {AGENCY_PILLARS.map((pillar) => (
                      <span
                        key={pillar.label}
                        className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#151821] p-3 text-gray-300"
                      >
                        <pillar.icon className="h-4 w-4 shrink-0 text-brand-solid" />
                        {pillar.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 lg:justify-end">
                  <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
                    <a href="#contact">
                      Discuss agency retainer
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-y py-24 sm:py-28">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Predictable delivery pipeline"
            title="How we execute projects"
            description="Projects begin with clear business requirements, agreed deliverables, realistic timelines and payment milestones."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <div className="h-full rounded-2xl border bg-card p-6">
                  <div className="font-mono text-2xl font-black text-brand">
                    {item.step}
                  </div>
                  <h3 className="mt-3 text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About the founder */}
      <section id="about" className="grid-surface py-24 sm:py-28">
        <div className="section-shell">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="rounded-3xl border bg-card p-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border bg-[#0b0d10]">
                  <div
                    className="grid h-full w-full place-items-center"
                    aria-hidden
                  >
                    <span className="font-mono text-7xl font-black tracking-tighter text-brand-solid sm:text-8xl">
                      BE
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 font-mono">
                    <div className="text-base font-bold text-white">
                      Badmus Eniola
                    </div>
                    <div className="text-xs text-brand-solid">
                      Founder &amp; Lead Software Engineer
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  Engineering leadership
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Hi, I&apos;m Badmus Eniola — founder &amp; lead engineer at
                  ENITECH.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm leading-relaxed text-foreground">
                  I&apos;m a full-stack software engineer with hands-on
                  experience building production web applications, inventory
                  systems, e-commerce stores, mobile apps and AI business
                  automations — currently shipping healthcare AI at{" "}
                  <span className="font-semibold text-brand">Aluvity</span>,
                  with prior engineering work at Carticom, BanffPay and more.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I founded ENITECH to give businesses, founders and agencies
                  reliable, high-standard digital engineering. Practical
                  software that removes operational bottlenecks, increases
                  sales — and gives founders peace of mind.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild variant="outline">
                    <Link
                      href={SITE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link
                      href={SITE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      GitHub (@{SITE.github})
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t py-24 sm:py-28">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-5">
              <SectionHeading
                eyebrow="Project inquiries"
                title="Let's build something built to last."
                description="Upcoming project, business software requirement, e-commerce store, or agency white-label capacity? Send an inquiry — serious ones get a fixed quote within 24 hours."
              />
              <Reveal delay={0.1}>
                <div className="space-y-3 rounded-2xl border bg-card p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Direct contact
                  </p>
                  <CopyEmail />
                  <p className="text-xs text-muted-foreground">
                    Prefer to talk first? Book a free 15-minute call —
                    no pitch, just scope and numbers.{" "}
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand underline-offset-4 hover:underline"
                    >
                      Pick a time
                    </a>
                    .
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {SITE.location} · replies within 24h
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    {SITE.availability}
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-7">
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
