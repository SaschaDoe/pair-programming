<script lang="ts">
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import TeamResults from '$lib/components/TeamResults.svelte';
	import FeedbackForm from '$lib/components/FeedbackForm.svelte';
	import OriginSection from '$lib/components/OriginSection.svelte';
	import ArchitectureDiagram from '$lib/components/ArchitectureDiagram.svelte';
	import PracticalExample from '$lib/components/PracticalExample.svelte';
	import {
		benefits, safetyTips, classicObjections, pitfalls, pairingStyles,
		whenColumns, sessionSteps, bestPractices, summaryCards, sources,
		barriers, aiAnswers, modernObjections
	} from '$lib/data/presentationContent';
</script>

<!-- ============================================================ -->
<!-- HERO                                                         -->
<!-- ============================================================ -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="hero-content">
		<ScrollReveal direction="none" delay={200}>
			<p class="hero-label">A Guide to</p>
		</ScrollReveal>
		<ScrollReveal direction="none" delay={500}>
			<h1 class="hero-title">
				Pair<br />Programming
			</h1>
		</ScrollReveal>
		<ScrollReveal direction="none" delay={800}>
			<p class="hero-subtitle">A tool for your toolbox — for when it's time to look closely.</p>
		</ScrollReveal>
		<div class="scroll-hint">
			<span>Scroll to explore</span>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- THE VISUAL — standalone                                      -->
<!-- ============================================================ -->
<section class="section section-visual-hero">
	<div class="container">
		<ScrollReveal direction="none">
			<div class="visual-pair">
				<div class="visual-person">
					<div class="visual-icon">D</div>
					<span>Driver</span>
				</div>
				<div class="visual-connector">
					<div class="visual-screen"></div>
				</div>
				<div class="visual-person">
					<div class="visual-icon">N</div>
					<span>Navigator</span>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHAT IS PAIR PROGRAMMING?                                    -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Concept</p>
			<h2>What is Pair Programming?</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Two developers. One workstation. One writes code, the other reviews every line in real time.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={300}>
			<p class="body">
				Then the roles switch.
			</p>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHERE IT CAME FROM                                           -->
<!-- ============================================================ -->
<OriginSection />

