export type Level = 'starter' | 'developing' | 'ready';

export interface RoleLevelData {
  cvTitle: string;
  cvSummary: string;
  experienceChecklist: [string, string, string];
  summaryChecklist: [string, string, string];
  projectsChecklist: [string, string, string];
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
        "Intern-scale proof: what you shipped (PRs, components, endpoints) — not 'assisted generally'",
        "Name stack + scope: React/Node, repo, team size, or users if you have a number",
        "One measurable win if possible: % faster, fewer bugs, test coverage, or demo users"
      ],
      "summaryChecklist": [
        "Say degree / grad year / target role in the first line",
        "One strong proof: internship, capstone, or shipped project with a metric",
        "List real tools (languages, frameworks) — skip empty adjectives"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Software Engineer Fresher",
      "cvSummary": "Software engineer fresher: completed a summer internship shipping UI and API fixes, plus capstone projects in React and Node. Comfortable with Git, code review, and writing unit tests; eager to grow in a product team.",
      "experienceChecklist": [
        "Say what merged: tickets/PRs/small features — and that you went through review",
        "Stack proof: languages, frameworks, tests/CI, staging or prod if true",
        "One honest metric: bugs fixed, build time, coverage, pilot users — intern/first-role scale is fine"
      ],
      "summaryChecklist": [
        "Line 1: target role + stack (Frontend / Backend / Full-stack)",
        "One internship or capstone story: what shipped and who used it",
        "3–5 real tools; drop empty adjectives"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For a fresher: I still want one ticket owned end-to-end — not chores. Show code that merged, tests you wrote, and a number if you have it. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Fresher bar: one slice you owned in review — a bug, small feature, or test gap closed. Show the PR or ticket, stack, and one honest metric (latency, bugs, coverage).",
        "summary": "First line = target stack + internship/capstone proof. I should see languages, frameworks, and what shipped — not vague 'passionate learner'.",
        "projects": "Projects matter: repo link, one architecture choice, and a metric or user count at intern scale. Trade-offs beat buzzwords.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career Software Engineer",
      "cvSummary": "Early-career software engineer (~12–18 months combined internship + part-time): shipped features behind feature flags, improved test coverage on a core service, and paired with seniors on refactors. Ready to own small modules with support.",
      "experienceChecklist": [
        "Own a slice: feature, module, or bug-bash theme — define what 'done' meant",
        "Collaboration: pairing, reviews, docs, or on-call shadow you actually did",
        "One quality/perf signal: tests, monitoring, latency, or reliability — with a number if you can"
      ],
      "summaryChecklist": [
        "State ~12–18 months internship/part-time honestly — not 'senior'",
        "Your strongest shipped win + metric (even hundreds of users counts)",
        "What you want next: team type, stack, or problem space"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For early-career hires, show me momentum: a feature you owned, how you unblocked others, and one metric or quality bar you moved — without claiming you ran the whole org.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Early-career signal: ownership on a real slice, collaboration proof, and one crisp outcome — not 'led the company'.",
        "summary": "Strong fresher / early-career: say months honestly, your strongest shipped win, and what you want next. Authority comes from specifics, not 'senior' adjectives.",
        "projects": "Show depth on one project: problem, stack, tests/CI if any, and a real outcome — contributor to OSS is a plus, not required.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Artificial Intelligence (AI) / Machine Learning (ML)": {
    "starter": {
      "cvTitle": "Aspiring AI/ML Engineer",
      "cvSummary": "Recent graduate with strong foundations in statistical modeling and deep learning. Built and deployed experimental computer vision models utilizing PyTorch during a university research project.",
      "experienceChecklist": [
        "Task + data: what you modeled, dataset source (Kaggle/campus/research is fine) and honest size",
        "Method + metric: PyTorch/TF/sklearn, what you trained, what you measured vs a baseline",
        "Artifact: notebook, script, or demo someone could rerun — not a bullet list of algorithms only"
      ],
      "summaryChecklist": [
        "Line 1: ML intern / research / junior MLE + strongest framework (PyTorch/TF/sklearn)",
        "One build story: train → eval → what improved, even on toy or class data",
        "Python + libs you truly used; skip 'transforming industries' fluff"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "Show me you touched real data: labeling, cleaning, splits, or baselines — and what metric moved. School projects count if the eval is honest.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "Show me you touched real data: labeling, cleaning, splits, or baselines — and what metric moved. School projects count if the eval is honest.",
        "summary": "I should see frameworks + one modeling story in the first lines — not a generic 'passionate about AI'.",
        "projects": "Notebook is fine if it's reproducible: data path, train/eval, and one clear failure mode you handled.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "ML Engineer Fresher",
      "cvSummary": "ML fresher: internship and coursework in PyTorch — fine-tuned small models, ran offline evals, and helped package a demo for stakeholders. Comfortable with notebooks, basic MLOps, and reading papers.",
      "experienceChecklist": [
        "Internship deliverable: fine-tune, eval harness, packaging step, or demo you owned",
        "Experiment hygiene: splits, seeds, logging — what made your numbers believable",
        "Trade-off you can explain: accuracy vs latency, data vs model, cloud vs local"
      ],
      "summaryChecklist": [
        "Fresher MLE: internship + PyTorch/TF/sklearn focus in line 1",
        "Strongest eval or stakeholder demo — metric before hype",
        "MLOps you actually used (Docker, MLflow, CI tests) — omit if you didn't"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "ML fresher: show me an experiment you ran — hypothesis, metric, and what you'd try next. Dashboards alone don't replace model rigor.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want model work: training setup, eval numbers, and a failure you debugged — not only slides about AI.",
        "summary": "Bridge research and shipping: frameworks + one internship win + how you communicated uncertainty to non-ML folks.",
        "projects": "End-to-end beats slides: data → train → eval → (optional) small deploy or API — show the weakest link you strengthened.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career ML Engineer",
      "cvSummary": "Early-career ML engineer: second internship + research assistantship — shipped a small model to staging, monitored drift, and documented reproducible training. Interested in reliable, explainable deployments.",
      "experienceChecklist": [
        "Path to staging or prod: how others triggered or consumed the model — honest scope",
        "Drift, monitoring, or rollback story — even a plan you documented counts",
        "~12–18 months combined; no 'org-wide AI strategy' unless you really owned it"
      ],
      "summaryChecklist": [
        "Timeline honest: internships + research/part-time months",
        "Reliability angle: reproducible training, monitoring, or handoff you improved",
        "Next domain (CV, NLP, recsys) with realistic early-career scope"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "Early-career ML: show how you made training reproducible and how you'd catch production issues — governance can be small and real.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want staging-grade ML: versioning, evals, and what you'd monitor day two — not a research-only CV.",
        "summary": "Strong intern/fresher arc: research + shipping + honest limits. I'm hiring judgment, not a keynote.",
        "projects": "Novelty optional; reliability wins — show tests, containers, or a thin serving path if you built one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Data Analytics (DA) & Business Intelligence (BI)": {
    "starter": {
      "cvTitle": "Aspiring Data Analyst",
      "cvSummary": "Detail-oriented entry-level Data Analyst adept at transforming raw data into actionable insights using SQL and Tableau. Passionate about product telemetry and user behavior analytics.",
      "experienceChecklist": [
        "Business question first: funnel, cohort, ops metric — what you were asked to explain",
        "SQL or spreadsheet proof: joins, filters, or viz tool — name the artifact (sheet, chart, query)",
        "Decision link: what someone did differently because of your table or chart (even small)"
      ],
      "summaryChecklist": [
        "Line 1: aspiring analyst + SQL + one viz tool (Tableau/PowerBI/Looker/Sheets)",
        "One internship, case comp, or class project where a stakeholder acted on your number",
        "Messy data win: cleaning, definitions, or QA you owned — intern scale is fine"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "Entry-level analyst: show the question, the query or sheet, and what changed because of your answer — not a list of courses.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want SQL or viz proof and a stakeholder — PM, ops, or mentor — who used your output.",
        "summary": "Toolkit + one concrete project in the first lines; I'm hiring curiosity with rigor, not buzzwords.",
        "projects": "Dashboard or notebook is fine if I see data lineage: source, cleaning, and the metric you stood behind.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Data Analyst Fresher",
      "cvSummary": "Data analyst fresher: internship building Looker/Sheets dashboards and SQL queries for product funnels; presented findings to PMs. Strong in SQL, spreadsheets, and turning messy exports into clear charts.",
      "experienceChecklist": [
        "Funnel or metric you owned in the internship: definition, query, and chart",
        "How you validated numbers: QA checks, reconciliations, or cross-team confirmation",
        "One win at fresher scale: time saved, clearer decision, or bug in data you caught"
      ],
      "summaryChecklist": [
        "Fresher analyst: internship + SQL + primary viz stack",
        "Story: PM/ops meeting where your analysis changed the next step",
        "A/B or experiment exposure — only if you really touched setup or readout"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
        "summary": "Bridge SQL and the business: internship + strongest funnel or ops story — avoid implying years you don't have; 'internship + projects' is honest.",
        "projects": "Depth beats breadth: one messy dataset you tamed with clear definitions and a viz stakeholders trusted.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career Data Analyst",
      "cvSummary": "Early-career analyst: ~12 months across internship + junior projects — standardized a few core metrics, documented definitions, and supported A/B readouts. Wants to deepen experimentation and attribution.",
      "experienceChecklist": [
        "Metric definition you tightened: name, formula, and who signed off",
        "Experiment or readout you supported: hypothesis, audience, and how you communicated uncertainty",
        "Cross-functional: how you turned a vague ask into a measurable question"
      ],
      "summaryChecklist": [
        "~10–18 months internship + analyst work stated honestly — not 'mid-level'",
        "Strongest experiment or funnel story with one number you stand behind",
        "How you document definitions so the next hire trusts the dashboard"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "Early-career analyst: show metric governance or experiment support you actually touched — small scope with clear ownership beats vague 'infrastructure'.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want crisp definitions and trustworthy readouts — how you stopped the team from arguing about the same number twice.",
        "summary": "Honest months + your strongest attribution or experiment win. I'm not hiring a director; I'm hiring someone who makes data legible.",
        "projects": "Show a project where documentation or a metric spec mattered as much as the chart.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Data Engineering": {
    "starter": {
      "cvTitle": "Aspiring Data Engineer",
      "cvSummary": "Data-focused recent graduate with strong SQL and Python skills. Built automated ETL pipelines using Apache Airflow during a 6-month internship focused on cloud data warehousing.",
      "experienceChecklist": [
        "Pipeline or SQL you wrote: source → transform → destination (even sample/campus data)",
        "Tools named: Airflow/Prefect, dbt, warehouse (BigQuery/Snowflake), or plain Postgres",
        "Reliability story: fixed a failing job, added a test/check, or cut runtime — intern scale"
      ],
      "summaryChecklist": [
        "Degree + target (Data Engineer / Analytics Engineer) in line 1",
        "One pipeline or internship deliverable with a concrete artifact (DAG, repo, dashboard)",
        "List SQL + Python + one orchestration or warehouse tool you truly used"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Data Engineer Fresher",
      "cvSummary": "Data engineering fresher: internship writing Airflow DAGs and SQL transforms; fixed failing jobs and added data quality checks. Learning Spark/warehouse patterns on the job.",
      "experienceChecklist": [
        "DAG or job you touched: schedule, dependencies, and what broke/fixed",
        "Data quality: tests, assertions, dedupe, or schema checks you added",
        "Runtime/cost win: partition strategy, smaller batch, or query tweak with a before/after"
      ],
      "summaryChecklist": [
        "Fresher headline: internship + stack (Airflow, SQL, warehouse)",
        "One story: reliable daily load, backfill, or stakeholder dataset you supported",
        "What you're learning next (Spark, streaming, dbt) — realistic for your level"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For a data fresher: show me a job you touched end-to-end — SQL transform, DAG task, or data check — with what broke and how you fixed it.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "I want pipeline proof: a DAG, table, or job you changed that others rely on — not 'helped with data' with no artifact.",
        "summary": "Lead with orchestration + warehouse + one reliability story (failed run, backfill, SLA). Skip frontend-style bragging.",
        "projects": "Pipeline or analytics-engineering projects win: show data flow, tools, and how you measured success (freshness, runtime, row counts).",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career Data Engineer",
      "cvSummary": "Early-career data engineer: built reliable pipelines for internal stakeholders, cut a recurring batch runtime with partitioning, and documented SLAs. Comfortable with SQL, Python, and cloud basics.",
      "experienceChecklist": [
        "End-to-end ownership: table/model consumers rely on — how you kept it trustworthy",
        "Cross-team: PM, analytics, or eng — how you made requirements measurable",
        "SLA or scale: latency, freshness, cost — one number, no fake 'petabyte' claims"
      ],
      "summaryChecklist": [
        "~12–18 months combined experience stated clearly",
        "Strongest pipeline win + who consumed the data",
        "How you document and hand off (README, runbook, data dictionary)"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For early-career hires, show me momentum: a feature you owned, how you unblocked others, and one metric or quality bar you moved — without claiming you ran the whole org.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Early-career data: show stakeholder-facing tables or jobs you kept trustworthy — ownership without exaggerating scale.",
        "summary": "~12–18 months honest timeline + strongest pipeline outcome + who consumed the data. Authority = specifics on freshness, cost, or quality.",
        "projects": "Prefer projects with lineage, tests, or runbooks. I care that others could operate what you built.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    }
  },
  "Cloud Engineering / DevOps": {
    "starter": {
      "cvTitle": "Aspiring Cloud Engineer",
      "cvSummary": "Systems-oriented graduate passionate about infrastructure as code. Built and deployed automated CI/CD pipelines using GitHub Actions and containerized applications with Docker for personal projects.",
      "experienceChecklist": [
        "CI/CD or IaC you built: workflow file, Terraform module, or Docker image — link or describe",
        "Environment: GitHub Actions, GitLab, Jenkins, or cloud console — what you actually ran",
        "Outcome: faster deploy, fewer manual steps, or reproducible env for teammates"
      ],
      "summaryChecklist": [
        "Target role (DevOps / Cloud / Platform intern) + Linux/CLI comfort",
        "One homelab, hackathon, or internship infra project with artifacts",
        "Name 3 tools: e.g. Docker, Terraform, AWS/GCP, Actions — only if true"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "DevOps / Cloud Fresher",
      "cvSummary": "DevOps fresher: internship helping CI pipelines, Terraform modules, and staging deploys; chased flaky tests and cost leaks (unused tags). Eager to deepen observability and incident practice.",
      "experienceChecklist": [
        "Pipeline change you shipped: test gate, cache, deploy step, or secret handling",
        "Infra as code: module, variable pattern, or state fix you contributed",
        "Stability or cost: flaky test, rollback drill, tag cleanup, idle resource — pick one"
      ],
      "summaryChecklist": [
        "Fresher DevOps: internship + primary cloud (AWS/GCP/Azure)",
        "CI + containers or K8s basics — what you operated, not just read about",
        "Safety mindset: least privilege, backups, or staging-first — mention if real"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For a DevOps fresher: one CI/CD or IaC change that merged — workflow, module, or image — plus how you verified it (tests, staging, rollback).",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Show infra you actually ran: pipeline ID, Terraform resource type, or container you built — not vague 'supported cloud'.",
        "summary": "Cloud + automation first line; then one story about deploy speed, flaky tests, or cost/tag cleanup at intern scale.",
        "projects": "Homelab counts: Actions pipeline, Docker compose, small K8s manifest — link it and say what broke and how you fixed it.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career Cloud / DevOps Engineer",
      "cvSummary": "Early-career cloud engineer: supported on-call rotations with guardrails, improved Dockerfile patterns, and helped cut idle dev resources. Focus on safe, boring infrastructure.",
      "experienceChecklist": [
        "Incident or risk: what you detected, how you mitigated, what you documented after",
        "Platform improvement: image hardening, autoscaling tweak, or observability signal you added",
        "Team enablement: runbook, template, or self-service path for other devs"
      ],
      "summaryChecklist": [
        "~12–18 months combined; on-call shadow or pager duty only if true",
        "Biggest reliability or cost win with a number",
        "What boring infra you want to master next (SRE, K8s, FinOps)"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For early-career hires, show me momentum: a feature you owned, how you unblocked others, and one metric or quality bar you moved — without claiming you ran the whole org.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Early-career platform: incident or risk you handled with a runbook update, safer deploy path, or observability gap you closed.",
        "summary": "Honest months on-call or shadow + biggest reliability/cost win. I want boring, safe infrastructure stories.",
        "projects": "Templates, modules, or internal tools that speed other devs up — show how adoption or toil dropped.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For product manager interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "For product manager interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
        "summary": "Product is about solving problems. Use your summary to show you have a product mindset. Who are you building for and why do you care?",
        "projects": "Even side projects count heavily. Did you build a Shopify store? Did you launch a campus newsletter? Show me you can hustle from zero to one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Product Manager Fresher",
      "cvSummary": "Product manager fresher: internship owning a narrow onboarding experiment — wrote concise specs, tracked funnel metrics, and coordinated with design + eng in weekly rituals.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Product Manager",
      "cvSummary": "Early-career PM: ~12–18 months across internship + junior PM — shipped a scoped feature with clear success metrics, ran lightweight user interviews, and kept stakeholders aligned on trade-offs.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For product manager interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "For product manager interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
        "summary": "Product is about solving problems. Use your summary to show you have a product mindset. Who are you building for and why do you care?",
        "projects": "Even side projects count heavily. Did you build a Shopify store? Did you launch a campus newsletter? Show me you can hustle from zero to one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Growth PM Fresher",
      "cvSummary": "Growth fresher: internship running cohort analyses and small A/B tests in Amplitude/Mixpanel; proposed copy and UX tweaks that improved activation in a student-side project.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Growth PM",
      "cvSummary": "Early-career growth PM: helped stand up experiment hygiene (hypothesis templates, guardrail metrics) and supported referral experiments; data-first but still learning org politics.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
        "Requirements artifact you touched: user story, acceptance criteria, or workshop notes — be specific",
        "Tooling: Jira/Confluence/Sheets — what board, doc, or ticket type you updated",
        "Stakeholder: who you translated for (PM, eng, ops) and what decision moved"
      ],
      "summaryChecklist": [
        "Line 1: BA intern + domain hint (fintech, ops, internal tools)",
        "Bridge story: messy ask → clearer tickets or specs",
        "Tools: Jira/Confluence/SQL basics — only what you used"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "BA intern: show me a requirement you helped clarify — before/after — and the ticket or doc where it landed.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want traceability: workshop → decision → Jira/Confluence — not 'supported meetings' with no output.",
        "summary": "Your summary should scream bridge role: stakeholders + structured specs + tools you actually clicked.",
        "projects": "Case study or capstone: problem, process map or backlog slice, and what engineering could build from it.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Business Analyst Fresher",
      "cvSummary": "Business analyst fresher: internship writing user stories, process maps, and acceptance criteria; facilitated stand-ups for a small squad and learned Jira/Confluence workflows.",
      "experienceChecklist": [
        "User stories or AC you owned: epic link, edge cases, definition of done",
        "Process or data flow you mapped — who signed off that it matched reality",
        "Rework you reduced: fewer clarification pings, faster UAT, or clearer scope"
      ],
      "summaryChecklist": [
        "Fresher BA: internship + Agile/Jira rhythm you lived in",
        "Facilitation win: stand-up, refinement, or stakeholder session with an outcome",
        "SQL or light analysis — only if it shows up in your bullets"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "I want crisp stories and acceptance criteria — evidence you can protect engineering from churn.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want crisp stories and acceptance criteria — evidence you can protect engineering from churn.",
        "summary": "Bridge BA/PO tone: internship + strongest backlog or process win — don't borrow a Data Analyst headline.",
        "projects": "Show a slice you could hand to eng tomorrow: scope, risks, and test scenarios.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career Business Analyst",
      "cvSummary": "Early-career BA: standardized BRDs for two squads, reduced rework on requirements, and supported UAT for a billing module — strong facilitator, still deepening domain.",
      "experienceChecklist": [
        "BRD/FRD or template you standardized — before/after on ambiguity or review cycles",
        "UAT or rollout you supported: defects triaged, sign-off criteria, stakeholder comms",
        "Cross-squad dependency you mapped and kept unblocked"
      ],
      "summaryChecklist": [
        "~12–18 months internship + BA work stated honestly",
        "Strongest documentation or facilitation win with a metric (time, defects, rework)",
        "Domain you're building depth in (billing, onboarding, internal tools, etc.)"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "Early-career BA: show how your specs reduced rework or sped UAT — ownership without pretending you ran the company.",
      "hrName": "Sarah Thompson",
      "hrRole": "HR Lead",
      "hrCompany": "shopee",
      "hrQuotes": {
        "experience": "I want governance light: templates, traceability, and how you kept conflicting stakeholders aligned.",
        "summary": "Honest tenure + your best BRD/UAT story. I'm hiring judgment on scope, not a CFO pitch.",
        "projects": "Prefer projects with real stakeholders and change management — not a solo algorithm dive.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For product manager interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
      "hrName": "Marcus Lee",
      "hrRole": "Head of Product",
      "hrCompany": "google",
      "hrQuotes": {
        "experience": "For product manager interns, your bullet points must prove you can herd cats. Show me you identified a real problem, aligned a team without authority, and shipped something tangible.",
        "summary": "Product is about solving problems. Use your summary to show you have a product mindset. Who are you building for and why do you care?",
        "projects": "Even side projects count heavily. Did you build a Shopify store? Did you launch a campus newsletter? Show me you can hustle from zero to one.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "developing": {
      "cvTitle": "Product Designer Fresher",
      "cvSummary": "Product design fresher: internship shipping UI in Figma, maintaining a small component library, and running 5 usability sessions that informed iteration on a B2B workflow.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Product Designer",
      "cvSummary": "Early-career designer: led visual polish for a key flow, partnered with PM/eng on accessibility fixes, and contributed tokens to a growing design system.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Project Coordinator Fresher",
      "cvSummary": "Project coordinator fresher: tracked milestones in Notion/Jira, chased dependencies, and communicated risks early for a 6-month internship squad shipping internal tools.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Technical PM",
      "cvSummary": "Early-career technical PM: coordinated two parallel workstreams, translated client asks into backlog slices, and improved estimation hygiene with eng leads.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Sales Development Fresher",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Sales / Account Fresher",
      "cvSummary": "Sales fresher: SDR internship + light closing support — qualified inbound leads, maintained CRM hygiene, and shadowed AEs on discovery calls.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Business Development",
      "cvSummary": "Early-career biz dev: supported two regional partnership pilots, drafted outreach, and helped negotiate starter commercial terms with mentorship.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Performance Marketing Fresher",
      "cvSummary": "Marketing fresher: internship optimizing Google/Meta test campaigns, building UTMs, and reporting weekly ROAS to a lead; comfortable with spreadsheets and creative briefs.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Digital Marketer",
      "cvSummary": "Early-career marketer: owned lifecycle emails for a launch, coordinated with product on messaging, and improved landing page conversion with iterative tests.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Operations Fresher",
      "cvSummary": "Operations fresher: internship mapping vendor SLAs, fixing recurring fulfillment errors in spreadsheets, and supporting weekly ops reviews.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Early-career Operations Associate",
      "cvSummary": "Early-career ops: helped open a second city playbook — vendor onboarding checklists, staffing ramp, and daily KPI dashboards for leadership.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Graduate (open track)",
      "cvSummary": "Recent graduate with internship experience across admin and ops projects: organized cross-team meetings, tightened templates, and shipped small process wins.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Strong graduate (multi-internship)",
      "cvSummary": "Strong graduate profile: multiple internships — coordinated stakeholders, owned recurring reporting, and left playbooks behind for the next cohort.",
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
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
        "Intern-scale proof: what you shipped (PRs, components, endpoints) — not 'assisted generally'",
        "Name stack + scope: React/Node, repo, team size, or users if you have a number",
        "One measurable win if possible: % faster, fewer bugs, test coverage, or demo users"
      ],
      "summaryChecklist": [
        "Say degree / grad year / target role in the first line",
        "One strong proof: internship, capstone, or shipped project with a metric",
        "List real tools (languages, frameworks) — skip empty adjectives"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "cvTitle": "Software Engineer Fresher",
      "cvSummary": "Software engineer fresher: completed a summer internship shipping UI and API fixes, plus capstone projects in React and Node. Comfortable with Git, code review, and writing unit tests; eager to grow in a product team.",
      "experienceChecklist": [
        "Say what merged: tickets/PRs/small features — and that you went through review",
        "Stack proof: languages, frameworks, tests/CI, staging or prod if true",
        "One honest metric: bugs fixed, build time, coverage, pilot users — intern/first-role scale is fine"
      ],
      "summaryChecklist": [
        "Line 1: target role + stack (Frontend / Backend / Full-stack)",
        "One internship or capstone story: what shipped and who used it",
        "3–5 real tools; drop empty adjectives"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For a fresher: I still want one ticket owned end-to-end — not chores. Show code that merged, tests you wrote, and a number if you have it. 'Responsible for UI' means nothing. 'Architected a cache optimization reducing load time by 15%' gets you hired.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Fresher bar: one slice you owned in review — a bug, small feature, or test gap closed. Show the PR or ticket, stack, and one honest metric (latency, bugs, coverage).",
        "summary": "First line = target stack + internship/capstone proof. I should see languages, frameworks, and what shipped — not vague 'passionate learner'.",
        "projects": "Projects matter: repo link, one architecture choice, and a metric or user count at intern scale. Trade-offs beat buzzwords.",
        "header": "Your header is the single most important 5 seconds of the CV. Keep it minimalist: Name, Role, Location, Top 2 Links."
      }
    },
    "ready": {
      "cvTitle": "Early-career Software Engineer",
      "cvSummary": "Early-career software engineer (~12–18 months combined internship + part-time): shipped features behind feature flags, improved test coverage on a core service, and paired with seniors on refactors. Ready to own small modules with support.",
      "experienceChecklist": [
        "Own a slice: feature, module, or bug-bash theme — define what 'done' meant",
        "Collaboration: pairing, reviews, docs, or on-call shadow you actually did",
        "One quality/perf signal: tests, monitoring, latency, or reliability — with a number if you can"
      ],
      "summaryChecklist": [
        "State ~12–18 months internship/part-time honestly — not 'senior'",
        "Your strongest shipped win + metric (even hundreds of users counts)",
        "What you want next: team type, stack, or problem space"
      ],
      "projectsChecklist": [
        "State the exact problem your project solved for a user",
        "Detail the technology stack and architecture decisions",
        "Include a measurable outcome (stars, users, or performance)"
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
      "hrQuote": "For early-career hires, show me momentum: a feature you owned, how you unblocked others, and one metric or quality bar you moved — without claiming you ran the whole org.",
      "hrName": "David Kim",
      "hrRole": "VP Engineering",
      "hrCompany": "scaleup",
      "hrQuotes": {
        "experience": "Early-career signal: ownership on a real slice, collaboration proof, and one crisp outcome — not 'led the company'.",
        "summary": "Strong fresher / early-career: say months honestly, your strongest shipped win, and what you want next. Authority comes from specifics, not 'senior' adjectives.",
        "projects": "Show depth on one project: problem, stack, tests/CI if any, and a real outcome — contributor to OSS is a plus, not required.",
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
