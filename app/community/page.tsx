import {
  AchievementsList,
  CommunitiesGrid,
  InvolvementGrid,
} from "@/features/community/community";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community",
  description:
    "Hackathons, open source, speaking, mentoring and campus leadership — the communities and achievements behind the code.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="section-shell space-y-24">
        <SectionHeading
          eyebrow="Community"
          title="Beyond the code"
          description="Engineering is a community sport. Hackathons, open source, mentorship and leadership — where I give back and level up."
        />

        <section aria-labelledby="involvement">
          <Reveal>
            <h2
              id="involvement"
              className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-muted-foreground"
            >
              <span className="h-px w-8 bg-primary" />
              How I get involved
            </h2>
          </Reveal>
          <InvolvementGrid />
        </section>

        <section aria-labelledby="communities">
          <Reveal>
            <h2
              id="communities"
              className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-muted-foreground"
            >
              <span className="h-px w-8 bg-primary" />
              Communities I&apos;m part of
            </h2>
          </Reveal>
          <CommunitiesGrid />
        </section>

        <section aria-labelledby="achievements">
          <Reveal>
            <h2
              id="achievements"
              className="mb-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-muted-foreground"
            >
              <span className="h-px w-8 bg-primary" />
              Achievements
            </h2>
          </Reveal>
          <AchievementsList />
        </section>

        <Reveal>
          <div className="glass rounded-3xl border p-8 text-center sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Open to partnership
            </p>
            <h2 className="font-display mx-auto mt-3 max-w-xl text-2xl font-semibold sm:text-3xl">
              Speaking, mentoring or hackathon judge for a school or community?
            </h2>
            <a
              href="mailto:eniolabadmus351@gmail.com?subject=Speaking%2FMentoring%20opportunity"
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-85"
            >
              Pitch me an idea
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}