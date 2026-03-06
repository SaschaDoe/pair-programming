<script lang="ts">
	type Card = { id: string; label: string };

	const allCards: Card[] = [
		{ id: 'jj', label: 'Junior + Junior' },
		{ id: 'js', label: 'Junior + Senior' },
		{ id: 'ss', label: 'Senior + Senior' },
	];

	const medals: Record<number, { height: number; color: string; glow: string; gradient: string }> = {
		1: { height: 120, color: '#F59E0B', glow: 'rgba(245,158,11,0.35)', gradient: 'linear-gradient(160deg, #FCD34D 0%, #D97706 100%)' },
		2: { height: 80,  color: '#94A3B8', glow: 'rgba(148,163,184,0.35)', gradient: 'linear-gradient(160deg, #CBD5E1 0%, #64748B 100%)' },
		3: { height: 50,  color: '#CD8E5A', glow: 'rgba(205,142,90,0.35)',  gradient: 'linear-gradient(160deg, #E5B785 0%, #A06030 100%)' },
	};

	let slot: Record<number, Card | null> = $state({ 1: null, 2: null, 3: null });
	let bench = $state<Card[]>([...allCards]);

	let dragCard = $state<Card | null>(null);
	let dragFrom = $state<'bench' | number | null>(null);
	let dragOver = $state<'bench' | number | null>(null);

	function startDrag(card: Card, from: 'bench' | number) {
		dragCard = card;
		dragFrom = from;
	}

	function endDrag() {
		dragCard = null;
		dragFrom = null;
		dragOver = null;
	}

	function drop(to: 'bench' | number) {
		if (!dragCard || dragFrom === null) return;
		if (dragFrom === to) { endDrag(); return; }

		const card = dragCard;
		const from = dragFrom;
		const displaced = to !== 'bench' ? slot[to as number] : null;

		// Remove from source
		if (from === 'bench') {
			bench = bench.filter(c => c.id !== card.id);
		} else {
			slot[from as number] = null;
		}

		// Place at destination
		if (to === 'bench') {
			bench = [...bench, card];
		} else {
			slot[to as number] = card;
		}

		// Displaced card goes back to source
		if (displaced) {
			if (from === 'bench') {
				bench = [...bench, displaced];
			} else {
				slot[from as number] = displaced;
			}
		}

		endDrag();
	}

</script>

