<script lang="ts">
	let rating = $state(0);
	let hovered = $state(0);
	let feedbackText = $state('');
	let submitting = $state(false);
	let submitted = $state(false);
	let errorMsg = $state('');

	async function submit() {
		if (rating === 0 || submitting) return;
		submitting = true;
		errorMsg = '';

		try {
			const res = await fetch('/api/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					rating,
					feedback_text: feedbackText || null
				})
			});

			if (!res.ok) {
				const data = await res.json();
				errorMsg = data.error || 'Something went wrong';
				return;
			}

			submitted = true;
		} catch {
			errorMsg = 'Network error — please try again';
		} finally {
			submitting = false;
		}
	}
</script>

{#if submitted}
	<div class="thank-you">
		<svg class="thank-you-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		<p class="thank-you-title">Thank you for your feedback!</p>
		<p class="thank-you-sub">Your response has been recorded.</p>
	</div>
{:else}
	<div class="feedback-card">
		<div class="stars" role="radiogroup" aria-label="Rating">
			{#each [1, 2, 3, 4, 5] as star}
				<button
					class="star"
					class:filled={star <= (hovered || rating)}
					aria-label="{star} star{star > 1 ? 's' : ''}"
					onmouseenter={() => hovered = star}
					onmouseleave={() => hovered = 0}
					onclick={() => rating = star}
				>
					<svg viewBox="0 0 24 24" width="36" height="36">
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
					</svg>
				</button>
			{/each}
		</div>

		<textarea
			class="feedback-textarea"
			placeholder="What was most useful? What could be better?"
			bind:value={feedbackText}
			rows="4"
			maxlength="2000"
		></textarea>

		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}

		<button class="btn-primary" onclick={submit} disabled={rating === 0 || submitting}>
			{submitting ? 'Sending...' : 'Send Feedback'}
		</button>
	</div>
{/if}

<style>
	.feedback-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		max-width: 520px;
		margin: 0 auto;
	}

	.stars {
		display: flex;
		gap: 0.5rem;
	}

	.star {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		transition: transform 0.15s;
		color: rgba(255, 255, 255, 0.2);
	}

	.star:hover {
		transform: scale(1.15);
	}

	.star svg {
		display: block;
		fill: currentColor;
		stroke: none;
	}

	.star.filled {
		color: #facc15;
	}

	.feedback-textarea {
		width: 100%;
		padding: 0.85rem 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text);
		font-family: var(--font);
		font-size: 0.95rem;
		line-height: 1.5;
		resize: vertical;
		transition: border-color 0.2s;
	}

	.feedback-textarea::placeholder {
		color: var(--text-secondary);
		opacity: 0.6;
	}

	.feedback-textarea:focus {
		outline: none;
		border-color: var(--accent);
	}

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

	.error {
		color: #f87171;
		font-size: 0.9rem;
	}

	.thank-you {
		text-align: center;
		padding: 2rem 0;
	}

	.thank-you-icon {
		width: 48px;
		height: 48px;
		color: #4ade80;
		margin-bottom: 1rem;
	}

	.thank-you-title {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.thank-you-sub {
		color: var(--text-secondary);
		font-size: 0.95rem;
	}
</style>
