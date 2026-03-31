# PJX Case Trainer — Product Requirements Document
**Version 1.0 · March 2026 · Confidential**

| Field | Value |
|---|---|
| Product | PJX Case Trainer |
| Version | 1.0 — Initial PRD |
| Author(s) | Project X Product Team |
| Status | Draft — Internal Review |
| Last Updated | March 2026 |

---

## 1. Executive Summary

PJX Case Trainer is a scenario-based practice platform that helps early-career tech candidates develop structured problem-solving and communication skills required to succeed in technical and case-based interviews. It addresses a gap validated through HR and Tech Lead interviews: most candidates fail not due to knowledge deficits, but because they cannot articulate their reasoning or structure ambiguous problems under pressure.

> **Core Value Proposition:** A scalable, AI-assisted interview preparation platform that trains candidates in structured thinking through realistic scenarios, guided frameworks, and automated feedback — built to support Project X's pipeline of ~2,000 applicants per cohort.

The product serves two primary segments: PM/PO and BA/DA roles (primary), and SWE/AI/ML/IT Ops roles (secondary). It is designed to be self-serve, scalable, and effective without requiring human facilitators for every interaction.

---

## 2. Problem Statement

### 2.1 Validated Pain Points

Interviews with HR professionals and Tech Leads surfaced four recurring patterns in candidate failure:

- Inability to break down ambiguous, open-ended questions into structured components
- Difficulty explaining reasoning clearly while thinking — candidates either over-explain or skip steps
- Weak framework application — candidates know frameworks (e.g., SWOT, MECE) but cannot apply them fluidly in novel situations
- Performance degradation under pressure — time constraints and interviewer reactions destabilize otherwise capable candidates

### 2.2 Problem Statement

> **How Might We...** Help early-career tech candidates structure ambiguous problems and articulate their reasoning clearly in technical and case interviews — at a scale that supports thousands of applicants without relying on manual mentorship.

### 2.3 Competitive Landscape & Gaps

| Method | Strength | Limitation | PJX Opportunity |
|---|---|---|---|
| Mentorship / Buddy Programs | Personalized, high-trust | Cannot scale to 2,000+ users | Replace with AI coaching layer |
| Self-Study Resources | Accessible, low-cost | Passive; no feedback on reasoning | Add structured feedback loop |
| Mock Interviews | Realistic simulation | Limited by human availability | Automate via scenario bank + AI |
| Prep Courses | Structured curriculum | Expensive; one-size-fits-all | Targeted, role-specific scenarios |
| **PJX Case Trainer** | **Scalable + structured + feedback** | — | **Fill all four gaps above** |

---

## 3. Goals & Success Metrics

### 3.1 Product Goals

- Train candidates to frame ambiguous problems using structured reasoning
- Help candidates communicate their thinking process clearly during live interviews
- Provide scalable, accessible practice that mirrors real interview conditions
- Reduce dependency on manual mentorship for interview preparation

### 3.2 Key Success Metrics

#### Engagement Metrics (Adoption & Usage)

| Metric | Definition | Target (90 days post-launch) | Measurement |
|---|---|---|---|
| Weekly Active Users (WAU) | Unique users completing ≥1 scenario/week | 40% of registered users | Platform analytics |
| Scenario Completion Rate | % of started scenarios fully completed | >65% | Session tracking |
| Avg. Sessions per User | Average weekly sessions per active user | ≥3 sessions/week | Platform analytics |
| Return Rate (D7/D30) | % of users returning after 7 and 30 days | D7 >55%, D30 >30% | Cohort analysis |

#### Learning Metrics (Skill Development)

| Metric | Definition | Target | Measurement |
|---|---|---|---|
| Thinking Score Improvement | Avg. improvement in rubric score across 5+ attempts | +20% from baseline | Rubric scoring engine |
| Framework Usage Rate | % of responses that correctly apply a framework | >50% of submissions | AI evaluator tagging |
| Problem Framing Quality | % of responses scoring 'Adequate' or above on framing | >60% | Automated rubric |
| Time-to-Structure | Avg. time to first logical breakdown of a problem | Decrease by 30% after 10 sessions | Session timestamps |

#### Outcome Metrics (Real-World Impact)

| Metric | Definition | Target | Measurement |
|---|---|---|---|
| Interview Pass Rate | % of users advancing past technical/case interview stage | +15% vs. non-users | HR system linkage |
| Mentor / Interviewer Rating | Post-interview quality rating by interviewers | Avg. ≥ 4.0 / 5.0 | Interviewer survey |
| Candidate Confidence Score | Self-reported confidence pre/post platform use | +25% improvement | Pre/post survey |
| Time-to-Offer | Time from first platform session to job offer | Reduce by 2 weeks vs. baseline | HR data |

#### Platform Health Metrics

