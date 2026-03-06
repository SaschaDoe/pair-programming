// ── Types ──────────────────────────────────────────────────
export interface Benefit {
	stat: string;
	title: string;
	description: string;
}

export interface SafetyTip {
	title: string;
	description: string;
}

export interface ClassicObjection {
	objection: string;
	response: string;
}

export interface Pitfall {
	title: string;
	severity: string;
	severityLabel: string;
	description: string;
	fix: string;
}

export interface PairingStyle {
	title: string;
	tag: string;
	description: string;
}

export interface WhenColumn {
	title: string;
	variant: string;
	items: string[];
}

export interface SessionStep {
	title: string;
	description: string;
}

export interface BestPractice {
	title: string;
	description: string;
}

export interface SummaryCard {
	title: string;
	description: string;
}

export interface Source {
	title: string;
	url: string;
	meta: string;
}

export interface Barrier {
	title: string;
	description: string;
}

export interface AiAnswer {
	title: string;
	description: string;
}

export interface ModernObjection {
	quote: string;
}

export interface XpBullet {
	bold: string;
	text: string;
}

export interface ExpertiseLayer {
	id: string;
	title: string;
	subLabel: string;
	color: string;
	colorFaded: string;
	sideContext?: string;
	items: string[];
	summary?: string;
}

// ── Data ───────────────────────────────────────────────────
export const benefits: Benefit[] = [
	{ stat: '&darr;', title: 'Fewer Defects', description: 'Significantly fewer bugs than solo code.' },
	{ stat: '&uarr;', title: 'Knowledge Transfer', description: 'Juniors learn faster. Seniors teach to solidify.' },
	{ stat: '&lt;/&gt;', title: 'Better Design', description: 'Two perspectives, cleaner architecture.' },
	{ stat: '&raquo;', title: 'Faster Debugging', description: 'Two brains find solutions faster.' },
	{ stat: '=', title: 'Shared Ownership', description: 'No single point of failure.' },
	{ stat: '&check;', title: 'Real-time Review', description: 'Bugs caught now, not days later in PR.' },
];

export const safetyTips: SafetyTip[] = [
	{ title: 'Normalise not-knowing', description: "Say \"I don't know\" out loud — especially if you're senior. It gives everyone else permission to do the same." },
	{ title: 'Start with low-stakes pairing', description: "Don't begin with the most critical codebase. Pair on a small feature, a refactor, a test — something where mistakes are cheap." },
	{ title: 'Make the first 5 minutes about humans', description: "Check in before you code. \"How's your morning?\" costs nothing and changes everything about the next hour." },
	{ title: 'Agree on ground rules', description: "\"We'll switch every 20 minutes. We'll think out loud. We'll ask before grabbing the keyboard.\" Explicit beats implicit." },
	{ title: 'Celebrate mistakes publicly', description: '"Good thing we caught that now" is more powerful than any retrospective. Make catching errors a win, not a blame.' },
	{ title: 'Give people an exit', description: 'Pairing should never feel mandatory in the moment. "I need 30 minutes solo" is always a valid thing to say.' },
];

export const classicObjections: ClassicObjection[] = [
	{
		objection: "\"It's twice as expensive — two developers on one task.\"",
		response: 'Bugs cost <strong>10–100x</strong> more to fix in production than during development. 15% fewer defects pays for itself on critical code.',
	},
	{
		objection: '"I work better alone."',
		response: "For some tasks, yes. Pair programming isn't for everything. Use it <strong>selectively</strong> — for the code where the cost of getting it wrong is high.",
	},
	{
		objection: "\"We tried it and it didn't work.\"",
		response: "Pairing takes practice. The first sessions are awkward. Give it <strong>2–4 weeks</strong>. Some pairs don't click — that's okay, rotate.",
	},
	{
		objection: '"My team is fully remote."',
		response: "Remote pairing works fine with modern tools. Some teams report it's <strong>even more focused</strong> — fewer physical distractions.",
	},
];

