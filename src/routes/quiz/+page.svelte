<script lang="ts">
	import { quizQuestions, sectionIntros } from '$lib/data/quizQuestions';
	import QuizQuestion from '$lib/components/QuizQuestion.svelte';
	import type { AnswerChoice, QuizAnswers, QuizQuestion as QType } from '$lib/types';

	function shuffleArray<T>(arr: T[]): T[] {
		const shuffled = [...arr];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	// Shuffle option order per question once per session
	const shuffledQuestions: QType[] = quizQuestions.map(q => ({
		...q,
		options: shuffleArray(q.options)
	}));

	let currentIndex = $state(0);
	let answers: QuizAnswers = $state({});
	let submitted = $state(false);
	let submitting = $state(false);
	let alias = $state('');
	let showSectionIntro = $state(true);

	const currentQuestion = $derived(shuffledQuestions[currentIndex]);
	const progress = $derived(((currentIndex) / quizQuestions.length) * 100);
	const allAnswered = $derived(Object.keys(answers).length === quizQuestions.length);
	const isLastQuestion = $derived(currentIndex === quizQuestions.length - 1);
	const isFirstQuestion = $derived(currentIndex === 0);

	// Count answer types for results
	const answerCounts = $derived.by(() => {
		const counts = { a: 0, b: 0, c: 0, d: 0 };
		for (const answer of Object.values(answers)) {
			counts[answer]++;
		}
		return counts;
	});

	const dominantAnswer = $derived.by(() => {
		const entries = Object.entries(answerCounts) as [AnswerChoice, number][];
		entries.sort((a, b) => b[1] - a[1]);
		return entries[0][0];
	});

	function selectAnswer(answer: AnswerChoice) {
		answers[String(currentQuestion.id)] = answer;
		if (!isLastQuestion) {
			setTimeout(() => {
				currentIndex++;
				checkSectionIntro();
			}, 300);
		}
	}

	function checkSectionIntro() {
		if (currentIndex === 10 && quizQuestions[currentIndex].section === 'pairing') {
			showSectionIntro = true;
		}
	}

	function goNext() {
		if (!isLastQuestion && answers[String(currentQuestion.id)]) {
			currentIndex++;
			checkSectionIntro();
		}
	}

	function goPrev() {
		if (!isFirstQuestion) {
			currentIndex--;
			showSectionIntro = false;
		}
	}

	function dismissIntro() {
		showSectionIntro = false;
	}

	async function submitQuiz() {
		if (!allAnswered || submitting) return;
		submitting = true;
		try {
			const res = await fetch('/api/quiz', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					alias: alias.trim() || null,
					answers
				})
			});
			if (res.ok) {
				submitted = true;
			}
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Psychological Safety Quiz — Pair Programming Guide</title>
	<meta name="description" content="How safe do you really feel when you code with others? Take this anonymous quiz." />
</svelte:head>

