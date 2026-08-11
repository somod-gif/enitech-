import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { jsPDF } from "jspdf";

const DATA = {
  name: "Badmus Samad Eniola",
  role: "Software Engineer",
  email: "eniolabadmus351@gmail.com",
  phone: "+234 814 643 8621",
  location: "Lagos, Nigeria",
  website: "enitech.vercel.app",
  github: "github.com/somod-gif",
  linkedin: "linkedin.com/in/badmus-eniola001",
  summary: [
    "Software Engineer with 2+ years of experience shipping scalable fintech, SaaS, and e-commerce applications, including payments platforms integrated with Paystack and Flutterwave. I build full-stack products end-to-end with React, Next.js, TypeScript, Node.js, NestJS, and Java Spring Boot — improving performance, reliability, and user experience. I turn complex problems into clean, maintainable code that delivers measurable business impact.",
  ],
  experience: [
    {
      company: "Carticom",
      role: "Software Engineer",
      dates: "May 2026 – Present",
      bullets: [
        "Designed and developed a multi-tenant AI-powered commerce platform using Java Spring Boot, Next.js, PostgreSQL, and Redis.",
        "Implemented secure payment workflows, escrow transactions, role-based access control, and Paystack and Flutterwave integrations.",
        "Built backend APIs and responsive frontend features while contributing to system architecture, testing, debugging, deployments, and continuous platform improvements.",
      ],
    },
    {
      company: "BanffPay Limited",
      role: "Backend Engineering Intern",
      dates: "May 2026 – Nov 2026",
      bullets: [
        "Collaborated with backend engineers on Java Spring Boot microservices supporting fintech payment infrastructure and backend services.",
        "Integrated and tested third-party payment APIs, verified REST endpoints with Postman, and participated in debugging and validating transaction workflows.",
        "Worked within an enterprise microservices architecture while learning and applying backend engineering, API integration, testing, and software development practices.",
      ],
    },
    {
      company: "Meu Deliver",
      role: "Software Developer",
      dates: "Jun 2025 – Dec 2025",
      bullets: [
        "Developed backend services with NestJS and PostgreSQL for authentication, orders, delivery, and user management.",
        "Built responsive frontend applications with Next.js and TypeScript for customers, vendors, and riders.",
        "Collaborated with product, design, and engineering teams to develop features, optimize database operations, troubleshoot issues, and improve application reliability.",
      ],
    },
    {
      company: "Accessivo",
      role: "Frontend Engineer",
      dates: "Aug 2025 – Jan 2026",
      bullets: [
        "Built responsive and accessible user interfaces using React, Next.js, TypeScript, and Tailwind CSS with reusable component architecture.",
        "Integrated REST APIs and implemented frontend state management and data flows for fintech applications.",
        "Collaborated with designers and backend engineers on feature development, debugging, code reviews, and maintaining a scalable frontend codebase.",
      ],
    },
    {
      company: "59Minutes Print",
      role: "Software Engineer",
      dates: "Jan 2025 – Dec 2025",
      bullets: [
        "Developed and maintained responsive frontend features and reusable UI components for a printing and e-commerce platform.",
        "Built backend APIs supporting product ordering, vendor management, authentication, and business operations.",
        "Collaborated across product and engineering workflows on feature development, debugging, deployments, code reviews, and technical documentation.",
      ],
    },
  ],
  education: [
    {
      school: "Federal University of Technology Minna",
      degree: "B. Tech in Information Technology",
      dates: "2023 – Present",
      bullets: [],
    },
  ],
  skills: [
    { group: "Programming Languages", items: "Java, JavaScript, TypeScript, PHP" },
    { group: "Frontend", items: "React, Next.js, React Native, Expo, Tailwind CSS" },
    { group: "Backend", items: "Node.js, Express.js, NestJS, Spring Boot" },
    { group: "Databases", items: "PostgreSQL, MySQL, MongoDB, Redis, BigQuery" },
    { group: "APIs & Protocols", items: "GraphQL, REST, gRPC, WebSockets" },
    { group: "Messaging", items: "RabbitMQ, Google Pub/Sub" },
    { group: "Cloud & DevOps", items: "Git, GitHub, Docker, Kubernetes, GitLab CI/CD, Postman, AWS, Azure, Oracle Cloud, Vercel, Render" },
    {
      group: "Architecture & Engineering",
      items: "Microservices, API Integration, AI Integration",
    },
    { group: "Testing", items: "Jest, JUnit, Postman" },
    { group: "Methodologies", items: "Agile, Scrum" },
    {
      group: "Concepts",
      items: "Object-Oriented Programming (OOP), SOLID Principles, ACID Transactions, Design Patterns",
    },
  ],
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 17;
const MARGIN_TOP = 15;
const MARGIN_BOTTOM = 15;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const CONTENT_H = PAGE_H - MARGIN_TOP - MARGIN_BOTTOM;
const PT = 2.835;

const measureDoc = new jsPDF({ orientation: "portrait", unit: "mm", format: [PAGE_W, PAGE_H] });

function buildScale(scale) {
  const pt = (value) => value * scale;

  const STYLES = {
    name: { size: 26, lh: 1.05 },
    role: { size: 12.5, lh: 1.3 },
    location: { size: 10.5, lh: 1.3 },
    contact: { size: 8.6, lh: 1.3 },
    heading: { size: 10.5, lh: 1.4 },
    text: { size: 10.3, lh: 1.44 },
    entry: { size: 10.3, lh: 1.44 },
    dates: { size: 9.3, lh: 1.44 },
    bullet: { size: 10.3, lh: 1.5 },
    skill: { size: 10.3, lh: 1.48 },
  };
  const lineHeight = (key) => (STYLES[key].size * STYLES[key].lh * scale) / PT;

  measureDoc.setFont("helvetica", "normal");
  const wrap = (text, key, width) => {
    measureDoc.setFontSize(pt(STYLES[key].size));
    return measureDoc.splitTextToSize(text, width);
  };
  const textWidth = (text, key) => {
    measureDoc.setFontSize(pt(STYLES[key].size));
    return measureDoc.getTextWidth(text);
  };

  const blocks = [];
  const gap = (h) => blocks.push({ type: "gap", h });
  const rule = (w) => blocks.push({ type: "rule", w });

  const heading = (title) => {
    gap(7.5 * scale);
    blocks.push({ type: "header", value: title, key: "heading" });
    blocks.push({ type: "headerRule" });
    gap(3.5 * scale);
  };

  const entryBlock = (left, right) => {
    if (!right) {
      blocks.push({ type: "entry", left, right: "", key: "entry" });
      return;
    }
    const fits = textWidth(left, "entry") + textWidth(right, "dates") <= CONTENT_W;
    blocks.push({ type: "entry", left, right: fits ? right : "", key: "entry" });
    if (!fits) {
      blocks.push({ type: "sub", text: right, key: "dates" });
      gap(1);
    }
  };

  const bullets = (list) => {
    list.forEach((text) => {
      const lines = wrap(text, "bullet", CONTENT_W - 7);
      blocks.push({ type: "bullets", lines, key: "bullet" });
      gap(1.6 * scale);
    });
  };

  const skillRows = () => {
    DATA.skills.forEach((group) => {
      const label = `${group.group}:`;
      const itemLines = wrap(group.items, "skill", CONTENT_W - textWidth(label, "skill") - 2.5);
      const h = Math.max(itemLines.length, 1) * lineHeight("skill");
      blocks.push({ type: "skillRow", left: { label, lines: itemLines }, right: null, colW: CONTENT_W, h });
      gap(1.8 * scale);
    });
  };

  const contactSegments = [
    { text: DATA.email, url: `mailto:${DATA.email}` },
    { text: DATA.phone, url: `tel:${DATA.phone.replace(/[^+\d]/g, "")}` },
    { text: DATA.website, url: `https://${DATA.website}` },
    { text: DATA.github, url: `https://${DATA.github}` },
    { text: DATA.linkedin, url: `https://${DATA.linkedin}` },
  ];
  const contactSep = " | ";

  blocks.push({ type: "name", value: DATA.name.toUpperCase(), key: "name" });
  blocks.push({ type: "sub", text: DATA.role, key: "role", center: true });
  gap(1 * scale);
  blocks.push({ type: "location", text: DATA.location, key: "location", center: true });
  gap(1.5 * scale);
  blocks.push({ type: "contact", segments: contactSegments, sep: contactSep, key: "contact" });
  gap(4.5 * scale);
  rule(CONTENT_W);
  gap(4.5 * scale);

  heading("Professional Summary");
  DATA.summary.forEach((text) => {
    const lines = wrap(text, "text", CONTENT_W);
    blocks.push({ type: "text", lines, key: "text" });
    gap(2.4 * scale);
  });

  heading("Experience");
  DATA.experience.forEach((entry, index) => {
    entryBlock(`${entry.company} · ${entry.role}`, entry.dates);
    bullets(entry.bullets);
    if (index < DATA.experience.length - 1) gap(3.5 * scale);
  });

  heading("Education");
  DATA.education.forEach((entry, index) => {
    entryBlock(entry.school, entry.dates);
    blocks.push({ type: "sub", text: entry.degree, key: "dates", center: false });
    gap(1);
    bullets(entry.bullets);
    if (index < DATA.education.length - 1) gap(3.5 * scale);
  });

  heading("Skills");
  skillRows();

  const pages = [];
  let current = [];
  let used = 0;

  const blockHeight = (b) => {
    switch (b.type) {
      case "name":
      case "header":
        return lineHeight(b.key);
      case "sub":
      case "location":
      case "contact":
        return lineHeight(b.key);
      case "text":
        return b.lines.length * lineHeight(b.key);
      case "contact":
      case "entry":
        return lineHeight(b.key);
      case "headerRule":
        return 0.9 + 1.8 * scale;
      case "rule":
        return 0.5;
      case "bullets":
        return b.lines.length * lineHeight(b.key);
      case "skillRow":
        return b.h;
      case "gap":
        return b.h;
      default:
        return 0;
    }
  };

  blocks.forEach((b) => {
    const h = blockHeight(b);
    if (h === 0) {
      current.push(b);
      return;
    }
    if (used + h > CONTENT_H && current.length > 0) {
      pages.push(current);
      current = [];
      used = 0;
    }
    current.push(b);
    used += h;
  });
  if (current.length > 0) pages.push(current);

  return { pages, STYLES, scale };
}

let plan = null;
for (const scale of [1, 0.94, 0.88, 0.82, 0.76]) {
  plan = buildScale(scale);
  if (plan.pages.length <= 2) break;
}
if (!plan || plan.pages.length > 2) {
  console.error("Could not fit the resume into 2 pages.");
  process.exit(1);
}

const { pages, STYLES, scale } = plan;
const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [PAGE_W, PAGE_H], compress: true });
doc.setProperties({
  title: `${DATA.name} — CV`,
  author: DATA.name,
  creator: "Enitech CV Builder",
  subject: `${DATA.role} — Curriculum Vitae`,
});

