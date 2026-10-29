// All portfolio copy lives here. Every figure is real and verifiable; do not add invented metrics.

export const contact = {
  email: 'davidjohn@futurdevs.com',
  whatsappUrl: 'https://wa.me/2348088792254',
  whatsappLabel: 'Or message me on WhatsApp',
  // "Is It Possible?" 30-minute idea call (Google Calendar booking page)
  bookingUrl: 'https://calendar.app.google/kk2oCLz1PuEsUuwL9',
  bookingLabel: 'Book a free 30-minute idea call',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/davemcsavvy' },
    { label: 'GitHub', href: 'https://github.com/Mcsavvy' },
    { label: 'Writing on Medium', href: 'https://medium.com/@mcsavvy' },
  ],
}

export const receipts = [
  { big: '150+', unit: '', text: 'students across two cohorts on a school platform I rebuilt, running for two years', underline: true },
  { big: '41', unit: '', text: 'inspection KPIs tracked for a UK home-care provider' },
  { big: 'UK · US · NG', unit: '', text: "founders and teams I've built for", small: true },
]

export const testimonial = {
  quote: 'Reliable, skilled, creative and result-driven. He takes your project seriously, delivers on time and goes the extra mile.',
  name: 'Kolawole Olumuyiwa',
  role: 'Owner',
  org: 'E.J Great Interior & Furniture',
}

// Client reviews, shortened from the full messages they sent me. Each review is split into
// the points the reviewer made; wording stays theirs. Add a reviewer to the list and a new
// card appears in the marquee.
export type Review = {
  quote: string
  name: string
  role: string
  org: string
  site: string // reviewer's own website
  photo: string
  logo: string
  avatar: 'photo' | 'logo' // each reviewer alternates between their face and their brand
}

const ejGreat = {
  name: 'Kolawole Olumuyiwa',
  role: 'Owner',
  org: 'E.J Great Interior & Furniture',
  site: 'https://ejgreat.futurdevs.com',
  photo: '/reviews/kolawole-olumuyiwa.webp',
  logo: '/reviews/ejgreat-logo.webp',
}
const inom = {
  name: 'Monijesuloluwa Ayinde',
  role: 'Fashion designer',
  org: 'INOM',
  site: 'https://inomltd.futurdevs.com',
  photo: '/reviews/inom-moni.webp',
  logo: '/reviews/inom-logo.webp',
}

export const reviews: Review[] = [
  { ...ejGreat, avatar: 'photo', quote: 'David understood our vision, turned our ideas into reality and delivered an excellent result in a remarkably short time.' },
  { ...inom, avatar: 'photo', quote: 'I had my website barely two days after sending my details, and I\u2019m genuinely impressed by what David made of so little insight into my business.' },
  { ...ejGreat, avatar: 'logo', quote: 'His efficiency, attention to detail and prompt communication made the whole process smooth and stress-free.' },
  { ...inom, avatar: 'logo', quote: 'The website has personality. You can see how much creativity and extra effort went into it.' },
  { ...ejGreat, avatar: 'logo', quote: 'He didn\u2019t just build us a website. He helped us build a stronger digital presence that showcases our services and positions us for growth.' },
  { ...inom, avatar: 'logo', quote: 'Every button works, and works fast. Email, TikTok, Instagram: other people have tested them too.' },
  { ...ejGreat, avatar: 'photo', quote: 'Reliable, skilled, creative and result-driven. He takes your project seriously, delivers on time and goes the extra mile.' },
  { ...inom, avatar: 'photo', quote: 'The fonts catch the eye quickly and make people want to stay. I showed it to other fashion designers in my workspace.' },
]

