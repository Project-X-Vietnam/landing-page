// ─── Per-Role Data Layer ────────────────────────────────────────────────────
// This is the single source of truth for role-specific content.
// Content maps: role (string from Screen1Pillars) → level → section content.

export type Level = "starter" | "developing" | "ready";

export interface RoleLevelData {
  // CV Canvas: Name/Title displayed on the sample CV
  cvTitle: string;
  cvSummary: string;

  // Transformation demo: before → after bullet checklist
  experienceChecklist: [string, string, string];
  summaryChecklist: [string, string, string];

  // Action verbs highlighted in the GuidePanel
  actionVerbs: string[];

  // Key skills shown in the workspace sidebar
  keySkills: string[];

  // HR Quote shown in the side panel
  hrQuote: string;
  hrName: string;
  hrRole: string;
  hrCompany: "shopee" | "google" | "grab" | "vng" | "startup" | "scaleup";
}

export interface RoleData {
  starter: RoleLevelData;
  developing: RoleLevelData;
  ready: RoleLevelData;
}

// ─── Role Map ────────────────────────────────────────────────────────────────
// Keys must match the role strings defined in Screen1Pillars.tsx PILLARS[].roles

export const ROLE_DATA: Record<string, RoleData> = {
  // ── ENGINEERING TRACK ──────────────────────────────────────────────────────

  "Frontend Engineer": {
    starter: {
      cvTitle: "Aspiring Frontend Developer",
      cvSummary: "Final-year Information Technology student with hands-on UI experience through personal projects and hackathons. Passionate about building fast, accessible web interfaces. Seeking first Frontend role in tech.",
      experienceChecklist: [
        "Replace 'worked on the website' with a specific verb — Built, Developed, Implemented",
        "Add the framework or library you used (React, Vue, Tailwind CSS)",
        "Add a result — load time reduced, pages added, users served",
      ],
      summaryChecklist: [
        "State your degree, university and graduation year clearly",
        "Name the specific technologies you've used (React, TypeScript, CSS)",
        "Close with a clear goal: what company type or role are you targeting?",
      ],
      actionVerbs: ["Built", "Implemented", "Developed", "Designed", "Shipped", "Prototyped", "Deployed", "Created"],
      keySkills: ["React.js", "HTML/CSS", "JavaScript", "Figma", "Git", "Responsive Design"],
      hrQuote: "For junior frontend roles, I look for proof that you can build real UIs — not just theory. Show me a GitHub link, a live site, a hackathon project. The code doesn't have to be perfect; the initiative does.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    developing: {
      cvTitle: "Frontend Engineer",
      cvSummary: "Performance-focused Frontend Engineer with 2+ years building React applications for 100K+ users. Specialised in web performance optimisation and component architecture that scales.",
      experienceChecklist: [
        "Replace 'responsible for UI' with a specific action: Architected, Optimised, Migrated",
        "Add team context: worked with X designers, Y backend engineers, in N-week sprint",
        "Quantify: load time reduced by X%, Lighthouse score improved from Y to Z",
      ],
      summaryChecklist: [
        "Lead with years of experience + primary stack (React, TypeScript)",
        "Include one performance metric (bundle size, LCP, page speed score)",
        "Add your specialisation — component library, e-commerce, design systems",
      ],
      actionVerbs: ["Architected", "Optimised", "Migrated", "Refactored", "Shipped", "Implemented", "Reduced", "Improved"],
      keySkills: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Webpack/Vite", "Web Vitals (LCP, CLS)", "REST API"],
      hrQuote: "Mid-level frontend engineers need to show they understand performance trade-offs, not just that they can write JSX. I want to see bundle sizes reduced, Lighthouse scores improved, or a component library adopted by a team.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Senior Frontend Engineer / Tech Lead",
      cvSummary: "Strategic Frontend Tech Lead with 6+ years scaling web platforms from prototype to production. Led frontend guild of 12 engineers. Expert in micro-frontends, CI/CD pipelines, and cross-platform performance standards.",
      experienceChecklist: [
        "Upgrade to executive verbs: Spearheaded, Championed, Architected the Frontend guild or platform",
        "Show org impact: led N engineers, defined coding standards adopted across M teams",
        "Lead with business outcome: pages that load in <2s, revenue uplift from perf improvements",
      ],
      summaryChecklist: [
        "Lead with org scale: how many engineers or teams have you influenced?",
        "Add architectural impact: micro-frontends, design system, CI/CD ownership",
        "Show business value: how did your platform improvements affect user metrics or revenue?",
      ],
      actionVerbs: ["Championed", "Spearheaded", "Architected", "Defined", "Established", "Scaled", "Mentored", "Orchestrated"],
      keySkills: ["React.js / Next.js", "TypeScript", "Micro-frontends", "CI/CD (GitHub Actions)", "Design Systems", "Web Vitals", "Team Leadership"],
      hrQuote: "For senior frontend roles I'm looking for engineers who've shaped the platform, not just used it. Tell me about the design system you built, the guild you led, or the performance initiative that cut your LCP in half. Code quality advocates get calls back.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },

  "Backend Engineer": {
    starter: {
      cvTitle: "Aspiring Backend Developer",
      cvSummary: "Final-year Computer Science student with experience building REST APIs in Python and Node.js through personal and academic projects. Seeking first Backend Engineering role at a product-led tech company.",
      experienceChecklist: [
        "Replace 'made an API' with Built, Designed, or Implemented a REST API for [use case]",
        "Name the language and framework: Python/FastAPI, Node.js/Express, Java/Spring Boot",
        "Add a scope: served X requests/day, connected to Y database, used by Z users",
      ],
      summaryChecklist: [
        "State your backend stack clearly (Python, Java, Node.js) — not just 'programming'",
        "Mention what you've built: APIs, microservices, database schemas",
        "Add a metric if possible: project handling X users or Y requests per second",
      ],
      actionVerbs: ["Built", "Designed", "Implemented", "Developed", "Wrote", "Integrated", "Created", "Configured"],
      keySkills: ["Python / Node.js", "REST API", "SQL (PostgreSQL)", "Git", "Docker (basic)", "Data Structures & Algorithms"],
      hrQuote: "For junior backend roles, I want to see you understand how systems connect — APIs, databases, auth flows. A side project with a working API connected to a real DB tells me more than a list of languages on your CV.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    developing: {
      cvTitle: "Backend Engineer",
      cvSummary: "Backend Engineer with 2+ years building high-throughput microservices processing 5M+ daily events. Specialised in distributed systems, API design, and service reliability with 99.9% uptime SLAs.",
      experienceChecklist: [
        "Replace 'worked on backend services' with Designed, Migrated, or Scaled a specific service",
        "Add system context: microservice, event-driven, message queue (Kafka, RabbitMQ)",
        "Quantify reliability or scale: 99.9% uptime, Xms p99 latency, Y req/sec throughput",
      ],
      summaryChecklist: [
        "Lead with your primary language stack and years of experience",
        "Include a scale metric: requests per second, data volume, uptime SLA",
        "Add your specialisation: distributed systems, API design, data pipelines",
      ],
      actionVerbs: ["Designed", "Scaled", "Migrated", "Optimised", "Implemented", "Refactored", "Deployed", "Reduced"],
      keySkills: ["Python / Go / Java", "Microservices", "Kafka / RabbitMQ", "PostgreSQL / Redis", "Docker / Kubernetes", "REST / gRPC", "CI/CD"],
      hrQuote: "I scan backend CVs for scale numbers and reliability signals. 'Built an API' means nothing. 'Scaled API to handle 10K req/s with p99 latency under 50ms' tells me you understand production engineering.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Senior Backend Engineer / Staff Engineer",
      cvSummary: "Staff Backend Engineer with 7+ years designing distributed systems at scale. Architected core payments infrastructure processing $200M+ annually. Led platform migration reducing infra costs by 40%.",
      experienceChecklist: [
        "Use staff-level verbs: Architected, Designed the technical vision for, Led the migration of",
        "Show org-level impact: adopted by 5 teams, reduced platform COGS by $X, served as tech lead on Y initiative",
        "Include business outcome: $M in cost savings, revenue-critical uptime, security audit pass",
      ],
      summaryChecklist: [
        "Lead with your architectural contributions: what systems have you designed end-to-end?",
        "Add business-scale impact: revenue processed, cost savings, org-wide adoption",
        "Show leadership: how many engineers have you mentored or led technically?",
      ],
      actionVerbs: ["Architected", "Championed", "Spearheaded", "Defined", "Established", "Drove", "Mentored", "Designed"],
      keySkills: ["Distributed Systems", "System Design", "Python / Go / Java", "Kafka / Flink", "PostgreSQL / Cassandra", "Kubernetes", "Staff Leadership"],
      hrQuote: "At Staff level I need to see you've made decisions that outlast you — a system design that teams still build on, a tech debt initiative that saved months. Show me architectural ownership, not just feature delivery.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },

  "Full Stack": {
    starter: {
      cvTitle: "Aspiring Full Stack Developer",
      cvSummary: "Computer Science student with end-to-end project experience using React and Node.js. Built 3 full-stack web applications as part of coursework and personal initiatives. Seeking first Full Stack role at a product company.",
      experienceChecklist: [
        "Don't just say 'full stack' — specify what you built on each layer: React frontend + Node API + PostgreSQL",
        "Name the deployment method: deployed on Vercel, self-hosted on VPS, Dockerised",
        "Add a user or outcome signal: used by X classmates, handles Y registrations",
      ],
      summaryChecklist: [
        "List your full stack clearly: frontend framework + backend language + database",
        "Count your projects: 'Built N full-stack applications' is specific and credible",
        "Add a target: what type of company or product domain interests you?",
      ],
      actionVerbs: ["Built", "Developed", "Shipped", "Integrated", "Designed", "Deployed", "Connected", "Created"],
      keySkills: ["React.js", "Node.js / Express", "PostgreSQL", "REST API", "Git", "Docker (basic)", "HTML/CSS", "Vercel / Railway"],
      hrQuote: "Full stack juniors stand out when they show ownership of the entire feature — not just 'did some frontend and some backend'. Walk me through one project from idea to deployment. That ownership mindset is what we hire for.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Full Stack Engineer",
      cvSummary: "Full Stack Engineer with 3+ years delivering end-to-end product features for B2C platforms with 200K+ users. Comfortable owning features from database schema to polished React UI.",
      experienceChecklist: [
        "Show end-to-end ownership: 'Owned full-stack implementation of [feature] from schema design to UI'",
        "Name the stack explicitly: React + TypeScript frontend, FastAPI backend, PostgreSQL, Redis",
        "Add business impact: feature adopted by X% of users, reduced API response time by Y%",
      ],
      summaryChecklist: [
        "Lead with your years + the scale of products you've worked on (users, revenue)",
        "Demonstrate both layers: what's distinctive about your frontend AND backend work?",
        "Add your strongest metric: feature delivery speed, user adoption, performance gain",
      ],
      actionVerbs: ["Owned", "Shipped", "Implemented", "Refactored", "Integrated", "Optimised", "Designed", "Deployed"],
      keySkills: ["React / TypeScript", "Node.js / FastAPI / Django", "PostgreSQL / MongoDB", "Redis", "Docker / CI/CD", "REST / GraphQL"],
      hrQuote: "Mid-level full stack candidates who stand out show they make smart trade-off decisions — when to use a cache, when to push logic to the frontend vs backend. I don't want someone who does both layers; I want someone who thinks about the right layer.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Senior Full Stack / Platform Engineer",
      cvSummary: "Senior Full Stack Engineer with 6+ years leading end-to-end platform development. Architected the core product infrastructure serving 1M+ users and led a cross-functional squad of 8 engineers.",
      experienceChecklist: [
        "Elevate to platform-level contributions: 'Architected the monorepo migration', 'Defined the API gateway strategy'",
        "Show team leadership: led N-person squad, defined coding standards, conducted code reviews",
        "Lead with business impact: platform that powers $XM in transactions, serves Y users",
      ],
      summaryChecklist: [
        "Lead with the scale of systems you've built and maintained",
        "Add team leadership signal: how many engineers have you led or mentored?",
        "Include a business outcome: revenue processed, users served, cost reduction",
      ],
      actionVerbs: ["Architected", "Spearheaded", "Led", "Defined", "Championed", "Scaled", "Mentored", "Established"],
      keySkills: ["React / Next.js", "Node.js / Go", "PostgreSQL / Redis", "Kubernetes / Docker", "System Design", "Tech Leadership", "Monorepo Architecture"],
      hrQuote: "A great senior full stack engineer shows they've shaped the engineering culture, not just written code. Tell me about the standards you've set, the developer experience improvements you've driven, or the platform that your team now builds on top of.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },

  "DevOps / Platform": {
    starter: {
      cvTitle: "Aspiring Platform Engineer",
      cvSummary: "Computer Science graduate with a strong foundation in systems engineering and automation. Built CI/CD pipelines and infrastructure-as-code for academic and personal projects. Seeking first DevOps or SRE role.",
      experienceChecklist: [
        "Replace 'used AWS' with specific automation: Provisioned, Containerised, Automated [resource] using [tool]",
        "Name the tools: Terraform, GitHub Actions, Docker, Ansible, Kubernetes",
        "Add the outcome: reduced deployment time by X mins, eliminated manual errors",
      ],
      summaryChecklist: [
        "State your core systems knowledge (Linux, Networking, Cloud basics)",
        "Highlight your IaC or CI/CD project experience",
        "Show an automation-first mindset in your summary statement",
      ],
      actionVerbs: ["Automated", "Provisioned", "Containerised", "Configured", "Deployed", "Monitored", "Scripted", "Integrated"],
      keySkills: ["Linux / Bash", "Docker", "GitHub Actions / GitLab CI", "AWS / GCP Basics", "Python / Go (scripting)", "Git"],
      hrQuote: "For junior DevOps roles, I look for candidates who understand that operations is a software problem. Show me a project where you didn't just run code locally, but containerised it and set up a deployment pipeline.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    developing: {
      cvTitle: "DevOps Engineer / SRE",
      cvSummary: "DevOps Engineer with 3+ years managing multi-cloud infrastructure handling 5M+ daily requests. Automated provision pipelines reducing environment setup from days to minutes. Champion for high availability and observability.",
      experienceChecklist: [
        "Highlight reliability metrics: 99.9% uptime, reduced MTTR by X%, scale supported",
        "Show IaC ownership: Managed X resources via Terraform, designed CI/CD workflows used by Y developers",
        "Include observability: Implemented Datadog/Prometheus monitoring to diagnose incidents faster",
      ],
      summaryChecklist: [
        "Lead with scale and reliability SLIs you've supported",
        "Name your core stack: Kubernetes, Terraform, Cloud Provider, Monitoring tools",
        "Show impact on developer velocity (e.g. self-serve platforms, faster builds)",
      ],
      actionVerbs: ["Architected", "Automated", "Optimised", "Migrated", "Secured", "Scaled", "Streamlined", "Resolved"],
      keySkills: ["Kubernetes", "Terraform", "AWS / Azure", "CI/CD Architecture", "Prometheus / Datadog", "Site Reliability", "Security / IAM"],
      hrQuote: "Mid-level DevOps is about scaling both systems and developer productivity. 'Built a deployment script' is baseline. Tell me how your CI/CD improvements accelerated 5 engineering teams, or how your monitoring caught an incident before users did.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
    ready: {
      cvTitle: "Senior Platform Engineer",
      cvSummary: "Senior Platform Engineer with 8+ years architecting enterprise-grade infrastructure. Built internal developer platform adopted by 200+ engineers. Reduced cloud costs by $500K/year while improving system resilience across 3 global regions.",
      experienceChecklist: [
        "Show platform/product mindset: Architected an Internal Developer Platform, Defined the SRE culture",
        "Lead with strategic business outcomes: Cloud cost reduced by $X, DORA metrics improved significantly",
        "Include incident leadership: Led response for SEV-1 incidents, established blameless post-mortem culture",
      ],
      summaryChecklist: [
        "Lead with org-wide multiplier impact (cost savings, velocity improvements)",
        "Show strategic technical leadership in platform design and tooling choices",
        "Reference cross-regional or high-compliance (SOC2, PCI) infrastructure scale",
      ],
      actionVerbs: ["Architected", "Spearheaded", "Championed", "Defined", "Established", "Governed", "Mentored", "Pioneered"],
      keySkills: ["Platform Engineering", "Cloud Architecture (Enterprise)", "FinOps / Cost Optimisation", "SRE Leadership", "Compliance / Security", "Multi-region Kubernetes", "Golang"],
      hrQuote: "At the senior level, I want to see a Platform Engineering mindset, not just a sysadmin. Have you built self-serve tools that developers love? Have you aligned infrastructure spending with business value? Show me you can lead the technical vision for operations.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },

  "Mobile Engineer": {
    starter: {
      cvTitle: "Aspiring Mobile Developer",
      cvSummary: "Software Engineering graduate with a focus on mobile applications. Published 2 apps to the App Store/Play Store as personal projects. Seeking first Mobile Engineer role building smooth, user-centric native or cross-platform apps.",
      experienceChecklist: [
        "Specify the platform and framework: iOS (Swift), Android (Kotlin), or React Native/Flutter",
        "Link to the app store listing or TestFlight if possible, alongside GitHub",
        "Mention state management or API integration used (Redux, Provider, REST)",
      ],
      summaryChecklist: [
        "State your target ecosystem clearly (iOS, Android, Mobile Web, or Cross-platform)",
        "Highlight your published apps or significant academic projects",
        "Mention basic UI/UX principles and hardware API usage (camera, location)",
      ],
      actionVerbs: ["Developed", "Published", "Designed", "Integrated", "Built", "Optimised", "Implemented", "Prototyped"],
      keySkills: ["Swift / Kotlin", "Flutter / React Native", "Mobile UI Design", "REST API Integration", "Git", "State Management"],
      hrQuote: "For junior mobile roles, having an app actually published to a store — even a simple one — is the strongest signal you can send. It proves you understand the full lifecycle, from code to certificates to submission.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    developing: {
      cvTitle: "Mobile Engineer",
      cvSummary: "Mobile Engineer with 3+ years building high-performance, 4.8-star rated iOS applications. Specialised in reactive programming, complex animations, and integrating offline-first robust architectures.",
      experienceChecklist: [
        "Highlight scale and ratings: App with X downloads, Y active users, Z.Z app store rating",
        "Show architectural knowledge: Migrated to MVVM/Clean Architecture, implemented reactive patterns",
        "Quantify performance wins: Reduced app launch time by X%, decreased crash rate to Y%",
      ],
      summaryChecklist: [
        "Include concrete metrics: DAU/MAU, crash-free session rate, app size reduction",
        "Name your architectural specialisation (MVVM, VIPER, Clean Architecture)",
        "Highlight experience with CI/CD for mobile (Bitrise, Fastlane)",
      ],
      actionVerbs: ["Architected", "Refactored", "Optimised", "Shipped", "Migrated", "Reduced", "Implemented", "Automated"],
      keySkills: ["iOS / Android Native", "Reactive Programming (RxSwift/Coroutines)", "MVVM / Clean Architecture", "CoreData / Room", "Fastlane / CI/CD", "Performance Profiling", "Unit/UI Testing"],
      hrQuote: "Mid-level mobile engineers need to worry about memory, battery, and offline states. Don't just list frameworks. Tell me how you maintained a 99.9% crash-free rate or how you handled background syncing gracefully.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Lead Mobile Engineer",
      cvSummary: "Lead Mobile Engineer with 7+ years developing flagship consumer applications with 10M+ MAUs. Defined cross-platform mobile strategy resulting in 30% faster feature delivery. Led squad of 6 iOS and Android engineers.",
      experienceChecklist: [
        "Include strategic platform decisions: Defined architecture transition, unified codebase strategy",
        "Show business impact: Boosted user retention, drove mobile commerce revenue by X%",
        "Highlight leadership: Led cross-functional mobile squads, mentored engineers, set testing standards",
      ],
      summaryChecklist: [
        "Lead with the massive scale of consumer apps you've built",
        "Show strategic leadership in mobile developer experience and CI/CD",
        "Mention alignment with product and business goals (e.g., App Store featuring, revenue)",
      ],
      actionVerbs: ["Spearheaded", "Architected", "Led", "Defined", "Championed", "Unified", "Scaled", "Mentored"],
      keySkills: ["Mobile Strategy", "Cross-platform Architecture", "App Store Optimisation", "Team Leadership", "Advanced Core Graphics/Animations", "Security / Crypto APIs", "Mobile DevOps"],
      hrQuote: "As a mobile lead, you are defining how the company reaches its users in their pockets. Show me how you improved developer velocity, unified fragmented codebases, or partnered with product design to build an Apple Design Award-worthy experience.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },

  "Systems Engineer": {
    starter: {
      cvTitle: "Aspiring Systems Engineer",
      cvSummary: "Computer Engineering student with hardware-software integration experience. Built embedded systems and low-level C/C++ applications for academic robotics projects. Seeking entry-level Systems Engineering role.",
      experienceChecklist: [
        "Replace 'wrote code' with: Developed embedded firmware for [hardware] using [language]",
        "Specify the constraints: RTOS, memory limits, real-time performance requirements",
        "Add the context: robotics, IoT device, academic research, hackathon",
      ],
      summaryChecklist: [
        "Highlight your deep understanding of operating systems, networking, or hardware architecture",
        "Mention your preferred low-level languages (C, C++, Rust)",
        "Reference a concrete project that bridges software and hardware",
      ],
      actionVerbs: ["Programmed", "Designed", "Integrated", "Debugged", "Optimised", "Tested", "Built", "Configured"],
      keySkills: ["C / C++", "Linux Systems", "RTOS / Embedded", "Computer Architecture", "Networking Protocols", "Debugging (GDB)"],
      hrQuote: "Junior systems engineers stand out by demonstrating they understand what happens down at the metal. If you've written code that manages its own memory or interfaces directly with hardware, make that front and center on your CV.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    developing: {
      cvTitle: "Systems Engineer",
      cvSummary: "Systems Engineer with 4 years building high-performance, low-latency infrastructure components in C++ and Rust. Specialised in network programming and kernel-level optimisations for trading systems.",
      experienceChecklist: [
        "Quantify performance with micro-metrics: Reduced latency by X microseconds, improved throughput by Y Mpps",
        "Specify the system depth: Kernel bypass, custom TCP/IP stack, lock-free data structures",
        "Show architectural understanding of the whole system stack",
      ],
      summaryChecklist: [
        "Lead with your domain (HFT, databases, networking, IoT, OS development)",
        "Highlight extreme performance or reliability metrics you've achieved",
        "Mention modern systems languages if applicable (e.g., migrating C++ to Rust)",
      ],
      actionVerbs: ["Architected", "Optimised", "Engineered", "Reduced", "Profiled", "Implemented", "Designed", "Resolved"],
      keySkills: ["C++ / Rust / Go", "Low-latency Design", "Multi-threading / Concurrency", "Linux Kernel Tuning", "Network Programming", "Performance Profiling", "Distributed Systems"],
      hrQuote: "For mid-level systems roles, performance numbers speak volumes. Don't just say you 'optimised the system'. Tell me you reduced 99th percentile latency from 500µs to 50µs by implementing lock-free queues. Contextualise your optimisations.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Principal Systems Engineer",
      cvSummary: "Principal Systems Engineer with 10+ years designing core infrastructure for distributed databases. Architected novel storage engine that increased write throughput by 400%. Technical authority on systems performance and reliability.",
      experienceChecklist: [
        "Focus on fundamental innovations: Designed a custom storage engine, rewrote the consensus protocol",
        "Show impact on company technical IP and competitive advantage",
        "Include mentorship and standard-setting for large engineering organisations",
      ],
      summaryChecklist: [
        "Lead with architectural designs that serve as the foundation for the company's products",
        "Include massive scale metrics (exabytes of data, millions of concurrent connections)",
        "Highlight your role as a technical authority or open-source contributor",
      ],
      actionVerbs: ["Architected", "Pioneered", "Designed", "Spearheaded", "Authored", "Established", "Mentored", "Optimised"],
      keySkills: ["Systems Architecture", "Distributed Consensus (Raft/Paxos)", "Custom Storage Engines", "Advanced C++ / Rust", "Performance Engineering", "Technical Leadership", "Open Source Authorship"],
      hrQuote: "At the principal level in systems engineering, you are often defining the technical edge of the company. I want to see how your architectural decisions solved fundamentally hard computer science problems that enabled entirely new products or massive cost savings.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },

  // ── PRODUCT & ANALYTICS TRACK ──────────────────────────────────────────────

  "Product Manager": {
    starter: {
      cvTitle: "Aspiring Product Manager",
      cvSummary: "Business graduate with strong technical aptitude. Led cross-functional student teams to deliver 3 product prototypes. Seeking entry-level PM or APM role to drive user-centric product development.",
      experienceChecklist: [
        "Include end-to-end scope: 'Led discovery and delivery for [Project] from ideation to launch'",
        "Show cross-functional collaboration: worked with X developers and Y designers",
        "Quantify outcomes: acquired X users, achieved Y% completion rate, won Z competition",
      ],
      summaryChecklist: [
        "State your background balance (e.g. Business + Tech, or Design + Tech)",
        "Highlight your specific product-adjacent experiences (scrum master, growth, data)",
        "Close with the type of product culture you want to join",
      ],
      actionVerbs: ["Launched", "Prioritised", "Researched", "Led", "Prototyped", "Coordinated", "Analysed", "Designed"],
      keySkills: ["User Discovery", "Wireframing (Figma)", "Agile / Scrum", "Data Analysis (SQL)", "Market Research", "Cross-functional Leadership"],
      hrQuote: "For APMs, I want to see you've actually built something, even if it's a side project. I'm looking for the 'Product Mindset': can you identify a real problem, rally a team around a solution, and measure the result?",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    developing: {
      cvTitle: "Product Manager",
      cvSummary: "Product Manager with 3 years driving mobile consumer experiences. Led a cross-functional squad of 10 to launch features that increased user retention by 15%. Expert in agile delivery and data-driven prioritization.",
      experienceChecklist: [
        "Focus on outcomes over outputs: 'Launched feature X, increasing monthly active users by 15%'",
        "Prove your authority: 'Led 10-person Engineering and Design team'",
        "Include strategy to execution: 'Defined roadmap for [Domain] resulting in [Business Metric]'",
      ],
      summaryChecklist: [
        "Lead with your domain expertise (Consumer, B2B SaaS, FinTech, etc.)",
        "State your biggest business metric win (revenue, retention, conversion)",
        "Highlight your product methodology (Product-led growth, data-informed, user-centric)",
      ],
      actionVerbs: ["Launched", "Defined", "Prioritised", "Drove", "Spearheaded", "Optimised", "Roadmapped", "Orchestrated"],
      keySkills: ["Product Strategy", "Roadmapping", "A/B Testing", "Mixpanel / Amplitude", "Jira / Agile", "Stakeholder Management", "UX/UI Principles"],
      hrQuote: "Mid-level PMs must prove they influence metrics, not just manage backlogs. Don't tell me you wrote tickets; tell me you shipped a feature that increased conversion by 5%. Connecting tech output to business outcome is non-negotiable.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Group Product Manager / Product Lead",
      cvSummary: "Product Lead with 7+ years scaling B-to-B SaaS platforms to $50M+ ARR. Currently managing a portfolio of 3 products and mentoring 4 Product Managers. Defined the multi-year product strategy securing executive buy-in.",
      experienceChecklist: [
        "Show portfolio leadership: 'Managed portfolio of 3 products generating $XXM ARR'",
        "Highlight people leadership: 'Hired, mentored, and managed a team of 4 PMs'",
        "Include org-level strategic changes: 'Redefined company-wide prioritisation framework'",
      ],
      summaryChecklist: [
        "Lead with P&L or ARR ownership and portfolio scale",
        "Highlight your people leadership (managing other PMs)",
        "Show board/executive-level influence on company strategy",
      ],
      actionVerbs: ["Championed", "Defined", "Scaled", "Governed", "Negotiated", "Pioneered", "Mentored", "Established"],
      keySkills: ["Product Portfolio Management", "P&L Ownership", "Product-Led Growth Strategy", "Executive Stakeholder Alignment", "Team Mentorship", "Go-to-Market Strategy"],
      hrQuote: "At the Product Lead level, I need to know you can manage other PMs and define a strategy the whole company can rally behind. Your CV should speak the language of the CEO: ARR, Market Share, margins, and portfolio growth.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Business Analyst": {
    starter: {
      cvTitle: "Aspiring Business Analyst",
      cvSummary: "Analytical graduate with strong problem-solving skills and academic experience in process mapping and requirements gathering. Seeking entry-level Business Analyst role to bridge business needs and technical solutions.",
      experienceChecklist: [
        "Include the process: 'Gathered requirements → Proposed tech solution → Delivered outcome'",
        "Mention the tools used for mapping (Visio, Lucidchart) and requirements (Jira)",
        "Show stakeholder engagement: 'Conducted interviews with X business users'",
      ],
      summaryChecklist: [
        "Highlight your core BA methodology (gap analysis, requirements gathering)",
        "Mention your technical toolkit (SQL, Excel, process mapping tools)",
        "State the domain you are targeting",
      ],
      actionVerbs: ["Gathered", "Mapped", "Analysed", "Documented", "Facilitated", "Proposed", "Researched", "Tested"],
      keySkills: ["Requirements Gathering", "Process Mapping (BPMN)", "Excel (Advanced)", "SQL (Basic)", "Stakeholder Interviews", "UAT Testing"],
      hrQuote: "Junior BAs need to show they are organized, structured thinkers. Even if it's a university project, walk me through how you gathered constraints, formalized them into requirements, and ensured the final output met the goal.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Business Analyst",
      cvSummary: "Business Analyst with 3+ years experience optimizing operations in FinTech. Translated complex business rules into system requirements for a platform handling 100K+ daily transactions. Reduced processing errors by 20%.",
      experienceChecklist: [
        "Focus on process impact: 'Optimised onboarding process, reducing lead time by X days'",
        "Show technical translation: 'Authored BRD/SRS for new CRM module used by Y developers'",
        "Include adoption/UAT: 'Led UAT testing with 50+ users, achieving 98% pass rate'",
      ],
      summaryChecklist: [
        "Lead with your domain expertise (FinTech, E-commerce, Supply Chain)",
        "Highlight your ability to translate between business (C-level) and tech (Engineering)",
        "Include a specific operational metric you've improved",
      ],
      actionVerbs: ["Optimised", "Translated", "Authored", "Streamlined", "Engineered", "Diagnosed", "Aligned", "Validated"],
      keySkills: ["As-Is & To-Be Flow", "BRD / PRD Writing", "SQL & Data Analysis", "Agile / Scrum", "Jira / Confluence", "UAT Leadership", "Stakeholder Alignment"],
      hrQuote: "A great mid-level BA is the glue between business and engineering. Don't just list 'wrote requirements'. Tell me how your requirements clarified a complex business process that saved the engineering team from writing the wrong feature.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Lead Business Analyst",
      cvSummary: "Lead Business Analyst with 8 years experience driving digital transformation initiatives. Led BA chapter of 6 across international squads. Re-engineered core logistics processes saving $2M annually.",
      experienceChecklist: [
        "Highlight enterprise-level transformations: 'Led business analysis for $XM ERP migration'",
        "Show methodology leadership: 'Standardised requirement gathering framework across 5 teams'",
        "Focus on executive alignment and massive cost savings or revenue generation",
      ],
      summaryChecklist: [
        "Lead with digital transformation scale and business impact",
        "Highlight BA guild/chapter leadership and standard-setting",
        "Show ability to consult and influence C-suite stakeholders",
      ],
      actionVerbs: ["Spearheaded", "Re-engineered", "Standardised", "Championed", "Led", "Transformed", "Consulted", "Governed"],
      keySkills: ["Digital Transformation", "Enterprise Architecture", "Change Management", "BA Guild Leadership", "Executive Consulting", "Process Engineering (Six Sigma/Lean)"],
      hrQuote: "Lead BAs are essentially internal consultants and process engineers. I look for enterprise-scale systems thinking. Tell me how you standardized processes across the company or led the analysis for a multi-million-dollar transformation.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Growth Analyst": {
    starter: {
      cvTitle: "Aspiring Growth Analyst",
      cvSummary: "Data-driven graduate with a passion for marketing and user behavior. Experienced in Python data analysis and digital marketing projects. Seeking a Growth Analyst role to drive acquisition and retention.",
      experienceChecklist: [
        "Highlight any campaigns or experiments: 'Ran A/B tests on landing page, improving conversion by X%'",
        "Show data tools: 'Used Python/Pandas to analyse user churn from dataset of X rows'",
        "Focus on the funnel: acquisition, activation, or retention",
      ],
      summaryChecklist: [
        "Bridge the gap between data (SQL/Python) and marketing (growth, CAC)",
        "Mention specific analytical techniques (cohort analysis, funnel analysis)",
        "Show a bias for action and experiment-driven mindset",
      ],
      actionVerbs: ["Analysed", "Experimented", "Optimised", "Tested", "Researched", "Reported", "Identified", "Segmented"],
      keySkills: ["SQL", "Google Analytics", "A/B Testing Basics", "Excel", "Data Visualisation (Looker/Tableau)", "Python (Pandas)"],
      hrQuote: "For growth roles, I want to see a hacker mindset combined with data rigor. Show me a personal project where you didn't just analyze data, but used that data to try and change a metric.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    developing: {
      cvTitle: "Growth Analyst",
      cvSummary: "Growth Analyst with 3 years experience driving product-led growth. Designed and executed 50+ A/B tests optimizing the onboarding funnel, resulting in a 25% uplift in first-week retention.",
      experienceChecklist: [
        "Focus on ROI and Growth metrics: CAC, LTV, Churn, Activation Rate",
        "Show the volume of experiments: 'Designed and executed X A/B tests per quarter'",
        "Highlight actionable insights: 'Identified drop-off in step 3, leading to redesign that recovered $X in revenue'",
      ],
      summaryChecklist: [
        "Lead with specific funnel stages you've optimized (Top of Funnel, Onboarding, Retention)",
        "Highlight your statistical rigor (A/B testing, significance, cohort analysis)",
        "Include a major revenue/growth metric you directly influenced",
      ],
      actionVerbs: ["Optimised", "Designed", "Executed", "Uncovered", "Scaled", "Boosted", "Segmented", "Iterated"],
      keySkills: ["A/B & Multivariate Testing", "Mixpanel / Amplitude", "Advanced SQL", "Cohort Analysis", "Funnel Optimisation", "Statistical Significance"],
      hrQuote: "Growth Analysts must show they drive revenue/users, not just dashboards. 'Created a dashboard' is passive. 'Uncovered a churn driver and ran an experiment that saved $50K/month' gets you the job.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Growth / Lead Growth Analyst",
      cvSummary: "Lead Growth Analyst with 7 years experience orchestrating growth machines for consumer apps. Scaled user base from 1M to 5M through rigorous lifecycle marketing and product experimentation.",
      experienceChecklist: [
        "Show strategic channel ownership: 'Optimised $X/mo marketing budget across 5 channels'",
        "Include infrastructure contributions: 'Built the internal experimentation platform/framework'",
        "Highlight org-level impact: 'Shifted company focus to retention, improving LTV by X% in 6 months'",
      ],
      summaryChecklist: [
        "Lead with the massive scale of user/revenue growth you've led",
        "Show leadership over the experimentation culture of the company",
        "Include cross-functional influence (aligning Marketing, Product, and Data)",
      ],
      actionVerbs: ["Orchestrated", "Scaled", "Pioneered", "Championed", "Led", "Defined", "Monetised", "Established"],
      keySkills: ["Growth Strategy", "Marketing Mix Modelling", "Experimentation Infrastructure", "LTV/CAC Forecasting", "Team Leadership", "Product-Led Growth (PLG)"],
      hrQuote: "At the Lead Growth level, you need to show you built the 'growth engine'. Did you establish the experimentation culture? Did you dictate where millions in marketing budget went based on your models? Strategy and scale are key.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "UX Researcher": {
    starter: {
      cvTitle: "Aspiring UX Researcher",
      cvSummary: "Psychology/HCI graduate with a passion for understanding user behavior. Conducted 3 end-to-end qualitative research projects during university, leading to actionable design recommendations. Seeking first UXR role.",
      experienceChecklist: [
        "Detail your methodologies: 'Conducted 15 moderated usability tests and 3 card sorting exercises'",
        "Show the synthesis: 'Synthesised raw user data into 4 distinct primary personas'",
        "Highlight impact: 'Recommendations led to a 20% improvement in task success rate in prototype'",
      ],
      summaryChecklist: [
        "State your academic background (HCI, Psychology, Sociology) if relevant",
        "List the specific qualitative/quantitative methodologies you know",
        "Show you understand that research must lead to actionable product changes",
      ],
      actionVerbs: ["Conducted", "Researched", "Synthesised", "Interviewed", "Analysed", "Facilitated", "Presented", "Recruited"],
      keySkills: ["Usability Testing", "User Interviews", "Survey Design", "Affinity Mapping", "Figma (Basics)", "Miro / FigJam"],
      hrQuote: "Show me you know how to talk to users, but more importantly, show me how you translate their messy feedback into clear, prioritized insights that a product team can actually use.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "UX Researcher",
      cvSummary: "UX Researcher with 3+ years experience turning ambiguous user problems into validated product direction. Mixed-methods specialist who drove the research strategy for a flagship mobile redesign.",
      experienceChecklist: [
        "Show mixed-methods: 'Combined qualitative interviews with quantitative survey data (N=500)'",
        "Focus on product influence: 'Research insights directly led to the prioritisation of [Feature X]'",
        "Include operational skills: 'Managed research operations, recruiting and compensating 100+ users'",
      ],
      summaryChecklist: [
        "Lead with your strongest methodology capabilities (Mixed methods, Generative, Evaluative)",
        "Highlight a major product launch or redesign driven by your research",
        "Show your ability to influence senior product/design stakeholders",
      ],
      actionVerbs: ["Synthesised", "Uncovered", "Validated", "Influenced", "Mapped", "Diagnosed", "Led", "Triangulated"],
      keySkills: ["Mixed-Methods Research", "Generative Discovery", "Evaluative Testing", "Persona/Journey Mapping", "Qualtrics/SurveyMonkey", "UserTesting.com", "Data Synthesis"],
      hrQuote: "Mid-level UXRs must prove they influence the roadmap. I don't want to read that you 'wrote a research report'. I want to read that your research 'pivoted the product strategy away from a failing feature, saving 6 months of dev time'.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Lead UX Researcher",
      cvSummary: "Lead UX Researcher with 8 years experience establishing research practices from the ground up. Scaled UXR team to 4 people and built the company's first Research Repository. Partner to C-level on strategic market expansion.",
      experienceChecklist: [
        "Highlight ResearchOps and scaling: 'Established company-wide Research Repository allowing self-serve insights'",
        "Show strategic/generative impact: 'Led foundational market research that defined 3-year product strategy'",
        "Include mentorship and team building: 'Hired and managed 4 UX Researchers'",
      ],
      summaryChecklist: [
        "Lead with your experience in scaling Research Operations across an org",
        "Highlight your focus on long-term foundational/generative research",
        "Show executive influence and cross-functional alignment capability",
      ],
      actionVerbs: ["Established", "Spearheaded", "Scaled", "Pioneered", "Championed", "Mentored", "Defined", "Governed"],
      keySkills: ["Research Strategy", "ResearchOps", "Foundational Discovery", "Executive Presentation", "Team Leadership", "Cross-Org Influence"],
      hrQuote: "Senior UXRs are strategic partners to the VP of Product. Tell me how you built the research democratisation process, or how your foundational study identified a totally new market segment that generated millions.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Strategy Lead": {
    starter: {
      cvTitle: "Aspiring Strategy Analyst",
      cvSummary: "Business/Economics graduate with strong analytical framework thinking. Experienced in market sizing, competitor analysis, and financial modeling through consulting internships. Seeking Strategy Analyst role.",
      experienceChecklist: [
        "Show structured thinking: 'Analysed market entry for [Domain], evaluating 5 key competitors'",
        "Include financial/data modelling: 'Built financial model projecting $X revenue over 3 years'",
        "Highlight deliverables: 'Presented go-to-market strategy deck to academic/internship stakeholders'",
      ],
      summaryChecklist: [
        "State your academic rigor (Consulting club, case competitions, quantitative degree)",
        "Highlight your core toolkit (Financial modelling, PPT, competitive analysis)",
        "Show a strong bias for structured problem solving",
      ],
      actionVerbs: ["Analysed", "Modelled", "Evaluated", "Researched", "Presented", "Forecasted", "Structured", "Sized"],
      keySkills: ["Financial Modelling", "Market Sizing", "Competitor Analysis", "Excel/PowerPoint", "Structured Problem Solving", "Data Analysis"],
      hrQuote: "Junior strategy roles require sheer analytical horsepower and structured thinking. If you won a case competition or built a robust model during an internship, highlight the 'so what?' of your analysis.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Strategy Manager",
      cvSummary: "Strategy Manager with 4 years experience ex-MBB/Tier 1 consulting. Transitioned into tech to drive corporate strategy and M&A. Led a strategic pricing overhaul that expanded margins by 12%.",
      experienceChecklist: [
        "Include major strategic pivots: 'Led pricing strategy redesign, increasing ARPU by $X'",
        "Focus on cross-functional alignment: 'Partnered with Product and Sales to launch new tier'",
        "Highlight M&A or expansion: 'Evaluated 10+ acquisition targets, leading to successful acquisition of X'",
      ],
      summaryChecklist: [
        "Lead with your pedigree (ex-consulting, IB) if applicable + years in industry",
        "Highlight major P&L impacts (pricing, new market entry, cost restructuring)",
        "Show ability to influence without authority across VP levels",
      ],
      actionVerbs: ["Spearheaded", "Overhauled", "Orchestrated", "Evaluated", "Drove", "Partnered", "Executed", "Structured"],
      keySkills: ["Corporate Strategy", "Pricing Strategy", "M&A Due Diligence", "Go-To-Market Formulation", "Executive Alignment", "Cross-functional Leadership"],
      hrQuote: "Mid-level strategists need to show they can execute, not just make slides. 'Created a deck' is consultant-speak. 'Created a pricing strategy and piloted it with sales, raising margins 10%' is tech-speak.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
    ready: {
      cvTitle: "Head of Strategy / Strategy Director",
      cvSummary: "Head of Strategy with 9 years experience defining the corporate trajectory for pre-IPO tech firms. Right-hand to the CEO. Successfully orchestrated Series C fundraising of $50M and defined the 3-year market expansion plan.",
      experienceChecklist: [
        "Highlight board/investor impact: 'Co-authored Series C narrative, securing $50M funding'",
        "Show massive scale: 'Defined geographic expansion strategy, entering 3 new countries'",
        "Include team building: 'Built corporate strategy and BizOps team from 0 to 5'",
      ],
      summaryChecklist: [
        "Lead with your C-level/Board advisory experience",
        "Highlight massive capital events (Fundraising, M&A, IPO prep)",
        "Show ownership of long-term (3-5 year) company vision and P&L trajectory",
      ],
      actionVerbs: ["Defined", "Orchestrated", "Pioneered", "Championed", "Secured", "Advised", "Navigated", "Established"],
      keySkills: ["Board / Investor Relations", "Capital Raising", "Global Market Expansion", "Post-Merger Integration", "Strategic Planning", "P&L Optimisation"],
      hrQuote: "Senior strategy leaders are co-pilots to the CEO. The CV should read like a history of the company's biggest pivotal moments. Show me the multi-million dollar bets you recommended and how they paid off.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Data PM": {
    starter: {
      cvTitle: "Aspiring Data Product Manager",
      cvSummary: "Data-fluent professional transitioning to Product Management. Strong foundation in SQL and Python with experience delivering data insights. Seeking APM role to build internal data platforms or ML-driven features.",
      experienceChecklist: [
        "Highlight both Data and PM skills: 'Analysed X dataset to propose Y product feature'",
        "Show technical fluency: 'Built a dashboard in Tableau used by 5 stakeholders'",
        "Focus on treating data as a product: 'Improved data freshness by X% for the ops team'",
      ],
      summaryChecklist: [
        "State your dual background (e.g. Data Analyst moving to PM)",
        "Highlight your technical stack (SQL, Python, BI tools)",
        "Clearly state your goal: building data platforms, ML products, or analytics tools",
      ],
      actionVerbs: ["Analysed", "Proposed", "Prototyped", "Visualised", "Bridged", "Uncovered", "Mapped", "Coordinated"],
      keySkills: ["SQL", "Data Visualisation", "Requirement Gathering", "Agile Basics", "Python (Pandas)", "A/B Testing Basics"],
      hrQuote: "For entry-level Data PMs, I want to see that you can 'speak data' to engineers and 'speak value' to business. Show me a project where your data analysis directly led to a business decision or product change.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    developing: {
      cvTitle: "Data Product Manager",
      cvSummary: "Data PM with 4 years experience owning internal analytics platforms and ML recommendation engines. Bridged the gap between Data Science and Business to launch a personalization feature that increased CTR by 18%.",
      experienceChecklist: [
        "Focus on Data Products: 'Launched ML-driven recommendation engine, boosting sales by X%'",
        "Show stakeholder complexity: 'Aligned Data Science, Engineering, and Marketing on a unified data taxonomy'",
        "Include adoption metrics: 'Achieved 90% weekly adoption of new internal BI platform'",
      ],
      summaryChecklist: [
        "Lead with your specific data-product niche (ML features, internal platforms, experimentation tools)",
        "Highlight your ability to translate ML/Data concepts into business ROI",
        "Show a major metric improvement tied strictly to a data feature",
      ],
      actionVerbs: ["Launched", "Aligned", "Architected", "Translated", "Spearheaded", "Optimised", "Prioritised", "Evangelised"],
      keySkills: ["Machine Learning Lifecycle", "A/B Testing Infrastructure", "Data Taxonomy / Governance", "Advanced SQL", "Stakeholder Alignment", "Product Strategy"],
      hrQuote: "A great Data PM doesn't just manage data scientists; they treat algorithms and data pipelines as products. Tell me how your data product solved a real problem, whether it was improving a ML model's ROI or getting 50 Ops people to trust a dashboard.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Lead Data Product Manager",
      cvSummary: "Lead Data PM with 8 years building enterprise data platforms and AI products. Owned the company-wide experimentation platform and Data Warehouse transition. Led a squad of 15 Data Scientists and Engineers.",
      experienceChecklist: [
        "Show strategic platform ownership: 'Owned company-wide migration to Snowflake, saving $X/yr in infra costs'",
        "Highlight AI strategy: 'Defined the Generative AI roadmap, deploying 3 LLM features to production'",
        "Include cultural impact: 'Drove a company-wide shift to self-serve analytics, reducing ad-hoc data requests by 60%'",
      ],
      summaryChecklist: [
        "Lead with massive scale data systems (Data mesh, ML platforms, org-wide BI)",
        "Highlight leadership over cross-functional data pods (DE, DS, DA)",
        "Show C-level influence on the company's overall Data/AI strategy",
      ],
      actionVerbs: ["Pioneered", "Championed", "Defined", "Scaled", "Governed", "Orchestrated", "Established", "Transformed"],
      keySkills: ["AI/ML Product Strategy", "Enterprise Data Architecture", "Data Mesh / Governance", "Experimentation Platforms", "Team Leadership", "Executive Alignment"],
      hrQuote: "At the Lead level, you own the company's 'Data Nervous System'. I need to see that you've built scalable platforms—like an experimentation engine or a data mesh—that fundamentally changed how fast the whole company can iterate.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  // ── TECH-ENABLED BUSINESS TRACK ────────────────────────────────────────────

  "Business Development": {
    starter: {
      cvTitle: "Aspiring Business Developer",
      cvSummary: "Business graduate with strong interpersonal and analytical skills. Led university partnership initiatives securing 5 new corporate sponsors. Passionate about driving growth in B2B tech environments.",
      experienceChecklist: [
        "Quantify your hustle: 'Outreached to X prospects weekly, securing Y meetings'",
        "Show revenue/value generated: 'Negotiated sponsorships worth $X for student org'",
        "Highlight CRM or tech tools used (Salesforce, HubSpot, Apollo)",
      ],
      summaryChecklist: [
        "State your target market or industry (e.g. B2B SaaS, FinTech)",
        "Highlight your communication and negotiation capabilities",
        "Show a relentless focus on targets and growth",
      ],
      actionVerbs: ["Outreached", "Negotiated", "Secured", "Generated", "Pitched", "Qualified", "Converted", "Prospected"],
      keySkills: ["B2B Sales", "Lead Generation", "Cold Outreach", "CRM (Salesforce/HubSpot)", "Client Presentations", "Market Research"],
      hrQuote: "BD is about hustle and numbers. If you're a fresher, I want to see how you deal with rejection and how you hit targets. Tell me about the 100 cold emails you sent to land that one sponsorship for your university club.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Business Development Manager",
      cvSummary: "Business Development Manager with 3+ years experience driving B2B tech sales in SEA. Consistently exceeded annual quota by 115%, generating $2M+ in new pipeline. Expert in consultative selling and enterprise negotiations.",
      experienceChecklist: [
        "Lead with quota and revenue: 'Achieved 120% of quota in 2024, closing $XM in ARR'",
        "Detail the deal size and cycle: 'Managed 3-month sales cycles for enterprise deals averaging $50K'",
        "Show pipeline generation: 'Sourced 40% of closed-won deals through outbound efforts'",
      ],
      summaryChecklist: [
        "Lead with your track record (X years of quota attainment)",
        "State your Average Contract Value (ACV) and target demographic (Enterprise vs SMB)",
        "Highlight your specific sales methodology (MEDDIC, Challenger Sale)",
      ],
      actionVerbs: ["Closed", "Generated", "Exceeded", "Negotiated", "Pipeline", "Accelerated", "Onboarded", "Expanded"],
      keySkills: ["Enterprise Sales", "Quota Attainment", "Pipeline Management", "Contract Negotiation", "MEDDIC / SPIN", "Strategic Account Planning"],
      hrQuote: "Sales and BD CVs are the easiest to read: what was your quota, and what percentage did you hit? Don't hide the numbers. If you closed a $500K enterprise deal, tell me how long the cycle was and who you negotiated with.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Business Development",
      cvSummary: "Head of BD with 9 years experience scaling enterprise software revenues from $1M to $15M ARR. Built and led a team of 10 AEs and SDRs. Defined the GTM strategy that secured 3 Fortune 500 marquee clients.",
      experienceChecklist: [
        "Highlight team scale and aggregate revenue: 'Led team of 10 to generate $15M ARR'",
        "Show strategic GTM leadership: 'Defined outbound framework reducing customer acquisition cost by X%'",
        "Include massive partnership/enterprise wins: 'Personally closed marquee $2M deal with [Major Brand]'",
      ],
      summaryChecklist: [
        "Lead with aggregate revenue managed and team scale",
        "Highlight your Go-To-Market strategy expertise",
        "Show executive relationship building (selling to CxOs)",
      ],
      actionVerbs: ["Scaled", "Pioneered", "Championed", "Orchestrated", "Secured", "Grew", "Directed", "Established"],
      keySkills: ["GTM Strategy", "Sales Leadership & Coaching", "Revenue Forecasting", "Enterprise C-Level Sales", "Territory Mapping", "Partnership Ecosystems"],
      hrQuote: "At the Head of BD level, you aren't just selling; you're building a revenue machine. Show me how you hired, trained, and scaled your team. Tell me how you halved the ramp time for new Account Executives.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Consulting": {
    starter: {
      cvTitle: "Aspiring Consultant",
      cvSummary: "Business graduate with top-tier academic record and strong analytical structuring. Winner of 2 national case competitions. Seeking entry-level Management Consulting role.",
      experienceChecklist: [
        "Show structured problem solving: 'Analysed dataset of X to recommend Y policy'",
        "Highlight presentation skills: 'Presented strategic findings to panel of industry executives'",
        "Use consulting frameworks: 'Evaluated market entry using Porter's 5 Forces'",
      ],
      summaryChecklist: [
        "Lead with academic prestige and GPA/awards if very high",
        "Highlight leadership in rigorous extracurriculars (Consulting Club, Student Council)",
        "Show strong quantitative and qualitative balance",
      ],
      actionVerbs: ["Analysed", "Structured", "Evaluated", "Recommended", "Synthesised", "Researched", "Modelled", "Presented"],
      keySkills: ["Structured Thinking", "Financial Modelling", "Data Synthesis", "Slide Design (PPT)", "Public Speaking", "Market Research"],
      hrQuote: "For entry-level consulting, we index heavily on academic rigor, structural thinking, and polish. Your CV must be perfectly formatted—it's your first deliverable to us. Show me you can dissect a complex problem into MECE parts.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
    developing: {
      cvTitle: "Management Consultant",
      cvSummary: "Consultant with 3 years experience at Big 4 / Tier 2 firm. Specialised in Tech/Media/Telecom (TMT) digital transformations. Led PMO for a $10M ERP implementation, ensuring on-time delivery across 4 global offices.",
      experienceChecklist: [
        "Name the engagement scope: 'Led workstream on $10M cost-reduction initiative'",
        "Show CXO interaction: 'Facilitated weekly steering committee with Client CFO and CIO'",
        "Highlight concrete client impact: 'Recommendations led to $2M in annualized opex savings'",
      ],
      summaryChecklist: [
        "State your firm pedigree + years of experience",
        "Highlight your primary functional or industry alignment (e.g. Supply Chain, FinTech)",
        "Focus on massive transformation or cost-saving engagements",
      ],
      actionVerbs: ["Advised", "Implemented", "Facilitated", "Diagnosed", "Streamlined", "Transformed", "Aligned", "Delivered"],
      keySkills: ["Project Management Office (PMO)", "Change Management", "Digital Transformation", "C-Level Stakeholder Management", "Financial Analysis", "Client Delivery"],
      hrQuote: "A mid-level consultant must show they can own a workstream and manage client relationships. Don't just list industries; tell me the specific business problem you solved and the dollar value it unlocked for the client.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Engagement Manager / Consulting Director",
      cvSummary: "Engagement Manager with 8+ years experience leading $5M+ strategic engagements for Fortune 500 clients. Directed cross-functional teams of 15+ consultants. Generated $3M in add-on sales through trusted client advisory.",
      experienceChecklist: [
        "Highlight engagement P&L: 'Managed portfolio of 3 concurrent projects totaling $5M'",
        "Show sales/origination: 'Originated $3M in add-on work by identifying adjacent client needs'",
        "Include team development: 'Performance manager for 6 junior consultants; promoted 3'",
      ],
      summaryChecklist: [
        "Lead with origination (sales) and massive engagement delivery",
        "Highlight executive advisory (trusted advisor to CxO)",
        "Show practice-building (e.g., establishing a new GenAI consulting offering)",
      ],
      actionVerbs: ["Directed", "Originated", "Navigated", "Governed", "Pioneered", "Partnered", "Negotiated", "Mentored"],
      keySkills: ["Practice Leadership", "Client Origination (Sales)", "Executive Advisory", "Complex Program Management", "Practice Building", "Talent Development"],
      hrQuote: "At the Manager/Director level in consulting, you are evaluated on two things: can you sell work, and can you deliver complex programs safely? Your CV must highlight both origination dollars and delivery scale.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Operations": {
    starter: {
      cvTitle: "Aspiring Operations Analyst",
      cvSummary: "Detail-oriented graduate with strong logistical and analytical skills. Managed inventory and scheduling for a 500-person event. Seeking Operations role to streamline processes in a fast-paced tech company.",
      experienceChecklist: [
        "Quantify operational scale: 'Managed logistics for 500 attendees, coordinating 15 vendors'",
        "Show process improvement: 'Created new Excel tracking system, saving 2 hours weekly'",
        "Highlight reliability: 'Ensured 100% on-time delivery metric over 6 months'",
      ],
      summaryChecklist: [
        "State your execution focus (getting things done reliably)",
        "Highlight tools you use for efficiency (Excel, Monday.com, Jira)",
        "Show an eye for continuous improvement",
      ],
      actionVerbs: ["Coordinated", "Executed", "Organised", "Streamlined", "Resolved", "Managed", "Dispatched", "Tracked"],
      keySkills: ["Process Optimisation", "Logistics Coordination", "Advanced Excel", "Vendor Management", "Time Management", "Data Entry & Quality"],
      hrQuote: "Operations is about keeping the lights on and the wheels turning. I look for reliability and an obsession with efficiency. Tell me about a messy, manual process you inherited and how you made it faster or less error-prone.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Operations Manager",
      cvSummary: "Operations Manager with 4 years experience scaling logistics for a high-growth e-commerce startup. Reduced delivery SLA times by 20% while cutting operational overhead by 15%. Expert in cross-functional process engineering.",
      experienceChecklist: [
        "Lead with SLA/Metric improvements: 'Reduced rider wait time by 15% across 3 cities'",
        "Show cross-functional alignment: 'Partnered with Product to launch automated dispatch system'",
        "Include P&L or budget impact: 'Managed $50K monthly operational budget, achieving 10% under-spend'",
      ],
      summaryChecklist: [
        "Lead with the scale of operations you manage (cities, budget, headcount)",
        "Highlight specific efficiency methodologies (Lean, Six Sigma)",
        "Show your ability to partner with Product/Tech to automate manual work",
      ],
      actionVerbs: ["Scaled", "Optimised", "Overhauled", "Halved", "Standardised", "Automated", "Forecasted", "Negotiated"],
      keySkills: ["SLA Management", "Process Engineering", "P&L Management", "Supply Chain / Logistics", "Cross-functional Alignment", "Data Analysis (SQL)"],
      hrQuote: "Mid-level Ops lives at the intersection of the real world and the tech product. Tell me how you identified an operational bottleneck in the real world and worked with the tech team to build a software feature to solve it.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Operations / COO",
      cvSummary: "Head of Operations with 10 years experience building scalable fulfillment networks for tech platforms. Expanded operations to 5 countries. Led regional team of 50+. Reduced unit economics cost by 30% prior to Series C.",
      experienceChecklist: [
        "Include massive geographic/market expansion: 'Launched operations in 3 new countries in 12 months'",
        "Show unit economics mastery: 'Improved gross margins by X% through operational restructuring'",
        "Highlight massive people leadership: 'Managed org of 50+ central ops and 500+ gig workers'",
      ],
      summaryChecklist: [
        "Lead with Unit Economics and margin improvements",
        "Highlight geographic expansion or massive scaling phases (0 to 1, 1 to 100)",
        "Show your role as a key executive driving company profitability",
      ],
      actionVerbs: ["Pioneered", "Expanded", "Restructured", "Governed", "Scaled", "Championed", "Architected", "Directed"],
      keySkills: ["Unit Economics Optimisation", "Market Expansion", "Org Design & Leadership", "Regulatory / Compliance", "Supply Chain Strategy", "Executive P&L Ownership"],
      hrQuote: "Senior Operations leaders are responsible for the company's margins. Your CV must show how you improved unit economics at scale. Did you turn a heavily subsidized operation into a profitable one while expanding to new cities?",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "FinTech Associate": {
    starter: {
      cvTitle: "Aspiring FinTech Professional",
      cvSummary: "Finance graduate with a strong passion for tech-driven financial inclusion. Experience in financial modelling and data analysis. Seeking a role to bridge traditional finance with digital product innovation.",
      experienceChecklist: [
        "Show financial literacy + tech interest: 'Analysed alternative lending models for university thesis'",
        "Highlight analytical tools: 'Built predictive model in Python predicting X'",
        "Include relevant coursework: 'Completed coursework in Blockchain, Corporate Finance'",
      ],
      summaryChecklist: [
        "Highlight dual capability (Finance knowledge + Tech fluency)",
        "Mention specific FinTech domains of interest (Payments, Lending, Web3)",
        "Show extreme attention to detail and compliance awareness",
      ],
      actionVerbs: ["Analysed", "Forecasted", "Modelled", "Researched", "Evaluated", "Reconciled", "Optimised", "Audited"],
      keySkills: ["Financial Modelling", "SQL / Python Basics", "Risk & Compliance Basics", "Market Research", "Excel (Advanced)", "Banking Regulations Overview"],
      hrQuote: "For entry-level FinTech, we look for people who intuitively understand both the rigid world of banking and the fast-moving world of tech. Show me you understand risk and compliance, but want to disrupt the delivery.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    developing: {
      cvTitle: "FinTech Product/Operations Manager",
      cvSummary: "FinTech professional with 4 years experience in digital payments. Led the integration of 3 new payment gateways, increasing checkout conversion by 12%. Expert in transaction reconciliation and fraud prevention processes.",
      experienceChecklist: [
        "Focus on transaction metrics: 'Managed payment flows processing $X million daily'",
        "Show regulatory/compliance impact: 'Implemented KYC flow reducing drop-off by X% while meeting AML standards'",
        "Highlight partner integration: 'Integrated Stripe/Adyen APIs leading to 99.9% payment success rate'",
      ],
      summaryChecklist: [
        "Lead with your specific FinTech vertical (Payments, Neobanking, Crypto, Lending)",
        "Highlight experience balancing growth with risk/fraud prevention",
        "Show cross-functional alignment with Bank partners, Tech, and Legal",
      ],
      actionVerbs: ["Integrated", "Reconciled", "Mitigated", "Launched", "Onboarded", "Streamlined", "Ensured", "Optimised"],
      keySkills: ["Payment Gateway Integration", "KYC / AML Compliance", "Fraud/Risk Mitigation", "Reconciliation Processes", "API Product Knowledge", "Partner Bank Relations"],
      hrQuote: "Mid-level FinTech CVs must show an understanding of the unsexy parts of finance. Don't just talk about the UI; tell me how you handled edge cases, refunds, chargebacks, and reconciliation discrepancies.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of FinTech / VP Digital Finance",
      cvSummary: "FinTech executive with 10 years experience bridging traditional banking and digital platforms. Secured e-money licenses across 3 SEA markets. Scaled lending portfolio to $50M with NPLs under 2%.",
      experienceChecklist: [
        "Highlight massive regulatory wins: 'Secured Tier 1 banking / e-money license from Central Bank'",
        "Show P&L and Risk mastery: 'Grew lending book to $50M while reducing Non-Performing Loans (NPL) by X%'",
        "Include strategic partnerships: 'Negotiated core banking partnerships enabling instant payouts'",
      ],
      summaryChecklist: [
        "Lead with major regulatory and licensing achievements",
        "Highlight your management of capital, risk, and P&L at scale",
        "Show executive influence driving FinTech strategy at the board level",
      ],
      actionVerbs: ["Secured", "Governed", "Scaled", "Negotiated", "Architected", "Directed", "Pioneered", "Partnered"],
      keySkills: ["Licensing & Regulatory Strategy", "Credit Risk Management", "P&L Ownership", "Central Bank Relations", "Capital Markets", "Executive Leadership"],
      hrQuote: "Senior FinTech leaders deal with existential company risks. I want to see how you navigated Central Bank regulations, secured critical licenses, or managed a multi-million dollar lending book through a macroeconomic downturn.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "EdTech Lead": {
    starter: {
      cvTitle: "Aspiring EdTech Specialist",
      cvSummary: "Education/Tech graduate passionate about modernizing learning. Designed interactive curriculum modules reaching 200+ students. Seeking a role to improve learner outcomes through technology.",
      experienceChecklist: [
        "Show content/learning impact: 'Designed 5 interactive modules improving student quiz scores by X%'",
        "Highlight tech literacy: 'Set up and managed LMS (Canvas/Moodle) for university department'",
        "Include user empathy: 'Conducted feedback sessions with 30 students to refine course structure'",
      ],
      summaryChecklist: [
        "Highlight your passion for pedagogy combined with technology",
        "Mention specific instructional design or LMS tools",
        "Show understanding of learner motivation and engagement metrics",
      ],
      actionVerbs: ["Designed", "Facilitated", "Curated", "Instructed", "Analysed", "Assessed", "Developed", "Evaluated"],
      keySkills: ["Instructional Design", "LMS Administration", "Curriculum Development", "Learner Experience (LX)", "Video Editing Basics", "Data Analysis (Basic)"],
      hrQuote: "EdTech needs people who understand how humans actually learn. If you've tutored, built an online course, or managed a student community, highlight how you measured whether they actually learned the material.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "EdTech Product/Operations Lead",
      cvSummary: "EdTech professional with 4 years experience creating digital learning environments. Managed a platform with 50K+ active learners, improving course completion rates from 15% to 42% through gamification features.",
      experienceChecklist: [
        "Focus on engagement metrics: 'Increased MAU by X% and course completion rates by Y%'",
        "Show content scale: 'Managed pipeline producing 20 hours of interactive video content monthly'",
        "Include monetization: 'Optimised subscription funnel, increasing B2C revenue by X%'",
      ],
      summaryChecklist: [
        "Lead with user scale (learners, teachers, institutions)",
        "Highlight your focus on retention and completion metrics",
        "Show your ability to balance pedagogy with business / product goals",
      ],
      actionVerbs: ["Launched", "Gamified", "Scaled", "Optimised", "Retained", "Integrated", "Managed", "Monetised"],
      keySkills: ["Learner Retention Strategy", "Gamification", "Content Pipeline Management", "B2B2C Dynamics", "EdTech Product Strategy", "Community Management"],
      hrQuote: "In EdTech, user acquisition is easy; retention is incredibly hard. I want to see how you moved the needle on 'Course Completion Rate' or 'Daily Active Learners'. Did you introduce gamification, social features, or better pedagogy?",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of EdTech / VP of Learning",
      cvSummary: "Head of EdTech with 9 years experience scaling B2B/B2G learning platforms to 2M+ users across 3 countries. Secured $5M in government tenders. Led cross-functional teams of educators, PMs, and engineers.",
      experienceChecklist: [
        "Highlight massive B2B/B2G wins: 'Secured state-wide implementation contract serving 500 schools'",
        "Show P&L and scale: 'Grew platform ARR from $2M to $10M in 3 years'",
        "Include pedagogical leadership: 'Defined the pedagogy framework that became industry standard'",
      ],
      summaryChecklist: [
        "Lead with mass-scale implementations (Government, District-wide, Enterprise)",
        "Highlight your ability to sell to complex institutional buyers",
        "Show thought leadership in the future of education (GenAI integration, personalized learning)",
      ],
      actionVerbs: ["Secured", "Pioneered", "Scaled", "Governed", "Partnered", "Transformed", "Championed", "Defined"],
      keySkills: ["B2G/B2B Institutional Sales", "EdTech Vision & Strategy", "Government Relations", "P&L Ownership", "GenAI in Education", "Executive Leadership"],
      hrQuote: "At the senior EdTech level, you have to navigate incredibly slow, complex sales cycles with governments or huge universities. Show me your B2B/B2G track record. How did you align pedagogical purity with aggressive revenue targets?",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Partnerships": {
    starter: {
      cvTitle: "Aspiring Partnerships Associate",
      cvSummary: "Communications graduate with strong networking and relationship-building skills. Organized university hackathon involving 10 tech sponsors. Seeking a role to build strategic B2B partnerships and alliances.",
      experienceChecklist: [
        "Quantify relationship building: 'Secured 10 sponsors raising $X for annual event'",
        "Show stakeholder management: 'Acted as main point of contact for 15+ external stakeholders'",
        "Highlight execution: 'Ensured all sponsor deliverables (logo placement, booths) were met 100%'",
      ],
      summaryChecklist: [
        "State your strong communication and relationship management skills",
        "Highlight any experience sourcing or managing external vendors/sponsors",
        "Show extreme organisation and follow-through",
      ],
      actionVerbs: ["Secured", "Liaised", "Coordinated", "Sourced", "Negotiated", "Managed", "Onboarded", "Facilitated"],
      keySkills: ["Relationship Building", "Sponsorship/Vendor Sourcing", "Event Go-To-Market", "B2B Communication", "Contract Basics", "CRM Tools"],
      hrQuote: "Partnerships at the junior level is all about organization and follow-through. Can you keep track of 20 different conversations without dropping the ball? Show me how you managed multiple external stakeholders in your past projects.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Strategic Partnerships Manager",
      cvSummary: "Partnerships Manager with 4 years experience building API and affiliate ecosystems. Onboarded 50+ strategic integration partners, driving a 20% increase in indirect platform revenue. Expert in co-marketing and integration strategy.",
      experienceChecklist: [
        "Include indirect revenue metrics: 'Drove $XM in referral revenue through affiliate partnerships'",
        "Show technical/platform scale: 'Onboarded 15 API integration partners, improving platform stickiness'",
        "Highlight joint GTM: 'Launched co-marketing campaign with [Major Brand], acquiring X new users'",
      ],
      summaryChecklist: [
        "Lead with the type of partnerships (API/Tech integrations, Affiliate/Reseller, Co-marketing)",
        "State the tangible business value generated (Indirect revenue, user acquisition)",
        "Show cross-functional alignment (working with Legal, Product, and external CxOs)",
      ],
      actionVerbs: ["Onboarded", "Integrated", "Collaborated", "Generated", "Negotiated", "Expanded", "Piloted", "Aligned"],
      keySkills: ["API/Tech Partnerships", "Reseller/Affiliate Programs", "Co-Marketing Strategy", "Contract Negotiation", "Cross-functional Alignment", "Indirect Revenue Generation"],
      hrQuote: "Mid-level partnership roles must prove tangible business value. A handshake is nice, but did that partner drive API calls, referrals, or revenue? Quantify the value of the ecosystem you built.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Partnerships / VP Strategic Alliances",
      cvSummary: "VP of Strategic Alliances with 10 years experience building multi-million dollar tech ecosystems. Negotiated exclusive cloud infrastructure partnerships with AWS/Google. Grew channel revenue from 0 to 40% of total company ARR.",
      experienceChecklist: [
        "Highlight massive channel shift: 'Grew indirect channel revenue to represent 40% of overall ARR'",
        "Show C-level negotiations: 'Negotiated multi-year strategic alliance with Apple/Google/AWS'",
        "Include M&A adjacent activities: 'Secured strategic investment/partnership from Tier-1 corporate venture arm'",
      ],
      summaryChecklist: [
        "Lead with massive indirect/channel revenue owned",
        "Highlight executive-level negotiation of company-defining alliances",
        "Show deep industry ecosystem knowledge and Rolodex",
      ],
      actionVerbs: ["Architected", "Secured", "Championed", "Negotiated", "Scaled", "Governed", "Orchestrated", "Pioneered"],
      keySkills: ["Strategic M&A/Investments", "Global Ecosystem Strategy", "Enterprise C-Level Negotiation", "Channel Sales Strategy", "Executive Alignment", "Contract Law Interpretation"],
      hrQuote: "At the Head of Partnerships level, your alliances define the company's valuation and moat. Show me the multi-year, multi-million dollar deals you locked in that secured your company's position in the market.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  // ── TECH-ENABLED BUSINESS TRACK ────────────────────────────────────────────

  "Business Development": {
    starter: {
      cvTitle: "Aspiring Business Developer",
      cvSummary: "Business graduate with strong interpersonal and analytical skills. Led university partnership initiatives securing 5 new corporate sponsors. Passionate about driving growth in B2B tech environments.",
      experienceChecklist: [
        "Quantify your hustle: 'Outreached to X prospects weekly, securing Y meetings'",
        "Show revenue/value generated: 'Negotiated sponsorships worth $X for student org'",
        "Highlight CRM or tech tools used (Salesforce, HubSpot, Apollo)",
      ],
      summaryChecklist: [
        "State your target market or industry (e.g. B2B SaaS, FinTech)",
        "Highlight your communication and negotiation capabilities",
        "Show a relentless focus on targets and growth",
      ],
      actionVerbs: ["Outreached", "Negotiated", "Secured", "Generated", "Pitched", "Qualified", "Converted", "Prospected"],
      keySkills: ["B2B Sales", "Lead Generation", "Cold Outreach", "CRM (Salesforce/HubSpot)", "Client Presentations", "Market Research"],
      hrQuote: "BD is about hustle and numbers. If you're a fresher, I want to see how you deal with rejection and how you hit targets. Tell me about the 100 cold emails you sent to land that one sponsorship for your university club.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Business Development Manager",
      cvSummary: "Business Development Manager with 3+ years experience driving B2B tech sales in SEA. Consistently exceeded annual quota by 115%, generating $2M+ in new pipeline. Expert in consultative selling and enterprise negotiations.",
      experienceChecklist: [
        "Lead with quota and revenue: 'Achieved 120% of quota in 2024, closing $XM in ARR'",
        "Detail the deal size and cycle: 'Managed 3-month sales cycles for enterprise deals averaging $50K'",
        "Show pipeline generation: 'Sourced 40% of closed-won deals through outbound efforts'",
      ],
      summaryChecklist: [
        "Lead with your track record (X years of quota attainment)",
        "State your Average Contract Value (ACV) and target demographic (Enterprise vs SMB)",
        "Highlight your specific sales methodology (MEDDIC, Challenger Sale)",
      ],
      actionVerbs: ["Closed", "Generated", "Exceeded", "Negotiated", "Pipeline", "Accelerated", "Onboarded", "Expanded"],
      keySkills: ["Enterprise Sales", "Quota Attainment", "Pipeline Management", "Contract Negotiation", "MEDDIC / SPIN", "Strategic Account Planning"],
      hrQuote: "Sales and BD CVs are the easiest to read: what was your quota, and what percentage did you hit? Don't hide the numbers. If you closed a $500K enterprise deal, tell me how long the cycle was and who you negotiated with.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Business Development",
      cvSummary: "Head of BD with 9 years experience scaling enterprise software revenues from $1M to $15M ARR. Built and led a team of 10 AEs and SDRs. Defined the GTM strategy that secured 3 Fortune 500 marquee clients.",
      experienceChecklist: [
        "Highlight team scale and aggregate revenue: 'Led team of 10 to generate $15M ARR'",
        "Show strategic GTM leadership: 'Defined outbound framework reducing customer acquisition cost by X%'",
        "Include massive partnership/enterprise wins: 'Personally closed marquee $2M deal with [Major Brand]'",
      ],
      summaryChecklist: [
        "Lead with aggregate revenue managed and team scale",
        "Highlight your Go-To-Market strategy expertise",
        "Show executive relationship building (selling to CxOs)",
      ],
      actionVerbs: ["Scaled", "Pioneered", "Championed", "Orchestrated", "Secured", "Grew", "Directed", "Established"],
      keySkills: ["GTM Strategy", "Sales Leadership & Coaching", "Revenue Forecasting", "Enterprise C-Level Sales", "Territory Mapping", "Partnership Ecosystems"],
      hrQuote: "At the Head of BD level, you aren't just selling; you're building a revenue machine. Show me how you hired, trained, and scaled your team. Tell me how you halved the ramp time for new Account Executives.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Consulting": {
    starter: {
      cvTitle: "Aspiring Consultant",
      cvSummary: "Business graduate with top-tier academic record and strong analytical structuring. Winner of 2 national case competitions. Seeking entry-level Management Consulting role.",
      experienceChecklist: [
        "Show structured problem solving: 'Analysed dataset of X to recommend Y policy'",
        "Highlight presentation skills: 'Presented strategic findings to panel of industry executives'",
        "Use consulting frameworks: 'Evaluated market entry using Porter's 5 Forces'",
      ],
      summaryChecklist: [
        "Lead with academic prestige and GPA/awards if very high",
        "Highlight leadership in rigorous extracurriculars (Consulting Club, Student Council)",
        "Show strong quantitative and qualitative balance",
      ],
      actionVerbs: ["Analysed", "Structured", "Evaluated", "Recommended", "Synthesised", "Researched", "Modelled", "Presented"],
      keySkills: ["Structured Thinking", "Financial Modelling", "Data Synthesis", "Slide Design (PPT)", "Public Speaking", "Market Research"],
      hrQuote: "For entry-level consulting, we index heavily on academic rigor, structural thinking, and polish. Your CV must be perfectly formatted—it's your first deliverable to us. Show me you can dissect a complex problem into MECE parts.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
    developing: {
      cvTitle: "Management Consultant",
      cvSummary: "Consultant with 3 years experience at Big 4 / Tier 2 firm. Specialised in Tech/Media/Telecom (TMT) digital transformations. Led PMO for a $10M ERP implementation, ensuring on-time delivery across 4 global offices.",
      experienceChecklist: [
        "Name the engagement scope: 'Led workstream on $10M cost-reduction initiative'",
        "Show CXO interaction: 'Facilitated weekly steering committee with Client CFO and CIO'",
        "Highlight concrete client impact: 'Recommendations led to $2M in annualized opex savings'",
      ],
      summaryChecklist: [
        "State your firm pedigree + years of experience",
        "Highlight your primary functional or industry alignment (e.g. Supply Chain, FinTech)",
        "Focus on massive transformation or cost-saving engagements",
      ],
      actionVerbs: ["Advised", "Implemented", "Facilitated", "Diagnosed", "Streamlined", "Transformed", "Aligned", "Delivered"],
      keySkills: ["Project Management Office (PMO)", "Change Management", "Digital Transformation", "C-Level Stakeholder Management", "Financial Analysis", "Client Delivery"],
      hrQuote: "A mid-level consultant must show they can own a workstream and manage client relationships. Don't just list industries; tell me the specific business problem you solved and the dollar value it unlocked for the client.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Engagement Manager / Consulting Director",
      cvSummary: "Engagement Manager with 8+ years experience leading $5M+ strategic engagements for Fortune 500 clients. Directed cross-functional teams of 15+ consultants. Generated $3M in add-on sales through trusted client advisory.",
      experienceChecklist: [
        "Highlight engagement P&L: 'Managed portfolio of 3 concurrent projects totaling $5M'",
        "Show sales/origination: 'Originated $3M in add-on work by identifying adjacent client needs'",
        "Include team development: 'Performance manager for 6 junior consultants; promoted 3'",
      ],
      summaryChecklist: [
        "Lead with origination (sales) and massive engagement delivery",
        "Highlight executive advisory (trusted advisor to CxO)",
        "Show practice-building (e.g., establishing a new GenAI consulting offering)",
      ],
      actionVerbs: ["Directed", "Originated", "Navigated", "Governed", "Pioneered", "Partnered", "Negotiated", "Mentored"],
      keySkills: ["Practice Leadership", "Client Origination (Sales)", "Executive Advisory", "Complex Program Management", "Practice Building", "Talent Development"],
      hrQuote: "At the Manager/Director level in consulting, you are evaluated on two things: can you sell work, and can you deliver complex programs safely? Your CV must highlight both origination dollars and delivery scale.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Operations": {
    starter: {
      cvTitle: "Aspiring Operations Analyst",
      cvSummary: "Detail-oriented graduate with strong logistical and analytical skills. Managed inventory and scheduling for a 500-person event. Seeking Operations role to streamline processes in a fast-paced tech company.",
      experienceChecklist: [
        "Quantify operational scale: 'Managed logistics for 500 attendees, coordinating 15 vendors'",
        "Show process improvement: 'Created new Excel tracking system, saving 2 hours weekly'",
        "Highlight reliability: 'Ensured 100% on-time delivery metric over 6 months'",
      ],
      summaryChecklist: [
        "State your execution focus (getting things done reliably)",
        "Highlight tools you use for efficiency (Excel, Monday.com, Jira)",
        "Show an eye for continuous improvement",
      ],
      actionVerbs: ["Coordinated", "Executed", "Organised", "Streamlined", "Resolved", "Managed", "Dispatched", "Tracked"],
      keySkills: ["Process Optimisation", "Logistics Coordination", "Advanced Excel", "Vendor Management", "Time Management", "Data Entry & Quality"],
      hrQuote: "Operations is about keeping the lights on and the wheels turning. I look for reliability and an obsession with efficiency. Tell me about a messy, manual process you inherited and how you made it faster or less error-prone.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Operations Manager",
      cvSummary: "Operations Manager with 4 years experience scaling logistics for a high-growth e-commerce startup. Reduced delivery SLA times by 20% while cutting operational overhead by 15%. Expert in cross-functional process engineering.",
      experienceChecklist: [
        "Lead with SLA/Metric improvements: 'Reduced rider wait time by 15% across 3 cities'",
        "Show cross-functional alignment: 'Partnered with Product to launch automated dispatch system'",
        "Include P&L or budget impact: 'Managed $50K monthly operational budget, achieving 10% under-spend'",
      ],
      summaryChecklist: [
        "Lead with the scale of operations you manage (cities, budget, headcount)",
        "Highlight specific efficiency methodologies (Lean, Six Sigma)",
        "Show your ability to partner with Product/Tech to automate manual work",
      ],
      actionVerbs: ["Scaled", "Optimised", "Overhauled", "Halved", "Standardised", "Automated", "Forecasted", "Negotiated"],
      keySkills: ["SLA Management", "Process Engineering", "P&L Management", "Supply Chain / Logistics", "Cross-functional Alignment", "Data Analysis (SQL)"],
      hrQuote: "Mid-level Ops lives at the intersection of the real world and the tech product. Tell me how you identified an operational bottleneck in the real world and worked with the tech team to build a software feature to solve it.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Operations / COO",
      cvSummary: "Head of Operations with 10 years experience building scalable fulfillment networks for tech platforms. Expanded operations to 5 countries. Led regional team of 50+. Reduced unit economics cost by 30% prior to Series C.",
      experienceChecklist: [
        "Include massive geographic/market expansion: 'Launched operations in 3 new countries in 12 months'",
        "Show unit economics mastery: 'Improved gross margins by X% through operational restructuring'",
        "Highlight massive people leadership: 'Managed org of 50+ central ops and 500+ gig workers'",
      ],
      summaryChecklist: [
        "Lead with Unit Economics and margin improvements",
        "Highlight geographic expansion or massive scaling phases (0 to 1, 1 to 100)",
        "Show your role as a key executive driving company profitability",
      ],
      actionVerbs: ["Pioneered", "Expanded", "Restructured", "Governed", "Scaled", "Championed", "Architected", "Directed"],
      keySkills: ["Unit Economics Optimisation", "Market Expansion", "Org Design & Leadership", "Regulatory / Compliance", "Supply Chain Strategy", "Executive P&L Ownership"],
      hrQuote: "Senior Operations leaders are responsible for the company's margins. Your CV must show how you improved unit economics at scale. Did you turn a heavily subsidized operation into a profitable one while expanding to new cities?",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "FinTech Associate": {
    starter: {
      cvTitle: "Aspiring FinTech Professional",
      cvSummary: "Finance graduate with a strong passion for tech-driven financial inclusion. Experience in financial modelling and data analysis. Seeking a role to bridge traditional finance with digital product innovation.",
      experienceChecklist: [
        "Show financial literacy + tech interest: 'Analysed alternative lending models for university thesis'",
        "Highlight analytical tools: 'Built predictive model in Python predicting X'",
        "Include relevant coursework: 'Completed coursework in Blockchain, Corporate Finance'",
      ],
      summaryChecklist: [
        "Highlight dual capability (Finance knowledge + Tech fluency)",
        "Mention specific FinTech domains of interest (Payments, Lending, Web3)",
        "Show extreme attention to detail and compliance awareness",
      ],
      actionVerbs: ["Analysed", "Forecasted", "Modelled", "Researched", "Evaluated", "Reconciled", "Optimised", "Audited"],
      keySkills: ["Financial Modelling", "SQL / Python Basics", "Risk & Compliance Basics", "Market Research", "Excel (Advanced)", "Banking Regulations Overview"],
      hrQuote: "For entry-level FinTech, we look for people who intuitively understand both the rigid world of banking and the fast-moving world of tech. Show me you understand risk and compliance, but want to disrupt the delivery.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    developing: {
      cvTitle: "FinTech Product/Operations Manager",
      cvSummary: "FinTech professional with 4 years experience in digital payments. Led the integration of 3 new payment gateways, increasing checkout conversion by 12%. Expert in transaction reconciliation and fraud prevention processes.",
      experienceChecklist: [
        "Focus on transaction metrics: 'Managed payment flows processing $X million daily'",
        "Show regulatory/compliance impact: 'Implemented KYC flow reducing drop-off by X% while meeting AML standards'",
        "Highlight partner integration: 'Integrated Stripe/Adyen APIs leading to 99.9% payment success rate'",
      ],
      summaryChecklist: [
        "Lead with your specific FinTech vertical (Payments, Neobanking, Crypto, Lending)",
        "Highlight experience balancing growth with risk/fraud prevention",
        "Show cross-functional alignment with Bank partners, Tech, and Legal",
      ],
      actionVerbs: ["Integrated", "Reconciled", "Mitigated", "Launched", "Onboarded", "Streamlined", "Ensured", "Optimised"],
      keySkills: ["Payment Gateway Integration", "KYC / AML Compliance", "Fraud/Risk Mitigation", "Reconciliation Processes", "API Product Knowledge", "Partner Bank Relations"],
      hrQuote: "Mid-level FinTech CVs must show an understanding of the unsexy parts of finance. Don't just talk about the UI; tell me how you handled edge cases, refunds, chargebacks, and reconciliation discrepancies.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of FinTech / VP Digital Finance",
      cvSummary: "FinTech executive with 10 years experience bridging traditional banking and digital platforms. Secured e-money licenses across 3 SEA markets. Scaled lending portfolio to $50M with NPLs under 2%.",
      experienceChecklist: [
        "Highlight massive regulatory wins: 'Secured Tier 1 banking / e-money license from Central Bank'",
        "Show P&L and Risk mastery: 'Grew lending book to $50M while reducing Non-Performing Loans (NPL) by X%'",
        "Include strategic partnerships: 'Negotiated core banking partnerships enabling instant payouts'",
      ],
      summaryChecklist: [
        "Lead with major regulatory and licensing achievements",
        "Highlight your management of capital, risk, and P&L at scale",
        "Show executive influence driving FinTech strategy at the board level",
      ],
      actionVerbs: ["Secured", "Governed", "Scaled", "Negotiated", "Architected", "Directed", "Pioneered", "Partnered"],
      keySkills: ["Licensing & Regulatory Strategy", "Credit Risk Management", "P&L Ownership", "Central Bank Relations", "Capital Markets", "Executive Leadership"],
      hrQuote: "Senior FinTech leaders deal with existential company risks. I want to see how you navigated Central Bank regulations, secured critical licenses, or managed a multi-million dollar lending book through a macroeconomic downturn.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "EdTech Lead": {
    starter: {
      cvTitle: "Aspiring EdTech Specialist",
      cvSummary: "Education/Tech graduate passionate about modernizing learning. Designed interactive curriculum modules reaching 200+ students. Seeking a role to improve learner outcomes through technology.",
      experienceChecklist: [
        "Show content/learning impact: 'Designed 5 interactive modules improving student quiz scores by X%'",
        "Highlight tech literacy: 'Set up and managed LMS (Canvas/Moodle) for university department'",
        "Include user empathy: 'Conducted feedback sessions with 30 students to refine course structure'",
      ],
      summaryChecklist: [
        "Highlight your passion for pedagogy combined with technology",
        "Mention specific instructional design or LMS tools",
        "Show understanding of learner motivation and engagement metrics",
      ],
      actionVerbs: ["Designed", "Facilitated", "Curated", "Instructed", "Analysed", "Assessed", "Developed", "Evaluated"],
      keySkills: ["Instructional Design", "LMS Administration", "Curriculum Development", "Learner Experience (LX)", "Video Editing Basics", "Data Analysis (Basic)"],
      hrQuote: "EdTech needs people who understand how humans actually learn. If you've tutored, built an online course, or managed a student community, highlight how you measured whether they actually learned the material.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "EdTech Product/Operations Lead",
      cvSummary: "EdTech professional with 4 years experience creating digital learning environments. Managed a platform with 50K+ active learners, improving course completion rates from 15% to 42% through gamification features.",
      experienceChecklist: [
        "Focus on engagement metrics: 'Increased MAU by X% and course completion rates by Y%'",
        "Show content scale: 'Managed pipeline producing 20 hours of interactive video content monthly'",
        "Include monetization: 'Optimised subscription funnel, increasing B2C revenue by X%'",
      ],
      summaryChecklist: [
        "Lead with user scale (learners, teachers, institutions)",
        "Highlight your focus on retention and completion metrics",
        "Show your ability to balance pedagogy with business / product goals",
      ],
      actionVerbs: ["Launched", "Gamified", "Scaled", "Optimised", "Retained", "Integrated", "Managed", "Monetised"],
      keySkills: ["Learner Retention Strategy", "Gamification", "Content Pipeline Management", "B2B2C Dynamics", "EdTech Product Strategy", "Community Management"],
      hrQuote: "In EdTech, user acquisition is easy; retention is incredibly hard. I want to see how you moved the needle on 'Course Completion Rate' or 'Daily Active Learners'. Did you introduce gamification, social features, or better pedagogy?",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of EdTech / VP of Learning",
      cvSummary: "Head of EdTech with 9 years experience scaling B2B/B2G learning platforms to 2M+ users across 3 countries. Secured $5M in government tenders. Led cross-functional teams of educators, PMs, and engineers.",
      experienceChecklist: [
        "Highlight massive B2B/B2G wins: 'Secured state-wide implementation contract serving 500 schools'",
        "Show P&L and scale: 'Grew platform ARR from $2M to $10M in 3 years'",
        "Include pedagogical leadership: 'Defined the pedagogy framework that became industry standard'",
      ],
      summaryChecklist: [
        "Lead with mass-scale implementations (Government, District-wide, Enterprise)",
        "Highlight your ability to sell to complex institutional buyers",
        "Show thought leadership in the future of education (GenAI integration, personalized learning)",
      ],
      actionVerbs: ["Secured", "Pioneered", "Scaled", "Governed", "Partnered", "Transformed", "Championed", "Defined"],
      keySkills: ["B2G/B2B Institutional Sales", "EdTech Vision & Strategy", "Government Relations", "P&L Ownership", "GenAI in Education", "Executive Leadership"],
      hrQuote: "At the senior EdTech level, you have to navigate incredibly slow, complex sales cycles with governments or huge universities. Show me your B2B/B2G track record. How did you align pedagogical purity with aggressive revenue targets?",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Partnerships": {
    starter: {
      cvTitle: "Aspiring Partnerships Associate",
      cvSummary: "Communications graduate with strong networking and relationship-building skills. Organized university hackathon involving 10 tech sponsors. Seeking a role to build strategic B2B partnerships and alliances.",
      experienceChecklist: [
        "Quantify relationship building: 'Secured 10 sponsors raising $X for annual event'",
        "Show stakeholder management: 'Acted as main point of contact for 15+ external stakeholders'",
        "Highlight execution: 'Ensured all sponsor deliverables (logo placement, booths) were met 100%'",
      ],
      summaryChecklist: [
        "State your strong communication and relationship management skills",
        "Highlight any experience sourcing or managing external vendors/sponsors",
        "Show extreme organisation and follow-through",
      ],
      actionVerbs: ["Secured", "Liaised", "Coordinated", "Sourced", "Negotiated", "Managed", "Onboarded", "Facilitated"],
      keySkills: ["Relationship Building", "Sponsorship/Vendor Sourcing", "Event Go-To-Market", "B2B Communication", "Contract Basics", "CRM Tools"],
      hrQuote: "Partnerships at the junior level is all about organization and follow-through. Can you keep track of 20 different conversations without dropping the ball? Show me how you managed multiple external stakeholders in your past projects.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Strategic Partnerships Manager",
      cvSummary: "Partnerships Manager with 4 years experience building API and affiliate ecosystems. Onboarded 50+ strategic integration partners, driving a 20% increase in indirect platform revenue. Expert in co-marketing and integration strategy.",
      experienceChecklist: [
        "Include indirect revenue metrics: 'Drove $XM in referral revenue through affiliate partnerships'",
        "Show technical/platform scale: 'Onboarded 15 API integration partners, improving platform stickiness'",
        "Highlight joint GTM: 'Launched co-marketing campaign with [Major Brand], acquiring X new users'",
      ],
      summaryChecklist: [
        "Lead with the type of partnerships (API/Tech integrations, Affiliate/Reseller, Co-marketing)",
        "State the tangible business value generated (Indirect revenue, user acquisition)",
        "Show cross-functional alignment (working with Legal, Product, and external CxOs)",
      ],
      actionVerbs: ["Onboarded", "Integrated", "Collaborated", "Generated", "Negotiated", "Expanded", "Piloted", "Aligned"],
      keySkills: ["API/Tech Partnerships", "Reseller/Affiliate Programs", "Co-Marketing Strategy", "Contract Negotiation", "Cross-functional Alignment", "Indirect Revenue Generation"],
      hrQuote: "Mid-level partnership roles must prove tangible business value. A handshake is nice, but did that partner drive API calls, referrals, or revenue? Quantify the value of the ecosystem you built.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Head of Partnerships / VP Strategic Alliances",
      cvSummary: "VP of Strategic Alliances with 10 years experience building multi-million dollar tech ecosystems. Negotiated exclusive cloud infrastructure partnerships with AWS/Google. Grew channel revenue from 0 to 40% of total company ARR.",
      experienceChecklist: [
        "Highlight massive channel shift: 'Grew indirect channel revenue to represent 40% of overall ARR'",
        "Show C-level negotiations: 'Negotiated multi-year strategic alliance with Apple/Google/AWS'",
        "Include M&A adjacent activities: 'Secured strategic investment/partnership from Tier-1 corporate venture arm'",
      ],
      summaryChecklist: [
        "Lead with massive indirect/channel revenue owned",
        "Highlight executive-level negotiation of company-defining alliances",
        "Show deep industry ecosystem knowledge and Rolodex",
      ],
      actionVerbs: ["Architected", "Secured", "Championed", "Negotiated", "Scaled", "Governed", "Orchestrated", "Pioneered"],
      keySkills: ["Strategic M&A/Investments", "Global Ecosystem Strategy", "Enterprise C-Level Negotiation", "Channel Sales Strategy", "Executive Alignment", "Contract Law Interpretation"],
      hrQuote: "At the Head of Partnerships level, your alliances define the company's valuation and moat. Show me the multi-year, multi-million dollar deals you locked in that secured your company's position in the market.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  // ── AI APPLICATIONS TRACK ──────────────────────────────────────────────────

  "ML Engineer": {
    starter: {
      cvTitle: "Aspiring Machine Learning Engineer",
      cvSummary: "Computer Science graduate with a strong foundation in machine learning and statistics. Hands-on experience building predictive models and deploying them via APIs during university projects. Passionate about MLOps and scalable AI.",
      experienceChecklist: [
        "Include end-to-end model building: 'Trained and deployed [Model] to predict [Outcome]'",
        "Highlight engineering skills: 'Built REST API using FastAPI to serve model predictions'",
        "Show data handling: 'Cleaned and preprocessed dataset of X million rows using Pandas/PySpark'",
      ],
      summaryChecklist: [
        "State your dual capability: Data Science (Math) + Software Engineering (Code)",
        "Highlight your ML framework of choice (PyTorch, TensorFlow, Scikit-Learn)",
        "Mention your deployment experience (Docker, cloud basics)",
      ],
      actionVerbs: ["Trained", "Deployed", "Optimised", "Engineered", "Preprocessed", "Built", "Evaluated", "Implemented"],
      keySkills: ["Python (PyTorch/TensorFlow)", "SQL", "Model Deployment (FastAPI/Flask)", "Docker", "Git/Version Control", "Basic MLOps"],
      hrQuote: "Entry-level ML Engineers often focus too much on 'training models' and not enough on 'engineering'. I want to see that you can write production-ready code, put a model in a container, and serve it via an API.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    developing: {
      cvTitle: "Machine Learning Engineer",
      cvSummary: "ML Engineer with 3+ years experience deploying NLP and Computer Vision models into production. Reduced model inference time by 40% through ONNX optimization. Strong advocate for CI/CD in machine learning.",
      experienceChecklist: [
        "Focus on production impact: 'Deployed recommendation engine serving 10K requests/sec'",
        "Show optimization: 'Reduced inference latency by X% and compute costs by Y%'",
        "Highlight MLOps: 'Implemented automated model retraining pipelines using Kubeflow/Airflow'",
      ],
      summaryChecklist: [
        "Lead with your specific ML domain (NLP, CV, RecSys) and scale of deployment",
        "Highlight your focus on MLOps, scalability, and latency reduction",
        "Show your ability to bridge the gap between Data Scientists and Data Engineers",
      ],
      actionVerbs: ["Deployed", "Optimised", "Architected", "Automated", "Scaled", "Instrumented", "Served", "Containerised"],
      keySkills: ["MLOps (MLflow, Kubeflow)", "Model Serving (Triton/TorchServe)", "Cloud (AWS SageMaker / GCP)", "ONNX / TensorRT", "CI/CD for ML", "Distributed Training"],
      hrQuote: "Mid-level MLEs must prove they understand infrastructure. The model is just 10% of the work. Tell me how you sped up inference, managed model drift, or built an automated retraining pipeline.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    ready: {
      cvTitle: "Lead Machine Learning Engineer",
      cvSummary: "Lead MLE with 8+ years building enterprise AI infrastructure. Architected the company's internal GenAI platform serving 500+ engineers. Managed a squad of 8 MLEs and Data Scientists to deliver $5M+ in automated savings.",
      experienceChecklist: [
        "Highlight platform architecture: 'Architected unified feature store replacing 10 fragmented systems'",
        "Show state-of-the-art implementation: 'Led deployment of custom fine-tuned LLMs saving $X in OpenAI API costs'",
        "Include leadership and strategy: 'Defined company-wide MLOps standards and mentored 8 engineers'",
      ],
      summaryChecklist: [
        "Lead with architectural scale (thousands of requests/sec, massive datasets)",
        "Highlight leadership in establishing engineering culture and MLOps maturity",
        "Show GenAI / SOTA model strategy and implementation",
      ],
      actionVerbs: ["Architected", "Pioneered", "Led", "Standardised", "Scaled", "Championed", "Defined", "Governed"],
      keySkills: ["AI Infrastructure Architecture", "GenAI / LLM Fine-tuning", "Feature Store Implementation", "Technical Leadership", "Cost Optimisation", "Cross-functional Strategy"],
      hrQuote: "At the Lead level, you are building the foundation that allows other engineers to move fast. Show me how you architected scalable ML platforms, managed runaway cloud computing costs, or introduced LLMs into legacy products safely.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Data Scientist": {
    starter: {
      cvTitle: "Aspiring Data Scientist",
      cvSummary: "Analytically-minded graduate with strong statistical foundations. Experienced in running A/B tests and building predictive models to uncover business insights. Seeking Data Scientist role to drive data-informed decision making.",
      experienceChecklist: [
        "Show business application of math: 'Built churn prediction model identifying $X at-risk revenue'",
        "Highlight statistical rigor: 'Designed and analysed A/B test for landing page redesign'",
        "Include data storytelling: 'Presented actionable findings to marketing stakeholders'",
      ],
      summaryChecklist: [
        "State your academic background (Stats, Math, Physics, CS)",
        "Highlight your core toolkit (Python, SQL, R, Tableau)",
        "Show an understanding of business application (churn, LTV, fraud)",
      ],
      actionVerbs: ["Modelled", "Analysed", "Predicted", "Visualised", "A/B Tested", "Segmented", "Uncovered", "Presented"],
      keySkills: ["Statistical Modelling", "Python (Pandas, Scikit-Learn)", "SQL", "A/B Testing", "Data Storytelling", "Machine Learning Basics"],
      hrQuote: "Data Science isn't just about throwing random forest algorithms at a dataset. Junior DS candidates need to show they can translate a business problem into a math problem, solve it, and then explain the solution back to the business.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    developing: {
      cvTitle: "Data Scientist",
      cvSummary: "Data Scientist with 4 years experience generating actionable insights for consumer tech apps. Built LTV prediction models that optimised a $1M/month marketing budget, reducing CAC by 15%. Expert in experimental design.",
      experienceChecklist: [
        "Focus on ROI/Metric impact: 'Model improved fraud detection rate by X%, saving $Y annually'",
        "Show deep experimental design: 'Designed multi-armed bandit experiments for real-time pricing'",
        "Highlight cross-functional influence: 'Partnered with Product to redefine the 'Active User' metric'",
      ],
      summaryChecklist: [
        "Lead with domain expertise (Fraud, Growth, Pricing, NLP)",
        "Highlight your statistical rigor (Causal inference, complex A/B testing)",
        "Show your capacity to independently partner with product/business leaders",
      ],
      actionVerbs: ["Engineered", "Optimised", "Designed", "Uncovered", "Forecasted", "Clustered", "Influenced", "Quantified"],
      keySkills: ["Causal Inference", "Advanced Experimentation", "Predictive Modelling", "Product Analytics", "Advanced SQL", "Business Stakeholder Management"],
      hrQuote: "Mid-level Data Scientists must influence the business. Don't tell me your model's F1 score; tell me how your model changed the product roadmap, saved money, or generated new revenue. The currency of a Data Scientist is trust.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Lead Data Scientist",
      cvSummary: "Lead Data Scientist with 9 years experience defining data strategy for high-growth startups. Built the core algorithms driving a $50M marketplace. Mentored a team of 6 Data Scientists and established company-wide experimentation culture.",
      experienceChecklist: [
        "Highlight core intellectual property creation: 'Developed proprietary pricing algorithm increasing margins by X%'",
        "Show cultural/org impact: 'Established company-wide experimentation framework used by 10 teams'",
        "Include team leadership: 'Hired, managed, and grew a data science chapter of 6'",
      ],
      summaryChecklist: [
        "Lead with the strategic value of the algorithms you've authored",
        "Highlight leadership in establishing data culture and rigor across the company",
        "Show executive advisory (translating complex data strategy to the Board/CEO)",
      ],
      actionVerbs: ["Pioneered", "Defined", "Governed", "Scaled", "Architected", "Mentored", "Established", "Transformed"],
      keySkills: ["Data Strategy", "Algorithm Design", "Experimentation Culture", "Executive Advisory", "Team Leadership", "Cross-Org Influence"],
      hrQuote: "At the Lead level, your algorithms are the product. Your CV should demonstrate how you built the core logic of the business—whether that's the matching algorithm for a marketplace or the risk model for a bank.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "Research Scientist": {
    starter: {
      cvTitle: "Aspiring AI Research Scientist",
      cvSummary: "PhD graduate in Machine Learning/Computer Science with 3 peer-reviewed publications in top-tier conferences (NeurIPS, CVPR). Passionate about advancing the state-of-the-art in deep learning and contributing to open-source AI.",
      experienceChecklist: [
        "Highlight publications and research impact: 'First author on paper presenting novel [Architecture] improving baseline by X%'",
        "Show coding ability alongside theory: 'Implemented and open-sourced research code in PyTorch with 500+ GitHub stars'",
        "Include academic/industry collaborations: 'Collaborated with [Tech Company] AI lab during PhD internship'",
      ],
      summaryChecklist: [
        "Lead with your academic pedigree (PhD/MSc) and primary research domain (NLP, Vision, RL)",
        "Highlight publication record (quality and quantity)",
        "Show your drive to translate novel research into practical applications",
      ],
      actionVerbs: ["Published", "Researched", "Invented", "Formulated", "Theorised", "Benchmarked", "Open-sourced", "Innovated"],
      keySkills: ["Deep Learning Theory", "PyTorch / JAX", "Literature Review", "Algorithm Innovation", "Academic Writing", "Mathematical Modelling"],
      hrQuote: "For entry-level Research Scientists (usually out of a PhD), publications are your currency. Specifically, highlight what novel architecture or method you invented, and prove that you can actually code the implementation yourself.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    developing: {
      cvTitle: "AI Research Scientist",
      cvSummary: "Research Scientist with 4 years industry experience translating SOTA AI research into production-ready features. Key contributor to foundational vision models used in 3 flagship products. 5+ granted patents.",
      experienceChecklist: [
        "Focus on applied research: 'Adapted novel transformer architecture to run efficiently on mobile devices'",
        "Show product integration: 'Research outcomes directly powered the new [Feature X], used by millions'",
        "Highlight IP generation: 'Authored 3 patents on efficient neural network training methods'",
      ],
      summaryChecklist: [
        "Lead with your specific sub-field expertise and track record of applied research",
        "Highlight the bridge between theoretical innovation and product deployment",
        "Mention intellectual property generation (patents, proprietary models)",
      ],
      actionVerbs: ["Adapted", "Invented", "Patented", "Translated", "Optimised", "Pioneered", "Developed", "Spearheaded"],
      keySkills: ["Applied Research", "Model Compression / Quantization", "Generative AI", "Patent Writing", "Cross-functional Teaming", "SOTA Implementation"],
      hrQuote: "Mid-level researchers in tech need to show they aren't just in an ivory tower. How did your research make the company money or save compute? Show me that you can invent something new and hand it off to engineering successfully.",
      hrName: "Linh Tran",
      hrRole: "Engineering Manager",
      hrCompany: "vng",
    },
    ready: {
      cvTitle: "Principal Research Scientist",
      cvSummary: "Principal AI Scientist with 10+ years experience directing advanced research labs. Defined the GenAI roadmap leading to a $100M valuation increase. Mentored a team of 15 researchers and engineers toward 20+ top-tier publications.",
      experienceChecklist: [
        "Highlight massive strategic bets: 'Directed $XM research budget focusing on efficient LLM inference'",
        "Show industry thought leadership: 'Regular keynote speaker and area chair for NeurIPS/ICML'",
        "Include lab/team building: 'Grew applied AI research lab from inception to 15 world-class scientists'",
      ],
      summaryChecklist: [
        "Lead with your thought leadership status and massive-scale research direction",
        "Highlight your ability to define the 3-5 year technology horizon for the company",
        "Show leadership over high-performing PhD-level research teams",
      ],
      actionVerbs: ["Directed", "Pioneered", "Architected", "Envisioned", "Championed", "Defined", "Established", "Mentored"],
      keySkills: ["Research Strategy", "Lab Leadership", "Industry Thought Leadership", "Technology Horizon Scanning", "Executive Influence", "Foundational Model Design"],
      hrQuote: "Principal Scientists shape the future of the company. Your CV should read like a history of major breakthroughs. You need to show that you can manage brilliant researchers and align their work with the CEO's ultimate vision.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "AI Product Manager": {
    starter: {
      cvTitle: "Aspiring AI Product Manager",
      cvSummary: "Tech-savvy PM with a background in software engineering and a deep interest in Generative AI. Led a team to build an LLM-powered internal tool that saved 10 hours of manual data entry per week. Seeking APM role in AI.",
      experienceChecklist: [
        "Show AI literacy: 'Integrated OpenAI API to automate [Task], reducing time by X%'",
        "Highlight core PM skills: 'Conducted user interviews to define requirements for AI feature'",
        "Focus on problem-solution fit: 'Identified that an AI solution was necessary due to X constraints'",
      ],
      summaryChecklist: [
        "State your balance of core product management skills and technical AI understanding",
        "Highlight hands-on experience building or prototyping with AI APIs (OpenAI, Anthropic)",
        "Show focus on solving real user problems, not just 'using AI for the sake of AI'",
      ],
      actionVerbs: ["Prototyped", "Integrated", "Identified", "Defined", "Prioritised", "Researched", "Launched", "Evaluated"],
      keySkills: ["Prompt Engineering Basics", "LLM API Integration", "User Discovery", "Agile / Scrum", "AI Ethics / Safety Basics", "Product Wireframing"],
      hrQuote: "For entry-level AI PMs, I want to see that you aren't just riding the hype wave. Did you actually build a prototype? Do you understand what an LLM does well and what it fails at? Show me a real problem you solved with AI.",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    developing: {
      cvTitle: "AI Product Manager",
      cvSummary: "AI PM with 4 years experience shipping machine learning features in consumer tech. Managed the end-to-end lifecycle of a personalized recommendation engine, improving user engagement by 22%. Expert in balancing model accuracy with UX.",
      experienceChecklist: [
        "Focus on AI-specific metrics: 'Balanced model precision (95%) with recall to optimise UX'",
        "Show cross-functional AI leadership: 'Translated business needs to Data Scientists and Engineers'",
        "Highlight UX for AI: 'Designed graceful failure states for when the AI provided low-confidence answers'",
      ],
      summaryChecklist: [
        "Lead with your specific AI product domain (RecSys, GenAI, Computer Vision)",
        "Highlight your ability to translate statistical outcomes (F1 scores) into business ROI",
        "Show expertise in designing UX for probabilistic (non-deterministic) systems",
      ],
      actionVerbs: ["Launched", "Translated", "Balanced", "Iterated", "Prioritised", "Aligned", "Mitigated", "Spearheaded"],
      keySkills: ["AI/ML Product Lifecycle", "Translating Math to Business", "UX for AI (Graceful Failures)", "A/B Testing AI Features", "Data Privacy/Compliance", "Stakeholder Alignment"],
      hrQuote: "A great AI PM knows that AI is probabilistic and constantly fails. Tell me how you designed the UX to handle edge cases and hallucinations. Tell me how you aligned the Data Scientists (who care about accuracy) with the Business (who cares about revenue).",
      hrName: "Thao Nguyen",
      hrRole: "Head of Product",
      hrCompany: "grab",
    },
    ready: {
      cvTitle: "Lead AI Product Manager",
      cvSummary: "Lead AI PM with 8 years building enterprise AI strategy. Owned the company's transition to Generative AI, launching 3 flagship LLM products that generated $10M new ARR. Led a pod of 20+ PMs, applied researchers, and engineers.",
      experienceChecklist: [
        "Highlight org-level strategy: 'Defined the 3-year GenAI roadmap, securing $XM investment from Board'",
        "Show platform/infrastructure PMing: 'Managed the internal MLOps/LLMOps platform product strategy'",
        "Include massive ROI/Impact: 'AI initiatives reduced operational costs by 30% company-wide'",
      ],
      summaryChecklist: [
        "Lead with your ownership of the company's overarching AI/ML strategy",
        "Highlight your experience navigating complex AI safety, ethics, and legal compliance",
        "Show leadership over large, highly technical cross-functional pods",
      ],
      actionVerbs: ["Pioneered", "Governed", "Architected", "Scaled", "Championed", "Defined", "Orchestrated", "Established"],
      keySkills: ["Enterprise AI Strategy", "AI Ethics, Bias & Governance", "Platform Product Management", "Executive Alignment", "Cross-Org Leadership", "Build vs Buy Analysis"],
      hrQuote: "At the Lead level, you are the CEO of the company's AI strategy. You need to show you can make massive 'build vs. buy' decisions regarding LLMs, navigate complex legal/privacy compliance, and align the entire organization behind an AI vision.",
      hrName: "James Watson",
      hrRole: "Chief Product Officer",
      hrCompany: "scaleup",
    },
  },

  "__default__": {
    starter: {
      cvTitle: "Aspiring Tech Professional",
      cvSummary: "Recent graduate with project experience and a passion for technology. Seeking a first role in tech to contribute and grow.",
      experienceChecklist: [
        "Start bullets with a strong action verb: Led, Built, Designed, Implemented",
        "Add concrete context: team size, tool used, scope of work",
        "Include the outcome: award received, metric improved, stakeholder satisfied",
      ],
      summaryChecklist: [
        "State your degree, university, and graduation year",
        "Reference one relevant project or internship experience",
        "Close with a specific goal: what role and what type of company?",
      ],
      actionVerbs: ["Led", "Built", "Drove", "Launched", "Designed", "Coordinated", "Delivered", "Improved"],
      keySkills: ["Communication", "Problem Solving", "Project Management", "Data Analysis", "Microsoft Office / G-Suite", "Teamwork"],
      hrQuote: "Whatever your background, the strongest CVs show initiative, ownership, and outcomes. Even without formal experience, frame your projects, coursework, and activities to show what you built, what you led, and what changed because of your work.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
    },
    developing: {
      cvTitle: "Tech Professional",
      cvSummary: "Tech professional with 2+ years of experience delivering measurable results. Specialised in cross-functional collaboration and data-driven decision making.",
      experienceChecklist: [
        "Replace passive descriptions with strong verbs: Led, Spearheaded, Defined, Optimised",
        "Add cross-functional context: who did you work with, how large was the impact?",
        "Quantify results: %, $, users, time saved, or a key business metric",
      ],
      summaryChecklist: [
        "Lead with years of experience + your domain specialisation",
        "Include your strongest quantified achievement",
        "Add your methodology or approach that makes you effective",
      ],
      actionVerbs: ["Led", "Spearheaded", "Defined", "Optimised", "Coordinated", "Delivered", "Improved", "Built"],
      keySkills: ["Project Management", "Cross-functional Collaboration", "Data Analysis", "Stakeholder Management", "Process Improvement"],
      hrQuote: "At mid-level, your CV should show impact, not just activity. I'm not looking for what you did day-to-day — I want to know what changed because of your work. Quantify your impact wherever possible.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
    },
    ready: {
      cvTitle: "Senior Tech Leader",
      cvSummary: "Senior technology leader with 6+ years driving strategic initiatives at scale. Led cross-functional teams of 20+ people. Championed platform improvements generating measurable business impact.",
      experienceChecklist: [
        "Use executive verbs: Spearheaded, Championed, Orchestrated, Architected at org scale",
        "Show organisational impact: team size led, budget owned, company-wide adoption",
        "Lead with business outcome: ARR, cost savings, market expansion, or strategic initiative delivered",
      ],
      summaryChecklist: [
        "Lead with the scale of business or org you've influenced",
        "Add leadership multiplier: team size, budget, org-wide adoption",
        "Quantify strategic impact: revenue, cost, market share, or transformation scope",
      ],
      actionVerbs: ["Championed", "Spearheaded", "Orchestrated", "Architected", "Drove", "Defined", "Scalable", "Led"],
      keySkills: ["Strategic Leadership", "P&L Ownership", "Executive Communication", "Cross-org Alignment", "Change Management", "Team Building", "OKRs / KPIs"],
      hrQuote: "At senior level, I'm scanning for company-scale impact. Tell me the revenue you influenced, the organisation you shaped, or the strategy you defined. If I can't see your business footprint in 6 seconds, I move on.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
    },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getRoleData(role: string | null): RoleData {
  if (!role) return ROLE_DATA["__default__"];
  return ROLE_DATA[role] ?? ROLE_DATA["__default__"];
}

export function getRoleLevelData(role: string | null, level: Level): RoleLevelData {
  return getRoleData(role)[level];
}