const INK = [0, 0, 0];

const ptSize = (key) => STYLES[key].size * scale;

pages.forEach((pageBlocks, pageIndex) => {
  if (pageIndex > 0) doc.addPage([PAGE_W, PAGE_H], "portrait");

  let y = MARGIN_TOP;

  pageBlocks.forEach((b) => {
    switch (b.type) {
      case "name": {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(ptSize("name"));
        doc.setTextColor(...INK);
        const cs = 2 * scale;
        const w = doc.getTextWidth(b.value) + cs * (b.value.length - 1);
        doc.text(b.value, (PAGE_W - w) / 2, y, { charSpace: cs });
        y += (STYLES.name.size * STYLES.name.lh * scale) / PT;
        return;
      }
      case "sub": {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(ptSize(b.key));
        doc.setTextColor(...INK);
        doc.text(b.text, b.center ? PAGE_W / 2 : MARGIN_X, y, { align: b.center ? "center" : "left" });
        break;
      }
      case "location": {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(ptSize("location"));
        doc.setTextColor(...INK);
        doc.text(b.text, PAGE_W / 2, y, { align: "center" });
        break;
      }
      case "contact": {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(ptSize("contact"));
        doc.setTextColor(...INK);
        const sepW = doc.getTextWidth(b.sep);
        const widths = b.segments.map((s) => doc.getTextWidth(s.text));
        const totalW = widths.reduce((a, w) => a + w, 0) + sepW * (b.segments.length - 1);
        let x = (PAGE_W - totalW) / 2;
        b.segments.forEach((seg, i) => {
          if (seg.url) {
            doc.textWithLink(seg.text, x, y, { url: seg.url });
          } else {
            doc.text(seg.text, x, y);
          }
          x += widths[i];
          if (i < b.segments.length - 1) {
            doc.text(b.sep, x, y);
            x += sepW;
          }
        });
        break;
      }
      case "header": {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(ptSize("heading"));
        doc.setTextColor(...INK);
        doc.text(b.value.toUpperCase(), MARGIN_X, y);
        break;
      }
      case "headerRule": {
        doc.setDrawColor(...INK);
        doc.setLineWidth(0.7);
        doc.line(MARGIN_X, y + 1.4, PAGE_W - MARGIN_X, y + 1.4);
        break;
      }
      case "rule": {
        doc.setDrawColor(...INK);
        doc.setLineWidth(0.8);
        doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
        break;
      }
      case "text": {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(ptSize("text"));
        doc.setTextColor(...INK);
        b.lines.forEach((line, i) => doc.text(line, MARGIN_X, y + i * ((STYLES.text.size * STYLES.text.lh * scale) / PT)));
        break;
      }
      case "entry": {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(ptSize("entry"));
        doc.setTextColor(...INK);
        doc.text(b.left, MARGIN_X, y);
        if (b.right) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(ptSize("dates"));
          doc.setTextColor(...INK);
          doc.text(b.right, PAGE_W - MARGIN_X, y, { align: "right" });
        }
        break;
      }
      case "bullets": {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(ptSize("bullet"));
        doc.setTextColor(...INK);
        doc.text("•", MARGIN_X, y);
        b.lines.forEach((line, i) => doc.text(line, MARGIN_X + 4.5, y + i * ((STYLES.bullet.size * STYLES.bullet.lh * scale) / PT)));
        break;
      }
      case "skillRow": {
        const draw = (cell, x) => {
          if (!cell) return;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(ptSize("skill"));
          doc.setTextColor(...INK);
          doc.text(cell.label, x, y);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(...INK);
          cell.lines.forEach((line, i) =>
            doc.text(line, x + doc.getTextWidth(cell.label) + 4, y + i * ((STYLES.skill.size * STYLES.skill.lh * scale) / PT)),
          );
        };
        draw(b.left, MARGIN_X);
        draw(b.right, MARGIN_X + b.colW + 5);
        break;
      }
      case "gap":
        break;
      default:
        break;
    }
    const h =
      b.type === "name" ? (STYLES.name.size * STYLES.name.lh * scale) / PT
      : b.type === "sub" || b.type === "location" || b.type === "contact" || b.type === "entry" ? (STYLES[b.key].size * STYLES[b.key].lh * scale) / PT
      : b.type === "text" ? b.lines.length * ((STYLES.text.size * STYLES.text.lh * scale) / PT)
      : b.type === "bullets" ? b.lines.length * ((STYLES.bullet.size * STYLES.bullet.lh * scale) / PT)
      : b.type === "skillRow" ? b.h
      : b.type === "headerRule" ? 0.9 + 1.8 * scale
      : b.type === "rule" ? 0.5
      : b.type === "gap" ? b.h
      : 0;
    y += h;
  });
});

const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), "..", "badmus-samad-eniola-cv.pdf");
try {
  writeFileSync(outputPath, Buffer.from(doc.output("arraybuffer")));
} catch (err) {
  if (err.code !== "EBUSY" && err.code !== "EPERM") throw err;
  const alt = outputPath.replace(/\.pdf$/, ".new.pdf");
  writeFileSync(alt, Buffer.from(doc.output("arraybuffer")));
  console.error(`NOTE: ${outputPath.replace(/\\/g, "/")} is open in another program.`);
  console.error(`      Wrote to ${alt.replace(/\\/g, "/")} instead — close the PDF and rerun.`);
  process.exit(2);
}

console.log(`Written: ${outputPath}`);
console.log(`Pages: ${doc.getNumberOfPages()} (target: 2)`);
console.log(`Type scale: ${scale}`);