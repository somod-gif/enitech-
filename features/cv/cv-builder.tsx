"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Download,
  Eye,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import {
  createId,
  CV_STORAGE_KEY,
  defaultCvData,
  type CvData,
  type CvEducation,
  type CvExperience,
} from "@/features/cv/data";
import { cn } from "@/lib/utils";

function readSaved(): CvData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CV_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CvData;
    return parsed && Array.isArray(parsed.experience) ? parsed : null;
  } catch {
    return null;
  }
}

export function CVBuilder() {
  const mounted = useMountedState();
  const [data, setData] = useState<CvData>(() => readSaved() ?? defaultCvData());
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable */
    }
    const timer = window.setTimeout(
      () => setSavedAt(new Date().toLocaleTimeString()),
      400,
    );
    return () => window.clearTimeout(timer);
  }, [data, mounted]);

  const update = <K extends keyof CvData>(key: K, value: CvData[K]) =>
    setData((previous) => ({ ...previous, [key]: value }));

  if (!mounted) return <div className="pb-24 pt-32" />;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="section-shell">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              [ Private · not linked · not indexed ]
            </p>
            <h1 className="font-display mt-1 text-3xl font-semibold sm:text-4xl">
              CV Builder
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {savedAt
                ? `Auto-saved locally in your browser at ${savedAt}.`
                : "Edits are stored in your browser only — your data never leaves this device."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2" data-print-hide>
            <Button
              variant="outline"
              onClick={() => {
                setData(defaultCvData());
                toast.success("Reset to the default template.");
              }}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={() => window.print()}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Editor data={data} update={update} />
          <CvPreview data={data} />
        </div>
      </div>
    </div>
  );
}

function useMountedState() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/* --------------------------------- Editor --------------------------------- */

type UpdateFn = <K extends keyof CvData>(key: K, value: CvData[K]) => void;

