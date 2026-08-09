import Link from "next/link";
import { ArrowUpRight, CalendarClock, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { ContactForm } from "@/features/contact/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Badmus Samad Eniola for internships, freelance work, startup collaborations and junior software engineering roles.",
  path: "/contact",
});

const CALENDAR_URL = "https://cal.com/eniola-badmus-40skkk/15min";

const SOCIALS = [
  {
    label: "GitHub",
    value: "@somod-gif",
    href: SITE.githubUrl,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/badmus-eniola001",
    href: SITE.linkedinUrl,
    icon: Linkedin,
  },
  {
    label: "X / Twitter",
    value: "@BadmusEniola07",
    href: SITE.twitterUrl,
    icon: Twitter,
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something"
              description="Internships, freelance, startup collaboration or a project idea — my inbox is open."
            />
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-4">
                {SOCIALS.map((social) => (
                  <Card
                    key={social.label}
                    className="card-hover group flex items-center gap-4 p-4"
                  >
                    <Link
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <social.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {social.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {social.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </Link>
                  </Card>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 rounded-2xl border border-dashed p-5 text-sm leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">
                  Response time &amp; availability
                </p>
                <p className="mt-1.5">
                  I usually reply within 24 hours. For anything time-sensitive,
                  email is fastest.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-foreground text-background">
                    <CalendarClock className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display-sm font-semibold">
                      Book a Calendar Meeting
                    </h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      15 minutes — pick a time that works for you.
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <Link href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    Book Meeting
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}