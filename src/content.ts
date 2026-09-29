// All portfolio copy lives here. Every figure is real and verifiable; do not add invented metrics.

export const contact = {
  email: 'davidjohn@futurdevs.com',
  // "Is It Possible?" 30-minute idea call (Google Calendar booking page)
  bookingUrl: 'https://calendar.app.google/kk2oCLz1PuEsUuwL9',
  bookingLabel: 'Book an \u201cIs It Possible?\u201d call',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/davemcsavvy' },
    { label: 'GitHub', href: 'https://github.com/Mcsavvy' },
    { label: 'Writing on Medium', href: 'https://medium.com/@mcsavvy' },
  ],
}

export const receipts = [
  { big: '5+', unit: '', text: 'years shipping production systems', underline: true },
  { big: '2', unit: 'years', text: 'running one client platform in production, rebuilt without dropping service' },
  { big: 'UK · US · NG', unit: '', text: "founders and teams I've built for", small: true },
]

export type Project = {
  meta: string
  title: string
  story: string // may contain one <strong> number
  moral: string
  role?: string // one line on what I did
  shot: string // what the screenshot placeholder should show
  image?: string // drop a file in /public and set its path here
}

export const featured: Project[] = [
  {
    meta: 'Education · Nigeria',
    title: 'PLSOM, a learning platform for a ministry school',
    role: 'Design · Architecture · DevOps · Engineering',
    story:
      "The school runs on yearly cohorts, and the first version couldn't keep one cohort's students apart from the next. Rebuilding meant not disturbing a class in progress, so the new platform went live while the current cohort was rounding up and new students were onboarded straight into it. It has since run the diploma and certificate programmes side by side. <strong>150+ students</strong> across two cohorts and two programmes, and two years on, students still log in every week.",
    moral: 'The best rebuilds are the ones nobody notices.',
    shot: 'Student dashboard (illustrative design)',
    image: '/plsom-dashboard.jpg',
  },
  {
    meta: 'Healthcare compliance · UK',
    title: 'Trakitt, a compliance system for home care',
    role: 'Design · Architecture · Engineering',
    story:
      "A care provider faces inspectors with one question: can you prove it? Spreadsheets can't. I designed a system where every incident and complaint leaves a record no one can edit later, and problems rise to the right manager before they become findings. It tracks <strong>41 KPIs</strong> across the regulator's five domains, so inspection day becomes a printout instead of a scramble. Built, delivered and ready for rollout.",
    moral: 'In regulated work, the product is the proof.',
    shot: 'Director fleet view with an escalated alert (illustrative design)',
    image: '/trakitt-dashboard.jpg',
  },
  {
    meta: 'Fintech · Nigeria',
    title: 'CreditVeto, a credit and payments platform',
    role: 'Design · Architecture · Engineering',
    story:
      'A new credit platform gets one chance. If money moves wrong once, users leave. I built the parts that decide whether money is safe to move: a fraud engine that watches every transaction, a credit score people can verify, and rewards that turn paying on time into a habit. New fraud rules ran in watch-only mode first, so an honest customer never got blocked by a guess. <strong>Over a thousand transactions</strong>, worth hundreds of millions of naira, have gone through it ahead of the wider launch.',
    moral: 'Trust is a feature. I build it in from day one.',
    shot: 'Credit score, rewards and fraud rules (illustrative design)',
    image: '/creditveto-product.jpg',
  },
  {
    meta: 'AI · Knowledge work',
    title: 'ALi, an AI assistant for company knowledge',
    role: 'Full-stack · DevOps · Project management',
    story:
      'The team had documents in every format and one frustration: the AI search found something, but rarely the right thing. It missed exact names and buried the file people needed. I stopped treating it as a model problem. My teammate and I paired keyword search with meaning-based search, then let the assistant ask for the next page of results the way a person would. <strong>Two organisations</strong> now pilot it.',
    moral: 'When AI disappoints, the fix is usually the system around it.',
    shot: 'Assistant answering a question',
    image: '/ali-assistant.jpg',
  },
]

export type MoreProject = {
  meta: string
  kind: string
  title: string
  story: string
  moral: string
  shot: string // what the image placeholder should show
  image?: string // drop a file in /public and set its path here
}

