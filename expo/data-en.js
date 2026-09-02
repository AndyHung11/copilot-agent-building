/* data-en.js — English strings for each agent (extracted from the official source) */
const AGENTS_EN = {
 "A001": {
  "tagline": "✨ Your AI-powered news intelligence officer",
  "description": "The Exec News Aggregator agent keeps you informed by gathering, filtering, and summarizing recent, credible, and relevant industry news and trends. It delivers concise, decision-focused updates tailored to your interests, helping you to stay ahead of market shifts, competitor activity, and regulatory changes without information overload.",
  "painPoints": [
   "50+ RSS feeds open, still miss the key story",
   "Boss asks for an update, you Googled 30 sec ago",
   "Competitor news heard a week late, in a meeting"
  ],
  "quickStart": [
   "Step 1: Launch the Agent and type start.",
   "Step 2: Answer 3 quick questions: your industry focus, topics of interest, and preferred sources (e.g. Bloomberg, Reuters, TechCrunch).",
   "Step 3: Instantly receive a 14-day bulleted industry brief — every item already prioritized for you."
  ],
  "example": "start\n What are the latest AI investments in the technology sector this week?\n Summarize regulatory updates impacting fintech in the last 14 days."
 },
 "A002": {
  "tagline": "✨ Your daily prompt-engineering coach",
  "description": "This agent helps users improve their prompt engineering skills through daily challenges and interactive quizzes. It teaches and reinforces best practices using the GSEC framework (Goal, Source, Expectation, Context) and encourages users to iterate, reflect, and grow through hands-on practice.",
  "painPoints": [
   "Vague prompts in, mediocre output out",
   "Same template every time, no idea why it flops",
   "Prompting skills stuck at \"please summarize this\""
  ],
  "quickStart": [
   "Step 1: Open the Agent and say start today's challenge or Start today's quiz.",
   "Step 2: Read the scenario and write your best prompt using GSEC (Goal, Source, Expectation, Context).",
   "Step 3: Get instant scoring, model-answer comparison, and a sharper prompt to use tomorrow."
  ],
  "example": "start today's challenge\nStart today's quiz"
 },
 "A003": {
  "tagline": "✨ Your strategy sparring partner",
  "description": "The SWOT Agent is designed to support users in generating structured and insightful SWOT analysis across a wide range of subjects, including products, teams, business units, strategies, and initiatives. It serves as a valuable tool in strategic planning, retrospectives, workshops, and executive reporting. By guiding users through the SWOT framework, an established method in business settings for evaluating internal strengths and weaknesses alongside external opportunities and threats, the agent helps uncover key insights, align stakeholders, and inform decision-making with clarity and precision for any endeavour.",
  "painPoints": [
   "Blank 2x2 grid, meeting starts in 10 min",
   "Bullets feel obvious, execs say \"so what?\"",
   "Missed the real threat until it hit you"
  ],
  "quickStart": [
   "Step 1: Launch the Agent and tell it what you want to analyze (product, team, project, etc.).",
   "Step 2: Answer 2-3 quick context questions — market, goals, time horizon.",
   "Step 3: Get a structured S/W/O/T with prioritized insights, ready to paste into your deck."
  ],
  "example": "Generate a SWOT analysis for our new AI-powered customer support tool."
 },
 "A004": {
  "tagline": "✨ Your SoW drafting copilot",
  "description": "You are a Statement of Work Creator. Your role is to craft detailed and effective Statements of Work (SoWs) based on user input and any reference documents or templates the user provides.",
  "painPoints": [
   "Blank Word doc, client wants it Monday",
   "Copy-paste old SoW, forget to update scope",
   "Three rounds of redlines before client approves"
  ],
  "quickStart": [
   "Step 1: Open the Agent and share the project basics — client, objective, dates, budget range.",
   "Step 2: Upload any reference SoW or template so the format and tone match your standard.",
   "Step 3: Receive a full draft with scope, deliverables, milestones and assumptions — ready to review and send."
  ],
  "example": "- What are your skills?\n- Guide me through the process of creating SOW document for my project \n- Review my SoW document and provide feedback and guidance on \nimprovements\n- Define project phases and key deadlines for completion"
 },
 "A005": {
  "tagline": "✨ Your personal event concierge",
  "description": "Event Agent helps you quickly navigate [Event Name]. Whether you're looking for details about sessions, the venue, or the speakers, Event Agent is here to ensure you get the most out of your experience.",
  "painPoints": [
   "47-page program PDF, still can't find Room 4B",
   "Favorite session ended while you scrolled",
   "\"Wait, who is that speaker again?\""
  ],
  "quickStart": [
   "Step 1: Open Event Agent and ask anything: \"What's next in the AI track?\"",
   "Step 2: Tap suggested follow-ups for speaker bios, room directions, or related sessions.",
   "Step 3: Save the sessions you want to attend and get reminders before they start."
  ],
  "example": "What is the event about?\nWhen does the event start?"
 },
 "A006": {
  "tagline": "✨ From meeting noise to bite-size lessons",
  "description": "This agent enables users to extract key learning and knowledge elements from meetings, workshops, or expert discussions and convert them into concise, ready-to-use learning snippets. It analyzes descriptions, documents, notes or other content to generate summaries, quiz questions, and practical tips that can be quickly shared or added to internal knowledge bases. The agent streamlines informal learning and knowledge transfer. It helps prevent loss of valuable insights and supports the sharing of best practices throughout the organization. Interaction is clear and straightforward, with outputs focused on actionable content.",
  "painPoints": [
   "60-min workshop, 0 takeaways the next day",
   "Expert leaves the team, knowledge leaves with them",
   "\"We discussed this\" — but no notes anywhere"
  ],
  "quickStart": [
   "Step 1: Open Knowledge Extractor and paste your notes, transcript or doc (or describe the session).",
   "Step 2: Choose what you want: summary, quiz questions, practical tips, or all three.",
   "Step 3: Copy the snippets into chat, email, or your internal knowledge base — ready to share."
  ],
  "example": "1. Create a knowledge article from a meeting transcript that summarizes the most important information everyone should know about Copilot Studio: [/Add meeting transcript]\n2. Extract best pratices from the following document [/Add document or content]"
 },
 "A007": {
  "tagline": "✨ Your decision sparring partner",
  "description": "The Scenario Simulator Agent helps business users pre-explore the impact of operational and financial changes through conversational what-if simulations. By interpreting natural language inputs, the agent generates structured decision briefs that include assumptions, sensitivity analysis, risk factors, and recommended next steps as references for future operational and financial approaches. It is designed for fast, exploratory analysis, not for replacing formal finance or operations systems. It supports both sensitivity and stochastic simulations, such as Monte Carlo modeling or linear regression to simulate forecasts, and aligns with governance requirements for responsible AI use.",
  "painPoints": [
   "Big decisions made on gut feel + a hunch",
   "Finance model takes a week, decision needed today",
   "Surprise risks surface after launch — too late"
  ],
  "quickStart": [
   "Step 1: Describe the scenario in plain English: \"What if we raise prices 8% next quarter?\"",
   "Step 2: Refine the assumptions — volume, costs, customer behavior — through quick follow-ups.",
   "Step 3: Get a structured brief with sensitivity analysis, risks, and recommended next steps."
  ],
  "example": "What’s the impact on service coverage and cost if we deploy 50 additional frontline workers across high-demand regions?"
 },
 "A008": {
  "tagline": "✨ Your M365 project sidekick",
  "description": "A versatile project assistant designed to streamline Microsoft 365 initiatives by offering structured guidance, planning support, and best-practice insights. Built with adaptability in mind, this agent can be easily customized for other IT or business projects, ensuring consistent, scalable, and efficient project execution across diverse scenarios.",
  "painPoints": [
   "Reinventing the same rollout checklist… again",
   "Stakeholders out of sync, launch slips by weeks",
   "Forgot a prep step, fire-fighting on go-live day"
  ],
  "quickStart": [
   "Step 1: Tell the Agent your project type (Teams rollout, Copilot adoption, SharePoint migration, etc.).",
   "Step 2: Answer questions about scope, audience, timeline and risks.",
   "Step 3: Get a tailored project plan with phases, owners, key risks, and a change-management checklist."
  ],
  "example": "\"I need a high-level project plan for migrating from Exchange 2016 to Exchange Online. The migration should start in two months and finish by the end of Q4. Can you outline the phases, key milestones, and dependencies?\"\n\"What are the top risks for a Microsoft Teams rollout in a hybrid environment with 5,000 users, and how can we mitigate them?\"\n\"We’re planning a Defender for Endpoint deployment. Can you explain which Microsoft 365 licenses include this feature and what compliance considerations we should keep in mind?\""
 },
 "A009": {
  "tagline": "✨ Your brainstorm naming wizard",
  "description": "This agent helps users generate creative, relevant, and professional names for solutions and projects. It consistently delivers a set of 10 name suggestions, each paired with a catchy slogan, ensuring the output is imaginative and suitable for professional use. Designed to support both internal teams and external clients across any industry, the agent adapts to different tones and languages to meet user preferences.",
  "painPoints": [
   "Team can't agree: \"Project TBD\" for 6 weeks",
   "Whiteboard brainstorm, zero good ideas",
   "Slide deck still says \"placeholder name\""
  ],
  "quickStart": [
   "Step 1: Tell the Agent what you're naming — project, product, team, initiative.",
   "Step 2: Add context: audience, tone (playful vs. professional), and language preference.",
   "Step 3: Receive 10 names, each with a slogan — pick a winner and ship."
  ],
  "example": "Come up with possible titles for my presentation [Your Presentation]"
 },
 "A010": {
  "tagline": "✨ Your AI strategy discovery coach",
  "description": "The AI Mindset Advisor is your expert guide to identifying the right AI solution for your business needs. Whether you're exploring Microsoft 365 Copilot or just unsure where to begin, this assistant leads you through a structured discovery process to uncover your goals, pain points, and opportunities for AI. With a consultative approach, it helps clarify your use case, assess your current tools and workflows, and recommend the most suitable AI-powered solution. If you're looking to bring clarity to your AI journey and make confident, informed decisions, the AI Mindset Advisor is your go-to digital consultant.",
  "painPoints": [
   "47 AI tools, 47 demos, 0 clarity on what to pick",
   "Boss says \"do AI\" — do what, exactly?",
   "Pilots launched, business value unclear"
  ],
  "quickStart": [
   "Step 1: Start the Agent and describe your role and business area.",
   "Step 2: Walk through guided questions about goals, pain points, current tools and workflows.",
   "Step 3: Receive a tailored AI recommendation with the right solution, use case, and next steps."
  ],
  "example": "\"I’m in HR and we spend a lot of time manually reviewing employee feedback surveys. Can AI help us streamline this?\"\n\"I’m a finance analyst and I want to speed up how I prepare monthly reports in Excel. What Copilot options do I have?\""
 },
 "A011": {
  "tagline": "✨ Your daily prompting trainer",
  "description": "This agent helps users improve their prompt engineering skills through daily challenges and interactive quizzes. It teaches and reinforces best practices using the GSEC framework (Goal, Source, Expectation, Context) and encourages users to iterate, reflect, and grow through hands-on practice.",
  "painPoints": [
   "Bad output? \"AI is dumb.\" (Spoiler: it's your prompt.)",
   "Same prompt template, never know why it works",
   "Prompting skills plateaued at \"please summarize this\""
  ],
  "quickStart": [
   "Step 1: Open Prompting Mentor and ask for today's challenge.",
   "Step 2: Write your best prompt using GSEC: Goal, Source, Expectation, Context.",
   "Step 3: Get scored, see a stronger version, and learn the \"why\" — then try again tomorrow."
  ],
  "example": "start today's challenge\nStart today's quiz"
 },
 "A012": {
  "tagline": "✨ Your data-labeling assistant",
  "description": "This agent reviews a single uploaded document and recommends one of the available data classification labels. The recommendation is based on internal classification guidelines and must include a formal explanation.",
  "painPoints": [
   "\"Internal? Confidential? Public?\" — pure guesswork",
   "Classification policy is 40 pages no one reads",
   "Audit asks \"why this label?\" — you have no answer"
  ],
  "quickStart": [
   "Step 1: Open the Agent and upload the document you need to classify.",
   "Step 2: Wait a few seconds while it analyzes against your classification guidelines.",
   "Step 3: Receive a recommended label plus a formal, audit-ready rationale you can copy into your log."
  ],
  "example": "Recommend a classification for the following document: [document]"
 },
 "A013": {
  "tagline": "✨ Your SMART goal-setting coach",
  "description": "The SMART Agent is designed to support users in defining, refining, and scoping their goals and tasks using the SMART framework. SMART stands for: Specific, Measurable, Attractive, Realistic, and Time-bound — or in German: Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert. This framework is widely used across business, education, and health sectors to translate abstract goals into structured, actionable tasks. Grounded in behavioral science, it offers a practical and evidence-informed foundation for change management and performance tracking. Beyond structuring tasks, the SMART Agent also strengthens volition (willpower) by guiding users to break down large goals or challenges into motivating, feasible steps. This makes goals more actionable and aligned with personal or professional development.",
  "painPoints": [
   "\"Improve sales\" — great. How? By when?",
   "Goals slip every quarter, no one knows why",
   "Team unaligned on what \"success\" actually looks like"
  ],
  "quickStart": [
   "Step 1: Tell the Agent your goal in plain language: \"I want to grow my team's impact.\"",
   "Step 2: Answer guided questions on Specific, Measurable, Attractive, Realistic, Time-bound.",
   "Step 3: Get a polished SMART goal statement with milestones and success metrics."
  ],
  "example": "Help me improve my presentation skills"
 },
 "A014": {
  "tagline": "✨ Your NDA review co-counsel",
  "description": "The agent assists legal professionals in comparing Non-Disclosure Agreements (NDAs) by analyzing both uploaded and internal reference documents. It identifies and highlights key clauses, potential risks, and differences between the documents. The agent outputs a structured comparison in tabular format, ensuring legal accuracy, clarity, and confidentiality throughout the process.",
  "painPoints": [
   "Redlining NDAs at midnight, deal closes Monday",
   "Sneaky clause in §7.3, almost missed it",
   "Five versions in flight, no idea which is latest"
  ],
  "quickStart": [
   "Step 1: Upload the incoming NDA and (optionally) your internal reference template.",
   "Step 2: The Agent identifies key clauses, differences, and risks against your standard.",
   "Step 3: Receive a structured comparison table with risk flags — ready for the deal team."
  ],
  "example": "Compare this NDA against our internal guidelines"
 },
 "A015": {
  "tagline": "✨ Your agent design partner",
  "description": "Helps users craft high-quality instructions for their agents or reviews existing instructions and integrates suggested improvements.",
  "painPoints": [
   "Agent ignores half the rules you wrote",
   "Instructions = 2,000-word wall no one will edit",
   "It misbehaves — no clue what to fix"
  ],
  "quickStart": [
   "Step 1: Tell Agent Crafter what your agent should do — or paste your existing instructions.",
   "Step 2: Answer questions about persona, scope, tone, guardrails, and examples.",
   "Step 3: Receive a polished instruction set (or targeted edits) — ready to drop into your agent."
  ],
  "example": "Help me create instructions for my agent.\nReview the instructions I'm providing you here: [agent instructions]"
 },
 "A016": {
  "tagline": "✨ Your AI copy editor on standby",
  "description": "An agent that analyzes uploaded texts and documents, provides constructive feedback, and suggests clear improvements for direct implementation and use.",
  "painPoints": [
   "Send the email, spot the typo",
   "&ldquo;Their&rdquo; vs &ldquo;there&rdquo; again — every time",
   "Reading own writing 5 times still misses"
  ],
  "quickStart": [
   "Step 1: Launch the Agent and paste the text you want proofread.",
   "Step 2: It returns a cleaned-up version plus a list of changes (typos, grammar, tone tweaks).",
   "Step 3: Accept the edits as-is, or ask &ldquo;keep it more casual&rdquo; for a re-pass."
  ],
  "example": "Suggest clear ideas on how to improve this document."
 },
 "A017": {
  "tagline": "✨ Your on-demand problem-solving consultant",
  "description": "Use this Copilot Agent to create your buddy to help you solving your challenges! The Brainstorming Buddy is guiding you in an iterative conversation, giving you advice and diving deeper on your challenge with every turn you take.",
  "painPoints": [
   "Big problem hits, no idea where to start",
   "Brainstorming solo, spinning in circles",
   "Solutions stay vague, no real action plan"
  ],
  "quickStart": [
   "Step 1: Open the Agent and describe the problem you're stuck on in 1-2 sentences.",
   "Step 2: It builds a custom advisor for your situation and asks targeted clarifying questions.",
   "Step 3: Get a structured plan with root-cause analysis, options, and clear next steps."
  ],
  "example": "Help me solve my challenges based on your instructions"
 },
 "A018": {
  "tagline": "✨ Your daily AI news intelligence officer",
  "description": "Proactively delivers concise, credible, and timely industry news summaries tailored to executive interests. Supports real-time alerts, interactive queries, and continuous learning to keep decision-makers informed and ahead.",
  "painPoints": [
   "50 RSS feeds, still missed the news",
   "Boss asks &mdash; you're Googling under desk",
   "Competitor moved first, you heard in meeting"
  ],
  "quickStart": [
   "Step 1: Tell the Agent your industry, topics, and preferred sources.",
   "Step 2: It scans the past 14 days, filters out noise, and tags items as &ldquo;Must-Read / Nice-to-Know.&rdquo;",
   "Step 3: Get a clean bulleted brief delivered on demand — ready to share with your team."
  ],
  "example": "Start"
 },
 "A019": {
  "tagline": "✨ Your AI process designer",
  "description": "This agent helps users design and audit checklists for complex or high-stakes tasks. It transforms unstructured to-dos into clear, actionable steps, ensuring logical sequencing and clarity. The agent generates concise checklists, evaluates them for completeness, and highlights areas for improvement and streamlining workflows.",
  "painPoints": [
   "Steps in your head, always one slips",
   "Wrote a checklist, still no logic order",
   "Same risky task, rebuild plan each time"
  ],
  "quickStart": [
   "Step 1: Describe the task or process you want to systematize.",
   "Step 2: Get a structured checklist with clear sequence, decision points, and risk flags.",
   "Step 3: Ask for refinements — make it shorter, add owners, or split into pre-/during-/post-task lists."
  ],
  "example": "Create a checklist for a 3-person surgical prep team. The checklist should cover equipment setup, sterilization, and communication protocols."
 },
 "A020": {
  "tagline": "✨ Your AI negotiation strategist",
  "description": "The Dealcrafter Agent functions as a negotiation Assistant which helps users develop effective negotiation strategies by guiding them through planning, simulation, proposal framing, and outcome optimization. No matter the occasion, It uses structured prompts and user-provided data to simulate scenarios, generate briefs, and prepare for discussions.",
  "painPoints": [
   "Walk in unprepared, give ground fast",
   "Can't explain value &mdash; they say no",
   "Salary talk by luck, not by strategy"
  ],
  "quickStart": [
   "Step 1: Tell the Agent who you're negotiating with and what you want.",
   "Step 2: It maps out their likely position, your leverage, and your BATNA.",
   "Step 3: Get a play-by-play script with opening moves, counters, and walk-away lines."
  ],
  "example": "Simulate a negotiation scenario for a customer that wants closure on a deal."
 },
 "A021": {
  "tagline": "✨ Your AI training content co-creator",
  "description": "Enhance your corporate learning materials with Training Content Writer. This agent helps content creators craft high-quality, engaging, and effective learning content for internal communications. From defining objectives and understanding your audience to optimizing content and ensuring the right tone, Training Content Writer supports you throughout the content creation process. Elevate your training programs and empower your employees with expertly crafted learning materials.",
  "painPoints": [
   "Draft 1, draft 5, still uneven quality",
   "Same content, three roles &mdash; none fit right",
   "Building slides & quizzes eats your whole week"
  ],
  "quickStart": [
   "Step 1: Define your learning objectives, audience roles, and format (slides, eLearning, workshop).",
   "Step 2: The Agent drafts modules, examples, and assessments tailored to each role.",
   "Step 3: Ask for localization or tone tweaks — get multi-language versions in minutes."
  ],
  "example": "Learning Material Creation: Can you help me create an interactive module for our new software training?\nTone and Style Definition: Can you help me adjust the tone of this training manual to be more\nsupportive?"
 },
 "A022": {
  "tagline": "✨ Your AI multi-criteria decision coach",
  "description": "The Decision Architect Agent helps users make informed choices by guiding them through the Multi-Criteria Decision Analysis (MCDA) framework in a clear, step-by-step process. It improves decision quality by structuring how options are presented and evaluated. The agent ensures a transparent, evidence-based approach that minimizes cognitive biases and brings clarity to complex or high-stakes decisions. Users are supported in identifying criteria, assigning weights, scoring options, and interpreting results to achieve balanced decisions for everyday work scenarios.",
  "painPoints": [
   "Too many options, no clear winner",
   "Picked one &mdash; can't say why later",
   "Meetings loop forever, still no decision"
  ],
  "quickStart": [
   "Step 1: List your options and the criteria that matter (cost, risk, fit, etc.).",
   "Step 2: Agent builds a weighted MCDA matrix, scoring each option on each criterion.",
   "Step 3: Get a ranked recommendation with a sensitivity check — defendable to any stakeholder."
  ],
  "example": "I need help with a decision I can't make. Compare options A, B, and C for cost, speed, and quality. Cost matters most."
 },
 "A023": {
  "tagline": "✨ Your AI wellness & productivity coach",
  "description": "The Wellness & Productivity Coach helps employees improve their physical and mental well-being while enhancing daily productivity. It offers personalized guidance such as daily productivity tips, work-life balance suggestions, and quick wellness advice (e.g. desk stretches, mindfulness exercises, and time management) techniques). By encouraging healthy habits and sending motivational messages, this agent helps users integrate wellness into their work routine and sustain high performance.",
  "painPoints": [
   "Shoulders ache, eyes burn by 3pm daily",
   "Stressed, busier, less productive",
   "New habit dies on day three"
  ],
  "quickStart": [
   "Step 1: Tell the Coach your current routine, energy dips, and one habit you want to build.",
   "Step 2: Get a personalized daily plan with micro-breaks, focus blocks, and stress resets.",
   "Step 3: Check in weekly — Coach adjusts the plan based on what worked and what didn't."
  ],
  "example": "Suggest a Healthy Habit for me to perform today."
 },
 "A024": {
  "tagline": "✨ Your AI trend-to-action engine",
  "description": "Retrieves insights and combines them with recent industry trends based on user queries and inputs. Synthesizes these into actionable innovation ideas, facilitates brainstorming sessions using structured frameworks and prompts, and gamifies the output by turning ideas into challenges or quizzes for team engagement.",
  "painPoints": [
   "Trend reports galore, none relevant to me",
   "Brainstorms with no frame, no real ideas",
   "Good ideas pile up, no clue what's first"
  ],
  "quickStart": [
   "Step 1: Tell the Agent your industry, role, and challenge.",
   "Step 2: It surfaces relevant trends, then generates concrete idea cards tied to your context.",
   "Step 3: Get an impact-vs-effort ranking so you know which idea to pilot first."
  ],
  "example": "Show me emerging trends in [industry/technology] and give examples of how we can use them in [specific team or project]."
 },
 "A025": {
  "tagline": "✨ Your AI product planning partner",
  "description": "Product Crafter is designed to assist product teams (product managers, UX designers, and software developers) in early-stage product planning. It helps transform raw ideas into actionable, user-centric artefacts by leveraging proven frameworks such as Agile user stories, customer journey mapping, and the Jobs-to-Be Done (JTBD) methodology. The agent ensures outputs are consistent, high-quality, and aligned with business objectives, enabling teams to prioritize features, understand user needs, and collaborate effectively.",
  "painPoints": [
   "Dev built X, design built Y &mdash; you wanted Z",
   "User stories &mdash; no accept criteria, redo",
   "Roadmap by whoever's loudest in the room"
  ],
  "quickStart": [
   "Step 1: Describe the product idea or feature in your own words.",
   "Step 2: Agent generates user stories, acceptance criteria, and a journey map.",
   "Step 3: Ask for prioritization — get a RICE-scored backlog ready for sprint planning."
  ],
  "example": "Convert these raw ideas into structured user stories with roles and \ngoals."
 },
 "A026": {
  "tagline": "✨ Your AI strategy-to-execution auditor",
  "description": "This agent helps teams maintain strategic alignment by analyzing user-provided content for gaps, contradictions, and hidden dependencies. It relies on input such as pasted goals, plans, or project summaries. By organizing signals into silence, conflict, and linkage, the agent supports better decision-making and early risk detection.",
  "painPoints": [
   "Strategy says X, plans never mention it",
   "KPIs across docs contradict each other",
   "Hidden cross-project deps blow up later"
  ],
  "quickStart": [
   "Step 1: Drop in your strategy, OKRs, plans, and recent updates.",
   "Step 2: Agent maps them side-by-side and flags contradictions, gaps, and hidden dependencies.",
   "Step 3: Get a prioritized coherence report with concrete suggestions to realign."
  ],
  "example": "Help me identify misalignments, contradictions, and inconsistencies through gaps within the provided information."
 },
 "A027": {
  "tagline": "✨ Your AI behavior-change coach",
  "description": "With the new year approaching, are you willing to pick up a new skill, stick to a workflow, or turn a habit into something that actually lasts along the years? The resolution agent functions as an all-year-round coach and is designed to help you move forward with confidence and consistency for the new year and after. Grounded in the COM‑B theory, a proven behavioral science framework used in real-world settings, the agent understands behavior through three essential elements: capability, opportunity, and motivation. When any one of these is missing, change becomes harder, but it’s never out of reach. Whether you’re hesitant to try a new feature, stuck on a task, or unsure about the next step, the Agent provides timely, targeted support. It becomes your reliable companion for breaking through behavioral barriers, building momentum, and making progress across any domain.",
  "painPoints": [
   "Big NY goals die by mid-January",
   "Want to change &mdash; no clue why I fail",
   "Pure willpower, no nudge when I slip"
  ],
  "quickStart": [
   "Step 1: Share the resolution or habit you want to build (or stop).",
   "Step 2: Agent runs a COM-B diagnostic to find your real blocker.",
   "Step 3: Get a micro-action plan with weekly check-ins and personalized nudges."
  ],
  "example": "Help me design a clear plan for the year ahead and guide me in turning those plans into actionable, achievable goals"
 },
 "A028": {
  "tagline": "✨ Your AI storytelling & delivery coach",
  "description": "Storytelling Mentor helps users craft compelling narratives, structure impactful speeches, and improve delivery for pitches, presentations, and leadership talks. It acts as a virtual coach, offering storytelling frameworks, personalized feedback, and best practices for persuasive communication.",
  "painPoints": [
   "Rich content, blank stares from audience",
   "Wing the story arc &mdash; hit or miss",
   "Stage nerves &mdash; tone, pace, body all gone"
  ],
  "quickStart": [
   "Step 1: Share your topic, audience, and core message.",
   "Step 2: Mentor picks the best story framework and rewrites your content into a narrative arc.",
   "Step 3: Get delivery coaching — pacing notes, tone tips, and a rehearsal script."
  ],
  "example": "Help me adapt my story for the target audience and clarify the \ncontext."
 },
 "A029": {
  "tagline": "✨ Your AI social-media co-pilot",
  "description": "Create, optimize, and manage engaging social media content across multiple platforms.",
  "painPoints": [
   "Daily caption brain- drain &mdash; every post hurts",
   "One post on 5 apps, engagement flat",
   "Hashtags & timing by guesswork only"
  ],
  "quickStart": [
   "Step 1: Set your brand voice, target platforms, and weekly themes.",
   "Step 2: Agent generates tailored posts for each platform with hashtag and timing suggestions.",
   "Step 3: Approve the content calendar — schedule with one click and track engagement."
  ],
  "example": "Write an engaging Instagram post about [topic] for [target audience].\nGive me 10 creative content ideas for LinkedIn to promote [campaign/event].\nOptimize this LinkedIn post for better reach: [paste text]."
 },
 "A030": {
  "tagline": "✨ Your AI peer-feedback wordsmith",
  "description": "Peer Feedback Agent is a Copilot Agent that helps you craft professional, thoughtful peer‑to‑peer feedback or praise for your colleagues. Use it to draft congratulatory messages or to express constructive feedback with empathy and in alignment with your organization’s standards.",
  "painPoints": [
   "Want to praise &mdash; &ldquo;great job&rdquo; feels lazy",
   "Tough feedback &mdash; afraid to hurt them",
   "Message sits in drafts for days"
  ],
  "quickStart": [
   "Step 1: Tell the Agent who you're writing to and what you want to say.",
   "Step 2: It crafts a warm, specific message — recognition or constructive feedback.",
   "Step 3: Tweak the tone (more formal, more casual, shorter) — copy and send with confidence."
  ],
  "example": "Can you help me write constructive feedback for [specific area / person]"
 },
 "A031": {
  "tagline": "✨ Lean, on-time, on-message",
  "description": "This agent helps optimize presentations for upcoming meetings by reviewing content, identifying redundancies and proposing a streamlined version that saves time while preserving key messages. Key Features: - Confirms meeting details (duration, audience, reserved time) - Analyses slides for duplicate or redundant content - Suggests consolidation and timing adjustments - Ensures tone and content match the specified audience - Provides a structured report with an executive summary, redundancy analysis, optimization proposal and time-saving estimate. Outcome: A concise, audience-appropriate presentation that fits within the allocated time while maintaining compliance and brand guidelines.",
  "painPoints": [
   "Too many slides, you always run over time",
   "Lots of redundant slides but no idea what to cut",
   "Content depth doesn't match the audience in the room"
  ],
  "quickStart": [
   "Step 1: Upload your deck and tell the agent the meeting length, audience, and Q&A buffer.",
   "Step 2: Review the redundancy analysis and optimization proposal it returns.",
   "Step 3: Apply the suggested edits and ship a tighter, audience-fit deck."
  ],
  "example": "Customer meeting - Review my presentation - 60 minutes, reserve 10 minutes for Q&A, executive-level customers.\nInternal meeting - Review my presentation - 60 minutes, reserve 15 minutes for Q&A, internal colleagues."
 },
 "A032": {
  "tagline": "✨ Strategy clarity, on demand",
  "description": "AI assistant for the structured and in-depth analysis of an industry’s competitive intensity and attractiveness based on Porter’s Five Forces model. It supports the systematic evaluation of all five competitive forces, identifies key drivers of the competitive environment, and provides a strategic assessment of an industry’s long-term profitability.",
  "painPoints": [
   "Industry feels too complex to size up confidently",
   "Frameworks are textbook-heavy and slow to apply",
   "Hard to back strategy claims with structured evidence"
  ],
  "quickStart": [
   "Step 1: Tell the agent which industry you want to analyze and the scope (region, segment).",
   "Step 2: Answer its scoping questions about buyers, suppliers, and substitutes.",
   "Step 3: Receive a full five-forces report with attractiveness verdict and strategic implications."
  ],
  "example": "Create an in-depth analysis of [Industry]"
 },
 "A033": {
  "tagline": "✨ Boundaries that don't burn bridges",
  "description": "This agent helps you formulate clear and respectful \"no\" responses in professional situations. Using the PLANT framework (Pause, Listen, Assess, Name, Translate), it guides you through expressing concerns, assessing risks, and offering constructive alternatives — all in a professional and empathetic tone.",
  "painPoints": [
   "Afraid to refuse your manager even when overloaded",
   "Saying no feels rude or career-limiting",
   "Plate is full but you keep agreeing to more"
  ],
  "quickStart": [
   "Step 1: Describe the request you want to decline and the context around it.",
   "Step 2: Let the agent guide you through the PLANT steps to shape your response.",
   "Step 3: Copy the polished decline message and an alternative proposal you can send."
  ],
  "example": "# Starter Prompts\n## PLANT Framework Overview \nCan you briefly explain what the PLANT framework is and how it works?\n## Decline a Task \nI’m a project manager and have been asked to take on a task outside my responsibilities. How can I politely say no?\n## Review My Response \nI’ve drafted a decline message but I’m unsure if it sounds too direct. Can you review and improve it?\n## Offer an Alternative \nI want to say no but still offer an alternative. Can you help me phrase that well?\n## Decline due to lack of expertise \nI’ve been asked to contribute to a strategic planning session, but I don’t feel qualified. How can I say no respectfully?\n## Decline a Travel Request\nI’ve been asked to travel next week, but I’m already committed elsewhere. How can I decline without seeming uncooperative?"
 },
 "A034": {
  "tagline": "✨ From goal to game plan",
  "description": "OKR Coach Agent is an experienced strategy and OKR advisor that helps teams translate strategic goals into clear, outcome-focused Objectives, measurable Key Results, and an initial set of supporting initiatives. The agent supports planning and alignment by ensuring clarity, measurability, ambition, and coherence across the entire OKR set.",
  "painPoints": [
   "Strategy goals stay vague and don't translate into action",
   "Key Results aren't actually measurable or ambitious",
   "Team can't agree on what really matters this quarter"
  ],
  "quickStart": [
   "Step 1: Share your overarching strategic goal and any relevant team or business context.",
   "Step 2: Review the proposed Objective, Key Results, and supporting initiatives.",
   "Step 3: Iterate with the coach to tighten ambition, clarity, and measurability before publishing."
  ],
  "example": "Help me write my OKR for this strategic goal [goal]\nWe have a clear objective, we are having trouble defining Key Results: [objective]"
 },
 "A035": {
  "tagline": "✨ More tests, faster wins",
  "description": "AI assistant designed to support marketing and product teams by generating well‑structured, creative A/B testing ideas and clearly formulated hypotheses that help identify and validate effective digital optimization measures across websites, apps, emails, and advertisements.",
  "painPoints": [
   "Test backlog is dry and ideas feel recycled",
   "Hypotheses too vague to learn anything from",
   "Most tests don't move the metric you care about"
  ],
  "quickStart": [
   "Step 1: Tell the agent the asset (page, app, email, ad) and the metric you want to lift.",
   "Step 2: Review the generated test ideas and hypotheses.",
   "Step 3: Pick your top candidates and send them straight into your experimentation tool."
  ],
  "example": "Generate A/B testing ideas for the checkout page of our website with the goal of increasing the conversion rate.\nCreate A/B test hypotheses for an email campaign to improve the open and click-through rate.\nSuggest test ideas for a landing page, focusing on reducing bounce rate.\nDevelop A/B testing concepts for a mobile app screen to increase user engagement.\nPropose testable variations for an ad creative with the goal of improving click-through rate."
 },
 "A036": {
  "tagline": "✨ No license, no fuss",
  "description": "Meeting Recap Companion transforms your meeting inputs - such as transcripts, recordings, or meeting details - into clear, structured minutes. It focuses only on the information you provide, organizing it into key topics, decisions, action items, owners, and due dates. This agent helps you quickly turn raw meeting content into sharable summaries so your team can align, follow up, and move work forward. The key thing about this agent is that it does not require a license to be created or used.",
  "painPoints": [
   "Writing minutes eats an hour after every meeting",
   "Action items disappear into the void",
   "Nobody remembers who actually owns what"
  ],
  "quickStart": [
   "Step 1: Paste the transcript, recording summary, or notes from your meeting.",
   "Step 2: Let the agent extract key points, decisions, action items, and owners.",
   "Step 3: Share the structured recap with your team and follow up with confidence."
  ],
  "example": "Meeting Minutes: Here is the transcript. Create full meeting minutes\nTimeline and Action: Summarize only the part about timelines and list all action items \nDecisions and Owners: Turn these notes into a clean meeting recap with decisions and owners"
 },
 "A037": {
  "tagline": "✨ Draft to doc in minutes",
  "description": "Policy Author Pro helps you turn notes outlines or half‑finished drafts into clear and professionally structured corporate policies. Whether you are working on IT HR security operations or AI usage guidelines this agent builds a complete policy with consistent formatting and detailed content in every section. You can define your own structure or rely on the default one and Policy Author Pro will deliver a ready‑to‑use document that keeps quality and clarity high across your organization.",
  "painPoints": [
   "Policies take weeks to draft from scratch",
   "Sections and tone are inconsistent across docs",
   "Staring at a blank page with no clear structure"
  ],
  "quickStart": [
   "Step 1: Share your notes, outline, or draft and pick a domain (IT, HR, security, AI…).",
   "Step 2: Choose the default structure or supply your own section list.",
   "Step 3: Receive a complete, well-formatted policy ready for review and publication."
  ],
  "example": "Create a complete Remote Work Policy using the default structure. I will provide key points; expand them into a full professional document.\nHere is my custom structure for an AI Usage Policy. Use only these sections: Purpose, Responsibilities, Acceptable Use, Risk Mitigation, Violations.\nTurn these rough notes into a structured corporate policy. If I haven’t defined a structure, use your default one."
 },
 "A038": {
  "tagline": "✨ MBR commentary on tap",
  "description": "A Copilot Chat agent that analyzes monthly KPIs provided directly by the user and produces a structured, leadership‑ready executive summary. The agent compares this month’s KPIs with last month’s values, highlights improvements and declines, interprets changes strictly based on user‑supplied notes, and generates clear commentary suitable for email updates or monthly business reviews. It enables consistent, repeatable KPI reporting without accessing any external systems.",
  "painPoints": [
   "KPI write-ups eat an entire morning",
   "Same recurring report, rebuilt from scratch every time",
   "Hard to explain the numbers without sounding defensive"
  ],
  "quickStart": [
   "Step 1: Paste this month's and last month's KPI values into the chat.",
   "Step 2: Add brief context notes explaining any major movements.",
   "Step 3: Receive a structured executive summary you can paste into email or your MBR deck."
  ],
  "example": "- Compare these KPIs with last month and create an executive summary\n- Please generate an email-ready KPI summary based on this month vs. last month"
 },
 "A039": {
  "tagline": "✨ Adoption that actually sticks",
  "description": "The Change Agent helps you and your organization, leaders, and teams navigate transformation with clarity and confidence. It defines the why, what, who, how, and when of change, reduces uncertainty, and supports practical adoption. Using a flexible mix of open, widely known frameworks, the agent identifies impacts, engages stakeholders, and provides ready‑to‑use plans, communication assets, and adoption tools. It focuses on measurable progress, continuous learning, and long‑term sustainment of new ways of working. When using the agent, upload any documents you might need.",
  "painPoints": [
   "Teams resist every new process or tool",
   "Change comms fall flat and nobody reads them",
   "No clear plan to drive adoption past go-live"
  ],
  "quickStart": [
   "Step 1: Describe the change you're leading and upload any relevant context documents.",
   "Step 2: Co-design the impact, stakeholder, and adoption plan with the agent.",
   "Step 3: Use the generated comms, training, and tracking assets to drive sustained adoption."
  ],
  "example": "Full guide: Our organization needs help with implementing a new software that demands technical integration.\nNext steps: Assess the project described here [document] and propose the next steps regarding Change Management.\nTimeline: create a possible time plan for my personal learning to become an agile coach"
 },
 "A040": {
  "tagline": "✨ Purposeful meetings, every time",
  "description": "Meeting Prep is a support agent designed to help users prepare for all types of meetings, internal, customer-facing, or recurring. It guides users through additional context and essential preparation tasks such as agenda creation, stakeholder alignment, and strategic planning. Helping streamlined out-of-pocket reusable prepping templates and prompting users with relevant questions based on the meeting type. Its goal is to make every meeting preparation easy, efficient and help make meetings purposeful, well-structured, and outcome driven.",
  "painPoints": [
   "Meetings kick off with no agenda or outcome",
   "Stakeholders aren't aligned before they walk in",
   "Prep happens in the five minutes before the call"
  ],
  "quickStart": [
   "Step 1: Tell the agent the meeting type, audience, and the outcome you want.",
   "Step 2: Answer its targeted prompts about context, attendees, and pre-reads.",
   "Step 3: Receive a full agenda, talking points, and a reusable prep template."
  ],
  "example": "Help me prepare for my upcoming meetings.\nMake a table of my meetings this week and help me prepare for them."
 },
 "A041": {
  "tagline": "✨ What does this mean for me?",
  "description": "The Policy Simplifier Agent helps employees quickly understand long and complex policy or compliance documents by turning formal, legal, or highly technical text into clear, actionable plain‑English guidance. It supports HR teams onboarding new hires, IT teams working with security standards, managers explaining policy updates, and any employee who receives dense policy PDFs and needs a concise explanation of “what this means for me.” Instead of reading through 20‑page policies, users can get a simple, practical, and trustworthy summary they can apply immediately.",
  "painPoints": [
   "20-page policy PDFs no one has time to read",
   "Legalese makes your eyes glaze over",
   "Unclear what actually applies to your role"
  ],
  "quickStart": [
   "Step 1: Upload the policy document or paste the text you need to simplify.",
   "Step 2: Tell the agent your role or the audience that needs to understand it.",
   "Step 3: Get a clear, role-specific summary with concrete actions you can take."
  ],
  "example": "Summarizing a policy: Please simplify the uploaded IT security policy for [role]. Break it into purpose, scope, required actions, and restrictions.\nCreating a checklist: Turn the following HR policy into a checklist that employees in [business unit] can follow. Keep the language simple and highlight any unclear parts.\nComparing multiple documents: I will upload two procedures. Summarize each, then create a unified version showing where they overlap or contradict."
 },
 "A042": {
  "tagline": "✨ Pretty plain-text invites",
  "description": "Use Invite Designer in Microsoft 365 Copilot to draft beautifully formatted Outlook meeting invitations. It asks targeted questions about the event, audience, and tone, then produces a polished, paste-ready invitation body with a clear title, event details, and a suggested subject line, designed to look great in the native Outlook compose window.",
  "painPoints": [
   "Invites look bland and get ignored",
   "You forget half the details people need",
   "No time to format anything nicely"
  ],
  "quickStart": [
   "Step 1: Tell the agent the event type, audience, and tone you want.",
   "Step 2: Provide the date, time, location, and any agenda details.",
   "Step 3: Copy the polished subject line and invitation body straight into Outlook."
  ],
  "example": "Draft an invitation for a team offsite on June 12 in Seattle.\nWrite a fun invitation for a farewell lunch for a colleague this Friday."
 },
 "A043": {
  "tagline": "✨ Bring the friction first",
  "description": "Stress-tests your ideas, plans and decisions before you take them to a real audience. Surfaces hidden assumptions, runs a pre-mortem and predicts the toughest questions a skeptical executive will ask. Never validates by default. Helpful exactly when you do not want a yes-man.",
  "painPoints": [
   "Blindsided by tough questions in the room",
   "Your team only ever tells you 'looks great'",
   "Hidden assumptions quietly sink the plan"
  ],
  "quickStart": [
   "Step 1: Share the idea, plan, or decision you want pressure-tested.",
   "Step 2: Let the agent surface assumptions, run a pre-mortem, and predict objections.",
   "Step 3: Address the gaps before you walk into the real meeting."
  ],
  "example": "Stress-test this idea: we want to launch a new internal newsletter to boost employee engagement, sent every Friday morning to all employees with curated content from leadership."
 },
 "A044": {
  "tagline": "✨ Engagement, made easy",
  "description": "The Team Engagement & Morale Assistant is a declarative agent designed to help managers, individual contributors, HR professionals or any team member build a positive and inclusive team culture. It provides creative, scalable recommendations for team‑building activities, recognition programs, and morale‑boosting events tailored to team size, work modality (remote, hybrid, in‑office), and stated preferences. The agent also supports event planning, engagement tracking, and compliance, enabling data‑driven decisions and consistent, high‑impact engagement initiatives across the organization.",
  "painPoints": [
   "Team energy is low and meetings feel flat",
   "Hard to engage hybrid and remote teammates",
   "Same recycled activities every single quarter"
  ],
  "quickStart": [
   "Step 1: Tell the agent your team size, work modality (remote/hybrid/in-office), and goals.",
   "Step 2: Review tailored ideas for team-building, recognition, and morale events.",
   "Step 3: Pick your favorites and use the planning support to roll them out."
  ],
  "example": "Help me find creative activities for my remote team of [10].\nCreate a recurring morale event plan for my hybrid team.\nSuggest ways to appreciate someone in our in-office team.\nSuggest morale activities within a limited budget."
 },
 "A045": {
  "tagline": "✨ Compare. Comment. Send. 🚀",
  "description": "A Copilot Chat agentthat analyzes monthly KPIs provided by the user and produces a structured, leadership-ready executive summary. The agent compares this month's KPIs with last month's, highlights improvements and declines, interprets changes based strictly on user-supplied notes, and generates clear commentary suitable for email updates or monthly business reviews. This agent enables consistent, repeatable KPI reporting without accessing any external systems.",
  "painPoints": [
   "Numbers in, no narrative out You see the changes but can't write the summary fast",
   "AI invents reasons Generic tools hallucinate causes your VP will instantly catch",
   "Reformatting for email Same KPIs, three formats— deck, doc, and inbox-ready"
  ],
  "quickStart": [
   "Step 1: Paste your KPI list with this month's value, last month's value, and any notes.",
   "Step 2: Review the executive summary, improvements, declines, and recommended focus.",
   "Step 3: Ask for the email version—subject line plus 3–6 bullets, ready to forward."
  ],
  "example": "Below are the provided KPIs from last and current month + optional context:\n[KPIs + CONTEXT]\nPlease produce a leadership-ready executive summary plus an email-ready version (subject line + 5 bullets)."
 },
 "A046": {
  "tagline": "✨ Idea in. Business case out. 🚀",
  "description": "A Copilot Chat agentthat helps users turn project ideas into structured, management-ready business cases. Based on the project description, expected benefits, and estimated costs the user provides, the agent generates a complete business case—problem statement, proposed solution, strategic alignment, cost-benefit analysis, timeline, risk analysis, alternatives, optional financial metrics, and a clear recommendation—capped with a compelling executive summary. When data is missing, it flags the gap instead of inventing figures.",
  "painPoints": [
   "Blank doc paralysis Structuring sections and tone eats half your day",
   "AI fills the gaps Generic tools invent numbers and reasons that sound right",
   "Execs read the summary only The hardest section to write is always left to the end"
  ],
  "quickStart": [
   "Step 1: Drop three things in: project description, expected benefits, estimated costs.",
   "Step 2: Review the drafted sections and fill in any data the agent flags as missing.",
   "Step 3: Ask the agent to rewrite the executive summary, then paste into your decision doc."
  ],
  "example": "Help me build a business casefor hiring two additional support engineers. Our current team is overwhelmed—response times have doubled in the last quarter and customer satisfaction has dropped by 15%."
 },
 "A047": {
  "tagline": "✨ Goal in. Step-by-step workflow out. 🚀",
  "description": "A Copilot Chat agent that helps users systematically plan or optimize any business process. The agent opens with 9 structured intake questions (new vs. existing, goal, KPIs, scope, stakeholders, resources, constraints, etc.), confirms scope, then delivers a full workflow blueprint: overview, SIPOC step table (steps, inputs, outputs, responsibility, dependencies, duration), resource matrix, risk & action table, milestones & KPIs, and—if optimizing—3–5 improvement areas with before/after view. Runs interactively, asks for missing data, and escalates to human review when needed.",
  "painPoints": [
   "Process was never documented Who owns what, what comes first— passed down by word of mouth",
   "Bottlenecks are gut feel No baseline, no KPI, nobody can name what's actually stuck",
   "Risks & contingencies forgotten You fight fires after the fact, no prevention plan in sight"
  ],
  "quickStart": [
   "Step 1: Kick off the agent and answer its 9 intake questions (mode, goal, KPIs, scope, stakeholders, resources, constraints).",
   "Step 2: Review the bulleted understanding the agent echoes back, confirm scope, then ask for the full 5-table plan.",
   "Step 3: Export the tables to Word or Excel, then wire them into Power Automate / ServiceNow to start executing."
  ],
  "example": "I want to optimize a workflow. Please start by asking me the intake questions so we get the context right before you build anything.\nOur internal IT onboarding for new joiners takes too long. Today it takes about 7 working days from contract signed to a fully equipped workplace with accounts, laptop and access rights. I want to bring it down to 2 working days. Stakeholders are HR, IT, Facility and the hiring manager. We use Microsoft 365, Entra ID, ServiceNow and SAP SuccessFactors."
 },
 "A048": {
  "tagline": "✨ Topic in. Agenda, exercises & facilitation script out. 🚀",
  "description": "A Copilot Chat agent that turns a workshop idea into a ready-to-run concept. The agent opens with 7 structured intake questions (topic, core goal, audience & size, duration, online/onsite/hybrid, constraints, output language), confirms scope, then delivers: 2–3 SMART learning goals plus key takeaways, a timed agenda as a table (with methods and materials), at least one interactive exercise per content block (goal, materials, step-by-step instructions, variations by group size), and a facilitation guide (opening / transition / exercise-setup / closing sample phrases) with a preparation checklist. Runs interactively and proposes scope adjustments when goals and time don't match.",
  "painPoints": [
   "Told to run a workshop you open a blank deck two hours in, still nothing",
   "Agenda timing is guesswork too packed or dead air no breaks, no buffer",
   "No idea how to design exercises or what to say to open so you wing it on stage"
  ],
  "quickStart": [
   "Step 1: Kick off the agent and answer its 7 intake questions (topic, goal, audience size, duration, setting, constraints, language).",
   "Step 2: Review the bulleted understanding the agent echoes back, confirm the SMART goals and scope, then ask for the full concept.",
   "Step 3: Export the agenda to Word or build the exercises into PowerPoint, then drop them into Teams or Whiteboard and run it."
  ],
  "example": "I need to design a workshop. Please start by asking me the intake questions so we get the context right before you build anything.\nQuick hint of what I have in mind: I want to run a workshop for our marketing team to help them use Microsoft 365 Copilot in their daily work, focused on content creation and meeting preparation. We have about half a day and the team is mixed in terms of AI experience."
 },
 "A049": {
  "tagline": "✨ Drop your thesis, get 2–4 structured counter-arguments back 🥊",
  "description": "A Copilot Chat agent that is your AI sparring partner for critical thinking and debate prep. Give it any statement, thesis, or line of reasoning, and it surfaces hidden assumptions, logical gaps, and alternative perspectives, returning 2–4 structured counter-arguments—each with a clear objection, a logical justification with examples, and an explanation of why it challenges the original position. Required input is the thesis or position; optional inputs are context (debate, presentation, negotiation, opinion-forming) and depth (basic or in-depth). If the thesis is too vague it asks you to clarify the core claim first, and it breaks multi-part claims down to analyze each separately. The tone is factual, critical but respectful; for ethically or politically sensitive theses, or ones built on false premises, it flags the issue and recommends a check first. Built for leaders, consultants, and professionals who want to stress-test their thinking before a debate, negotiation, or presentation.",
  "painPoints": [
   "You think it's airtight one question in the room and you freeze",
   "You can't see your blind spots hidden assumptions, logic gaps someone else spots them first",
   "You want a sparring partner colleagues won't push hard or just say \"looks fine\""
  ],
  "quickStart": [
   "Step 1: Paste your thesis or position to the agent, optionally with the context (debate / presentation / negotiation) and the depth you want (basic or in-depth).",
   "Step 2: Read the 2–4 counter-arguments it returns, walk through each objection, justification, and impact, and find the one you're least ready for.",
   "Step 3: For the toughest objection, follow up with \"help me draft a response\" and reinforce your argument until it's airtight."
  ],
  "example": "Please challenge the following thesis with 2 to 4 counter-arguments.\nThesis: \"Remote work should be made mandatory for all knowledge-worker roles because it increases productivity and reduces costs.\"\nContext: I need to prepare for an internal leadership debate next week.\nDepth: In-depth analysis."
 },
 "A050": {
  "tagline": "✨ Messy inputs in. Key topics, risks, decisions & next steps out. 📋",
  "description": "A Copilot Chat agent that turns large volumes of scattered information into concise, actionable, executive-ready briefings. Acting as a seasoned Chief of Staff, executive communications advisor, and strategic analyst, it reads the user's diverse sources (emails, meeting notes, reports, decks, project docs, risk registers, status updates, strategy documents) and extracts the most important facts, decisions, risks, and opportunities, removing duplicates, identifying open questions and discussion points, and recommending next steps where appropriate. Output follows a fixed structure: executive summary, context, key topics (topic / why it matters / status), risks & challenges (risk / impact / mitigation), open questions, decisions required, and recommended next steps (action / owner / priority). Missing sections are flagged with the reason, facts are separated from assumptions and findings from recommendations, conflicts are surfaced, and nothing is ever invented.",
  "painPoints": [
   "Exec meeting in 30 min a pile of inputs on your desk no time to digest it",
   "Terrified you'll miss a risk or an open decision and get caught out",
   "Five emails, two sets of notes duplicated and scattered synthesizing it eats your eyes"
  ],
  "quickStart": [
   "Step 1: Paste or upload the inputs for your meeting (emails, notes, reports, decks)—the more diverse, the better.",
   "Step 2: Ask it to \"build an exec briefing for this meeting\"—it returns summary, key topics, risks, open questions, decisions, and next steps.",
   "Step 3: Refine with follow-ups—\"add owner and priority to each decision,\" \"sort risks by impact\"—then drop it into Word or Teams and walk into the meeting."
  ],
  "example": "Create an executive briefing for my upcoming meeting. Summarize key topics, risks, open questions, discussion points, and recommended next steps.\n(Then paste or upload the relevant emails, meeting notes, reports, or decks)"
 },
 "A051": {
  "tagline": "✨ Structured intake → SMART goals → aligned agenda → exercises people actually engage with 🧑‍🏫",
  "description": "A Copilot Chat interactive workshop design assistant that uses a step-by-step coaching approach to guide facilitators through four phases: intake (topic, participants, headcount, prior knowledge, duration, format), goal definition (2–3 SMART learning objectives), agenda planning (each section mapped to an objective, with realistic timing, breaks, and Q&A, presented as a Markdown table), and exercise design (an interactive exercise per topic with title, related objective, purpose, materials, step-by-step facilitation instructions, and estimated duration, plus adaptations for group size, time, and experience). Each phase has a confirmation gate before moving on, and it proactively raises adjustments when a workshop runs long, exceeds 25 participants, or objectives don't fit the time. The final output is a complete, ready-to-deliver workshop plan. No M365 Copilot license required.",
  "painPoints": [
   "Agenda cobbled together unclear what people should walk away with",
   "Too much content, too little time and nothing to cut",
   "A random exercise and everyone just stares at the floor"
  ],
  "quickStart": [
   "Step 1: Tell it the topic, audience and headcount, duration, and format (in-person / online / hybrid)—it starts with a structured intake.",
   "Step 2: Follow its lead to confirm SMART objectives and the agenda—it maps each block to an objective in a table for you to approve step by step.",
   "Step 3: Have it design an interactive exercise for each block (with facilitation guidance and materials), then get the full plan—drop it into Word or Loop and go."
  ],
  "example": "I need help designing a workshop.\nPlease help me define SMART learning objectives, create an agenda, and design practical exercises that help participants identify HR use cases and create an AI adoption action plan."
 },
 "A052": {
  "tagline": "✨ Weighs complexity, speed, sources, deliverable—clear verdict + a ready-to-use prompt 🧭",
  "description": "A Copilot Chat interactive routing coach that decides whether a task belongs in Copilot Chat or Copilot Cowork. Grounded in the official \"when to use each\" comparison, it runs a structured intake (task in a sentence or two; single vs. many inputs/sources; a fast answer vs. a finished multi-part deliverable; one-off vs. repeating/scheduled), scores the task across six dimensions (what it is, best for, speed, complexity, use when, scenarios), and returns exactly one verdict: ✅ Copilot Chat—one prompt, ✅ Copilot Chat—a few prompts (one session), or 🚀 Copilot Cowork (end-to-end across apps). Output includes the verdict, why (2–4 bullets), how to run it (a ready-to-paste prompt / prompt sequence / agentic ask), and, when borderline, the one factor that flips it. It only routes and hands back a prompt—it doesn't perform the task unless you ask after the verdict. No M365 Copilot license required.",
  "painPoints": [
   "Chat or Cowork for this one? guessing every time",
   "Cramming a complex cross-app job into one chat and it comes out patchy",
   "Firing up Cowork for a one-line ask and waiting ages"
  ],
  "quickStart": [
   "Step 1: Describe the task you want AI to handle in a sentence or two—it will ask about sources, deliverable, and whether it repeats as needed.",
   "Step 2: Read the verdict and why: Copilot Chat (one or a few prompts) or Copilot Cowork.",
   "Step 3: Take the ready prompt (or Cowork ask) it hands back and run it; if it's borderline, use the flipping factor it names to make the call."
  ],
  "example": "I need to turn last quarter's five project emails and two spreadsheets into a board-ready summary deck—Copilot Chat or Cowork?"
 },
 "A053": {
  "tagline": "✨ Structured discovery → gaps/ambiguities/contradictions → MoSCoW → User Stories/list/BRD 🕵️",
  "description": "A Copilot Chat interactive requirements assistant that, acting as a seasoned Business Analyst and Requirements Engineer, conducts a structured discovery to uncover functional and non-functional requirements, identifies gaps, ambiguities, and contradictions, and produces a clear, prioritized requirements document in one of three formats: User Stories, a structured requirements list, or a full Business Requirements Document (BRD). Intake first (topic, scope, audience, output format), one question at a time; Phase 1 explores dimension by dimension (stakeholders, problem, goals, functional/non-functional requirements, constraints and assumptions) with a confirmation gate; Phase 2 analyzes gaps/ambiguities/contradictions/unstated needs and prioritizes with MoSCoW; Phase 3 outputs in the chosen format. Includes a QA checklist (every requirement testable, vague language removed, every Must Have traceable). It only uncovers requirements—it doesn't design solutions or write code. No M365 Copilot license required.",
  "painPoints": [
   "Want to build something but the requirements are a blur no idea where to start",
   "Mid-build you find gaps and contradictions with the money already spent",
   "\"Make it fast and easy\" everyone says that nobody defines the bar"
  ],
  "quickStart": [
   "Step 1: Tell it the topic, scope (new / improvement / fix), who the document is for, and the output format you want.",
   "Step 2: Work through it one question at a time—it summarizes and asks you to confirm before moving to analysis.",
   "Step 3: Review the gaps/ambiguities/contradictions it lists and its MoSCoW ranking, confirm each, then get your requirements document in the chosen format."
  ],
  "example": "I need to define the requirements for a new internal approval workflow for purchase orders. We want to digitize it, but I'm not sure where to start."
 },
 "A054": {
  "tagline": "✨ First-week checklist → HR resources → role-based tool picks → 30/60/90-day goal setting",
  "description": "An onboarding companion that runs in Copilot Chat: it hands new hires a day-one/week-one checklist and HR resource links, recommends role-based software and working methods, and nudges a 30/60/90-day goals meeting once the checklist is done — all in a friendly, professional tone that encourages questions. Requires an M365 Copilot license.",
  "painPoints": [
   "Day one on the job and zero idea what to do",
   "The intranet's a maze and the SOP I need is nowhere to be found",
   "Scared to ask 'too many' questions so I just wing it"
  ],
  "quickStart": [
   "Step 1: Build the Onboarding Agent and attach your company's onboarding docs and HR policies, then check the day-one/week-one checklist it gives you.",
   "Step 2: Tell it your role or position so it can recommend the software and working methods to pick up.",
   "Step 3: Once your checklist is done, follow its nudge to book a 30/60/90-day goals meeting with your manager."
  ],
  "example": "I'm starting Monday — what should I do to prepare for day one?"
 },
 "A055": {
  "tagline": "✨ Clarify first → applies company knowledge & tone → brainstorm, communicate, plan",
  "description": "A context-aware assistant in Copilot Chat that channels a Chief of Staff's efficiency, strategic thinking, and execution to turn ideas, questions, and tasks into clear decisions, actionable plans, and professional communication. It draws on company knowledge, processes, target-audience insight, and tone-of-voice guidelines, following a Clarify → Analyze → Execute → Review → Deliver workflow so every output is relevant, ready-to-use, and on-standard. Requires an M365 Copilot license or pay-as-you-go.",
  "painPoints": [
   "Head full of ideas but no time to turn them into anything real",
   "AI answers all sound generic and miss the company voice",
   "Every draft you get still needs a full rewrite to be usable"
  ],
  "quickStart": [
   "Step 1: Build the Personal Chief of Staff and upload your company info, playbook, and tone-of-voice guide as knowledge sources.",
   "Step 2: Hand it your task (brainstorm, draft, plan) and answer the clarifying questions it asks back.",
   "Step 3: Get an on-brand, ready-to-use output — ask for adjustments directly if needed."
  ],
  "example": "Draft a follow-up email after a Copilot strategy workshop. Summarize outcomes, next steps, and customer value."
 },
 "A056": {
  "tagline": "✨ Dedupe → grade sentiment → cluster themes → rank the top three actions 📣",
  "description": "The Customer Feedback Synthesizer transforms unstructured feedback from surveys, support tickets, reviews, social media, and direct interactions into clear insights and prioritized actions. It removes duplicates and irrelevant content, groups feedback into meaningful themes, evaluates sentiment and frequency, and highlights the most important improvement opportunities. Requires an M365 Copilot license or pay-as-you-go.",
  "painPoints": [
   "Surveys, tickets, reviews, and social posts are scattered and tedious to reconcile",
   "After reading the pile, you still cannot quantify sentiment or recurring themes",
   "The report sounds accurate but gives leadership no clear next action"
  ],
  "quickStart": [
   "Step 1: Provide at least ten feedback items plus product or service context, source, and time period.",
   "Step 2: Have it deduplicate and clean the input, grade sentiment, and cluster recurring themes with counts.",
   "Step 3: Review the top three priorities with a specific action, expected outcome, owner, and timeline for each."
  ],
  "example": "Analyze the following customer feedback from our product reviews collected during the last 30 days. Identify the main themes, summarize sentiment, prioritize the most important issues, and provide three actionable recommendations for the product team."
 },
 "A057": {
  "tagline": "✨ Executive summary → three insights → risks and opportunities → one recommended focus 📄",
  "description": "The Strategic One-Pager transforms conversations, documents, meeting notes, research, presentations, and knowledge sources into a concise, executive-ready one-page briefing. It identifies the most important insights, business implications, opportunities, risks, and recommended next steps, then packages them into a professional PDF designed for rapid decisions. Best practice: add it to an ongoing conversation and tag @Strategic One-Pager.",
  "painPoints": [
   "Conversations, attachments, and conclusions are scattered across too many places",
   "Leadership has five minutes but the material is not organized for a decision",
   "Facts, inferences, assumptions, risks, and next steps blur together"
  ],
  "quickStart": [
   "Step 1: Add the agent to an existing conversation or provide the relevant files, notes, and research.",
   "Step 2: Tag @Strategic One-Pager so it can identify the topic, audience, and decision-relevant content.",
   "Step 3: Review the one-page A4 PDF, including its three insights, risks and opportunities, and recommended focus."
  ],
  "example": "Generate a Strategic One-Pager from the current conversation and available context. Analyze the provided content and create the final Strategic One-Pager as a PDF."
 },
 "A058": {
  "tagline": "✨ Describe the task → weigh goal and complexity → name the best-fit surface → get a copy-ready prompt 🧭",
  "description": "Copilot Compass helps Microsoft 365 Copilot users choose the best Copilot tool for a task. Based on the work involved and desired outcome, it matches requests with Copilot Chat, Copilot in Microsoft 365 apps, Researcher, Analyst, specialized agents, or Cowork, then explains why, how to begin, and what prompt to use. No M365 Copilot license required.",
  "painPoints": [
   "Too many Copilot entry points make choosing a tool a task of its own",
   "Simple jobs get over-engineered while complex work gets forced into one chat",
   "You know the product names but not where or how to start"
  ],
  "quickStart": [
   "Step 1: Describe your goal, required output, source material, and the apps involved.",
   "Step 2: Let it weigh complexity, direct-action needs, and access constraints, then recommend one primary option.",
   "Step 3: Use its concrete starting step and copy-ready prompt; consider the alternative only when the tradeoff matters."
  ],
  "example": "Research three competitors, analyze their positioning, and produce a cited briefing plus a comparison deck. Which Copilot tool should I use?"
 }
};