<!-- ============================================================ -->
<!-- THE TWO ROLES                                                -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Roles</p>
			<h2>Driver &amp; Navigator</h2>
		</ScrollReveal>
		<div class="roles-grid">
			<ScrollReveal delay={150} direction="left">
				<div class="card role-card">
					<div class="role-badge driver-badge">D</div>
					<h3>The Driver</h3>
					<ul>
						<li>Controls the keyboard and mouse</li>
						<li>Focuses on writing code</li>
						<li>Thinks <strong>tactically</strong> — syntax, implementation details</li>
						<li>Translates ideas into working code</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300} direction="right">
				<div class="card role-card">
					<div class="role-badge navigator-badge">N</div>
					<h3>The Navigator</h3>
					<ul>
						<li>Reviews code as it's written</li>
						<li>Thinks <strong>strategically</strong> — architecture, edge cases</li>
						<li>Catches bugs in real time</li>
						<li>Keeps the big picture in mind</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>
		<ScrollReveal delay={450}>
			<div class="callout">
				<span class="callout-icon">&#x21bb;</span>
				<p><strong>Switch roles every 15–25 minutes.</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- BENEFITS                                                     -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Good</p>
			<h2>Why Pair Program?</h2>
		</ScrollReveal>
		<div class="benefits-grid">
			{#each benefits as b, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="card benefit-card">
						<div class="benefit-stat">{@html b.stat}</div>
						<h3>{b.title}</h3>
						<p>{b.description}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT II — THE HUMAN PROBLEM                                   -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- WHY IT HASN'T CAUGHT ON                                      -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Human Problem</p>
			<h2>Why It Hasn't Caught On</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				25 years of research. Clear benefits. And yet — most devs don't do it. Not because it doesn't work. Because it asks something most workplaces don't talk about.
			</p>
		</ScrollReveal>
		<div class="barrier-grid">
			{#each barriers as b, i}
				<ScrollReveal delay={(i + 2) * 100}>
					<div class="card barrier-card">
						<h3>{b.title}</h3>
						<p>{b.description}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
		<ScrollReveal delay={600}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>The question isn't "Should we pair?" — it's <strong>"Does your team feel safe enough to try?"</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- TEAM QUIZ RESULTS                                            -->
<!-- ============================================================ -->
<section class="section section-alt" id="team-results">
	<div class="container">
		<ScrollReveal>
			<p class="label">Check In</p>
			<h2>How Safe Does Your Team Feel?</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Before we talk about techniques, let's get honest. Take the psychological safety quiz and see where your team really stands.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={300}>
			<TeamResults />
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHAT WE CAN DO                                               -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">Building Safety</p>
			<h2>What We Can Do</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Psychological safety isn't a personality trait. It's a team condition. And conditions can be changed.
			</p>
		</ScrollReveal>
		<div class="tips-grid">
			{#each safetyTips as tip, i}
				<ScrollReveal delay={(i + 1) * 50 + 50}>
					<div class="tip">
						<span class="tip-num">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3>{tip.title}</h3>
							<p>{tip.description}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
		<ScrollReveal delay={400}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>Safety is not about being comfortable all the time. It's about knowing that <strong>discomfort won't be punished</strong>.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT III — PRACTICAL MASTERY                                  -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- CLASSIC OBJECTIONS                                           -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Timeless Pushback</p>
			<h2>Classic Objections</h2>
		</ScrollReveal>
		<div class="objection-response-list">
			{#each classicObjections as obj, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="objection-response">
						<div class="objection-quote">
							<p>{obj.objection}</p>
						</div>
						<div class="response">
							<p>{@html obj.response}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PITFALLS                                                     -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Challenges</p>
			<h2>Common Pitfalls</h2>
		</ScrollReveal>
		<div class="pitfalls-list">
			{#each pitfalls as p, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="pitfall">
						<div class="pitfall-header">
							<h3>{p.title}</h3>
							<span class="pitfall-severity {p.severity}">{p.severityLabel}</span>
						</div>
						<p>{p.description}</p>
						<div class="pitfall-solution">
							<strong>Fix:</strong> {p.fix}
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHERE TO PAIR — ARCHITECTURE DIAGRAM                         -->
<!-- ============================================================ -->
<ArchitectureDiagram />

<!-- ============================================================ -->
<!-- PAIRING STYLES                                               -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Methods</p>
			<h2>Pairing Styles</h2>
		</ScrollReveal>
		<div class="styles-list">
			{#each pairingStyles as style, i}
				<ScrollReveal delay={i * 150 + 200}>
					<div class="card style-card">
						<div class="style-number">{String(i + 1).padStart(2, '0')}</div>
						<h3>{style.title}</h3>
						<p class="style-tag">{style.tag}</p>
						<p>{style.description}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHEN TO PAIR                                                 -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Decision</p>
			<h2>When to Pair</h2>
		</ScrollReveal>
		<div class="when-grid">
			{#each whenColumns as col, i}
				<ScrollReveal delay={i * 150 + 100}>
					<div class="card when-card {col.variant}">
						<h3>{col.title}</h3>
						<ul>
							{#each col.items as item}
								<li>{@html item}</li>
							{/each}
						</ul>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- SESSION STRUCTURE                                            -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Rhythm</p>
			<h2>Session Structure</h2>
		</ScrollReveal>
		<div class="session-steps">
			{#each sessionSteps as step, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="session-step">
						<span class="session-step-num">{i + 1}</span>
						<div>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PRACTICAL EXAMPLE                                            -->
<!-- ============================================================ -->
<PracticalExample />

<!-- ============================================================ -->
<!-- ACT IV — MODERN CONTEXT                                      -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- THE 2026 QUESTION                                            -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Elephant in the Room</p>
			<h2>But It's 2026.</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				AI is fast. Work is parallelized. Why would you pair?
			</p>
		</ScrollReveal>
		<ScrollReveal delay={200}>
			<p class="body">
				You've seen the techniques. You know the human challenges. Now let's talk about the machine in the room.
			</p>
		</ScrollReveal>

		<div class="objections">
			{#each modernObjections as obj, i}
				<ScrollReveal delay={i * 150 + 250}>
					<div class="objection">
						<div class="objection-quote">
							<p>{obj.quote}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		<ScrollReveal delay={700}>
			<p class="body" style="margin-top: 2rem;">
				These aren't beginner thoughts. These are <strong>real questions</strong>. And just like the human challenges we explored earlier, they deserve honest answers.
			</p>
		</ScrollReveal>

		<ScrollReveal delay={850}>
			<div class="answers">
				{#each aiAnswers as a}
					<div class="answer">
						<h3>{a.title}</h3>
						<p>{@html a.description}</p>
					</div>
				{/each}
			</div>
		</ScrollReveal>

		<ScrollReveal delay={1000}>
			<div class="callout">
				<span class="callout-icon">&#x1F9F0;</span>
				<p><strong>A tool for your toolbox</strong> — for when it's time to look at something really carefully.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- AI WORKFLOWS                                                 -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">Human + Machine</p>
			<h2>AI Workflows</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				AI assistants are fast, tireless, and never feel awkward. But they never push back, never ask "does this actually make sense?"
			</p>
		</ScrollReveal>
		<div class="ai-grid">
			<ScrollReveal delay={250}>
				<div class="card ai-card ai-human">
					<h3>Pair with a Human</h3>
					<ul>
						<li>Architecture &amp; system design</li>
						<li>Security-critical code</li>
						<li>Domain logic &amp; business rules</li>
						<li>Onboarding &amp; knowledge transfer</li>
						<li>Challenging assumptions</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card ai-card ai-machine">
					<h3>Let AI Assist</h3>
					<ul>
						<li>Boilerplate &amp; scaffolding</li>
						<li>Isolated, well-defined tasks</li>
						<li>Prototyping &amp; spike work</li>
						<li>Repetitive refactoring</li>
						<li>Test generation</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>
		<ScrollReveal delay={500}>
			<div class="callout">
				<span class="callout-icon">&#x21C4;</span>
				<p><strong>The hybrid session:</strong> AI generates a draft. Two humans pair-review and refine. You get speed <em>and</em> understanding.</p>
			</div>
		</ScrollReveal>
		<ScrollReveal delay={600}>
			<div class="key-takeaway" style="margin-top: 2rem;">
				<p>AI makes solo coding faster. Pair programming makes team understanding deeper. <strong>The best teams use both.</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT V — EXTENSIONS & WRAP-UP                                 -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- MOB PROGRAMMING                                              -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">Beyond Pairing</p>
			<h2>Mob Programming</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Take pair programming further — the whole team works on the same thing, at the same time, on the same computer.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={250}>
			<div class="mob-visual">
				<div class="mob-person mob-driver">
					<div class="mob-icon">D</div>
					<span>Driver</span>
				</div>
				<div class="mob-group">
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
				</div>
			</div>
		</ScrollReveal>

		<div class="mob-details">
			<ScrollReveal delay={350}>
				<div class="card">
					<h3>How It Works</h3>
					<ol class="mob-steps">
						<li>The whole team gathers at one screen</li>
						<li>One person drives (types)</li>
						<li>Everyone else navigates (discusses, guides)</li>
						<li>Rotate the driver every <strong>10–15 minutes</strong></li>
						<li>Use a mob timer to keep rotations regular</li>
					</ol>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={450}>
				<div class="card">
					<h3>When to Use It</h3>
					<ul>
						<li>Complex problems needing diverse expertise</li>
						<li>Onboarding new team members</li>
						<li>Knowledge sharing across the team</li>
						<li>Critical-path code everyone must understand</li>
						<li>Architectural decisions with team-wide impact</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={550}>
				<div class="card">
					<h3>Tooling</h3>
					<ul>
						<li><strong>Mob Timer</strong> — mobti.me or Mobster app</li>
						<li><strong>VS Code Live Share</strong> — real-time collaborative editing</li>
						<li><strong>Screen sharing</strong> — Zoom, Teams, or Google Meet</li>
						<li><strong>Shared workspace</strong> — Tuple, Pop, or CodeTogether</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>

		<ScrollReveal delay={650}>
			<div class="callout">
				<span class="callout-icon">&#x2194;</span>
				<p><strong>Pair = 2 people, deep focus.</strong> Mob = whole team, broad knowledge sharing. Both have their place. Use pairing for daily work, mobbing for complex or high-impact tasks.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- REMOTE PAIRING                                               -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">Distributed Teams</p>
			<h2>Remote Pairing</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">Most teams are remote or hybrid now. Pairing still works — it just needs the right setup.</p>
		</ScrollReveal>
		<div class="remote-grid">
			<ScrollReveal delay={250}>
				<div class="card">
					<h3>Essential Tools</h3>
					<ul>
						<li><strong>VS Code Live Share</strong> — both edit the same codebase</li>
						<li><strong>JetBrains Code With Me</strong> — same, for IntelliJ users</li>
						<li><strong>Screen sharing</strong> — Zoom, Teams, Discord</li>
						<li><strong>Good audio</strong> — headsets, mute when not talking</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card">
					<h3>Remote Tips</h3>
					<ul>
						<li><strong>Over-communicate</strong> — no body language to read</li>
						<li><strong>Driver's cursor</strong> — point with your mouse when explaining</li>
						<li><strong>More breaks</strong> — screen fatigue is real</li>
						<li><strong>Agree on shortcuts</strong> — "your turn" / "I've got this"</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>
		<ScrollReveal delay={500}>
			<div class="callout">
				<span class="callout-icon">&bull;</span>
				<p><strong>Audio is essential. Video is optional.</strong> A stable connection and a good mic matter more than seeing each other's face.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- BEST PRACTICES                                               -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Playbook</p>
			<h2>Best Practices</h2>
		</ScrollReveal>
		<div class="tips-grid">
			{#each bestPractices as bp, i}
				<ScrollReveal delay={i * 50 + 100}>
					<div class="tip">
						<span class="tip-num">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3>{bp.title}</h3>
							<p>{bp.description}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- SUMMARY                                                      -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">At a Glance</p>
			<h2>Summary</h2>
		</ScrollReveal>

		<ScrollReveal delay={150}>
			<div class="summary-grid">
				{#each summaryCards as card}
					<div class="summary-card">
						<h3>{card.title}</h3>
						<p>{card.description}</p>
					</div>
				{/each}
			</div>
		</ScrollReveal>

		<ScrollReveal delay={300}>
			<div class="key-takeaway">
				<p>Pair programming is not about being faster. In 2026, AI already does that.<br />It's about building <strong>understanding</strong> — in your head, and in your team — for when it truly matters.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SOURCES                                                      -->
<!-- ============================================================ -->
<section class="section section-alt section-sources">
	<div class="container">
		<ScrollReveal>
			<p class="label">References</p>
			<h2>Sources &amp; Further Reading</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<div class="sources-list">
				{#each sources as src, i}
					<div class="source">
						<span class="source-num">{i + 1}</span>
						<div>
							<a href={src.url} target="_blank" rel="noopener" class="source-title">{src.title}</a>
							<p class="source-meta">{@html src.meta}</p>
						</div>
					</div>
				{/each}
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- FEEDBACK                                                     -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">Feedback</p>
			<h2>Was This Helpful?</h2>
			<FeedbackForm />
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- FOOTER                                                       -->
<!-- ============================================================ -->
<footer class="footer">
	<p>Built with SvelteKit. Content based on research and industry best practices.</p>
</footer>

<!-- ============================================================ -->
<!-- STYLES                                                       -->
<!-- ============================================================ -->
<style>
	/* ── Hero ────────────────────────────────────────────────── */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		overflow: hidden;
		padding: 2rem;
	}

	.hero-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(99, 102, 241, 0.15) 0%, transparent 70%),
			radial-gradient(ellipse 40% 40% at 60% 55%, rgba(168, 85, 247, 0.1) 0%, transparent 60%);
		animation: glow-pulse 8s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	.hero-content {
		position: relative;
		z-index: 1;
	}

	.hero-label {
		font-size: 0.85rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: clamp(3.5rem, 10vw, 8rem);
		font-weight: 800;
		line-height: 0.95;
		letter-spacing: -0.04em;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1.5rem;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 2.5vw, 1.35rem);
		color: var(--text-secondary);
		font-weight: 300;
		max-width: 500px;
		margin: 0 auto;
	}

	.scroll-hint {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-muted);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		animation: hint-bounce 2.5s ease-in-out infinite;
	}

	@keyframes hint-bounce {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(6px); }
	}

	/* ── Visual Hero Section ─────────────────────────────────── */
	.section-visual-hero {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.section-visual-hero .visual-pair {
		background: none;
		border: none;
		padding: 0;
		gap: 3rem;
	}

	.section-visual-hero .visual-icon {
		width: 80px;
		height: 80px;
		font-size: 1.6rem;
	}

	.section-visual-hero .visual-person span {
		font-size: 0.9rem;
	}

	.section-visual-hero .visual-screen {
		width: 90px;
		height: 60px;
	}

	/* ── Visual: Pair Diagram ────────────────────────────────── */
	.visual-pair {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		margin-top: 2.5rem;
		padding: 2.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.visual-person {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.visual-person span {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.visual-icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.2rem;
		background: var(--gradient);
		color: white;
	}

	.visual-connector {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.visual-screen {
		width: 70px;
		height: 48px;
		border: 2px solid var(--border-bright);
		border-radius: 6px;
		position: relative;
	}

	.visual-screen::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 24px;
		height: 6px;
		background: var(--border-bright);
		border-radius: 0 0 3px 3px;
	}

	/* ── Roles Grid ──────────────────────────────────────────── */
	.roles-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 640px) {
		.roles-grid {
			grid-template-columns: 1fr;
		}
	}

	.role-card {
		text-align: center;
	}

	.role-card ul {
		text-align: left;
	}

	.role-badge {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.driver-badge {
		background: linear-gradient(135deg, #6366f1, #818cf8);
		color: white;
	}

	.navigator-badge {
		background: linear-gradient(135deg, #a855f7, #c084fc);
		color: white;
	}

	/* ── Benefits Grid ───────────────────────────────────────── */
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.benefits-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 480px) {
		.benefits-grid {
			grid-template-columns: 1fr;
		}
	}

	.benefit-card {
		text-align: center;
	}

	.benefit-card p {
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.benefit-stat {
		font-size: 2rem;
		font-weight: 800;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	/* ── Barrier Grid (Why It Hasn't Caught On) ──────────────── */
	.barrier-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-top: 1.5rem;
	}

	@media (max-width: 640px) {
		.barrier-grid {
			grid-template-columns: 1fr;
		}
	}

	.barrier-card h3 {
		color: #fb923c;
		margin-bottom: 0.75rem;
	}

	.barrier-card p {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	/* ── AI Workflows Grid ───────────────────────────────────── */
	.ai-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 640px) {
		.ai-grid {
			grid-template-columns: 1fr;
		}
	}

	.ai-human h3 {
		color: #818cf8;
		border-bottom: 2px solid rgba(129, 140, 248, 0.3);
		padding-bottom: 0.75rem;
		margin-bottom: 1rem;
	}

	.ai-machine h3 {
		color: #34d399;
		border-bottom: 2px solid rgba(52, 211, 153, 0.3);
		padding-bottom: 0.75rem;
		margin-bottom: 1rem;
	}

	/* ── Pitfalls ────────────────────────────────────────────── */
	.pitfalls-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.pitfall {
		padding: 1.5rem 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		transition: border-color 0.3s;
	}

	.pitfall:hover {
		border-color: var(--border-bright);
	}

	.pitfall-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.pitfall-header h3 {
		margin-bottom: 0;
	}

	.pitfall > p {
		color: var(--text-secondary);
		font-size: 0.95rem;
		margin-bottom: 0.75rem;
	}

	.pitfall-severity {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.2rem 0.6rem;
		border-radius: 100px;
	}

	.pitfall-severity.high {
		background: rgba(251, 146, 60, 0.12);
		color: #fb923c;
	}

	.pitfall-severity.medium {
		background: rgba(250, 204, 21, 0.1);
		color: #facc15;
	}

	.pitfall-severity.low {
		background: rgba(52, 211, 153, 0.1);
		color: #34d399;
	}

	.pitfall-solution {
		font-size: 0.9rem;
		color: var(--text-secondary);
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.pitfall-solution strong {
		color: var(--accent);
	}

	/* ── Pairing Styles ──────────────────────────────────────── */
	.styles-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-top: 1rem;
	}

	.style-card {
		position: relative;
		padding-left: 5rem;
	}

	@media (max-width: 480px) {
		.style-card {
			padding-left: 2rem;
		}
		.style-number {
			position: static !important;
			margin-bottom: 0.5rem;
		}
	}

	.style-number {
		position: absolute;
		left: 2rem;
		top: 2rem;
		font-size: 1.6rem;
		font-weight: 800;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
	}

	.style-tag {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		background: rgba(129, 140, 248, 0.1);
		padding: 0.15rem 0.6rem;
		border-radius: 100px;
		margin-bottom: 0.75rem;
	}

	.style-card p:last-child {
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	/* ── Mob Programming ─────────────────────────────────────── */
	.mob-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		margin: 2rem 0;
		padding: 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.mob-group {
		display: flex;
		gap: 1.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.mob-person {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
	}

	.mob-person span {
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.mob-icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.95rem;
		color: white;
	}

	.mob-driver .mob-icon {
		background: var(--gradient);
		width: 56px;
		height: 56px;
		font-size: 1.1rem;
	}

	.mob-nav-icon {
		background: rgba(168, 85, 247, 0.2);
		border: 1px solid rgba(168, 85, 247, 0.3);
		color: #c084fc !important;
	}

	.mob-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin: 1.5rem 0;
	}

	.mob-details .card:last-child {
		grid-column: 1 / -1;
	}

	@media (max-width: 640px) {
		.mob-details {
			grid-template-columns: 1fr;
		}
	}

	.mob-steps {
		list-style: none;
		counter-reset: step;
		padding: 0;
	}

	.mob-steps li {
		counter-increment: step;
		position: relative;
		padding-left: 2rem;
		margin-bottom: 0.6rem;
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	.mob-steps li::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: rgba(129, 140, 248, 0.12);
		color: var(--accent);
		font-size: 0.7rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mob-steps li strong {
		color: var(--text-primary);
	}

	/* ── Summary ─────────────────────────────────────────────── */
	.summary-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
		margin-bottom: 2.5rem;
	}

	@media (max-width: 900px) {
		.summary-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.summary-grid {
			grid-template-columns: 1fr;
		}
	}

	.summary-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		transition: border-color 0.3s;
	}

	.summary-card:hover {
		border-color: var(--border-bright);
	}

	.summary-card h3 {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.summary-card p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* ── Sources ──────────────────────────────────────────────── */
	.sources-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.source {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem 1.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
	}

	.source-num {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--accent);
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(129, 140, 248, 0.1);
		border-radius: 50%;
		font-variant-numeric: tabular-nums;
	}

	.source-title {
		font-weight: 600;
		font-size: 0.95rem;
		margin-bottom: 0.15rem;
		display: block;
	}

	a.source-title {
		color: var(--text-primary);
		text-decoration: none;
		transition: color 0.2s;
	}

	a.source-title:hover {
		color: var(--accent);
	}

	.source-meta {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	/* ── 2026 Question Section ───────────────────────────────── */
	.objections {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.objection-quote {
		padding: 1.5rem 2rem;
		background: rgba(251, 146, 60, 0.04);
		border-left: 3px solid rgba(251, 146, 60, 0.4);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.objection-quote p {
		font-size: 1.05rem;
		color: var(--text-secondary);
		font-style: italic;
		line-height: 1.6;
	}

	.answers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-top: 1rem;
	}

	@media (max-width: 640px) {
		.answers {
			grid-template-columns: 1fr;
		}
	}

	.answer {
		padding: 1.5rem;
		background: rgba(52, 211, 153, 0.04);
		border: 1px solid rgba(52, 211, 153, 0.12);
		border-radius: var(--radius);
	}

	.answer h3 {
		font-size: 1rem;
		color: #34d399;
		margin-bottom: 0.6rem;
		line-height: 1.4;
	}

	.answer p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.answer em {
		color: var(--text-primary);
		font-style: italic;
	}

	/* ── Classic Objections ──────────────────────────────────── */
	.objection-response-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-top: 1rem;
	}

	.objection-response {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.objection-response .objection-quote {
		border-left: none;
		border-radius: 0;
		border-bottom: 1px solid var(--border);
		padding: 1.25rem 1.5rem;
	}

	.objection-response .objection-quote p {
		font-size: 0.95rem;
	}

	.response {
		padding: 1.25rem 1.5rem;
	}

	.response p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.response strong {
		color: #34d399;
	}

	/* ── When to Pair ────────────────────────────────────────── */
	.when-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.when-grid {
			grid-template-columns: 1fr;
		}
	}

	.when-card h3 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 2px solid;
	}

	.when-always h3 {
		color: #34d399;
		border-color: rgba(52, 211, 153, 0.3);
	}

	.when-consider h3 {
		color: #facc15;
		border-color: rgba(250, 204, 21, 0.3);
	}

	.when-skip h3 {
		color: var(--text-muted);
		border-color: var(--border);
	}

	/* ── Session Structure ───────────────────────────────────── */
	.session-steps {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.session-step {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.25rem 1.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		transition: border-color 0.3s;
	}

	.session-step:hover {
		border-color: var(--border-bright);
	}

	.session-step-num {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.9rem;
		background: var(--gradient);
		color: white;
		flex-shrink: 0;
	}

	.session-step h3 {
		font-size: 1rem;
		margin-bottom: 0.15rem;
	}

	.session-step p {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* ── Remote Pairing ──────────────────────────────────────── */
	.remote-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 640px) {
		.remote-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ── Footer ──────────────────────────────────────────────── */
	.footer {
		text-align: center;
		padding: 3rem 2rem;
		color: var(--text-muted);
		font-size: 0.8rem;
		border-top: 1px solid var(--border);
	}

</style>
