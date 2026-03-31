import { Scenario } from "./types";

const PRACTICE_STEPS = [
  {
    id: 1,
    label: "Define",
    title: "Define the Problem",
    prompt:
      "Start by defining the scope of this problem. Who is the user? What is the core problem or goal? What constraints are you working within? What does success look like?",
    hint: "Use the 5W framework: Who, What, Where, When, Why. Avoid jumping to solutions.",
  },
  {
    id: 2,
    label: "Decompose",
    title: "Break It Down",
    prompt:
      "Break the problem into its key components or sub-problems. Structure your breakdown so that the parts are mutually exclusive and collectively exhaustive (MECE). What are the 2–4 major dimensions of this problem?",
    hint: "Think in trees, not lists. Try issue trees or driver trees. Each branch should be independent.",
  },
  {
    id: 3,
    label: "Hypothesize",
    title: "Form Hypotheses",
    prompt:
      "What are your initial hypotheses about the root cause or best approach? State your hypothesis first, then explain the reasoning behind it. What would you expect to find if your hypothesis is correct?",
    hint: "A strong hypothesis is falsifiable. Lead with your best guess, then support it.",
  },
  {
    id: 4,
    label: "Analyze",
    title: "Analyze & Evaluate",
    prompt:
      "Dig into the evidence, trade-offs, and data. What data would you look at? What are the pros and cons of different approaches? Which hypothesis holds up best under scrutiny?",
    hint: "Be specific about metrics and signals. Consider second-order effects and trade-offs.",
  },
  {
    id: 5,
    label: "Recommend",
    title: "Make a Recommendation",
    prompt:
      "Synthesize your analysis into a clear, prioritized recommendation. What should be done, in what order, and why? What are the key risks and how would you mitigate them?",
    hint: "Use the Pyramid Principle: lead with your conclusion, support with 2–3 key arguments, then details.",
  },
];