export const clientSites = [
  { name: 'INOM', kind: 'Fashion label', host: 'inomltd.futurdevs.com', href: 'https://inomltd.futurdevs.com', image: '/inom-site.webp', alt: 'The INOM fashion label site on a phone-sized screen' },
  { name: 'E.J Great', kind: 'Interior and furniture', host: 'ejgreat.futurdevs.com', href: 'https://ejgreat.futurdevs.com', image: '/ejgreat-site.webp', alt: 'The E.J Great interior and furniture site' },
  { name: 'Angela Barnabas', kind: 'Model', host: 'angela.futurdevs.com', href: 'https://angela.futurdevs.com', image: '/angela-site.webp', alt: 'The Angela Barnabas modelling site' },
]

export const engagements = [
  { title: 'Build it with you', text: 'One partner from research to launch: product, design, architecture, engineering and deployment.', price: 'Projects from $10,000' },
  { title: 'Fractional CTO', text: "Senior technical leadership without hiring a full-time CTO. A weekly call, architecture and technology decisions, reviews of your code and plans, hiring support, and guidance for the team you already have. It runs month to month and doesn't include building the product; that's the option above.", price: 'From $2,500 a month' },
]

export const faqs = [
  { q: "I'm not technical. Is that a problem?", a: "No. Most founders I work with aren't. I explain each decision in plain language, and you test the product as it grows, so you always know where it stands." },
  { q: 'Where are you based?', a: "Lagos, Nigeria (GMT+1). I've built for founders and teams in the UK, the US and Nigeria." },
  { q: 'Can you work with my existing developers?', a: "Yes. I've led and trained engineering teams, including senior engineers adopting AI, and handed a live service over to new engineers mid-project." },
  { q: 'What does it cost?', a: "Projects start from $10,000, depending on what we build. Fractional CTO work starts from $2,500 a month. You'll get a clear figure after the idea call, which is free, whether or not we work together." },
  { q: 'Who owns the code?', a: 'You do. All the code I write for your product is yours.' },
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
    shot: 'Student dashboard',
    image: '/plsom-dashboard.webp',
  },
  {
    meta: 'Fintech · Nigeria',
    title: 'CreditVeto, a credit and payments platform',
    role: 'Design · Architecture · Engineering',
    story:
      'A new credit platform gets one chance. If money moves wrong once, users leave. I built the parts that decide whether money is safe to move: a fraud engine that watches every transaction, a credit score people can verify, and rewards that turn paying on time into a habit. New fraud rules ran in watch-only mode first, so an honest customer never got blocked by a guess. <strong>Over a thousand transactions</strong> have gone through it ahead of the wider launch.',
    moral: '',
    shot: 'Credit score, rewards and fraud rules',
    image: '/creditveto-product.webp',
  },
  {
    meta: 'AI · Knowledge work',
    title: 'ALi, an AI assistant for company knowledge',
    role: 'Full-stack · DevOps · Project management',
    story:
      'The team had documents in every format and one frustration: the AI search found something, but rarely the right thing. It missed exact names and buried the file people needed. I stopped treating it as a model problem. I led the project. We paired keyword search with meaning-based search, then let the assistant ask for the next page of results the way a person would. <strong>Two organisations</strong> now pilot it.',
    moral: 'When AI disappoints, the fix is usually the system around it.',
    shot: 'Assistant answering a question',
    image: '/ali-assistant.webp',
  },
  {
    meta: 'Healthcare compliance · UK',
    title: 'Trakitt, a compliance system for home care',
    role: 'Design · Architecture · Engineering',
    story:
      "A care provider faces inspectors with one question: can you prove it? Spreadsheets can't. I designed a system where every incident and complaint leaves a record no one can edit later, and problems rise to the right manager before they become findings. It tracks <strong>41 KPIs</strong> across the regulator's five domains, so inspection day becomes a printout instead of a scramble. Built, delivered and ready for rollout.",
    moral: 'In regulated work, the product is the proof.',
    shot: 'Director fleet view with an escalated alert',
    image: '/trakitt-dashboard.webp',
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
    moral: '',
    shot: 'Limitation-deadline alert or conflict check',
    image: '/lexilead-conflicts.webp',
  },
  {
    meta: 'Fintech · Nigeria',
    kind: 'Product',
    title: 'MyFinbuk, bookkeeping for small businesses',
    story:
      'Small traders lose signal more often than they lose receipts. I founded MyFinbuk and served as its CTO and technical lead, engineering the product and running the infrastructure. It keeps working offline, syncs the moment the network returns, and asks the trader which version to keep when two edits collide.',
    moral: '',
    shot: 'Saved offline, conflict review, synced',
    image: '/myfinbuk-offline.webp',
  },
  {
    meta: 'AI · Developer tools',
    kind: 'Role',
    title: 'Kloudfarm, AI that understands codebases',
    story:
      'Kloudfarm turns a codebase into a live architecture diagram. As the core backend and cloud infrastructure engineer, I built the ingestion service for GitHub and zip uploads, moved vectorization onto AWS Step Functions and ran the AWS infrastructure. Midway through, the other engineers left. I stayed, owned the service and brought their replacements up to speed. It has read <strong>more than 100 codebases</strong> across eight languages.',
    moral: '',
    shot: 'Architecture diagram and the processing pipeline behind it',
    image: '/kloudfarm-pipeline.webp',
  },
  {
    meta: 'AI · Team enablement',
    kind: 'Role',
    title: 'Techtic, bringing senior engineers onto AI',
    story:
      'The CEO had a team of engineers with 10 to 20 years of experience and deep distrust of AI output. He asked me to change that. As AI enablement lead I ran hands-on sessions across backend and mobile, including turning Figma designs into production screens without losing fidelity, and showed where AI helps and where a human still decides. Alongside that, I delivered full-stack work on two calculation-heavy products.',
    moral: '',
    shot: 'An AI-assisted build session, from Figma frame to reviewed code',
    image: '/techtic-enablement.webp',
  },
  {
    meta: 'Accessibility · Nigeria',
    kind: 'Build',
    title: 'iLens, sight support for blind users',
    story:
      "A blind shopper can't read a naira note. With iLens they point the phone and hear the value. It also names objects and warns about obstacles, all by voice. I was the full-stack engineer and product manager. I ran the research and customer survey, then built it with a partner on the backend.",
    moral: '',
    shot: 'Welcome, voice home screen and settings',
    image: '/ilens-voice.webp',
  },
  {
    meta: 'AI · Video',
    kind: 'Own product',
    title: 'Shotkeet, from a prompt to a video',
    story:
      'Describe a product and get a finished MP4 back in about two minutes, built for Nigerian sellers who post from their phones. AI writes the video as code, a safety scan rejects unsafe output, and a queue worker renders it. This is my own project, and I built all of it myself in <strong>three days</strong>, from the rendering pipeline to the screen you type into.',
    moral: '',
    shot: 'Form, live generation progress and the finished video',
    image: '/shotkeet-video.webp',
  },
]

export const steps = [
  {
    n: '01',
    title: 'Research and discovery',
    text: "I ask what solving this earns or saves you, and what you've tried before. Then I write back what I heard. You confirm it before any code exists.",
  },
  {
    n: '02',
    title: 'Architecture',
    text: 'You get a plan you can see: what we build first, what waits, and what it costs. Then we agree the scope of the first version, so the project stays focused and ships.',
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
  heading: ['The demo worked.', 'Then real people showed up.'],
  lead: 'Getting a founder excited about a demo is easy. Everything works, the idea looks good, and everyone wants to start.',
  body: [
    'Then users arrive. Money starts moving. Someone asks for a report, or hits a case nobody thought of during the demo. That is where the real work starts.',
    "So I make the big decisions early, before they get expensive. I ask what the product should earn or save you and what you've already tried, then write back what I understood. Nothing gets built until you confirm it.",
    "We agree what goes in the first version so it ships instead of growing forever. I've done this for a school in Nigeria whose platform has run for two years, a care provider in the UK, and a credit platform for Nigerian customers.",
    'I taught myself to code and have spent years teaching others, so I explain every decision in plain language.',
  ],
  close: "You're not just paying for code. You're paying for the decisions that make the code worth building.",
}
