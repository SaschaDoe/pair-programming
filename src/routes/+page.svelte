<script lang="ts">
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import TeamResults from '$lib/components/TeamResults.svelte';

	let originWrapper: HTMLElement | undefined = $state();
	let originScroll = $state(0);

	$effect(() => {
		if (!originWrapper) return;
		const onScroll = () => {
			const rect = originWrapper!.getBoundingClientRect();
			const total = originWrapper!.scrollHeight - window.innerHeight;
			originScroll = Math.min(1, Math.max(0, -rect.top / total));
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	let originPhase = $derived(
		originScroll < 0.3 ? 'photos' : originScroll < 0.65 ? 'text' : 'bullets'
	);
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
<section class="origin-scroll" bind:this={originWrapper}>
	<div class="origin-sticky">
		<div class="container">
			<p class="label">The Origin</p>
			<h2>Where It Came From</h2>

			<!-- Phase 1: Photos -->
			<div class="origin-phase" class:origin-visible={originPhase === 'photos'}>
				<div class="origin-portraits">
					<div class="origin-portrait">
						<img src="/pics/Kent_Beck.jpg" alt="Kent Beck" />
						<span>Kent Beck</span>
					</div>
					<div class="origin-portrait">
						<img src="/pics/Ron_Jeffries.jpg" alt="Ron Jeffries" />
						<span>Ron Jeffries</span>
					</div>
					<div class="origin-portrait">
						<img src="/pics/Martin_Fowler.jpg" alt="Martin Fowler" />
						<span>Martin Fowler</span>
					</div>
					<div class="origin-portrait">
						<img src="/pics/Robert_C._Martin.jpg" alt="Robert C. Martin" />
						<span>Robert C. Martin</span>
					</div>
				</div>
			</div>

			<!-- Phase 2: XP explanation -->
			<div class="origin-phase" class:origin-visible={originPhase === 'text'}>
				<p class="lead">
					The late 1990s. People were fed up with endless processes that led nowhere.
				</p>
				<p class="body" style="margin-top: 1.5rem;">
					Kent Beck created <strong>Extreme Programming (XP)</strong> — a radical approach that put working software and fast feedback above heavy documentation and planning. Sit with the customer. Understand requirements <strong>fast</strong>. Ship in short cycles.
				</p>
				<p class="body" style="margin-top: 1rem;">
					Pair programming was one of its core practices — two developers, one screen. That was the cutting edge.
				</p>
			</div>

			<!-- Phase 3: XP bullet points + Germany note -->
			<div class="origin-phase" class:origin-visible={originPhase === 'bullets'}>
				<p class="lead" style="margin-bottom: 1.5rem;">Extreme Programming in a nutshell:</p>
				<ul class="origin-bullets">
					<li><strong>Short iterations</strong> — deliver working software every 1–2 weeks</li>
					<li><strong>Test-Driven Development</strong> — write the test before the code</li>
					<li><strong>Continuous Integration</strong> — merge and test constantly</li>
					<li><strong>Pair Programming</strong> — two minds, one keyboard</li>
					<li><strong>Collective Code Ownership</strong> — anyone can change any code</li>
					<li><strong>Simple Design</strong> — build only what you need right now</li>
				</ul>
				<div class="era-tag" style="margin-top: 2rem;">
					<span class="era-dot"></span>
					<p>Neither TDD nor pair programming ever fully took hold in the German dev community. In 2026, that seems more unlikely than ever.</p>
				</div>
			</div>
		</div>
	</div>
</section>

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
			<ScrollReveal delay={100}>
				<div class="card benefit-card">
					<div class="benefit-stat">15%</div>
					<h3>Fewer Defects</h3>
					<p>Significantly fewer bugs than solo code.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={200}>
				<div class="card benefit-card">
					<div class="benefit-stat">&uarr;</div>
					<h3>Knowledge Transfer</h3>
					<p>Juniors learn faster. Seniors teach to solidify.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="card benefit-card">
					<div class="benefit-stat">&lt;/&gt;</div>
					<h3>Better Design</h3>
					<p>Two perspectives, cleaner architecture.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card benefit-card">
					<div class="benefit-stat">&frac12;</div>
					<h3>Faster Debugging</h3>
					<p>Two brains find solutions faster.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={500}>
				<div class="card benefit-card">
					<div class="benefit-stat">=</div>
					<h3>Shared Ownership</h3>
					<p>No single point of failure.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={600}>
				<div class="card benefit-card">
					<div class="benefit-stat">&check;</div>
					<h3>Real-time Review</h3>
					<p>Bugs caught now, not days later in PR.</p>
				</div>
			</ScrollReveal>
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
			<ScrollReveal delay={200}>
				<div class="card barrier-card">
					<h3>It requires vulnerability</h3>
					<p>Your half-formed thoughts, your wrong turns, your "wait, how does this work again?" — all of it becomes visible. Solo, you can edit in peace. Pairing, your thinking is live.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="card barrier-card">
					<h3>It triggers performance anxiety</h3>
					<p>Someone watching you code activates the same stress as public speaking. Your brain shifts from problem-solving to self-monitoring.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card barrier-card">
					<h3>It exposes knowledge gaps</h3>
					<p>Solo, you can quietly Google. Pairing makes gaps visible — and in most workplaces, gaps feel dangerous.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={500}>
				<div class="card barrier-card">
					<h3>It requires trust most teams haven't built</h3>
					<p>Amy Edmondson's research on psychological safety. Google's Project Aristotle. The #1 factor in high-performing teams isn't skill — it's safety.</p>
				</div>
			</ScrollReveal>
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
			<ScrollReveal delay={100}>
				<div class="tip">
					<span class="tip-num">01</span>
					<div>
						<h3>Normalise not-knowing</h3>
						<p>Say "I don't know" out loud — especially if you're senior. It gives everyone else permission to do the same.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={150}>
				<div class="tip">
					<span class="tip-num">02</span>
					<div>
						<h3>Start with low-stakes pairing</h3>
						<p>Don't begin with the most critical codebase. Pair on a small feature, a refactor, a test — something where mistakes are cheap.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={200}>
				<div class="tip">
					<span class="tip-num">03</span>
					<div>
						<h3>Make the first 5 minutes about humans</h3>
						<p>Check in before you code. "How's your morning?" costs nothing and changes everything about the next hour.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={250}>
				<div class="tip">
					<span class="tip-num">04</span>
					<div>
						<h3>Agree on ground rules</h3>
						<p>"We'll switch every 20 minutes. We'll think out loud. We'll ask before grabbing the keyboard." Explicit beats implicit.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="tip">
					<span class="tip-num">05</span>
					<div>
						<h3>Celebrate mistakes publicly</h3>
						<p>"Good thing we caught that now" is more powerful than any retrospective. Make catching errors a win, not a blame.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={350}>
				<div class="tip">
					<span class="tip-num">06</span>
					<div>
						<h3>Give people an exit</h3>
						<p>Pairing should never feel mandatory in the moment. "I need 30 minutes solo" is always a valid thing to say.</p>
					</div>
				</div>
			</ScrollReveal>
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
			<ScrollReveal delay={100}>
				<div class="objection-response">
					<div class="objection-quote">
						<p>"It's twice as expensive — two developers on one task."</p>
					</div>
					<div class="response">
						<p>Bugs cost <strong>10–100x</strong> more to fix in production than during development. 15% fewer defects pays for itself on critical code.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={200}>
				<div class="objection-response">
					<div class="objection-quote">
						<p>"I work better alone."</p>
					</div>
					<div class="response">
						<p>For some tasks, yes. Pair programming isn't for everything. Use it <strong>selectively</strong> — for the code where the cost of getting it wrong is high.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="objection-response">
					<div class="objection-quote">
						<p>"We tried it and it didn't work."</p>
					</div>
					<div class="response">
						<p>Pairing takes practice. The first sessions are awkward. Give it <strong>2–4 weeks</strong>. Some pairs don't click — that's okay, rotate.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="objection-response">
					<div class="objection-quote">
						<p>"My team is fully remote."</p>
					</div>
					<div class="response">
						<p>Remote pairing works fine with modern tools. Some teams report it's <strong>even more focused</strong> — fewer physical distractions.</p>
					</div>
				</div>
			</ScrollReveal>
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
			<ScrollReveal delay={100}>
				<div class="pitfall">
					<div class="pitfall-header">
						<h3>Mental Fatigue</h3>
						<span class="pitfall-severity high">common</span>
					</div>
					<p>Pairing is cognitively intense.</p>
					<div class="pitfall-solution">
						<strong>Fix:</strong> Pomodoro — 25 min on, 5 min off. Max 4 hours/day.
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={200}>
				<div class="pitfall">
					<div class="pitfall-header">
						<h3>Personality Clashes</h3>
						<span class="pitfall-severity medium">varies</span>
					</div>
					<p>Different styles and egos create friction.</p>
					<div class="pitfall-solution">
						<strong>Fix:</strong> Ground rules upfront. Focus on the code. Rotate pairs.
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="pitfall">
					<div class="pitfall-header">
						<h3>Disengaged Navigator</h3>
						<span class="pitfall-severity high">common</span>
					</div>
					<p>Navigator zones out or passively watches.</p>
					<div class="pitfall-solution">
						<strong>Fix:</strong> Switch roles often. Give the navigator active tasks.
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="pitfall">
					<div class="pitfall-header">
						<h3>Backseat Driving</h3>
						<span class="pitfall-severity medium">varies</span>
					</div>
					<p>Navigator dictates every keystroke.</p>
					<div class="pitfall-solution">
						<strong>Fix:</strong> Navigate at the level of intent, not syntax.
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={500}>
				<div class="pitfall">
					<div class="pitfall-header">
						<h3>Scheduling</h3>
						<span class="pitfall-severity low">manageable</span>
					</div>
					<p>Coordinating calendars is harder than sitting down alone.</p>
					<div class="pitfall-solution">
						<strong>Fix:</strong> Block dedicated time. Same slot every day.
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={600}>
				<div class="pitfall">
					<div class="pitfall-header">
						<h3>Not Always Suitable</h3>
						<span class="pitfall-severity low">manageable</span>
					</div>
					<p>Routine tasks don't benefit much.</p>
					<div class="pitfall-solution">
						<strong>Fix:</strong> Save pairing for complex, critical, or learning tasks.
					</div>
				</div>
			</ScrollReveal>
		</div>
	</div>
</section>

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
			<ScrollReveal delay={200}>
				<div class="card style-card">
					<div class="style-number">01</div>
					<h3>Driver–Navigator</h3>
					<p class="style-tag">Classic</p>
					<p>The standard approach. Clear roles, regular rotation. The driver codes, the navigator reviews and guides. Best for most development tasks.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={350}>
				<div class="card style-card">
					<div class="style-number">02</div>
					<h3>Ping-Pong Pairing</h3>
					<p class="style-tag">Test-Driven</p>
					<p>Used with TDD. Developer A writes a failing test. Developer B makes it pass, then writes the next failing test. Back and forth, building up the solution.</p>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={500}>
				<div class="card style-card">
					<div class="style-number">03</div>
					<h3>Strong-Style Pairing</h3>
					<p class="style-tag">Idea-Driven</p>
					<p>"For an idea to go from your head into the computer, it must go through someone else's hands." The navigator has the ideas; the driver just types. Great for mentoring.</p>
				</div>
			</ScrollReveal>
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
			<ScrollReveal delay={100}>
				<div class="card when-card when-always">
					<h3>Always</h3>
					<ul>
						<li>Security-critical code</li>
						<li>Payment &amp; financial logic</li>
						<li>Core business rules</li>
						<li>Shared libraries &amp; utilities</li>
						<li>Architecture decisions</li>
						<li>Onboarding new team members</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={250}>
				<div class="card when-card when-consider">
					<h3>Consider</h3>
					<ul>
						<li>Unfamiliar technology</li>
						<li>Complex bug fixes</li>
						<li>Performance-critical code</li>
						<li>Tricky edge cases</li>
						<li>When you're stuck</li>
						<li>Legacy code changes</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card when-card when-skip">
					<h3>Skip</h3>
					<ul>
						<li>Simple, routine changes</li>
						<li>Well-understood features</li>
						<li>Isolated components</li>
						<li>Exploratory / spike work</li>
						<li>When you need deep focus time</li>
					</ul>
				</div>
			</ScrollReveal>
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
			<ScrollReveal delay={100}>
				<div class="session-step">
					<span class="session-step-num">1</span>
					<div>
						<h3>Align</h3>
						<p>Agree on the goal. What are we building this session?</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={200}>
				<div class="session-step">
					<span class="session-step-num">2</span>
					<div>
						<h3>Code</h3>
						<p>Driver codes, Navigator reviews. Think out loud.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="session-step">
					<span class="session-step-num">3</span>
					<div>
						<h3>Switch</h3>
						<p>Rotate roles every 15–25 minutes. Use a timer.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="session-step">
					<span class="session-step-num">4</span>
					<div>
						<h3>Break</h3>
						<p>Step away together every hour. Pairing is intense.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={500}>
				<div class="session-step">
					<span class="session-step-num">5</span>
					<div>
						<h3>Recap</h3>
						<p>What did we accomplish? What's next? 2 minutes.</p>
					</div>
				</div>
			</ScrollReveal>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PRACTICAL EXAMPLE                                            -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">In Practice</p>
			<h2>A Real Example</h2>
		</ScrollReveal>
		<ScrollReveal delay={100}>
			<p class="lead">Let's walk through a pairing session: building a login form together.</p>
		</ScrollReveal>

		<div class="timeline">
			<ScrollReveal delay={200}>
				<div class="timeline-item">
					<div class="timeline-time">0:00</div>
					<div class="timeline-content">
						<h3>Agree on the task</h3>
						<div class="dialogue">
							<div class="dialogue-line both">
								<span class="speaker">Both</span>
								<p>"Let's build the login form. We need email input, password field, validation, and error handling."</p>
							</div>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={300}>
				<div class="timeline-item">
					<div class="timeline-time">0:02</div>
					<div class="timeline-content">
						<h3>Driver starts, Navigator guides</h3>
						<div class="dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"Don't forget the aria-label for accessibility on the input fields."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"Good catch — adding it now."</p>
							</div>
						</div>
						<div class="timeline-insight">
							Catch #1 — Accessibility issue prevented before it existed.
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={400}>
				<div class="timeline-item">
					<div class="timeline-time">0:10</div>
					<div class="timeline-content">
						<h3>Navigator spots a performance issue</h3>
						<div class="dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"We should debounce the email validation — otherwise it fires on every keystroke."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"Right, that would hammer the API. Let me add a 300ms debounce."</p>
							</div>
						</div>
						<div class="timeline-insight">
							Catch #2 — Performance issue caught before reaching production.
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={500}>
				<div class="timeline-item switch">
					<div class="timeline-time">0:25</div>
					<div class="timeline-content">
						<h3>Role switch</h3>
						<p class="switch-text">Pomodoro timer rings. Driver becomes Navigator. Navigator becomes Driver.</p>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={600}>
				<div class="timeline-item">
					<div class="timeline-time">0:27</div>
					<div class="timeline-content">
						<h3>New Driver adds error handling</h3>
						<div class="dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">New Navigator</span>
								<p>"What happens if the API returns a 429? We need rate-limit handling."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">New Driver</span>
								<p>"I wouldn't have thought of that solo. Adding a retry with backoff."</p>
							</div>
						</div>
						<div class="timeline-insight">
							Catch #3 — Edge case handled that would have been missed alone.
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={700}>
				<div class="timeline-item done">
					<div class="timeline-time">0:45</div>
					<div class="timeline-content">
						<h3>Done</h3>
						<p>Login form completed with accessibility, debounced validation, and rate-limit handling — <strong>built in 45 minutes with zero bugs in review</strong>.</p>
						<div class="result-callout">
							The navigator caught <strong>3 issues</strong> that would have been missed in solo development. Total review comments on the PR: <strong>0</strong>.
						</div>
					</div>
				</div>
			</ScrollReveal>
		</div>
	</div>
</section>

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
			<ScrollReveal delay={250}>
				<div class="objection">
					<div class="objection-quote">
						<p>"Why would I work on a feature with Jonathan? He's in a meeting, I have time — with a snap of my fingers it's done."</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="objection">
					<div class="objection-quote">
						<p>"That really costs a lot of time — waiting for the other person, spending energy to engage with them."</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={550}>
				<div class="objection">
					<div class="objection-quote">
						<p>"Why would I even want to know how it works in detail if the AI just conjures it up for me?"</p>
					</div>
				</div>
			</ScrollReveal>
		</div>

		<ScrollReveal delay={700}>
			<p class="body" style="margin-top: 2rem;">
				These aren't beginner thoughts. These are <strong>real questions</strong>. And just like the human challenges we explored earlier, they deserve honest answers.
			</p>
		</ScrollReveal>

		<ScrollReveal delay={850}>
			<div class="answers">
				<div class="answer">
					<h3>AI generates code. Not understanding.</h3>
					<p>When the system breaks at 2 AM, you need someone who <em>understands</em> the code. Pairing builds that in two people at once.</p>
				</div>
				<div class="answer">
					<h3>Speed isn't the bottleneck.</h3>
					<p>Fast in the wrong direction is just expensive. A navigator catches wrong turns early.</p>
				</div>
				<div class="answer">
					<h3>Solo + AI = knowledge silos.</h3>
					<p>Everyone grabs their task, AI handles it, nobody understands anyone else's code. Bus factor drops to one.</p>
				</div>
				<div class="answer">
					<h3>Some problems need two humans.</h3>
					<p>Architecture. Security. Domain logic. The kind of work where someone needs to say "wait, that doesn't make sense."</p>
				</div>
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
			<ScrollReveal delay={100}>
				<div class="tip">
					<span class="tip-num">01</span>
					<div>
						<h3>Start with a clear goal</h3>
						<p>Agree on what you're building before touching the keyboard.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={150}>
				<div class="tip">
					<span class="tip-num">02</span>
					<div>
						<h3>Switch roles regularly</h3>
						<p>Every 15–25 minutes. Use a timer so you don't forget.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={200}>
				<div class="tip">
					<span class="tip-num">03</span>
					<div>
						<h3>Take breaks</h3>
						<p>Pairing is intense. Step away every hour. Walk, stretch, hydrate.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={250}>
				<div class="tip">
					<span class="tip-num">04</span>
					<div>
						<h3>Think out loud</h3>
						<p>Narrate your reasoning. "I'm adding this check because..." — it invites feedback.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300}>
				<div class="tip">
					<span class="tip-num">05</span>
					<div>
						<h3>Be patient</h3>
						<p>Different skill levels are fine. Pairing is a learning opportunity for both.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={350}>
				<div class="tip">
					<span class="tip-num">06</span>
					<div>
						<h3>Don't pair on everything</h3>
						<p>Save pairing for complex, critical, or learning tasks. Routine work can be solo.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="tip">
					<span class="tip-num">07</span>
					<div>
						<h3>Rotate partners</h3>
						<p>Don't always pair with the same person. Cross-pollinate knowledge across the team.</p>
					</div>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={450}>
				<div class="tip">
					<span class="tip-num">08</span>
					<div>
						<h3>Retrospect</h3>
						<p>After each session, take 2 minutes: what worked? What didn't? Adjust next time.</p>
					</div>
				</div>
			</ScrollReveal>
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
				<div class="summary-card">
					<h3>What</h3>
					<p>Two developers, one workstation. Driver codes, Navigator reviews. Switch regularly.</p>
				</div>
				<div class="summary-card">
					<h3>Why</h3>
					<p>Fewer bugs, better design, knowledge transfer, shared ownership, real-time review.</p>
				</div>
				<div class="summary-card">
					<h3>How</h3>
					<p>Driver–Navigator, Ping-Pong, or Strong-Style. Use a timer. 15–25 min rotations.</p>
				</div>
				<div class="summary-card">
					<h3>When</h3>
					<p>Always: security, payments, core logic, onboarding. Skip: routine, isolated, exploratory.</p>
				</div>
				<div class="summary-card">
					<h3>Session</h3>
					<p>Align on goal, code together, switch roles, break hourly, recap at the end.</p>
				</div>
				<div class="summary-card">
					<h3>Watch Out</h3>
					<p>Fatigue, personality clashes, disengaged navigators, backseat driving.</p>
				</div>
				<div class="summary-card">
					<h3>Safety</h3>
					<p>Pairing requires vulnerability. Build psychological safety first — normalise not-knowing, start low-stakes, celebrate mistakes.</p>
				</div>
				<div class="summary-card">
					<h3>AI</h3>
					<p>Use AI for boilerplate and prototyping. Use human pairs for architecture, security, and shared understanding.</p>
				</div>
				<div class="summary-card">
					<h3>The Human Problem</h3>
					<p>Most teams don't pair because it feels unsafe, not because it doesn't work. Fix the culture, then the process.</p>
				</div>
				<div class="summary-card">
					<h3>Remote</h3>
					<p>VS Code Live Share, good audio, over-communicate, driver's cursor, more breaks.</p>
				</div>
				<div class="summary-card">
					<h3>Mob</h3>
					<p>Whole team, one screen. One driver, many navigators. Rotate every 10–15 min.</p>
				</div>
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
				<div class="source">
					<span class="source-num">1</span>
					<div>
						<a href="https://www.amazon.com/Pair-Programming-Illuminated-Laurie-Williams/dp/0201745763" target="_blank" rel="noopener" class="source-title">Pair Programming Illuminated</a>
						<p class="source-meta">Williams, L. &amp; Kessler, R. (2002). Addison-Wesley Professional.</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">2</span>
					<div>
						<a href="https://collaboration.csc.ncsu.edu/laurie/Papers/XPSardinia.PDF" target="_blank" rel="noopener" class="source-title">The Costs and Benefits of Pair Programming</a>
						<p class="source-meta">Cockburn, A. &amp; Williams, L. (2000). Proceedings of the First International Conference on Extreme Programming (XP2000).</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">3</span>
					<div>
						<a href="https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658" target="_blank" rel="noopener" class="source-title">Extreme Programming Explained: Embrace Change</a>
						<p class="source-meta">Beck, K. (1999, 2nd ed. 2004). Addison-Wesley Professional.</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">4</span>
					<div>
						<a href="https://www.researchgate.net/publication/222408325_The_effectiveness_of_pair_programming_A_meta-analysis" target="_blank" rel="noopener" class="source-title">The Effectiveness of Pair Programming: A Meta-Analysis</a>
						<p class="source-meta">Hannay, J.E., Dyb&aring;, T., Arisholm, E. &amp; Sj&oslash;berg, D.I.K. (2009). Information and Software Technology, 51(7), 1110-1122.</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">5</span>
					<div>
						<a href="https://www.amazon.com/Software-Teaming-Programming-Whole-Team-Approach/dp/B0BLG1QTYK" target="_blank" rel="noopener" class="source-title">Software Teaming: A Mob Programming, Whole-Team Approach</a>
						<p class="source-meta">Zuill, W. &amp; Meadows, K. (2022, 2nd ed.). Originally published on Leanpub (2016).</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">6</span>
					<div>
						<a href="https://martinfowler.com/articles/on-pair-programming.html" target="_blank" rel="noopener" class="source-title">On Pair Programming</a>
						<p class="source-meta">Holdschick, B. &amp; Fowler, M. (2020). martinfowler.com.</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">7</span>
					<div>
						<a href="https://ieeexplore.ieee.org/document/1667588" target="_blank" rel="noopener" class="source-title">Promiscuous Pairing and Beginner's Mind</a>
						<p class="source-meta">Belshee, A. (2005). Agile Development Conference (ADC'05), IEEE.</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">8</span>
					<div>
						<a href="https://www.amazon.com/Fearless-Organization-Psychological-Workplace-Innovation/dp/1119477247" target="_blank" rel="noopener" class="source-title">The Fearless Organization: Creating Psychological Safety in the Workplace</a>
						<p class="source-meta">Edmondson, A.C. (2018). Wiley.</p>
					</div>
				</div>
				<div class="source">
					<span class="source-num">9</span>
					<div>
						<a href="https://rework.withgoogle.com/guides/understanding-team-effectiveness/" target="_blank" rel="noopener" class="source-title">Project Aristotle: Understanding Team Effectiveness</a>
						<p class="source-meta">Google re:Work (2015). Psychological safety as the #1 factor in high-performing teams.</p>
					</div>
				</div>
			</div>
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
	/* ── Base Section Styles ─────────────────────────────────── */
	.section {
		padding: clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 3rem);
	}

	.section-alt {
		background: var(--bg-secondary);
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	h2 {
		font-size: clamp(2rem, 5vw, 3.2rem);
		font-weight: 700;
		line-height: 1.15;
		margin-bottom: 2rem;
		letter-spacing: -0.03em;
	}

	h3 {
		font-size: 1.15rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.lead {
		font-size: clamp(1.15rem, 2.5vw, 1.4rem);
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 650px;
		margin-bottom: 1.5rem;
	}

	.body {
		color: var(--text-secondary);
		max-width: 650px;
		margin-bottom: 2rem;
	}

	.body strong {
		color: var(--text-primary);
	}

	.card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 2rem;
		transition: background 0.3s, border-color 0.3s;
	}

	.card:hover {
		background: var(--bg-card-hover);
		border-color: var(--border-bright);
	}

	.card ul,
	.card ol {
		list-style: none;
		padding: 0;
	}

	.card li {
		position: relative;
		padding-left: 1.2rem;
		margin-bottom: 0.6rem;
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	.card li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--accent);
	}

	.card li strong {
		color: var(--text-primary);
	}

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

	.callout {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.5rem 2rem;
		background: rgba(129, 140, 248, 0.06);
		border: 1px solid rgba(129, 140, 248, 0.15);
		border-radius: var(--radius);
		margin-top: 1rem;
	}

	.callout-icon {
		font-size: 1.5rem;
		color: var(--accent);
		flex-shrink: 0;
		line-height: 1.6;
	}

	.callout p {
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	.callout strong {
		color: var(--text-primary);
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

	/* ── Timeline / Practical Example ────────────────────────── */
	.timeline {
		position: relative;
		margin-top: 2rem;
		padding-left: 2rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(to bottom, var(--accent), var(--border), var(--accent));
		border-radius: 1px;
	}

	.timeline-item {
		position: relative;
		padding: 0 0 2.5rem 2rem;
	}

	.timeline-item::before {
		content: '';
		position: absolute;
		left: -2rem;
		top: 0.4rem;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--accent);
		border: 2px solid var(--bg-secondary);
		transform: translateX(-4px);
	}

	.timeline-item.switch::before {
		background: #facc15;
		box-shadow: 0 0 12px rgba(250, 204, 21, 0.4);
	}

	.timeline-item.done::before {
		background: #34d399;
		box-shadow: 0 0 12px rgba(52, 211, 153, 0.4);
	}

	.timeline-time {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--accent);
		letter-spacing: 0.05em;
		font-variant-numeric: tabular-nums;
		margin-bottom: 0.3rem;
	}

	.timeline-content h3 {
		font-size: 1.05rem;
		margin-bottom: 0.75rem;
	}

	.switch-text {
		color: #facc15;
		font-weight: 500;
		font-size: 0.95rem;
	}

	.dialogue {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.dialogue-line {
		padding: 0.75rem 1rem;
		border-radius: var(--radius-sm);
		background: var(--bg-card);
		border: 1px solid var(--border);
	}

	.dialogue-line p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		font-style: italic;
	}

	.speaker {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 0.2rem;
		display: block;
	}

	.speaker.nav {
		color: #c084fc;
	}

	.speaker.drv {
		color: #818cf8;
	}

	.timeline-insight {
		font-size: 0.85rem;
		font-weight: 500;
		color: #34d399;
		padding: 0.5rem 0;
	}

	.result-callout {
		margin-top: 1rem;
		padding: 1rem 1.25rem;
		background: rgba(52, 211, 153, 0.06);
		border: 1px solid rgba(52, 211, 153, 0.15);
		border-radius: var(--radius-sm);
		font-size: 0.95rem;
		color: var(--text-secondary);
	}

	.result-callout strong {
		color: #34d399;
	}

	.timeline-item.done p {
		color: var(--text-secondary);
	}

	.timeline-item.done p strong {
		color: #34d399;
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

	/* ── Tips ────────────────────────────────────────────────── */
	.tips-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.tip {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		padding: 1.25rem 1.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		transition: border-color 0.3s;
	}

	.tip:hover {
		border-color: var(--border-bright);
	}

	.tip-num {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--accent);
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(129, 140, 248, 0.1);
		border-radius: 6px;
		font-variant-numeric: tabular-nums;
	}

	.tip h3 {
		font-size: 1rem;
		margin-bottom: 0.2rem;
	}

	.tip p {
		font-size: 0.9rem;
		color: var(--text-secondary);
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

	.key-takeaway {
		text-align: center;
		padding: 3rem 2rem;
		background: rgba(129, 140, 248, 0.04);
		border: 1px solid rgba(129, 140, 248, 0.12);
		border-radius: var(--radius);
	}

	.key-takeaway p {
		font-size: clamp(1rem, 2vw, 1.2rem);
		color: var(--text-secondary);
		line-height: 1.8;
		max-width: 600px;
		margin: 0 auto;
	}

	.key-takeaway strong {
		color: var(--text-primary);
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
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

	/* ── Origin Scroll Section ──────────────────────────────── */
	.origin-scroll {
		position: relative;
		height: 300vh;
	}

	.origin-sticky {
		position: sticky;
		top: 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 4rem 0;
	}

	.origin-phase {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.5s ease, transform 0.5s ease;
		position: absolute;
		width: 100%;
		pointer-events: none;
	}

	.origin-phase.origin-visible {
		opacity: 1;
		transform: translateY(0);
		position: relative;
		pointer-events: auto;
	}

	.origin-portraits {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	.origin-portrait {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.origin-portrait img {
		width: 100%;
		max-width: 180px;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		filter: grayscale(0.3);
		transition: filter 0.3s ease;
	}

	.origin-portrait img:hover {
		filter: grayscale(0);
	}

	.origin-portrait span {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.origin-bullets {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.origin-bullets li {
		padding: 0.75rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.origin-portraits {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}

		.origin-portrait img {
			max-width: 140px;
		}
	}

	/* ── Era Tag (History Section) ───────────────────────────── */
	.era-tag {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		background: rgba(251, 146, 60, 0.05);
		border: 1px solid rgba(251, 146, 60, 0.15);
		border-radius: var(--radius);
		margin-top: 1rem;
	}

	.era-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #fb923c;
		flex-shrink: 0;
		box-shadow: 0 0 12px rgba(251, 146, 60, 0.4);
	}

	.era-tag p {
		color: var(--text-secondary);
		font-size: 0.95rem;
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