function Editor({ data, update }: { data: CvData; update: UpdateFn }) {
  const [open, setOpen] = useState("contact");

  return (
    <div
      id="cv-editor-col"
      className="mx-auto w-full max-w-3xl min-w-0 space-y-5"
    >
      <EditorSection
        title="Personal details"
        open={open === "contact"}
        onToggle={() => setOpen(open === "contact" ? "" : "contact")}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={data.name} onChange={(value) => update("name", value)} />
          <Field label="Role / Title" value={data.role} onChange={(value) => update("role", value)} />
          <Field label="Email" value={data.email} onChange={(value) => update("email", value)} />
          <Field label="Phone" value={data.phone} onChange={(value) => update("phone", value)} />
          <Field label="Location" value={data.location} onChange={(value) => update("location", value)} />
          <Field label="Website" value={data.website} onChange={(value) => update("website", value)} />
          <Field label="GitHub" value={data.github} onChange={(value) => update("github", value)} />
          <Field label="LinkedIn" value={data.linkedin} onChange={(value) => update("linkedin", value)} />
        </div>
        <LinesEditor
          label="Summary"
          lines={data.summary}
          onChange={(lines) => update("summary", lines)}
          textarea
        />
      </EditorSection>

      <EditorSection
        title="Experience"
        open={open === "experience"}
        onToggle={() => setOpen(open === "experience" ? "" : "experience")}
      >
        {data.experience.map((entry, index) => (
          <div key={entry.id} className="rounded-xl border p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Company"
                value={entry.company}
                onChange={(v) => setExperience(data, index, "company", v, update)}
              />
              <Field
                label="Role"
                value={entry.role}
                onChange={(v) => setExperience(data, index, "role", v, update)}
              />
            </div>
            <div className="mt-3">
              <Field
                label="Dates"
                value={entry.dates}
                onChange={(v) => setExperience(data, index, "dates", v, update)}
              />
            </div>
            <LinesEditor
              label="Bullets"
              lines={entry.bullets}
              onChange={(lines) => setExperience(data, index, "bullets", lines, update)}
              textarea
            />
            <RemoveButton
              label="Remove experience"
              onRemove={() =>
                update("experience", data.experience.filter((_, i) => i !== index))
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            update("experience", [
              ...data.experience,
              {
                id: createId(),
                company: "Company",
                role: "Role",
                dates: "Month YYYY — Month YYYY",
                tech: "",
                bullets: ["Bullet point."],
              },
            ])
          }
        />
      </EditorSection>

      <EditorSection
        title="Education"
        open={open === "education"}
        onToggle={() => setOpen(open === "education" ? "" : "education")}
      >
        {data.education.map((entry, index) => (
          <div key={entry.id} className="rounded-xl border p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="School" value={entry.school} onChange={(v) => setEducation(data, index, "school", v, update)} />
              <Field label="Dates" value={entry.dates} onChange={(v) => setEducation(data, index, "dates", v, update)} />
            </div>
            <div className="mt-3">
              <Field label="Degree / Course" value={entry.degree} onChange={(v) => setEducation(data, index, "degree", v, update)} />
            </div>
            <LinesEditor
              label="Notes"
              lines={entry.bullets}
              onChange={(lines) => setEducation(data, index, "bullets", lines, update)}
              textarea
            />
            <RemoveButton
              label="Remove education"
              onRemove={() =>
                update("education", data.education.filter((_, i) => i !== index))
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            update("education", [
              ...data.education,
              {
                id: createId(),
                school: "School",
                degree: "Degree, Major",
                dates: "YYYY — YYYY",
                bullets: ["Highlight or note."],
              },
            ])
          }
        />
      </EditorSection>

      <EditorSection
        title="Skills"
        open={open === "skills"}
        onToggle={() => setOpen(open === "skills" ? "" : "skills")}
      >
        {data.skills.map((group, index) => (
          <div key={`${group.group}-${index}`} className="rounded-xl border p-4">
            <Field
              label="Group"
              value={group.group}
              onChange={(v) =>
                update(
                  "skills",
                  data.skills.map((g, i) => (i === index ? { ...g, group: v } : g)),
                )
              }
            />
            <div className="mt-3">
              <Label>Items (comma separated)</Label>
              <Textarea
                value={group.items}
                onChange={(event) =>
                  update(
                    "skills",
                    data.skills.map((g, i) => (i === index ? { ...g, items: event.target.value } : g)),
                  )
                }
                className="mt-1.5 min-h-[60px]"
              />
            </div>
            <RemoveButton
              label="Remove group"
              onRemove={() =>
                update("skills", data.skills.filter((_, i) => i !== index))
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            update("skills", [...data.skills, { group: "Group", items: "one, two" }])
          }
        />
      </EditorSection>

      <p className="pb-4 text-center font-mono text-[11px] tracking-widest text-muted-foreground">
        Ctrl / Cmd + P → “Save as PDF”
      </p>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value ?? ""} onChange={(event) => onChange(event.target.value)} className="mt-1.5" />
    </div>
  );
}

function LinesEditor({
  label,
  lines,
  onChange,
  textarea,
}: {
  label: string;
  lines: string[];
  onChange: (lines: string[]) => void;
  textarea?: boolean;
}) {
  const addLine = () => onChange([...lines, ""]);
  const updateLine = (index: number, value: string) =>
    onChange(lines.map((line, i) => (i === index ? value : line)));
  const removeLine = (index: number) =>
    onChange(lines.filter((_, i) => i !== index));

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={addLine}>
          <Plus className="h-3 w-3" />
          Add
        </Button>
      </div>
      <div className="mt-1.5 space-y-2">
        {lines.map((line, index) => (
          <div key={index} className="flex gap-2">
            {textarea ? (
              <Textarea
                value={line}
                onChange={(event) => updateLine(index, event.target.value)}
                className="min-h-[88px] flex-1"
              />
            ) : (
              <Input
                value={line}
                onChange={(event) => updateLine(index, event.target.value)}
                className="flex-1"
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 self-start"
              aria-label="Remove line"
              onClick={() => removeLine(index)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddButton({ onClick, label = "Add entry" }: { onClick: () => void; label?: string }) {
  return (
    <Button type="button" variant="outline" size="sm" className="mt-4 w-full" onClick={onClick}>
      <Plus className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}

function RemoveButton({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="mt-2 text-destructive hover:text-destructive"
      onClick={onRemove}
    >
      <Trash2 className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}

function EditorSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
          {title}
        </span>
        <Plus className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", open && "rotate-45")} />
      </button>
      {open ? <div className="space-y-4 border-t p-5">{children}</div> : null}
    </section>
  );
}

/* type-safe patch helpers */

function setExperience(
  data: CvData,
  index: number,
  key: keyof CvExperience,
  value: string | string[],
  update: UpdateFn,
) {
  update(
    "experience",
    data.experience.map((entry, i) =>
      i === index ? ({ ...entry, [key]: value } as CvExperience) : entry,
    ),
  );
}

function setEducation(
  data: CvData,
  index: number,
  key: keyof CvEducation,
  value: string | string[],
  update: UpdateFn,
) {
  update(
    "education",
    data.education.map((entry, i) =>
      i === index ? ({ ...entry, [key]: value } as CvEducation) : entry,
    ),
  );
}

/* --------------------------------- Preview --------------------------------- */

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const PAGE_PADDING = 52;
const PAGE_BUDGET = Math.round((A4_HEIGHT - PAGE_PADDING * 2) * 0.97);
const UNIT_GAP = 16;

type CvUnit = {
  key: string;
  node: ReactNode;
};

export function CvPreview({ data }: { data: CvData }) {
  return (
    <div id="cv-print-col" className="min-w-0">
      <p
        className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
        data-print-hide
      >
        <Eye className="h-3.5 w-3.5" />
        Live preview · A4 paper · exact pagination — prints 1:1
      </p>
      <PaginatedCv data={data} />
    </div>
  );
}

function withScheme(value: string) {
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

function buildUnits(data: CvData): CvUnit[] {
  const units: CvUnit[] = [];

  const contacts = [
    { text: data.location },
    { text: data.email, href: `mailto:${data.email}` },
    {
      text: data.phone,
      href: `tel:${data.phone.replace(/[^\d+]/g, "")}`,
    },
    { text: data.website, href: withScheme(data.website) },
    { text: data.github, href: withScheme(data.github) },
    { text: data.linkedin, href: withScheme(data.linkedin) },
  ].filter((contact) => Boolean(contact.text.trim()));

  units.push({
    key: "header",
    node: (
      <header className="cv-header">
        <h2 className="cv-name">{data.name}</h2>
        <p className="cv-role">{data.role}</p>
        <p className="cv-contact">
          {contacts.map((contact, index) => (
            <span key={contact.text}>
              {index > 0 ? "  ·  " : null}
              {contact.href ? (
                <a href={contact.href} className="cv-contact-link">
                  {contact.text}
                </a>
              ) : (
                contact.text
              )}
            </span>
          ))}
        </p>
      </header>
    ),
  });

  if (data.summary.some((line) => line.trim())) {
    units.push({
      key: "summary",
      node: (
        <section className="cv-section">
          <h3 className="cv-heading">Summary</h3>
          {data.summary.map((line, index) =>
            line.trim() ? (
              <p key={index} className="cv-text">
                {line}
              </p>
            ) : null,
          )}
        </section>
      ),
    });
  }

  if (data.experience.length > 0) {
    units.push({
      key: "experience-heading",
      node: (
        <section className="cv-section">
          <h3 className="cv-heading">Experience</h3>
          {(() => {
            const first = data.experience[0];
            return (
              <div key={first.id} className="cv-entry">
                <div className="cv-entry-head">
                  <span className="cv-entry-title">
                    {first.company} · {first.role}
                  </span>
                  <span className="cv-entry-dates">{first.dates}</span>
                </div>
                <ul className="cv-list">
                  {first.bullets.map((bullet, index) =>
                    bullet.trim() ? <li key={index}>{bullet}</li> : null,
                  )}
                </ul>
              </div>
            );
          })()}
        </section>
      ),
    });
    data.experience.slice(1).forEach((entry) => {
      units.push({
        key: `experience-${entry.id}`,
        node: (
          <div key={entry.id} className="cv-entry">
            <div className="cv-entry-head">
              <span className="cv-entry-title">
                {entry.company} · {entry.role}
              </span>
              <span className="cv-entry-dates">{entry.dates}</span>
            </div>
<ul className="cv-list">
                  {entry.bullets.map((bullet, i) =>
                    bullet.trim() ? <li key={i}>{bullet}</li> : null,
                  )}
                </ul>
              </div>
            ),
          });
        });
      }

  if (data.education.length > 0) {
    units.push({
      key: "education-heading",
      node: (
        <section className="cv-section">
          <h3 className="cv-heading">Education</h3>
          {(() => {
            const first = data.education[0];
            return (
              <div key={first.id} className="cv-entry">
                <div className="cv-entry-head">
                  <span className="cv-entry-title">
                    {first.school} · {first.degree}
                  </span>
                  <span className="cv-entry-dates">{first.dates}</span>
                </div>
                <ul className="cv-list">
                  {first.bullets.map((bullet, i) =>
                    bullet.trim() ? <li key={i}>{bullet}</li> : null,
                  )}
                </ul>
              </div>
            );
          })()}
        </section>
      ),
    });
    data.education.slice(1).forEach((entry) => {
      units.push({
        key: `education-${entry.id}`,
        node: (
          <div key={entry.id} className="cv-entry">
            <div className="cv-entry-head">
              <span className="cv-entry-title">
                {entry.school} · {entry.degree}
              </span>
              <span className="cv-entry-dates">{entry.dates}</span>
            </div>
            <ul className="cv-list">
              {entry.bullets.map((bullet, i) =>
                bullet.trim() ? <li key={i}>{bullet}</li> : null,
              )}
            </ul>
          </div>
        ),
      });
    });
  }

  if (data.skills.length > 0) {
    units.push({
      key: "skills",
      node: (
        <section className="cv-section">
          <h3 className="cv-heading">Skills</h3>
          {data.skills.map((group) => (
            <p key={group.group} className="cv-text">
              <strong>{group.group}:</strong> {group.items}
            </p>
          ))}
        </section>
      ),
    });
  }

  return units;
}

function paginate(
  heights: number[],
  budget: number,
): { pages: number[][]; overflow: boolean } {
  const pages: number[][] = [];
  let current: number[] = [];
  let used = 0;

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    if (current.length > 0 && used + height > budget) {
      pages.push(current);
      if (pages.length === 2) {
        return { pages, overflow: true };
      }
      current = [];
      used = 0;
    }
    current.push(i);
    used += height;
  }
  if (current.length > 0) pages.push(current);
  return { pages, overflow: false };
}

function PaginatedCv({ data }: { data: CvData }) {
  const fitRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number[][] | null>(null);
  const [overflow, setOverflow] = useState(false);
  const [compact, setCompact] = useState(false);
  const [scale, setScale] = useState(1);
  const units = useMemo(() => buildUnits(data), [data]);

  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const apply = () =>
      setScale(Math.min(1, (el.clientWidth - 24) / A4_WIDTH));
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = measureRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-unit-key]"));
    const heights = nodes.map(
      (node) => node.offsetHeight + (compact ? 10 : UNIT_GAP),
    );
    const frame = window.requestAnimationFrame(() => {
      const result = paginate(heights, PAGE_BUDGET);
      if (result.overflow && !compact) {
        setCompact(true);
        return;
      }
      setPages(result.pages);
      setOverflow(result.overflow);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [data, compact]);

  const width = Math.round(A4_WIDTH * scale);
  const pageCount = pages?.length ?? 0;

  return (
    <div ref={fitRef} className="mx-auto w-full">
      {pages === null ? (
        <div
          className="cv-page-placeholder mx-auto"
          style={{ width, height: Math.round(A4_HEIGHT * scale) }}
          aria-hidden
        />
      ) : (
        <div className="cv-page-stack mx-auto" style={{ width }}>
          {pages.map((pageUnits, pageIndex) => (
            <div
              key={`${pageIndex}-${pageUnits.join("-")}`}
              className="cv-page-row"
            >
              <div
                className="cv-page-wrap"
                style={{
                  width,
                  height: Math.round(A4_HEIGHT * scale),
                }}
              >
                <div
                  className={cn("cv-page", compact && "cv-compact")}
                  style={{
                    width: A4_WIDTH,
                    height: A4_HEIGHT,
                    transform: `scale(${scale})`,
                  }}
                >
                  {pageUnits.map((unitIndex) => (
                    <div key={units[unitIndex].key}>{units[unitIndex].node}</div>
                  ))}
                </div>
              </div>
              <p className="cv-page-label" data-print-hide>
                Page {pageIndex + 1} of {pageCount} · A4
              </p>
            </div>
          ))}
          {overflow ? (
            <p
              className="mx-auto max-w-md text-center text-xs text-destructive"
              data-print-hide
            >
              Still exceeds 2 pages even in compact mode — trim a few bullets so
              nothing is cut off in the PDF.
            </p>
          ) : null}
        </div>
      )}

      <div
        className={cn("cv-measure", compact && "cv-compact")}
        ref={measureRef}
        aria-hidden
      >
        {units.map((unit) => (
          <div key={unit.key} data-unit-key={unit.key}>
            {unit.node}
          </div>
        ))}
      </div>
    </div>
  );
}