export const pitfalls: Pitfall[] = [
	{
		title: 'Mental Fatigue',
		severity: 'high',
		severityLabel: 'common',
		description: 'Pairing is cognitively intense.',
		fix: 'Pomodoro — 25 min on, 5 min off. Max 4 hours/day.',
	},
	{
		title: 'Personality Clashes',
		severity: 'medium',
		severityLabel: 'varies',
		description: 'Different styles and egos create friction.',
		fix: 'Ground rules upfront. Focus on the code. Rotate pairs.',
	},
	{
		title: 'Disengaged Navigator',
		severity: 'high',
		severityLabel: 'common',
		description: 'Navigator zones out or passively watches.',
		fix: 'Switch roles often. Give the navigator active tasks.',
	},
	{
		title: 'Backseat Driving',
		severity: 'medium',
		severityLabel: 'varies',
		description: 'Navigator dictates every keystroke.',
		fix: 'Navigate at the level of intent, not syntax.',
	},
	{
		title: 'Scheduling',
		severity: 'low',
		severityLabel: 'manageable',
		description: 'Coordinating calendars is harder than sitting down alone.',
		fix: 'Block dedicated time. Same slot every day.',
	},
];

export const pairingStyles: PairingStyle[] = [
	{
		title: 'Driver–Navigator',
		tag: 'Classic',
		description: 'The standard approach. Clear roles, regular rotation. The driver codes, the navigator reviews and guides. Best for most development tasks.',
	},
	{
		title: 'Ping-Pong Pairing',
		tag: 'Test-Driven',
		description: 'Used with TDD. Developer A writes a failing test. Developer B makes it pass, then writes the next failing test. Back and forth, building up the solution.',
	},
	{
		title: 'Strong-Style Pairing',
		tag: 'Idea-Driven',
		description: '"For an idea to go from your head into the computer, it must go through someone else\'s hands." The navigator has the ideas; the driver just types. Great for mentoring.',
	},
];

export const whenColumns: WhenColumn[] = [
	{
		title: 'Always',
		variant: 'when-always',
		items: [
			'Security-critical code',
			'Payment &amp; financial logic',
			'Core business rules',
			'Shared libraries &amp; utilities',
			'Architecture decisions',
			'Onboarding new team members',
		],
	},
	{
		title: 'Consider',
		variant: 'when-consider',
		items: [
			'Unfamiliar technology',
			'Complex bug fixes',
			'Performance-critical code',
			'Tricky edge cases',
			"When you're stuck",
			'Legacy code changes',
		],
	},
	{
		title: 'Skip',
		variant: 'when-skip',
		items: [
			'Simple, routine changes',
			'Well-understood features',
			'Isolated components',
			'Exploratory / spike work',
			'When you need deep focus time',
		],
	},
];

export const sessionSteps: SessionStep[] = [
	{ title: 'Align', description: 'Agree on the goal. What are we building this session?' },
	{ title: 'Code', description: 'Driver codes, Navigator reviews. Think out loud.' },
	{ title: 'Switch', description: 'Rotate roles every 15–25 minutes. Use a timer.' },
	{ title: 'Break', description: 'Step away together every hour. Pairing is intense.' },
	{ title: 'Recap', description: "What did we accomplish? What's next? 2 minutes." },
];

export const bestPractices: BestPractice[] = [
	{ title: 'Start with a clear goal', description: "Agree on what you're building before touching the keyboard." },
	{ title: 'Switch roles regularly', description: "Every 15–25 minutes. Use a timer so you don't forget." },
	{ title: 'Take breaks', description: 'Pairing is intense. Step away every hour. Walk, stretch, hydrate.' },
	{ title: 'Think out loud', description: 'Narrate your reasoning. "I\'m adding this check because..." — it invites feedback.' },
	{ title: 'Be patient', description: 'Different skill levels are fine. Pairing is a learning opportunity for both.' },
	{ title: "Don't pair on everything", description: 'Save pairing for complex, critical, or learning tasks. Routine work can be solo.' },
	{ title: 'Rotate partners', description: "Don't always pair with the same person. Cross-pollinate knowledge across the team." },
	{ title: 'Retrospect', description: "After each session, take 2 minutes: what worked? What didn't? Adjust next time." },
];

