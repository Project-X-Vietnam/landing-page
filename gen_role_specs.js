const fs = require("fs");
const roles = [
  { id: "Software Engineering (SWE)", type: "swe" },
  { id: "Artificial Intelligence (AI) / Machine Learning (ML)", type: "ai" },
  { id: "Data Analytics (DA) & Business Intelligence (BI)", type: "da" },
  { id: "Data Engineering", type: "de" },
  { id: "Cloud Engineering / DevOps", type: "cloud" },
  { id: "Product Management (PM)", type: "pm" },
  { id: "Product Growth / Growth PM", type: "growth" },
  { id: "Business Analytics (BA)", type: "ba" },
  { id: "UI/UX / Product Design", type: "design" },
  { id: "Project Management (Tech Projects)", type: "proj" },
  { id: "Business Development (Tech Industry)", type: "bd" },
  { id: "Digital Marketing (Tech-focused)", type: "mkt" },
  { id: "Operations (Tech Operations / Process Automation)", type: "ops" },
  { id: "Other (Please Specify)", type: "other" }
];

const data = {};

roles.forEach(r => {
  const t = r.type;
  
  // Generating varied mock domain context per role
  let domain = "";
  let metric = "";
  let finalPol = "";
  let p_verb = "Architected";
  let p_prob = " a task-tracking dashboard";
  let p_stack = " using React, Node.js, and PostgreSQL";
  let p_impact = ", improving sync speed by 40%.";
  let p_old = "Made a website for tracking tasks.";

  if (t==="swe") {
    domain = "Specialised in high-performance backend systems and APIs."; metric = " Track record of scaling services to handle 10M+ daily requests."; finalPol = "Seeking to drive architectural excellence at scale.";
    p_verb = "Architected"; p_prob = " a task-tracking dashboard to resolve daily sync delays"; p_stack = " using React, Node.js, and PostgreSQL"; p_impact = ", reducing sync latency by 40%."; p_old = "Made a website for tracking tasks.";
  } else if (t==="ai") {
    domain = "Specialised in deep learning and NLP architectures."; metric = " Track record of deploying models with 95%+ inference accuracy."; finalPol = "Seeking to deliver intelligent, scalable AI solutions.";
    p_verb = "Deployed"; p_prob = " a machine learning pipeline to classify user sentiment"; p_stack = " using PyTorch and AWS SageMaker"; p_impact = ", increasing triage accuracy by 35%."; p_old = "Built a model to guess user mood.";
  } else if (t==="da") {
    domain = "Specialised in data visualization and actionable insights."; metric = " Track record of uncovering trends that boost revenue by 20%."; finalPol = "Seeking to drive data-informed business strategies.";
    p_verb = "Engineered"; p_prob = " a suite of operational dashboards to monitor KPIs"; p_stack = " using SQL, Tableau, and dbt"; p_impact = ", cutting reporting time by 15 hours/week."; p_old = "Made charts for business KPIs.";
  } else if (t==="de") {
    domain = "Specialised in scalable ETL pipelines and data warehouses."; metric = " Track record of processing 5TB+ of daily telemetry data."; finalPol = "Seeking to build robust data infrastructure.";
    p_verb = "Constructed"; p_prob = " an automated ETL pipeline for marketing data"; p_stack = " using Apache Spark and Airflow"; p_impact = ", ensuring 99.9% data availability."; p_old = "Moved data from an API to a database.";
  } else if (t==="cloud") {
    domain = "Specialised in resilient cloud infrastructure and CI/CD."; metric = " Track record of maintaining 99.99% uptime for core services."; finalPol = "Seeking to optimize cloud operations and deployments.";
    p_verb = "Provisioned"; p_prob = " an auto-scaling cloud environment for microservices"; p_stack = " using Terraform, Docker, and AWS"; p_impact = ", reducing infrastructure costs by 25%."; p_old = "Put the app on AWS servers.";
  } else if (t==="pm") {
    domain = "Specialised in product strategy and user-centric roadmaps."; metric = " Track record of leading cross-functional teams to launch 5+ flagship products."; finalPol = "Seeking to elevate product vision and growth.";
    p_verb = "Spearheaded"; p_prob = " the development of a user onboarding module"; p_stack = " using Jira, Figma, and Agile methodologies"; p_impact = ", boosting user retention by 30% in Q1."; p_old = "Managed the team to build onboarding.";
  } else if (t==="growth") {
    domain = "Specialised in user acquisition and conversion rate optimization."; metric = " Track record of scaling active user bases by over 300%."; finalPol = "Seeking to drive explosive growth metrics.";
    p_verb = "Orchestrated"; p_prob = " a viral referral loop campaign"; p_stack = " utilizing A/B testing, Mixpanel, and Braze"; p_impact = ", acquiring 50k+ new users in two months."; p_old = "Ran a campaign to get more users.";
  } else if (t==="ba") {
    domain = "Specialised in requirement gathering and process optimization."; metric = " Track record of streamlining workflows to save 500+ manual hours."; finalPol = "Seeking to bridge technical and business objectives.";
    p_verb = "Formulated"; p_prob = " comprehensive BRDs for a legacy system overhaul"; p_stack = " employing UML, Jira, and process mapping"; p_impact = ", reducing enterprise waste by $100k annually."; p_old = "Wrote requirement documents for the team.";
  } else if (t==="design") {
    domain = "Specialised in intuitive user interfaces and design systems."; metric = " Track record of improving user satisfaction scores by 40%."; finalPol = "Seeking to craft exceptional digital experiences.";
    p_verb = "Prototyped"; p_prob = " a comprehensive design system for mobile apps"; p_stack = " using Figma, Principle, and User Testing"; p_impact = ", accelerating developer handoff by 50%."; p_old = "Designed screens for the mobile app.";
  } else if (t==="proj") {
    domain = "Specialised in agile delivery and risk mitigation."; metric = " Track record of delivering $5M+ tech initiatives on time and budget."; finalPol = "Seeking to orchestrate complex technical projects.";
    p_verb = "Directed"; p_prob = " a cross-continent team for a major platform migration"; p_stack = " applying Scrum, MS Project, and Confluence"; p_impact = ", successfully launching 2 weeks ahead of schedule."; p_old = "Managed a big team for a migration project.";
  } else if (t==="bd") {
    domain = "Specialised in strategic tech partnerships and pipeline growth."; metric = " Track record of closing B2B deals worth over $2M ARR."; finalPol = "Seeking to expand market footprints and revenue.";
    p_verb = "Negotiated"; p_prob = " enterprise SLA contracts with key technical vendors"; p_stack = " utilizing Salesforce, LinkedIn Sales Navigator, and outreach tools"; p_impact = ", securing a 15% margin increase."; p_old = "Talked to companies to get them to buy.";
  } else if (t==="mkt") {
    domain = "Specialised in performance marketing and digital campaigns."; metric = " Track record of driving 50M+ impressions with positive ROI."; finalPol = "Seeking to craft high-converting digital narratives.";
    p_verb = "Executed"; p_prob = " an omnichannel ad strategy for a SaaS launch"; p_stack = " using Google Ads, HubSpot, and Google Analytics"; p_impact = ", generating a 4x return on ad spend (ROAS)."; p_old = "Did marketing for a software launch.";
  } else if (t==="ops") {
    domain = "Specialised in operations scaling and IT automation."; metric = " Track record of reducing operational bottlenecks by 60%."; finalPol = "Seeking to align technical resources with operational efficiency.";
    p_verb = "Overhauled"; p_prob = " the internal vendor onboarding protocol"; p_stack = " by building automated RPA workflows in Zapier and Python"; p_impact = ", slashing processing time by 3 days per vendor."; p_old = "Made the vendor process faster.";
  } else {
    domain = "Specialised in high-impact initiatives and cross-functional collaboration."; metric = " Track record of exceeding baseline performance targets consistently."; finalPol = "Seeking to drive impactful results in a dynamic environment.";
    p_verb = "Implemented"; p_prob = " a strategic initiative to upgrade core workflows"; p_stack = " utilizing modern industry-standard tools"; p_impact = ", yielding measurable improvements in efficiency."; p_old = "Finished a major project for the company.";
  }

  const s_chk = [ "Lead with your strongest domains (Backend, PM, Data, etc.)", "Cite heavy-hitting scalability or specific contributions", "Remove vague cliches and focus on hard truths" ];
  const p_chk = [ "State the problem your project solved", "List the exact technical stack or tools used", "Include a measurable outcome (users, speed, accuracy)" ];
  
  data[r.id] = {
    summary: {
      starter: {
        demoLabel: "Summary Transform",
        stages: [
          [ { id: "s0", text: "I am a hard-working team player who likes my field. I want to build things and work in a tech company." } ],
          [ { id: "s_domain", text: domain, flash: "blue" }, { id: "s_old", text: " I am a hard-working team player." } ],
          [ { id: "s_domain", text: domain }, { id: "s_metric", text: metric, flash: "blue" }, { id: "s_old", text: " I am a team player." } ],
          [ { id: "s_domain", text: domain + " " }, { id: "s_metric", text: metric + " " }, { id: "s_final", text: finalPol, flash: "green" } ]
        ],
        checklistItems: s_chk
      },
      developing: {
        demoLabel: "Summary Transform",
        stages: [
          [ { id: "s0", text: "I am a hard-working team player who likes my field. I want to build things and work in a tech company." } ],
          [ { id: "s_domain", text: domain, flash: "blue" }, { id: "s_old", text: " I am a hard-working team player." } ],
          [ { id: "s_domain", text: domain }, { id: "s_metric", text: metric, flash: "blue" }, { id: "s_old", text: " I am a team player." } ],
          [ { id: "s_domain", text: domain + " " }, { id: "s_metric", text: metric + " " }, { id: "s_final", text: finalPol, flash: "green" } ]
        ],
        checklistItems: s_chk
      },
      ready: {
        demoLabel: "Summary Transform",
        stages: [
          [ { id: "s0", text: "I am a hard-working team player who likes my field. I want to build things and work in a tech company." } ],
          [ { id: "s_domain", text: domain, flash: "blue" }, { id: "s_old", text: " I am a hard-working team player." } ],
          [ { id: "s_domain", text: domain }, { id: "s_metric", text: metric, flash: "blue" }, { id: "s_old", text: " I am a team player." } ],
          [ { id: "s_domain", text: domain + " " }, { id: "s_metric", text: metric + " " }, { id: "s_final", text: finalPol, flash: "green" } ]
        ],
        checklistItems: s_chk
      }
    },
    projects: {
      starter: {
        demoLabel: "Project Highlight",
        stages: [
          [ { id: "p0", text: p_old } ],
          [ { id: "p_verb", text: p_verb, flash: "blue" }, { id: "p_prob", text: p_prob + "." } ],
          [ { id: "p_verb", text: p_verb }, { id: "p_prob", text: p_prob }, { id: "p_stack", text: p_stack, flash: "blue" } ],
          [ { id: "p_verb", text: p_verb }, { id: "p_prob", text: p_prob }, { id: "p_stack", text: p_stack }, { id: "p_impact", text: p_impact, flash: "green" } ]
        ],
        checklistItems: p_chk
      },
      developing: {
        demoLabel: "Project Highlight",
        stages: [
          [ { id: "p0", text: p_old } ],
          [ { id: "p_verb", text: p_verb, flash: "blue" }, { id: "p_prob", text: p_prob + "." } ],
          [ { id: "p_verb", text: p_verb }, { id: "p_prob", text: p_prob }, { id: "p_stack", text: p_stack, flash: "blue" } ],
          [ { id: "p_verb", text: p_verb }, { id: "p_prob", text: p_prob }, { id: "p_stack", text: p_stack }, { id: "p_impact", text: p_impact, flash: "green" } ]
        ],
        checklistItems: p_chk
      },
      ready: {
        demoLabel: "Project Highlight",
        stages: [
          [ { id: "p0", text: p_old } ],
          [ { id: "p_verb", text: p_verb, flash: "blue" }, { id: "p_prob", text: p_prob + "." } ],
          [ { id: "p_verb", text: p_verb }, { id: "p_prob", text: p_prob }, { id: "p_stack", text: p_stack, flash: "blue" } ],
          [ { id: "p_verb", text: p_verb }, { id: "p_prob", text: p_prob }, { id: "p_stack", text: p_stack }, { id: "p_impact", text: p_impact, flash: "green" } ]
        ],
        checklistItems: p_chk
      }
    }
  };
});

fs.writeFileSync("dynamicData.json", JSON.stringify(data, null, 2), "utf8");
console.log("Generated dynamicData.json");

