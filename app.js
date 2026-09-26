const course = {
  title: "Chief AI Officer Learning Path",
  weeks: 26,
  hoursPerWeek: "5–7",
  modules: [
    {
      id:"m1", weeks:"1–2", title:"The CAIO Mandate", subtitle:"From technology leader to enterprise AI executive",
      summary:"Define the CAIO role, its decision rights, its relationship to the CEO/CIO/CTO/CDO/CISO, and the operating outcomes the role is accountable for.",
      objectives:["Explain the CAIO mandate","Map executive stakeholders","Define decision rights","Assess personal readiness"],
      lessons:[
        {id:"m1l1",title:"What a CAIO actually owns",duration:"45 min",body:"Study the role as a business transformation executive: AI strategy, portfolio value, governance, adoption, risk, talent, operating model, and executive communication. Contrast this with a CTO or VP Engineering role, which usually owns broader technology delivery rather than enterprise AI outcomes.",resources:[
          ["IBM — What is a Chief AI Officer?","https://www.ibm.com/think/topics/chief-ai-officer"],
          ["U.S. OMB M-25-21 — Federal AI leadership and governance","https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf"]]},
        {id:"m1l2",title:"Your transition map",duration:"60 min",body:"Inventory your current strengths across engineering leadership, strategy, governance, finance, product, data, security, change management, and board communication. Identify which gaps are knowledge gaps versus evidence gaps—areas you understand but cannot yet prove through outcomes.",resources:[]},
        {id:"m1l3",title:"Executive stakeholder architecture",duration:"45 min",body:"Create a stakeholder map covering CEO, board, CIO/CTO, CDO, CISO, legal/privacy, finance, HR, product/business-unit leaders, and risk. The CAIO succeeds through distributed ownership, not through centralizing every AI decision.",resources:[]}
      ],
      quiz:[
        {q:"Which outcome is most characteristic of a CAIO mandate?",options:["Owning all enterprise software delivery","Maximizing enterprise value from AI while governing risk","Running only the ML engineering team","Choosing a single foundation model vendor"],answer:1},
        {q:"The most sustainable CAIO operating model is usually:",options:["A fully centralized AI team that owns every use case","A governance-only office with no delivery capability","A federated model with central standards and distributed execution","A procurement function inside IT"],answer:2}
      ],
      homework:"Write a 2-page CAIO charter for a 5,000-person company. Include mission, decision rights, interfaces with CIO/CTO/CDO/CISO, first-year outcomes, and what the CAIO explicitly does not own."
    },
    {
      id:"m2", weeks:"3–4", title:"AI & GenAI Technical Fluency", subtitle:"Know enough to make architecture and investment decisions",
      summary:"Build executive-level fluency in modern ML, transformers, foundation models, embeddings, RAG, fine-tuning, agents, evaluation, inference, and model economics.",
      objectives:["Explain modern AI systems","Compare RAG vs fine-tuning","Understand agents","Reason about cost/latency/quality trade-offs"],
      lessons:[
        {id:"m2l1",title:"ML to foundation models",duration:"75 min",body:"Review supervised learning, deep learning, transformers, pretraining, instruction tuning, inference, multimodality, and the practical limits of foundation models. Focus on the questions an executive must ask rather than implementation detail.",resources:[["Hugging Face LLM Course","https://huggingface.co/learn/llm-course/chapter1/1"]]},
        {id:"m2l2",title:"Enterprise GenAI patterns",duration:"75 min",body:"Learn prompt orchestration, embeddings, vector retrieval, RAG, tool use, structured outputs, guardrails, fine-tuning, and evaluation. For each pattern, identify the business problem it solves and its operational failure modes.",resources:[["Full Stack Deep Learning — LLM Bootcamp","https://fullstackdeeplearning.com/llm-bootcamp/"]]},
        {id:"m2l3",title:"Agentic systems",duration:"75 min",body:"Study systems that plan, invoke tools, maintain state, and act across workflows. Pay particular attention to permission boundaries, human-in-the-loop design, observability, rollback, and the difference between a demo and a production control system.",resources:[]},
        {id:"m2l4",title:"Model economics",duration:"60 min",body:"Model the cost stack: tokens/inference, embeddings, retrieval, data pipelines, GPU/accelerator usage, evaluation, observability, human review, and vendor margin. Learn to translate model choices into unit economics.",resources:[]}
      ],
      quiz:[
        {q:"RAG is primarily used to:",options:["Change model weights","Ground generation in retrieved context","Reduce all hallucinations to zero","Replace evaluation"],answer:1},
        {q:"A critical production concern for agents is:",options:["Only prompt length","Tool permissions and action boundaries","Whether the UI has a chatbot","Using the largest model available"],answer:1}
      ],
      homework:"Create an architecture decision record comparing three approaches for an enterprise knowledge assistant: hosted API + RAG, private hosted model + RAG, and fine-tuned model. Include security, quality, latency, cost, lock-in, and operational complexity."
    },
    {
      id:"meval", weeks:"5–6", title:"AI Evaluation & Assurance", subtitle:"Measure quality, safety, reliability, and business readiness",
      summary:"Build an enterprise evaluation discipline for models, RAG systems, agents, and AI-enabled workflows. Learn how to translate business expectations into testable criteria, combine automated and human grading, validate agent behavior end to end, and connect pre-launch evals to production monitoring.",
      objectives:["Define an enterprise AI evaluation strategy","Design representative eval datasets and rubrics","Select deterministic, model-based, and human graders","Evaluate agents and production systems end to end","Set launch gates and continuous monitoring thresholds"],
      lessons:[
        {id:"mevall1",title:"Evaluation as an executive control system",duration:"60 min",body:"Treat evaluation as the mechanism that converts vague expectations into measurable release criteria. Separate capability, quality, safety, compliance, cost, latency, and business-outcome measures. Define what must be true before a pilot, controlled launch, or enterprise scale-up is approved. A CAIO should be able to ask not just whether a model is impressive, but whether the complete system is reliable enough for its intended risk tier.",resources:[["OpenAI — How evals drive AI for businesses","https://openai.com/index/evals-drive-next-chapter-of-ai/"],["Google Cloud — GenAI evaluation overview","https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview"]]},
        {id:"mevall2",title:"Datasets, tasks, and success criteria",duration:"75 min",body:"Build evaluation sets from representative user tasks, known production failures, high-risk edge cases, and adversarial scenarios. Keep held-out cases for regression testing, watch for contamination, and use domain experts to validate task realism. Document the claim each eval supports, the tested system configuration, and known limitations so leaders do not overgeneralize from a benchmark score.",resources:[["OpenAI — Measuring performance on real-world tasks (GDPval)","https://openai.com/index/gdpval/"],["OpenAI — Trustworthy third-party evaluations","https://openai.com/index/trustworthy-third-party-evaluations-foundations/"]]},
        {id:"mevall3",title:"Metrics, graders, and human calibration",duration:"75 min",body:"Use deterministic checks where correctness can be mechanically verified, rubric-based or model graders for subjective dimensions, and expert human review for calibration and high-stakes judgments. Learn pairwise comparison, partial credit, pass/fail launch thresholds, confidence intervals, and error taxonomies. Model judges should be periodically calibrated against trusted human judgments rather than treated as ground truth.",resources:[["Anthropic — Demystifying evals for AI agents","https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"],["Google Cloud — Develop and evaluate a generative AI application","https://docs.cloud.google.com/docs/ai-ml/generative-ai/develop-generative-ai-application"]]},
        {id:"mevall4",title:"Evaluating RAG and agentic systems",duration:"90 min",body:"Evaluate the whole system, not only the base model. For RAG, distinguish retrieval failure from generation failure and measure groundedness, citation quality, completeness, and permission correctness. For agents, test task completion, tool selection, side effects, recovery, permission boundaries, cost, latency, and robustness across multiple valid solution paths. Avoid brittle evals that require one exact tool-call sequence when several correct approaches exist.",resources:[["Anthropic — Demystifying evals for AI agents","https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"],["Google Cloud — Master GenAI evaluation from prompts to agents","https://cloud.google.com/blog/topics/developers-practitioners/master-generative-ai-evaluation-from-single-prompts-to-complex-agents"]]},
        {id:"mevall5",title:"Eval-driven development and production assurance",duration:"75 min",body:"Make evals part of the AI delivery lifecycle: define acceptance criteria before implementation, run regression suites on prompt/model/tool changes, use red-team and safety testing before launch, and combine production monitoring, user feedback, transcript sampling, A/B tests, and incident analysis after launch. Establish ownership, review cadence, escalation thresholds, and an executive quality-and-risk scorecard.",resources:[["Anthropic — Demystifying evals for AI agents","https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"],["OpenAI — Trustworthy third-party evaluations","https://openai.com/index/trustworthy-third-party-evaluations-foundations/"]]}
      ],
      quiz:[
        {q:"Why should a CAIO care about evaluation beyond model benchmarks?",options:["Benchmarks already determine production readiness","Enterprise outcomes depend on the complete system, workflow, risk tier, and real user distribution","Evaluation is primarily an ML engineering concern","Only regulators need evaluation evidence"],answer:1},
        {q:"Which grading strategy is strongest for an enterprise eval suite?",options:["Use an LLM judge for every test","Use human reviewers for every test","Combine deterministic graders, calibrated model graders, and targeted human expert review","Use only user satisfaction surveys"],answer:2},
        {q:"For an agentic workflow, a robust eval should usually prioritize:",options:["The exact sequence of tool calls","The final outcome, important intermediate constraints, side effects, and safety boundaries","The largest possible benchmark dataset regardless of relevance","Only average latency"],answer:1},
        {q:"After deployment, the evaluation program should:",options:["Stop once launch criteria are met","Run only when a vendor releases a new model","Continue through production monitoring, feedback, regression tests, and periodic human calibration","Be replaced by quarterly business reviews"],answer:2}
      ],
      homework:"Design an evaluation and assurance plan for an enterprise AI assistant or agent. Define the business task and risk tier; create at least 25 representative and edge-case eval tasks; define quality, safety, cost, and latency metrics; specify deterministic/model/human graders; establish launch gates; add a red-team plan; and design a production monitoring scorecard with escalation thresholds. Include a one-page executive summary explaining what evidence would justify scaling, pausing, or rolling back the system."
    },
    {
      id:"m3", weeks:"7–8", title:"AI Strategy & Portfolio", subtitle:"Turn business strategy into a value-ranked AI portfolio",
      summary:"Build an enterprise AI strategy, find high-value use cases, sequence bets, and distinguish transformative initiatives from automation theater.",
      objectives:["Create an AI strategy","Prioritize use cases","Build portfolio horizons","Tie AI work to enterprise KPIs"],
      lessons:[
        {id:"m3l1",title:"Strategy before tooling",duration:"60 min",body:"Start from company strategy: revenue growth, margin, customer experience, speed, risk, and strategic differentiation. AI initiatives should map directly to measurable enterprise objectives.",resources:[["McKinsey Global Tech Agenda 2026","https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-global-tech-agenda-2026"]]},
        {id:"m3l2",title:"Use-case discovery",duration:"60 min",body:"Use process mapping and value-stream analysis to identify opportunities in decision support, content, software development, operations, customer service, knowledge work, forecasting, and autonomous workflows.",resources:[]},
        {id:"m3l3",title:"Portfolio scoring",duration:"75 min",body:"Score use cases on strategic value, financial value, feasibility, data readiness, adoption difficulty, risk, time-to-value, and option value. Avoid a single ROI metric that hides strategic importance or risk.",resources:[]}
      ],
      quiz:[
        {q:"The best starting point for enterprise AI strategy is:",options:["A vendor capability list","The company strategy and value pools","A mandate to use GenAI everywhere","A list of available models"],answer:1},
        {q:"A portfolio should include:",options:["Only quick wins","Only transformational bets","A mix of near-term value and longer-horizon strategic bets","Only projects with immediate hard-dollar savings"],answer:2}
      ],
      homework:"Build a 12-use-case AI portfolio for a hypothetical company. Rank it using a transparent scoring model and select 3 lighthouse use cases, 5 scale candidates, and 4 experiments."
    },
    {
      id:"m4", weeks:"9–10", title:"Data, Platform & Architecture", subtitle:"Design the foundation that lets AI scale safely",
      summary:"Understand AI-ready data, model/platform architecture, integration patterns, cloud choices, MLOps/LLMOps, observability, and build-vs-buy decisions.",
      objectives:["Assess AI data readiness","Design a reference platform","Define LLMOps capabilities","Make build/buy/partner decisions"],
      lessons:[
        {id:"m4l1",title:"AI-ready data",duration:"60 min",body:"Assess quality, lineage, access, privacy, freshness, semantics, permissions, and ownership. AI magnifies weak data governance because models can expose or amplify hidden data problems.",resources:[]},
        {id:"m4l2",title:"Enterprise AI platform",duration:"75 min",body:"Design model gateways, identity, secrets, retrieval, model routing, prompt/config management, evaluation, observability, policy enforcement, logging, and cost controls as shared platform capabilities.",resources:[]},
        {id:"m4l3",title:"MLOps and LLMOps",duration:"75 min",body:"Learn lifecycle controls for datasets, prompts, models, evaluation suites, deployment, monitoring, rollback, incident response, and feedback loops. Treat prompts and evals as production artifacts.",resources:[["Google Cloud — Generative AI learning resources","https://cloud.google.com/learn/training/generative-ai"]]}
      ],
      quiz:[
        {q:"An AI platform should centralize primarily:",options:["Every business workflow","Reusable controls and capabilities","All product decisions","All datasets into one database"],answer:1},
        {q:"Why is evaluation a platform concern?",options:["It is only needed during model training","Shared evaluation makes quality measurable across releases and use cases","It removes the need for monitoring","It guarantees regulatory compliance"],answer:1}
      ],
      homework:"Draw a reference enterprise AI platform for a regulated company. Include data plane, model plane, application plane, identity/security, evaluation, observability, and governance control points."
    },
    {
      id:"m5", weeks:"11–13", title:"Governance, Risk & Regulation", subtitle:"Move fast without creating unmanaged enterprise exposure",
      summary:"Operationalize AI governance using risk tiers, lifecycle controls, NIST AI RMF, ISO/IEC 42001, OECD principles, privacy/security practices, and current regulation.",
      objectives:["Apply AI risk frameworks","Create risk tiers","Design governance workflows","Brief executives on regulatory exposure"],
      lessons:[
        {id:"m5l1",title:"NIST AI RMF",duration:"90 min",body:"Study GOVERN, MAP, MEASURE, and MANAGE. Build governance into delivery rather than adding a compliance gate at the end. Use the GenAI profile to understand risks specific to generative systems.",resources:[["NIST AI RMF","https://www.nist.gov/itl/ai-risk-management-framework"],["NIST Generative AI Profile","https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"]]},
        {id:"m5l2",title:"ISO/IEC 42001 and management systems",duration:"75 min",body:"Understand the logic of an AI management system: policy, accountability, objectives, risk management, controls, monitoring, auditability, and continual improvement.",resources:[["ISO/IEC 42001 overview","https://www.iso.org/standard/42001"]]},
        {id:"m5l3",title:"Responsible AI principles",duration:"60 min",body:"Study transparency, explainability, robustness, security, safety, accountability, human oversight, and stakeholder impact. Translate principles into engineering and business controls.",resources:[["OECD AI Principles","https://www.oecd.org/en/topics/ai-principles.html"]]},
        {id:"m5l4",title:"EU AI Act and regulatory scanning",duration:"90 min",body:"Learn risk classification, transparency obligations, GPAI considerations, high-risk systems, recordkeeping, literacy, and the implementation timeline. Build a process to monitor regulatory change instead of memorizing one snapshot.",resources:[["EU AI Act implementation timeline","https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline"]]}
      ],
      quiz:[
        {q:"The strongest AI governance design is:",options:["A final legal review after development","Lifecycle controls proportional to risk","A ban on third-party models","One universal approval path for every use case"],answer:1},
        {q:"ISO/IEC 42001 is best understood as:",options:["A model benchmark","An AI management system standard","A privacy law","A cloud architecture framework"],answer:1}
      ],
      homework:"Create an AI governance playbook with 3 risk tiers, required evidence per tier, approval roles, red-team/evaluation requirements, incident escalation, vendor review, and an AI-system registry."
    },
    {
      id:"m6", weeks:"14–15", title:"Security, Privacy & Resilience", subtitle:"Secure models, data, prompts, tools, and autonomous actions",
      summary:"Develop executive command of AI-specific security threats and controls, including prompt injection, data leakage, model supply chain risk, excessive agency, and secure deployment patterns.",
      objectives:["Threat-model AI systems","Define security controls","Design incident response","Govern third-party AI risk"],
      lessons:[
        {id:"m6l1",title:"AI threat modeling",duration:"75 min",body:"Threat-model the full system: user inputs, prompts, retrieval, tools, plugins, model provider, data stores, output channels, identities, and downstream actions. Model failures are only one part of the attack surface.",resources:[["OWASP Top 10 for LLM Applications","https://owasp.org/www-project-top-10-for-large-language-model-applications/"]]},
        {id:"m6l2",title:"Privacy and data boundaries",duration:"60 min",body:"Define what data may enter which model, under what contractual terms, retention policy, region, identity, and auditing. Separate public, internal, confidential, restricted, and regulated information classes.",resources:[]},
        {id:"m6l3",title:"Resilience and incident response",duration:"60 min",body:"Prepare for harmful outputs, data exposure, model/vendor outage, compromised connectors, runaway agents, and policy breaches. Define kill switches, rollback, alternate models, and escalation ownership.",resources:[]}
      ],
      quiz:[
        {q:"Prompt injection is primarily a risk because it can:",options:["Only make responses longer","Manipulate model behavior and tool use through untrusted content","Increase model training speed","Remove the need for authentication"],answer:1},
        {q:"Agentic AI increases security concern because:",options:["Agents use more CSS","They can take actions using real permissions and tools","They cannot access data","They never need monitoring"],answer:1}
      ],
      homework:"Run a threat-model workshop for a hypothetical AI agent with email, CRM, and document access. Produce abuse cases, controls, residual risks, monitoring signals, and incident playbooks."
    },
    {
      id:"m7", weeks:"16–17", title:"AI Economics & Investment", subtitle:"Make AI a disciplined capital-allocation problem",
      summary:"Build business cases, unit economics, benefit-realization models, portfolio funding approaches, and vendor economics for AI investments.",
      objectives:["Model AI ROI","Calculate unit economics","Design funding gates","Challenge vendor claims"],
      lessons:[
        {id:"m7l1",title:"From pilot metrics to enterprise value",duration:"60 min",body:"Distinguish activity metrics from value metrics. Measure revenue, margin, cycle time, quality, risk reduction, capacity released, and strategic option value. Define baseline and counterfactual before deployment.",resources:[["Deloitte — Beyond Pilots: Transforming IT for AI at Scale","https://www.deloitte.com/ca/en/services/consulting/perspectives/transforming-it-ai.html"]]},
        {id:"m7l2",title:"AI unit economics",duration:"75 min",body:"Calculate cost per task, per user, per decision, or per workflow. Include inference, retrieval, storage, platform overhead, human review, support, security, compliance, and change costs.",resources:[]},
        {id:"m7l3",title:"Stage-gated investment",duration:"60 min",body:"Fund uncertainty deliberately: discovery, prototype, controlled production, scale. Increase investment only as technical feasibility, adoption, and value evidence improve.",resources:[]}
      ],
      quiz:[
        {q:"A strong AI business case should measure:",options:["Only model accuracy","Business outcome change versus a baseline","Number of prompts sent","Executive enthusiasm"],answer:1},
        {q:"Why use stage gates?",options:["To guarantee every project scales","To increase investment as uncertainty is retired","To prevent experimentation","To avoid measuring value"],answer:1}
      ],
      homework:"Build a 3-year financial model for an AI customer-service program with adoption, deflection, staffing impact, model cost, platform cost, change cost, and downside scenarios."
    },
    {
      id:"m8", weeks:"18–20", title:"Operating Model, Talent & Change", subtitle:"Rewire how the company works, not just what technology it buys",
      summary:"Design the AI organization, federated delivery model, skills strategy, workforce transformation, adoption system, and responsible incentives needed for sustained change.",
      objectives:["Design an AI operating model","Build a talent plan","Lead workforce change","Create adoption mechanisms"],
      lessons:[
        {id:"m8l1",title:"Centralize, federate, or hybrid?",duration:"75 min",body:"Define which capabilities belong in a central AI platform/enablement function and which belong in business units. Common central responsibilities include standards, platform, governance, high-leverage expertise, and portfolio visibility.",resources:[]},
        {id:"m8l2",title:"Talent architecture",duration:"60 min",body:"Plan for AI product leaders, data/ML engineers, platform engineers, security, risk, UX, evaluation, domain experts, and change leaders. Upskill existing teams while selectively hiring scarce roles.",resources:[]},
        {id:"m8l3",title:"AI literacy and workforce redesign",duration:"75 min",body:"Move beyond tool training. Redesign workflows, roles, incentives, quality controls, manager expectations, and human accountability. Treat adoption as an operating-model transformation.",resources:[]},
        {id:"m8l4",title:"Communities of practice",duration:"45 min",body:"Create champions, reusable patterns, office hours, internal showcases, and peer learning. Scale organizational learning faster than a central team can deliver projects.",resources:[]}
      ],
      quiz:[
        {q:"AI transformation fails most often when adoption is treated as:",options:["An operating-model change","A technology deployment only","A leadership priority","A measurable business program"],answer:1},
        {q:"A federated model works best when:",options:["Standards are optional","Central capabilities enable business-owned outcomes","Business units cannot build AI","The CAIO approves every prompt"],answer:1}
      ],
      homework:"Design the first 18 months of an AI organization for a 5,000-person enterprise: org chart, central vs federated responsibilities, hiring sequence, upskilling plan, and adoption KPIs."
    },
    {
      id:"m9", weeks:"21–22", title:"Executive & Board Leadership", subtitle:"Communicate AI as strategy, risk, capital, and organizational change",
      summary:"Learn to communicate with CEOs and boards using business language, decision memos, scenario planning, governance reporting, and concise executive narratives.",
      objectives:["Brief a board on AI","Write decision memos","Communicate uncertainty","Report value and risk together"],
      lessons:[
        {id:"m9l1",title:"Board-level AI narrative",duration:"60 min",body:"A board needs clarity on strategic stakes, investment, material risks, governance, capability maturity, competitors, and key decisions—not a model architecture tutorial.",resources:[["Deloitte — AI Board Governance Roadmap","https://www.deloitte.com/us/en/programs/center-for-board-effectiveness/articles/board-of-directors-governance-framework-artificial-intelligence.html"]]},
        {id:"m9l2",title:"Decision memos",duration:"60 min",body:"Use a one- or two-page format: decision required, context, options, recommendation, economics, risk, assumptions, reversibility, and next checkpoint. Make uncertainty explicit.",resources:[]},
        {id:"m9l3",title:"AI maturity reporting",duration:"45 min",body:"Create a balanced executive scorecard covering business value, adoption, delivery, platform health, governance, incidents, talent, and pipeline. Avoid vanity metrics such as raw prompt counts.",resources:[]}
      ],
      quiz:[
        {q:"A board AI update should emphasize:",options:["Transformer internals","Strategic value, risk, investment, governance, and decisions","Prompt-writing tips","A full engineering backlog"],answer:1},
        {q:"Good executive communication about uncertainty should:",options:["Hide uncertainty to build confidence","Quantify assumptions and define checkpoints","Avoid scenarios","Promise deterministic outcomes"],answer:1}
      ],
      homework:"Prepare a 10-slide board update on enterprise AI: market context, strategy, portfolio, value realized, material risks, governance, platform, workforce, 12-month roadmap, and 3 decisions requested from the board."
    },
    {
      id:"m10", weeks:"23–26", title:"CAIO Capstone", subtitle:"Produce evidence that you can do the job",
      summary:"Integrate the course into an interview- and board-ready Chief AI Officer portfolio that demonstrates strategy, architecture, governance, economics, operating model, and executive leadership.",
      objectives:["Build an enterprise AI plan","Defend trade-offs","Demonstrate executive judgment","Create career evidence"],
      lessons:[
        {id:"m10l1",title:"Choose the enterprise",duration:"45 min",body:"Select a real or realistic company. Document business model, strategic priorities, data constraints, regulatory exposure, technology estate, AI maturity, and competitive pressures.",resources:[["Stanford AI Index 2026","https://hai.stanford.edu/ai-index/2026-ai-index-report"]]},
        {id:"m10l2",title:"Build the transformation plan",duration:"4–6 hr",body:"Create an 18-month AI transformation roadmap containing use-case portfolio, platform architecture, operating model, governance, security, workforce plan, budget, financial outcomes, KPIs, and decision cadence.",resources:[]},
        {id:"m10l3",title:"Executive defense",duration:"2 hr",body:"Prepare to defend the plan against CEO, CFO, CIO, CISO, legal, and board questions. For each major decision, explain alternatives, assumptions, trade-offs, and signals that would cause you to change direction.",resources:[]},
        {id:"m10l4",title:"Career evidence package",duration:"2 hr",body:"Convert the capstone into interview material: a 2-page AI strategy memo, board deck, architecture one-pager, governance model, value scorecard, and 6 leadership stories demonstrating CAIO competencies.",resources:[]}
      ],
      quiz:[
        {q:"The capstone is strongest when it demonstrates:",options:["Only technical depth","Integrated business, technical, financial, risk, and leadership judgment","Only knowledge of current vendors","Only regulatory knowledge"],answer:1},
        {q:"A CAIO-ready portfolio should make trade-offs:",options:["Invisible","Explicit, evidence-based, and reversible where possible","Vendor-defined","Purely technical"],answer:1}
      ],
      homework:"Final deliverable: an executive-ready Enterprise AI Transformation Plan and a 30-minute board presentation. Have a peer or mentor challenge the plan using CEO, CFO, CISO, and legal perspectives; revise based on the critique."
    }
  ],
  references:[
    ["NIST AI Risk Management Framework","https://www.nist.gov/itl/ai-risk-management-framework","Core enterprise AI risk framework; AI RMF 1.0 is under revision as of 2026."],
    ["NIST Generative AI Profile","https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf","GenAI-specific companion to the NIST AI RMF."],
    ["ISO/IEC 42001","https://www.iso.org/standard/42001","International AI management system standard."],
    ["OECD AI Principles","https://www.oecd.org/en/topics/ai-principles.html","Intergovernmental principles for trustworthy AI."],
    ["EU AI Act implementation timeline","https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline","Official implementation milestones and applicability dates."],
    ["Stanford AI Index 2026","https://hai.stanford.edu/ai-index/2026-ai-index-report","Annual data-driven view of AI capability, adoption, economics, governance, and societal impact."],
    ["Anthropic — Demystifying evals for AI agents","https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents","Practical 2026 guidance for designing, grading, maintaining, and productionizing agent evaluations."],
    ["OpenAI — How evals drive AI for businesses","https://openai.com/index/evals-drive-next-chapter-of-ai/","Executive framing for using evaluation to specify, measure, and improve AI systems."],
    ["OpenAI — Trustworthy third-party evaluations","https://openai.com/index/trustworthy-third-party-evaluations-foundations/","Guidance on claims, system configuration, elicitation, budgets, and validity checks for modern evaluations."],
    ["Google Cloud — GenAI evaluation overview","https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview","Rubrics, metrics, and model-based evaluation patterns for generative AI systems."],
    ["Hugging Face LLM Course","https://huggingface.co/learn/llm-course/chapter1/1","Hands-on technical grounding in transformers and LLMs."],
    ["Full Stack Deep Learning — LLM Bootcamp","https://fullstackdeeplearning.com/llm-bootcamp/","Applied LLM product and production concepts."],
    ["OWASP Top 10 for LLM Applications","https://owasp.org/www-project-top-10-for-large-language-model-applications/","Security risks and mitigations for LLM-enabled applications."],
    ["Google Cloud Generative AI Learning","https://cloud.google.com/learn/training/generative-ai","Current cloud-based GenAI learning resources."],
    ["McKinsey Global Tech Agenda 2026","https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-global-tech-agenda-2026","Executive perspective on AI, data, operating models, and technology strategy."],
    ["Deloitte — AI at Scale","https://www.deloitte.com/ca/en/services/consulting/perspectives/transforming-it-ai.html","Enterprise operating, governance, and value realization considerations."],
    ["Deloitte — AI Board Governance Roadmap","https://www.deloitte.com/us/en/programs/center-for-board-effectiveness/articles/board-of-directors-governance-framework-artificial-intelligence.html","Board oversight structure and governance questions."],
    ["IBM — What is a Chief AI Officer?","https://www.ibm.com/think/topics/chief-ai-officer","Overview of the CAIO role and responsibilities."]
  ]
};

