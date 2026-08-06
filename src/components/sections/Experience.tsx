import { useReveal, staggerDelay } from '../../hooks/useReveal'

type Job = {
  when: string
  company: string
  role: string
  did: string
}

const JOBS: Job[] = [
  {
    when: 'Jan 2026 – Present',
    company: 'Thelix',
    role: 'Full Stack Engineer, AI & Fintech',
    did: 'Architecture and delivery on CreditVeto, plus a LangChain WhatsApp bot running conversational credit assessments.',
  },
  {
    when: 'Jan 2021 – Present',
    company: 'FuturDevs',
    role: 'Founder & Lead Software Architect',
    did: 'Taught Python to 200+ students. Mentorship, community tooling, and speaking at Nigerian tech events.',
  },
  {
    when: 'Jun – Nov 2025',
    company: 'Navi Services',
    role: 'Backend Engineer',
    did: 'Ruby microservices at scale. Refactoring, reliability work, and AWS components behind CI/CD.',
  },
  {
    when: 'Aug – Sep 2025',
    company: 'Techtic',
    role: 'Tech Team Lead',
    did: 'Onboarded developer teams onto AI-assisted workflows and built a fully client-side demo system.',
  },
  {
    when: 'Jul – Oct 2025',
    company: 'Reatent',
    role: 'Backend Engineer',
    did: 'Multi-tenant LMS backend on Node.js and PostgreSQL with schema-per-tenant isolation.',
  },
  {
    when: 'Aug 2024 – May 2025',
    company: 'KloudFarm',
    role: 'Senior Backend Engineer & AI Systems Architect',
    did: 'Multi-agent documentation platform over 100+ repositories. Lambda and Step Functions vectorisation pipeline.',
  },
  {
    when: 'Jul 2023 – Aug 2024',
    company: 'Synergy Corps',
    role: 'Full Stack Developer',
    did: 'REST APIs for an AI kitchen assistant, CRM development, and CI/CD for a 15,000-user platform.',
  },
]

function JobRow({ job, index }: { job: Job; index: number }) {
  const { ref, className, style } = useReveal<HTMLDivElement>(staggerDelay(index))

  return (
    <div ref={ref} className={`job ${className}`} style={style}>
      <span className="when">{job.when}</span>
      <span className="co">
        {job.company}
        <small>{job.role}</small>
      </span>
      <span className="did">{job.did}</span>
    </div>
  )
}

export default function Experience() {
  const h2 = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  return (
    <section id="experience">
      <div className="wrap">
        <p className="eyebrow">02 / Experience</p>
        <h2 ref={h2.ref} className={h2.className} style={h2.style}>
          Roles
        </h2>
        <p ref={sub.ref} className={`sub ${sub.className}`} style={sub.style}>
          Remote across Nigerian, US and UK teams. The systems above cover the detail.
        </p>

        {JOBS.map((job, i) => (
          <JobRow key={job.company + job.when} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
