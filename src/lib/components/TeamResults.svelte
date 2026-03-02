<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { quizQuestions } from '$lib/data/quizQuestions';
	import type { AnswerChoice } from '$lib/types';

	type Stats = Record<string, Record<string, number>>;

	let stats = $state<Stats | null>(null);
	let responseCount = $state(0);
	let loading = $state(true);

	const answerLabels: Record<AnswerChoice, string> = {
		a: 'Safe',
		b: 'Mostly comfortable',
		c: 'Some discomfort',
		d: 'Significant anxiety'
	};

	const overallPct = $derived.by(() => {
		if (!stats) return { a: 0, b: 0, c: 0, d: 0 };
		let totals = { a: 0, b: 0, c: 0, d: 0 };
		for (const qStats of Object.values(stats)) {
			for (const [key, count] of Object.entries(qStats)) {
				totals[key as AnswerChoice] += count;
			}
		}
		const total = Object.values(totals).reduce((s, v) => s + v, 0);
		if (total === 0) return { a: 0, b: 0, c: 0, d: 0 };
		return {
			a: Math.round((totals.a / total) * 100),
			b: Math.round((totals.b / total) * 100),
			c: Math.round((totals.c / total) * 100),
			d: Math.round((totals.d / total) * 100)
		};
	});

	$effect(() => {
		loadResults();
	});

	async function loadResults() {
		const { data, error } = await supabase
			.from('quiz_responses')
			.select('answers');

		if (data && !error) {
			responseCount = data.length;
			const computed: Stats = {};
			for (let q = 1; q <= 18; q++) {
				computed[String(q)] = { a: 0, b: 0, c: 0, d: 0 };
			}
			for (const response of data) {
				const answers = response.answers as Record<string, string>;
				for (const [qId, answer] of Object.entries(answers)) {
					if (computed[qId] && computed[qId][answer] !== undefined) {
						computed[qId][answer]++;
					}
				}
			}
			stats = computed;
		}
		loading = false;
	}

	function getPct(qId: string, key: string): number {
		if (!stats || !stats[qId] || responseCount === 0) return 0;
		const qTotal = Object.values(stats[qId]).reduce((s, v) => s + v, 0);
		return qTotal > 0 ? Math.round((stats[qId][key] / qTotal) * 100) : 0;
	}
</script>

{#if loading}
	<div class="team-loading">
		<p>Loading results...</p>
	</div>
{:else if responseCount > 0 && stats}
	<div class="team-results">
		<p class="response-count">
			Based on <strong>{responseCount}</strong> {responseCount === 1 ? 'response' : 'responses'}
		</p>

		<!-- Overall distribution -->
		<div class="overall">
			<h3 class="section-label">Overall Distribution</h3>
			<div class="stacked-bar">
				{#each (['a', 'b', 'c', 'd'] as const) as key}
					{#if overallPct[key] > 0}
						<div
							class="bar-segment bar-{key}"
							style="width: {overallPct[key]}%"
							title="{answerLabels[key]}: {overallPct[key]}%"
						>
							{#if overallPct[key] >= 8}
								<span class="bar-label">{overallPct[key]}%</span>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
			<div class="legend">
				{#each (['a', 'b', 'c', 'd'] as const) as key}
					<div class="legend-item">
						<span class="legend-dot dot-{key}"></span>
						<span>{answerLabels[key]}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Per-question bars -->
		<div class="per-question">
			<h3 class="section-label">General Psychological Safety</h3>
			{#each quizQuestions.filter(q => q.section === 'general') as q}
				<div class="q-row">
					<p class="q-text"><span class="q-num">{q.id}.</span> {q.text}</p>
					<div class="mini-bar">
						{#each (['a', 'b', 'c', 'd'] as const) as key}
							{@const pct = getPct(String(q.id), key)}
							{#if pct > 0}
								<div
									class="bar-segment bar-{key}"
									style="width: {pct}%"
									title="{key}: {pct}%"
								></div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}

			<h3 class="section-label" style="margin-top: 2rem;">Pair Programming</h3>
			{#each quizQuestions.filter(q => q.section === 'pairing') as q}
				<div class="q-row">
					<p class="q-text"><span class="q-num">{q.id}.</span> {q.text}</p>
					<div class="mini-bar">
						{#each (['a', 'b', 'c', 'd'] as const) as key}
							{@const pct = getPct(String(q.id), key)}
							{#if pct > 0}
								<div
									class="bar-segment bar-{key}"
									style="width: {pct}%"
									title="{key}: {pct}%"
								></div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="cta">
			<a href="/quiz" class="cta-link">Take the Quiz Yourself</a>
		</div>
	</div>
{:else}
	<div class="team-empty">
		<p>No responses yet. Be the first!</p>
		<a href="/quiz" class="cta-link">Take the Quiz</a>
	</div>
{/if}

<style>
	.team-loading,
	.team-empty {
		text-align: center;
		padding: 2rem;
		color: var(--text-muted);
	}

	.team-results {
		margin-top: 1.5rem;
	}

	.response-count {
		color: var(--text-secondary);
		font-size: 0.95rem;
		margin-bottom: 2rem;
	}

	.section-label {
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	/* Stacked bar */
	.stacked-bar,
	.mini-bar {
		display: flex;
		height: 32px;
		border-radius: var(--radius-sm);
		overflow: hidden;
		background: var(--bg-card);
	}

	.mini-bar {
		height: 8px;
		margin-top: 0.4rem;
	}

	.bar-segment {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
		min-width: 0;
	}

	.bar-a { background: #34d399; }
	.bar-b { background: #facc15; }
	.bar-c { background: #fb923c; }
	.bar-d { background: #ef4444; }

	.bar-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: #1a1a1a;
		white-space: nowrap;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.75rem;
		margin-bottom: 2.5rem;
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.dot-a { background: #34d399; }
	.dot-b { background: #facc15; }
	.dot-c { background: #fb923c; }
	.dot-d { background: #ef4444; }

	/* Per-question rows */
	.q-row {
		margin-bottom: 1rem;
	}

	.q-text {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.q-num {
		color: var(--text-muted);
		font-weight: 600;
	}

	/* CTA */
	.cta {
		text-align: center;
		margin-top: 2.5rem;
	}

	.cta-link {
		display: inline-block;
		padding: 0.75rem 1.75rem;
		background: var(--gradient);
		border-radius: var(--radius-sm);
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.95rem;
		transition: opacity 0.2s, transform 0.2s;
	}

	.cta-link:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}
</style>
