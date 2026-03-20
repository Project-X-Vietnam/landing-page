// Unique, realistic CV templates — 19 roles, 3 levels each
export const EXPANDED_CV_TEMPLATES: Record<string, any> = 
{
  "Frontend Engineer": {
    "starter": {
      "name": "Linh Pham",
      "title": "Frontend Engineer Intern",
      "email": "linh.pham@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-fe",
      "summary": "Computer Science sophomore at HUST with hands-on experience in React and Tailwind CSS. Built 3 personal projects deployed on Vercel. Eager to contribute to a production frontend codebase.",
      "experience": [
        {
          "company": "Digital Agency VN",
          "role": "Frontend Intern",
          "dates": "Jun–Aug 2024",
          "bullets": [
            "Built 6 reusable React components for a client dashboard, reducing dev time by 20%",
            "Fixed 15 cross-browser CSS bugs reported in QA, clearing the backlog before launch",
            "Wrote Storybook documentation for 10 components, improving team onboarding speed"
          ]
        }
      ],
      "projects": [
        {
          "name": "Campus Food Finder",
          "type": "React + Firebase",
          "bullets": [
            "Built location-aware PWA connecting 200+ students with nearby canteens",
            "Implemented real-time menu updates using Firestore listeners"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best UI Project",
                  "issuer": "HUST Tech Fair",
                  "date": "2024",
                  "description": "Awarded for the most polished and accessible campus webapp among 60 entries."
            }
      ],
      "activities": [
            {
                  "organisation": "HUST Web Dev Club",
                  "role": "Frontend Lead",
                  "dates": "Sep 2023–Present",
                  "bullets": [
                        "Ran bi-weekly React workshops for 40 members",
                        "Mentored 5 juniors who shipped their first deployed projects"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Linh Pham",
      "title": "Frontend Engineer",
      "email": "linh.pham@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-fe",
      "summary": "Frontend engineer with 2 years shipping React/TypeScript features to 500k+ users. Cut Core Web Vitals LCP from 4.2s to 1.8s. Passionate about accessibility and design systems.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Frontend Engineer",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Rebuilt the product listing page in Next.js, improving LCP from 4.2s to 1.8s and increasing conversions by 8%",
            "Created a shared component library used by 4 product squads, reducing duplicate code by 30%",
            "Led accessibility audit fixing 45 WCAG AA violations across checkout funnel"
          ]
        }
      ],
      "projects": [
        {
          "name": "Design Token CLI",
          "type": "npm · TypeScript",
          "bullets": [
            "Published tool syncing Figma tokens to CSS variables; 500+ weekly downloads",
            "Reduced design-to-code inconsistencies by 80% at Tiki"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Employee of the Quarter",
                  "issuer": "Tiki E-Commerce",
                  "date": "Q3 2023",
                  "description": "Recognized for LCP improvements that lifted conversion rate 8%."
            }
      ],
      "activities": [
            {
                  "organisation": "VietJS Community",
                  "role": "Talk Speaker",
                  "dates": "2023–Present",
                  "bullets": [
                        "Spoke at 2 meetups on React performance optimization to 150+ developers",
                        "Co-organized monthly virtual sessions with 200+ RSVPs"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Linh Pham",
      "title": "Senior Frontend Engineer",
      "email": "linh.pham@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-fe",
      "summary": "Senior frontend engineer with 5 years leading UI architecture at scale. Spearheaded micro-frontend migration serving 2M DAU. Mentor of 4 junior engineers.",
      "experience": [
        {
          "company": "VNG Corporation",
          "role": "Senior Frontend Engineer",
          "dates": "Mar 2021–Present",
          "bullets": [
            "Architected micro-frontend system splitting monolith into 6 independent apps, enabling squads to deploy independently",
            "Reduced bundle size 55% via code-splitting and tree-shaking, saving $18k/year in CDN costs",
            "Mentored 4 junior engineers through weekly code reviews; 3 promoted within 12 months"
          ]
        }
      ],
      "projects": [
        {
          "name": "VNG Design System",
          "type": "Internal · React + Storybook",
          "bullets": [
            "Built 120-component library adopted by 8 product teams across VNG",
            "Established contribution guidelines and automated visual regression testing"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Tech Excellence Award",
                  "issuer": "VNG Corporation",
                  "date": "2022",
                  "description": "Recognized for leading the micro-frontend architecture serving 2M DAU."
            }
      ],
      "activities": [
            {
                  "organisation": "React Vietnam Open Source",
                  "role": "Core Maintainer",
                  "dates": "Jan 2021–Present",
                  "bullets": [
                        "Maintained libraries with 1.2k+ GitHub stars across 3 packages",
                        "Reviewed 80+ community PRs and mentored 4 first-time OSS contributors"
                  ]
            }
      ]
    }
  },
  "Backend Engineer": {
    "starter": {
      "name": "Duc Nguyen",
      "title": "Backend Engineer Intern",
      "email": "duc.nguyen.dev@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/ducnguyen-be",
      "summary": "CS final-year student at RMIT with solid foundations in Node.js, PostgreSQL, and REST API design. Built a real-time chat backend handling 100 concurrent connections as a capstone project.",
      "experience": [
        {
          "company": "Startup Vietnam",
          "role": "Backend Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Developed 8 REST API endpoints for a B2B SaaS product serving 50 enterprise clients",
            "Optimised a slow SQL query reducing response time from 1400ms to 120ms",
            "Wrote 40 unit tests raising service coverage from 25% to 68%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Real-Time Chat API",
          "type": "Node.js + Socket.IO + Redis",
          "bullets": [
            "Handled 100 concurrent WebSocket connections with sub-50ms latency",
            "Implemented Redis Pub/Sub for horizontal scalability across 2 server instances"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best Capstone Project",
                  "issuer": "RMIT Vietnam",
                  "date": "2024",
                  "description": "Top-ranked backend capstone for real-time chat system handling 100 concurrent connections."
            }
      ],
      "activities": [
            {
                  "organisation": "RMIT Backend Dev Society",
                  "role": "Treasurer & Technical Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Organized 4 API design hackathons attracting 80+ participants",
                        "Led Node.js crash course onboarding 30 new members"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Duc Nguyen",
      "title": "Backend Engineer",
      "email": "duc.nguyen.dev@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/ducnguyen-be",
      "summary": "Backend engineer with 2 years building scalable Go microservices. Reduced payment API p99 latency from 800ms to 95ms. Expert in PostgreSQL query optimisation and event-driven architecture.",
      "experience": [
        {
          "company": "MoMo FinTech",
          "role": "Backend Engineer",
          "dates": "Feb 2023–Present",
          "bullets": [
            "Rebuilt the transaction history service in Go, cutting p99 latency from 800ms to 95ms for 3M monthly users",
            "Designed an event-driven notification pipeline using Kafka processing 50k events/sec with zero message loss",
            "Led migration of 8 services from REST to gRPC, reducing inter-service latency by 40%"
          ]
        }
      ],
      "projects": [
        {
          "name": "TaskFlow — Collaborative Task Management App",
          "type": "Full-Stack · React + Node.js + PostgreSQL",
          "bullets": [
            "Built full-stack task management app with real-time multi-user sync via WebSocket, eliminating version conflicts that previously caused duplicated work across the team",
            "Redesigned 4 core database queries with indexing and pagination, cutting average API response time by 85% for datasets beyond 10,000 records",
            "Established Jest + Supertest testing suite with 92% coverage, catching 3 critical bugs before deployment and reducing regression issues across sprint cycles"
          ]
        },
        {
          "name": "Open-Source Rate Limiter",
          "type": "Go + Redis · npm",
          "bullets": [
            "Published sliding-window rate limiter middleware with 800+ GitHub stars and 1.2k weekly downloads",
            "Supports distributed deployments via Redis atomic operations"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Performance Optimization Award",
                  "issuer": "MoMo FinTech",
                  "date": "2023",
                  "description": "Reduced p99 latency from 800ms to 95ms, recognized as the highest-impact technical win of the year."
            }
      ],
      "activities": [
            {
                  "organisation": "Golang Vietnam Community",
                  "role": "Technical Blogger",
                  "dates": "2022–Present",
                  "bullets": [
                        "Published 8 articles on Go concurrency patterns reaching 5k+ monthly readers",
                        "Organized 2 Go meetups with 100+ developers each in Ho Chi Minh City"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Duc Nguyen",
      "title": "Senior Backend Engineer",
      "email": "duc.nguyen.dev@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/ducnguyen-be",
      "summary": "Senior backend engineer with 5 years scaling distributed systems to 10M+ users. Led a team of 6 engineers in a full platform re-architecture. Expert in Go, Kafka, and AWS.",
      "experience": [
        {
          "company": "Sea Group",
          "role": "Senior Backend Engineer",
          "dates": "Jun 2020–Present",
          "bullets": [
            "Led 6-person squad re-architecting the order management system; scaled throughput 5× to 200k orders/day",
            "Designed multi-region active-passive failover cutting RTO from 15 min to 45 sec",
            "Established backend coding standards and CI/CD templates adopted across 12 engineering squads"
          ]
        }
      ],
      "projects": [
        {
          "name": "Distributed Tracing Framework",
          "type": "Internal · OpenTelemetry + Jaeger",
          "bullets": [
            "Reduced MTTR for production incidents from 4 hours to 25 minutes",
            "Adopted by 20 services across 3 product lines"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Engineering Impact Award",
                  "issuer": "Sea Group",
                  "date": "2022",
                  "description": "Led order management re-architecture; scaled throughput 5× to 200k orders/day."
            }
      ],
      "activities": [
            {
                  "organisation": "APAC Backend Engineering Forum",
                  "role": "Advisory Member",
                  "dates": "Jun 2021–Present",
                  "bullets": [
                        "Spoke at 2 annual conferences on distributed systems to 400+ attendees",
                        "Mentored 8 engineers through structured 3-month backend mentorship programme"
                  ]
            }
      ]
    }
  },
  "Full Stack Dev": {
    "starter": {
      "name": "An Tran",
      "title": "Full Stack Developer Intern",
      "email": "an.tran.dev@gmail.com",
      "location": "Da Nang, Vietnam",
      "linkedin": "linkedin.com/in/antran-fullstack",
      "summary": "Information Technology student with proven ability to ship end-to-end features using React and Express.js. Delivered a full-stack e-commerce prototype in 6 weeks as a university capstone.",
      "experience": [
        {
          "company": "Local Tech Agency",
          "role": "Full Stack Intern",
          "dates": "Jun–Sep 2024",
          "bullets": [
            "Shipped 12 full-stack features across React frontend and Node.js backend for a restaurant SaaS",
            "Integrated Stripe payment flow; processed 200+ test transactions with zero errors",
            "Set up Docker Compose dev environment reducing team onboarding from 3 days to 2 hours"
          ]
        }
      ],
      "projects": [
        {
          "name": "Restaurant POS System",
          "type": "React + Express + MySQL",
          "bullets": [
            "Built complete point-of-sale system used by 3 local restaurants",
            "Handled 50 concurrent orders with real-time kitchen display updates via WebSockets"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Startup Hackathon Runner-Up",
                  "issuer": "Da Nang Tech Fest",
                  "date": "2024",
                  "description": "Built a restaurant POS prototype end-to-end in 36 hours; awarded among 45 competing teams."
            }
      ],
      "activities": [
            {
                  "organisation": "Da Nang Developers Collective",
                  "role": "Core Organizer",
                  "dates": "Sep 2023–Present",
                  "bullets": [
                        "Organized monthly full-stack study sessions with 50+ participants",
                        "Sourced speakers from Shopee and VNG for 3 panel discussions"
                  ]
            }
      ]
    },
    "developing": {
      "name": "An Tran",
      "title": "Full Stack Developer",
      "email": "an.tran.dev@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/antran-fullstack",
      "summary": "Full-stack developer with 2 years owning features from database schema to pixel-perfect UI. Shipped 30+ features to a 100k-user SaaS platform. Comfortable across Next.js, Prisma, and AWS.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Full Stack Developer",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Owned the employee onboarding module end-to-end; reduced client setup time from 2 days to 4 hours",
            "Built real-time collaborative document editing feature using Yjs operational transforms",
            "Automated database migration workflow saving 3 hours of manual DBA work per release"
          ]
        }
      ],
      "projects": [
        {
          "name": "Open-Source Form Builder",
          "type": "Next.js + Prisma · GitHub",
          "bullets": [
            "Drag-and-drop form builder with conditional logic; 300+ GitHub stars",
            "Integrated with Zapier, Notion, and Slack via webhooks"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Open Source Spotlight",
                  "issuer": "GitHub Vietnam",
                  "date": "2023",
                  "description": "Form Builder project featured for 300+ GitHub stars and community engagement."
            }
      ],
      "activities": [
            {
                  "organisation": "Base.vn Tech Talks",
                  "role": "Speaker & Organizer",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Hosted 3 internal knowledge-sharing sessions on full-stack architecture for 60+ engineers",
                        "Mentored 2 junior engineers; both received promotions within 12 months"
                  ]
            }
      ]
    },
    "ready": {
      "name": "An Tran",
      "title": "Lead Full Stack Developer",
      "email": "an.tran.dev@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/antran-fullstack",
      "summary": "Lead full-stack developer with 5 years delivering complex platforms. Architected a multi-tenant SaaS serving 500 enterprise clients. Reduced cloud spend 35% through infrastructure and code optimisation.",
      "experience": [
        {
          "company": "KiotViet",
          "role": "Lead Full Stack Developer",
          "dates": "Mar 2020–Present",
          "bullets": [
            "Architected multi-tenant SaaS platform scaling to 500 enterprise clients and 1M API calls/day",
            "Led a squad of 8 engineers; improved sprint velocity 25% through refined estimation and CI improvements",
            "Reduced annual AWS spend by $45k through serverless migration and reserved instance strategy"
          ]
        }
      ],
      "projects": [
        {
          "name": "Internal Dev Platform",
          "type": "Turborepo + NX",
          "bullets": [
            "Unified 6 product repos into a monorepo, cutting cross-team PR conflicts by 60%",
            "Automated release notes generation and deployment gates"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Cloud Cost Champion Award",
                  "issuer": "KiotViet",
                  "date": "2022",
                  "description": "Recognized for reducing annual AWS spend by $45k through serverless migration strategy."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam Full-Stack Guild",
                  "role": "Chapter Lead",
                  "dates": "Mar 2020–Present",
                  "bullets": [
                        "Grew monthly meetup from 20 to 120+ active members over 3 years",
                        "Facilitated 6 annual tech talks on scalable architecture and monorepo tooling"
                  ]
            }
      ]
    }
  },
  "Mobile Dev": {
    "starter": {
      "name": "Khanh Le",
      "title": "Mobile Developer Intern",
      "email": "khanh.mobile@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/khanhle-mobile",
      "summary": "Mobile-first developer (React Native) who shipped a campus app to 400 real users. Solid understanding of navigation patterns, state management with Zustand, and pushing to App Store.",
      "experience": [
        {
          "company": "App Studio VN",
          "role": "Mobile Intern",
          "dates": "Jun–Aug 2024",
          "bullets": [
            "Built 5 screens for a health-tracking app in React Native, reviewed and merged in 3 sprints",
            "Resolved 8 iOS-specific layout bugs identified in TestFlight beta",
            "Integrated Apple HealthKit to fetch step count data for 500 beta users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Campus Event App",
          "type": "React Native + Expo",
          "bullets": [
            "Published to Expo Go; 400 users in first week with 4.6-star rating",
            "Implemented push notifications via Expo Notifications API"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best Mobile App",
                  "issuer": "HUST App Showcase",
                  "date": "2024",
                  "description": "Campus Event App earned the highest user-experience rating from a panel of 10 industry judges."
            }
      ],
      "activities": [
            {
                  "organisation": "HUST Mobile Dev Club",
                  "role": "President",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Led 30-member club building 5 campus apps; 3 published to app stores",
                        "Ran React Native bootcamp training 15 students from zero to deployment"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Khanh Le",
      "title": "Mobile Developer",
      "email": "khanh.mobile@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/khanhle-mobile",
      "summary": "Mobile developer with 2 years shipping cross-platform apps to 50k+ downloads. Reduced app startup time 45% and achieved 4.7-star ratings on both iOS and Android.",
      "experience": [
        {
          "company": "VinID Super App",
          "role": "Mobile Developer",
          "dates": "Feb 2023–Present",
          "bullets": [
            "Owned the loyalty rewards module; 50k+ downloads, 4.7-star rating across iOS and Android",
            "Reduced cold start time from 2.8s to 1.5s via lazy loading and Hermes JS engine tuning",
            "Implemented offline-first architecture with local SQLite cache, cutting API calls by 35%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Animated Onboarding Library",
          "type": "React Native + Reanimated 3",
          "bullets": [
            "Open-source package with 150 GitHub stars and 600 weekly downloads",
            "7 configurable animation presets used in production by 3 startups"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Mobile Innovation Award",
                  "issuer": "VinID Super App",
                  "date": "Q2 2023",
                  "description": "Recognized for reducing cold start time from 2.8s to 1.5s and improving daily active sessions."
            }
      ],
      "activities": [
            {
                  "organisation": "React Native Vietnam",
                  "role": "Core Contributor & Speaker",
                  "dates": "2022–Present",
                  "bullets": [
                        "Spoke at 2 national mobile conferences on React Native performance to 300+ attendees",
                        "Open-source library achieved 150 GitHub stars and 600 weekly downloads"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Khanh Le",
      "title": "Senior Mobile Engineer",
      "email": "khanh.mobile@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/khanhle-mobile",
      "summary": "Senior mobile engineer with 5 years leading iOS and Android teams. Scaled a super-app to 2M MAU. Expert in performance optimisation, release engineering, and cross-platform architecture.",
      "experience": [
        {
          "company": "Zalo",
          "role": "Senior Mobile Engineer",
          "dates": "Jan 2020–Present",
          "bullets": [
            "Led mobile squad of 5 engineers building the Stories feature to 2M MAU within 3 months of launch",
            "Established automated UI testing with Detox, reducing regression bugs in releases by 65%",
            "Defined mobile architecture guidelines adopted across 4 Zalo product teams"
          ]
        }
      ],
      "projects": [
        {
          "name": "Zalo Mini App Runtime",
          "type": "JavaScript Bridge + Native",
          "bullets": [
            "Architected the JS bridge enabling 3rd-party mini apps inside Zalo",
            "Runtime serves 500k daily mini app sessions with <100ms initialisation"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Vietnam Mobile Leader of the Year",
                  "issuer": "Tech In Asia Vietnam",
                  "date": "2022",
                  "description": "Selected among 200 nominees for scaling Zalo Stories feature to 2M MAU in 3 months."
            }
      ],
      "activities": [
            {
                  "organisation": "Mobile Dev APAC Community",
                  "role": "Advisory Contributor",
                  "dates": "Jan 2020–Present",
                  "bullets": [
                        "Mentored 6 junior mobile engineers across 3 startups; 4 now in senior roles",
                        "Published 2 conference papers on cross-platform mobile architecture at MobCon Asia"
                  ]
            }
      ]
    }
  },
  "DevOps": {
    "starter": {
      "name": "Hai Vo",
      "title": "DevOps Intern",
      "email": "hai.vo.devops@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/haivo-devops",
      "summary": "IT student with hands-on Linux, Docker, and CI/CD experience. Automated a deployment pipeline in GitLab CI as a personal project, cutting deployment time from 30 min to 8 min.",
      "experience": [
        {
          "company": "CloudTech VN",
          "role": "DevOps Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Containerised 4 legacy apps with Docker; standardised local dev environments across 12-person team",
            "Built GitLab CI pipeline reducing deployment time from 30 min to 8 min",
            "Monitored AWS EC2 fleet with Datadog dashboards; resolved 2 memory leak alerts before user impact"
          ]
        }
      ],
      "projects": [
        {
          "name": "IaC Starter Kit",
          "type": "Terraform + AWS",
          "bullets": [
            "Terraform modules provisioning VPC, ECS, and RDS in one command",
            "Used in 2 startup projects to achieve production-ready infra in under 2 hours"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best IaC Project",
                  "issuer": "Terraform Vietnam Challenge",
                  "date": "2024",
                  "description": "IaC Starter Kit recognized as the most practical open-source contribution among 40 submissions."
            }
      ],
      "activities": [
            {
                  "organisation": "CloudTech Student Club",
                  "role": "Infrastructure Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Ran 4 Docker and Kubernetes workshops for 60+ IT students",
                        "Set up a shared AWS Sandbox lab environment used by 20 club members"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Hai Vo",
      "title": "DevOps / Platform Engineer",
      "email": "hai.vo.devops@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/haivo-devops",
      "summary": "DevOps engineer with 2 years managing Kubernetes clusters and Terraform IaC. Maintained 99.97% uptime across 3 production EKS clusters. Reduced MTTR by 35% through better observability.",
      "experience": [
        {
          "company": "Finmo FinTech",
          "role": "DevOps Engineer",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Managed 3 AWS EKS clusters serving production workloads at 15k RPM; maintained 99.97% uptime",
            "Implemented full IaC via Terraform, eliminating all manual provisioning errors",
            "Built ELK centralised logging stack reducing MTTR for critical bugs from 3 hours to 45 min"
          ]
        }
      ],
      "projects": [
        {
          "name": "CloudLaunch — CI/CD & Infrastructure Automation Toolkit",
          "type": "AWS + Terraform + GitHub Actions + Docker",
          "bullets": [
            "Automated provisioning of 3 environments (dev, staging, prod) using Terraform, reducing setup from 4 hours to 12 minutes and eliminating environment drift that caused failed deployments",
            "Built a GitHub Actions CI/CD pipeline enabling daily automated deployments with a 95% success rate, replacing biweekly manual releases",
            "Containerised a multi-service application with Docker and migrated to AWS ECS, allowing the system to handle traffic spikes gracefully during peak usage"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Q4 Reliability Champion",
                  "issuer": "Finmo FinTech",
                  "date": "2023",
                  "description": "Maintained 99.97% uptime across 3 production EKS clusters in a high-growth environment."
            }
      ],
      "activities": [
            {
                  "organisation": "DevOps Vietnam Community",
                  "role": "Community Lead",
                  "dates": "2022–Present",
                  "bullets": [
                        "Moderated a 1.2k-member Slack community for DevOps practitioners",
                        "Organized 3 Kubernetes Day Vietnam workshops attended by 200+ engineers"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Hai Vo",
      "title": "Senior Infrastructure Engineer",
      "email": "hai.vo.devops@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/haivo-devops",
      "summary": "Senior infra engineer with 5 years designing multi-region, resilient AWS architectures. Led SRE practice for a 100-engineer org. Saved $120k/year in cloud costs via right-sizing and Spot migration.",
      "experience": [
        {
          "company": "VNG Cloud",
          "role": "Senior Infrastructure Engineer",
          "dates": "Feb 2019–Present",
          "bullets": [
            "Designed multi-region active-active AWS architecture achieving 99.999% availability for payment APIs",
            "Led SRE chapter of 4 engineers; defined SLOs, runbooks, and on-call rotations reducing incidents 30%",
            "Reduced annual compute spend by $120k through Spot instance migration and auto-scaling policies"
          ]
        }
      ],
      "projects": [
        {
          "name": "Chaos Engineering Programme",
          "type": "Gremlin + AWS FIS",
          "bullets": [
            "Ran 30 failure-injection experiments uncovering 12 critical single-points-of-failure before they caused incidents",
            "Presented resiliency learnings at APAC DevOps Summit 2023 to 250 attendees"
          ]
        }
      ],
      "awards": [
            {
                  "name": "APAC DevOps Excellence Award",
                  "issuer": "HashiConf APAC",
                  "date": "2023",
                  "description": "Recognized for chaos engineering programme uncovering 12 critical single-points-of-failure."
            }
      ],
      "activities": [
            {
                  "organisation": "APAC SRE Council",
                  "role": "Advisory Board Member",
                  "dates": "Jun 2021–Present",
                  "bullets": [
                        "Advise 5 regional engineering leaders on reliability and on-call strategy",
                        "Keynote speaker at APAC DevOps Summit 2023 to 250 attendees on chaos engineering"
                  ]
            }
      ]
    }
  },
  "Product Management (PM)": {
    "starter": {
      "name": "Sam Hoang",
      "title": "Associate Product Manager (APM)",
      "email": "sam.hoang@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/samhoang-pm",
      "summary": "APM with 1 year experience driving specific B2B SaaS features. Owned the initial user onboarding flow, achieving a 10% increase in activation rate by aggressively removing friction.",
      "experience": [
        {
          "company": "Consumer App Co",
          "role": "Product Intern → APM",
          "dates": "May 2023–Present",
          "bullets": [
            "Owned checkout redesign initiative; ran 20 user interviews identifying 3 critical friction points, driving 14% lift in conversion rate",
            "Shipped 3 features using XYZ formula PRDs — coordinated 5 engineers and 1 designer across 4 two-week sprints with zero scope creep",
            "Built Mixpanel funnel analysis uncovering payment abandonment bug; fix recovered 8% of lost purchases (≈$22k MRR)"
          ]
        }
      ],
      "projects": [
        {
          "name": "Campus Study Matcher",
          "type": "0→1 Student Project · Figma + React",
          "bullets": [
            "Led 4-person team from discovery to launch in 6 weeks; reached 300 active users in Week 1 with organic word-of-mouth only",
            "Applied RICE scoring to cut backlog from 24 ideas to 8 must-haves; shipped 100% of committed scope on deadline"
          ]
        }
      ],
      "awards": [
        {
          "name": "First Place",
          "issuer": "Global Product Hackathon",
          "date": "2023",
          "description": "Selected among 500+ participants for designing the best 0→1 B2B SaaS onboarding flow."
        }
      ],
      "activities": [
        {
          "organisation": "University Product Club",
          "role": "Events Lead",
          "dates": "Aug 2022–Present",
          "bullets": [
            "Organised 3 product teardown workshops with 200+ total student attendees",
            "Sourced and hosted 5 guest speakers from top tech companies (Shopee, Grab, VNG)"
          ]
        }
      ]
    },
    "developing": {
      "name": "Sam Hoang",
      "title": "Associate Product Manager",
      "email": "sam.hoang.pm@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/samhoang-pm",
      "summary": "Data-driven APM with 2 years owning the Onboarding squad at a 2M-user consumer app. Cut onboarding drop-off 30% via cohort analysis and A/B testing. Shipped 5 instrumented tests per quarter with measurable uplift every cycle.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Owned Buyer Onboarding squad; redesigned 5-step registration flow using Mixpanel cohort data — cut drop-off 30%, adding 18k monthly activated buyers",
            "Shipped 4 PRDs end-to-end, coordinating 8 engineers and 2 designers across 3 sprints; maintained 97% on-time delivery rate over 6 quarters",
            "Defined 'Day-7 purchase rate' as North Star metric; instituted weekly leadership dashboard — metric improved from 22% to 31% in 6 months"
          ]
        }
      ],
      "projects": [
        {
          "name": "FocusMate — Student Productivity & Study Tracking App",
          "type": "0→1 Product · Figma + Mixpanel + Jira",
          "bullets": [
            "Led a cross-functional team of 6 from user research (32 interviews, 150+ survey responses) to MVP launch in 8 weeks, building against validated student pain points rather than assumptions",
            "Defined a 14-feature roadmap using RICE scoring and managed 4 sprints with 89% on-time delivery, keeping scope tight enough to ship on schedule",
            "Ran an A/B test on onboarding with 200+ beta users that lifted Day-7 retention from 34% to 52%, proving a guided first-session experience drove long-term return"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategic Intelligence Tool",
          "bullets": [
            "Benchmarked 5 top competitor apps across 20 product attributes; findings directly shaped Q3 roadmap, deprioritising 2 low-differentiation features",
            "Adopted as monthly standard template by 3 PMs, saving ~4 hours/PM per quarter in competitive research"
          ]
        }
      ],
      "awards": [
        {
          "name": "Product Innovator of the Year",
          "issuer": "Tiki E-Commerce",
          "date": "2023",
          "description": "Awarded for successfully decreasing buyer onboarding drop-off by 30%."
        }
      ],
      "activities": [
        {
          "organisation": "Vietnam Product Managers Community",
          "role": "Core Organizer",
          "dates": "Jan 2022–Present",
          "bullets": [
            "Facilitated 4 panel discussions on growth strategies with 500+ RSVPs per event",
            "Mentored 6 APMs in 1:1 sessions, guiding 2 to secure mid-level PM roles"
          ]
        }
      ]
    },
    "ready": {
      "name": "Sam Hoang",
      "title": "Senior Product Manager",
      "email": "sam.hoang.pm@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/samhoang-pm",
      "summary": "Strategic PM with 5 years launching B2B SaaS products from 0→1 and scaling to $2M ARR. Defined 18-month roadmaps approved by C-suite. Expert in stakeholder alignment, discovery, and growing PM teams from 1→4.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Senior Product Manager",
          "dates": "Apr 2020–Present",
          "bullets": [
            "Led 15-person cross-functional tribe to launch analytics module generating $2M ARR within 6 months of GA release",
            "Authored and presented 18-month product roadmap to CEO and board; secured $800k additional R&D budget for H2 expansion",
            "Mentored 2 APMs through structured OKR+discovery process; both promoted within 12 months — process now adopted org-wide"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise GTM Launch",
          "type": "Cross-Functional Strategic Initiative",
          "bullets": [
            "Co-led product marketing, sales enablement, and CS readiness for platform overhaul — 0 to 200 enterprise commits in 90 days",
            "Achieved 85% enterprise adoption in Q1 post-launch vs. 60% internal target; reduced enterprise onboarding time from 14 days to 3 days"
          ]
        }
      ],
      "awards": [
        {
          "name": "Top 50 Tech Leaders Under 30",
          "issuer": "Forbes Vietnam",
          "date": "2023",
          "description": "Recognized for driving $2M ARR growth and transforming enterprise onboarding."
        }
      ],
      "activities": [
        {
          "organisation": "Tech Startup Accelerator",
          "role": "Advisory Board Member",
          "dates": "Apr 2021–Present",
          "bullets": [
            "Advised 5 early-stage B2B SaaS startups on product-market fit and GTM strategy",
            "Led product strategy workshops that helped 2 portfolio companies secure Series A funding"
          ]
        }
      ]
    }
  },
  "Product Growth / Growth PM": {
    "starter": {
      "name": "Taylor Nguyen",
      "title": "Growth Intern",
      "email": "taylor.ng.growth@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/taylornguyen-growth",
      "summary": "Data-obsessed student who instrumented a checkout funnel in GA4 and uncovered a 20% drop-off at payment selection. Built a referral loop mock-up that a PM incorporated into the next sprint.",
      "experience": [
        {
          "company": "E-Commerce Startup",
          "role": "Growth Marketing Intern",
          "dates": "Jun–Sep 2024",
          "bullets": [
            "Instrumented checkout funnel in GA4; found 20% drop-off at payment selection leading to a UX fix",
            "Ran 3 email A/B tests improving CTR 15% and generating $8k incremental revenue",
            "Proposed referral mechanic; PM incorporated it into next sprint backlog"
          ]
        }
      ],
      "projects": [
        {
          "name": "Viral Loop Analysis",
          "type": "Academic · Tableau",
          "bullets": [
            "Modelled referral K-factor for consumer apps; proposed change projected to improve K-factor by 0.2",
            "Built Tableau dashboards visualising projected LTV/CAC impact for 3 pricing scenarios"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best Growth Insight",
                  "issuer": "University Marketing Competition",
                  "date": "2024",
                  "description": "Viral Loop Analysis model recognized for actionable K-factor insights among 80 competing student teams."
            }
      ],
      "activities": [
            {
                  "organisation": "University Growth Hacking Club",
                  "role": "Research Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Led 20-member team running 5 simulated growth experiments per semester",
                        "Presented growth findings to 3 faculty advisors; 2 insights incorporated into curriculum"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Taylor Nguyen",
      "title": "Growth Product Manager",
      "email": "taylor.ng.growth@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/taylornguyen-growth",
      "summary": "Growth PM with 2 years running 20+ A/B tests per quarter. Improved D1 retention from 32% to 39% and cut CAC 15% through referral redesign. Expert in activation loops, SQL, and Amplitude.",
      "experience": [
        {
          "company": "FinTech App",
          "role": "Growth PM",
          "dates": "Feb 2023–Present",
          "bullets": [
            "Redesigned onboarding through 8 sequential A/B tests, lifting D1 retention from 32% to 39%",
            "Rebuilt referral mechanics reducing CAC 15% and doubling viral coefficient to 1.4",
            "Wrote SQL queries clustering users by LTV; informed pricing tier redesign boosting ARPU 12%"
          ]
        }
      ],
      "projects": [
        {
          "name": "BoostLoop — Referral & Retention Growth Experiment Platform",
          "type": "Growth Experiments · Mixpanel + Amplitude + Braze",
          "bullets": [
            "Ran 6 structured growth experiments across acquisition, activation, and retention for a campus delivery app, shifting the team from gut-feel decisions to evidence-based prioritisation",
            "Launched a referral program that drove 240+ sign-ups in 4 weeks and cut acquisition cost by 45% vs. paid social, proving peer-driven channels were more effective for the student demographic",
            "Identified a critical Day-3 retention drop-off through cohort analysis and designed a push notification sequence that lifted D7 retention by 28% — turning an invisible churn point into the team's highest-impact fix"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Growth PM of the Quarter",
                  "issuer": "FinTech App",
                  "date": "Q1 2024",
                  "description": "Recognized for lifting D1 retention from 32% to 39% and doubling viral coefficient to 1.4."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam Growth Collective",
                  "role": "Core Organizer",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Organized 4 growth teardown sessions with 150+ practitioners per event",
                        "Maintained a curated newsletter with 1.5k subscribers covering A/B testing and PLG trends"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Taylor Nguyen",
      "title": "Lead Growth PM",
      "email": "taylor.ng.growth@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/taylornguyen-growth",
      "summary": "Lead Growth PM with 5 years scaling growth loops and monetisation. Led PLG transition capturing $5M self-serve pipeline. Expert in pricing, viral mechanics, and growth team building.",
      "experience": [
        {
          "company": "SaaS Scaleup",
          "role": "Lead Growth PM",
          "dates": "Aug 2019–Present",
          "bullets": [
            "Led PLG transition including freemium tiers and self-serve checkout; captured $5M new pipeline in 12 months",
            "Managed cross-functional pod of 8 running 15+ concurrent growth experiments",
            "Established Growth Council aligning C-suite, Sales, and Product on growth thesis and OKRs"
          ]
        }
      ],
      "projects": [
        {
          "name": "Pricing Tier Redesign",
          "type": "Strategic Initiative",
          "bullets": [
            "Led restructure delivering 25% ACV lift within 3 months of launch",
            "Modelled 5 pricing scenarios in collaboration with Finance and Sales"
          ]
        }
      ],
      "awards": [
            {
                  "name": "PLG Innovator Award",
                  "issuer": "SaaScribe Vietnam",
                  "date": "2022",
                  "description": "Recognized for leading PLG transition that captured $5M self-serve pipeline in 12 months."
            }
      ],
      "activities": [
            {
                  "organisation": "Product-Led Growth Alliance APAC",
                  "role": "Regional Ambassador",
                  "dates": "Aug 2019–Present",
                  "bullets": [
                        "Represented Vietnam chapter at 2 global PLG summits with 500+ attendees each",
                        "Mentored 4 Growth PMs who each secured roles at Series B+ funded companies"
                  ]
            }
      ]
    }
  },
  "Business Analytics (BA)": {
    "starter": {
      "name": "Jordan Do",
      "title": "Business Analyst Intern",
      "email": "jordan.do.ba@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/jordando-ba",
      "summary": "Process-minded student with strong SQL and Tableau skills. Automated 5 regional KPI dashboards during summer internship, saving 10 hours/week of manual reporting. Comfortable translating raw data into stakeholder-ready insights.",
      "experience": [
        {
          "company": "National Logistics Corp",
          "role": "Data Analyst Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Built 5 Tableau dashboards tracking fleet KPIs for 3 regional managers, eliminating 10 hours/week of manual Excel reporting",
            "Cleaned and validated 1M+ delivery records via SQL for a supply-chain audit; findings reshaped routing strategy across 3 cities, cutting delays 8%",
            "Presented rerouting recommendation deck to VP Operations — proposal approved and piloted in Northern region within 2 weeks"
          ]
        }
      ],
      "projects": [
        {
          "name": "Market Entry Financial Model",
          "type": "Consulting Project · Excel + PowerPoint",
          "bullets": [
            "Built a 5-year DCF and scenario analysis model for an ed-tech firm entering Southeast Asia — presented to real C-suite executives",
            "Competitor pricing heatmaps and market-share waterfall charts used as reference in board deck"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Top 3 – University Case Competition",
                  "issuer": "FTU Consulting Club",
                  "date": "2024",
                  "description": "MarketLens financial model placed top 3 of 18 teams for analytical rigor and business recommendation quality."
            }
      ],
      "activities": [
            {
                  "organisation": "FTU Finance & Analytics Club",
                  "role": "Research Analyst Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Produced monthly market reports distributed to 150 club members and 3 faculty advisors",
                        "Mentored 8 junior analysts on SQL and Excel financial modeling"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Jordan Do",
      "title": "Business Analyst",
      "email": "jordan.do.ba@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/jordando-ba",
      "summary": "BA with 2 years bridging technical squads and business stakeholders at a fast-growing retail tech company. Authored 40 user stories, eliminated $50k/quarter in inventory write-offs, and built real-time Power BI dashboards adopted company-wide.",
      "experience": [
        {
          "company": "Retail Innovations VN",
          "role": "Business Analyst",
          "dates": "Mar 2023–Present",
          "bullets": [
            "Authored 40 user stories for a CRM integration used by 500+ sales agents — delivered zero post-launch critical bugs across 3 UAT cycles",
            "Mapped as-is BPMN flows across order-fulfilment, uncovering 15% operational inefficiency; redesigned 3 processes reducing average order cycle from 48h to 31h",
            "Resolved inventory-storefront data discrepancies via SQL reconciliation scripts — eliminated $50k/quarter in write-offs within 2 months of deployment"
          ]
        }
      ],
      "projects": [
        {
          "name": "MarketLens — Competitive Intelligence & Market Sizing Report",
          "type": "Research + Financial Modeling · Excel + Python + Power BI",
          "bullets": [
            "Conducted a bottom-up market sizing for Vietnamese EdTech (TAM: $1.2B, SAM: $180M) by synthesising 15+ industry reports and 20+ competitor profiles, anchoring the team's strategic decisions with a defensible market narrative",
            "Built a 12-scenario financial model projecting 3-year revenue — placed top 3 out of 18 teams at university case competition based on analytical rigor",
            "Automated weekly competitor pricing tracking with Python across 8 websites, enabling the team to spot pricing shifts within days instead of the previous weeks-long manual cycle"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Business Impact Award",
                  "issuer": "Retail Innovations VN",
                  "date": "2023",
                  "description": "Recognized for eliminating $50k/quarter in inventory write-offs through SQL reconciliation scripts."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam Business Analyst Network",
                  "role": "Event Co-Organizer",
                  "dates": "Jun 2022–Present",
                  "bullets": [
                        "Co-organized 5 BA community meetups with 200+ combined attendees",
                        "Led 2 workshops on BPMN process mapping and stakeholder communication"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Jordan Do",
      "title": "Senior Business Analyst",
      "email": "jordan.do.ba@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/jordando-ba",
      "summary": "Senior BA with 6 years leading enterprise digital transformations across banking and retail. Delivered a $3M core banking replacement on schedule with zero compliance violations. Expert in BPMN, stakeholder management, and data warehouse design.",
      "experience": [
        {
          "company": "Global Financial Services",
          "role": "Senior Systems Analyst",
          "dates": "Feb 2018–Present",
          "bullets": [
            "Led requirements, solution design, and UAT for a $3M core banking replacement — delivered on-time across 18 months with zero compliance violations and 100% regulatory sign-off",
            "Facilitated 12 JAD sessions with 25+ cross-functional executives to align on scope, acceptance criteria, and handover protocols",
            "Mentored 3 junior analysts in SQL, entity-relationship modelling, and stakeholder communication — all 3 promoted or hired senior within 18 months"
          ]
        }
      ],
      "projects": [
        {
          "name": "Regulatory Compliance Audit System",
          "type": "Enterprise Architecture · BPMN + SQL",
          "bullets": [
            "Mapped complex BFSI regulations into 80+ technical specifications across 6 risk management subsystems — used as reference architecture for 2 sister banks",
            "Zero compliance violations in first full operational year; system passed all 4 scheduled regulatory audits"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Digital Transformation Leader",
                  "issuer": "Finance Technology Awards Vietnam",
                  "date": "2022",
                  "description": "Recognized for delivering a $3M core banking replacement on-time with zero compliance violations."
            }
      ],
      "activities": [
            {
                  "organisation": "ACCA Vietnam Chapter",
                  "role": "Advisory Committee Member",
                  "dates": "Feb 2018–Present",
                  "bullets": [
                        "Advised 8 early-career BAs on career paths in banking and enterprise technology",
                        "Spoke at 2 ACCA annual conferences on BA practices in digital transformation"
                  ]
            }
      ]
    }
  },
  "UI/UX / Product Design": {
    "starter": {
      "name": "Morgan Bui",
      "title": "UI/UX Design Intern",
      "email": "morgan.bui.ux@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/morganbui-ux",
      "summary": "Creative design student with 4 Figma case studies covering user research, wireframing, and high-fidelity prototyping. Conducted usability testing that reduced checkout task time 20%.",
      "experience": [
        {
          "company": "Digital Agency XYZ",
          "role": "UI/UX Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Prototyped 2 e-commerce client apps in Figma; usability tests with 10 users cut checkout task time 20%",
            "Built 30 component variants in the agency shared design system; adopted by 3 client projects",
            "Presented rationale to stakeholders and iterated based on feedback in 2-week Agile sprints"
          ]
        }
      ],
      "projects": [
        {
          "name": "NGO Donation Flow Redesign",
          "type": "Case Study · Figma",
          "bullets": [
            "Redesigned donation flow improving visual hierarchy and achieving WCAG AA compliance",
            "Full design documentation including personas, journey maps, and annotated developer specs"
          ]
        }
      ],
      "awards": [
            {
                  "name": "UX Design Award",
                  "issuer": "Creative HCMC Competition",
                  "date": "2024",
                  "description": "NGO Donation Flow Redesign recognized for best WCAG compliance and user research methodology."
            }
      ],
      "activities": [
            {
                  "organisation": "HCMC Design Students Alliance",
                  "role": "Portfolio Workshop Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Ran 3 Figma workshops for 50 design students from sketch to high-fidelity prototype",
                        "Organized collaboration with 2 local NGOs providing real-world design briefs"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Morgan Bui",
      "title": "Product Designer",
      "email": "morgan.bui.ux@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/morganbui-ux",
      "summary": "Product designer with 2 years translating ambiguous problems into elegant interfaces. Built a 150-component Figma library reducing design-to-dev handoff time 35%. Increased daily engagement 15%.",
      "experience": [
        {
          "company": "Tech Product Studio",
          "role": "Product Designer",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Led end-to-end design of analytics dashboard; iterative research lifted daily engagement 15%",
            "Built Figma component library with 150 components reducing design-to-dev handoff time 35%",
            "Collaborated with engineers via annotated specs and weekly design reviews ensuring pixel-perfect implementation"
          ]
        }
      ],
      "projects": [
        {
          "name": "CareNav — Healthcare Appointment Booking Redesign",
          "type": "UX Research + Figma + Maze",
          "bullets": [
            "Redesigned the booking flow for a campus health clinic app based on 18 user interviews, reducing task completion time by 42% and resolving the top 3 student complaints about the existing experience",
            "Created a 40+ component Figma design system following WCAG 2.1 AA standards, establishing a reusable foundation that cut design-to-dev handoff time for future features by half",
            "Validated the redesign through moderated usability testing with 30 participants, improving SUS score from 62 to 81 and giving the dev team confidence to proceed without further iteration"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best Product Design",
                  "issuer": "Vietnam Digital Awards",
                  "date": "2023",
                  "description": "Analytics dashboard design recognized for 15% daily engagement lift and industry-leading usability score."
            }
      ],
      "activities": [
            {
                  "organisation": "UX Vietnam Community",
                  "role": "Mentor & Speaker",
                  "dates": "2022–Present",
                  "bullets": [
                        "Mentored 6 junior designers through monthly 1:1 portfolio critiques",
                        "Spoke at UXVN Conf 2023 on user research methodology to 300+ attendees"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Morgan Bui",
      "title": "Senior Product Designer",
      "email": "morgan.bui.ux@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/morganbui-ux",
      "summary": "Senior designer with 5 years driving UX strategy for enterprise SaaS. Led design for a mobile app earning App Store 'App of the Day' and 4.8-star rating from 10k reviews.",
      "experience": [
        {
          "company": "Cloud SaaS Enterprise",
          "role": "Senior Product Designer",
          "dates": "Aug 2019–Present",
          "bullets": [
            "Directed UX vision across 3 product verticals aligned with 3-year company roadmap",
            "Built and led design team of 4; instituted weekly design crits and a portfolio-review culture",
            "Pioneered continuous discovery with 5 customer interviews/week seeding 30% of roadmap items"
          ]
        }
      ],
      "projects": [
        {
          "name": "0→1 Consumer Mobile App",
          "type": "Figma → React Native",
          "bullets": [
            "Led design from concept to launch; featured 'App of the Day' on iOS App Store",
            "4.8/5 from 10k reviews; 65% D30 retention at launch"
          ]
        }
      ],
      "awards": [
            {
                  "name": "App Store 'App of the Day'",
                  "issuer": "Apple App Store",
                  "date": "2022",
                  "description": "Led design of consumer mobile app receiving App Store editorial feature and 4.8/5 from 10k reviews."
            }
      ],
      "activities": [
            {
                  "organisation": "Design Leadership Vietnam",
                  "role": "Board Member",
                  "dates": "Aug 2019–Present",
                  "bullets": [
                        "Advised design teams at 3 early-stage startups on design system foundations and hiring",
                        "Co-authored Vietnam's first UX career framework; shared with 2,000+ designers via LinkedIn"
                  ]
            }
      ]
    }
  },
  "Sales Engineer": {
    "starter": {
      "name": "Cameron Tran",
      "title": "Sales Engineer Intern",
      "email": "cameron.tran.se@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/camerontran-se",
      "summary": "Technical business student who built a CRM integration demo that closed a mock enterprise deal in a university sales simulation. Comfortable bridging engineering specs and client requirements.",
      "experience": [
        {
          "company": "CRM SaaS Provider",
          "role": "Sales Engineer Intern",
          "dates": "Jun–Sep 2024",
          "bullets": [
            "Delivered 8 technical product demos to mid-market prospects; 3 converted to paid trials",
            "Built a Salesforce integration demo that became the go-to asset for the enterprise sales team",
            "Documented 15 competitive objection-handling responses reducing average AE deal cycle by 1 week"
          ]
        }
      ],
      "projects": [
        {
          "name": "B2B GTM Strategy Plan",
          "type": "Capstone Consulting",
          "bullets": [
            "Developed 12-month GTM strategy for cybersecurity product entering Vietnamese SME market",
            "Modelled quota-attainment scenarios across 3 pricing strategies; presented to industry judge panel"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best B2B GTM Strategy",
                  "issuer": "RMIT Business Case Finals",
                  "date": "2024",
                  "description": "12-month cybersecurity GTM plan awarded best overall strategy by an industry judge panel."
            }
      ],
      "activities": [
            {
                  "organisation": "RMIT Entrepreneurship Club",
                  "role": "VP Sales & Partnerships",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Built 5 industry partnerships supporting $15k in university event funding",
                        "Coached 8 startup teams on B2B sales pitch delivery and objection handling"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Cameron Tran",
      "title": "Sales Development Representative",
      "email": "cameron.tran.se@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/camerontran-se",
      "summary": "SDR consistently at 120% of monthly quota. Generated $1.2M qualified pipeline over 12 months. Expert in technical discovery calls, Outreach sequences, and multi-threaded enterprise prospecting.",
      "experience": [
        {
          "company": "Cloud Infrastructure Co",
          "role": "Sales Development Representative",
          "dates": "Feb 2023–Present",
          "bullets": [
            "Achieved 120% of monthly booked-meeting quota generating $1.2M qualified pipeline over 12 months",
            "Ran technical discovery calls with IT Directors and CTOs to qualify requirements for AE handoff",
            "Rebuilt Outreach sequences boosting open rates from 18% to 31% and reply rates from 4% to 11%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Outbound Playbook",
          "type": "Sales Enablement",
          "bullets": [
            "Co-wrote prospecting playbook; standardised scripts and objection-handling across SDR team",
            "New-hire ramp time dropped from 6 weeks to 4 weeks after rollout"
          ]
        }
      ],
      "awards": [
            {
                  "name": "President's Club – SDR",
                  "issuer": "Cloud Infrastructure Co",
                  "date": "2023",
                  "description": "Achieved 120% of annual booked-meeting quota, generating $1.2M qualified pipeline."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam SaaS Sales Network",
                  "role": "Community Builder",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Founded a 400+ member LinkedIn group for SDRs and AEs in Vietnamese tech",
                        "Organized monthly cold-call critique sessions with guest speakers from top SaaS companies"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Cameron Tran",
      "title": "Enterprise Account Executive",
      "email": "cameron.tran.se@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/camerontran-se",
      "summary": "Elite AE with 6 years closing complex enterprise deals. Closed $2.5M new ARR in 2023 (140% quota). President's Club 3 consecutive years. Expert in multi-stakeholder buying cycles and partner ecosystems.",
      "experience": [
        {
          "company": "Data Security Corp",
          "role": "Enterprise Account Executive",
          "dates": "Mar 2018–Present",
          "bullets": [
            "Closed $2.5M new ARR in 2023 at 140% quota; earned President's Club for third consecutive year",
            "Led 6-month enterprise sales cycles coordinating Sales Engineering, Legal, and Product for Fortune 500 accounts",
            "Built 3 strategic reseller partnerships expanding APAC market share by 15%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Value-Based Selling Methodology",
          "type": "Sales Leadership",
          "bullets": [
            "Pioneered framework adopted by the APAC sales team of 12 reps",
            "Mentored 3 junior AEs; each closed their first 6-figure deal within 6 months of coaching"
          ]
        }
      ],
      "awards": [
            {
                  "name": "President's Club",
                  "issuer": "Data Security Corp",
                  "date": "2023",
                  "description": "Recognized for 3 consecutive years at 140%+ quota and closing $2.5M new ARR."
            }
      ],
      "activities": [
            {
                  "organisation": "APAC Enterprise Sales Forum",
                  "role": "Advisory Speaker",
                  "dates": "Mar 2018–Present",
                  "bullets": [
                        "Keynote speaker at 2 annual sales leadership summits on multi-stakeholder enterprise deal strategy",
                        "Mentored 3 junior AEs to their first 6-figure closes within 6 months of coaching"
                  ]
            }
      ]
    }
  },
  "Solutions Architect": {
    "starter": {
      "name": "Minh Truong",
      "title": "Solutions Architect Intern",
      "email": "minh.truong.sa@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/minhtruong-sa",
      "summary": "Cloud-focused IT student with AWS Cloud Practitioner certification. Designed a 3-tier architecture for a university project supporting 500 concurrent users on AWS Free Tier.",
      "experience": [
        {
          "company": "AWS Consulting Partner",
          "role": "Cloud Solutions Intern",
          "dates": "Jun–Aug 2024",
          "bullets": [
            "Assisted in designing AWS reference architectures for 3 SME clients, reducing projected infra costs 20%",
            "Created 6 architecture diagrams and flow documentation for client-facing workshops",
            "Researched and summarised AWS Well-Architected Framework recommendations for internal knowledge base"
          ]
        }
      ],
      "projects": [
        {
          "name": "3-Tier AWS Architecture",
          "type": "Academic · AWS",
          "bullets": [
            "Designed scalable architecture for a food-delivery app supporting 500 concurrent users on AWS Free Tier",
            "Achieved 99.9% simulated availability using Multi-AZ RDS and ALB"
          ]
        }
      ],
      "awards": [
            {
                  "name": "AWS Certified Cloud Practitioner",
                  "issuer": "Amazon Web Services",
                  "date": "2024",
                  "description": "Achieved certification while completing TA responsibilities and a 3-tier AWS university project."
            }
      ],
      "activities": [
            {
                  "organisation": "Cloud Students Vietnam",
                  "role": "AWS Community Builder",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Ran 3 AWS free-tier hands-on labs for 45 IT students",
                        "Organized a cloud study group preparing 12 students for AWS Cloud Practitioner certification"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Minh Truong",
      "title": "Solutions Architect",
      "email": "minh.truong.sa@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/minhtruong-sa",
      "summary": "Solutions architect with 2 years designing cloud solutions for enterprise clients. Delivered 5 client architectures saving an average 25% in projected operating costs. AWS Solutions Architect Associate certified.",
      "experience": [
        {
          "company": "Accenture Vietnam",
          "role": "Cloud Solutions Architect",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Designed AWS architectures for 5 enterprise clients averaging 25% reduction in projected operating costs",
            "Led technical discovery workshops with CTO and IT directors to map current-state and future-state architectures",
            "Created reusable Terraform modules adopted by the practice to accelerate client engagements by 30%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Hybrid Cloud Migration Blueprint",
          "type": "Enterprise Architecture",
          "bullets": [
            "Designed a phased migration roadmap for a 50-server on-premise environment to AWS hybrid cloud",
            "Zero production downtime during 6-month migration; client achieved SOC 2 Type II certification post-migration"
          ]
        }
      ],
      "awards": [
            {
                  "name": "AWS Solutions Architect – Associate",
                  "issuer": "Amazon Web Services",
                  "date": "2023",
                  "description": "Achieved professional certification while managing 5 active enterprise client architecture engagements."
            }
      ],
      "activities": [
            {
                  "organisation": "AWS User Group Vietnam",
                  "role": "Core Organizer",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Organized 4 AWS community days with 300+ cumulative registrations",
                        "Published 5 well-architected review guides downloaded 1,200+ times"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Minh Truong",
      "title": "Senior Solutions Architect",
      "email": "minh.truong.sa@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/minhtruong-sa",
      "summary": "Senior solutions architect with 5 years winning and delivering $10M+ enterprise cloud engagements. Expert in pre-sales, cloud-native design, and cross-functional technical leadership.",
      "experience": [
        {
          "company": "Google Cloud",
          "role": "Senior Solutions Architect",
          "dates": "Jun 2019–Present",
          "bullets": [
            "Led technical pre-sales for $10M+ enterprise deals across FSI and retail sectors in Southeast Asia",
            "Designed multi-cloud architecture for a national bank processing $2B in daily transactions",
            "Developed 3 industry-specific reference architectures adopted by Google Cloud APAC practice"
          ]
        }
      ],
      "projects": [
        {
          "name": "AI-Ready Data Platform",
          "type": "Strategic Architecture · BigQuery + Vertex AI",
          "bullets": [
            "Architected enterprise data platform enabling ML model training at petabyte scale",
            "Platform used as Google Cloud APAC case study at Google Next 2024"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Google Cloud APAC Case Study",
                  "issuer": "Google Cloud",
                  "date": "2024",
                  "description": "AI-Ready Data Platform featured at Google Next 2024 as the APAC gold standard architecture."
            }
      ],
      "activities": [
            {
                  "organisation": "Google Cloud Champions Program",
                  "role": "Regional Champion",
                  "dates": "Jun 2019–Present",
                  "bullets": [
                        "Recognized as one of 20 APAC Regional Champions for cloud advocacy and customer success",
                        "Mentored 3 junior architects now leading their own $1M+ cloud engagements"
                  ]
            }
      ]
    }
  },
  "Partnerships Lead": {
    "starter": {
      "name": "Riley Pham",
      "title": "Partnerships Intern",
      "email": "riley.pham.partner@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/rileypham-bd",
      "summary": "Entrepreneurial business student who co-founded a university sponsorship programme securing 5 corporate partners and $15k in event funding. Strong relationship-builder with CRM experience.",
      "experience": [
        {
          "company": "Tech Events VN",
          "role": "Partnerships Intern",
          "dates": "Jun–Sep 2024",
          "bullets": [
            "Reached out to 50 target sponsors via LinkedIn and email; converted 8 into confirmed event partners",
            "Managed the sponsor fulfilment tracker in HubSpot ensuring 100% on-time deliverable completion",
            "Supported 3 post-event NPS surveys achieving average partnership satisfaction score of 4.6/5"
          ]
        }
      ],
      "projects": [
        {
          "name": "University Sponsorship Programme",
          "type": "0→1 Initiative",
          "bullets": [
            "Secured 5 corporate partners and $15k in funding for the annual tech fair",
            "Created the sponsor deck template still used by the student union"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best Partnerships Initiative",
                  "issuer": "Vietnam National Tech Fair",
                  "date": "2024",
                  "description": "University Sponsorship Programme recognized for securing 5 corporate partners and $15k in event funding."
            }
      ],
      "activities": [
            {
                  "organisation": "Student Entrepreneurship Network Vietnam",
                  "role": "Partnerships Chair",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Secured 5 corporate sponsors generating $15k in annual event funding",
                        "Facilitated 3 mentorship pairings between students and industry professionals"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Riley Pham",
      "title": "Partnerships Manager",
      "email": "riley.pham.partner@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/rileypham-bd",
      "summary": "Partnerships manager with 2 years building and managing 20+ strategic tech alliances. Generated $800k in partner-influenced revenue and reduced partner onboarding time from 8 weeks to 3.",
      "experience": [
        {
          "company": "Fintech Startup VN",
          "role": "Partnerships Manager",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Closed and managed 20+ strategic integrations with payment providers, banks, and API aggregators",
            "Partnership-influenced revenue grew from $0 to $800k in 18 months",
            "Reduced partner onboarding time from 8 weeks to 3 by building a self-serve integration hub"
          ]
        }
      ],
      "projects": [
        {
          "name": "Partner Portal",
          "type": "Cross-Functional Product",
          "bullets": [
            "Collaborated with engineering to launch a self-serve partner dashboard; 15 partners onboarded in Month 1",
            "Reduced integration support tickets by 60%"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Partnership Innovation Award",
                  "issuer": "Fintech Vietnam Association",
                  "date": "2023",
                  "description": "Recognized for growing partnership-influenced revenue from $0 to $800k in 18 months."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam Fintech Alliance",
                  "role": "Member & Working Group Lead",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Led a 15-member working group defining integration standards for payment API partnerships",
                        "Represented organization at 2 ASEAN fintech forums connecting 300+ ecosystem players"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Riley Pham",
      "title": "Head of Partnerships",
      "email": "riley.pham.partner@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/rileypham-bd",
      "summary": "Head of Partnerships with 5 years building ecosystem strategies at Series B–D companies. Grew partner network from 12 to 80 in 3 years; partner channel now drives 35% of total ARR.",
      "experience": [
        {
          "company": "SaaS Scale-Up",
          "role": "Head of Partnerships",
          "dates": "Mar 2019–Present",
          "bullets": [
            "Grew partner network from 12 to 80 in 3 years; partner channel now contributes 35% of total ARR",
            "Negotiated 3 OEM agreements generating $1.5M incremental recurring revenue",
            "Built and led a 4-person partnerships team from scratch; average tenure 2.5 years with zero attrition"
          ]
        }
      ],
      "projects": [
        {
          "name": "Partner Ecosystem Strategy",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined 3-tier partner programme (Referral, Reseller, OEM) with clear commercial terms and support tiers",
            "Playbook adopted as the company's go-to-market standard for new geographic expansions"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Top 40 Under 40 – Business Development",
                  "issuer": "Việt Nam Business Review",
                  "date": "2022",
                  "description": "Recognized for growing partner network from 12 to 80 and driving 35% of total ARR via partner channel."
            }
      ],
      "activities": [
            {
                  "organisation": "APAC Partnerships Leaders Forum",
                  "role": "Founding Member",
                  "dates": "Mar 2019–Present",
                  "bullets": [
                        "Co-founded a 60-member CXO-level partnerships leadership community across 8 APAC markets",
                        "Organized annual summit attracting 150 ecosystem leaders to discuss OEM and reseller strategy"
                  ]
            }
      ]
    }
  },
  "Operations": {
    "starter": {
      "name": "Riley Vo",
      "title": "Operations Intern",
      "email": "riley.vo.ops@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/rileyvo-ops",
      "summary": "Process-oriented student who automated a weekly inventory report in Zapier + Google Sheets, saving 5 hours of manual work. Comfortable with SOP writing, root-cause analysis, and data entry.",
      "experience": [
        {
          "company": "E-Commerce Fulfilment Co",
          "role": "Operations Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Automated weekly inventory reporting in Zapier + Sheets, saving 5 hours of manual work per week",
            "Analysed warehouse picking routes and recommended aisle rearrangement cutting average fulfilment time 10%",
            "Audited vendor SLAs for 8 suppliers; flagged 3 critical breaches enabling renegotiations saving $20k/year"
          ]
        }
      ],
      "projects": [
        {
          "name": "Supply Chain Cost Simulation",
          "type": "Academic · Excel Solver",
          "bullets": [
            "Modelled 4-warehouse distribution network to minimise logistics costs",
            "Identified optimal hub reducing simulated shipping costs by 12%"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Ops Excellence Award",
                  "issuer": "FTU Student Operations Club",
                  "date": "2024",
                  "description": "Supply Chain Cost Simulation ranked top project in Operations Management for actionable cost insights."
            }
      ],
      "activities": [
            {
                  "organisation": "FTU Operations Management Club",
                  "role": "Events Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Organized 4 industry speaker sessions on supply chain and process optimization",
                        "Managed event logistics for the annual Student Business Summit with 300+ attendees"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Riley Vo",
      "title": "Operations Specialist",
      "email": "riley.vo.ops@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/rileyvo-ops",
      "summary": "Ops specialist with 2 years at a high-growth ride-hailing startup. Cut driver onboarding SLA from 5 days to 2 and maintained 15+ SOPs for a 40-person customer success team.",
      "experience": [
        {
          "company": "RideHailing Startup",
          "role": "Operations Specialist",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Automated driver onboarding via CRM workflows cutting SLA from 5 days to 2 days with 3 manual steps removed",
            "Monitored real-time SLA compliance via Metabase; proactively re-routed escalated tickets reducing breaches 25%",
            "Authored and maintained 15+ SOPs for a 40-person CS team ensuring consistency across shifts"
          ]
        }
      ],
      "projects": [
        {
          "name": "Zendesk Implementation",
          "type": "Cross-Functional Rollout",
          "bullets": [
            "Configured ticketing system replacing fragmented Slack-based process",
            "Average incident resolution time dropped from 48 hours to 32 hours within 8 weeks of go-live"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Process Improvement Champion",
                  "issuer": "RideHailing Startup",
                  "date": "2023",
                  "description": "Recognized for cutting driver onboarding SLA from 5 days to 2, eliminating 3 manual steps."
            }
      ],
      "activities": [
            {
                  "organisation": "Lean Six Sigma Vietnam Chapter",
                  "role": "Green Belt Member",
                  "dates": "Jun 2022–Present",
                  "bullets": [
                        "Contributed to 3 Lean process improvement workshops attended by 120+ operations professionals",
                        "Led a Green Belt study group preparing 8 colleagues for Lean Six Sigma certification"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Riley Vo",
      "title": "Operations Manager",
      "email": "riley.vo.ops@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/rileyvo-ops",
      "summary": "Operations manager with 6 years scaling tech companies from Series A to IPO-ready. Built ops from 5 to 60 headcount, managed $3M budget, and applied Lean Six Sigma to cut processing errors 40%.",
      "experience": [
        {
          "company": "FinTech Scaleup",
          "role": "Head of Operations",
          "dates": "Feb 2019–Present",
          "bullets": [
            "Scaled operations from 5 to 60 headcount while managing $3M annual budget and maintaining unit economics",
            "Led ERP implementation across 4 business units improving gross margins 8% through process automation",
            "Applied Lean Six Sigma to the transaction pipeline reducing processing errors 40% and saving $600k/year"
          ]
        }
      ],
      "projects": [
        {
          "name": "3-Market Expansion Playbook",
          "type": "Strategic Operations",
          "bullets": [
            "Designed operational blueprint for launching in Thailand, Indonesia, and Philippines",
            "Achieved operational readiness 3 weeks ahead of schedule across all 3 markets"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Ops Leader of the Year",
                  "issuer": "FinTech Scaleup Excellence Awards",
                  "date": "2022",
                  "description": "Recognized for scaling operations from 5 to 60 headcount and cutting processing errors 40% via Lean Six Sigma."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam Operations Leaders Network",
                  "role": "Advisory Board Member",
                  "dates": "Feb 2019–Present",
                  "bullets": [
                        "Mentored 5 operations managers at Series A-B startups on building scalable ops functions",
                        "Spoke at 2 operations excellence summits on ERP implementation and FinOps best practices"
                  ]
            }
      ]
    }
  },
  "AI/ML Engineer": {
    "starter": {
      "name": "Quang Tran",
      "title": "AI/ML Research Intern",
      "email": "quang.tran.ai@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/quangtran-ai",
      "summary": "CS student specialising in NLP and deep learning. Fine-tuned Llama-2-7B via LoRA on a custom dataset, achieving 15% accuracy uplift over GPT-3.5 baseline. Comfortable with PyTorch and HuggingFace.",
      "experience": [
        {
          "company": "HUST AI Research Lab",
          "role": "Research Assistant",
          "dates": "Sep 2023–May 2024",
          "bullets": [
            "Fine-tuned Llama-2-7B via LoRA on 10k customer support examples; 15% accuracy uplift over GPT-3.5 baseline",
            "Scraped and cleaned 50k+ web documents using BeautifulSoup + Pandas to build a proprietary training corpus",
            "Presented efficiency trade-offs between LoRA and full fine-tuning at the department monthly seminar"
          ]
        }
      ],
      "projects": [
        {
          "name": "Legal Document RAG Chatbot",
          "type": "LangChain + Pinecone + OpenAI",
          "bullets": [
            "RAG pipeline ingesting 200+ PDFs into a vector store achieving 87% answer accuracy on human-labelled eval set",
            "Deployed on Hugging Face Spaces with 300+ interactions in first month"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Top 15% – Vietnamese NLP Leaderboard",
                  "issuer": "AI Challenge Vietnam",
                  "date": "2024",
                  "description": "RAG chatbot ranked top 15% for answer accuracy among 200+ competing AI projects."
            }
      ],
      "activities": [
            {
                  "organisation": "HUST AI Research Society",
                  "role": "Research Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Organized 6 paper-reading sessions on LLMs and retrieval-augmented generation for 40+ members",
                        "Mentored 3 junior students through their first ML project submissions"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Quang Tran",
      "title": "Machine Learning Engineer",
      "email": "quang.tran.ai@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/quangtran-ai",
      "summary": "ML engineer with 2 years deploying models to production at a retail analytics company. Reduced inference latency 40% and shipped an automated retraining pipeline maintaining accuracy within 2% monthly.",
      "experience": [
        {
          "company": "Smart Retail Analytics",
          "role": "ML Engineer",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Deployed product-recommendation model via FastAPI + Docker serving 100 RPS at <50ms p99 latency",
            "Reduced inference latency 40% through ONNX quantisation and batch-inference optimisation",
            "Built automated retraining pipeline triggered on data drift; model accuracy maintained within 2% variance monthly"
          ]
        }
      ],
      "projects": [
        {
          "name": "MLOps Monitoring Dashboard",
          "type": "MLflow + Grafana",
          "bullets": [
            "Real-time model health dashboard tracking accuracy, latency, and data-drift metrics",
            "Reduced time-to-detect model degradation from 2 weeks to 24 hours"
          ]
        }
      ],
      "awards": [
            {
                  "name": "ML Engineering Excellence Award",
                  "issuer": "Smart Retail Analytics",
                  "date": "2023",
                  "description": "Recognized for reducing inference latency 40% and building automated retraining pipeline maintaining 2% accuracy variance."
            }
      ],
      "activities": [
            {
                  "organisation": "MLOps Vietnam Community",
                  "role": "Core Contributor",
                  "dates": "2022–Present",
                  "bullets": [
                        "Published 4 articles on production ML and model monitoring reaching 3k+ monthly readers",
                        "Organized 3 hands-on MLflow and FastAPI workshops for 80+ ML practitioners"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Quang Tran",
      "title": "Senior AI/ML Engineer",
      "email": "quang.tran.ai@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/quangtran-ai",
      "summary": "Senior AI/ML engineer with 5 years architecting large-scale intelligent systems. Led a research team building a proprietary Vietnamese-language foundation model. Cut cloud inference costs 35%.",
      "experience": [
        {
          "company": "AI-First Enterprise",
          "role": "Lead ML Engineer",
          "dates": "Mar 2019–Present",
          "bullets": [
            "Architected AWS SageMaker + Kubernetes ML platform serving 15 models at >99.9% availability",
            "Led 4-person research team developing foundational model optimised for Vietnamese and Thai text",
            "Reduced annual cloud inference spend 35% through quantisation, pruning, and GPU scheduling optimisation"
          ]
        }
      ],
      "projects": [
        {
          "name": "AI Safety Guardrail Framework",
          "type": "Applied Research",
          "bullets": [
            "Designed multi-layer content-safety guardrails and bias-detection tests for all text-generation endpoints",
            "Whitepaper published internally; adopted as AI safety standard across 3 subsidiaries"
          ]
        }
      ],
      "awards": [
            {
                  "name": "AI Innovator of the Year",
                  "issuer": "Vietnam AI Summit",
                  "date": "2022",
                  "description": "Recognized for architecting ML platform serving 15 models at >99.9% availability and cutting cloud costs 35%."
            }
      ],
      "activities": [
            {
                  "organisation": "AI Research Vietnam Guild",
                  "role": "Advisory Researcher",
                  "dates": "Mar 2019–Present",
                  "bullets": [
                        "Peer-reviewed 10+ research papers on NLP and Vietnamese-language AI submitted to EMNLP and ACL",
                        "Mentored 4 researchers who published their work at tier-1 AI conferences"
                  ]
            }
      ]
    }
  },
  "AI Product Manager": {
    "starter": {
      "name": "Alex Hoang",
      "title": "AI Product Manager Intern",
      "email": "alex.hoang.aipm@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/alexhoang-aipm",
      "summary": "PM student fascinated by LLM applications. Shipped a ChatGPT-powered feature request classifier in a university hackathon, saving 3 hours/week of manual triage for a 10-person support team.",
      "experience": [
        {
          "company": "AI SaaS Startup",
          "role": "AI Product Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Defined acceptance criteria and evaluation rubrics for an AI summarisation feature shipped to 500 beta users",
            "Partnered with ML team to design A/B test comparing 2 prompt strategies; winner lifted task completion 18%",
            "Maintained an AI model performance tracker in Notion; flagged 2 accuracy regressions before customer escalation"
          ]
        }
      ],
      "projects": [
        {
          "name": "Support Ticket Classifier",
          "type": "Hackathon · GPT-4 + Zapier",
          "bullets": [
            "Fine-tuned classification prompt reducing mis-routed tickets from 35% to 8% in 48-hour hackathon",
            "Ranked 2nd of 24 teams; live demo adopted by the company Ops team"
          ]
        }
      ],
      "awards": [
            {
                  "name": "2nd Place – AI Hackathon",
                  "issuer": "AI SaaS Startup Internal Hackathon",
                  "date": "2024",
                  "description": "Support Ticket Classifier ranked 2nd of 24 teams; live demo adopted by ops team for daily use."
            }
      ],
      "activities": [
            {
                  "organisation": "PM School Vietnam",
                  "role": "AI Track Lead",
                  "dates": "Sep 2023–Present",
                  "bullets": [
                        "Led curriculum design for an AI Product Management bootcamp with 30 participants",
                        "Mentored 5 aspiring PMs on writing evals, PRDs, and AI product positioning"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Alex Hoang",
      "title": "AI Product Manager",
      "email": "alex.hoang.aipm@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/alexhoang-aipm",
      "summary": "AI PM with 2 years owning LLM-powered product features. Launched an AI writing assistant with 78% weekly active usage rate. Expert at evals, prompt strategy, and translating ML constraints into roadmap.",
      "experience": [
        {
          "company": "B2B SaaS Co",
          "role": "AI Product Manager",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Launched AI writing assistant used by 3,000 active businesses; 78% weekly active usage rate in Month 3",
            "Defined eval framework (BLEU, human ratings) reducing model regression incidents from monthly to quarterly",
            "Ran 4 prompt-strategy A/B tests; winner reduced hallucination rate from 12% to 3%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Responsible AI Guidelines",
          "type": "Internal Policy",
          "bullets": [
            "Authored company-wide AI product guidelines covering transparency, fairness, and user consent",
            "Adopted by 3 product squads; cited in SOC 2 Type II documentation"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Product Innovation Award",
                  "issuer": "B2B SaaS Co",
                  "date": "2023",
                  "description": "Recognized for launching AI writing assistant achieving 78% weekly active usage rate in Month 3."
            }
      ],
      "activities": [
            {
                  "organisation": "AI Product Managers Vietnam",
                  "role": "Chapter Founder",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Founded community now with 500+ members; organized 5 events on AI product management",
                        "Published a guide on responsible AI roadmapping downloaded 1,800+ times on Notion"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Alex Hoang",
      "title": "Senior AI Product Manager",
      "email": "alex.hoang.aipm@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/alexhoang-aipm",
      "summary": "Senior AI PM with 5 years shipping AI/ML products at scale. Led the AI roadmap for a platform with 500k users; AI features drove 40% of expansion revenue. Expert in eval design, AI ethics, and ML team leadership.",
      "experience": [
        {
          "company": "Enterprise AI Platform",
          "role": "Senior AI Product Manager",
          "dates": "Apr 2019–Present",
          "bullets": [
            "Led AI roadmap across 4 product lines; AI features drove 40% of expansion revenue ($3M ARR)",
            "Partnered with research team to productise a proprietary NLP model; 92% customer satisfaction in pilot",
            "Hired and structured an AI PM function from 1 to 4 PMs; established eval and red-teaming standards"
          ]
        }
      ],
      "projects": [
        {
          "name": "AI Feature Governance Framework",
          "type": "Strategic Initiative",
          "bullets": [
            "Created launch checklist (bias audit, eval benchmarks, rollback plan) for all AI feature releases",
            "Zero critical AI-related customer escalations in 18 months post-implementation"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Top AI PM of the Year",
                  "issuer": "SaaS Vietnam Excellence Awards",
                  "date": "2022",
                  "description": "Recognized for leading AI roadmap where AI features drove 40% of expansion revenue ($3M ARR)."
            }
      ],
      "activities": [
            {
                  "organisation": "Global AI Product Leadership Forum",
                  "role": "Advisory Member",
                  "dates": "Apr 2019–Present",
                  "bullets": [
                        "Spoke at 2 global AI product conferences on responsible AI productisation to 600+ attendees",
                        "Mentored 4 AI PMs; 2 now lead AI product functions at Series C+ companies"
                  ]
            }
      ]
    }
  },
  "Prompt Engineer": {
    "starter": {
      "name": "Chris Le",
      "title": "Prompt Engineering Intern",
      "email": "chris.le.prompt@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/chrisle-prompt",
      "summary": "AI-curious student who improved GPT-4 customer support response accuracy from 62% to 84% through systematic prompt iteration. Familiar with chain-of-thought prompting, few-shot learning, and RAG basics.",
      "experience": [
        {
          "company": "AI Support Startup",
          "role": "Prompt Engineering Intern",
          "dates": "Jun–Aug 2024",
          "bullets": [
            "Iterated 30+ prompt variants for a customer support bot; improved response accuracy from 62% to 84%",
            "Documented prompt versioning system in Notion enabling team to track and roll back prompt changes",
            "Ran evaluation experiments comparing zero-shot, few-shot, and CoT prompts across 3 use cases"
          ]
        }
      ],
      "projects": [
        {
          "name": "Prompt Library",
          "type": "Personal · GitHub",
          "bullets": [
            "Curated 80+ reusable prompt templates across 12 use cases; 200 GitHub stars",
            "Published evaluation rubrics for comparing prompt performance across LLM providers"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Best AI Tool",
                  "issuer": "Vietnam Prompt Engineering Challenge",
                  "date": "2024",
                  "description": "Prompt Library recognised for quality and breadth of 80+ reusable templates with 200 GitHub stars."
            }
      ],
      "activities": [
            {
                  "organisation": "AI Builders Club Vietnam",
                  "role": "Prompt Engineering Lead",
                  "dates": "Sep 2023–Present",
                  "bullets": [
                        "Organized 4 practical workshops on prompt patterns and LLM evaluation for 60+ members",
                        "Maintained a shared prompt library used as a learning resource by the entire club"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Chris Le",
      "title": "Prompt Engineer",
      "email": "chris.le.prompt@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/chrisle-prompt",
      "summary": "Prompt engineer with 2 years owning the AI content layer for a media platform. Improved output quality 35% via structured reasoning prompts and reduced hallucination rate from 15% to 4%.",
      "experience": [
        {
          "company": "AI Media Platform",
          "role": "Prompt Engineer",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Owned the prompt layer for 5 AI content features serving 50k daily users; improved quality 35% via structured reasoning",
            "Reduced content hallucination rate from 15% to 4% through retrieval-augmented prompt design",
            "Built a prompt eval harness running 500 test cases per deploy, catching regressions before release"
          ]
        }
      ],
      "projects": [
        {
          "name": "Multi-Model Eval Framework",
          "type": "Python + LangSmith",
          "bullets": [
            "Benchmarked GPT-4o, Claude 3, and Gemini across 8 task categories for content quality and latency",
            "Findings used to select primary LLM saving $18k/year in API costs"
          ]
        }
      ],
      "awards": [
            {
                  "name": "AI Impact Award",
                  "issuer": "AI Media Platform",
                  "date": "2023",
                  "description": "Recognized for improving AI content quality 35% and reducing hallucination rate from 15% to 4%."
            }
      ],
      "activities": [
            {
                  "organisation": "LangChain Vietnam User Group",
                  "role": "Core Organizer",
                  "dates": "Jan 2022–Present",
                  "bullets": [
                        "Organized 4 hands-on LangChain workshops with 120+ cumulative attendees",
                        "Published 6 tutorials on RAG architecture and prompt versioning with 4k+ combined readers"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Chris Le",
      "title": "Lead Prompt / AI Systems Engineer",
      "email": "chris.le.prompt@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/chrisle-prompt",
      "summary": "Lead prompt and AI systems engineer with 5 years architecting enterprise LLM applications. Designed a RAG system processing 1M documents/day. Reduced LLM operating costs 45% through caching and routing.",
      "experience": [
        {
          "company": "Enterprise AI Corp",
          "role": "Lead Prompt / AI Systems Engineer",
          "dates": "Mar 2019–Present",
          "bullets": [
            "Architected enterprise RAG system processing 1M documents/day with 95% answer accuracy on domain eval set",
            "Reduced LLM API spend 45% through semantic caching, model routing, and prompt compression",
            "Led a 3-person AI engineering guild defining prompt engineering standards across 8 product teams"
          ]
        }
      ],
      "projects": [
        {
          "name": "Agentic Workflow Platform",
          "type": "LangGraph + FastAPI",
          "bullets": [
            "Built orchestration layer enabling multi-step AI agents to complete complex research tasks autonomously",
            "Deployed in production for 200 enterprise clients; average task completion rate 88%"
          ]
        }
      ],
      "awards": [
            {
                  "name": "AI Engineering Excellence Award",
                  "issuer": "Enterprise AI Vietnam Summit",
                  "date": "2022",
                  "description": "Recognized for RAG system processing 1M documents/day at 95% accuracy and reducing LLM spend 45%."
            }
      ],
      "activities": [
            {
                  "organisation": "APAC Prompt & AI Systems Forum",
                  "role": "Founding Member",
                  "dates": "Mar 2019–Present",
                  "bullets": [
                        "Co-authored an industry white paper on enterprise RAG architecture downloaded 2,500+ times",
                        "Advisor to 3 AI startups on prompt systems and LLM cost optimization strategy"
                  ]
            }
      ]
    }
  },
  "Data Scientist": {
    "starter": {
      "name": "Thanh Nguyen",
      "title": "Data Science Intern",
      "email": "thanh.nguyen.ds@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/thanhnguyen-ds",
      "summary": "Statistics student with strong SQL, Python, and Tableau skills. Built a customer churn prediction model (82% accuracy) as a university project and presented top 5 business recommendations to real stakeholders.",
      "experience": [
        {
          "company": "National Retail Chain",
          "role": "Data Analyst Intern",
          "dates": "May–Aug 2024",
          "bullets": [
            "Cleaned and aggregated 50k+ sales records with Pandas to surface regional trends informing a $200k inventory reallocation",
            "Built Tableau dashboard tracking weekly KPIs for 12 store managers; eliminated a 3-hour Monday reporting ritual",
            "Wrote 15 complex SQL cohort queries revealing a 10% churn spike tied to a loyalty programme change"
          ]
        }
      ],
      "projects": [
        {
          "name": "Customer Churn Prediction",
          "type": "Python + sklearn · Kaggle",
          "bullets": [
            "Logistic regression achieving 82% accuracy; top 15% on Kaggle leaderboard",
            "Translated top 5 churn predictors into business recommendations presented at a university competition"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Top 15% – Kaggle Competition",
                  "issuer": "Kaggle",
                  "date": "2024",
                  "description": "Customer Churn Prediction model ranked top 15% globally; insights turned into 5 business recommendations presented to executives."
            }
      ],
      "activities": [
            {
                  "organisation": "Statistics & Data Science Society",
                  "role": "Analyst Lead",
                  "dates": "Sep 2022–May 2024",
                  "bullets": [
                        "Published monthly data analysis reports on campus trends distributed to 200+ students",
                        "Organized 3 Python and Tableau skill-building workshops for 60 attendees"
                  ]
            }
      ]
    },
    "developing": {
      "name": "Thanh Nguyen",
      "title": "Data Scientist",
      "email": "thanh.nguyen.ds@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/thanhnguyen-ds",
      "summary": "Data scientist with 2 years partnering with Product and Marketing to drive data-powered decisions. Built the A/B test framework that lifted conversion 8% and an attribution model improving ROAS 22%.",
      "experience": [
        {
          "company": "Tech Product Co",
          "role": "Data Scientist",
          "dates": "Jan 2023–Present",
          "bullets": [
            "Partnered with Product to analyse A/B results using proper stat-sig framework; findings drove redesign lifting conversion 8%",
            "Maintained 20+ dbt models powering the core BI layer; reduced pipeline failures from 12/month to 1",
            "Developed multi-touch attribution model reallocating $50k ad spend improving blended ROAS 22%"
          ]
        }
      ],
      "projects": [
        {
          "name": "Experimentation Platform",
          "type": "Python + Statsig",
          "bullets": [
            "Built internal A/B testing tool with correct sequential testing and power calculations",
            "Increased experiment throughput from 2 to 6 tests per month"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Data Science Award",
                  "issuer": "Tech Product Co",
                  "date": "2023",
                  "description": "Recognized for building A/B test framework lifting conversion 8% and improving blended ROAS 22%."
            }
      ],
      "activities": [
            {
                  "organisation": "Vietnam Data Science Community",
                  "role": "Content Lead",
                  "dates": "2022–Present",
                  "bullets": [
                        "Published 5 tutorial articles on AB testing and attribution modeling reaching 6k+ monthly readers",
                        "Organized a monthly 'Data Science Office Hours' session with 80+ members per event"
                  ]
            }
      ]
    },
    "ready": {
      "name": "Thanh Nguyen",
      "title": "Senior Data Scientist",
      "email": "thanh.nguyen.ds@gmail.com",
      "location": "Vietnam",
      "linkedin": "linkedin.com/in/thanhnguyen-ds",
      "summary": "Senior data scientist with 6 years at the intersection of advanced ML and executive strategy. Designed the ML credit-scoring model reducing defaults 12% annually. Led a Snowflake warehouse overhaul saving $200k.",
      "experience": [
        {
          "company": "FinTech Unicorn",
          "role": "Senior Data Scientist",
          "dates": "Mar 2018–Present",
          "bullets": [
            "Designed ML credit-scoring model reducing default rates 12% YoY and saving $4M in risk exposure",
            "Led 3-person squad overhauling the data warehouse to Snowflake; cut query costs 30% and improved reliability",
            "Presented predictive forecasting models to C-suite directly informing 2 major product pivots"
          ]
        }
      ],
      "projects": [
        {
          "name": "Data Democratisation Programme",
          "type": "Leadership + Enablement",
          "bullets": [
            "Led 10 workshops training 50+ non-technical employees to self-serve on Metabase",
            "Established data governance council enforcing strict schema contracts and PII handling standards"
          ]
        }
      ],
      "awards": [
            {
                  "name": "Data Leadership Award",
                  "issuer": "Vietnam FinTech Awards",
                  "date": "2022",
                  "description": "Recognized for designing ML credit-scoring model reducing defaults 12% and saving $4M in risk exposure."
            }
      ],
      "activities": [
            {
                  "organisation": "Data Science Vietnam – Advisory Board",
                  "role": "Board Member",
                  "dates": "Mar 2018–Present",
                  "bullets": [
                        "Advised on data literacy curriculum reaching 5,000+ data professionals through online courses",
                        "Keynote speaker at Data Conference Vietnam 2023 on responsible ML in financial services"
                  ]
            }
      ]
    }
  }
};