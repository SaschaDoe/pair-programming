<script lang="ts">
	type Chip = { id: string; label: string; icon: string };

	const allChips: Chip[] = [
		{ id: 'fc',      label: 'Functional Correctness',      icon: '✓'  },
		{ id: 'nfr',     label: 'Non-functional Requirements', icon: '⚡' },
		{ id: 'ec',      label: 'Edge Cases',                  icon: '⚠'  },
		{ id: 'tests',   label: 'Tests',                       icon: '🧪' },
		{ id: 'arch',    label: 'Architecture',                icon: '🏛' },
		{ id: 'complex', label: 'Complexity',                  icon: '🧩' },
		{ id: 'abs',     label: 'Abstractions',                icon: '📦' },
		{ id: 'dry',     label: 'DRY',                         icon: '♻'  },
		{ id: 'read',    label: 'Readability',                 icon: '📖' },
		{ id: 'style',   label: 'Code Style Guide',            icon: '🎨' },
		{ id: 'int',     label: 'Integration Issues',          icon: '🔗' },
	];

	let pool      = $state<Chip[]>([...allChips]);
	let greenSlot = $state<Chip[]>([]);
	let blueSlot  = $state<Chip[]>([]);

	let dragChip = $state<Chip | null>(null);
	let dragFrom = $state<'pool' | 'green' | 'blue' | null>(null);
	let dragOver = $state<'pool' | 'green' | 'blue' | null>(null);

	function startDrag(chip: Chip, from: 'pool' | 'green' | 'blue') {
		dragChip = chip;
		dragFrom = from;
	}

	function endDrag() { dragChip = null; dragFrom = null; dragOver = null; }

	function removeFrom(from: 'pool' | 'green' | 'blue', chip: Chip) {
		if (from === 'pool')  pool      = pool.filter(c => c.id !== chip.id);
		if (from === 'green') greenSlot = greenSlot.filter(c => c.id !== chip.id);
		if (from === 'blue')  blueSlot  = blueSlot.filter(c => c.id !== chip.id);
	}

	function addTo(to: 'pool' | 'green' | 'blue', chip: Chip) {
		if (to === 'pool')  pool      = [...pool, chip];
		if (to === 'green') greenSlot = [...greenSlot, chip];
		if (to === 'blue')  blueSlot  = [...blueSlot, chip];
	}

	function drop(to: 'pool' | 'green' | 'blue') {
		if (!dragChip || !dragFrom || dragFrom === to) { endDrag(); return; }
		removeFrom(dragFrom, dragChip);
		addTo(to, dragChip);
		endDrag();
	}
</script>