export const SCENARIOS: Scenario[] = [
  // ── PRODUCT CASES ──────────────────────────────────────────────────────────
  {
    id: "product-001",
    category: "Product",
    difficulty: "Beginner",
    title: "Improve Retention in a Mobile Music App",
    tagline: "Diagnose a drop in 30-day retention and propose product fixes",
    context:
      "You are a PM at Melody, a mobile music streaming app with 2M monthly active users in Vietnam. Over the past quarter, 30-day retention has dropped from 45% to 30%. The core listening experience has not changed. Your team has budget to run 2 initiatives this quarter.",
    prompt:
      "How would you approach diagnosing the retention drop and deciding which product changes to prioritize?",
    frameworkHints: ["Retention funnel analysis", "AARRR framework", "User journey mapping", "Habit loop (Trigger → Action → Reward → Investment)"],
    steps: PRACTICE_STEPS,
  },
  {
    id: "product-002",
    category: "Product",
    difficulty: "Intermediate",
    title: "Prioritize Features for an E-Commerce Checkout",
    tagline: "Reduce checkout abandonment at a fast-growing Vietnamese e-commerce platform",
    context:
      "You are PM at ShopViet, a fast-growing e-commerce platform. Checkout abandonment is at 68%, compared to an industry benchmark of 50%. Your engineering team can ship 3 features in the next sprint. The backlog includes: one-click checkout, instalment payment via MoMo, saved addresses, order preview, and a progress indicator.",
    prompt:
      "How would you decide which 3 features to prioritize? Walk through your decision-making framework.",
    frameworkHints: ["RICE scoring", "Impact-Effort matrix", "Jobs-to-be-Done", "Customer journey mapping"],
    steps: PRACTICE_STEPS,
  },
  {
    id: "product-003",
    category: "Product",
    difficulty: "Intermediate",
    title: "Design a Notification System for a Super-App",
    tagline: "Balance user engagement and notification fatigue in a super-app ecosystem",
    context:
      "You are PM at a super-app (think Grab or Gojek) with 5 services: food delivery, ride-hailing, payments, shopping, and news. Currently all teams send notifications independently. Users receive an average of 12 push notifications daily and uninstall rate is rising.",
    prompt:
      "How would you design a unified notification strategy across all 5 services to improve engagement while reducing churn?",
    frameworkHints: ["Notification taxonomy", "User preference modeling", "Frequency capping", "A/B testing strategy"],
    steps: PRACTICE_STEPS,
  },
  {
    id: "product-004",
    category: "Product",
    difficulty: "Advanced",
    title: "Build a Trust & Safety System for a Marketplace",
    tagline: "Design fraud prevention without destroying the seller experience",
    context:
      "You are Senior PM at a peer-to-peer marketplace with 500K monthly transactions. Fraud complaints have risen 40% YoY. The top complaints are: fake listings, non-delivery, and counterfeit goods. Your trust & safety team is small (3 engineers, 1 DS).",
    prompt:
      "How would you approach building a scalable trust and safety system given your constraints?",
    frameworkHints: ["Risk tiering", "Signals and signals weighting", "Human-in-the-loop escalation", "Network effects on trust"],
    steps: PRACTICE_STEPS,
  },

  // ── GROWTH CASES ───────────────────────────────────────────────────────────
  {
    id: "growth-001",
    category: "Growth",
    difficulty: "Beginner",
    title: "Re-Activate Churned Users for a Fintech App",
    tagline: "Design a win-back campaign for users who stopped transacting",
    context:
      "You run growth at MoneyWise, a personal finance app in Vietnam. 35% of registered users have not opened the app in 90 days. You have an email list, push notification access, and a budget of $5,000 for re-activation campaigns. Monthly ARPU is $3.",
    prompt:
      "How would you design a re-activation strategy for these churned users?",
    frameworkHints: ["Segmentation (RFM)", "Win-back email sequences", "Incentive design", "Cohort analysis"],
    steps: PRACTICE_STEPS,
  },
  {
    id: "growth-002",
    category: "Growth",
    difficulty: "Intermediate",
    title: "Grow User Acquisition for a B2B SaaS Tool",
    tagline: "Build an acquisition engine for a productivity tool targeting Vietnamese SMEs",
    context:
      "You are Head of Growth at TaskFlow, a project management SaaS targeting Vietnamese SMEs. Current MoM growth is 3%. CAC is $120 and LTV is $240 (LTV:CAC = 2:1, below the 3:1 target). Your main acquisition channels are: organic search, LinkedIn ads, and referrals.",
    prompt:
      "How would you diagnose the growth bottleneck and design a plan to get to 10% MoM growth?",
    frameworkHints: ["Growth loops vs. funnels", "Channel attribution", "LTV:CAC optimization", "Referral program design"],
    steps: PRACTICE_STEPS,
  },

  // ── DATA & ANALYTICS CASES ─────────────────────────────────────────────────
  {
    id: "data-001",
    category: "Data & Analytics",
    difficulty: "Beginner",
    title: "Diagnose a 20% Drop in DAU",
    tagline: "Investigate a sudden user drop and present a structured root-cause analysis",
    context:
      "You are a Data Analyst at a mobile gaming company. This Monday morning, you notice that Daily Active Users (DAU) dropped 20% compared to last week. The drop happened overnight on Saturday. You have access to event logs, user segmentation data, and the release notes from the past 2 weeks.",
    prompt:
      "Walk through your investigation process. How would you identify the root cause of this DAU drop?",
    frameworkHints: ["Drill-down decomposition", "Cohort analysis", "Release impact analysis", "External factor checklist"],
    steps: PRACTICE_STEPS,
  },
  {
    id: "data-002",
    category: "Data & Analytics",
    difficulty: "Intermediate",
    title: "Interpret an A/B Test with Conflicting Signals",
    tagline: "Analyze a messy A/B test result and make a confident shipping decision",
    context:
      "You ran a 2-week A/B test on the checkout flow. Results: Control vs. Treatment. Conversion rate increased by 2.5% (statistically significant, p=0.03). But average order value (AOV) decreased by 8% (also significant). Revenue per visitor is slightly negative in treatment. The test ran on 15% of traffic. Business stakeholders are divided on whether to ship.",
    prompt:
      "How do you analyze these results and what recommendation do you make?",
    frameworkHints: ["Statistical significance vs. practical significance", "Revenue impact modeling", "Guardrail metrics", "Segment analysis (novelty effect)"],
    steps: PRACTICE_STEPS,
  },

  // ── BUSINESS CASES ─────────────────────────────────────────────────────────
  {
    id: "business-001",
    category: "Business",
    difficulty: "Intermediate",
    title: "Market Entry Strategy: Da Nang",
    tagline: "Evaluate whether a Hanoi-based food delivery startup should expand to Da Nang",
    context:
      "You are a strategy consultant for QuickBite, a food delivery startup currently operating only in Hanoi with strong unit economics. The CEO is considering expanding to Da Nang. Da Nang has 1.2M residents, strong tourism, and currently has two competitors with weak app ratings. QuickBite has $2M in expansion budget.",
    prompt:
      "How would you evaluate and structure the go/no-go decision for Da Nang expansion?",
    frameworkHints: ["Market sizing (TAM/SAM/SOM)", "Competitive positioning", "Unit economics projections", "Go-to-market sequencing"],
    steps: PRACTICE_STEPS,
  },

  // ── BEHAVIORAL CASES ───────────────────────────────────────────────────────
  {
    id: "behavioral-001",
    category: "Behavioral",
    difficulty: "Beginner",
    title: "Handling a Stakeholder Conflict",
    tagline: "Navigate a disagreement between engineering and business on a critical deadline",
    context:
      "You are a PM. The marketing team has committed to a campaign launching in 3 weeks. Your engineering lead says the feature won't be ready for 5 weeks without cutting scope or adding engineers (not possible). The CMO is putting pressure on you. You need to resolve this without damaging either relationship.",
    prompt:
      "Walk through how you would handle this conflict. What is your approach, and what outcome are you driving toward?",
    frameworkHints: ["Stakeholder mapping", "Scope negotiation", "RACI clarity", "Expectation management"],
    steps: PRACTICE_STEPS,
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function getScenariosByCategory(category: string): Scenario[] {
  if (category === "All") return SCENARIOS;
  return SCENARIOS.filter((s) => s.category === category);
}

export const CATEGORIES = [
  "All",
  "Product",
  "Growth",
  "Data & Analytics",
  "Business",
  "Behavioral",
] as const;
