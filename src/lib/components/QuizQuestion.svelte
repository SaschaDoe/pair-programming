<script lang="ts">
	import type { QuizQuestion, AnswerChoice } from '$lib/types';

	const displayLabels = ['a', 'b', 'c', 'd'];

	let {
		question,
		selectedAnswer,
		onSelect
	}: {
		question: QuizQuestion;
		selectedAnswer: AnswerChoice | undefined;
		onSelect: (answer: AnswerChoice) => void;
	} = $props();
</script>

<div class="quiz-question">
	<span class="question-number">{question.id} / 18</span>
	<h2 class="question-text">{question.text}</h2>
	<div class="options">
		{#each question.options as option, i}
			<button
				class="option"
				class:selected={selectedAnswer === option.key}
				onclick={() => onSelect(option.key)}
			>
				<span class="option-key">{displayLabels[i]}</span>
				<span class="option-text">{option.text}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.quiz-question {
		max-width: 700px;
		margin: 0 auto;
	}

	.question-number {
		display: inline-block;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent);
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
	}

	.question-text {
		font-size: clamp(1.2rem, 3vw, 1.6rem);
		font-weight: 600;
		line-height: 1.4;
		color: var(--text-primary);
		margin-bottom: 2rem;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.option {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		font-family: var(--font);
		font-size: 0.95rem;
		line-height: 1.5;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.option:hover {
		border-color: var(--border-bright);
		background: var(--bg-card-hover);
	}

	.option.selected {
		border-color: var(--accent);
		background: rgba(129, 140, 248, 0.08);
	}

	.option-key {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--gradient);
		color: white;
		font-weight: 700;
		font-size: 0.8rem;
		flex-shrink: 0;
		text-transform: uppercase;
	}

	.option-text {
		padding-top: 2px;
	}
</style>
