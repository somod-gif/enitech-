export const READING_SPEED = 210;

export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingMinutes(markdown: string) {
  const words = stripMarkdown(markdown).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / READING_SPEED));
}

export function readingTimeLabel(minutes: number) {
  return `${minutes} min read`;
}
