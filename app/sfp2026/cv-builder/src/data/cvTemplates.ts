import { DiagnosticLevel } from "../app/types";

export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
};

export type ProjectEntry = { name: string; type: string; bullets: string[] };

export type AwardEntry = { name: string; issuer: string; date: string; description?: string };
export type ActivityEntry = { organisation: string; role: string; dates: string; bullets?: string[] };

export type CVData = {
  name: string;
  title: string;
  email: string;
  location: string;
  linkedin: string;
  summary: string;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  awards?: AwardEntry[];
  activities?: ActivityEntry[];
};

export type TransformData = {
  stages: any[];
  checklistItems: string[];
  demoLabel?: string;
};

export const generateFallbackCV = (role: string, level: DiagnosticLevel): CVData => {
  const isStarter = level === "starter";
  const isReady = level === "ready";

  const prefix = isStarter ? "Intern" : isReady ? "Senior" : "Junior";
  const years = isStarter ? "student" : isReady ? "4 years" : "1.5 years";
  
  return {
    name: "Alex Nguyen",
    title: `${prefix} ${role}`,
    email: "alex.nguyen@example.com",
    location: "Vietnam",
    linkedin: `linkedin.com/in/alex-${role.toLowerCase().replace(/\s+/g, '-')}`,
    summary: `${prefix} ${role} with ${years} experience. Passionate about driving impact and solving complex problems in the ${role} space. Let the data speak for itself.`,
    experience: [
      {
        company: "Tech Innovators JSC",
        role: `${prefix} ${role}`,
        dates: isStarter ? "Jun 2024 - Aug 2024" : "Jan 2023 - Present",
        bullets: [
          `Spearheaded the core ${role} initiatives, delivering 25% faster time-to-market.`,
          `Collaborated with cross-functional teams to align ${role} deliverables.`,
          isStarter ? `Assisted senior members with daily ${role} tasks.` : `Mentored 2 junior members while owning the entire ${role} lifecycle.`
        ]
      },
      {
        company: "Local Startup",
        role: `${role.split(' ')[0]} Associate`,
        dates: isStarter ? "Jan 2023 - May 2023" : "Aug 2020 - Dec 2022",
        bullets: [
          `Optimized legacy systems specifically for the ${role} pipeline.`,
          `Reduced overhead by 15% through strategic ${role} audits.`
        ]
      }
    ],
    projects: [
      {
        name: `${role} Portfolio Showcase`,
        type: `Personal Project`,
        bullets: [
          `Architected a robust showcase of my skills as a ${role}.`,
          `Deployed an MVP that actively handles test traffic.`
        ]
      }
    ]
  };
};