<div class="podium-wrap">
	<!-- Podium stage: order is 2nd, 1st, 3rd -->
	<div class="podium-stage">
		{#each [2, 1, 3] as pos}
			{@const m = medals[pos]}
			{@const placed = slot[pos]}
			<div class="podium-col">
				<!-- Drop zone above the platform -->
				<div
					class="drop-zone"
					class:active={dragCard !== null}
					class:over={dragOver === pos}
					ondragover={(e) => { e.preventDefault(); dragOver = pos; }}
					ondragleave={() => { if (dragOver === pos) dragOver = null; }}
					ondrop={() => drop(pos)}
				>
					{#if placed}
						<div
							class="podium-card"
							style="--medal-color: {m.color}; --medal-glow: {m.glow};"
							draggable="true"
							ondragstart={(e) => { e.dataTransfer!.effectAllowed = 'move'; startDrag(placed, pos); }}
							ondragend={endDrag}
							role="button"
							tabindex="0"
						>
							{placed.label}
						</div>
					{:else}
						<div class="drop-hint" style="--medal-color: {m.color};">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					{/if}
				</div>

				<!-- Platform block -->
				<div
					class="platform"
					class:platform-1={pos === 1}
					class:platform-2={pos === 2}
					class:platform-3={pos === 3}
					style="--h: {m.height}px; --gradient: {m.gradient}; --medal-color: {m.color}; --medal-glow: {m.glow};"
				>
					<span class="pos-num">{pos}</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Ground line -->
	<div class="ground-line"></div>

	<!-- Bench area -->
	<div
		class="bench"
		class:bench-active={dragCard !== null}
		class:bench-over={dragOver === 'bench'}
		ondragover={(e) => { e.preventDefault(); dragOver = 'bench'; }}
		ondragleave={() => { if (dragOver === 'bench') dragOver = null; }}
		ondrop={() => drop('bench')}
	>
		{#each bench as card (card.id)}
			<div
				class="bench-card"
				class:dragging={dragCard?.id === card.id}
				draggable="true"
				ondragstart={(e) => { e.dataTransfer!.effectAllowed = 'move'; startDrag(card, 'bench'); }}
				ondragend={endDrag}
				role="button"
				tabindex="0"
			>
				{card.label}
			</div>
		{/each}
	</div>
</div>

<style>
	.podium-wrap {
		margin: 2.5rem 0 1rem;
		user-select: none;
	}

	/* ── Stage ──────────────────────────────────────────── */
	.podium-stage {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 0;
		padding: 0 1rem;
	}

	.podium-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		max-width: 220px;
	}

	/* ── Drop zone ──────────────────────────────────────── */
	.drop-zone {
		width: 100%;
		min-height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 10px 10px 0 0;
		transition: background 0.2s;
	}

	.drop-zone.active {
		background: rgba(255, 255, 255, 0.02);
	}

	.drop-zone.over {
		background: rgba(255, 255, 255, 0.06);
	}

	.drop-hint {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1.5px dashed var(--medal-color);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--medal-color);
		opacity: 0;
		transition: opacity 0.2s;
	}

	.drop-zone.active .drop-hint {
		opacity: 0.5;
	}

	.drop-zone.over .drop-hint {
		opacity: 1;
	}

	/* ── Podium card (placed) ───────────────────────────── */
	.podium-card {
		width: 100%;
		padding: 0.65rem 0.75rem;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
		border: 1.5px solid var(--medal-color);
		box-shadow: 0 0 18px var(--medal-glow), inset 0 1px 0 rgba(255,255,255,0.08);
		color: var(--medal-color);
		font-size: 0.8rem;
		font-weight: 700;
		text-align: center;
		cursor: grab;
		transition: transform 0.15s, box-shadow 0.15s;
		letter-spacing: 0.01em;
	}

	.podium-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 24px var(--medal-glow), inset 0 1px 0 rgba(255,255,255,0.08);
	}

	.podium-card:active {
		cursor: grabbing;
		transform: scale(0.97);
	}

	/* ── Platform block ─────────────────────────────────── */
	.platform {
		width: 100%;
		height: var(--h);
		background: var(--gradient);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: box-shadow 0.3s;
	}

	.platform-1 {
		border-radius: 6px 6px 0 0;
		box-shadow: 0 -4px 30px var(--medal-glow);
	}

	.platform-2 {
		border-radius: 6px 6px 0 0;
	}

	.platform-3 {
		border-radius: 6px 6px 0 0;
	}

	.pos-num {
		font-size: 1.6rem;
		font-weight: 900;
		color: rgba(0, 0, 0, 0.35);
		line-height: 1;
		letter-spacing: -0.03em;
	}

	/* ── Ground line ────────────────────────────────────── */
	.ground-line {
		height: 3px;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent);
		border-radius: 2px;
		margin: 0 1rem;
	}

	/* ── Bench ──────────────────────────────────────────── */
	.bench {
		margin-top: 2rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1.25rem 1rem;
		border: 1.5px dashed var(--border);
		border-radius: var(--radius-sm);
		min-height: 80px;
		transition: border-color 0.2s, background 0.2s;
	}

	.bench.bench-active {
		border-color: rgba(255, 255, 255, 0.2);
	}

	.bench.bench-over {
		border-color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.03);
	}

.bench-card {
		padding: 0.6rem 1.1rem;
		border-radius: 8px;
		background: var(--bg-card);
		border: 1.5px solid var(--border);
		color: var(--text-secondary);
		font-size: 0.85rem;
		font-weight: 600;
		cursor: grab;
		transition: transform 0.15s, border-color 0.15s, opacity 0.15s;
		letter-spacing: 0.01em;
	}

	.bench-card:hover {
		border-color: rgba(255, 255, 255, 0.3);
		color: var(--text-primary);
		transform: translateY(-2px);
	}

	.bench-card:active,
	.bench-card.dragging {
		cursor: grabbing;
		opacity: 0.4;
		transform: scale(0.96);
	}

	/* ── Mobile ─────────────────────────────────────────── */
	@media (max-width: 540px) {
		.podium-col {
			max-width: 120px;
		}

		.podium-card {
			font-size: 0.65rem;
			padding: 0.5rem 0.4rem;
		}

		.bench-card {
			font-size: 0.75rem;
			padding: 0.5rem 0.8rem;
		}

		.pos-num {
			font-size: 1.2rem;
		}
	}
</style>