| Metric | Target |
|---|---|
| Scenario Bank Coverage | ≥30 scenarios at launch across 6 categories |
| AI Feedback Latency | <4 seconds per response evaluation |
| System Uptime | 99.5% monthly |
| Feedback Usefulness Rating | >70% of users rate AI feedback as 'helpful' |

---

## 4. Target Users

### 4.1 User Segments

| Segment | Roles | Interview Types | Core Need |
|---|---|---|---|
| Primary | PM / PO, BA / DA | Product cases, data cases, business cases | Structured thinking + business reasoning |
| Secondary | SWE, AI/ML, IT Ops | Technical design, system architecture, walkthroughs | Explaining logic and trade-offs clearly |

### 4.2 User Personas

**Persona 1 — Minh, Aspiring Product Manager**

| | |
|---|---|
| Background | Final-year university student, CS degree, 1 internship |
| Goal | Land a PM role at a tech company in Vietnam |
| Pain Point | Freezes when asked open-ended product questions; knows CIRCLES but can't apply it fluidly |
| Motivation | Wants structured drills with feedback on HOW he reasons, not just WHAT he answers |
| Job Story | When asked to improve retention in a mobile app, I want to break the problem step-by-step so I sound confident and organized |

**Persona 2 — Linh, Business Analyst Candidate**

| | |
|---|---|
| Background | 2 years in operations, pivoting to data/BA roles |
| Goal | Pass the analytical and case interviews at fintech or e-commerce companies |
| Pain Point | Strong with data, but struggles to verbalize analysis under pressure |
| Motivation | Needs realistic practice with feedback — not just example answers to memorize |
| Job Story | When practicing A/B test interpretation, I want feedback on my communication flow so I can explain findings clearly in real interviews |

---

## 5. Product Features & Experience

### 5.1 Core Feature Set

| Feature | Description | Priority |
|---|---|---|
| Scenario Bank | Library of 30+ structured interview cases across 6 categories | P0 |
| Guided Problem-Solving Flow | 5-step scaffold: Define → Decompose → Hypothesize → Analyze → Recommend | P0 |
| AI Feedback Engine | Evaluates responses on 5 dimensions with written feedback | P0 |
| Framework Library | On-demand analytical frameworks surfaced when candidates are stuck | P1 |
| Prompt Templates (Plan C) | Optimized prompts for candidates practicing with Gemini / GPT | P1 |
| Progress Dashboard | Tracks scores, improvement over time, weak areas | P1 |
| Difficulty Progression | Scenarios unlock based on performance | P2 |
| Timed Practice Mode | Simulates real interview time pressure | P2 |
| Peer Benchmarking | Compare scores against cohort anonymously | P3 |

### 5.2 Scenario Bank Structure

| Category | Example Scenarios | Primary Segment |
|---|---|---|
| Product Cases | Improve retention in a mobile music game; Prioritize features for e-commerce checkout | PM / PO |
| Growth Cases | Increase acquisition for a fintech app; Re-activate churned users | PM / PO, BA |
| Data / Analytics Cases | Interpret A/B test results; Diagnose a 20% drop in DAU | BA / DA |
| Business Cases | Market entry to Da Nang; Monetization strategy for a marketplace | BA / DA, PM |
| Technical Cases | Design a scalable notification system; Explain microservices trade-offs | SWE, AI/ML |
| Behavioral Cases | Walk through a project trade-off; Describe a stakeholder disagreement | All segments |

### 5.3 Evaluation Rubric

| Dimension | What's Assessed | Weight |
|---|---|---|
| Problem Framing | Did the candidate define scope, user, and constraint clearly? | 25% |
| Structure | Is reasoning organized into logical, non-overlapping components? | 25% |
| Logic & Evidence | Are conclusions supported with reasoning or data? | 20% |
| Insight | Does the candidate identify non-obvious implications? | 15% |
| Communication Clarity | Is the explanation coherent and easy to follow? | 15% |

---

## 6. Technical Architecture

### 6.1 System Components

| Component | Technology / Approach | Responsibility |
|---|---|---|
| Frontend | React (web) + React Native (mobile-optional) | Scenario UI, practice flows, dashboard |
| Backend API | Node.js / FastAPI | Session management, scenario serving, auth |
| Scenario Database | PostgreSQL | Stores scenarios, rubrics, framework content |
| AI Coaching Layer | External LLM API (GPT-4o / Gemini 1.5 Pro) | Conversational coaching, scenario dialogue |
| Feedback Engine | Structured prompting + rubric scoring via LLM | Response evaluation across 5 dimensions |
| Analytics & Logging | Mixpanel or PostHog | Event tracking, score trends, funnel analytics |
| Auth | Firebase Auth / Auth0 | User login, cohort assignment |
| Storage | AWS S3 / Supabase | User progress, session history |

### 6.2 AI Interaction Design (Plan C — External LLM Integration)

