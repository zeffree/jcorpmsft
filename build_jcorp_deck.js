// JCorp x Microsoft Copilot - Sponsor Pitch Deck
// Engine: pptxGenJS  |  Layout: WIDE 13.3" x 7.5"
// Output: ../../output/jcorpmsft-copilot-adoption.pptx

const pptxgen = require("pptxgenjs");
const QRCode = require("qrcode");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaRocket, FaBolt, FaTools, FaRainbow,
  FaUsers, FaChartLine, FaShieldAlt, FaTrophy,
  FaLightbulb, FaHandshake, FaStar, FaGraduationCap,
  FaMapMarkedAlt, FaComments, FaCheckCircle, FaCog
} = require("react-icons/fa");

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  // Brand
  jcorp: "00A36C",
  jcorpDeep: "006A4E",
  jcorpDark: "004D38",
  msBlue: "0078D4",
  // Pop palette (fun slides)
  pink: "FF4F8B",
  orange: "FF8A3D",
  yellow: "FFD23F",
  purple: "8B5CF6",
  cyan: "22D3EE",
  // Neutrals
  ink: "1A1A2E",
  charcoal: "2D3748",
  body: "4A5568",
  muted: "718096",
  border: "E2E8F0",
  bg: "FFF9F0",
  white: "FFFFFF",
  cream: "FEF6E4",
};

const F = { heading: "Calibri", body: "Calibri" };
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "JCorp x Microsoft Copilot - 12-Month Adoption Plan";
pres.author = "Microsoft Malaysia";
pres.company = "Microsoft Malaysia";

// ============================================================
// HELPERS
// ============================================================
const shadowSoft = () => ({ type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.12 });
const shadowMed  = () => ({ type: "outer", color: "000000", blur: 12, offset: 3, angle: 90, opacity: 0.18 });

async function iconPng(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "data:image/png;base64," + buf.toString("base64");
}

async function qrPng(text) {
  const dataUrl = await QRCode.toDataURL(text, { margin: 1, width: 400, color: { dark: "#" + C.ink, light: "#FFFFFF" } });
  return dataUrl;
}

function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: SLIDE_H - 0.35, w: SLIDE_W, h: 0.35,
    fill: { color: C.cream }, line: { color: C.cream }
  });
  slide.addText("JCorp x Microsoft Copilot  |  12-Month Adoption Program  |  Confidential", {
    x: 0.4, y: SLIDE_H - 0.35, w: 9, h: 0.35,
    fontSize: 9, fontFace: F.body, color: C.muted, valign: "middle"
  });
  slide.addText(String(pageNum), {
    x: SLIDE_W - 0.7, y: SLIDE_H - 0.35, w: 0.4, h: 0.35,
    fontSize: 9, fontFace: F.body, color: C.muted, valign: "middle", align: "right", bold: true
  });
}

function sectionBanner(slide, kicker, kickerColor) {
  slide.addText(kicker, {
    x: 0.5, y: 0.45, w: 12, h: 0.35,
    fontSize: 11, fontFace: F.body, color: kickerColor, bold: true, charSpacing: 4
  });
}

function pageTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.5, y: 0.85, w: 12, h: 0.7,
    fontSize: 30, fontFace: F.heading, color: C.ink, bold: true
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 1.55, w: 12, h: 0.4,
      fontSize: 14, fontFace: F.body, color: C.body, italic: true
    });
  }
}