<div class="quiz-page">
	<div class="quiz-progress" style="width: {progress}%"></div>

	<a href="/" class="back-link">Back to Guide</a>

	{#if submitted}
		<!-- Results -->
		<div class="results">
			<h1 class="results-title">Your Answers</h1>
			<p class="results-subtitle">Here's your pattern.</p>

			<div class="results-bars">
				{#each (['a', 'b', 'c', 'd'] as const) as key}
					{@const count = answerCounts[key]}
					{@const pct = Math.round((count / 18) * 100)}
					<div class="result-row">
						<span class="result-key result-key-{key}">{key}</span>
						<div class="result-bar-track">
							<div class="result-bar result-bar-{key}" style="width: {pct}%"></div>
						</div>
						<span class="result-count">{count} / 18</span>
					</div>
				{/each}
			</div>

			<div class="result-legend">
				<div class="legend-item"><span class="legend-dot legend-a"></span> Psychologically safe</div>
				<div class="legend-item"><span class="legend-dot legend-b"></span> Mostly comfortable</div>
				<div class="legend-item"><span class="legend-dot legend-c"></span> Some discomfort</div>
				<div class="legend-item"><span class="legend-dot legend-d"></span> Significant anxiety</div>
			</div>

			<div class="reflection">
				<p>This isn't a test with right or wrong answers.</p>
				<p>
					{#if dominantAnswer === 'a'}
						You tend to feel safe in collaborative settings. That's a strength — and also something you can help create for others.
					{:else if dominantAnswer === 'b'}
						You're mostly comfortable, but there's a layer of self-consciousness underneath. That's completely normal.
					{:else if dominantAnswer === 'c'}
						You experience real discomfort in collaborative coding situations. That doesn't mean something is wrong with you — it means you're human, working in a profession that constantly asks you to perform your thinking in public.
					{:else}
						You feel significant anxiety around collaborative coding. That takes courage to admit. Programming is one of the only jobs where your thought process becomes an artifact that others inspect, critique, and rewrite.
					{/if}
				</p>
				<p>
					Pair programming asks you to <strong>share your doubt, your confusion, your half-baked ideas, and your mistakes — in real time, with no edit button.</strong>
				</p>
				<p>
					The real question isn't <em>"how good of a programmer are you?"</em><br />
					It's: <strong>"Do you feel safe enough to be bad at something in front of someone else?"</strong>
				</p>
				<p>Because that's where all the learning happens.</p>
				<p class="quote">
					"Vulnerability is not winning or losing; it's having the courage to show up and be seen when we have no control over the outcome." — Brene Brown
				</p>
			</div>

		</div>

	{:else if showSectionIntro && (currentIndex === 0 || currentIndex === 10)}
		<!-- Section intro -->
		{@const intro = currentIndex === 0 ? sectionIntros.general : sectionIntros.pairing}
		<div class="section-intro">
			<h1 class="intro-title">{intro.title}</h1>
			<p class="intro-subtitle">{intro.subtitle}</p>
			<button class="btn-primary" onclick={dismissIntro}>
				{currentIndex === 0 ? 'Begin' : 'Continue'}
			</button>
		</div>

	{:else if allAnswered && isLastQuestion}
		<!-- Submit screen -->
		<div class="submit-screen">
			<h1 class="submit-title">Almost done.</h1>
			<p class="submit-subtitle">You've answered all 18 questions. You can add an optional name before submitting.</p>

			<div class="alias-field">
				<label for="alias">Name or alias <span class="optional">(optional)</span></label>
				<input
					id="alias"
					type="text"
					bind:value={alias}
					placeholder="Anonymous"
					maxlength="50"
				/>
			</div>

			<p class="privacy-note">Your answers are stored anonymously. The alias is just for display on the results page.</p>

			<button class="btn-primary" onclick={submitQuiz} disabled={submitting}>
				{submitting ? 'Submitting...' : 'Submit My Answers'}
			</button>
		</div>

	{:else}
		<!-- Question -->
		<div class="question-container">
			<QuizQuestion
				question={currentQuestion}
				selectedAnswer={answers[String(currentQuestion.id)]}
				onSelect={selectAnswer}
			/>

			<div class="nav-buttons">
				<button class="btn-nav" onclick={goPrev} disabled={isFirstQuestion}>
					Previous
				</button>
				<button
					class="btn-nav btn-nav-next"
					onclick={goNext}
					disabled={!answers[String(currentQuestion.id)]}
				>
					Next
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.quiz-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem);
		position: relative;
	}

	.quiz-progress {
		position: fixed;
		top: 0;
		left: 0;
		height: 2px;
		background: var(--gradient);
		z-index: 1000;
		transition: width 0.3s ease;
	}

	.back-link {
		position: fixed;
		top: 1.5rem;
		left: 1.5rem;
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.85rem;
		transition: color 0.2s;
		z-index: 100;
	}

	.back-link:hover {
		color: var(--text-secondary);
	}

	/* Section Intro */
	.section-intro {
		text-align: center;
		max-width: 600px;
	}

	.intro-title {
		font-size: clamp(1.5rem, 4vw, 2.2rem);
		font-weight: 700;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}

	.intro-subtitle {
		color: var(--text-secondary);
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2.5rem;
		font-style: italic;
	}

	/* Question Container */
	.question-container {
		width: 100%;
		max-width: 700px;
	}

	.nav-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
		gap: 1rem;
	}

	.btn-nav {
		padding: 0.6rem 1.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-family: var(--font);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-nav:hover:not(:disabled) {
		border-color: var(--border-bright);
		color: var(--text-primary);
	}

	.btn-nav:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.btn-nav-next {
		margin-left: auto;
	}

	/* Submit Screen */
	.submit-screen {
		text-align: center;
		max-width: 500px;
	}

	.submit-title {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		margin-bottom: 0.75rem;
	}

	.submit-subtitle {
		color: var(--text-secondary);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.alias-field {
		margin-bottom: 1rem;
		text-align: left;
	}

	.alias-field label {
		display: block;
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	.optional {
		color: var(--text-muted);
	}

	.alias-field input {
		width: 100%;
		padding: 0.75rem 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		font-family: var(--font);
		font-size: 1rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.alias-field input:focus {
		border-color: var(--accent);
	}

	.alias-field input::placeholder {
		color: var(--text-muted);
	}

	.privacy-note {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 2rem;
	}

	/* Primary Button */
	.btn-primary {
		display: inline-block;
		padding: 0.85rem 2rem;
		background: var(--gradient);
		border: none;
		border-radius: var(--radius-sm);
		color: white;
		font-family: var(--font);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		transition: opacity 0.2s, transform 0.2s;
	}

	.btn-primary:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	/* Results */
	.results {
		max-width: 600px;
		width: 100%;
	}

	.results-title {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.results-subtitle {
		color: var(--text-secondary);
		margin-bottom: 2rem;
	}

	.results-bars {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.result-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.result-key {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.8rem;
		color: white;
		flex-shrink: 0;
		text-transform: uppercase;
	}

	.result-key-a { background: #34d399; }
	.result-key-b { background: #facc15; color: #1a1a1a; }
	.result-key-c { background: #fb923c; }
	.result-key-d { background: #ef4444; }

	.result-bar-track {
		flex: 1;
		height: 10px;
		background: var(--bg-card);
		border-radius: 5px;
		overflow: hidden;
	}

	.result-bar {
		height: 100%;
		border-radius: 5px;
		transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.result-bar-a { background: #34d399; }
	.result-bar-b { background: #facc15; }
	.result-bar-c { background: #fb923c; }
	.result-bar-d { background: #ef4444; }

	.result-count {
		font-size: 0.85rem;
		color: var(--text-muted);
		min-width: 50px;
		text-align: right;
	}

	.result-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2.5rem;
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.legend-a { background: #34d399; }
	.legend-b { background: #facc15; }
	.legend-c { background: #fb923c; }
	.legend-d { background: #ef4444; }

	.reflection {
		padding: 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		margin-bottom: 2rem;
	}

	.reflection p {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	.reflection p:last-child {
		margin-bottom: 0;
	}

	.reflection .quote {
		font-style: italic;
		color: var(--text-muted);
		border-left: 2px solid var(--accent);
		padding-left: 1rem;
		margin-top: 1.5rem;
	}
</style>