The MVP leverages existing models (GPT-4o, Gemini 1.5 Pro) rather than building proprietary models. The platform provides:

- **Scenario Context Injection:** System prompts that load scenario background, constraints, and evaluation criteria into the LLM context
- **Coaching Prompt Templates:** Structured user-facing prompts that guide candidates to interact productively with AI
- **Feedback Parsing Layer:** Post-processing logic that maps LLM output to the 5-dimension rubric and generates scores

#### LLM Prompt Architecture

| Prompt Layer | Content | Purpose |
|---|---|---|
| System Prompt | Scenario context, persona, rubric criteria, output format instructions | Sets AI behavior and evaluation frame |
| Scenario Prompt | Problem background, constraints, supporting data, framework hints | Delivers the case to the candidate |
| Coaching Prompt | Step-by-step reasoning nudges, Socratic questions, framework triggers | Guides without giving answers |
| Evaluation Prompt | Structured request to score response on 5 dimensions with justification | Generates candidate feedback |

#### LLM Adapter Strategy (Multi-Model Support)

- **Abstract interface:** Each LLM is wrapped in a standardized adapter accepting scenario + history and returning structured feedback
- **Prompt normalization:** Core prompts maintained in model-agnostic format with model-specific adjustments
- **Fallback routing:** If primary LLM API is unavailable, requests fall back to secondary model

### 6.3 Data Model

| Entity | Key Fields | Notes |
|---|---|---|
| User | user_id, role, cohort_id, created_at | Linked to HR system via cohort_id |
| Scenario | scenario_id, category, difficulty, prompt, context, rubric, frameworks[] | Managed in CMS; versioned |
| Session | session_id, user_id, scenario_id, started_at, completed_at, transcript[] | Full conversation log |
| Response | response_id, session_id, step, content, scores{}, feedback_text | Per reasoning step |
| Progress | user_id, scenario_id, attempt_count, best_score, avg_score, last_attempt | Drives dashboard + unlock logic |

### 6.4 Security & Privacy

- All candidate responses stored encrypted at rest (AES-256)
- LLM API calls made server-side — no raw API keys exposed to client
- User data not used to train third-party models (zero-data-retention API agreements)
- GDPR/PDPA-aligned: session transcripts purged after 12 months unless user opts in

---

## 7. Product Roadmap

### Phase 0 — Foundation (Weeks 1–3)
- Define system prompt architecture and LLM adapter interface
- Build Scenario Bank v1: 10 scenarios across Product, Growth, and Data categories
- Design evaluation rubric and scoring logic
- Set up analytics infrastructure

### Phase 1 — MVP (Weeks 4–8)
- Launch core web app: scenario browser, 5-step guided flow, AI coaching integration
- AI Feedback Engine v1: rubric-based scoring with written feedback per dimension
- Candidate dashboard: session history, dimension scores, improvement trend
- Scenario Bank v2: expand to 30 scenarios across all 6 categories
- Prompt Template Library: 5 optimized prompts for GPT and Gemini
- Internal beta: 50–100 PJX candidates

### Phase 2 — Growth (Weeks 9–14)
- Timed Practice Mode: configurable time limits, pressure simulation
- Framework Library: 15+ frameworks surfaced contextually
- Difficulty Progression engine: auto-unlock based on performance threshold
- LLM adapter v2: multi-model support (GPT-4o, Gemini 1.5, Claude 3)
- Analytics dashboard for HR / program managers: cohort performance view
- Open beta: full PJX cohort (~2,000 candidates)

### Phase 3 — Scale & Optimize (Weeks 15–24)
- Peer Benchmarking: anonymized cohort comparison and percentile scoring
- Mentor Portal: human reviewers can annotate AI feedback for quality calibration
- Mobile app (React Native)
- Scenario authoring tool for program managers
- LLM fine-tuning exploration

### Roadmap Summary

| Phase | Timeline | Key Deliverable | Success Gate |
|---|---|---|---|
| Phase 0 — Foundation | Weeks 1–3 | Scenario Bank v1, Prompt Architecture | 10 scenarios reviewed & approved |
| Phase 1 — MVP | Weeks 4–8 | Core web app + AI feedback + 30 scenarios | Beta NPS ≥ 35; completion rate >60% |
| Phase 2 — Growth | Weeks 9–14 | Timed mode, framework library, full cohort launch | WAU >40%; thinking score +15% |
| Phase 3 — Scale | Weeks 15–24 | Mobile, peer benchmarking, mentor portal | Interview pass rate +15% vs. baseline |

---

## 8. Go-to-Market & Growth Strategy

### 8.1 Launch Strategy

PJX Case Trainer launches as a closed platform integrated into Project X's existing candidate pipeline — not a public product. This provides a high-quality, captive user base for early validation while reducing cold-start distribution risk.

