export type Level = 'starter' | 'developing' | 'ready';

export interface RoleLevelData {
  cvTitle: string;
  cvSummary: string;
  experienceChecklist: [string, string, string];
  summaryChecklist: [string, string, string];
  actionVerbs: string[];
  keySkills: string[];
  hrQuote: string;
  hrName: string;
  hrRole: string;
  hrCompany: 'shopee' | 'google' | 'grab' | 'vng' | 'startup' | 'scaleup';
  hrQuotes?: {
    experience?: string;
    summary?: string;
    header?: string;
    projects?: string;
  };
}

export interface RoleData {
  starter: RoleLevelData;
  developing: RoleLevelData;
  ready: RoleLevelData;
}

export const ROLE_DATA: Record<string, RoleData> = {
  "Software Engineering (SWE)": {
    "starter": {
      "cvTitle": "Aspiring Software Engineer",
      "cvSummary": "Recent Computer Science graduate with internship experience building scalable web applications. Developed full-stack projects using React and Node.js with a strong focus on clean, testable code.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Architected",
        "Engineered",
        "Deployed",
        "Refactored",
        "Optimized",
        "Scaled",
        "Integrated",
        "Spearheaded"
      ],
      "keySkills": [
        "JavaScript/TypeScript",
        "Python/Java/Go",
        "React/Vue/Angular",
        "Node.js/Spring Boot",
        "SQL/NoSQL",
        "Docker",
        "Git/CI/CD"
      ],
      "hrQuote": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
        "summary": "Your summary should scream 'I build things.' Tell me your primary stack and one cool project you've shipped. Don't waste my time with 'hard-working graduate'.",
        "projects": "Projects are your real CV at this level. Link the GitHub repo, highlight the architecture decisions, and be honest about the trade-offs you made.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Software Engineer",
      "cvSummary": "Junior Software Engineer with 1+ years of experience contributing to high-traffic distributed systems. Reduced API latency by 15% and improved test coverage across core microservices.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Architected",
        "Engineered",
        "Deployed",
        "Refactored",
        "Optimized",
        "Scaled",
        "Integrated",
        "Spearheaded"
      ],
      "keySkills": [
        "JavaScript/TypeScript",
        "Python/Java/Go",
        "React/Vue/Angular",
        "Node.js/Spring Boot",
        "SQL/NoSQL",
        "Docker",
        "Git/CI/CD"
      ],
      "hrQuote": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
        "summary": "Lead with the scale of the systems you've contributed to. Thousands of requests? Core microservices? Put that directly in the first line.",
        "projects": "Highlight side projects that solve developer pain points (open source, CLI tools) - they show deep passion for craftsmanship outside of work hours.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Software Engineer",
      "cvSummary": "Software Engineer with 3 years of experience orchestrating core platform features. Led a team of 3 junior engineers to successfully migrate a monolithic feature branch to an event-driven architecture.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Architected",
        "Engineered",
        "Deployed",
        "Refactored",
        "Optimized",
        "Scaled",
        "Integrated",
        "Spearheaded"
      ],
      "keySkills": [
        "JavaScript/TypeScript",
        "Python/Java/Go",
        "React/Vue/Angular",
        "Node.js/Spring Boot",
        "SQL/NoSQL",
        "Docker",
        "Git/CI/CD"
      ],
      "hrQuote": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
        "summary": "You are a seasoned engineer. Your summary must convey technical authority and your ability to align engineering architecture with business goals.",
        "projects": "If you mention open source at this level, I expect you to be a steady contributor to a widely used framework or building impressive full-stack apps.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Artificial Intelligence (AI) / Machine Learning (ML)": {
    "starter": {
      "cvTitle": "Aspiring AI/ML Engineer",
      "cvSummary": "Recent graduate with strong foundations in statistical modeling and deep learning. Built and deployed experimental computer vision models utilizing PyTorch during a university research project.",
      "experienceChecklist": [
        "Lead with accurate outcomes: 'Identified drop-offs to increase retention by 5%'",
        "Detail your data volume/tools: 'Processed 5GB of log data using Apache Spark'",
        "Focus on driving decisions: 'Built dashboard that guided team strategy'"
      ],
      "summaryChecklist": [
        "Start with your primary toolkit and business mindset",
        "Highlight specific, real-world scale data modeling tasks",
        "Tie your analysis directly back to tangible revenue or growth"
      ],
      "actionVerbs": [
        "Trained",
        "Deployed",
        "Fine-tuned",
        "Optimized",
        "Benchmarked",
        "Engineered",
        "Modeled",
        "Predicted"
      ],
      "keySkills": [
        "Python",
        "PyTorch/TensorFlow",
        "Scikit-Learn",
        "Pandas/NumPy",
        "SQL",
        "MLOps (MLflow)",
        "Docker/Kubernetes"
      ],
      "hrQuote": "Show me you know how to clean your own data. Don't just list algorithms from school; tell me how you extracted insights and what action you drove from it.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you know how to clean your own data. Don't just list algorithms from school; tell me how you extracted insights and what action you drove from it.",
        "summary": "I want to read your summary and immediately know your analytical toolkit and the types of business problems you're trying to solve as a junior.",
        "projects": "I look for a complete end-to-end data pipeline in your projects. Don't just show a Jupyter notebook; deploy it or build a local dashboard.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Machine Learning Engineer",
      "cvSummary": "Junior ML Engineer with 1 year of experience deploying NLP models to production environments. Contributed to inference pipelines that reduced model latency by 20%.",
      "experienceChecklist": [
        "Lead with accurate outcomes: 'Identified drop-offs to increase retention by 5%'",
        "Detail your data volume/tools: 'Processed 5GB of log data using Apache Spark'",
        "Focus on driving decisions: 'Built dashboard that guided team strategy'"
      ],
      "summaryChecklist": [
        "Start with your primary toolkit and business mindset",
        "Highlight specific, real-world scale data modeling tasks",
        "Tie your analysis directly back to tangible revenue or growth"
      ],
      "actionVerbs": [
        "Trained",
        "Deployed",
        "Fine-tuned",
        "Optimized",
        "Benchmarked",
        "Engineered",
        "Modeled",
        "Predicted"
      ],
      "keySkills": [
        "Python",
        "PyTorch/TensorFlow",
        "Scikit-Learn",
        "Pandas/NumPy",
        "SQL",
        "MLOps (MLflow)",
        "Docker/Kubernetes"
      ],
      "hrQuote": "I want to see data driving real decisions. Tell me about the dashboard that saved operations 5 hours a week, or the A/B test that increased conversion by 2%.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want to see data driving real decisions. Tell me about the dashboard that saved operations 5 hours a week, or the A/B test that increased conversion by 2%.",
        "summary": "Your summary should bridge the technical and commercial. 'Data Analyst with 1.5 years experience unlocking initial revenue patterns for SaaS products'.",
        "projects": "Show me projects that involve real-time data or complex statistical modeling that directly answers a complex business question.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Machine Learning Engineer",
      "cvSummary": "ML Engineer with 2.5 years experience managing MLOps infrastructure. Spearheaded an initial LLM integration pilot, serving 10k daily active users with sub-150ms latency.",
      "experienceChecklist": [
        "Lead with accurate outcomes: 'Identified drop-offs to increase retention by 5%'",
        "Detail your data volume/tools: 'Processed 5GB of log data using Apache Spark'",
        "Focus on driving decisions: 'Built dashboard that guided team strategy'"
      ],
      "summaryChecklist": [
        "Start with your primary toolkit and business mindset",
        "Highlight specific, real-world scale data modeling tasks",
        "Tie your analysis directly back to tangible revenue or growth"
      ],
      "actionVerbs": [
        "Trained",
        "Deployed",
        "Fine-tuned",
        "Optimized",
        "Benchmarked",
        "Engineered",
        "Modeled",
        "Predicted"
      ],
      "keySkills": [
        "Python",
        "PyTorch/TensorFlow",
        "Scikit-Learn",
        "Pandas/NumPy",
        "SQL",
        "MLOps (MLflow)",
        "Docker/Kubernetes"
      ],
      "hrQuote": "Mid-level data people build solid pipelines. Tell me how you built the experimentation infrastructure or defined the data governance for your squad.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level data people build solid pipelines. Tell me how you built the experimentation infrastructure or defined the data governance for your squad.",
        "summary": "Lead with your ability to democratize data across an organization and your experience building solid analytical foundations.",
        "projects": "Projects here should be foundational - developing novel algorithms, deep-diving whitepapers, or creating widely adopted local data libraries.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Data Analytics (DA) & Business Intelligence (BI)": {
    "starter": {
      "cvTitle": "Aspiring Data Analyst",
      "cvSummary": "Detail-oriented entry-level Data Analyst adept at transforming raw data into actionable insights using SQL and Tableau. Passionate about product telemetry and user behavior analytics.",
      "experienceChecklist": [
        "Lead with accurate outcomes: 'Identified drop-offs to increase retention by 5%'",
        "Detail your data volume/tools: 'Processed 5GB of log data using Apache Spark'",
        "Focus on driving decisions: 'Built dashboard that guided team strategy'"
      ],
      "summaryChecklist": [
        "Start with your primary toolkit and business mindset",
        "Highlight specific, real-world scale data modeling tasks",
        "Tie your analysis directly back to tangible revenue or growth"
      ],
      "actionVerbs": [
        "Analyzed",
        "Visualized",
        "Forecasted",
        "Extracted",
        "Synthesized",
        "Dashboarded",
        "Uncovered",
        "Correlated"
      ],
      "keySkills": [
        "SQL",
        "Python/R",
        "Tableau/PowerBI",
        "Looker",
        "Excel/GSheets",
        "A/B Testing",
        "Statistical Analysis"
      ],
      "hrQuote": "Show me you know how to clean your own data. Don't just list algorithms from school; tell me how you extracted insights and what action you drove from it.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you know how to clean your own data. Don't just list algorithms from school; tell me how you extracted insights and what action you drove from it.",
        "summary": "I want to read your summary and immediately know your analytical toolkit and the types of business problems you're trying to solve as a junior.",
        "projects": "I look for a complete end-to-end data pipeline in your projects. Don't just show a Jupyter notebook; deploy it or build a local dashboard.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Data Analyst",
      "cvSummary": "Business Intelligence Analyst with 1.5 years experience building automated reporting pipelines. Uncovered product drop-off points that led to a 5% increase in initial user retention.",
      "experienceChecklist": [
        "Lead with accurate outcomes: 'Identified drop-offs to increase retention by 5%'",
        "Detail your data volume/tools: 'Processed 5GB of log data using Apache Spark'",
        "Focus on driving decisions: 'Built dashboard that guided team strategy'"
      ],
      "summaryChecklist": [
        "Start with your primary toolkit and business mindset",
        "Highlight specific, real-world scale data modeling tasks",
        "Tie your analysis directly back to tangible revenue or growth"
      ],
      "actionVerbs": [
        "Analyzed",
        "Visualized",
        "Forecasted",
        "Extracted",
        "Synthesized",
        "Dashboarded",
        "Uncovered",
        "Correlated"
      ],
      "keySkills": [
        "SQL",
        "Python/R",
        "Tableau/PowerBI",
        "Looker",
        "Excel/GSheets",
        "A/B Testing",
        "Statistical Analysis"
      ],
      "hrQuote": "I want to see data driving real decisions. Tell me about the dashboard that saved operations 5 hours a week, or the A/B test that increased conversion by 2%.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want to see data driving real decisions. Tell me about the dashboard that saved operations 5 hours a week, or the A/B test that increased conversion by 2%.",
        "summary": "Your summary should bridge the technical and commercial. 'Data Analyst with 1.5 years experience unlocking initial revenue patterns for SaaS products'.",
        "projects": "Show me projects that involve real-time data or complex statistical modeling that directly answers a complex business question.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Data Analyst",
      "cvSummary": "Data Analyst with 3 years experience shaping early analytics infrastructure. Designed the core startup data governance, unlocking significant operational efficiencies across the marketing team.",
      "experienceChecklist": [
        "Lead with accurate outcomes: 'Identified drop-offs to increase retention by 5%'",
        "Detail your data volume/tools: 'Processed 5GB of log data using Apache Spark'",
        "Focus on driving decisions: 'Built dashboard that guided team strategy'"
      ],
      "summaryChecklist": [
        "Start with your primary toolkit and business mindset",
        "Highlight specific, real-world scale data modeling tasks",
        "Tie your analysis directly back to tangible revenue or growth"
      ],
      "actionVerbs": [
        "Analyzed",
        "Visualized",
        "Forecasted",
        "Extracted",
        "Synthesized",
        "Dashboarded",
        "Uncovered",
        "Correlated"
      ],
      "keySkills": [
        "SQL",
        "Python/R",
        "Tableau/PowerBI",
        "Looker",
        "Excel/GSheets",
        "A/B Testing",
        "Statistical Analysis"
      ],
      "hrQuote": "Mid-level data people build solid pipelines. Tell me how you built the experimentation infrastructure or defined the data governance for your squad.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level data people build solid pipelines. Tell me how you built the experimentation infrastructure or defined the data governance for your squad.",
        "summary": "Lead with your ability to democratize data across an organization and your experience building solid analytical foundations.",
        "projects": "Projects here should be foundational - developing novel algorithms, deep-diving whitepapers, or creating widely adopted local data libraries.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Data Engineering": {
    "starter": {
      "cvTitle": "Aspiring Data Engineer",
      "cvSummary": "Data-focused recent graduate with strong SQL and Python skills. Built automated ETL pipelines using Apache Airflow during a 6-month internship focused on cloud data warehousing.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Pipelines",
        "ETL/ELT",
        "Ingested",
        "Orchestrated",
        "Migrated",
        "Transformed",
        "Batched",
        "Streamed"
      ],
      "keySkills": [
        "Python/Scala",
        "SQL",
        "Spark/Hadoop",
        "Airflow/Prefect",
        "Snowflake/BigQuery",
        "Kafka",
        "AWS/GCP"
      ],
      "hrQuote": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
        "summary": "Your summary should scream 'I build things.' Tell me your primary stack and one cool project you've shipped. Don't waste my time with 'hard-working graduate'.",
        "projects": "Projects are your real CV at this level. Link the GitHub repo, highlight the architecture decisions, and be honest about the trade-offs you made.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Data Engineer",
      "cvSummary": "Junior Data Engineer with 1 year experience supporting data lake operations. Assisted in reducing overnight batch processing times by 15% through optimized query structuring.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Pipelines",
        "ETL/ELT",
        "Ingested",
        "Orchestrated",
        "Migrated",
        "Transformed",
        "Batched",
        "Streamed"
      ],
      "keySkills": [
        "Python/Scala",
        "SQL",
        "Spark/Hadoop",
        "Airflow/Prefect",
        "Snowflake/BigQuery",
        "Kafka",
        "AWS/GCP"
      ],
      "hrQuote": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
        "summary": "Lead with the scale of the systems you've contributed to. Thousands of requests? Core microservices? Put that directly in the first line.",
        "projects": "Highlight side projects that solve developer pain points (open source, CLI tools) - they show deep passion for craftsmanship outside of work hours.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Data Engineer",
      "cvSummary": "Data Engineer with 3 years experience architecting robust streaming platforms. Successfully transitioned a legacy daily-batch infrastructure into a near-real-time event streaming pipeline.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Pipelines",
        "ETL/ELT",
        "Ingested",
        "Orchestrated",
        "Migrated",
        "Transformed",
        "Batched",
        "Streamed"
      ],
      "keySkills": [
        "Python/Scala",
        "SQL",
        "Spark/Hadoop",
        "Airflow/Prefect",
        "Snowflake/BigQuery",
        "Kafka",
        "AWS/GCP"
      ],
      "hrQuote": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
        "summary": "You are a seasoned engineer. Your summary must convey technical authority and your ability to align engineering architecture with business goals.",
        "projects": "If you mention open source at this level, I expect you to be a steady contributor to a widely used framework or building impressive full-stack apps.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Cloud Engineering / DevOps": {
    "starter": {
      "cvTitle": "Aspiring Cloud Engineer",
      "cvSummary": "Systems-oriented graduate passionate about infrastructure as code. Built and deployed automated CI/CD pipelines using GitHub Actions and containerized applications with Docker for personal projects.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Automated",
        "Provisioned",
        "Containerized",
        "Monitored",
        "Orchestrated",
        "Secured",
        "Migrated",
        "Hardened"
      ],
      "keySkills": [
        "AWS/GCP/Azure",
        "Terraform",
        "Kubernetes",
        "Docker",
        "CI/CD (GitHub Actions/Jenkins)",
        "Linux",
        "Bash/Python"
      ],
      "hrQuote": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
        "summary": "Your summary should scream 'I build things.' Tell me your primary stack and one cool project you've shipped. Don't waste my time with 'hard-working graduate'.",
        "projects": "Projects are your real CV at this level. Link the GitHub repo, highlight the architecture decisions, and be honest about the trade-offs you made.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior DevOps Engineer",
      "cvSummary": "Junior DevOps Engineer with 1+ years experience supporting cloud environments. Assisted in decreasing deployment failure rates and identified missing tags that cut AWS costs by 10%.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Automated",
        "Provisioned",
        "Containerized",
        "Monitored",
        "Orchestrated",
        "Secured",
        "Migrated",
        "Hardened"
      ],
      "keySkills": [
        "AWS/GCP/Azure",
        "Terraform",
        "Kubernetes",
        "Docker",
        "CI/CD (GitHub Actions/Jenkins)",
        "Linux",
        "Bash/Python"
      ],
      "hrQuote": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
        "summary": "Lead with the scale of the systems you've contributed to. Thousands of requests? Core microservices? Put that directly in the first line.",
        "projects": "Highlight side projects that solve developer pain points (open source, CLI tools) - they show deep passion for craftsmanship outside of work hours.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Cloud Engineer",
      "cvSummary": "Cloud Engineer with 3 years experience maintaining 99.9% uptime for early-stage SaaS platforms. Led the containerization strategy and established centralized FinOps practices.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Automated",
        "Provisioned",
        "Containerized",
        "Monitored",
        "Orchestrated",
        "Secured",
        "Migrated",
        "Hardened"
      ],
      "keySkills": [
        "AWS/GCP/Azure",
        "Terraform",
        "Kubernetes",
        "Docker",
        "CI/CD (GitHub Actions/Jenkins)",
        "Linux",
        "Bash/Python"
      ],
      "hrQuote": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
        "summary": "You are a seasoned engineer. Your summary must convey technical authority and your ability to align engineering architecture with business goals.",
        "projects": "If you mention open source at this level, I expect you to be a steady contributor to a widely used framework or building impressive full-stack apps.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Product Management (PM)": {
    "starter": {
      "cvTitle": "Product Management Intern",
      "cvSummary": "Customer-obsessed graduate with a background in execution and research. Successfully supported cross-functional squads to launch a minor feature update resulting in positive initial user feedback.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Prioritized",
        "Roadmapped",
        "Launched",
        "Validated",
        "Aligned",
        "Shipped",
        "Strategized",
        "Iterated"
      ],
      "keySkills": [
        "Product Strategy",
        "Agile/Scrum",
        "Jira/Linear",
        "User Research",
        "Wireframing (Figma)",
        "SQL/Analytics",
        "Stakeholder Management"
      ],
      "hrQuote": "For APM interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "For APM interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
        "summary": "Product is about solving problems. Use your summary to show you have a product mindset. Who are you building for and why do you care?",
        "projects": "Even side projects count heavily. Did you build a Shopify store? Did you launch a campus newsletter? Show me you can hustle from zero to one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Associate Product Manager (APM)",
      "cvSummary": "APM with 1 year experience driving specific B2B SaaS features. Owned the initial user onboarding flow, achieving a 10% increase in activation rate by aggressively removing friction.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Prioritized",
        "Roadmapped",
        "Launched",
        "Validated",
        "Aligned",
        "Shipped",
        "Strategized",
        "Iterated"
      ],
      "keySkills": [
        "Product Strategy",
        "Agile/Scrum",
        "Jira/Linear",
        "User Research",
        "Wireframing (Figma)",
        "SQL/Analytics",
        "Stakeholder Management"
      ],
      "hrQuote": "Don't tell me you wrote Jira tickets. Tell me you owned a metric, ruthlessly prioritized a sprint backlog, and moved the needle for the business.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "Don't tell me you wrote Jira tickets. Tell me you owned a metric, ruthlessly prioritized a sprint backlog, and moved the needle for the business.",
        "summary": "Specify your domain experience (B2B, B2C, Mobile) and your biggest metric win so far. Leave the generic agile buzzwords out.",
        "projects": "I love seeing product teardowns or case studies in a junior portfolio. It proves you think about UX and revenue even when you're off the clock.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Product Manager",
      "cvSummary": "Product Manager with nearly 3 years of experience managing a core product line. Aligned engineering and marketing to successfully launch a flagship module that increased targeted ARR by 15%.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Prioritized",
        "Roadmapped",
        "Launched",
        "Validated",
        "Aligned",
        "Shipped",
        "Strategized",
        "Iterated"
      ],
      "keySkills": [
        "Product Strategy",
        "Agile/Scrum",
        "Jira/Linear",
        "User Research",
        "Wireframing (Figma)",
        "SQL/Analytics",
        "Stakeholder Management"
      ],
      "hrQuote": "At this level, you manage complex product strategy. I need to see module-level metrics: feature retention, market penetration, and how you managed stakeholders.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "At this level, you manage complex product strategy. I need to see module-level metrics: feature retention, market penetration, and how you managed stakeholders.",
        "summary": "Be extremely sharp with your product thesis. What is your track record of finding product-market fit or scaling early-stage features?",
        "projects": "I want to see thought leadership. Do you write about product strategy? Do you advise early startups? Show me your influence beyond your day job.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Product Growth / Growth PM": {
    "starter": {
      "cvTitle": "Growth Analyst Intern",
      "cvSummary": "Analytical problem solver focused on user acquisition and funnel optimization. Analyzed onboarding metrics and proposed UX changes that boosted freemium signups by 5%.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Experimented",
        "Acquired",
        "Converted",
        "Retained",
        "Optimized",
        "Segmented",
        "Iterated",
        "Scaled"
      ],
      "keySkills": [
        "Growth Loops",
        "A/B Testing",
        "Mixpanel/Amplitude",
        "Conversion Rate Optimization (CRO)",
        "SQL",
        "Funnel Analytics"
      ],
      "hrQuote": "For APM interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "For APM interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
        "summary": "Product is about solving problems. Use your summary to show you have a product mindset. Who are you building for and why do you care?",
        "projects": "Even side projects count heavily. Did you build a Shopify store? Did you launch a campus newsletter? Show me you can hustle from zero to one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Growth PM",
      "cvSummary": "Junior Growth PM with 1.5 years executing A/B experiment programs. Co-launched viral referral loops and optimized paywall copy leading to a 10% uplift in customer lifetime value.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Experimented",
        "Acquired",
        "Converted",
        "Retained",
        "Optimized",
        "Segmented",
        "Iterated",
        "Scaled"
      ],
      "keySkills": [
        "Growth Loops",
        "A/B Testing",
        "Mixpanel/Amplitude",
        "Conversion Rate Optimization (CRO)",
        "SQL",
        "Funnel Analytics"
      ],
      "hrQuote": "Don't tell me you wrote Jira tickets. Tell me you owned a metric, ruthlessly prioritized a sprint backlog, and moved the needle for the business.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "Don't tell me you wrote Jira tickets. Tell me you owned a metric, ruthlessly prioritized a sprint backlog, and moved the needle for the business.",
        "summary": "Specify your domain experience (B2B, B2C, Mobile) and your biggest metric win so far. Leave the generic agile buzzwords out.",
        "projects": "I love seeing product teardowns or case studies in a junior portfolio. It proves you think about UX and revenue even when you're off the clock.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Growth Product Manager",
      "cvSummary": "Growth PM with 3 years accelerating early-stage SaaS platforms. Built the initial experiment infrastructure and defined North Star metrics that successfully lowered customer acquisition costs.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Experimented",
        "Acquired",
        "Converted",
        "Retained",
        "Optimized",
        "Segmented",
        "Iterated",
        "Scaled"
      ],
      "keySkills": [
        "Growth Loops",
        "A/B Testing",
        "Mixpanel/Amplitude",
        "Conversion Rate Optimization (CRO)",
        "SQL",
        "Funnel Analytics"
      ],
      "hrQuote": "At this level, you manage complex product strategy. I need to see module-level metrics: feature retention, market penetration, and how you managed stakeholders.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "At this level, you manage complex product strategy. I need to see module-level metrics: feature retention, market penetration, and how you managed stakeholders.",
        "summary": "Be extremely sharp with your product thesis. What is your track record of finding product-market fit or scaling early-stage features?",
        "projects": "I want to see thought leadership. Do you write about product strategy? Do you advise early startups? Show me your influence beyond your day job.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Business Analytics (BA)": {
    "starter": {
      "cvTitle": "Business Analyst Intern",
      "cvSummary": "Detail-oriented junior analyst acting as the bridge between technical teams and stakeholders. Assisted in streamlining requirement gathering processes, improving visibility for engineering sprints.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Documented",
        "Facilitated",
        "Modeled",
        "Bridged",
        "Streamlined",
        "Elicited",
        "Translated",
        "Optimized"
      ],
      "keySkills": [
        "Requirements Gathering",
        "Stakeholder Management",
        "Process Modeling (BPMN)",
        "SQL",
        "Agile",
        "Jira/Confluence",
        "Data Analysis"
      ],
      "hrQuote": "Show me you know how to clean your own data. Don't just list algorithms from school; tell me how you extracted insights and what action you drove from it.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you know how to clean your own data. Don't just list algorithms from school; tell me how you extracted insights and what action you drove from it.",
        "summary": "I want to read your summary and immediately know your analytical toolkit and the types of business problems you're trying to solve as a junior.",
        "projects": "I look for a complete end-to-end data pipeline in your projects. Don't just show a Jupyter notebook; deploy it or build a local dashboard.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Business Analyst",
      "cvSummary": "Junior BA with 1 year experience supporting digital operations. Translated routine business needs into agile backlogs, resulting in the successful rollout of an internal tracking tool.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Documented",
        "Facilitated",
        "Modeled",
        "Bridged",
        "Streamlined",
        "Elicited",
        "Translated",
        "Optimized"
      ],
      "keySkills": [
        "Requirements Gathering",
        "Stakeholder Management",
        "Process Modeling (BPMN)",
        "SQL",
        "Agile",
        "Jira/Confluence",
        "Data Analysis"
      ],
      "hrQuote": "I want to see data driving real decisions. Tell me about the dashboard that saved operations 5 hours a week, or the A/B test that increased conversion by 2%.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want to see data driving real decisions. Tell me about the dashboard that saved operations 5 hours a week, or the A/B test that increased conversion by 2%.",
        "summary": "Your summary should bridge the technical and commercial. 'Data Analyst with 1.5 years experience unlocking initial revenue patterns for SaaS products'.",
        "projects": "Show me projects that involve real-time data or complex statistical modeling that directly answers a complex business question.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Business Analyst",
      "cvSummary": "Business Analyst with 3 years driving cross-functional processes. Standardized agile documentation across 3 engineering squads, significantly reducing requirement ambiguity and technical debt.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Documented",
        "Facilitated",
        "Modeled",
        "Bridged",
        "Streamlined",
        "Elicited",
        "Translated",
        "Optimized"
      ],
      "keySkills": [
        "Requirements Gathering",
        "Stakeholder Management",
        "Process Modeling (BPMN)",
        "SQL",
        "Agile",
        "Jira/Confluence",
        "Data Analysis"
      ],
      "hrQuote": "Mid-level data people build solid pipelines. Tell me how you built the experimentation infrastructure or defined the data governance for your squad.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level data people build solid pipelines. Tell me how you built the experimentation infrastructure or defined the data governance for your squad.",
        "summary": "Lead with your ability to democratize data across an organization and your experience building solid analytical foundations.",
        "projects": "Projects here should be foundational - developing novel algorithms, deep-diving whitepapers, or creating widely adopted local data libraries.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "UI/UX / Product Design": {
    "starter": {
      "cvTitle": "Product Design Intern",
      "cvSummary": "Creative UI/UX Designer passionate about accessible and intuitive interfaces. Redesigned a pilot checkout flow, improving usability heuristics and task success rates during a recent internship.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Designed",
        "Prototyped",
        "Researched",
        "Iterated",
        "Wireframed",
        "Systematized",
        "Tested",
        "Empathized"
      ],
      "keySkills": [
        "Figma",
        "User Research",
        "Wireframing/Prototyping",
        "Interaction Design",
        "Design Systems",
        "Usability Testing",
        "HTML/CSS"
      ],
      "hrQuote": "For APM interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "For APM interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
        "summary": "Product is about solving problems. Use your summary to show you have a product mindset. Who are you building for and why do you care?",
        "projects": "Even side projects count heavily. Did you build a Shopify store? Did you launch a campus newsletter? Show me you can hustle from zero to one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Product Designer",
      "cvSummary": "Junior Product Designer with 1.5 years experience building components for B2B applications. Assisted in establishing a scalable Figma design system and conducted early generative user research.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Designed",
        "Prototyped",
        "Researched",
        "Iterated",
        "Wireframed",
        "Systematized",
        "Tested",
        "Empathized"
      ],
      "keySkills": [
        "Figma",
        "User Research",
        "Wireframing/Prototyping",
        "Interaction Design",
        "Design Systems",
        "Usability Testing",
        "HTML/CSS"
      ],
      "hrQuote": "Don't tell me you wrote Jira tickets. Tell me you owned a metric, ruthlessly prioritized a sprint backlog, and moved the needle for the business.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "Don't tell me you wrote Jira tickets. Tell me you owned a metric, ruthlessly prioritized a sprint backlog, and moved the needle for the business.",
        "summary": "Specify your domain experience (B2B, B2C, Mobile) and your biggest metric win so far. Leave the generic agile buzzwords out.",
        "projects": "I love seeing product teardowns or case studies in a junior portfolio. It proves you think about UX and revenue even when you're off the clock.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Product Designer",
      "cvSummary": "Product Designer with 3 years experience guiding impactful interface decisions. Championed user-centric design cultures that directly influenced a major feature pivot, capturing positive user sentiment.",
      "experienceChecklist": [
        "Prove business impact: 'Supported feature X launch, driving positive user feedback'",
        "Show cross-functional leadership: 'Aligned 3 engineers and 1 designer'",
        "Mention your explicit metrics: 'Increased Week-1 DAU by 5%'"
      ],
      "summaryChecklist": [
        "Lead with domain expertise (B2B SaaS, FinTech, Mobile)",
        "State exactly how you achieved product-market fit or growth experiments",
        "Clarify your roadmap execution style"
      ],
      "actionVerbs": [
        "Designed",
        "Prototyped",
        "Researched",
        "Iterated",
        "Wireframed",
        "Systematized",
        "Tested",
        "Empathized"
      ],
      "keySkills": [
        "Figma",
        "User Research",
        "Wireframing/Prototyping",
        "Interaction Design",
        "Design Systems",
        "Usability Testing",
        "HTML/CSS"
      ],
      "hrQuote": "At this level, you manage complex product strategy. I need to see module-level metrics: feature retention, market penetration, and how you managed stakeholders.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "At this level, you manage complex product strategy. I need to see module-level metrics: feature retention, market penetration, and how you managed stakeholders.",
        "summary": "Be extremely sharp with your product thesis. What is your track record of finding product-market fit or scaling early-stage features?",
        "projects": "I want to see thought leadership. Do you write about product strategy? Do you advise early startups? Show me your influence beyond your day job.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Project Management (Tech Projects)": {
    "starter": {
      "cvTitle": "Project Coordinator Intern",
      "cvSummary": "Highly organized Project Coordinator combining technical interest with strict timeline management. Assisted in the tracking and delivery of 2 minor software releases ahead of schedule.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Coordinated",
        "Delivered",
        "Mitigated",
        "Facilitated",
        "Budgeted",
        "Forecasted",
        "Aligned",
        "Managed"
      ],
      "keySkills": [
        "Agile/Scrum/Kanban",
        "Resource Allocation",
        "Risk Management",
        "Jira/Asana",
        "Budgeting",
        "Stakeholder Communication",
        "Timeline Forecasting"
      ],
      "hrQuote": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
        "summary": "Your summary must be your 2-second elevator pitch. What is your fundamental, hungry value-add as a fresh graduate?",
        "projects": "Show me a campaign, university event, or initiative you owned entirely. What was the exact ROI?",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Project Manager",
      "cvSummary": "Junior PM with 1 year experience supporting software delivery lifecycles. Managed targeted project segments, flagged critical path blockers early, and consistently supported sprint goals.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Coordinated",
        "Delivered",
        "Mitigated",
        "Facilitated",
        "Budgeted",
        "Forecasted",
        "Aligned",
        "Managed"
      ],
      "keySkills": [
        "Agile/Scrum/Kanban",
        "Resource Allocation",
        "Risk Management",
        "Jira/Asana",
        "Budgeting",
        "Stakeholder Communication",
        "Timeline Forecasting"
      ],
      "hrQuote": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
        "summary": "Highlight your primary go-to-market strength or operational specialty. I need to know your exact junior superpower immediately.",
        "projects": "Any side hustle or freelance consulting here shows excellent commercial awareness and drive.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Technical Project Manager",
      "cvSummary": "Technical PM with 3 years experience overseeing simultaneous software implementations. Aligned small engineering squads to deliver highly-requested features serving key B2B clients.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Coordinated",
        "Delivered",
        "Mitigated",
        "Facilitated",
        "Budgeted",
        "Forecasted",
        "Aligned",
        "Managed"
      ],
      "keySkills": [
        "Agile/Scrum/Kanban",
        "Resource Allocation",
        "Risk Management",
        "Jira/Asana",
        "Budgeting",
        "Stakeholder Communication",
        "Timeline Forecasting"
      ],
      "hrQuote": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
        "summary": "This must read like a razor-sharp executive summary. Highlight your targeted, high-dollar impacts and strategic execution skills.",
        "projects": "Mentoring roles, aggressive side-hustles, or strategic consulting engagements look excellent here.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Business Development (Tech Industry)": {
    "starter": {
      "cvTitle": "Sales Development Representative",
      "cvSummary": "Tenacious SDR with a strong outbound mindset. Generated 50+ qualified leads and secured initial discovery meetings during a recent heavy-outbound tech sales internship.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Secured",
        "Negotiated",
        "Exceeded",
        "Prospected",
        "Closed",
        "Generated",
        "Expanded",
        "Partnered"
      ],
      "keySkills": [
        "B2B SaaS Sales",
        "Lead Generation",
        "Contract Negotiation",
        "CRM (Salesforce)",
        "Strategic Partnerships",
        "MEDDIC/SPIN",
        "Pitching"
      ],
      "hrQuote": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
        "summary": "Your summary must be your 2-second elevator pitch. What is your fundamental, hungry value-add as a fresh graduate?",
        "projects": "Show me a campaign, university event, or initiative you owned entirely. What was the exact ROI?",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Account Executive",
      "cvSummary": "Junior AE with 1.5 years supporting enterprise SaaS deals. Consistently met quarterly quotas, managed basic sales cycles, and assisted in driving early-stage ARR growth.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Secured",
        "Negotiated",
        "Exceeded",
        "Prospected",
        "Closed",
        "Generated",
        "Expanded",
        "Partnered"
      ],
      "keySkills": [
        "B2B SaaS Sales",
        "Lead Generation",
        "Contract Negotiation",
        "CRM (Salesforce)",
        "Strategic Partnerships",
        "MEDDIC/SPIN",
        "Pitching"
      ],
      "hrQuote": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
        "summary": "Highlight your primary go-to-market strength or operational specialty. I need to know your exact junior superpower immediately.",
        "projects": "Any side hustle or freelance consulting here shows excellent commercial awareness and drive.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Business Development Manager",
      "cvSummary": "BD Manager with 3 years executing targeted Go-To-Market strategies. Independently secured strategic regional partnerships and closed complex B2B sales cycles to build local market presence.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Secured",
        "Negotiated",
        "Exceeded",
        "Prospected",
        "Closed",
        "Generated",
        "Expanded",
        "Partnered"
      ],
      "keySkills": [
        "B2B SaaS Sales",
        "Lead Generation",
        "Contract Negotiation",
        "CRM (Salesforce)",
        "Strategic Partnerships",
        "MEDDIC/SPIN",
        "Pitching"
      ],
      "hrQuote": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
        "summary": "This must read like a razor-sharp executive summary. Highlight your targeted, high-dollar impacts and strategic execution skills.",
        "projects": "Mentoring roles, aggressive side-hustles, or strategic consulting engagements look excellent here.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Digital Marketing (Tech-focused)": {
    "starter": {
      "cvTitle": "Digital Marketing Intern",
      "cvSummary": "Data-driven marketing entry-level specialist experienced in supporting multi-channel digital campaigns. Assisted in optimizing organic search content and led a pilot email campaign with a 15% open rate.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Acquired",
        "Optimized",
        "Campaigned",
        "Converted",
        "Segmented",
        "Generated",
        "Targeted",
        "Scaled"
      ],
      "keySkills": [
        "Performance Marketing (Ads)",
        "SEO/SEM",
        "Google Analytics",
        "CRM (HubSpot/Marketo)",
        "Content Strategy",
        "A/B Testing",
        "Email Automation"
      ],
      "hrQuote": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
        "summary": "Your summary must be your 2-second elevator pitch. What is your fundamental, hungry value-add as a fresh graduate?",
        "projects": "Show me a campaign, university event, or initiative you owned entirely. What was the exact ROI?",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Performance Marketer",
      "cvSummary": "Junior Performance Marketer with 1 year optimizing paid acquisition channels. Co-managed a targeted ad spend across Google, assisting in reducing overall Customer Acquisition Cost (CAC) by 10%.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Acquired",
        "Optimized",
        "Campaigned",
        "Converted",
        "Segmented",
        "Generated",
        "Targeted",
        "Scaled"
      ],
      "keySkills": [
        "Performance Marketing (Ads)",
        "SEO/SEM",
        "Google Analytics",
        "CRM (HubSpot/Marketo)",
        "Content Strategy",
        "A/B Testing",
        "Email Automation"
      ],
      "hrQuote": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
        "summary": "Highlight your primary go-to-market strength or operational specialty. I need to know your exact junior superpower immediately.",
        "projects": "Any side hustle or freelance consulting here shows excellent commercial awareness and drive.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Digital Marketing Manager",
      "cvSummary": "Marketing Manager with 3 years executing tech acquisition strategies. Orchestrated product-led marketing initiatives that resulted in a 40% surge in qualified inbound leads.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Acquired",
        "Optimized",
        "Campaigned",
        "Converted",
        "Segmented",
        "Generated",
        "Targeted",
        "Scaled"
      ],
      "keySkills": [
        "Performance Marketing (Ads)",
        "SEO/SEM",
        "Google Analytics",
        "CRM (HubSpot/Marketo)",
        "Content Strategy",
        "A/B Testing",
        "Email Automation"
      ],
      "hrQuote": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
        "summary": "This must read like a razor-sharp executive summary. Highlight your targeted, high-dollar impacts and strategic execution skills.",
        "projects": "Mentoring roles, aggressive side-hustles, or strategic consulting engagements look excellent here.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Operations (Tech Operations / Process Automation)": {
    "starter": {
      "cvTitle": "Operations Analyst Intern",
      "cvSummary": "Operations Analyst driven by efficiency and process optimization. Automated manual vendor reporting tasks using native Zapier integrations during a recent fast-paced internship.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Streamlined",
        "Automated",
        "Scaled",
        "Reduced",
        "Eliminated",
        "Standardized",
        "Overhauled",
        "Dispatched"
      ],
      "keySkills": [
        "Process Engineering",
        "Supply Chain/Logistics",
        "Operations Management",
        "SQL",
        "Zapier/Make",
        "P&L Management",
        "Six Sigma/Lean"
      ],
      "hrQuote": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
        "summary": "Your summary must be your 2-second elevator pitch. What is your fundamental, hungry value-add as a fresh graduate?",
        "projects": "Show me a campaign, university event, or initiative you owned entirely. What was the exact ROI?",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Operations Manager",
      "cvSummary": "Junior Operations Manager with 1.5 years supporting high-growth startup fulfillment. Assisted in redesigning logistics workflows, helping to cut delivery SLA breaches by 5%.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Streamlined",
        "Automated",
        "Scaled",
        "Reduced",
        "Eliminated",
        "Standardized",
        "Overhauled",
        "Dispatched"
      ],
      "keySkills": [
        "Process Engineering",
        "Supply Chain/Logistics",
        "Operations Management",
        "SQL",
        "Zapier/Make",
        "P&L Management",
        "Six Sigma/Lean"
      ],
      "hrQuote": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
        "summary": "Highlight your primary go-to-market strength or operational specialty. I need to know your exact junior superpower immediately.",
        "projects": "Any side hustle or freelance consulting here shows excellent commercial awareness and drive.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Operations Manager",
      "cvSummary": "Operations Leader with 3 years experience building scalable startup operations. Governed a tight operating budget and successfully supported the operational expansion into a new regional market.",
      "experienceChecklist": [
        "Quantify your commercial success: 'Exceeded strict quarterly quota by 110%'",
        "Show targeted impact: 'Managed targeted budget, achieving 5% under-spend'",
        "Detail optimization wins: 'Halved onboarding time via Zapier automation'"
      ],
      "summaryChecklist": [
        "State your Go-To-Market or operational domain",
        "Lead with aggregate revenue or major regional clients won",
        "Highlight strategic relationship building and hustle"
      ],
      "actionVerbs": [
        "Streamlined",
        "Automated",
        "Scaled",
        "Reduced",
        "Eliminated",
        "Standardized",
        "Overhauled",
        "Dispatched"
      ],
      "keySkills": [
        "Process Engineering",
        "Supply Chain/Logistics",
        "Operations Management",
        "SQL",
        "Zapier/Make",
        "P&L Management",
        "Six Sigma/Lean"
      ],
      "hrQuote": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
        "summary": "This must read like a razor-sharp executive summary. Highlight your targeted, high-dollar impacts and strategic execution skills.",
        "projects": "Mentoring roles, aggressive side-hustles, or strategic consulting engagements look excellent here.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Other (Please Specify)": {
    "starter": {
      "cvTitle": "Entry-Level Professional",
      "cvSummary": "Proactive and detail-oriented recent graduate with a strong foundation in problem-solving and cross-functional collaboration. Proven ability to quickly master new tools.",
      "experienceChecklist": [
        "Quantify the scale of your impact (budget, team, time saved)",
        "Focus tightly on revenue generated or costs saved",
        "Remove generic soft-skills and focus on executed actions"
      ],
      "summaryChecklist": [
        "Cut the fluff: state exactly what you do in 5 seconds",
        "Show evidence of massive scale or execution speed",
        "Define exactly what value you bring to the company"
      ],
      "actionVerbs": [
        "Led",
        "Managed",
        "Optimized",
        "Developed",
        "Implemented",
        "Executed",
        "Coordinated",
        "Analyzed"
      ],
      "keySkills": [
        "Problem Solving",
        "Cross-functional Collaboration",
        "Team Management",
        "Agile Execution",
        "Strategic Planning",
        "Communication",
        "Data Entry"
      ],
      "hrQuote": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "For entry biz roles, numbers matter. Quantify your hustle: how many users you acquired, events organized, or dollars saved during your internships.",
        "summary": "Your summary must be your 2-second elevator pitch. What is your fundamental, hungry value-add as a fresh graduate?",
        "projects": "Show me a campaign, university event, or initiative you owned entirely. What was the exact ROI?",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Professional",
      "cvSummary": "Junior professional with 1+ years driving cross-functional initiatives. Consistently optimized internal processes and delivered high-quality outcomes under tight deadlines.",
      "experienceChecklist": [
        "Quantify the scale of your impact (budget, team, time saved)",
        "Focus tightly on revenue generated or costs saved",
        "Remove generic soft-skills and focus on executed actions"
      ],
      "summaryChecklist": [
        "Cut the fluff: state exactly what you do in 5 seconds",
        "Show evidence of massive scale or execution speed",
        "Define exactly what value you bring to the company"
      ],
      "actionVerbs": [
        "Led",
        "Managed",
        "Optimized",
        "Developed",
        "Implemented",
        "Executed",
        "Coordinated",
        "Analyzed"
      ],
      "keySkills": [
        "Problem Solving",
        "Cross-functional Collaboration",
        "Team Management",
        "Agile Execution",
        "Strategic Planning",
        "Communication",
        "Data Entry"
      ],
      "hrQuote": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you can independently drive some revenue or operational efficiency. I'm scanning for percentages, dollars, and months saved even in your first year.",
        "summary": "Highlight your primary go-to-market strength or operational specialty. I need to know your exact junior superpower immediately.",
        "projects": "Any side hustle or freelance consulting here shows excellent commercial awareness and drive.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Experienced Professional",
      "cvSummary": "Professional with 3 years experience guiding strategic initiatives and managing complex portfolios. Renowned for turning early organizational chaos into stable, scalable systems.",
      "experienceChecklist": [
        "Quantify the scale of your impact (budget, team, time saved)",
        "Focus tightly on revenue generated or costs saved",
        "Remove generic soft-skills and focus on executed actions"
      ],
      "summaryChecklist": [
        "Cut the fluff: state exactly what you do in 5 seconds",
        "Show evidence of massive scale or execution speed",
        "Define exactly what value you bring to the company"
      ],
      "actionVerbs": [
        "Led",
        "Managed",
        "Optimized",
        "Developed",
        "Implemented",
        "Executed",
        "Coordinated",
        "Analyzed"
      ],
      "keySkills": [
        "Problem Solving",
        "Cross-functional Collaboration",
        "Team Management",
        "Agile Execution",
        "Strategic Planning",
        "Communication",
        "Data Entry"
      ],
      "hrQuote": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Mid-level leaders own the outcome. Explain exactly how you scaled a process, doubled a small sales team's output, or transformed an operational bottleneck.",
        "summary": "This must read like a razor-sharp executive summary. Highlight your targeted, high-dollar impacts and strategic execution skills.",
        "projects": "Mentoring roles, aggressive side-hustles, or strategic consulting engagements look excellent here.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "__default__": {
    "starter": {
      "cvTitle": "Aspiring Software Engineer",
      "cvSummary": "Recent Computer Science graduate with internship experience building scalable web applications. Developed full-stack projects using React and Node.js with a strong focus on clean, testable code.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Architected",
        "Engineered",
        "Deployed",
        "Refactored",
        "Optimized",
        "Scaled",
        "Integrated",
        "Spearheaded"
      ],
      "keySkills": [
        "JavaScript/TypeScript",
        "Python/Java/Go",
        "React/Vue/Angular",
        "Node.js/Spring Boot",
        "SQL/NoSQL",
        "Docker",
        "Git/CI/CD"
      ],
      "hrQuote": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "For interns, I don't just want to see tech buzzwords. I want to see exactly what YOU built and the measurable impact it had, even if it's a capstone university project.",
        "summary": "Your summary should scream 'I build things.' Tell me your primary stack and one cool project you've shipped. Don't waste my time with 'hard-working graduate'.",
        "projects": "Projects are your real CV at this level. Link the GitHub repo, highlight the architecture decisions, and be honest about the trade-offs you made.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Junior Software Engineer",
      "cvSummary": "Junior Software Engineer with 1+ years of experience contributing to high-traffic distributed systems. Reduced API latency by 15% and improved test coverage across core microservices.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Architected",
        "Engineered",
        "Deployed",
        "Refactored",
        "Optimized",
        "Scaled",
        "Integrated",
        "Spearheaded"
      ],
      "keySkills": [
        "JavaScript/TypeScript",
        "Python/Java/Go",
        "React/Vue/Angular",
        "Node.js/Spring Boot",
        "SQL/NoSQL",
        "Docker",
        "Git/CI/CD"
      ],
      "hrQuote": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Junior-level means you own complex feature tickets. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
        "summary": "Lead with the scale of the systems you've contributed to. Thousands of requests? Core microservices? Put that directly in the first line.",
        "projects": "Highlight side projects that solve developer pain points (open source, CLI tools) - they show deep passion for craftsmanship outside of work hours.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Software Engineer",
      "cvSummary": "Software Engineer with 3 years of experience orchestrating core platform features. Led a team of 3 junior engineers to successfully migrate a monolithic feature branch to an event-driven architecture.",
      "experienceChecklist": [
        "No generic tickets: 'Optimized PostgreSQL queries, reducing read latency by 15%'",
        "Show system context: 'Contributed to microservices handling 5k+ RPM'",
        "Clearly mention tooling context: 'Deployed on AWS using Terraform'"
      ],
      "summaryChecklist": [
        "Lead with your strongest domains (Backend, Infra, Full Stack)",
        "Cite heavy-hitting scalability or architectural contributions",
        "Include only strictly factual technologies, avoid 'team player'"
      ],
      "actionVerbs": [
        "Architected",
        "Engineered",
        "Deployed",
        "Refactored",
        "Optimized",
        "Scaled",
        "Integrated",
        "Spearheaded"
      ],
      "keySkills": [
        "JavaScript/TypeScript",
        "Python/Java/Go",
        "React/Vue/Angular",
        "Node.js/Spring Boot",
        "SQL/NoSQL",
        "Docker",
        "Git/CI/CD"
      ],
      "hrQuote": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "As a solid mid-level, you are a force multiplier. Show me how you improved junior developer velocity, drove architectural standards, and led technical initiatives.",
        "summary": "You are a seasoned engineer. Your summary must convey technical authority and your ability to align engineering architecture with business goals.",
        "projects": "If you mention open source at this level, I expect you to be a steady contributor to a widely used framework or building impressive full-stack apps.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  }
};

export function getRoleData(role: string | null): RoleData {
  const fallback = ROLE_DATA["Software Engineering (SWE)"];
  if (!role) return fallback;
  return ROLE_DATA[role] ?? fallback;
}

export function getRoleLevelData(role: string | null, level: Level): RoleLevelData {
  const data = getRoleData(role);
  return data[level];
}