export const more: MoreProject[] = [
  {
    meta: 'Legal tech · Nigeria',
    kind: 'Partnership',
    title: 'LexiLead, practice management for law firms',
    story:
      "One missed filing deadline can lose a case and a client. LexiLead tracks every limitation period and flags a conflict of interest before a lawyer accepts the brief. I lead the backend and DevOps and manage the technical product, working alongside a frontend engineer. It's in pilot now.",
    moral: "Guard what they can't afford to lose.",
    shot: 'Limitation-deadline alert or conflict check',
    image: '/lexilead-conflicts.jpg',
  },
  {
    meta: 'Fintech · Nigeria',
    kind: 'Product',
    title: 'MyFinbuk, bookkeeping for small businesses',
    story:
      'Small traders lose signal more often than they lose receipts. I founded MyFinbuk and served as its CTO and technical lead, engineering the product and running the infrastructure. It keeps working offline, syncs the moment the network returns, and asks the trader which version to keep when two edits collide.',
    moral: 'Design for the street, not the demo.',
    shot: 'Saved offline, conflict review, synced (illustrative design)',
    image: '/myfinbuk-offline.jpg',
  },
  {
    meta: 'AI · Developer tools',
    kind: 'Role',
    title: 'Kloudfarm, AI that understands codebases',
    story:
      'Kloudfarm turns a codebase into a live architecture diagram. As the core backend and cloud infrastructure engineer, I built the ingestion service for GitHub and zip uploads, moved vectorization onto AWS Step Functions and ran the AWS infrastructure. Midway through, the other engineers left. I stayed, owned the service and brought their replacements up to speed. It has read <strong>more than 100 codebases</strong> across eight languages.',
    moral: 'Ownership shows when people leave.',
    shot: 'Architecture diagram and the processing pipeline behind it (illustrative design)',
    image: '/kloudfarm-pipeline.jpg',
  },
  {
    meta: 'AI · Team enablement',
    kind: 'Role',
    title: 'Techtic, bringing senior engineers onto AI',
    story:
      'The CEO had a team of engineers with 10 to 20 years of experience and deep distrust of AI output. He asked me to change that. As AI enablement lead I ran hands-on sessions across backend and mobile, including turning Figma designs into production screens without losing fidelity, and showed where AI helps and where a human still decides.',
    moral: 'Trust is taught, not forced.',
    shot: 'An AI-assisted build session, from Figma frame to reviewed code (illustrative design)',
    image: '/techtic-enablement.jpg',
  },
  {
    meta: 'Accessibility · Nigeria',
    kind: 'Build',
    title: 'iLens, sight support for blind users',
    story:
      "A blind shopper can't read a naira note. With iLens they point the phone and hear the value. It also names objects and warns about obstacles, all by voice. I was the full-stack engineer and product manager. I ran the research and customer survey, then built it with a partner on the backend.",
    moral: 'Technology should serve the person who needs it most.',
    shot: 'Welcome, voice home screen and settings (illustrative design)',
    image: '/ilens-voice.jpg',
  },
  {
    meta: 'AI · Video',
    kind: 'Own product',
    title: 'Shotkeet, from a prompt to a video',
    story:
      'Describe a product and get a finished MP4 back, built for Nigerian sellers who post from their phones. AI writes the video as code, a safety scan rejects unsafe output, and a queue worker renders it. This is my own project, and I built all of it myself in <strong>three days</strong>, from the rendering pipeline to the screen you type into.',
    moral: 'Small team. Full product.',
    shot: 'Form, live generation progress and the finished video (illustrative design)',
    image: '/shotkeet-video.jpg',
  },
]

export const steps = [
  {
    n: '01',
    title: 'Discovery',
    text: "I ask what solving this earns or saves you, and what you've tried before. Then I write back what I heard. You confirm it before any code exists.",
  },
  {
    n: '02',
    title: 'Architecture',
    text: 'You get a plan you can see: what we build first, what waits, and what it costs. Then I freeze the first version, so it ships.',
  },
  {
    n: '03',
    title: 'Build',
    text: "Design, AI and engineering, with you testing the product as it grows. When a request won't work, I explain why and bring a better path.",
  },
  {
    n: '04',
    title: 'Launch',
    text: 'Secured, deployed and watched. I stay on after go-live, so the product keeps standing when real people arrive.',
  },
]

export const about = {
  lead: 'Most founders I meet have already heard “yes.” “Yes” from an agency. “Yes” from a freelancer. “Yes” from an AI tool that built a demo overnight.',
  body: [
    "What they haven't had is someone who asks why.",
    'A “yes” costs nothing. The bill arrives six months later, when the demo meets real users, real money or a regulator.',
    'So I start with questions. What does solving this earn you, or save you? What have you tried, and why did it fail? I write back what I heard, and you confirm it before any code exists. Then I freeze the first version, so it ships instead of growing forever.',
    "I've worked this way for teams in Nigeria, the UK and the US: a school platform that has run for two years, compliance software for a UK care provider, and a credit platform for Nigerian consumers.",
    "I taught myself to build software. I've spent years teaching others to do the same.",
  ],
  close: "I don't sell hours. I sell the decisions that keep your product standing.",
}
