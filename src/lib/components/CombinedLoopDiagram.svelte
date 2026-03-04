<script lang="ts">
	const reviewTopics = [
		{ label: 'Functional Correctness', icon: '&#x2713;' },
		{ label: 'Non-functional Requirements', icon: '&#x26A1;' },
		{ label: 'Edge Cases', icon: '&#x26A0;' },
		{ label: 'Tests', icon: '&#x1F9EA;' },
		{ label: 'Architecture', icon: '&#x1F3DB;' },
		{ label: 'Complexity', icon: '&#x1F9E9;' },
		{ label: 'Abstractions', icon: '&#x1F4E6;' },
		{ label: 'DRY', icon: '&#x267B;' },
		{ label: 'Readability', icon: '&#x1F4D6;' },
		{ label: 'Code Style Guide', icon: '&#x1F3A8;' },
		{ label: 'Integration Issues', icon: '&#x1F517;' },
	];
</script>

<div class="cl-wrap">
	<div class="cl-diagram">
		<div class="cl-track">
			<svg viewBox="-50 0 500 380" class="cl-svg">
				<!-- Main big loop track (indigo) — same path as slow loop -->
				<path
					d="M 200 90 C 310 70, 340 130, 340 190 C 340 250, 310 300, 270 315 C 230 330, 170 330, 130 315 C 90 300, 60 250, 60 190 C 60 130, 90 70, 200 90"
					fill="none" stroke="rgba(129,140,248,0.12)" stroke-width="22" stroke-linecap="round"
				/>

				<!-- Small green loop at Write Code position -->
				<circle cx="200" cy="90" r="22" fill="none" stroke="rgba(16,185,129,0.12)" stroke-width="22"/>

				<!-- Hidden motion path: 3 sub-loops through green circle + main loop -->
				<path
					id="cl-combined-motion"
					d="M 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 C 290 50, 340 120, 340 190 C 340 255, 310 300, 270 315 C 230 330, 170 330, 130 315 C 90 300, 60 250, 60 190 C 60 120, 100 55, 200 68"
					fill="none" stroke="none"
				/>

				<!-- Stage labels -->
				<text x="200" y="42" fill="#10b981" font-size="13" text-anchor="middle" font-weight="700">Get Feedback</text>
				<text x="200" y="130" fill="#a1a1aa" font-size="13" text-anchor="middle" font-weight="700">Write Code</text>
				<text x="358" y="195" fill="#a1a1aa" font-size="13" text-anchor="start" font-weight="600">Commit</text>
				<text x="285" y="340" fill="#a1a1aa" font-size="13" text-anchor="start" font-weight="600">Open PR</text>
				<text x="115" y="340" fill="#a1a1aa" font-size="13" text-anchor="end" font-weight="600">Wait for Review</text>
				<text x="42" y="190" fill="#818cf8" font-size="13" text-anchor="end" font-weight="700">Get Feedback</text>
				<text x="42" y="206" fill="#818cf8" font-size="11" text-anchor="end" font-weight="500">(Code Review)</text>

				<!-- Single dot: loops green circle 3x then goes around big loop -->
				<circle r="7" fill="#818cf8" filter="drop-shadow(0 0 6px rgba(129,140,248,0.6))">
					<animateMotion dur="10s" repeatCount="indefinite">
						<mpath href="#cl-combined-motion"/>
					</animateMotion>
				</circle>
			</svg>
		</div>
	</div>

	<!-- Explanation -->
	<div class="cl-explanation">
		<p class="cl-insight">
			The small loop catches the basics &mdash; freeing the big review to focus on what <strong>actually matters</strong>:
		</p>
	</div>

	<!-- Review topics as tags -->
	<div class="cl-topics">
		{#each reviewTopics as topic, i}
			<div class="cl-topic" style="--topic-delay: {i * 60}ms;">
				<span class="cl-topic-icon">{@html topic.icon}</span>
				<span>{topic.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.cl-wrap {
		margin: 2rem 0 1rem;
	}

	/* ── Diagram ───────────────────────────────────────── */
	.cl-diagram {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.cl-track {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.cl-svg {
		width: 100%;
		max-width: 400px;
		display: block;
	}

	/* ── Explanation ────────────────────────────────────── */
	.cl-explanation {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.cl-insight {
		font-size: 1.05rem;
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}

	/* ── Topics Grid ───────────────────────────────────── */
	.cl-topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		justify-content: center;
	}

	.cl-topic {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.85rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 100px;
		font-size: 0.85rem;
		color: var(--text-secondary);
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		opacity: 0;
		animation: cl-topic-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) var(--topic-delay) forwards;
	}

	.cl-topic:hover {
		border-color: #818cf8;
		color: var(--text-primary);
		background: rgba(129, 140, 248, 0.08);
		transform: translateY(-2px);
	}

	.cl-topic-icon {
		font-size: 0.9rem;
		line-height: 1;
	}

	@keyframes cl-topic-in {
		0% { opacity: 0; transform: translateY(8px); }
		100% { opacity: 1; transform: translateY(0); }
	}

	/* ── Mobile ────────────────────────────────────────── */
	@media (max-width: 480px) {
		.cl-topic {
			font-size: 0.8rem;
			padding: 0.35rem 0.7rem;
		}

		.cl-insight {
			font-size: 0.95rem;
		}
	}

	/* ── Reduced motion ────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.cl-topic {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
