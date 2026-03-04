<script lang="ts">
	import { expertiseLayers } from '$lib/data/presentationContent';

	let activeLevel = $state(-1);

	let visibleLayers = $derived(
		expertiseLayers.filter((_, i) => i <= activeLevel)
	);

	function toggleLayer(index: number) {
		activeLevel = activeLevel === index ? -1 : index;
	}
</script>

<div class="ef-wrap">
	<!-- Formula -->
	<div class="ef-formula">
		<div class="ef-numerator">
			{#each expertiseLayers as layer, i}
				{#if i > 0}
					<span class="ef-plus">+</span>
				{/if}
				<button
					class="ef-term"
					class:ef-term-active={i <= activeLevel}
					class:ef-term-current={i === activeLevel}
					style="--layer-color: {layer.color}; --layer-color-faded: {layer.colorFaded};"
					onclick={() => toggleLayer(i)}
					aria-expanded={i <= activeLevel}
					aria-controls="ef-detail-{layer.id}"
				>
					{layer.title}
				</button>
			{/each}
		</div>
		<div class="ef-fraction-bar"></div>
		<div class="ef-denominator">Content Size</div>
	</div>

	<!-- Hint -->
	{#if activeLevel === -1}
		<p class="ef-hint">
			<span class="ef-hint-arrow">&uarr;</span>
			Click the terms above
		</p>
	{/if}

	<!-- Detail panels -->
	{#if activeLevel >= 0}
		<div class="ef-details">
			{#each visibleLayers as layer, i (layer.id)}
				<div
					class="ef-layer-card"
					id="ef-detail-{layer.id}"
					style="--layer-color: {layer.color}; --layer-color-faded: {layer.colorFaded}; --stagger: {i * 80}ms;"
				>
					<div class="ef-layer-header">
						<span class="ef-layer-dot" style="background: {layer.color};"></span>
						<div class="ef-layer-titles">
							<h4 class="ef-layer-title" style="color: {layer.color};">{layer.title}</h4>
							<span class="ef-layer-sub">{layer.subLabel}</span>
						</div>
						{#if layer.sideContext}
							<span class="ef-layer-context" style="border-color: {layer.color}; color: {layer.color};">
								{layer.sideContext}
							</span>
						{/if}
					</div>
					<ul class="ef-layer-items">
						{#each layer.items as item, j}
							<li style="--item-delay: {j * 40 + i * 80}ms;">{item}</li>
						{/each}
					</ul>
					{#if layer.summary}
						<p class="ef-layer-summary">{layer.summary}</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.ef-wrap {
		margin: 2rem 0 1rem;
	}

	/* ── Formula ────────────────────────────────────────── */
	.ef-formula {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
	}

	.ef-numerator {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		padding: 0 1rem 0.75rem;
	}

	.ef-plus {
		color: var(--text-muted);
		font-size: 1.2rem;
		font-weight: 300;
		user-select: none;
	}

	.ef-term {
		padding: 0.55rem 1.1rem;
		border-radius: 100px;
		border: 1.5px solid var(--border);
		background: transparent;
		color: var(--text-secondary);
		font-family: inherit;
		font-size: clamp(0.8rem, 2vw, 1rem);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		white-space: nowrap;
	}

	.ef-term:hover {
		border-color: var(--layer-color);
		color: var(--layer-color);
	}

	.ef-term-active {
		border-color: var(--layer-color);
		background: var(--layer-color-faded);
		color: var(--layer-color);
	}

	.ef-term-current {
		box-shadow: 0 0 20px color-mix(in srgb, var(--layer-color) 30%, transparent);
		transform: scale(1.05);
	}

	.ef-fraction-bar {
		width: 100%;
		max-width: 620px;
		height: 2px;
		background: var(--gradient);
		border-radius: 1px;
	}

	.ef-denominator {
		padding-top: 0.6rem;
		font-size: clamp(0.9rem, 2vw, 1.1rem);
		font-weight: 600;
		color: var(--text-secondary);
		text-align: center;
		letter-spacing: 0.02em;
	}

	/* ── Hint ───────────────────────────────────────────── */
	.ef-hint {
		text-align: center;
		color: var(--text-muted);
		font-size: 0.85rem;
		margin-top: 1.5rem;
		animation: ef-hint-pulse 2s ease-in-out infinite;
	}

	.ef-hint-arrow {
		display: inline-block;
		margin-right: 0.3rem;
	}

	@keyframes ef-hint-pulse {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	/* ── Details ────────────────────────────────────────── */
	.ef-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 2rem;
	}

	.ef-layer-card {
		border-left: 3px solid var(--layer-color);
		background: var(--bg-card);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		padding: 1.25rem 1.5rem;
		animation: ef-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--stagger) both;
	}

	@keyframes ef-card-in {
		0% { opacity: 0; transform: translateY(12px); }
		100% { opacity: 1; transform: translateY(0); }
	}

	.ef-layer-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.ef-layer-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ef-layer-titles {
		flex: 1;
		min-width: 0;
	}

	.ef-layer-title {
		font-size: 1rem;
		font-weight: 700;
		margin: 0;
		line-height: 1.3;
	}

	.ef-layer-sub {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.ef-layer-context {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.65rem;
		border: 1px solid;
		border-radius: 100px;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.ef-layer-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.ef-layer-items li {
		font-size: 0.85rem;
		color: var(--text-secondary);
		padding: 0.3rem 0.7rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
		border-radius: 6px;
		opacity: 0;
		animation: ef-item-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) var(--item-delay) forwards;
	}

	@keyframes ef-item-in {
		0% { opacity: 0; transform: translateX(-8px); }
		100% { opacity: 1; transform: translateX(0); }
	}

	.ef-layer-summary {
		margin: 0.75rem 0 0;
		font-size: 0.85rem;
		font-style: italic;
		color: var(--text-muted);
	}

	/* ── Mobile ─────────────────────────────────────────── */
	@media (max-width: 540px) {
		.ef-numerator {
			flex-direction: column;
			gap: 0.4rem;
		}

		.ef-plus {
			display: none;
		}

		.ef-term {
			font-size: 0.8rem;
			padding: 0.4rem 0.9rem;
		}

		.ef-layer-card {
			padding: 1rem;
		}

		.ef-layer-header {
			flex-wrap: wrap;
		}

		.ef-layer-context {
			margin-left: calc(10px + 0.75rem); /* align with content after dot */
		}
	}

	/* ── Reduced motion ─────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.ef-term,
		.ef-term-current {
			transition: none;
			transform: none;
		}

		.ef-layer-card,
		.ef-layer-items li {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.ef-hint {
			animation: none;
			opacity: 0.7;
		}
	}
</style>