const key = "caio-learning-progress-v1";
const state = JSON.parse(localStorage.getItem(key) || '{"completed":{},"homework":{},"quiz":{}}');
const save = () => localStorage.setItem(key, JSON.stringify(state));
const el = id => document.getElementById(id);
const allLessons = course.modules.flatMap(m=>m.lessons);
const pct = () => Math.round((allLessons.filter(l=>state.completed[l.id]).length / allLessons.length)*100);
const modulePct = m => Math.round((m.lessons.filter(l=>state.completed[l.id]).length/m.lessons.length)*100);

function setView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  el(name+'-view').classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const active=document.querySelector(`[data-nav="${name}"]`); if(active) active.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderNav(){
  const nav=el('course-nav');
  nav.innerHTML=`<button class="nav-btn" data-nav="dashboard" onclick="renderDashboard()">Dashboard</button>`+
  course.modules.map((m,i)=>`<button class="nav-btn" data-nav="${m.id}" onclick="renderModule('${m.id}')">${String(i+1).padStart(2,'0')} · ${m.title}<span class="nav-meta">${modulePct(m)}%</span></button>`).join('')+
  `<button class="nav-btn" data-nav="references" onclick="renderReferences()">Reference library</button>`;
}
function updateOverall(){ el('overall-progress-text').textContent=`${pct()}% complete`; }
function renderDashboard(){
  history.replaceState(null,'',location.pathname+location.search+'#dashboard');
  setView('dashboard'); el('page-title').textContent='Dashboard'; updateOverall();
  const done=allLessons.filter(l=>state.completed[l.id]).length;
  const homeworkDone=course.modules.filter(m=>state.homework[m.id]).length;
  const quizzesDone=course.modules.filter(m=>state.quiz[m.id]!==undefined).length;
  el('dashboard-view').innerHTML=`
    <div class="hero"><div class="hero-copy"><p class="eyebrow">FROM TECHNICAL LEADER TO ENTERPRISE AI EXECUTIVE</p><h3>Learn to lead AI across the whole company.</h3><p>A 26-week course for experienced technical leaders. Read original lessons, work through decisions and examples, then build a portfolio you can defend with executives.</p><div class="progress-track"><div class="progress-fill" style="width:${pct()}%"></div></div></div></div>
    <div class="grid">
      <div class="card span-4"><p class="eyebrow">LESSONS</p><div class="stat">${done}/${allLessons.length}</div><p class="muted">Completed and always available for review.</p></div>
      <div class="card span-4"><p class="eyebrow">HOMEWORK</p><div class="stat">${homeworkDone}/${course.modules.length}</div><p class="muted">Executive artifacts and applied practice.</p></div>
      <div class="card span-4"><p class="eyebrow">QUIZZES</p><div class="stat">${quizzesDone}/${course.modules.length}</div><p class="muted">Retrieval practice after each module.</p></div>
      <div class="card span-8"><h3>Course sequence</h3><div class="module-list">${course.modules.map((m,i)=>`<div class="module-row" onclick="renderModule('${m.id}')"><div><small>Weeks ${m.weeks}</small><strong>${i+1}. ${m.title}</strong><small>${m.subtitle}</small></div><span class="badge ${modulePct(m)===100?'done':''}">${modulePct(m)}%</span></div>`).join('')}</div></div>
      <div class="card span-4"><h3>Learning design</h3><p class="muted">Each module uses explicit objectives, short conceptual lessons, active application, retrieval practice, cumulative artifacts, and a capstone. Revisit completed lessons on a spaced schedule: 1 week, 1 month, and 3 months.</p><div class="callout">Recommended rhythm: learn → apply → quiz → explain aloud → revisit.</div></div>
      <div class="card span-12"><h3>Career outcome</h3><p class="muted">By completion, you should have an interview-ready CAIO evidence portfolio: AI charter, prioritized use-case portfolio, reference architecture, governance playbook, threat model, financial model, operating model, board update, and full enterprise AI transformation capstone.</p></div>
    </div>`;
  renderNav(); document.querySelector('[data-nav="dashboard"]').classList.add('active');
}
function renderModule(id){
  history.replaceState(null,'',location.pathname+location.search+'#module/'+id);
  const m=course.modules.find(x=>x.id===id); setView('section'); el('page-title').textContent=m.title; updateOverall();
  el('section-view').innerHTML=`
    <div class="section-head"><p class="eyebrow">WEEKS ${m.weeks} · MODULE ${course.modules.indexOf(m)+1}</p><h3>${m.title}</h3><p>${m.summary}</p><div class="objectives">${m.objectives.map(x=>`<span class="objective">${x}</span>`).join('')}</div></div>
    <div class="card summary-box"><h4>Section summary</h4><p>${m.summary}</p><p class="muted">Use this as your review anchor after completing the section.</p></div>
    ${m.lessons.map((l,i)=>`<div class="card lesson"><div class="lesson-top"><div><p class="eyebrow">LESSON ${i+1} · ${l.duration}</p><h4>${l.title}</h4></div><span class="badge ${state.completed[l.id]?'done':''}">${state.completed[l.id]?'Completed':'Ready to read'}</span></div><p>${l.body}</p><button class="primary" onclick="openLesson('${l.id}')">Open lesson →</button><label class="checkline"><input type="checkbox" ${state.completed[l.id]?'checked':''} onchange="toggleLesson('${l.id}',this.checked)"> Mark lesson complete</label></div>`).join('')}
    <div class="card homework"><p class="eyebrow">APPLIED PRACTICE</p><h3>Homework</h3><p>${m.homework}</p><label class="checkline"><input type="checkbox" ${state.homework[m.id]?'checked':''} onchange="toggleHomework('${m.id}',this.checked)"> I completed this artifact</label></div>
    <div class="card"><p class="eyebrow">RETRIEVAL PRACTICE</p><h3>Module quiz</h3><form id="quiz-form">${m.quiz.map((q,qi)=>`<div class="quiz-q"><strong>${qi+1}. ${q.q}</strong>${q.options.map((o,oi)=>`<label class="option"><input type="radio" name="q${qi}" value="${oi}"> ${o}</label>`).join('')}</div>`).join('')}<button type="button" class="primary" onclick="gradeQuiz('${m.id}')">Submit quiz</button><div id="quiz-result" class="quiz-result">${state.quiz[m.id]!==undefined?`Last score: ${state.quiz[m.id]}%`:''}</div></form></div>
    <div class="card"><h3>Module references</h3>${moduleReferences(m).length?`<ul class="resources">${moduleReferences(m).map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener noreferrer">${r[0]} ↗</a></li>`).join('')}</ul>`:'<p class="muted">No external references are listed for this module.</p>'}</div>
    <footer>Review suggestion: return to this section after 7 days and explain the core ideas without notes before rereading.</footer>`;
  renderNav(); const b=document.querySelector(`[data-nav="${id}"]`); if(b)b.classList.add('active');
}
const regionalSources = {
  m5: [
    ['EU AI Act official overview','https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'],
    ['Canada Directive on Automated Decision-Making (federal government)','https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592'],
    ['Canadian privacy regulators: principles for generative AI','https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/']
  ],
  m6: [
    ['Office of the Privacy Commissioner of Canada: PIPEDA','https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/'],
    ['European Data Protection Board: AI model opinion','https://www.edpb.europa.eu/news/news/2024/edpb-opinion-ai-models-gdpr-principles-support-responsible-ai_en']
  ]
};
function moduleReferences(m){
  const links=[...m.lessons.flatMap(l=>l.resources),...(regionalSources[m.id]||[])];
  return [...new Map(links.map(link=>[link[1],link])).values()];
}
function visualFor(moduleId){
  if(moduleId==='meval') return `<figure class="learning-visual"><figcaption>Illustrative release gate: several checks must pass together</figcaption><div class="gate-bars"><div><span>Task success</span><b style="--w:87%">87% / target 85%</b></div><div><span>Grounded answers</span><b style="--w:91%">91% / target 90%</b></div><div><span>Permission safety</span><b class="fail" style="--w:98%">98% / target 100%</b></div></div><small>Example values for teaching only. The permission failure blocks this sample launch despite the other passes.</small></figure>`;
  if(moduleId==='m7'||moduleId==='m3') return `<figure class="learning-visual"><figcaption>Illustrative investment path</figcaption><div class="stage-chart"><span>Discovery<small>Low spend</small></span><span>Prototype<small>Feasibility</small></span><span>Pilot<small>Measured value</small></span><span>Scale<small>Proven controls</small></span></div><small>At each step, evidence determines whether funding grows.</small></figure>`;
  if(moduleId==='m5'||moduleId==='m6') return `<figure class="learning-visual"><figcaption>Jurisdiction check for one AI use case</figcaption><div class="region-grid"><div><strong>Canada</strong><p>Identify applicable federal or provincial privacy law. Public-sector automation may trigger additional directives.</p></div><div><strong>European Union</strong><p>Assess AI Act role and risk category. Review GDPR separately when personal data is used.</p></div><div><strong>United States</strong><p>Review relevant federal, state, and sector requirements for the particular use.</p></div></div><small>Confirm current rules and applicability with legal and privacy specialists.</small></figure>`;
  return `<figure class="learning-visual"><figcaption>From an idea to an accountable decision</figcaption><div class="stage-chart"><span>Business need<small>Owner</small></span><span>System design<small>Boundaries</small></span><span>Evidence<small>Evaluation</small></span><span>Decision<small>Review date</small></span></div></figure>`;
}
function openLesson(id, updateHash=true){
  const m=course.modules.find(x=>x.lessons.some(l=>l.id===id));
  if(!m) return;
  const l=m.lessons.find(x=>x.id===id), index=m.lessons.indexOf(l), parts=lessonContent[id];
  if(!parts) return;
  setView('lesson'); el('page-title').textContent=l.title;
  const links=[...l.resources,...(regionalSources[m.id]||[])];
  el('lesson-view').innerHTML=`<div class="lesson-layout"><div class="lesson-main">
    <button class="back-link" onclick="renderModule('${m.id}');location.hash='module/${m.id}'">← ${m.title}</button>
    <div class="section-head"><p class="eyebrow">MODULE ${course.modules.indexOf(m)+1} · LESSON ${index+1} · ${l.duration}</p><h3>${l.title}</h3><p>${l.body}</p></div>
    ${m.id==='meval'?'<img class="lesson-banner" src="eval-lesson.webp" alt="An evaluator comparing AI responses with source material and review signals" loading="lazy">':''}
    ${visualFor(m.id)}
    <article class="reading-part" id="part-1"><p class="eyebrow">PART 01 · UNDERSTAND</p><h3>${parts[0]}</h3><p>${parts[1]}</p></article>
    <article class="reading-part" id="part-2"><p class="eyebrow">PART 02 · APPLY</p><h3>${parts[2]}</h3><p>${parts[3]}</p></article>
    <div class="card practice-card"><p class="eyebrow">YOUR TURN</p><h3>Make it yours</h3><p>Write a short decision or artifact based on the example. State the owner, the evidence you would collect, and the condition that would change your decision. Keep it for the module homework.</p></div>
    ${links.length?`<div class="card"><h3>Further reading</h3><p class="muted">Use these sources to check details and go deeper.</p><ul class="resources">${links.map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener noreferrer">${r[0]} ↗</a></li>`).join('')}</ul></div>`:''}
    <label class="checkline completion"><input type="checkbox" ${state.completed[id]?'checked':''} onchange="toggleLesson('${id}',this.checked)"> I finished this lesson</label>
    <div class="lesson-actions"><button class="secondary" onclick="renderModule('${m.id}');location.hash='module/${m.id}'">Back to module</button>${m.lessons[index+1]?`<button class="primary" onclick="openLesson('${m.lessons[index+1].id}')">Next lesson →</button>`:''}</div>
  </div><aside class="lesson-toc"><p class="eyebrow">IN THIS LESSON</p><button onclick="document.getElementById('part-1').scrollIntoView({behavior:'smooth'})">01 · ${parts[0]}</button><button onclick="document.getElementById('part-2').scrollIntoView({behavior:'smooth'})">02 · ${parts[2]}</button><p class="muted">${l.duration} · Self paced</p></aside></div>`;
  renderNav(); document.querySelector(`[data-nav="${m.id}"]`)?.classList.add('active');
  if(updateHash) history.pushState(null,'',location.pathname+location.search+'#lesson/'+id);
}
function toggleLesson(id,v){state.completed[id]=v;save();updateOverall();renderNav();}
function toggleHomework(id,v){state.homework[id]=v;save();}
function gradeQuiz(id){
  const m=course.modules.find(x=>x.id===id); let score=0, answered=0;
  m.quiz.forEach((q,qi)=>{const c=document.querySelector(`input[name="q${qi}"]:checked`); if(c){answered++; if(Number(c.value)===q.answer)score++;}});
  if(answered<m.quiz.length){el('quiz-result').textContent='Answer every question before submitting.';return;}
  const p=Math.round(score/m.quiz.length*100); state.quiz[id]=p; save();
  el('quiz-result').textContent=`Score: ${p}% — ${p>=80?'Pass. Explain each answer aloud before moving on.':'Review the lessons and retry; target 80% or higher.'}`;
}
function renderReferences(){
  history.replaceState(null,'',location.pathname+location.search+'#references');
  setView('references'); el('page-title').textContent='Reference Library'; updateOverall();
  el('references-view').innerHTML=`<div class="section-head"><p class="eyebrow">CURATED EXTERNAL MATERIAL</p><h3>Reference library</h3><p>Use these sources for deeper study and to keep the program connected to current standards, regulation, technology, and executive practice.</p></div><div class="refs">${course.references.map(r=>`<div class="ref"><strong><a href="${r[1]}" target="_blank" rel="noopener">${r[0]} ↗</a></strong><small>${r[2]}</small></div>`).join('')}</div>`;
  renderNav(); document.querySelector('[data-nav="references"]').classList.add('active');
}
const themeButton=el('theme-toggle');
function updateThemeButton(){const dark=document.documentElement.dataset.theme==='dark';themeButton.textContent=dark?'☀ Light mode':'☾ Dark mode';themeButton.setAttribute('aria-pressed',String(dark));}
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('caio-theme',next);updateThemeButton();});
updateThemeButton();
function route(){const [type,id]=decodeURIComponent(location.hash.slice(1)).split('/');if(type==='lesson'&&id)openLesson(id,false);else if(type==='module'&&course.modules.some(m=>m.id===id))renderModule(id);else if(type==='references')renderReferences();else renderDashboard();}
window.addEventListener('hashchange',route);
window.addEventListener('popstate',route);
route();