export const CV_TEMPLATES: Record<string, any> = {
  "Software Engineering (SWE)": {
    "starter": {
      "name": "Minh Anh Nguyen",
      "title": "Software Engineer Intern",
      "email": "minhanh@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/minhanh-dev",
      "summary": "Computer Science final-year student at HUST with strong foundations in React and Node.js. Built 3 end-to-end web projects. Seeking first SWE role where I can contribute to production codebases.",
      "experience": [
        {
          "company": "FPT Software",
          "role": "Frontend Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Developed 4 responsive UI components in React for an enterprise logistics portal used by 200+ daily users",
            "Fixed 12 cross-browser CSS bugs identified in QA, reducing reported UI issues by 40%",
            "Wrote unit tests with Jest, raising component coverage from 20% to 55%"
          ]
        },
        {
          "company": "Tech Startup Club, HUST",
          "role": "Lead Developer",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Built a campus event booking platform using Next.js and Supabase, onboarding 300+ student users in Month 1",
            "Led weekly sprints with a 4-person team; merged 28 pull requests across 3 semesters",
            "Integrated Stripe API for ticketing, processing 50+ real transactions in beta"
          ]
        }
      ],
      "projects": [
        {
          "name": "AI Study Planner",
          "type": "Personal Project · React + Node.js",
          "bullets": [
            "Built a GPT-4-powered scheduler that auto-generates weekly study plans from uploaded syllabi",
            "Deployed on Vercel; 80+ active users from university forums"
          ]
        },
        {
          "name": "Real-time Chat App",
          "type": "Portfolio Project · Socket.io + MongoDB",
          "bullets": [
            "Architected full-stack chat app with JWT auth, supporting 50 concurrent WebSocket connections",
            "Implemented message persistence and read receipts"
          ]
        }
      ]
    },
    "developing": {
      "name": "Minh Anh Nguyen",
      "title": "Junior Software Engineer",
      "email": "minhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/minhanh-dev",
      "summary": "Junior SWE with 1.5 years building production microservices in TypeScript and AWS. Improved API performance 35% at current startup. Passionate about clean architecture and automated testing.",
      "experience": [
        {
          "company": "Teko Vietnam",
          "role": "Junior Backend Engineer",
          "dates": "Jan 2023 – Present",
          "bullets": [
            "Migrated 3 Express.js REST services to serverless AWS Lambda, reducing infra costs by 18%",
            "Optimised PostgreSQL query plans for the checkout service, dropping p95 latency from 320ms to 95ms",
            "Built GitHub Actions CI pipeline that cut average PR merge time from 2 days to 4 hours"
          ]
        },
        {
          "company": "Freelance",
          "role": "Full-Stack Developer",
          "dates": "Mar – Dec 2022",
          "bullets": [
            "Delivered 3 e-commerce sites for local SMEs using Next.js + Shopify, each launching within 4-week turnarounds",
            "Integrated VNPAY payment gateway and wrote end-to-end Cypress tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Open-Source API Rate Limiter",
          "type": "npm Package · TypeScript",
          "bullets": [
            "Published a Redis-backed rate-limiter middleware with 200+ weekly downloads on npm",
            "Maintained issues and merged community PRs within 48 hrs"
          ]
        },
        {
          "name": "Internal Dev Dashboard",
          "type": "Side Project · React + GraphQL",
          "bullets": [
            "Built an internal metrics dashboard tracking deploy frequency and DORA metrics used by 15 teammates"
          ]
        }
      ]
    },
    "ready": {
      "name": "Minh Anh Nguyen",
      "title": "Software Engineer",
      "email": "minhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/minhanh-dev",
      "summary": "Software Engineer with 3 years building scalable distributed systems. Led migration of a monolith to microservices, enabling the platform to handle 5× traffic. Now seeking a senior IC or tech-lead track role.",
      "experience": [
        {
          "company": "VNG Corporation",
          "role": "Software Engineer",
          "dates": "Feb 2022 – Present",
          "bullets": [
            "Spearheaded migration of the notification monolith to 4 independent Go microservices, scaling throughput to 50k events/sec",
            "Mentored 3 junior engineers through weekly code reviews, reducing production bug rate by 30%",
            "Defined team-wide API design standards adopted across 2 product squads"
          ]
        },
        {
          "company": "Teko Vietnam",
          "role": "Junior Software Engineer",
          "dates": "Aug 2020 – Jan 2022",
          "bullets": [
            "Built and shipped 5 core checkout features used by 2M+ monthly active users",
            "Drove test coverage from 30% to 75% through dedicated refactoring sprints"
          ]
        }
      ],
      "projects": [
        {
          "name": "Internal CLI Toolchain",
          "type": "Developer Productivity · Go",
          "bullets": [
            "Built a Go CLI used by 25 engineers to spin up local dev environments in <2 min",
            "Reduced new-engineer onboarding time from 3 days to half a day"
          ]
        },
        {
          "name": "Event-Sourcing Framework",
          "type": "Architecture · Kafka + Redis",
          "bullets": [
            "Designed internal event-sourcing pattern, adopted by 3 product squads as the standard for audit logging"
          ]
        }
      ]
    }
  },
  "Artificial Intelligence (AI) / Machine Learning (ML)": {
    "starter": {
      "name": "Linh Pham",
      "title": "AI/ML Research Intern",
      "email": "linh.pham@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-ai",
      "summary": "Data Science student at HUST with hands-on experience fine-tuning LLMs and building NLP pipelines. Published a research note on prompt engineering. Eager to deploy models at scale.",
      "experience": [
        {
          "company": "HUST AI Lab",
          "role": "Research Assistant",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Fine-tuned Llama-2-7B via LoRA on 10k customer support samples, achieving 15% accuracy uplift over GPT-3.5 baseline",
            "Scraped and cleaned 15k training rows using Python + BeautifulSoup; reduced label noise by 22% via manual audit",
            "Presented findings at the lab's monthly seminar to an audience of 30 researchers and faculty"
          ]
        },
        {
          "company": "Zalo AI",
          "role": "ML Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Evaluated 4 open-source embedding models on Vietnamese NLP benchmarks using MTEB",
            "Built data labelling pipeline in Label Studio that cut annotation time by 40%"
          ]
        }
      ],
      "projects": [
        {
          "name": "RAG Document Chatbot",
          "type": "Personal Project · LangChain + Pinecone",
          "bullets": [
            "Built a semantic document Q&A app using LangChain, Pinecone, and GPT-4; 60+ beta users",
            "Implemented chunk-level metadata filtering reducing off-topic answers by 35%"
          ]
        },
        {
          "name": "Vietnamese Sentiment Classifier",
          "type": "Kaggle/NLP Project",
          "bullets": [
            "Trained PhoBERT on 20k Vietnamese reviews; ranked top 15% on leaderboard"
          ]
        }
      ]
    },
    "developing": {
      "name": "Linh Pham",
      "title": "Junior ML Engineer",
      "email": "linh.pham@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-ai",
      "summary": "Junior ML Engineer with 1.5 years deploying computer vision and NLP models to production. Reduced inference cost 30% through quantization at current role. Focused on MLOps and model reliability.",
      "experience": [
        {
          "company": "VinAI Research",
          "role": "Junior ML Engineer",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Deployed real-time object detection models to Edge TPUs, reducing inference latency by 45ms",
            "Built automated MLflow retraining pipelines triggered by data drift alerts, cutting manual ML ops by 60%",
            "Applied INT8 quantization, reducing cloud inference costs by 30% with <1% accuracy drop"
          ]
        },
        {
          "company": "Freelance",
          "role": "AI Consultant",
          "dates": "Aug – Dec 2022",
          "bullets": [
            "Built a resume parsing service using spaCy NER for an HR-tech startup, processing 500 CVs/day"
          ]
        }
      ],
      "projects": [
        {
          "name": "Automated Content Moderation",
          "type": "Production System · PyTorch + FastAPI",
          "bullets": [
            "Built multi-modal NLP + Vision classifier handling 2M uploads/day with 94.5% accuracy"
          ]
        },
        {
          "name": "Demand Forecasting Engine",
          "type": "Hackathon Winner · LightGBM",
          "bullets": [
            "Won 1st place in a 48-hr ML hackathon by building a store-level demand forecast with 9.3% MAPE"
          ]
        }
      ]
    },
    "ready": {
      "name": "Linh Pham",
      "title": "Machine Learning Engineer",
      "email": "linh.pham@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-ai",
      "summary": "ML Engineer with 3 years architecting MLOps platforms and GenAI features. Led the company's first LLM-powered product feature, boosting user engagement 25%. Skilled in full model lifecycle from training to serving.",
      "experience": [
        {
          "company": "MoMo Fintech",
          "role": "Machine Learning Engineer",
          "dates": "May 2021 – Present",
          "bullets": [
            "Architected the company's first GenAI feature (AI transaction summary), adopted by 500k users within launch week",
            "Established ML governance protocols preventing PII leakage across 3 internal LLM products",
            "Led a cross-functional pod of 5 ML engineers + 2 data engineers in 6-month roadmap delivery"
          ]
        },
        {
          "company": "VinAI Research",
          "role": "Junior ML Engineer",
          "dates": "Jan 2020 – Apr 2021",
          "bullets": [
            "Shipped 3 computer vision models to production across retail analytics use-cases"
          ]
        }
      ],
      "projects": [
        {
          "name": "LLM Evaluation Framework",
          "type": "Internal Tooling · Python",
          "bullets": [
            "Built an automated LLM evaluation harness used across 4 product squads, cutting eval time from 3 days to 2hrs"
          ]
        },
        {
          "name": "Fraud Detection Pipeline",
          "type": "Production ML · XGBoost + Kafka",
          "bullets": [
            "Re-architected real-time fraud scoring to stream-first, reducing false positives by 18%"
          ]
        }
      ]
    }
  },
  "Data Analytics (DA) & Business Intelligence (BI)": {
    "starter": {
      "name": "Thu Ha Tran",
      "title": "Data Analyst Intern",
      "email": "thuha@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/thuha-data",
      "summary": "Statistics graduate skilled in SQL, Python, and Tableau. Built 3 end-to-end analytics dashboards during internships. Passionate about uncovering insights that change product and business decisions.",
      "experience": [
        {
          "company": "Shopee Vietnam",
          "role": "Data Analyst Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Analysed seller acquisition funnel using SQL on BigQuery, identifying a 40% drop-off at Step 3 that was surfaced to the PM team",
            "Built a weekly Tableau dashboard tracking 8 seller KPIs, reducing data-request tickets by 25%",
            "Automated monthly reporting scripts using Python, saving 4 hrs of manual work per week"
          ]
        },
        {
          "company": "Uni Economics Club",
          "role": "Research Analyst",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led market research on F&B sector trends; data cited in a 60-page industry whitepaper",
            "Visualised survey responses from 200+ respondents into 3 executive-ready slides"
          ]
        }
      ],
      "projects": [
        {
          "name": "E-Commerce RFM Analysis",
          "type": "Python + Seaborn",
          "bullets": [
            "Segmented 5k customers by Recency-Frequency-Monetary value; identified high-value cohort with 2× purchase rate",
            "Presented recommendations in a Jupyter notebook report adopted as the club's template"
          ]
        },
        {
          "name": "Job Market Dashboard",
          "type": "Tableau Public",
          "bullets": [
            "Scraped and visualised 1,200 tech job postings; published dashboard with 300+ views"
          ]
        }
      ]
    },
    "developing": {
      "name": "Thu Ha Tran",
      "title": "Junior Data Analyst",
      "email": "thuha@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/thuha-data",
      "summary": "Junior Data Analyst with 1.5 years automating KPI pipelines and running A/B test evaluations. Uncovered retention insights that led to a product overhaul improving D30 retention by 8%.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Junior Data Analyst",
          "dates": "Jan 2023 – Present",
          "bullets": [
            "Discovered checkout drop-off patterns via Looker funnels leading to a navigation redesign that increased conversion by 12%",
            "Automated weekly C-suite KPI reports in Python, eliminating 6 hrs of manual spreadsheet work",
            "Defined event taxonomy for 3 new product features in collaboration with data engineers"
          ]
        },
        {
          "company": "Shopee Vietnam",
          "role": "Data Analyst Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported A/B test design and analysis for 5 marketing campaigns, surfacing statistical significance correctly"
          ]
        }
      ],
      "projects": [
        {
          "name": "Churn Prediction Model",
          "type": "Scikit-learn + Logistic Regression",
          "bullets": [
            "Built a churn classifier with 84% AUC; segmented at-risk users for targeted retention campaigns"
          ]
        },
        {
          "name": "dbt Data Model Migration",
          "type": "Analytics Engineering",
          "bullets": [
            "Converted 15 legacy Excel pivot reports to dbt models in Snowflake, cutting data freshness from D-1 to hourly"
          ]
        }
      ]
    },
    "ready": {
      "name": "Thu Ha Tran",
      "title": "Data Analyst",
      "email": "thuha@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/thuha-data",
      "summary": "Data Analyst with 3 years establishing metric frameworks and advising product strategy. Standardised attribution models across $2M in ad spend. Trusted partner to PMs, engineers, and marketing leadership.",
      "experience": [
        {
          "company": "MoMo Fintech",
          "role": "Data Analyst",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Standardised marketing attribution model covering $2M in monthly ad spend across 5 channels",
            "Advised CPO team on quarterly roadmap prioritisation using cohort retention data",
            "Built self-serve Looker Studio dashboards used by 40+ non-technical stakeholders weekly"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Junior Data Analyst",
          "dates": "Jul 2020 – Feb 2021",
          "bullets": [
            "Automated seller analytics pipelines used by 3 internal teams"
          ]
        }
      ],
      "projects": [
        {
          "name": "Modern Analytics Stack Migration",
          "type": "dbt + Snowflake + Tableau",
          "bullets": [
            "Led migration from manual Excel reports to automated dbt models — reducing report generation from 1 day to 20 min"
          ]
        },
        {
          "name": "Growth Experiment Tracker",
          "type": "Internal Tool · SQL + Retool",
          "bullets": [
            "Built A/B test tracking dashboard adopted as the team's standard experimentation workspace"
          ]
        }
      ]
    }
  },
  "Data Engineering": {
    "starter": {
      "name": "Linh Pham",
      "title": "AI/ML Research Intern",
      "email": "linh.pham@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-ai",
      "summary": "Data Science student at HUST with hands-on experience fine-tuning LLMs and building NLP pipelines. Published a research note on prompt engineering. Eager to deploy models at scale.",
      "experience": [
        {
          "company": "HUST AI Lab",
          "role": "Research Assistant",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Fine-tuned Llama-2-7B via LoRA on 10k customer support samples, achieving 15% accuracy uplift over GPT-3.5 baseline",
            "Scraped and cleaned 15k training rows using Python + BeautifulSoup; reduced label noise by 22% via manual audit",
            "Presented findings at the lab's monthly seminar to an audience of 30 researchers and faculty"
          ]
        },
        {
          "company": "Zalo AI",
          "role": "ML Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Evaluated 4 open-source embedding models on Vietnamese NLP benchmarks using MTEB",
            "Built data labelling pipeline in Label Studio that cut annotation time by 40%"
          ]
        }
      ],
      "projects": [
        {
          "name": "RAG Document Chatbot",
          "type": "Personal Project · LangChain + Pinecone",
          "bullets": [
            "Built a semantic document Q&A app using LangChain, Pinecone, and GPT-4; 60+ beta users",
            "Implemented chunk-level metadata filtering reducing off-topic answers by 35%"
          ]
        },
        {
          "name": "Vietnamese Sentiment Classifier",
          "type": "Kaggle/NLP Project",
          "bullets": [
            "Trained PhoBERT on 20k Vietnamese reviews; ranked top 15% on leaderboard"
          ]
        }
      ]
    },
    "developing": {
      "name": "Linh Pham",
      "title": "Junior ML Engineer",
      "email": "linh.pham@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-ai",
      "summary": "Junior ML Engineer with 1.5 years deploying computer vision and NLP models to production. Reduced inference cost 30% through quantization at current role. Focused on MLOps and model reliability.",
      "experience": [
        {
          "company": "VinAI Research",
          "role": "Junior ML Engineer",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Deployed real-time object detection models to Edge TPUs, reducing inference latency by 45ms",
            "Built automated MLflow retraining pipelines triggered by data drift alerts, cutting manual ML ops by 60%",
            "Applied INT8 quantization, reducing cloud inference costs by 30% with <1% accuracy drop"
          ]
        },
        {
          "company": "Freelance",
          "role": "AI Consultant",
          "dates": "Aug – Dec 2022",
          "bullets": [
            "Built a resume parsing service using spaCy NER for an HR-tech startup, processing 500 CVs/day"
          ]
        }
      ],
      "projects": [
        {
          "name": "Automated Content Moderation",
          "type": "Production System · PyTorch + FastAPI",
          "bullets": [
            "Built multi-modal NLP + Vision classifier handling 2M uploads/day with 94.5% accuracy"
          ]
        },
        {
          "name": "Demand Forecasting Engine",
          "type": "Hackathon Winner · LightGBM",
          "bullets": [
            "Won 1st place in a 48-hr ML hackathon by building a store-level demand forecast with 9.3% MAPE"
          ]
        }
      ]
    },
    "ready": {
      "name": "Linh Pham",
      "title": "Machine Learning Engineer",
      "email": "linh.pham@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/linhpham-ai",
      "summary": "ML Engineer with 3 years architecting MLOps platforms and GenAI features. Led the company's first LLM-powered product feature, boosting user engagement 25%. Skilled in full model lifecycle from training to serving.",
      "experience": [
        {
          "company": "MoMo Fintech",
          "role": "Machine Learning Engineer",
          "dates": "May 2021 – Present",
          "bullets": [
            "Architected the company's first GenAI feature (AI transaction summary), adopted by 500k users within launch week",
            "Established ML governance protocols preventing PII leakage across 3 internal LLM products",
            "Led a cross-functional pod of 5 ML engineers + 2 data engineers in 6-month roadmap delivery"
          ]
        },
        {
          "company": "VinAI Research",
          "role": "Junior ML Engineer",
          "dates": "Jan 2020 – Apr 2021",
          "bullets": [
            "Shipped 3 computer vision models to production across retail analytics use-cases"
          ]
        }
      ],
      "projects": [
        {
          "name": "LLM Evaluation Framework",
          "type": "Internal Tooling · Python",
          "bullets": [
            "Built an automated LLM evaluation harness used across 4 product squads, cutting eval time from 3 days to 2hrs"
          ]
        },
        {
          "name": "Fraud Detection Pipeline",
          "type": "Production ML · XGBoost + Kafka",
          "bullets": [
            "Re-architected real-time fraud scoring to stream-first, reducing false positives by 18%"
          ]
        }
      ]
    }
  },
  "Cloud Engineering / DevOps": {
    "starter": {
      "name": "Minh Anh Nguyen",
      "title": "Software Engineer Intern",
      "email": "minhanh@gmail.com",
      "location": "Hanoi, Vietnam",
      "linkedin": "linkedin.com/in/minhanh-dev",
      "summary": "Computer Science final-year student at HUST with strong foundations in React and Node.js. Built 3 end-to-end web projects. Seeking first SWE role where I can contribute to production codebases.",
      "experience": [
        {
          "company": "FPT Software",
          "role": "Frontend Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Developed 4 responsive UI components in React for an enterprise logistics portal used by 200+ daily users",
            "Fixed 12 cross-browser CSS bugs identified in QA, reducing reported UI issues by 40%",
            "Wrote unit tests with Jest, raising component coverage from 20% to 55%"
          ]
        },
        {
          "company": "Tech Startup Club, HUST",
          "role": "Lead Developer",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Built a campus event booking platform using Next.js and Supabase, onboarding 300+ student users in Month 1",
            "Led weekly sprints with a 4-person team; merged 28 pull requests across 3 semesters",
            "Integrated Stripe API for ticketing, processing 50+ real transactions in beta"
          ]
        }
      ],
      "projects": [
        {
          "name": "AI Study Planner",
          "type": "Personal Project · React + Node.js",
          "bullets": [
            "Built a GPT-4-powered scheduler that auto-generates weekly study plans from uploaded syllabi",
            "Deployed on Vercel; 80+ active users from university forums"
          ]
        },
        {
          "name": "Real-time Chat App",
          "type": "Portfolio Project · Socket.io + MongoDB",
          "bullets": [
            "Architected full-stack chat app with JWT auth, supporting 50 concurrent WebSocket connections",
            "Implemented message persistence and read receipts"
          ]
        }
      ]
    },
    "developing": {
      "name": "Minh Anh Nguyen",
      "title": "Junior Software Engineer",
      "email": "minhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/minhanh-dev",
      "summary": "Junior SWE with 1.5 years building production microservices in TypeScript and AWS. Improved API performance 35% at current startup. Passionate about clean architecture and automated testing.",
      "experience": [
        {
          "company": "Teko Vietnam",
          "role": "Junior Backend Engineer",
          "dates": "Jan 2023 – Present",
          "bullets": [
            "Migrated 3 Express.js REST services to serverless AWS Lambda, reducing infra costs by 18%",
            "Optimised PostgreSQL query plans for the checkout service, dropping p95 latency from 320ms to 95ms",
            "Built GitHub Actions CI pipeline that cut average PR merge time from 2 days to 4 hours"
          ]
        },
        {
          "company": "Freelance",
          "role": "Full-Stack Developer",
          "dates": "Mar – Dec 2022",
          "bullets": [
            "Delivered 3 e-commerce sites for local SMEs using Next.js + Shopify, each launching within 4-week turnarounds",
            "Integrated VNPAY payment gateway and wrote end-to-end Cypress tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Open-Source API Rate Limiter",
          "type": "npm Package · TypeScript",
          "bullets": [
            "Published a Redis-backed rate-limiter middleware with 200+ weekly downloads on npm",
            "Maintained issues and merged community PRs within 48 hrs"
          ]
        },
        {
          "name": "Internal Dev Dashboard",
          "type": "Side Project · React + GraphQL",
          "bullets": [
            "Built an internal metrics dashboard tracking deploy frequency and DORA metrics used by 15 teammates"
          ]
        }
      ]
    },
    "ready": {
      "name": "Minh Anh Nguyen",
      "title": "Software Engineer",
      "email": "minhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/minhanh-dev",
      "summary": "Software Engineer with 3 years building scalable distributed systems. Led migration of a monolith to microservices, enabling the platform to handle 5× traffic. Now seeking a senior IC or tech-lead track role.",
      "experience": [
        {
          "company": "VNG Corporation",
          "role": "Software Engineer",
          "dates": "Feb 2022 – Present",
          "bullets": [
            "Spearheaded migration of the notification monolith to 4 independent Go microservices, scaling throughput to 50k events/sec",
            "Mentored 3 junior engineers through weekly code reviews, reducing production bug rate by 30%",
            "Defined team-wide API design standards adopted across 2 product squads"
          ]
        },
        {
          "company": "Teko Vietnam",
          "role": "Junior Software Engineer",
          "dates": "Aug 2020 – Jan 2022",
          "bullets": [
            "Built and shipped 5 core checkout features used by 2M+ monthly active users",
            "Drove test coverage from 30% to 75% through dedicated refactoring sprints"
          ]
        }
      ],
      "projects": [
        {
          "name": "Internal CLI Toolchain",
          "type": "Developer Productivity · Go",
          "bullets": [
            "Built a Go CLI used by 25 engineers to spin up local dev environments in <2 min",
            "Reduced new-engineer onboarding time from 3 days to half a day"
          ]
        },
        {
          "name": "Event-Sourcing Framework",
          "type": "Architecture · Kafka + Redis",
          "bullets": [
            "Designed internal event-sourcing pattern, adopted by 3 product squads as the standard for audit logging"
          ]
        }
      ]
    }
  },
  "Product Management (PM)": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  },
  "Product Growth / Growth PM": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  },
  "Business Analytics (BA)": {
    "starter": {
      "name": "Thu Ha Tran",
      "title": "Data Analyst Intern",
      "email": "thuha@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/thuha-data",
      "summary": "Statistics graduate skilled in SQL, Python, and Tableau. Built 3 end-to-end analytics dashboards during internships. Passionate about uncovering insights that change product and business decisions.",
      "experience": [
        {
          "company": "Shopee Vietnam",
          "role": "Data Analyst Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Analysed seller acquisition funnel using SQL on BigQuery, identifying a 40% drop-off at Step 3 that was surfaced to the PM team",
            "Built a weekly Tableau dashboard tracking 8 seller KPIs, reducing data-request tickets by 25%",
            "Automated monthly reporting scripts using Python, saving 4 hrs of manual work per week"
          ]
        },
        {
          "company": "Uni Economics Club",
          "role": "Research Analyst",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led market research on F&B sector trends; data cited in a 60-page industry whitepaper",
            "Visualised survey responses from 200+ respondents into 3 executive-ready slides"
          ]
        }
      ],
      "projects": [
        {
          "name": "E-Commerce RFM Analysis",
          "type": "Python + Seaborn",
          "bullets": [
            "Segmented 5k customers by Recency-Frequency-Monetary value; identified high-value cohort with 2× purchase rate",
            "Presented recommendations in a Jupyter notebook report adopted as the club's template"
          ]
        },
        {
          "name": "Job Market Dashboard",
          "type": "Tableau Public",
          "bullets": [
            "Scraped and visualised 1,200 tech job postings; published dashboard with 300+ views"
          ]
        }
      ]
    },
    "developing": {
      "name": "Thu Ha Tran",
      "title": "Junior Data Analyst",
      "email": "thuha@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/thuha-data",
      "summary": "Junior Data Analyst with 1.5 years automating KPI pipelines and running A/B test evaluations. Uncovered retention insights that led to a product overhaul improving D30 retention by 8%.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Junior Data Analyst",
          "dates": "Jan 2023 – Present",
          "bullets": [
            "Discovered checkout drop-off patterns via Looker funnels leading to a navigation redesign that increased conversion by 12%",
            "Automated weekly C-suite KPI reports in Python, eliminating 6 hrs of manual spreadsheet work",
            "Defined event taxonomy for 3 new product features in collaboration with data engineers"
          ]
        },
        {
          "company": "Shopee Vietnam",
          "role": "Data Analyst Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported A/B test design and analysis for 5 marketing campaigns, surfacing statistical significance correctly"
          ]
        }
      ],
      "projects": [
        {
          "name": "Churn Prediction Model",
          "type": "Scikit-learn + Logistic Regression",
          "bullets": [
            "Built a churn classifier with 84% AUC; segmented at-risk users for targeted retention campaigns"
          ]
        },
        {
          "name": "dbt Data Model Migration",
          "type": "Analytics Engineering",
          "bullets": [
            "Converted 15 legacy Excel pivot reports to dbt models in Snowflake, cutting data freshness from D-1 to hourly"
          ]
        }
      ]
    },
    "ready": {
      "name": "Thu Ha Tran",
      "title": "Data Analyst",
      "email": "thuha@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/thuha-data",
      "summary": "Data Analyst with 3 years establishing metric frameworks and advising product strategy. Standardised attribution models across $2M in ad spend. Trusted partner to PMs, engineers, and marketing leadership.",
      "experience": [
        {
          "company": "MoMo Fintech",
          "role": "Data Analyst",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Standardised marketing attribution model covering $2M in monthly ad spend across 5 channels",
            "Advised CPO team on quarterly roadmap prioritisation using cohort retention data",
            "Built self-serve Looker Studio dashboards used by 40+ non-technical stakeholders weekly"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Junior Data Analyst",
          "dates": "Jul 2020 – Feb 2021",
          "bullets": [
            "Automated seller analytics pipelines used by 3 internal teams"
          ]
        }
      ],
      "projects": [
        {
          "name": "Modern Analytics Stack Migration",
          "type": "dbt + Snowflake + Tableau",
          "bullets": [
            "Led migration from manual Excel reports to automated dbt models — reducing report generation from 1 day to 20 min"
          ]
        },
        {
          "name": "Growth Experiment Tracker",
          "type": "Internal Tool · SQL + Retool",
          "bullets": [
            "Built A/B test tracking dashboard adopted as the team's standard experimentation workspace"
          ]
        }
      ]
    }
  },
  "UI/UX / Product Design": {
    "starter": {
      "name": "Bao Chau Vo",
      "title": "Product Design Intern",
      "email": "baochau@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/baochau-design",
      "summary": "UX Design student at RMIT driven by curiosity and research. Completed 3 end-to-end UX case studies and proficient in Figma, usability testing, and interaction design. Seeking first design role in a product team.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Design Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Redesigned the HR module onboarding flow using 10 user interviews; improved task completion in usability tests by 22%",
            "Created a Figma component library of 40+ elements aligned with DS principles, used by 3 other designers",
            "Delivered pixel-perfect handoff specs to frontend engineers, reducing design revision cycles by half"
          ]
        },
        {
          "company": "RMIT Design Club",
          "role": "UX Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Facilitated 5 design sprints serving local NGOs and campus teams",
            "Produced 3 research reports from guerrilla testing sessions with 8 participants each"
          ]
        }
      ],
      "projects": [
        {
          "name": "Checkout Flow Redesign",
          "type": "UX Case Study · Figma",
          "bullets": [
            "Redesigned a 5-step e-commerce checkout; reduced theoretical drop-off by 28% in prototype usability tests",
            "Produced 20 screens from wireframe to high-fidelity, with annotated design rationale"
          ]
        },
        {
          "name": "Mental Health App Concept",
          "type": "Speculative Design",
          "bullets": [
            "Designed a mood-tracking app focused on accessibility; tested with 6 neurodiverse participants"
          ]
        }
      ]
    },
    "developing": {
      "name": "Bao Chau Vo",
      "title": "Junior Product Designer",
      "email": "baochau@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/baochau-design",
      "summary": "Junior Product Designer with 1.5 years building and maintaining enterprise design systems. Shipped features used by 100k+ users. Known for translating complex UX research into clear, actionable design decisions.",
      "experience": [
        {
          "company": "Momo Fintech",
          "role": "Junior Product Designer",
          "dates": "Jan 2023 – Present",
          "bullets": [
            "Contributed 60+ components to the company's atomic design system, cutting design-to-engineering handoff time by 30%",
            "Led design for the Loyalty Rewards feature from discovery to launch, now used by 200k+ monthly active users",
            "Ran quarterly design critiques with 8-person design team, raising consistency scores in internal audits"
          ]
        },
        {
          "company": "Freelance UX Designer",
          "role": "Contract",
          "dates": "May – Dec 2022",
          "bullets": [
            "Designed and tested landing pages for 4 startups, averaging a 14% improvement in conversion"
          ]
        }
      ],
      "projects": [
        {
          "name": "Design System Audit",
          "type": "Systems Thinking · Figma",
          "bullets": [
            "Audited 200+ legacy Figma frames; consolidated to 80 reusable components reducing duplication by 60%"
          ]
        },
        {
          "name": "Micro-interaction Library",
          "type": "Animation · Framer",
          "bullets": [
            "Shipped 15 motion design patterns adopted by frontend engineers as the standard animation kit"
          ]
        }
      ]
    },
    "ready": {
      "name": "Bao Chau Vo",
      "title": "Product Designer",
      "email": "baochau@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/baochau-design",
      "summary": "Product Designer with 3 years owning end-to-end design for high-traffic fintech features. Champion of inclusive design and research-driven decision-making. Comfortable presenting design decisions to C-suite stakeholders.",
      "experience": [
        {
          "company": "Momo Fintech",
          "role": "Product Designer",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Championed full redesign of the MoMo wallet top-up flow, increasing completion rate by 18% and CSAT from 3.8 to 4.5",
            "Defined and maintained shared UX principles adopted by a 12-person design org",
            "Presented quarterly UX strategy to CPO and VP Engineering, securing headcount for a 2-person research team"
          ]
        },
        {
          "company": "Base.vn",
          "role": "Junior Product Designer",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Shipped 3 B2B SaaS features from wireframe to production across HR and CRM modules"
          ]
        }
      ],
      "projects": [
        {
          "name": "Accessibility Audit Programme",
          "type": "Inclusive Design Initiative",
          "bullets": [
            "Led company's first WCAG 2.1 AA audit; surfaced 45 issues, 30 resolved in 2 sprints"
          ]
        },
        {
          "name": "Design Culture Advocacy",
          "type": "Internal Talk Series",
          "bullets": [
            "Ran 6 'Design Thinking' lunch sessions for 50+ cross-functional engineers and PMs"
          ]
        }
      ]
    }
  },
  "Project Management (Tech Projects)": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  },
  "Business Development (Tech Industry)": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  },
  "Digital Marketing (Tech-focused)": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  },
  "Operations (Tech Operations / Process Automation)": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  },
  "Other (Please Specify)": {
    "starter": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager Intern",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Business + CS double major at RMIT with hands-on experience shipping features as Product Lead for two university projects. Completed Google PM study group and Stanford online course. Seeking first APM role.",
      "experience": [
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "Jun – Aug 2024",
          "bullets": [
            "Owned discovery for a driver incentive redesign; conducted 15 driver interviews and presented insights to 3 senior PMs",
            "Wrote 2 PRDs reviewed and approved by the product team, making it to the engineering backlog",
            "Tracked OKR progress for the Driver Engagement squad using Mixpanel, flagging a metric dip 2 weeks early"
          ]
        },
        {
          "company": "RMIT Product Guild",
          "role": "Product Lead",
          "dates": "Sep 2023 – May 2024",
          "bullets": [
            "Led a 5-person squad to design and launch a study-group matching MVP on campus",
            "Ran 30+ user interviews; distilled findings into 3 core user personas",
            "Shipped v1 in 10 weeks; onboarded 120 student users in the first month"
          ]
        }
      ],
      "projects": [
        {
          "name": "EdTech App Research",
          "type": "UX & Strategy Case Study",
          "bullets": [
            "Performed competitive teardown of 6 EdTech apps, identifying 3 key feature gaps",
            "Prototyped a solution in Figma and validated with 8 target students via usability tests"
          ]
        },
        {
          "name": "Student Market Analysis",
          "type": "Market Research · Excel + Canva",
          "bullets": [
            "Analysed survey data from 200+ RMIT students to assess willingness-to-pay for campus services"
          ]
        }
      ]
    },
    "developing": {
      "name": "Duc Khanh Tran",
      "title": "Associate Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "APM with 1.5 years driving onboarding and engagement features for a 2M-user B2C app. Data-first approach — cut onboarding drop-off by 30% using cohort analysis. Looking for next PM challenge.",
      "experience": [
        {
          "company": "Tiki E-Commerce",
          "role": "Associate Product Manager",
          "dates": "Feb 2023 – Present",
          "bullets": [
            "Owned the Buyer Onboarding squad; redesigned the 5-step flow using Mixpanel data, cutting drop-off by 30%",
            "Wrote and shipped 4 PRDs, coordinating with 8 engineers and 2 designers across 3 sprints",
            "Defined North Star metric (Day-7 purchase rate) with the data team, now tracked weekly by leadership"
          ]
        },
        {
          "company": "Grab Vietnam",
          "role": "Product Management Intern",
          "dates": "May – Aug 2022",
          "bullets": [
            "Supported 2 senior PMs on GrabFood merchant growth, contributing to 3 A/B tests"
          ]
        }
      ],
      "projects": [
        {
          "name": "Onboarding Drop-off Analysis",
          "type": "Data-Driven Initiative · Mixpanel",
          "bullets": [
            "Self-initiated analysis surfacing 30% funnel drop-off; proposal approved and shipped in 1 sprint"
          ]
        },
        {
          "name": "Competitor Feature Matrix",
          "type": "Strategy Report",
          "bullets": [
            "Benchmarked 5 competitor apps across 20 product attributes; findings shaped Q3 roadmap priorities"
          ]
        }
      ]
    },
    "ready": {
      "name": "Duc Khanh Tran",
      "title": "Product Manager",
      "email": "duckhanh@gmail.com",
      "location": "Ho Chi Minh City, Vietnam",
      "linkedin": "linkedin.com/in/duckhanh-pm",
      "summary": "Product Manager with 3 years executing multi-quarter roadmaps for B2B SaaS. Launched an enterprise permissions module that is now a key sales differentiator. Fluent in bridging engineering realities with commercial goals.",
      "experience": [
        {
          "company": "Base.vn",
          "role": "Product Manager",
          "dates": "Mar 2021 – Present",
          "bullets": [
            "Spearheaded the enterprise permissions module from 0 to GA in 4 months; cited in 70% of enterprise sales calls",
            "Aligned 3 engineering squads and the legal team across a 6-month compliance roadmap",
            "Grew enterprise tier DAU by 40% via iterative onboarding improvements driven by data and customer interviews"
          ]
        },
        {
          "company": "Tiki E-Commerce",
          "role": "Associate PM",
          "dates": "Jun 2020 – Feb 2021",
          "bullets": [
            "Delivered 5 buyer-facing features impacting 2M+ monthly active users"
          ]
        }
      ],
      "projects": [
        {
          "name": "Enterprise Pricing Overhaul",
          "type": "Strategic Initiative",
          "bullets": [
            "Defined tiered pricing strategy with Sales and Finance; drove 15% increase in net revenue retention"
          ]
        },
        {
          "name": "PM Mentorship Circle",
          "type": "Community · PM Vietnam",
          "bullets": [
            "Mentored 6 aspiring PMs through bi-weekly sessions; 4 secured internships within 3 months"
          ]
        }
      ]
    }
  }
};

