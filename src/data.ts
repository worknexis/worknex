import { Job, JobCategory } from './types';

export const INITIAL_CATEGORIES: JobCategory[] = [
  { 
    id: 'all', 
    name: 'All Jobs', 
    icon: 'Briefcase', 
    count: 12,
    description: 'Explore our complete catalog of 100% verified, meeting-light remote roles across all departments.',
    graphicUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'development', 
    name: 'Software Development', 
    icon: 'Code', 
    count: 4,
    description: 'Build robust backend architectures, concurrent databases, and custom typescript frontend layouts in total focus.',
    graphicUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'design', 
    name: 'Product & UX/UI Design', 
    icon: 'Paintbrush', 
    count: 3,
    description: 'Sculpt intuitive interface interaction models, premium typography pairings, and cohesive design layouts.',
    graphicUrl: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'marketing', 
    name: 'Marketing & Sales', 
    icon: 'Megaphone', 
    count: 2,
    description: 'Formulate growth loops, author high-signal technical documentation, and coordinate organic acquisition channels.',
    graphicUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'product', 
    name: 'Product Management', 
    icon: 'Kanban', 
    count: 1,
    description: 'Lead discovery pipelines, map technical API sequence guides, and orchestrate agile asynchronous execution schedules.',
    graphicUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'support', 
    name: 'Customer Success', 
    icon: 'Headphones', 
    count: 2,
    description: 'Support high-touch developer clients, debug environment variables, and draft clear onboarding playbooks.',
    graphicUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80'
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack React/Node Engineer',
    companyName: 'NexisScale',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'development',
    type: 'Full-time',
    location: 'Remote (Americas)',
    salary: '$135,000 - $165,000',
    postedAt: '2 hours ago',
    description: 'We are seeking a Senior Full-Stack Engineer who specializes in React and Node.js to spearhead our brand new digital workspace initiative. You will be building modern enterprise tools that help scale distributed systems. This role demands deep architectural understanding, clean habits with TypeScript, and a passion for creating pristine workflows.',
    requirements: [
      '5+ years of active experience with React, Node.js, and modern CSS (Tailwind CSS preferred)',
      'Proven expertise in designing secure REST and GraphQL APIs',
      'Strong architecture skills, including TypeScript type systems and state management solutions',
      'Experience working in fully asynchronous, distributed remote engineering teams'
    ],
    benefits: [
      '100% remote layout with core hours flexibility (UTC-5 to UTC-8)',
      'Premium health, dental, and vision insurance suite',
      '$3,500 dedicated remote workspace stipends (issued annually)',
      'Generous progress budget for certifications and continuous learning'
    ],
    featured: true,
    companyWebsite: 'https://nexisscale.co',
    companyDescription: 'NexisScale handles infrastructure orchestration and developer tool suites for rapid scale-ups and high-velocity startups worldwide.'
  },
  {
    id: 'job-2',
    title: 'Lead Visual Designer - Premium Brand Systems',
    companyName: 'Delineate Studio',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'design',
    type: 'Full-time',
    location: 'Remote (Worldwide)',
    salary: '$95,000 - $125,000',
    postedAt: '4 hours ago',
    description: 'Delineate is looking for an extraordinary Lead Visual Designer to orchestrate cohesive graphic, visual, and UI brand systems across our entire portfolio of products. You will work side-by-side with our product developers, marketing team, and founders to cultivate elegant, narrative-driven visuals.',
    requirements: [
      'Portfolio displaying exceptional craft in typography, editorial layout, and custom UI systems',
      'Advanced command of Figma, Adobe Illustrator, and motion tool suites',
      'Ability to translate abstract business goals into highly defined interactive structures',
      'At least 4 years of branding or design agency experience'
    ],
    benefits: [
      'Flexible work-from-anywhere model with unlimited paid vacation',
      'Subscription access to leading digital assets, typography foundries, and tools',
      'Stochastic learning stipend plus quarterly team retrospectives (fully funded)',
      'Top-of-the-line hardware package sent to your door'
    ],
    featured: true,
    companyWebsite: 'https://delineate.design',
    companyDescription: 'Delineate is an international creative shop sculpting premium digital interfaces and identity assets for visionary projects.'
  },
  {
    id: 'job-3',
    title: 'Senior Product Manager - Workspace Platform',
    companyName: 'WorkFlowy Co',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'product',
    type: 'Full-time',
    location: 'Remote (UTC-1 to UTC+3)',
    salary: '$120,000 - $145,000',
    postedAt: '1 day ago',
    description: 'We are seeking a senior workspace manager to own our developer experience vertical. This vertical focuses on visual pipelines, API tools, and integrations with Google Workspace, Figma, and Slack. You will guide product discovery, define roadmaps, and work closely with 3 specialized remote squads.',
    requirements: [
      '4+ years managing developer products, work tools, or SaaS platform features',
      'Background in design-driven product development with a strong focus on absolute usability',
      'Exceptional written communication skills (our team is fully asynchronous)',
      'Analytical base: comfortable setting and monitoring key tracking parameters and metrics'
    ],
    benefits: [
      'Generous equity options in addition to competitive base pay',
      'Health, physical wellbeing, and counseling stipends',
      'Bi-annual company offsites in beautiful locations (previous offsite was in Lisbon!)',
      'Comprehensive home-office hardware supply package'
    ],
    featured: true,
    companyWebsite: 'https://workflowy.io',
    companyDescription: 'WorkFlowy Co builds task optimization algorithms and collaboration hubs supporting over 2 million creative operators.'
  },
  {
    id: 'job-4',
    title: 'Growth & Performance Marketing Specialist',
    companyName: 'AdNexus',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'marketing',
    type: 'Contract',
    location: 'Remote (US/Canada)',
    salary: '$70 - $95 / hour',
    postedAt: '2 days ago',
    description: 'AdNexus is looking for a versatile Growth Marketer to launch, manage, and optimize multi-channel media budgets. You will design, run, and report on campaigns across search, social, and display media, focusing on cost-effective brand retention and customer volume growth.',
    requirements: [
      'Proven track record scaling pay-per-click budgets with transparent CAC dashboards',
      'Experience crafting persuasive modern copy and visual briefs targeting tech audiences',
      'Highly comfortable with spreadsheet models, cohort analysis, and attribution platforms',
      'Available to commit to 25-30 hours per week for at least 6 months'
    ],
    benefits: [
      'Highly competitive hourly rate with performance performance-based bonuses',
      'Direct contact with leadership, full autonomy to pitch and trial radical growth theories',
      'Asynchronous, output-oriented culture'
    ],
    featured: false,
    companyWebsite: 'https://adnexus.net',
    companyDescription: 'AdNexus is a specialized digital promotion network serving next-generation artificial intelligence and software products.'
  },
  {
    id: 'job-5',
    title: 'Customer Experience Lead (Developer-Focused)',
    companyName: 'NexisScale',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'support',
    type: 'Full-time',
    location: 'Remote (Europe/Africa)',
    salary: '€65,000 - €80,000',
    postedAt: '3 days ago',
    description: 'We are expanding our high-touch support squad. As our Customer Experience Lead, you will moderate challenging client questions, author onboarding playbooks, and partner with core engineering and design teams to outline common software friction points.',
    requirements: [
      'Comfortable reviewing logs, markdown files, and navigating elementary scripting code',
      'At least 3 years inside customer success, technical support, or user experience roles',
      'Impeccable empathy-driven writing; can break down complex ideas with extreme clarity',
      'Self-motivated operator holding deep care for visual layout and functional execution'
    ],
    benefits: [
      'Dedicated health savings plans or regional equivalent structures',
      'Asynchronous workflows with no standard shifts (core hour alignment applies)',
      'Learning materials registry, including courses, textbooks, and event admissions',
      'Modern workspace upgrade stipend (€2,500 every 18 months)'
    ],
    featured: false,
    companyWebsite: 'https://nexisscale.co',
    companyDescription: 'NexisScale handles infrastructure orchestration and developer tool suites for rapid scale-ups and high-velocity startups worldwide.'
  },
  {
    id: 'job-6',
    title: 'Junior UX & Interaction Designer',
    companyName: 'Delineate Studio',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'design',
    type: 'Internship',
    location: 'Remote (Global)',
    salary: '$3,000 - $4,500 / month',
    postedAt: '4 days ago',
    description: 'Delineate Studio is proud to announce our summer design cohort! We are looking for an energetic Junior Designer seeking to expand their interaction skills inside Figma. You will collaborate directly with visual directors on live custom clients, learning grid layouts, advanced typography rules, and motion prototype behaviors.',
    requirements: [
      'An online compilation or portfolio demonstrating interactive design logic and visual structure',
      'Foundational speed and agility with major industry design applications (Figma is standard)',
      'Incredible desire to adapt, iterate, and integrate direct typography feedback into layouts',
      'Ability to articulate and document your abstract creative choices'
    ],
    benefits: [
      'Fully paid internship with clear paths to formal full-time offers',
      'Personal 1-on-1 mentorship with senior art and interaction directors',
      'Complete license suite coverage plus a custom workspace setup budget',
      'Inclusion on global projects for household software brands'
    ],
    featured: false,
    companyWebsite: 'https://delineate.design',
    companyDescription: 'Delineate is an international creative shop sculpting premium digital interfaces and identity assets for visionary projects.'
  },
  {
    id: 'job-7',
    title: 'Inbound Growth Marketer & Content Writer',
    companyName: 'WorkFlowy Co',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'marketing',
    type: 'Full-time',
    location: 'Remote (Worldwide)',
    salary: '$80,000 - $105,000',
    postedAt: '5 days ago',
    description: 'We are seeking a versatile writer and growth operator to publish insightful posts, curate email digests, and design developer-focused educational documentation. You will curate and shape our brand voice to deliver unparalleled value across technical developer circles.',
    requirements: [
      'Excellent writing samples showing clear, engaging, jargon-free explanations',
      'Deep SEO mechanics understanding, including structural outlines and backlink audits',
      'Knowledge of modern task managers, code workflows, and software tooling landscape',
      'Stitch-precise execution with clean visual layout and structured diagrams'
    ],
    benefits: [
      'Generous profit-share plan tied to developer signup volumes',
      'Full workspace hardware/software tech stack of your choosing',
      'Stochastic health, physical training, and reading room budgets',
      '30 paid vacation days minimum, self-enforced by standard company rules'
    ],
    featured: false,
    companyWebsite: 'https://workflowy.io',
    companyDescription: 'WorkFlowy Co builds task optimization algorithms and collaboration hubs supporting over 2 million creative operators.'
  },
  {
    id: 'job-8',
    title: 'Lead React Developer (Design Systems Support)',
    companyName: 'Delineate Studio',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'development',
    type: 'Full-time',
    location: 'Remote (UTC-4 to UTC+3)',
    salary: '$120,000 - $150,000',
    postedAt: '1 week ago',
    description: 'Are you a React developer with a deep, almost obsessive respect for typography, micro-interactions, and visual precision? Delineate needs a Lead UI Engineer to build, organize, and maintain our design token system, implementing pixel-perfect UI libraries for high-profile client applications.',
    requirements: [
      'Highly seasoned experience with React 18/19, Vite, Tailwind, and layout animation engines',
      'Demonstrated love for translating Figma autolayout specs into flawlessly structured HTML/JS code',
      'Experience optimizing frontend speeds, font loading sequences, and element rendering cycles',
      'Expertise writing highly modular and clean TypeScript code'
    ],
    benefits: [
      'Top tier compensation with performance bonuses',
      'Unlimited workspace software and asset tool subscriptions',
      'Bi-annual company retreats (Paris, Tokyo, Kyoto)',
      'Custom workspace budget up to $5,000'
    ],
    featured: false,
    companyWebsite: 'https://delineate.design',
    companyDescription: 'Delineate is an international creative shop sculpting premium digital interfaces and identity assets for visionary projects.'
  },
  {
    id: 'job-9',
    title: 'Rust System Integrations Engineer',
    companyName: 'NexisScale',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'development',
    type: 'Full-time',
    location: 'Remote (UTC-5 to UTC+1)',
    salary: '$140,000 - $180,000',
    postedAt: '1 week ago',
    description: 'NexisScale is hiring a seasoned Rust Engineer to orchestrate low-latency proxy layers and secure sandboxes for API processing. You will optimize system memory boundaries, write multi-core compilation routines, and build unified connectors to standard databases.',
    requirements: [
      '3+ years writing asynchronous, concurrent Rust code in high-performance settings',
      'Sound knowledge of Linux, containers, routing networks, and API proxies',
      'Eagerness to write comprehensive tests, documentation, and perform peer reviews',
      'A true teammate seeking modular, pristine code paths'
    ],
    benefits: [
      'Highly competitive base salary + stock allocation package',
      'Comprehensive regional health, pension, and life benefits plan',
      'Workspace optimization program (unlimited software, monitors, ergonomic desks)',
      'Paid company learning days (up to 4 hours per week for personal skill exploration)'
    ],
    featured: false,
    companyWebsite: 'https://nexisscale.co',
    companyDescription: 'NexisScale handles infrastructure orchestration and developer tool suites for rapid scale-ups and high-velocity startups worldwide.'
  },
  {
    id: 'job-10',
    title: 'Senior Developer Support Engineer',
    companyName: 'NexisScale',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'support',
    type: 'Part-time',
    location: 'Remote (APAC/Global)',
    salary: '$50 - $75 / hour',
    postedAt: '2 weeks ago',
    description: 'Provide exceptional technical support directly to developer clients integration NexisScale SDKs. Assist with debugging API connectors, troubleshooting environment variables, and reporting code friction to the core engineering squad.',
    requirements: [
      'Solid command of JavaScript, API structures, and software deployment pipelines',
      'Strong, empathetic written communication skills in English',
      'A true helper eager to solve challenging puzzles alongside software engineers',
      'Available to commit to 20 hours per week during standard business hours'
    ],
    benefits: [
      'Highly flexible hours aligned with your timezone schedule',
      'Full suite developer licensing coverage',
      'Access to advanced learning portals and workspace stipend'
    ],
    featured: false,
    companyWebsite: 'https://nexisscale.co',
    companyDescription: 'NexisScale handles infrastructure orchestration and developer tool suites for rapid scale-ups and high-velocity startups worldwide.'
  },
  {
    id: 'job-11',
    title: 'Asynchronous SEO & Content Growth Manager',
    companyName: 'WorkFlowy Co',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'marketing',
    type: 'Full-time',
    location: 'Remote (GMT-5 to GMT+2)',
    salary: '$90,000 - $115,000',
    postedAt: '3 days ago',
    description: 'WorkFlowy Co is expanding its organic growth presence. We are hiring a seasoned Content & SEO manager who can formulate highly specific search strategies, oversee documentation clusters, and write lucid tutorials explaining system workflows to a non-technical audience.',
    requirements: [
      '4+ years managing scalable organic search properties and content syndication lists',
      'Flawless editorial criteria; you can turn technical jargon into highly readable visual guideposts',
      'Familiarity with modern tool chains like Google Search Console, Ahrefs, and markdown documentation repos',
      'High-trust capabilities; we operate with 0 daily status checks'
    ],
    benefits: [
      'Flexible workspace allowance with up to $2,000 for office aesthetics yearly',
      'Comprehensive regional health benefit plans of your choosing',
      'Uncapped creative freedom, direct cooperation with product directors'
    ],
    featured: false,
    companyWebsite: 'https://workflowy.io',
    companyDescription: 'WorkFlowy Co builds task optimization algorithms and collaboration hubs supporting over 2 million creative operators.'
  },
  {
    id: 'job-12',
    title: 'Senior Interaction & UX Systems Engineer',
    companyName: 'Delineate Studio',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'design',
    type: 'Full-time',
    location: 'Remote (Worldwide)',
    salary: '$110,000 - $140,000',
    postedAt: '5 days ago',
    description: 'We are seeking an engineer-designer hybrid who bridges the gap between Figma vectors and modular frontend components. You will contribute to high-fidelity motion libraries, formulate core design tokens, and build pristine React and Tailwind templates for corporate clients.',
    requirements: [
      'Extensive visual design folio showcasing precise spacing grids and custom motion behaviors',
      'Deep command of CSS layouts, SVG manipulations, and Tailwind setup',
      'Ability to articulate spatial interaction choices clearly through written async specifications',
      'Familiarity with React, Framer/Motion, or sibling animation controllers'
    ],
    benefits: [
      'Choose your own hardware setup (M4 MacBook Pro + dual studio monitors)',
      'Quarterly design-tech learning retreats (all expenses fully covered)',
      'Unlimited wellness, gym, and productivity subscription allowances'
    ],
    featured: true,
    companyWebsite: 'https://delineate.design',
    companyDescription: 'Delineate is an international creative shop sculpting premium digital interfaces and identity assets for visionary projects.'
  },
  {
    id: 'job-13',
    title: 'Senior Elixir/OTP Systems Architect',
    companyName: 'NexisScale',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'development',
    type: 'Full-time',
    location: 'Remote (Americas/Europe)',
    salary: '$150,000 - $185,000',
    postedAt: '1 week ago',
    description: 'NexisScale builds distributed virtual clusters. We are hiring a Senior Elixir systems veteran to orchestrate auto-recovery pipelines, implement robust telemetry collectors, and design zero-downtime micro-networks utilizing beam-nodes.',
    requirements: [
      '5+ years writing production-grade Elixir or Erlang code within heavy concurrency environments',
      'Expert level grasp of OTP designs, GenServers, and supervisors',
      'Familiarity with container architecture (Docker / K8s) and Linux internals',
      'Experience building clean developer-friendly API libraries'
    ],
    benefits: [
      'Generous equity incentives plus performance-based end of year profit-shares',
      'Flexible, asynchronous, meeting-free workspace built around Git commits',
      'Premium global medical, vision, and wellness coverage suite'
    ],
    featured: true,
    companyWebsite: 'https://nexisscale.co',
    companyDescription: 'NexisScale handles infrastructure orchestration and developer tool suites for rapid scale-ups and high-velocity startups worldwide.'
  },
  {
    id: 'job-14',
    title: 'Technical Product Manager - Workspace Integrations',
    companyName: 'WorkFlowy Co',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'product',
    type: 'Full-time',
    location: 'Remote (Global)',
    salary: '$130,000 - $160,000',
    postedAt: '1 week ago',
    description: 'Own the third-party ecosystem of WorkFlowy. Create beautiful, developer-friendly interfaces and robust REST engines connecting with Slack, Google Workspace, GitHub, and Figma modules. You will compile technical requirements, draft API sequence diagrams, and coordinate three fully remote squads.',
    requirements: [
      '4+ years within SaaS integration, web products, or developer SDK product management',
      'Ability to inspect JSON payloads, write detailed markdown RFCs, and map API fields',
      'Deep focus on human usability; you understand how micro-friction ruins integrations',
      'Absolute mastery of written English and remote work methodologies'
    ],
    benefits: [
      'High-grade premium medical packages tailored to your country of residence',
      'Annual offsite gatherings with optional travel expenses included',
      'Generous tech setup stipends ($4,000 upon initial sign-on)'
    ],
    featured: false,
    companyWebsite: 'https://workflowy.io',
    companyDescription: 'WorkFlowy Co builds task optimization algorithms and collaboration hubs supporting over 2 million creative operators.'
  },
  {
    id: 'job-15',
    title: 'Global Developer Support & Success Engineer',
    companyName: 'NexisScale',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'support',
    type: 'Part-time',
    location: 'Remote (Global)',
    salary: '$60 - $85 / hour',
    postedAt: '1 week ago',
    description: 'We are expanding our high-touch technical client team. You will write setup blueprints, debug connection logs, and troubleshoot cluster initialization bugs directly with corporate engineering clients deploying our virtual workspace SDKs.',
    requirements: [
      'Hands-on experience with Javascript/TypeScript, environment setup, and CLI engines',
      'Polished written and communication traits; you love making complex configurations simple',
      'Ability to work independently across self-managed flexible schedules',
      'Expected commitment of 15-20 hours weekly'
    ],
    benefits: [
      'Highly competitive compensation with flexible invoice intervals',
      'Dedicated mental and physical health subscription coverage',
      'Access to premium documentation tooling and local co-working desk allowance'
    ],
    featured: false,
    companyWebsite: 'https://nexisscale.co',
    companyDescription: 'NexisScale handles infrastructure orchestration and developer tool suites for rapid scale-ups and high-velocity startups worldwide.'
  },
  {
    id: 'job-16',
    title: 'Backend Golang Engineer - core APIs',
    companyName: 'AdNexus',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'development',
    type: 'Full-time',
    location: 'Remote (Europe/Africa/Americas)',
    salary: '$115,000 - $145,000',
    postedAt: '2 weeks ago',
    description: 'AdNexus builds telemetry delivery routes. We are looking for a key Go Developer to construct our concurrent event pipelines, manage Redis buffers, and integrate with PostgreSQL databases to produce millisecond reports.',
    requirements: [
      '3+ years writing high-throughput, concurrent APIs utilizing standard library Go channels',
      'Expert database proficiency (Active querying, indexes, explain plans, schema migrations)',
      'Passionate about writing self-explanatory, beautifully structured modular source systems',
      'Empathetic coworker comfortable with asynchronous pull request reviews'
    ],
    benefits: [
      'Complete flexibility over your hours and remote location',
      'Fully matched retirement allocations depending on regional setups',
      'Continuous development support (all professional exams, textbooks, and event admissions covered)'
    ],
    featured: false,
    companyWebsite: 'https://adnexus.net',
    companyDescription: 'AdNexus is a specialized digital promotion network serving next-generation artificial intelligence and software products.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    quote: 'Work Nexis completely changed my look at the job hunt. Clean typography, no unnecessary fluff, and direct, honest connections with employers. Truly a premium board!',
    author: 'Elena Rostova',
    role: 'Senior Product Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
  },
  {
    id: 'test-2',
    quote: 'As a distributed startup, we struggle to find engineers who understand asynchronous culture. Listing on Work Nexis provided us with high-signal applicants within 48 hours.',
    author: 'Marcus Vance',
    role: 'VP of Engineering at NexisScale',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80'
  },
  {
    id: 'test-3',
    quote: 'The design is absolutely gorgeous. The UI keeps you focused, letting you search, filter, and apply without feeling overwhelmed. Highly recommended for remote workers!',
    author: 'Kai Arisaka',
    role: 'Rust Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
  }
];
