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
</style>