export const summaryCards: SummaryCard[] = [
	{ title: 'Two minds, one keyboard', description: 'Driver writes, Navigator thinks ahead. Roles rotate every 15–25 minutes — neither person coasts.' },
	{ title: 'Tight loops are the point', description: 'The shorter the feedback cycle, the cheaper every mistake. Pairing collapses the loop from days to seconds.' },
	{ title: 'Pick your pair deliberately', description: 'Junior + Junior: both learn fastest. Junior + Senior: strong transfer, one-sided effort. Senior + Senior: save it for hard architecture.' },
	{ title: 'Not for everything', description: 'Default to pairing on security, payments, onboarding, and core logic. Skip routine scripts, isolated spikes, and personal exploration.' },
	{ title: 'Structure the session', description: 'Agree on the goal before you start. Switch roles actively. Break after 60–90 minutes. Close with a short recap.' },
	{ title: 'Culture before process', description: "Most teams don't pair because it feels exposed, not because it's inefficient. Psychological safety has to come first." },
	{ title: 'AI changes the what, not the why', description: 'AI handles the boilerplate. The reason to pair — shared understanding, trust, growing your team — stays exactly the same.' },
	{ title: 'Common failure modes', description: 'One person drives the whole session. Navigator goes passive. No breaks. Skipping it when stressed — which is exactly when you need it most.' },
];

export const sources: Source[] = [
	{
		title: 'Pair Programming Illuminated',
		url: 'https://www.amazon.com/Pair-Programming-Illuminated-Laurie-Williams/dp/0201745763',
		meta: 'Williams, L. &amp; Kessler, R. (2002). Addison-Wesley Professional.',
	},
	{
		title: 'The Costs and Benefits of Pair Programming',
		url: 'https://www.cs.utexas.edu/~ans/classes/cs439/projects/XPSardinia.PDF',
		meta: 'Cockburn, A. &amp; Williams, L. (2000). Proceedings of the First International Conference on Extreme Programming (XP2000).',
	},
	{
		title: 'Extreme Programming Explained: Embrace Change',
		url: 'https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658',
		meta: 'Beck, K. (1999, 2nd ed. 2004). Addison-Wesley Professional.',
	},
	{
		title: 'The Effectiveness of Pair Programming: A Meta-Analysis',
		url: 'https://www.researchgate.net/publication/222408325_The_effectiveness_of_pair_programming_A_meta-analysis',
		meta: 'Hannay, J.E., Dyb&aring;, T., Arisholm, E. &amp; Sj&oslash;berg, D.I.K. (2009). Information and Software Technology, 51(7), 1110-1122.',
	},
	{
		title: 'Software Teaming: A Mob Programming, Whole-Team Approach',
		url: 'https://www.amazon.com/Software-Teaming-Programming-Whole-Team-Approach/dp/B0BLG1QTYK',
		meta: 'Zuill, W. &amp; Meadows, K. (2022, 2nd ed.). Originally published on Leanpub (2016).',
	},
	{
		title: 'On Pair Programming',
		url: 'https://martinfowler.com/articles/on-pair-programming.html',
		meta: 'Holdschick, B. &amp; Fowler, M. (2020). martinfowler.com.',
	},
	{
		title: 'Promiscuous Pairing and Beginner\'s Mind',
		url: 'https://ieeexplore.ieee.org/document/1609811',
		meta: 'Belshee, A. (2005). Agile Development Conference (ADC\'05), IEEE.',
	},
	{
		title: 'The Fearless Organization: Creating Psychological Safety in the Workplace',
		url: 'https://www.amazon.com/Fearless-Organization-Psychological-Workplace-Innovation/dp/1119477247',
		meta: 'Edmondson, A.C. (2018). Wiley.',
	},
	{
		title: 'Project Aristotle: Understanding Team Effectiveness',
		url: 'https://rework.withgoogle.com/intl/en/guides/understanding-team-effectiveness',
		meta: 'Google re:Work (2015). Psychological safety as the #1 factor in high-performing teams.',
	},
];