// ============================================================
// MAIN
// ============================================================
(async () => {

  // Pre-render all icons
  const ico = {
    rocket: await iconPng(FaRocket, "#" + C.yellow),
    bolt: await iconPng(FaBolt, "#" + C.yellow),
    tools: await iconPng(FaTools, "#" + C.white),
    rainbow: await iconPng(FaRainbow, "#" + C.white),
    users: await iconPng(FaUsers, "#" + C.jcorpDeep),
    chart: await iconPng(FaChartLine, "#" + C.jcorpDeep),
    shield: await iconPng(FaShieldAlt, "#" + C.jcorpDeep),
    trophy: await iconPng(FaTrophy, "#" + C.yellow),
    bulb: await iconPng(FaLightbulb, "#" + C.orange),
    hand: await iconPng(FaHandshake, "#" + C.jcorpDeep),
    star: await iconPng(FaStar, "#" + C.yellow),
    grad: await iconPng(FaGraduationCap, "#" + C.purple),
    map: await iconPng(FaMapMarkedAlt, "#" + C.cyan),
    comments: await iconPng(FaComments, "#" + C.pink),
    check: await iconPng(FaCheckCircle, "#" + C.jcorp),
    cog: await iconPng(FaCog, "#" + C.muted),
  };

  // ==========================================================
  // SLIDE 1 - COVER (Fun)
  // ==========================================================
  let s = pres.addSlide();
  s.background = { color: C.jcorpDeep };
  // Decorative blobs
  s.addShape(pres.shapes.OVAL, { x: -2, y: -2, w: 5, h: 5, fill: { color: C.jcorp }, line: { color: C.jcorp } });
  s.addShape(pres.shapes.OVAL, { x: 9, y: 4.5, w: 6, h: 6, fill: { color: C.jcorpDark }, line: { color: C.jcorpDark } });
  s.addShape(pres.shapes.OVAL, { x: 10.5, y: -1, w: 3.5, h: 3.5, fill: { color: C.pink }, line: { color: C.pink } });
  s.addShape(pres.shapes.OVAL, { x: 0.5, y: 6, w: 2, h: 2, fill: { color: C.yellow }, line: { color: C.yellow } });

  s.addText("12-MONTH ADVENTURE", {
    x: 0.8, y: 1.3, w: 8, h: 0.4,
    fontSize: 13, fontFace: F.body, color: C.yellow, bold: true, charSpacing: 6
  });
  s.addText([
    { text: "JCorp ", options: { color: C.white } },
    { text: "x ", options: { color: C.yellow } },
    { text: "Copilot", options: { color: C.white } },
  ], {
    x: 0.8, y: 1.8, w: 11, h: 1.5,
    fontSize: 80, fontFace: F.heading, bold: true
  });
  s.addText("Let's make work magical.", {
    x: 0.8, y: 3.5, w: 10, h: 0.7,
    fontSize: 32, fontFace: F.heading, color: C.white, italic: true
  });
  s.addText("A 12-month, remote-first M365 Copilot enablement program for Johor Corporation HQ.\nDelivered live from Microsoft Kuala Lumpur.", {
    x: 0.8, y: 4.4, w: 10, h: 1,
    fontSize: 16, fontFace: F.body, color: C.white, lineSpacing: 26
  });

  s.addText([
    { text: "Prepared for ", options: { color: C.white } },
    { text: "Johor Corporation", options: { bold: true, color: C.yellow } },
    { text: "  |  By ", options: { color: C.white } },
    { text: "Microsoft Malaysia", options: { bold: true, color: C.yellow } },
  ], {
    x: 0.8, y: 6.6, w: 10, h: 0.4,
    fontSize: 13, fontFace: F.body
  });

  // ==========================================================
  // SLIDE 2 - EXECUTIVE SUMMARY (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "EXECUTIVE SUMMARY", C.jcorpDeep);
  pageTitle(s, "A 12-month program to skill 200 JCorp employees", "Remote-first delivery from Microsoft KL with executive on-site touchpoints");

  // 4 KPI tiles
  const kpis = [
    { n: "200", l: "JCorp HQ employees" },
    { n: "12 mo", l: "Four phased quests" },
    { n: "75%", l: "Weekly active target" },
    { n: "85%", l: "Sessions delivered remotely" },
  ];
  kpis.forEach((k, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.3, w: 2.95, h: 1.5, rectRadius: 0.12,
      fill: { color: C.cream }, line: { color: C.border, width: 1 }, shadow: shadowSoft()
    });
    s.addText(k.n, { x, y: 2.45, w: 2.95, h: 0.8, fontSize: 36, fontFace: F.heading, color: C.jcorpDeep, bold: true, align: "center" });
    s.addText(k.l, { x, y: 3.25, w: 2.95, h: 0.4, fontSize: 11, fontFace: F.body, color: C.muted, align: "center", charSpacing: 1 });
  });

  // Two columns: Why & Outcomes
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.1, w: 6.1, h: 2.7, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.border, width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.1, w: 0.1, h: 2.7, fill: { color: C.jcorp }, line: { color: C.jcorp } });
  s.addText("Why this plan", { x: 0.85, y: 4.25, w: 5.6, h: 0.4, fontSize: 16, fontFace: F.heading, color: C.ink, bold: true });
  s.addText("JCorp's 200 HQ employees are a high-leverage population to demonstrate measurable productivity gains. The Johor-KL gap makes a remote-first cadence the only sustainable model. On-site time is reserved for executive sponsorship and milestone events that genuinely require physical presence.", {
    x: 0.85, y: 4.7, w: 5.6, h: 2.0, fontSize: 12.5, fontFace: F.body, color: C.body, lineSpacing: 20
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.85, y: 4.1, w: 6.1, h: 2.7, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.border, width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.85, y: 4.1, w: 0.1, h: 2.7, fill: { color: C.msBlue }, line: { color: C.msBlue } });
  s.addText("Outcomes by month 12", { x: 7.2, y: 4.25, w: 5.6, h: 0.4, fontSize: 16, fontFace: F.heading, color: C.ink, bold: true });
  s.addText([
    { text: "75% of licensed users active weekly", options: { bullet: true, breakLine: true } },
    { text: "10+ documented JCorp use cases with measured value", options: { bullet: true, breakLine: true } },
    { text: "15-person internal champions network sustaining adoption", options: { bullet: true, breakLine: true } },
    { text: "Executive scorecard tracked quarterly by JCorp leadership", options: { bullet: true } },
  ], { x: 7.2, y: 4.7, w: 5.6, h: 2.0, fontSize: 12.5, fontFace: F.body, color: C.body, lineSpacing: 22 });

  addFooter(s, 2);

  // ==========================================================
  // SLIDE 3 - THE OPPORTUNITY (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "THE OPPORTUNITY", C.pink);
  pageTitle(s, "Why M365 Copilot, why now for JCorp");

  const opps = [
    { i: ico.bulb, h: "Productivity is the new competitive moat", t: "Enterprises deploying generative AI report 30-50% time savings on document, analytics, and communication tasks. JCorp's HQ functions are highly information-intensive - prime ground for compounding gains." },
    { i: ico.shield, h: "Microsoft 365 is already your foundation", t: "Copilot extends the M365 environment JCorp already trusts and pays for. No net-new platform risk, no new vendors, no data residency surprise." },
    { i: ico.users, h: "200 HQ employees is the right size to win", t: "Large enough to demonstrate enterprise-grade outcomes. Small enough to instrument carefully and personalise the journey for each function." },
    { i: ico.chart, h: "The window is now", t: "Peer Malaysian conglomerates are deploying Copilot in 2026. Moving deliberately this year positions JCorp as a regional reference customer." },
  ];
  opps.forEach((o, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3, y = 2.3 + row * 2.35;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 6.05, h: 2.15, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.border, width: 1 }, shadow: shadowSoft() });
    s.addImage({ data: o.i, x: x + 0.25, y: y + 0.3, w: 0.5, h: 0.5 });
    s.addText(o.h, { x: x + 0.95, y: y + 0.25, w: 5.0, h: 0.5, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true });
    s.addText(o.t, { x: x + 0.25, y: y + 0.95, w: 5.7, h: 1.1, fontSize: 11.5, fontFace: F.body, color: C.body, lineSpacing: 18 });
  });
  addFooter(s, 3);

  // ==========================================================
  // SLIDE 4 - VISION (Fun)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.jcorpDeep };
  s.addShape(pres.shapes.OVAL, { x: 10, y: -2, w: 5, h: 5, fill: { color: C.pink }, line: { color: C.pink } });
  s.addShape(pres.shapes.OVAL, { x: -1.5, y: 5, w: 4, h: 4, fill: { color: C.yellow }, line: { color: C.yellow } });
  s.addText("OUR VISION", { x: 0.8, y: 0.8, w: 10, h: 0.4, fontSize: 13, fontFace: F.body, color: C.yellow, bold: true, charSpacing: 5 });
  s.addText("By month 12, every JCorp\nteammate has an AI sidekick.", {
    x: 0.8, y: 1.5, w: 11, h: 2.5, fontSize: 50, fontFace: F.heading, color: C.white, bold: true, lineSpacing: 56
  });
  s.addText("Drafting board papers in minutes. Summarising meetings before the door closes.\nAnalysing subsidiary performance over a coffee. Asking the company's knowledge a question, in plain English, and getting a real answer.", {
    x: 0.8, y: 4.4, w: 11.5, h: 1.8, fontSize: 17, fontFace: F.body, color: C.white, lineSpacing: 28
  });
  s.addText("That's the vibe. Let's go build it together.", {
    x: 0.8, y: 6.4, w: 11, h: 0.5, fontSize: 18, fontFace: F.heading, color: C.yellow, italic: true, bold: true
  });

  // ==========================================================
  // SLIDE 5 - AUDIENCE (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "AUDIENCE", C.jcorpDeep);
  pageTitle(s, "200 employees, 5 personas, tailored journeys");

  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Persona",
    labels: ["Knowledge Workers", "People Managers", "Specialists", "Champions", "Executive Leaders"],
    values: [120, 30, 25, 15, 10]
  }], {
    x: 0.5, y: 2.3, w: 5.8, h: 4.6,
    chartColors: [C.jcorpDeep, C.cyan, C.purple, C.yellow, C.pink],
    showLegend: true, legendPos: "b", legendFontSize: 11,
    showPercent: true, dataLabelFontSize: 10, dataLabelColor: "FFFFFF"
  });

  // Persona details table
  const personas = [
    ["Persona", "Users", "Focus"],
    ["Executive Leaders", "10", "Strategic decision support, exec briefings"],
    ["People Managers", "30", "Team productivity, meeting summarisation"],
    ["Knowledge Workers", "120", "Daily Office productivity, drafting"],
    ["Specialists", "25", "Excel analytics, contract review, policy"],
    ["Champions", "15", "Advanced use cases, peer coaching"],
  ];
  s.addTable(personas.map((row, ri) => row.map(cell => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.jcorpDeep }, color: C.white, bold: true, fontSize: 11, align: "left", valign: "middle" }
      : { fontSize: 11, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white } }
  }))), {
    x: 6.6, y: 2.3, w: 6.4, colW: [2.2, 0.9, 3.3],
    border: { pt: 0.5, color: C.border },
    rowH: 0.45
  });

  addFooter(s, 5);

  // ==========================================================
  // SLIDE 6 - DELIVERY MODEL (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "DELIVERY MODEL", C.jcorpDeep);
  pageTitle(s, "Remote-first by design - the Johor-KL gap, solved");

  s.addText("Microsoft is in KL. JCorp HQ is in Johor. We engineered the program around that reality from day one.", {
    x: 0.5, y: 1.65, w: 12, h: 0.5, fontSize: 14, fontFace: F.body, color: C.body, italic: true
  });

  const principles = [
    { c: C.msBlue, h: "Default to virtual", t: "Live virtual labs (max 25 learners), Teams Live Events, on-demand Microsoft Learn. Capped at 60 min per session - no fatigue." },
    { c: C.pink,   h: "Travel for impact, not for routine", t: "JCorp Senior Leadership immerses at Microsoft KL Executive Briefing Centre quarterly - more impactful than any Johor site visit." },
    { c: C.jcorp,  h: "Microsoft visits Johor 3 times in 12 months", t: "Launch party (M1), mid-year roadshow (M8), grand finale (M12). Each visit has a virtual fallback plan." },
    { c: C.purple, h: "Champions bridge the distance", t: "15 internal champions are the always-on presence between virtual sessions. They coach peers and keep momentum local." },
  ];
  principles.forEach((p, i) => {
    const y = 2.5 + i * 1.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y, w: 12.3, h: 0.95, rectRadius: 0.08, fill: { color: C.cream }, line: { color: C.border, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.12, h: 0.95, fill: { color: p.c }, line: { color: p.c } });
    s.addText(p.h, { x: 0.85, y: y + 0.12, w: 4.5, h: 0.35, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true });
    s.addText(p.t, { x: 0.85, y: y + 0.48, w: 11.6, h: 0.5, fontSize: 11.5, fontFace: F.body, color: C.body, lineSpacing: 16 });
  });
  addFooter(s, 6);

  // ==========================================================
  // SLIDE 7 - CHANNEL MIX (Executive with chart)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "CHANNEL MIX", C.jcorpDeep);
  pageTitle(s, "85% remote, 12% Microsoft KL, 3% on-site Johor");

  s.addChart(pres.charts.BAR, [
    { name: "Remote (virtual)", labels: ["Quest 1", "Quest 2", "Quest 3", "Quest 4"], values: [70, 88, 90, 85] },
    { name: "On-site Microsoft KL", labels: ["Quest 1", "Quest 2", "Quest 3", "Quest 4"], values: [20, 10, 8, 10] },
    { name: "On-site JCorp Johor", labels: ["Quest 1", "Quest 2", "Quest 3", "Quest 4"], values: [10, 2, 2, 5] },
  ], {
    x: 0.5, y: 2.3, w: 7.8, h: 4.4,
    barDir: "col", barGrouping: "stacked",
    chartColors: [C.msBlue, C.pink, C.jcorp],
    showLegend: true, legendPos: "b", legendFontSize: 11,
    catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
    valAxisMaxVal: 100, valAxisMinVal: 0,
    showValue: false
  });

  // Side commentary
  const sideY = 2.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.5, y: sideY, w: 4.5, h: 4.4, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.border, width: 1 } });
  s.addText("Why this mix works", { x: 8.7, y: sideY + 0.15, w: 4.2, h: 0.4, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true });
  s.addText([
    { text: "Reduces logistical burden", options: { bold: true, color: C.jcorpDeep, fontSize: 12, breakLine: true } },
    { text: "A 4-hour return KL-Johor commute per session is unsustainable for 12 months.", options: { fontSize: 11, color: C.body, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Preserves executive intimacy", options: { bold: true, color: C.jcorpDeep, fontSize: 12, breakLine: true } },
    { text: "Senior leaders get full in-person experience at Microsoft KL EBC - more impactful than any Johor visit.", options: { fontSize: 11, color: C.body, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Higher session frequency", options: { bold: true, color: C.jcorpDeep, fontSize: 12, breakLine: true } },
    { text: "Remote-first preserves consultant capacity, allowing weekly cadence rather than monthly.", options: { fontSize: 11, color: C.body } },
  ], { x: 8.7, y: sideY + 0.65, w: 4.2, h: 3.7, lineSpacing: 18, fontFace: F.body });

  addFooter(s, 7);

  // ==========================================================
  // SLIDE 8 - PERSONA ENGAGEMENT MODEL (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "ENGAGEMENT MODEL", C.jcorpDeep);
  pageTitle(s, "Cadence and channel by persona");

  const eng = [
    ["Persona", "Primary channel", "Cadence", "Format"],
    ["Executive Leaders", "On-site KL", "Quarterly", "Half-day immersion at Microsoft KL EBC"],
    ["People Managers", "Hybrid", "Monthly", "Virtual workshop + KL clinic per quarter"],
    ["Knowledge Workers", "Remote", "Bi-weekly", "Virtual labs + on-demand learning"],
    ["Specialists", "Remote", "Monthly", "Function-specific virtual deep-dives"],
    ["Champions", "Hybrid", "Weekly", "Virtual standups + quarterly KL bootcamp"],
  ];
  s.addTable(eng.map((row, ri) => row.map((cell, ci) => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.jcorpDeep }, color: C.white, bold: true, fontSize: 12, align: "left", valign: "middle" }
      : { fontSize: 12, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white }, bold: ci === 0 }
  }))), {
    x: 0.5, y: 2.3, w: 12.3, colW: [2.7, 2.4, 2.0, 5.2],
    border: { pt: 0.5, color: C.border }, rowH: 0.55
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 6.0, w: 12.3, h: 0.85, rectRadius: 0.08, fill: { color: C.cream }, line: { color: C.yellow, width: 2 } });
  s.addText([
    { text: "Principle:  ", options: { bold: true, color: C.jcorpDeep } },
    { text: "Cadence is calibrated to role intensity. Champions and managers carry the weight of weekly engagement; broader population engages bi-weekly to monthly to avoid fatigue." }
  ], { x: 0.75, y: 6.05, w: 11.8, h: 0.75, fontSize: 12, fontFace: F.body, color: C.body, valign: "middle" });

  addFooter(s, 8);

  // ==========================================================
  // SLIDE 9 - JOURNEY OVERVIEW (Fun)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.bg };
  sectionBanner(s, "THE JOURNEY", C.pink);
  pageTitle(s, "Four quests over twelve months", "Each quest is a season - different focus, same energy");

  const quests = [
    { c: C.pink,   ic: ico.rocket,  q: "Q1", t: "Lift-off",          m: "Months 1-3",  d: "Spark: sponsor, pilot, kick-off" },
    { c: C.orange, ic: ico.bolt,    q: "Q2", t: "Power Up",          m: "Months 4-6",  d: "Skill: onboard 200, train champions" },
    { c: C.purple, ic: ico.tools,   q: "Q3", t: "Build Cool Stuff",  m: "Months 7-9",  d: "Build: hackathon, deep-dives" },
    { c: C.cyan,   ic: ico.rainbow, q: "Q4", t: "Soar & Celebrate",  m: "Months 10-12",d: "Sustain: agents, finale, handover" },
  ];
  quests.forEach((q, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.4, w: 2.95, h: 4.4, rectRadius: 0.15, fill: { color: C.white }, line: { color: q.c, width: 3 }, shadow: shadowMed() });
    s.addShape(pres.shapes.OVAL, { x: x + 1.075, y: 2.7, w: 0.8, h: 0.8, fill: { color: q.c }, line: { color: q.c } });
    s.addText(q.q, { x: x + 1.075, y: 2.8, w: 0.8, h: 0.6, fontSize: 22, fontFace: F.heading, color: C.white, bold: true, align: "center", valign: "middle" });
    s.addText(q.t, { x: x + 0.15, y: 3.7, w: 2.65, h: 0.5, fontSize: 20, fontFace: F.heading, color: C.ink, bold: true, align: "center" });
    s.addText(q.m, { x: x + 0.15, y: 4.25, w: 2.65, h: 0.4, fontSize: 11, fontFace: F.body, color: q.c, bold: true, align: "center", charSpacing: 2 });
    s.addText(q.d, { x: x + 0.25, y: 4.8, w: 2.45, h: 1.5, fontSize: 12, fontFace: F.body, color: C.body, align: "center", lineSpacing: 18 });
    s.addImage({ data: q.ic, x: x + 1.275, y: 6.05, w: 0.4, h: 0.4 });
  });
  addFooter(s, 9);

  // Helper for quest detail slides
  function questDetail(num, color, badgeColor, qLabel, qTitle, months, mood, missions, pin) {
    const sl = pres.addSlide(); sl.background = { color: C.bg };
    sectionBanner(sl, `QUEST ${qLabel.replace("Q","")} OF 4`, color);
    sl.addText(qTitle, { x: 0.5, y: 0.85, w: 11, h: 0.7, fontSize: 36, fontFace: F.heading, color: C.ink, bold: true });
    sl.addText(`${months}  |  ${mood}`, { x: 0.5, y: 1.6, w: 11, h: 0.4, fontSize: 14, fontFace: F.body, color: color, bold: true });

    // Big quest badge
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 10.5, y: 0.7, w: 2.3, h: 1.3, rectRadius: 0.15, fill: { color: badgeColor }, line: { color: badgeColor }, shadow: shadowMed() });
    sl.addText(qLabel, { x: 10.5, y: 0.7, w: 2.3, h: 1.3, fontSize: 56, fontFace: F.heading, color: C.white, bold: true, align: "center", valign: "middle" });

    // Pin / highlight
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 2.3, w: 12.3, h: 0.6, rectRadius: 0.3, fill: { color: C.yellow }, line: { color: C.ink, width: 1.5 } });
    sl.addText(pin, { x: 0.5, y: 2.3, w: 12.3, h: 0.6, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true, align: "center", valign: "middle" });

    // Mission cards (2x2)
    missions.forEach((m, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * 6.3, y = 3.2 + row * 1.7;
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 6.05, h: 1.55, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadowSoft() });
      sl.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.3, w: 0.6, h: 0.6, fill: { color: color }, line: { color: color } });
      sl.addText(String(i + 1), { x: x + 0.25, y: y + 0.3, w: 0.6, h: 0.6, fontSize: 18, fontFace: F.heading, color: C.white, bold: true, align: "center", valign: "middle" });
      sl.addText(m.h, { x: x + 1.05, y: y + 0.2, w: 4.85, h: 0.45, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true });
      sl.addText(m.t, { x: x + 1.05, y: y + 0.65, w: 4.85, h: 0.85, fontSize: 11.5, fontFace: F.body, color: C.body, lineSpacing: 16 });
    });

    addFooter(sl, num);
  }

  // ==========================================================
  // SLIDE 10 - QUEST 1
  // ==========================================================
  questDetail(10, C.pink, C.pink, "Q1", "Lift-off", "Months 1-3", "Spark phase", [
    { h: "Big launch party at JCorp HQ", t: "Single Microsoft visit to Johor. Full HQ workforce energised. Sponsor publicly commits." },
    { h: "Leadership immersion at Microsoft KL", t: "Half-day at the EBC. Demos, hands-on, peer conversations with other executives." },
    { h: "Pilot squad of 25 early adopters", t: "Mix of champions and managers test-drive everything before broad rollout." },
    { h: "Readiness assessment & governance", t: "M365 hygiene check, sensitivity labels, steering committee formed (JCorp + Microsoft)." },
  ], "🎬 Kick-off!");

  // ==========================================================
  // SLIDE 11 - QUEST 2
  // ==========================================================
  questDetail(11, C.orange, C.orange, "Q2", "Power Up", "Months 4-6", "Skill phase", [
    { h: "All 200 teammates onboarded", t: "Phased license rollout (50/month) with role-based virtual labs - 8 labs/week, max 25 learners each." },
    { h: "Champions bootcamp at Microsoft KL", t: "1.5 days in person. Advanced Copilot, prompt craft, change management. Champions take it home." },
    { h: "Weekly Lunch & Learn sessions", t: "60-minute virtual format. Real workflows, real wins. Recorded for the on-demand library." },
    { h: "First quarterly executive review", t: "Senior Leadership returns to Microsoft KL to review adoption telemetry and shape Quest 3." },
  ], "🎓 Champions assemble!");

  // ==========================================================
  // SLIDE 12 - QUEST 3
  // ==========================================================
  questDetail(12, C.purple, C.purple, "Q3", "Build Cool Stuff", "Months 7-9", "Build phase", [
    { h: "JCorp Copilot Hackathon", t: "Cross-function teams co-design 5 JCorp-specific scenarios. Virtual build, KL judging." },
    { h: "Function-specific deep-dives", t: "Virtual deep-dives for Finance, HR, Legal, Operations. Real artefacts, real value capture." },
    { h: "Mid-year roadshow in Johor", t: "Microsoft team visits JCorp HQ. Listening tour, health check, momentum boost." },
    { h: "Live adoption leaderboard", t: "Microsoft Adoption Score dashboard goes live. Friendly team-vs-team competition begins." },
  ], "🏆 Hackathon time!");

  // ==========================================================
  // SLIDE 13 - QUEST 4
  // ==========================================================
  questDetail(13, C.cyan, C.cyan, "Q4", "Soar & Celebrate", "Months 10-12", "Sustain phase", [
    { h: "Build your own AI agents", t: "Advanced sessions on Copilot Studio, Pages, agent governance. JCorp-specific agents shipped." },
    { h: "Story showcase on camera", t: "Teammates star in 60-second clips telling their best Copilot story. Library kept for year-2." },
    { h: "Year-end celebration in Johor", t: "Microsoft visits JCorp HQ for the grand finale. Awards, case study readout, year-2 preview." },
    { h: "Champions take the wheel", t: "JCorp owns the ongoing cadence. Microsoft steps into a sustained advisor role." },
  ], "🎉 Celebrate!");

  // ==========================================================
  // SLIDE 14 - CHAMPIONS NETWORK (Mixed)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "CHAMPIONS NETWORK", C.purple);
  pageTitle(s, "15 internal heroes leading the charge", "The always-on local presence that bridges the Johor-KL distance");

  const champBlocks = [
    { c: C.purple, h: "Composition (15 total)", items: ["2 Executive Office / Strategy", "3 Finance & Investments", "2 Legal & Compliance", "2 HR & People", "2 Corporate Affairs", "2 IT / Digital", "2 Operations / Property"] },
    { c: C.jcorpDeep, h: "Time commitment", items: ["~4 hours per week (peer coaching)", "1.5-day bootcamp at Microsoft KL", "Quarterly retreat at Microsoft KL", "Weekly virtual standup with MS Customer Success"] },
    { c: C.pink, h: "Champion perks", items: ["Early access to new Copilot features", "Public recognition by JCorp sponsor", "Microsoft KL EBC experiences", "Champion swag pack", "Year-2 advisory role on Microsoft account team"] },
  ];
  champBlocks.forEach((b, i) => {
    const x = 0.5 + i * 4.27;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.3, w: 4.05, h: 4.5, rectRadius: 0.12, fill: { color: C.cream }, line: { color: C.border, width: 1 }, shadow: shadowSoft() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.3, w: 4.05, h: 0.5, fill: { color: b.c }, line: { color: b.c } });
    s.addText(b.h, { x: x + 0.2, y: 2.32, w: 3.7, h: 0.5, fontSize: 14, fontFace: F.heading, color: C.white, bold: true, valign: "middle" });
    s.addText(b.items.map((it, k) => ({ text: it, options: { bullet: true, breakLine: k < b.items.length - 1 } })),
      { x: x + 0.25, y: 3.0, w: 3.6, h: 3.7, fontSize: 12, fontFace: F.body, color: C.body, lineSpacing: 22 });
  });
  addFooter(s, 14);

  // ==========================================================
  // SLIDE 15 - PRIORITY USE CASES (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "PRIORITY USE CASES", C.jcorpDeep);
  pageTitle(s, "Top 10 JCorp-specific scenarios", "Each paired with a champion, with measurable baselines taken before rollout");

  const useCases = [
    ["#", "Use case", "Function", "Indicative value"],
    ["1", "Board paper drafting & summarisation", "Executive Office", "40-50% drafting time reduction"],
    ["2", "Subsidiary performance roll-up analytics", "Strategy / Finance", "2-4 hrs/analyst/week"],
    ["3", "Meeting recap, actions and decisions", "All managers", "30 min/meeting saved"],
    ["4", "Investor & stakeholder briefing decks", "Corporate Affairs", "50% deck-build time reduction"],
    ["5", "Contract first-pass review", "Legal", "1-2 hrs/contract"],
    ["6", "HR policy Q&A & onboarding assistant", "HR", "Reduces HR ticket volume"],
    ["7", "Email triage & response drafting", "All employees", "30-45 min/day saved"],
    ["8", "Tender / RFP response drafting", "Business Development", "40% turnaround reduction"],
    ["9", "Internal knowledge search", "All employees", "Faster onboarding, fewer 'who knows X' emails"],
    ["10", "Sustainability / ESG report drafting", "Corporate Affairs", "Quarterly cycle compression"],
  ];
  s.addTable(useCases.map((row, ri) => row.map((cell, ci) => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.jcorpDeep }, color: C.white, bold: true, fontSize: 11, align: ci === 0 ? "center" : "left", valign: "middle" }
      : { fontSize: 11, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white }, align: ci === 0 ? "center" : "left", bold: ci === 1 }
  }))), {
    x: 0.5, y: 2.3, w: 12.3, colW: [0.6, 4.4, 2.6, 4.7],
    border: { pt: 0.5, color: C.border }, rowH: 0.38
  });
  addFooter(s, 15);

  // ==========================================================
  // SLIDE 16 - ENGAGEMENT TACTICS (Fun)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.bg };
  sectionBanner(s, "ENGAGEMENT TACTICS", C.pink);
  pageTitle(s, "What keeps everyone hyped for 12 months");

  const tactics = [
    { c: C.yellow, e: "🏅", h: "Badge collection", t: "Earn digital badges for every milestone, shown in Teams profiles." },
    { c: C.pink,   e: "📊", h: "Live leaderboard", t: "Friendly team-vs-team adoption rankings. Bragging rights at stake." },
    { c: C.cyan,   e: "🎙️", h: "Copilot Confessions", t: "Monthly podcast where teammates share their best (and weirdest) prompts." },
    { c: C.orange, e: "🎂", h: "Win-of-the-Week", t: "Every Friday, one teammate's time-saving story gets celebrated org-wide." },
    { c: C.purple, e: "🎨", h: "Prompt remix challenges", t: "Bi-weekly creative prompts. Best output gets featured and prized." },
    { c: C.jcorp,  e: "🍩", h: "Donut sessions", t: "Random pairings of teammates swap Copilot tips over a virtual coffee." },
    { c: C.msBlue, e: "🎬", h: "Story videos", t: "60-sec clips showing how Copilot changed someone's week." },
    { c: C.pink,   e: "🏆", h: "Quarterly awards", t: "Best builder, best teacher, biggest impact - presented by the JCorp sponsor." },
  ];
  tactics.forEach((t, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.5 + col * 3.15, y = 2.3 + row * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.95, h: 2.05, rectRadius: 0.12, fill: { color: C.white }, line: { color: t.c, width: 2 }, shadow: shadowSoft() });
    s.addText(t.e, { x: x + 0.2, y: y + 0.15, w: 0.8, h: 0.6, fontSize: 28, fontFace: F.body });
    s.addText(t.h, { x: x + 0.2, y: y + 0.7, w: 2.6, h: 0.4, fontSize: 13, fontFace: F.heading, color: C.ink, bold: true });
    s.addText(t.t, { x: x + 0.2, y: y + 1.1, w: 2.6, h: 0.85, fontSize: 10.5, fontFace: F.body, color: C.body, lineSpacing: 14 });
  });
  addFooter(s, 16);

  // ==========================================================
  // SLIDE 17 - SUCCESS SCORECARD (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "SUCCESS SCORECARD", C.jcorpDeep);
  pageTitle(s, "What 'winning' looks like by month 12", "Tracked monthly via Microsoft Adoption Score and quarterly pulse surveys");

  const scoreboard = [
    ["KPI", "Source", "Q2 target", "Q4 target"],
    ["% licensed users active weekly", "Adoption Score", "50%", "75%"],
    ["Avg actions/user/week", "Copilot telemetry", "15", "30"],
    ["Documented use cases with quantified value", "Champions log", "5", "10"],
    ["Self-reported time saved (hrs/user/week)", "Pulse survey", "3", "5"],
    ["Sentiment NPS (Copilot helpfulness)", "Pulse survey", "+30", "+50"],
    ["Active champions in network", "Roster + activity", "15", "15"],
    ["Training completion rate", "Microsoft Learn / SharePoint", "70%", "90%"],
  ];
  s.addTable(scoreboard.map((row, ri) => row.map((cell, ci) => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.jcorpDeep }, color: C.white, bold: true, fontSize: 12, align: ci > 1 ? "center" : "left", valign: "middle" }
      : { fontSize: 12, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white }, align: ci > 1 ? "center" : "left", bold: ci === 0 || ci === 3 }
  }))), {
    x: 0.5, y: 2.3, w: 12.3, colW: [4.5, 3.0, 2.4, 2.4],
    border: { pt: 0.5, color: C.border }, rowH: 0.45
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 6.4, w: 12.3, h: 0.55, rectRadius: 0.08, fill: { color: C.cream }, line: { color: C.yellow, width: 2 } });
  s.addText([
    { text: "Integrity:  ", options: { bold: true, color: C.jcorpDeep } },
    { text: "Time-saved figures are self-reported and presented as such. Adoption Score and Copilot telemetry are objective. Where claims cannot be measured, they are flagged as assumptions." }
  ], { x: 0.75, y: 6.4, w: 11.8, h: 0.55, fontSize: 11, fontFace: F.body, color: C.body, valign: "middle" });

  addFooter(s, 17);

  // ==========================================================
  // SLIDE 18 - ADOPTION RAMP (Executive with chart)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "ADOPTION RAMP", C.jcorpDeep);
  pageTitle(s, "Target trajectory: 75% weekly active by month 12");

  s.addChart(pres.charts.LINE, [
    { name: "% weekly active users (target)", labels: ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"], values: [5,10,15,25,40,55,62,68,72,74,75,78] },
    { name: "Year 1 goal (75%)", labels: ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"], values: [75,75,75,75,75,75,75,75,75,75,75,75] },
  ], {
    x: 0.5, y: 2.3, w: 12.3, h: 4.5,
    chartColors: [C.jcorpDeep, C.yellow],
    showLegend: true, legendPos: "b", legendFontSize: 12,
    catAxisLabelFontSize: 11, valAxisLabelFontSize: 11,
    valAxisMaxVal: 100, valAxisMinVal: 0,
    showValue: false, lineSize: 3, lineDataSymbol: "circle"
  });

  addFooter(s, 18);

  // ==========================================================
  // SLIDE 19 - GOVERNANCE (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "GOVERNANCE", C.jcorpDeep);
  pageTitle(s, "Steering structure & decision rights");

  const gov = [
    ["Body", "Cadence", "Membership", "Format"],
    ["Executive Steering Committee", "Quarterly", "JCorp sponsor + Microsoft account team", "On-site KL EBC"],
    ["Program Working Group", "Bi-weekly", "JCorp PMO + MS Customer Success", "Teams (virtual)"],
    ["Champions Council", "Weekly", "15 champions + MS lead", "Teams (virtual)"],
    ["Technical Forum", "Monthly", "JCorp IT + MS FastTrack", "Teams (virtual)"],
  ];
  s.addTable(gov.map((row, ri) => row.map((cell, ci) => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.jcorpDeep }, color: C.white, bold: true, fontSize: 12, align: "left", valign: "middle" }
      : { fontSize: 12, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white }, bold: ci === 0 }
  }))), {
    x: 0.5, y: 2.3, w: 12.3, colW: [4.0, 2.0, 4.3, 2.0],
    border: { pt: 0.5, color: C.border }, rowH: 0.55
  });

  s.addText("Decision rights", { x: 0.5, y: 5.4, w: 6, h: 0.4, fontSize: 16, fontFace: F.heading, color: C.ink, bold: true });
  s.addText([
    { text: "Strategic direction and budget", options: { bold: true, breakLine: true } },
    { text: "  →  Executive Steering Committee", options: { color: C.jcorpDeep, breakLine: true } },
    { text: "Operational delivery and content", options: { bold: true, breakLine: true } },
    { text: "  →  Program Working Group", options: { color: C.jcorpDeep, breakLine: true } },
    { text: "Use case prioritisation", options: { bold: true, breakLine: true } },
    { text: "  →  Champions Council", options: { color: C.jcorpDeep } },
  ], { x: 0.5, y: 5.85, w: 12, h: 1.3, fontSize: 12, fontFace: F.body, color: C.body, lineSpacing: 18 });

  addFooter(s, 19);

  // ==========================================================
  // SLIDE 20 - RISK REGISTER (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "RISK REGISTER", C.jcorpDeep);
  pageTitle(s, "Top 5 risks with mitigations");

  const risks = [
    ["Risk", "Likelihood", "Impact", "Mitigation"],
    ["Remote engagement fatigue erodes attendance", "Med", "High", "Cap virtual sessions at 60 min; gamify; champions drive peer accountability"],
    ["Data hygiene gaps surface incorrect content", "Med", "High", "Pre-rollout SharePoint permissions audit; sensitivity labels enforced"],
    ["Executive sponsorship fades after kick-off", "Med", "High", "Quarterly KL EBC sessions designed as executive-led, not vendor-led"],
    ["License cost not justified by demonstrated value", "Low", "High", "Quantified value capture from Q2 onwards; published quarterly"],
    ["Champions burn out from overload", "Med", "Med", "Time commitment formalised with line managers; recognition program"],
  ];
  s.addTable(risks.map((row, ri) => row.map((cell, ci) => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.jcorpDeep }, color: C.white, bold: true, fontSize: 12, align: ci > 0 && ci < 3 ? "center" : "left", valign: "middle" }
      : { fontSize: 11.5, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white }, align: ci > 0 && ci < 3 ? "center" : "left", bold: ci === 0 }
  }))), {
    x: 0.5, y: 2.3, w: 12.3, colW: [4.5, 1.4, 1.4, 5.0],
    border: { pt: 0.5, color: C.border }, rowH: 0.7
  });
  addFooter(s, 20);

  // ==========================================================
  // SLIDE 21 - INVESTMENT SUMMARY (Executive with chart)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "INVESTMENT SUMMARY", C.jcorpDeep);
  pageTitle(s, "Indicative effort and license envelope", "Final pricing requires formal Microsoft commercial proposal");

  s.addChart(pres.charts.BAR, [
    { name: "Microsoft delivery (person-days)", labels: ["Q1 Lift-off", "Q2 Power Up", "Q3 Build", "Q4 Soar"], values: [40, 80, 70, 40] },
    { name: "JCorp PMO + champions (person-days)", labels: ["Q1 Lift-off", "Q2 Power Up", "Q3 Build", "Q4 Soar"], values: [30, 90, 100, 70] },
  ], {
    x: 0.5, y: 2.3, w: 7.0, h: 4.5,
    barDir: "col", barGrouping: "clustered",
    chartColors: [C.msBlue, C.jcorpDeep],
    showLegend: true, legendPos: "b", legendFontSize: 10,
    catAxisLabelFontSize: 10, valAxisLabelFontSize: 10,
    showValue: true, dataLabelFontSize: 9
  });

  // Cost lines
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.7, y: 2.3, w: 5.3, h: 4.5, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.border, width: 1 } });
  s.addText("Cost envelope", { x: 7.9, y: 2.4, w: 5.0, h: 0.4, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true });
  s.addText([
    { text: "200x Copilot for M365 licenses", options: { bold: true, color: C.jcorpDeep, breakLine: true } },
    { text: "Annual commitment, JCorp procures direct or via partner", options: { color: C.muted, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "Microsoft enablement services", options: { bold: true, color: C.jcorpDeep, breakLine: true } },
    { text: "Largely covered through customer success investment; incremental scope quoted separately", options: { color: C.muted, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "JCorp travel (SLT to KL, quarterly)", options: { bold: true, color: C.jcorpDeep, breakLine: true } },
    { text: "Internal cost; estimated based on 8-12 travellers", options: { color: C.muted, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "Microsoft to JCorp Johor (3 visits/year)", options: { bold: true, color: C.jcorpDeep, breakLine: true } },
    { text: "Microsoft internal cost", options: { color: C.muted, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "Champions recognition & events", options: { bold: true, color: C.jcorpDeep, breakLine: true } },
    { text: "JCorp internal cost", options: { color: C.muted, fontSize: 10 } },
  ], { x: 7.9, y: 2.85, w: 5.0, h: 3.9, fontSize: 11.5, fontFace: F.body, color: C.body, lineSpacing: 16 });

  addFooter(s, 21);

  // ==========================================================
  // SLIDE 22 - WHAT WE NEED (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "WHAT WE NEED FROM JCORP", C.jcorpDeep);
  pageTitle(s, "Four decisions to unlock the program");

  const needs = [
    { i: ico.hand,  h: "Executive sponsor confirmed", t: "Recommended: Chief HR Officer or Chief Digital Officer. ~2 hours/month commitment, plus quarterly KL EBC sessions." },
    { i: ico.cog,   h: "200 Copilot for M365 licenses approved", t: "Annual commitment. JCorp procures direct or via Microsoft partner of choice." },
    { i: ico.star,  h: "15 champions nominated", t: "Across all functions, by end of month 1. Time commitment formalised with line managers." },
    { i: ico.map,   h: "Senior Leadership KL travel authorised", t: "8-12 person SLT, quarterly trips to Microsoft KL EBC. Travel budget approved upfront." },
  ];
  needs.forEach((n, i) => {
    const y = 2.4 + i * 1.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y, w: 12.3, h: 0.95, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.border, width: 1 } });
    s.addImage({ data: n.i, x: 0.7, y: y + 0.22, w: 0.5, h: 0.5 });
    s.addText(`${i + 1}. ${n.h}`, { x: 1.4, y: y + 0.1, w: 11.2, h: 0.4, fontSize: 15, fontFace: F.heading, color: C.ink, bold: true });
    s.addText(n.t, { x: 1.4, y: y + 0.5, w: 11.2, h: 0.45, fontSize: 12, fontFace: F.body, color: C.body });
  });
  addFooter(s, 22);

  // ==========================================================
  // SLIDE 23 - NEXT STEPS (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "NEXT STEPS", C.jcorpDeep);
  pageTitle(s, "Path from approval to kick-off");

  const steps = [
    { w: "Week 1", t: "Sponsor confirmation", d: "JCorp executive sponsor signs off on scope and intent." },
    { w: "Weeks 2-3", t: "Commercial proposal", d: "Microsoft KL issues formal Customer Success Plan and license proposal." },
    { w: "Week 4", t: "Champions nomination", d: "Function leads nominate the 15 champions across JCorp HQ." },
    { w: "Weeks 5-6", t: "Readiness assessment", d: "MS FastTrack runs M365 hygiene check; sensitivity labels reviewed." },
    { w: "Week 7", t: "Kick-off party in Johor", d: "Microsoft visits JCorp HQ for the launch. Quest 1 begins." },
  ];
  steps.forEach((st, i) => {
    const x = 0.5 + i * 2.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.5, w: 2.4, h: 4.0, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.jcorpDeep, width: 2 }, shadow: shadowSoft() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: 2.4, h: 0.6, fill: { color: C.jcorpDeep }, line: { color: C.jcorpDeep } });
    s.addText(st.w, { x, y: 2.5, w: 2.4, h: 0.6, fontSize: 13, fontFace: F.heading, color: C.white, bold: true, align: "center", valign: "middle", charSpacing: 1 });
    s.addText(`${i + 1}`, { x: x + 0.95, y: 3.2, w: 0.5, h: 0.5, fontSize: 30, fontFace: F.heading, color: C.jcorpDeep, bold: true, align: "center" });
    s.addText(st.t, { x: x + 0.15, y: 3.85, w: 2.1, h: 0.7, fontSize: 14, fontFace: F.heading, color: C.ink, bold: true, align: "center" });
    s.addText(st.d, { x: x + 0.2, y: 4.55, w: 2.0, h: 1.6, fontSize: 11, fontFace: F.body, color: C.body, align: "center", lineSpacing: 16 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 6.7, w: 12.3, h: 0.5, rectRadius: 0.08, fill: { color: C.yellow }, line: { color: C.ink, width: 1.5 } });
  s.addText("Target kick-off: 7 weeks from JCorp executive sign-off.", { x: 0.5, y: 6.7, w: 12.3, h: 0.5, fontSize: 13, fontFace: F.heading, color: C.ink, bold: true, align: "center", valign: "middle" });

  addFooter(s, 23);

  // ==========================================================
  // SLIDE 24 - APPENDIX A: USE CASE VALUE TABLE (Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.white };
  sectionBanner(s, "APPENDIX A", C.muted);
  pageTitle(s, "Full use case detail with Copilot surfaces");

  const apxA = [
    ["#", "Use case", "Copilot surface", "Champion function"],
    ["1", "Board paper drafting & summarisation", "Word, Copilot Chat", "Executive Office"],
    ["2", "Subsidiary performance roll-up analytics", "Excel, Copilot Chat", "Strategy / Finance"],
    ["3", "Meeting recap, actions and decisions", "Teams", "All managers"],
    ["4", "Investor & stakeholder briefing decks", "PowerPoint", "Corporate Affairs"],
    ["5", "Contract first-pass review", "Word, Copilot Chat", "Legal"],
    ["6", "HR policy Q&A & onboarding assistant", "Copilot Studio agent", "HR"],
    ["7", "Email triage & response drafting", "Outlook", "All employees"],
    ["8", "Tender / RFP response drafting", "Word, Copilot Chat", "Business Development"],
    ["9", "Internal knowledge search", "Copilot Chat (work)", "All employees"],
    ["10", "Sustainability / ESG report drafting", "Word, Excel", "Corporate Affairs"],
  ];
  s.addTable(apxA.map((row, ri) => row.map((cell, ci) => ({
    text: cell,
    options: ri === 0
      ? { fill: { color: C.charcoal }, color: C.white, bold: true, fontSize: 11, align: ci === 0 ? "center" : "left", valign: "middle" }
      : { fontSize: 11, color: C.body, valign: "middle", fill: { color: ri % 2 === 0 ? C.cream : C.white }, align: ci === 0 ? "center" : "left", bold: ci === 1 }
  }))), {
    x: 0.5, y: 2.3, w: 12.3, colW: [0.6, 4.7, 3.5, 3.5],
    border: { pt: 0.5, color: C.border }, rowH: 0.4
  });
  addFooter(s, 24);

  // ==========================================================
  // SLIDE 25 - CLOSING with QR (Fun + Executive)
  // ==========================================================
  s = pres.addSlide(); s.background = { color: C.jcorpDeep };
  s.addShape(pres.shapes.OVAL, { x: -2, y: -2, w: 5, h: 5, fill: { color: C.jcorp }, line: { color: C.jcorp } });
  s.addShape(pres.shapes.OVAL, { x: 10, y: 5, w: 5, h: 5, fill: { color: C.jcorpDark }, line: { color: C.jcorpDark } });

  s.addText("READY TO LAUNCH?", { x: 0.8, y: 1.0, w: 11, h: 0.4, fontSize: 13, fontFace: F.body, color: C.yellow, bold: true, charSpacing: 5 });
  s.addText("Let's go build it.", { x: 0.8, y: 1.6, w: 11, h: 1.5, fontSize: 70, fontFace: F.heading, color: C.white, bold: true });
  s.addText("Confirm the sponsor. Nominate the champions. Set the kick-off date.\nThe adventure begins as soon as you say go.", {
    x: 0.8, y: 3.6, w: 8.5, h: 1.5, fontSize: 18, fontFace: F.body, color: C.white, lineSpacing: 28
  });

  // QR card
  const qrData = await qrPng("https://zeffree.github.io/jcorpmsft/");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.5, y: 3.4, w: 3.0, h: 3.2, rectRadius: 0.15, fill: { color: C.white }, line: { color: C.white }, shadow: shadowMed() });
  s.addImage({ data: qrData, x: 9.75, y: 3.55, w: 2.5, h: 2.5 });
  s.addText("Explore the live site", { x: 9.5, y: 6.05, w: 3.0, h: 0.5, fontSize: 11, fontFace: F.body, color: C.ink, bold: true, align: "center", valign: "middle" });

  s.addText("zeffree.github.io/jcorpmsft", { x: 0.8, y: 5.6, w: 8.5, h: 0.4, fontSize: 14, fontFace: F.body, color: C.yellow, bold: true });
  s.addText("Prepared by Microsoft Malaysia for Johor Corporation  |  Indicative figures subject to confirmation", {
    x: 0.8, y: 7.0, w: 12, h: 0.3, fontSize: 10, fontFace: F.body, color: C.white
  });

  // ==========================================================
  // WRITE FILE
  // ==========================================================
  await pres.writeFile({ fileName: "../../output/jcorpmsft-copilot-adoption.pptx" });
  console.log("✅ Deck written: output/jcorpmsft-copilot-adoption.pptx");
})().catch(e => { console.error(e); process.exit(1); });