export const TRANSFORM_TEMPLATES: Record<string, any> = {
  "Software Engineering (SWE)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Helped write code for the new user profile page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Developed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " code for the user profile page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Developed"
            },
            {
              "id": "c",
              "text": " reusable React components for the user profile module",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Developed"
            },
            {
              "id": "c",
              "text": " reusable React components for the user profile module"
            },
            {
              "id": "res",
              "text": ", reducing page load time by 20%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Changed database queries so the app runs faster."
            }
          ],
          [
            {
              "id": "v",
              "text": "Optimized",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the database queries for speed."
            }
          ],
          [
            {
              "id": "v",
              "text": "Optimized"
            },
            {
              "id": "c",
              "text": " PostgreSQL query plans for the checkout microservice",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " for speed."
            }
          ],
          [
            {
              "id": "v",
              "text": "Optimized"
            },
            {
              "id": "c",
              "text": " PostgreSQL query plans for the checkout microservice"
            },
            {
              "id": "res",
              "text": ", dropping p95 latency from 320ms to 95ms.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Was in charge of moving the app to microservices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " moving the app to microservices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " migration of the notification monolith to 4 Go microservices",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " migration of the notification monolith to 4 Go microservices"
            },
            {
              "id": "res",
              "text": ", scaling to 50k events/sec.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    }
  },
  "Artificial Intelligence (AI) / Machine Learning (ML)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Trained an AI model to answer questions better."
            }
          ],
          [
            {
              "id": "v",
              "text": "Fine-tuned",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " an AI model to answer questions better."
            }
          ],
          [
            {
              "id": "v",
              "text": "Fine-tuned"
            },
            {
              "id": "c",
              "text": " Llama-2-7B via LoRA on 10k domain-specific Q&A pairs",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Fine-tuned"
            },
            {
              "id": "c",
              "text": " Llama-2-7B via LoRA on 10k domain-specific Q&A pairs"
            },
            {
              "id": "res",
              "text": ", achieving 15% accuracy uplift over GPT-3.5 baseline.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Put the AI model on edge devices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Deployed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the AI model to edge devices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Deployed"
            },
            {
              "id": "c",
              "text": " real-time object detection models to Edge TPUs via TensorRT",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Deployed"
            },
            {
              "id": "c",
              "text": " real-time object detection models to Edge TPUs via TensorRT"
            },
            {
              "id": "res",
              "text": ", reducing inference latency by 45ms.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Made a GenAI feature everyone can use."
            }
          ],
          [
            {
              "id": "v",
              "text": "Architected",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " a GenAI feature for all users."
            }
          ],
          [
            {
              "id": "v",
              "text": "Architected"
            },
            {
              "id": "c",
              "text": " the company's first GenAI feature (AI transaction summary) end-to-end",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Architected"
            },
            {
              "id": "c",
              "text": " the company's first GenAI feature (AI transaction summary) end-to-end"
            },
            {
              "id": "res",
              "text": ", adopted by 500k users within launch week.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    }
  },
  "Data Analytics (DA) & Business Intelligence (BI)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Looked at the data and made a dashboard."
            }
          ],
          [
            {
              "id": "v",
              "text": "Analysed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " data and built a dashboard."
            }
          ],
          [
            {
              "id": "v",
              "text": "Analysed"
            },
            {
              "id": "c",
              "text": " seller acquisition funnel using SQL on BigQuery, identifying a 40% drop-off at Step 3",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Analysed"
            },
            {
              "id": "c",
              "text": " seller acquisition funnel using SQL on BigQuery, identifying a 40% drop-off at Step 3"
            },
            {
              "id": "res",
              "text": ", driving a priority fix from the PM team.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Found a problem in the user journey and told the team."
            }
          ],
          [
            {
              "id": "v",
              "text": "Uncovered",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " problems in the user journey."
            }
          ],
          [
            {
              "id": "v",
              "text": "Uncovered"
            },
            {
              "id": "c",
              "text": " checkout drop-off patterns via Looker funnel analysis",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Uncovered"
            },
            {
              "id": "c",
              "text": " checkout drop-off patterns via Looker funnel analysis"
            },
            {
              "id": "res",
              "text": ", directly driving a UI redesign that lifted conversion by 12%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Fixed the data model so marketing can track ads correctly."
            }
          ],
          [
            {
              "id": "v",
              "text": "Standardised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " data models for marketing tracking."
            }
          ],
          [
            {
              "id": "v",
              "text": "Standardised"
            },
            {
              "id": "c",
              "text": " the marketing attribution model across 5 acquisition channels",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Standardised"
            },
            {
              "id": "c",
              "text": " the marketing attribution model across 5 acquisition channels"
            },
            {
              "id": "res",
              "text": ", enabling accurate attribution for $2M in monthly ad spend.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Data Engineering": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Trained an AI model to answer questions better."
            }
          ],
          [
            {
              "id": "v",
              "text": "Fine-tuned",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " an AI model to answer questions better."
            }
          ],
          [
            {
              "id": "v",
              "text": "Fine-tuned"
            },
            {
              "id": "c",
              "text": " Llama-2-7B via LoRA on 10k domain-specific Q&A pairs",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Fine-tuned"
            },
            {
              "id": "c",
              "text": " Llama-2-7B via LoRA on 10k domain-specific Q&A pairs"
            },
            {
              "id": "res",
              "text": ", achieving 15% accuracy uplift over GPT-3.5 baseline.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Put the AI model on edge devices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Deployed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the AI model to edge devices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Deployed"
            },
            {
              "id": "c",
              "text": " real-time object detection models to Edge TPUs via TensorRT",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Deployed"
            },
            {
              "id": "c",
              "text": " real-time object detection models to Edge TPUs via TensorRT"
            },
            {
              "id": "res",
              "text": ", reducing inference latency by 45ms.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Made a GenAI feature everyone can use."
            }
          ],
          [
            {
              "id": "v",
              "text": "Architected",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " a GenAI feature for all users."
            }
          ],
          [
            {
              "id": "v",
              "text": "Architected"
            },
            {
              "id": "c",
              "text": " the company's first GenAI feature (AI transaction summary) end-to-end",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Architected"
            },
            {
              "id": "c",
              "text": " the company's first GenAI feature (AI transaction summary) end-to-end"
            },
            {
              "id": "res",
              "text": ", adopted by 500k users within launch week.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    }
  },
  "Cloud Engineering / DevOps": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Helped write code for the new user profile page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Developed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " code for the user profile page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Developed"
            },
            {
              "id": "c",
              "text": " reusable React components for the user profile module",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Developed"
            },
            {
              "id": "c",
              "text": " reusable React components for the user profile module"
            },
            {
              "id": "res",
              "text": ", reducing page load time by 20%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Changed database queries so the app runs faster."
            }
          ],
          [
            {
              "id": "v",
              "text": "Optimized",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the database queries for speed."
            }
          ],
          [
            {
              "id": "v",
              "text": "Optimized"
            },
            {
              "id": "c",
              "text": " PostgreSQL query plans for the checkout microservice",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " for speed."
            }
          ],
          [
            {
              "id": "v",
              "text": "Optimized"
            },
            {
              "id": "c",
              "text": " PostgreSQL query plans for the checkout microservice"
            },
            {
              "id": "res",
              "text": ", dropping p95 latency from 320ms to 95ms.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Was in charge of moving the app to microservices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " moving the app to microservices."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " migration of the notification monolith to 4 Go microservices",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " migration of the notification monolith to 4 Go microservices"
            },
            {
              "id": "res",
              "text": ", scaling to 50k events/sec.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a precision action verb (Architected, Deployed, Optimised)",
          "Add technical context: stack, system scale, or architecture pattern",
          "Close with a hard metric: latency ms, cost %, test coverage %, users"
        ]
      }
    }
  },
  "Product Management (PM)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Product Growth / Growth PM": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Business Analytics (BA)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Looked at the data and made a dashboard."
            }
          ],
          [
            {
              "id": "v",
              "text": "Analysed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " data and built a dashboard."
            }
          ],
          [
            {
              "id": "v",
              "text": "Analysed"
            },
            {
              "id": "c",
              "text": " seller acquisition funnel using SQL on BigQuery, identifying a 40% drop-off at Step 3",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Analysed"
            },
            {
              "id": "c",
              "text": " seller acquisition funnel using SQL on BigQuery, identifying a 40% drop-off at Step 3"
            },
            {
              "id": "res",
              "text": ", driving a priority fix from the PM team.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Found a problem in the user journey and told the team."
            }
          ],
          [
            {
              "id": "v",
              "text": "Uncovered",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " problems in the user journey."
            }
          ],
          [
            {
              "id": "v",
              "text": "Uncovered"
            },
            {
              "id": "c",
              "text": " checkout drop-off patterns via Looker funnel analysis",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Uncovered"
            },
            {
              "id": "c",
              "text": " checkout drop-off patterns via Looker funnel analysis"
            },
            {
              "id": "res",
              "text": ", directly driving a UI redesign that lifted conversion by 12%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Fixed the data model so marketing can track ads correctly."
            }
          ],
          [
            {
              "id": "v",
              "text": "Standardised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " data models for marketing tracking."
            }
          ],
          [
            {
              "id": "v",
              "text": "Standardised"
            },
            {
              "id": "c",
              "text": " the marketing attribution model across 5 acquisition channels",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Standardised"
            },
            {
              "id": "c",
              "text": " the marketing attribution model across 5 acquisition channels"
            },
            {
              "id": "res",
              "text": ", enabling accurate attribution for $2M in monthly ad spend.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "UI/UX / Product Design": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Made designs for the new page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Redesigned",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the new page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Redesigned"
            },
            {
              "id": "c",
              "text": " the HR module onboarding flow based on 10 user interviews",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Redesigned"
            },
            {
              "id": "c",
              "text": " the HR module onboarding flow based on 10 user interviews"
            },
            {
              "id": "res",
              "text": ", improving task completion by 22% in usability tests.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a design-specific action verb (Redesigned, Championed, Facilitated)",
          "Reference your research method or design tool and scope",
          "Close with a usability metric, CSAT score, or adoption rate"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Helped organise the Figma design files."
            }
          ],
          [
            {
              "id": "v",
              "text": "Systematised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the Figma design files."
            }
          ],
          [
            {
              "id": "v",
              "text": "Systematised"
            },
            {
              "id": "c",
              "text": " the design library by contributing 60+ atomic components to the design system",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Systematised"
            },
            {
              "id": "c",
              "text": " the design library by contributing 60+ atomic components to the design system"
            },
            {
              "id": "res",
              "text": ", cutting handoff time by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a design-specific action verb (Redesigned, Championed, Facilitated)",
          "Reference your research method or design tool and scope",
          "Close with a usability metric, CSAT score, or adoption rate"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Redid the design for the wallet page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Championed",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " redesign of the wallet page."
            }
          ],
          [
            {
              "id": "v",
              "text": "Championed"
            },
            {
              "id": "c",
              "text": " full redesign of the wallet top-up flow based on mixed-methods research",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Championed"
            },
            {
              "id": "c",
              "text": " full redesign of the wallet top-up flow based on mixed-methods research"
            },
            {
              "id": "res",
              "text": ", increasing completion rate by 18% and CSAT from 3.8 to 4.5.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with a design-specific action verb (Redesigned, Championed, Facilitated)",
          "Reference your research method or design tool and scope",
          "Close with a usability metric, CSAT score, or adoption rate"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a design-specific action verb (Redesigned, Championed, Facilitated)",
          "Reference your research method or design tool and scope",
          "Close with a usability metric, CSAT score, or adoption rate"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a design-specific action verb (Redesigned, Championed, Facilitated)",
          "Reference your research method or design tool and scope",
          "Close with a usability metric, CSAT score, or adoption rate"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with a design-specific action verb (Redesigned, Championed, Facilitated)",
          "Reference your research method or design tool and scope",
          "Close with a usability metric, CSAT score, or adoption rate"
        ]
      }
    }
  },
  "Project Management (Tech Projects)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Business Development (Tech Industry)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Digital Marketing (Tech-focused)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Operations (Tech Operations / Process Automation)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  },
  "Other (Please Specify)": {
    "experience": {
      "starter": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Managed the team to ship a feature that users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " team to ship a feature users liked."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Led"
            },
            {
              "id": "c",
              "text": " a 5-person squad to design and launch a study-group matching MVP"
            },
            {
              "id": "res",
              "text": ", onboarding 120 students in Month 1.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Organised the backlog and we released the dashboard on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " the backlog and delivered on time."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Prioritised"
            },
            {
              "id": "c",
              "text": " sprint backlog for 8 engineers to redesign the 5-step onboarding flow"
            },
            {
              "id": "res",
              "text": ", cutting Day-1 drop-off by 30%.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Live Bullet Transformation",
        "stages": [
          [
            {
              "id": "s0",
              "text": "Responsible for getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": " getting the permissions feature shipped."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months",
              "flash": "blue"
            },
            {
              "id": "r",
              "text": "."
            }
          ],
          [
            {
              "id": "v",
              "text": "Spearheaded"
            },
            {
              "id": "c",
              "text": " the enterprise permissions module from concept to GA in 4 months"
            },
            {
              "id": "res",
              "text": ", now cited in 70% of enterprise sales calls.",
              "flash": "green"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    },
    "summary": {
      "starter": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I want a job in tech."
            }
          ],
          [
            {
              "id": "s1",
              "text": "Final-year [Degree] student at [University] with [X] relevant experiences. Seeking [Target Role]."
            }
          ]
        ],
        "checklistItems": []
      },
      "developing": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I have experience in this field."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role title] with [X] years in [domain]. Track record of [top metric]. Specialised in [area]."
            }
          ]
        ],
        "checklistItems": []
      },
      "ready": {
        "demoLabel": "Summary Transform",
        "stages": [
          [
            {
              "id": "s0",
              "text": "I am senior in this area."
            }
          ],
          [
            {
              "id": "s1",
              "text": "[Role] with [X] years scaling [domain]. Led [initiative] achieving [business outcome]. Now targeting [next level]."
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "header": {
      "starter": {
        "demoLabel": "Header Format",
        "stages": [
          [
            {
              "id": "h",
              "text": "Formatted professional header"
            }
          ]
        ],
        "checklistItems": []
      }
    },
    "projects": {
      "starter": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "developing": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      },
      "ready": {
        "demoLabel": "Project Highlight",
        "stages": [
          [
            {
              "id": "p",
              "text": "Project optimised"
            }
          ]
        ],
        "checklistItems": [
          "Open with an outcome-oriented action verb (Led, Spearheaded, Orchestrated)",
          "Reference cross-functional scope: team size, stakeholders, timelines",
          "Close with a commercial or engagement metric (%, $, users, NPS)"
        ]
      }
    }
  }
};