export const barriers: Barrier[] = [
	{
		title: 'It requires vulnerability',
		description: "Your half-formed thoughts, your wrong turns, your \"wait, how does this work again?\" — all of it becomes visible. Solo, you can edit in peace. Pairing, your thinking is live.",
	},
	{
		title: 'It triggers performance anxiety',
		description: 'Someone watching you code activates the same stress as public speaking. Your brain shifts from problem-solving to self-monitoring.',
	},
	{
		title: 'It exposes knowledge gaps',
		description: 'Solo, you can quietly Google. Pairing makes gaps visible — and in most workplaces, gaps feel dangerous.',
	},
	{
		title: 'It requires trust most teams haven\'t built',
		description: "Amy Edmondson's research on psychological safety. Google's Project Aristotle. The #1 factor in high-performing teams isn't skill — it's safety.",
	},
];

export const aiAnswers: AiAnswer[] = [
	{
		title: 'AI generates code. Not understanding.',
		description: 'When the system breaks at 2 AM, you need someone who <em>understands</em> the code. Pairing builds that in two people at once.',
	},
	{
		title: "Speed isn't the bottleneck.",
		description: 'Fast in the wrong direction is just expensive. A navigator catches wrong turns early.',
	},
	{
		title: 'Solo + AI = knowledge silos.',
		description: "Everyone grabs their task, AI handles it, nobody understands anyone else's code. Bus factor drops to one.",
	},
	{
		title: 'Some problems need two humans.',
		description: 'Architecture. Security. Domain logic. The kind of work where someone needs to say "wait, that doesn\'t make sense."',
	},
];

export const modernObjections: ModernObjection[] = [
	{ quote: "\"Why would I work on a feature with Jonathan? He's in a meeting, I have time — with a snap of my fingers it's done.\"" },
	{ quote: '"That really costs a lot of time — waiting for the other person, spending energy to engage with them."' },
	{ quote: '"Why would I even want to know how it works in detail if the AI just conjures it up for me?"' },
];

export const xpBullets: XpBullet[] = [
	{ bold: 'Short iterations', text: 'deliver working software every 1–2 weeks' },
	{ bold: 'Test-Driven Development', text: 'write the test before the code' },
	{ bold: 'Continuous Integration', text: 'merge and test constantly' },
	{ bold: 'Pair Programming', text: 'two minds, one keyboard' },
	{ bold: 'Collective Code Ownership', text: 'anyone can change any code' },
	{ bold: 'Simple Design', text: 'build only what you need right now' },
];

export const expertiseLayers: ExpertiseLayer[] = [
	{
		id: 'general',
		title: 'General Expertise',
		subLabel: 'AGC Language',
		color: '#818cf8',
		colorFaded: 'rgba(129, 140, 248, 0.12)',
		items: [
			'Register-based Logic',
			'Self-modifying Code',
			'GOTO Logic',
			'Real-time System',
		],
		summary: 'General expertise in techniques relevant to the problem at hand!',
	},
	{
		id: 'project',
		title: 'Project-specific Expertise',
		subLabel: 'Project Architecture',
		color: '#a855f7',
		colorFaded: 'rgba(168, 85, 247, 0.12)',
		sideContext: 'Command Module vs. Lunar Module',
		items: [
			'Executive vs. Programs vs. Jobs vs. Tasks vs. Interrupts',
			'Foreground / Background',
			'Verb/Noun System',
			'State Machine',
			'Powered Descent Initiation',
			'Breaking Phase',
			'Approach Phase',
			'Terminal Descent',
			'Touchdown',
			'Data Sources',
		],
	},
	{
		id: 'code',
		title: 'Code Understanding',
		subLabel: 'Hands-on & in Memory',
		color: '#34d399',
		colorFaded: 'rgba(52, 211, 153, 0.12)',
		sideContext: 'Code Paths',
		items: [
			'Guidelines',
			'What has failed before',
			'How do other team members think?',
			'Seeing the full stack',
		],
	},
];
