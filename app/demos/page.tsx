import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BedDouble,
  Briefcase,
  Car,
  Dumbbell,
  ExternalLink,
  GraduationCap,
  Home,
  Package,
  PartyPopper,
  Scissors,
  Shirt,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Live Demos",
  description:
    "Six live sites we built for real businesses, plus industry demo templates for salons, clinics, gyms, restaurants, hotels and more — rebranded for your business in 48 hours.",
  path: "/demos",
});

type Build = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
};

// Live builds shipped for real businesses. Verified 200 before adding.
const BUILDS: Build[] = [
  {
    name: "Hemma Fashion",
    description:
      "Modest fashion storefront for a Lagos and Abuja boutique: abayas, jalabias and hijabs with bespoke height fitting, AI stylist and WhatsApp checkout.",
    image: "/demos/hemma-fashion.jpg",
    tags: ["Fashion", "E-commerce", "WhatsApp"],
    href: "https://hemma-fashion.vercel.app",
  },
  {
    name: "Sek2ma Food & Catering",
    description:
      "Catering site with a live quote calculator, searchable menu, gallery lightbox and every enquiry handed off to WhatsApp for follow-up.",
    image: "/demos/sek2ma-catering.jpg",
    tags: ["Catering", "Lead capture", "Calculator"],
    href: "https://sek2ma-catering.vercel.app",
  },
  {
    name: "Jayyid Group",
    description:
      "One site, three businesses: honest vehicle sales from Jayyid Autos, Qur'an and Tajweed learning at the academy, and private rides, all with appointment booking.",
    image: "/demos/jayyid-group.jpg",
    tags: ["Multi-division", "Booking", "WhatsApp"],
    href: "https://jayyid-group.vercel.app",
  },
  {
    name: "Gradeur",
    description:
      "Menswear atelier storefront: thobes, kaftans and agbada with a style concierge, made-to-measure fitting forms and WhatsApp checkout across Lagos and Abuja.",
    image: "/demos/gradeur.jpg",
    tags: ["Fashion", "E-commerce", "Made-to-measure"],
    href: "https://gradeur-gamma.vercel.app",
  },
  {
    name: "Sidena Atelier",
    description:
      "Bespoke modest atelier with an AI stylist, height-precise fitting from 52 to 62 inches, silk and nidha fabrics, and direct WhatsApp booking.",
    image: "/demos/sidena-atelier.jpg",
    tags: ["Fashion", "AI stylist", "Booking"],
    href: "https://sidena-atelier.vercel.app",
  },
  {
    name: "Optimistic Legal Partners",
    description:
      "Law firm site with practice-area pages, a retainer fee calculator, partner profiles, consultation booking and a mobile-polished experience.",
    image: "/demos/optimistic-legal.jpg",
    tags: ["Legal", "Calculator", "Booking"],
    href: "https://optimistic-legal.vercel.app",
  },
];

const DEMOS = [
  {
    icon: Scissors,
    name: "Salons & Spas",
    description:
      "Service menu, stylist schedules, online booking and automatic reminders.",
    tags: ["Booking", "Reminders"],
  },
  {
    icon: Stethoscope,
    name: "Clinics & Dental",
    description:
      "Doctor timetables, patient appointment booking and follow-up messages.",
    tags: ["Booking", "SMS"],
  },
  {
    icon: Dumbbell,
    name: "Gyms & Fitness",
    description:
      "Membership plans, class schedules, trial sign-ups and trainer profiles.",
    tags: ["Booking", "Payments"],
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants & Catering",
    description:
      "Menu showcase, table reservations and event/catering enquiry forms.",
    tags: ["Booking", "WhatsApp"],
  },
  {
    icon: BedDouble,
    name: "Hotels & Shortlets",
    description:
      "Room gallery, availability calendar and direct bookings without OTA fees.",
    tags: ["Booking", "Payments"],
  },
  {
    icon: Home,
    name: "Real Estate",
    description:
      "Property listings, viewing appointments and instant agent callbacks.",
    tags: ["CRM", "Lead capture"],
  },
  {
    icon: GraduationCap,
    name: "Schools & Training",
    description:
      "Course catalogue, term registration and automated parent notifications.",
    tags: ["Booking", "Forms"],
  },
  {
    icon: PartyPopper,
    name: "Events & Weddings",
    description:
      "Portfolio, package pricing, date holds and enquiry-to-deposit flow.",
    tags: ["Booking", "Payments"],
  },
  {
    icon: Car,
    name: "Auto & Repairs",
    description:
      "Service list, repair slot booking and job-status updates by SMS.",
    tags: ["Booking", "SMS"],
  },
  {
    icon: Shirt,
    name: "Fashion & Retail",
    description:
      "Lookbook, made-to-order requests and WhatsApp shopping enquiries.",
    tags: ["Catalogue", "WhatsApp"],
  },
  {
    icon: Package,
    name: "Logistics & Delivery",
    description:
      "Service areas, quote requests and shipment enquiry capture.",
    tags: ["Forms", "Lead capture"],
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    description:
      "Law, accounting or consulting firms — profiles, bookings and intake forms.",
    tags: ["Booking", "CRM"],
  },
] as const;

export default function DemosPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Live demos"
          title="Real sites we've built, running right now"
          description="These aren't mockups. Every link opens a live site we designed, built and deployed for a real business. Yours gets the same build: fast, mobile-first, with booking and follow-ups baked in."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDS.map((build, index) => (
            <Reveal key={build.name} delay={(index % 3) * 0.06}>
              <article className="card-hover glass group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1">
                <Link
                  href={build.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-video overflow-hidden border-b"
                  aria-label={`${build.name} — open live site`}
                >
                  <Image
                    src={build.image}
                    alt={`${build.name} homepage screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    Live demo
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display-sm font-semibold">
                      {build.name}
                    </p>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {build.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {build.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Industry templates */}
        <SectionHeading
          className="mt-24"
          eyebrow="By industry"
          title="A website like this — for your business"
          description="Every demo below is built the same way we'd build yours. Pick your industry, ask for the live link, and we'll rebrand it for your business in 48 hours."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((demo, index) => (
            <Reveal key={demo.name} delay={(index % 3) * 0.06}>
              <div className="card-hover glass flex h-full flex-col rounded-2xl border p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                    <demo.icon className="h-5 w-5" />
                  </span>
                  <p className="font-display-sm font-semibold">{demo.name}</p>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {demo.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-foreground"
                  >
                    Request demo
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border bg-card px-6 py-12 text-center shadow-sm sm:flex-row sm:px-12 sm:text-left">
            <div className="flex-1">
              <p className="font-display-sm font-semibold">
                Don&apos;t see your industry? We build custom — from ₦50,000.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us about your business and get a free mockup proposal plus a
                fixed quote. No deposit required to talk.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="gradient" className="shrink-0">
                <Link href="/contact">
                  Get a free proposal
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shrink-0">
                <Link href="/services">See pricing</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