### 8.2 Rollout Phases

| Phase | Audience | Channel | Goal |
|---|---|---|---|
| Alpha (Internal) | 5–10 PJX team members + mentors | Direct invite | Validate scenario quality and AI feedback accuracy |
| Beta (Closed) | 50–100 PJX candidates | HR onboarding email | Validate engagement, completion, and score improvement |
| Cohort Launch | Full PJX cohort (~2,000) | PJX candidate portal + email campaign | Drive adoption; measure interview outcome impact |
| External Expansion | Non-PJX candidates (waitlist) | Referral + LinkedIn outreach | Test standalone product-market fit |

### 8.3 Activation Funnel

| Stage | Definition | Target Rate | Key Action |
|---|---|---|---|
| Aware | Candidate learns about PJX Case Trainer | 100% of PJX cohort | Email + portal announcement |
| Activated | Completes first scenario end-to-end | >60% of aware users | Onboarding email with first scenario CTA |
| Engaged | Completes ≥3 scenarios in first 2 weeks | >40% of activated | In-app progress nudges + score milestones |
| Retained | Returns for practice in Week 3+ | >30% of engaged | Weekly digest with personalized scenario rec |
| Converted | Advances past interview stage | +15% vs. non-users | HR outcome tracking |

### 8.4 Growth Levers

**Pull Levers (Demand-side)**
- Interview urgency: Trigger activation emails when interview dates are set
- Score visibility: Show candidates their score immediately after first session
- Cohort benchmarking: "You scored higher than 62% of your cohort"
- Progress milestones: Unlock badges and scenario categories as scores improve

**Push Levers (Supply-side)**
- HR endorsement: Program managers recommend platform as part of formal prep
- Mentor integration: Mentors reference platform scenarios in 1:1 sessions
- Employer partnership: Share aggregated (anonymized) performance data with hiring teams

### 8.5 Scenario Content Acquisition

- **Internal creation:** Product team authors initial 30 scenarios using validated frameworks
- **Crowdsourced from candidates:** Post-interview debriefs capture real questions — anonymized and adapted
- **Mentor contributions:** Mentors and interviewers submit scenarios from their experience

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI feedback quality is too generic | High | High | Invest in prompt engineering; A/B test feedback formats; human review loop |
| Low activation — candidates don't engage | Medium | High | Anchor to interview urgency; integrate into mandatory onboarding |
| Scenario Bank becomes stale | Medium | Medium | Quarterly content refresh; crowdsourcing pipeline |
| LLM API cost scales faster than users | Low | Medium | Monitor cost-per-session; implement response caching |
| Candidates share scenarios externally | Medium | Low | Randomize scenario variants; focus rubric on process not answers |
| Multi-LLM prompt inconsistency | High | Medium | Standardize adapter interface; test across GPT, Gemini, Claude |

---

## 10. Open Questions & Next Steps

### 10.1 Open Questions

- **Metrics Tracking:** How do we link platform usage data to downstream interview outcomes in the HR system? What consent and data-sharing agreements are needed?
- **Multi-LLM Consistency:** How do we ensure feedback quality is consistent across GPT-4o, Gemini 1.5, and Claude 3?
- **System Prompt Specification:** What is the exact input/action/output format for the MVP system prompt?
- **Case Hub Operations:** Who owns scenario creation and quality review? What is the editorial process?
- **Conversion Portal:** How are candidates directed from PJX's main pipeline into the Case Trainer? SSO or separate login?
- **Pilot Scope:** Should the beta be open to all roles or limited to PM/BA candidates first?

### 10.2 Immediate Next Steps

| Action | Owner | Due |
|---|---|---|
| Finalize system prompt architecture and LLM adapter spec | Tech Lead | Week 1 |
| Author first 10 scenarios and rubrics | Product + Mentors | Week 2 |
| Set up analytics tracking plan (event taxonomy) | Product / Analytics | Week 2 |
| Define HR data linkage approach for outcome tracking | Product + HR | Week 3 |
| Build MVP prototype for internal alpha testing | Engineering | Week 4 |
| Launch closed beta with 50 candidates | Product + HR | Week 8 |

---

## Appendix: Glossary

| Term | Definition |
|---|---|
| Scenario Bank | The library of structured interview cases that serves as the core content asset |
| JTBD | Jobs-to-be-Done — a framework for understanding what outcome a user is trying to achieve |
| MECE | Mutually Exclusive, Collectively Exhaustive — a structuring principle in case interviews |
| Plan C | The strategy in which candidates use external LLMs guided by PJX prompt templates |
| Rubric | The 5-dimension scoring framework: Framing, Structure, Logic, Insight, Communication |
| LLM Adapter | A software abstraction that normalizes interactions with different AI models behind a common interface |
| WAU | Weekly Active Users — candidates who complete at least one scenario in a given week |