<div class="cl-wrap">
	<!-- Diagram -->
	<div class="cl-diagram">
		<div class="cl-track">
			<svg viewBox="-50 0 500 380" class="cl-svg">
				<!-- Main big loop track (indigo) -->
				<path
					d="M 200 90 C 310 70, 340 130, 340 190 C 340 250, 310 300, 270 315 C 230 330, 170 330, 130 315 C 90 300, 60 250, 60 190 C 60 130, 90 70, 200 90"
					fill="none" stroke="rgba(129,140,248,0.12)" stroke-width="22" stroke-linecap="round"
				/>
				<!-- Small green loop at Write Code position -->
				<circle cx="200" cy="90" r="22" fill="none" stroke="rgba(16,185,129,0.12)" stroke-width="22"/>
				<!-- Hidden motion path -->
				<path
					id="cl-combined-motion"
					d="M 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 C 290 50, 340 120, 340 190 C 340 255, 310 300, 270 315 C 230 330, 170 330, 130 315 C 90 300, 60 250, 60 190 C 60 120, 100 55, 200 68"
					fill="none" stroke="none"
				/>
				<!-- Stage labels -->
				<text x="200" y="42"  fill="#10b981" font-size="13" text-anchor="middle" font-weight="700">Get Feedback</text>
				<text x="200" y="130" fill="#a1a1aa" font-size="13" text-anchor="middle" font-weight="700">Write Code</text>
				<text x="358" y="195" fill="#a1a1aa" font-size="13" text-anchor="start"  font-weight="600">Commit</text>
				<text x="285" y="340" fill="#a1a1aa" font-size="13" text-anchor="start"  font-weight="600">Open PR</text>
				<text x="115" y="340" fill="#a1a1aa" font-size="13" text-anchor="end"    font-weight="600">Wait for Review</text>
				<text x="42"  y="190" fill="#818cf8" font-size="13" text-anchor="end"    font-weight="700">Get Feedback</text>
				<text x="42"  y="206" fill="#818cf8" font-size="11" text-anchor="end"    font-weight="500">(Code Review)</text>
				<!-- Animated dot -->
				<circle r="7" fill="#818cf8" filter="drop-shadow(0 0 6px rgba(129,140,248,0.6))">
					<animateMotion dur="10s" repeatCount="indefinite">
						<mpath href="#cl-combined-motion"/>
					</animateMotion>
				</circle>
			</svg>
		</div>
	</div>

	<!-- Explanation -->
	<p class="cl-insight">
		The small loop catches the basics &mdash; freeing the big review to focus on what <strong>actually matters</strong>. Sort the topics:
	</p>

	<!-- Two drop zones -->
	<div class="cl-zones">
		<!-- Green zone: pair programming / small loop -->
		<div
			class="cl-zone cl-zone-green"
			class:zone-over={dragOver === 'green'}
			class:zone-drag-active={dragChip !== null}
			ondragover={(e) => { e.preventDefault(); dragOver = 'green'; }}
			ondragleave={() => { if (dragOver === 'green') dragOver = null; }}
			ondrop={() => drop('green')}
			role="region"
			aria-label="Get Feedback drop zone (pair programming)"
		>
			<div class="cl-zone-header">
				<span class="cl-zone-dot" style="background:#10b981;"></span>
				<span class="cl-zone-title" style="color:#10b981;">Get Feedback</span>
				<span class="cl-zone-sub">Pair programming loop</span>
			</div>
			<div class="cl-zone-chips">
				{#each greenSlot as chip (chip.id)}
					<div
						class="cl-chip cl-chip-green"
						class:dragging={dragChip?.id === chip.id}
						draggable="true"
						ondragstart={(e) => { e.dataTransfer!.effectAllowed = 'move'; startDrag(chip, 'green'); }}
						ondragend={endDrag}
						role="button"
						tabindex="0"
					>
						<span class="cl-chip-icon">{chip.icon}</span>
						{chip.label}
					</div>
				{/each}
				{#if greenSlot.length === 0}
					<span class="cl-zone-empty">Drop here</span>
				{/if}
			</div>
		</div>

		<!-- Blue zone: code review / big loop -->
		<div
			class="cl-zone cl-zone-blue"
			class:zone-over={dragOver === 'blue'}
			class:zone-drag-active={dragChip !== null}
			ondragover={(e) => { e.preventDefault(); dragOver = 'blue'; }}
			ondragleave={() => { if (dragOver === 'blue') dragOver = null; }}
			ondrop={() => drop('blue')}
			role="region"
			aria-label="Get Feedback (Code Review) drop zone"
		>
			<div class="cl-zone-header">
				<span class="cl-zone-dot" style="background:#818cf8;"></span>
				<span class="cl-zone-title" style="color:#818cf8;">Get Feedback</span>
				<span class="cl-zone-sub">Code review loop</span>
			</div>
			<div class="cl-zone-chips">
				{#each blueSlot as chip (chip.id)}
					<div
						class="cl-chip cl-chip-blue"
						class:dragging={dragChip?.id === chip.id}
						draggable="true"
						ondragstart={(e) => { e.dataTransfer!.effectAllowed = 'move'; startDrag(chip, 'blue'); }}
						ondragend={endDrag}
						role="button"
						tabindex="0"
					>
						<span class="cl-chip-icon">{chip.icon}</span>
						{chip.label}
					</div>
				{/each}
				{#if blueSlot.length === 0}
					<span class="cl-zone-empty">Drop here</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Pool of unassigned chips -->
	{#if pool.length > 0}
		<div
			class="cl-pool"
			class:pool-over={dragOver === 'pool'}
			ondragover={(e) => { e.preventDefault(); dragOver = 'pool'; }}
			ondragleave={() => { if (dragOver === 'pool') dragOver = null; }}
			ondrop={() => drop('pool')}
		>
			{#each pool as chip (chip.id)}
				<div
					class="cl-chip cl-chip-neutral"
					class:dragging={dragChip?.id === chip.id}
					draggable="true"
					ondragstart={(e) => { e.dataTransfer!.effectAllowed = 'move'; startDrag(chip, 'pool'); }}
					ondragend={endDrag}
					role="button"
					tabindex="0"
				>
					<span class="cl-chip-icon">{chip.icon}</span>
					{chip.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.cl-wrap {
		margin: 2rem 0 1rem;
		user-select: none;
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
	.cl-insight {
		font-size: 1.05rem;
		color: var(--text-secondary);
		line-height: 1.6;
		text-align: center;
		max-width: 600px;
		margin: 0 auto 1.75rem;
	}

	/* ── Two zones ──────────────────────────────────────── */
	.cl-zones {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.cl-zone {
		border: 1.5px dashed var(--border);
		border-radius: var(--radius-sm);
		padding: 1rem;
		min-height: 120px;
		transition: border-color 0.2s, background 0.2s;
	}

	.cl-zone-green {
		border-color: rgba(16, 185, 129, 0.3);
	}

	.cl-zone-blue {
		border-color: rgba(129, 140, 248, 0.3);
	}

	.cl-zone.zone-drag-active {
		border-style: dashed;
	}

	.cl-zone-green.zone-over {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.06);
	}

	.cl-zone-blue.zone-over {
		border-color: #818cf8;
		background: rgba(129, 140, 248, 0.06);
	}

	.cl-zone-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.cl-zone-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.cl-zone-title {
		font-size: 0.85rem;
		font-weight: 700;
	}

	.cl-zone-sub {
		font-size: 0.72rem;
		color: var(--text-muted);
		margin-left: auto;
	}

	.cl-zone-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		min-height: 40px;
	}

	.cl-zone-empty {
		font-size: 0.75rem;
		color: var(--text-muted);
		align-self: center;
		letter-spacing: 0.05em;
	}

	/* ── Pool ───────────────────────────────────────────── */
	.cl-pool {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		padding: 1rem;
		border: 1px dashed var(--border);
		border-radius: var(--radius-sm);
		min-height: 60px;
		transition: background 0.2s, border-color 0.2s;
	}

	.cl-pool.pool-over {
		border-color: rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.03);
	}

	/* ── Chips ──────────────────────────────────────────── */
	.cl-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.75rem;
		border-radius: 100px;
		font-size: 0.8rem;
		font-weight: 500;
		cursor: grab;
		transition: transform 0.15s, opacity 0.15s, box-shadow 0.15s;
		border: 1px solid transparent;
	}

	.cl-chip:hover {
		transform: translateY(-2px);
	}

	.cl-chip:active, .cl-chip.dragging {
		cursor: grabbing;
		opacity: 0.4;
		transform: scale(0.95);
	}

	.cl-chip-neutral {
		background: var(--bg-card);
		border-color: var(--border);
		color: var(--text-secondary);
	}

	.cl-chip-neutral:hover {
		border-color: rgba(255, 255, 255, 0.25);
		color: var(--text-primary);
	}

	.cl-chip-green {
		background: rgba(16, 185, 129, 0.08);
		border-color: rgba(16, 185, 129, 0.4);
		color: #10b981;
	}

	.cl-chip-green:hover {
		background: rgba(16, 185, 129, 0.14);
		box-shadow: 0 2px 12px rgba(16, 185, 129, 0.2);
	}

	.cl-chip-blue {
		background: rgba(129, 140, 248, 0.08);
		border-color: rgba(129, 140, 248, 0.4);
		color: #818cf8;
	}

	.cl-chip-blue:hover {
		background: rgba(129, 140, 248, 0.14);
		box-shadow: 0 2px 12px rgba(129, 140, 248, 0.2);
	}

	.cl-chip-icon {
		font-size: 0.85rem;
		line-height: 1;
	}

	/* ── Mobile ────────────────────────────────────────── */
	@media (max-width: 560px) {
		.cl-zones {
			grid-template-columns: 1fr;
		}

		.cl-chip {
			font-size: 0.75rem;
			padding: 0.3rem 0.6rem;
		}

		.cl-insight {
			font-size: 0.95rem;
		}
	}

	/* ── Reduced motion ────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.cl-chip {
			transition: none;
		}
	}
</style>
