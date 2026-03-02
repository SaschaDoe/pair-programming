<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Pair Programming Guide</title>
</svelte:head>

<div class="error-page">
	<div class="error-content">
		<div class="error-code">{page.status}</div>
		<div class="error-divider"></div>
		<h1 class="error-title">
			{#if page.status === 404}
				Page Not Found
			{:else}
				Something Went Wrong
			{/if}
		</h1>
		<p class="error-message">
			{#if page.status === 404}
				This wouldn't have happened if we'd used pair programming.
			{:else}
				{page.error?.message ?? 'An unexpected error occurred.'}
			{/if}
		</p>
		<p class="error-sub">
			{#if page.status === 404}
				One of us would've caught the typo. The other would've checked the link.
				<br />But here we are. Alone. On a 404 page.
			{/if}
		</p>

		<div class="error-visual">
			<div class="desk">
				<div class="monitor">
					<span class="screen-text">???</span>
				</div>
				<div class="chair chair-left">
					<span class="person">D</span>
				</div>
				<div class="chair chair-right empty">
					<span class="ghost">N</span>
				</div>
			</div>
			<p class="visual-caption">The navigator left. This is what happens.</p>
		</div>

		<a href="/" class="error-btn">Back to the Guide</a>
	</div>
</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
	}

	.error-content {
		max-width: 520px;
	}

	.error-code {
		font-size: clamp(5rem, 15vw, 8rem);
		font-weight: 800;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
	}

	.error-divider {
		width: 60px;
		height: 2px;
		background: var(--gradient);
		margin: 1.5rem auto;
	}

	.error-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.error-message {
		font-size: 1.15rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	.error-sub {
		font-size: 0.95rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 2.5rem;
	}

	/* Visual: empty pair station */
	.error-visual {
		margin: 2rem auto 2.5rem;
		padding: 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.desk {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.monitor {
		width: 80px;
		height: 56px;
		background: var(--bg-secondary);
		border: 2px solid var(--border-bright);
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.screen-text {
		font-size: 1.2rem;
		color: var(--text-muted);
		font-weight: 700;
	}

	.chair {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1rem;
	}

	.chair-left {
		background: var(--gradient);
		color: white;
	}

	.chair-right.empty {
		border: 2px dashed var(--text-muted);
		background: transparent;
	}

	.person {
		animation: none;
	}

	.ghost {
		color: var(--text-muted);
		opacity: 0.4;
		animation: fade-ghost 2s ease-in-out infinite;
	}

	@keyframes fade-ghost {
		0%, 100% { opacity: 0.15; }
		50% { opacity: 0.5; }
	}

	.visual-caption {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-style: italic;
	}

	.error-btn {
		display: inline-block;
		padding: 0.85rem 2rem;
		background: var(--gradient);
		border-radius: var(--radius-sm);
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: opacity 0.2s, transform 0.2s;
	}

	.error-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}
</style>
