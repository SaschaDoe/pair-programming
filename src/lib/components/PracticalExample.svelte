<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">In Practice</p>
			<h2>A Real Example</h2>
		</ScrollReveal>
		<ScrollReveal delay={100}>
			<p class="lead">A pairing session: building a login form. Here's how it actually unfolds.</p>
		</ScrollReveal>

		<div class="timeline">
			<ScrollReveal delay={200}>
				<div class="timeline-item">
					<div class="timeline-time">0:00</div>
					<div class="timeline-content">
						<h3>Quick alignment</h3>
						<div class="dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"Before you start — should we validate on blur or on submit? I've been burned by over-eager inline errors before."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"Good point. On blur — but only show the error after the first submit attempt."</p>
							</div>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={300}>
				<div class="timeline-item">
					<div class="timeline-time">0:05</div>
					<div class="timeline-content">
						<h3>Coding — Navigator keeps the bigger picture</h3>
						<div class="dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"The input's missing an <code>aria-label</code> — screenreaders won't know what this field is."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"Good catch, I was focused on the type. Adding it now."</p>
							</div>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={400}>
				<div class="timeline-item">
					<div class="timeline-time">0:12</div>
					<div class="timeline-content">
						<h3>A design disagreement</h3>
						<div class="dialogue">
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"I'm going to validate the email on every keystroke."</p>
							</div>
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"That'll hammer the API. What if we debounce — 300ms? I can look up the exact syntax while you keep typing."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"Yeah, that's better. Paste it when you have it."</p>
							</div>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={500}>
				<div class="timeline-item switch">
					<div class="timeline-time">0:25</div>
					<div class="timeline-content">
						<h3>Role switch — and the real knowledge transfer begins</h3>
						<p class="switch-text">Timer rings. They swap keyboard.</p>
						<div class="dialogue switch-dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Former Driver (now Navigator)</span>
								<p>"Hey — I saw you used <kbd>Ctrl+D</kbd> to select that pattern a few times. Did you know you can <kbd>Alt+Click</kbd> for multi-cursor and do all five at once?"</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Former Navigator (now Driver)</span>
								<p>"No way, I never used that. Show me after. — Also, while I was watching: that validation logic is going to end up in three places. Can I extract it into a custom hook while I drive?"</p>
							</div>
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Former Driver (now Navigator)</span>
								<p>"Do it. And name it <code>useLoginValidation</code>, not <code>useForm</code> — we'll have other forms."</p>
							</div>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={600}>
				<div class="timeline-item">
					<div class="timeline-time">0:30</div>
					<div class="timeline-content">
						<h3>Fresh eyes catch what familiarity missed</h3>
						<div class="dialogue">
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"What happens if the server returns a 429? We have no retry logic."</p>
							</div>
							<div class="dialogue-line driver-line">
								<span class="speaker drv">Driver</span>
								<p>"I would have shipped that gap solo. Adding exponential backoff — I've got a utility for that already."</p>
							</div>
							<div class="dialogue-line navigator-line">
								<span class="speaker nav">Navigator</span>
								<p>"Perfect. And cap it at 3 retries so we don't silently loop forever."</p>
							</div>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={700}>
				<div class="timeline-item done">
					<div class="timeline-time">0:45</div>
					<div class="timeline-content">
						<h3>Done</h3>
						<p>Login form shipped — accessible, debounced, with retry logic and a clean hook. The navigator learned a multi-cursor shortcut. The driver got a naming convention and a refactoring idea they carried into the next feature.</p>
					</div>
				</div>
			</ScrollReveal>
		</div>
	</div>
</section>

<style>
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
		margin-bottom: 0.75rem;
	}

	.dialogue {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.switch-dialogue {
		margin-top: 0.75rem;
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
		margin: 0;
	}

	.dialogue-line code,
	.dialogue-line kbd {
		font-style: normal;
		font-family: monospace;
		font-size: 0.82rem;
		background: rgba(255,255,255,0.07);
		padding: 0.1em 0.35em;
		border-radius: 4px;
		border: 1px solid var(--border);
		color: var(--text-primary);
	}

	.speaker {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 0.35rem;
		display: block;
	}

	.speaker.nav { color: #c084fc; }
	.speaker.drv { color: #818cf8; }

	.timeline-item.done p {
		color: var(--text-secondary);
		font-size: 0.95rem;
		line-height: 1.65;
	}

	.timeline-item.done p strong {
		color: #34d399;
	}
</style>
