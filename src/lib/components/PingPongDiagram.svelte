<script lang="ts">
	const steps = [
		{ phase: 'RED',      label: 'Write failing test',  aRole: 'driver',    bRole: 'navigator', cycle: 1 },
		{ phase: 'GREEN',    label: 'Make it pass',         aRole: 'navigator', bRole: 'driver',    cycle: 1 },
		{ phase: 'REFACTOR', label: 'Clean up',             aRole: 'driver',    bRole: 'navigator', cycle: 1 },
		{ phase: 'RED',      label: 'Write failing test',   aRole: 'navigator', bRole: 'driver',    cycle: 2 },
		{ phase: 'GREEN',    label: 'Make it pass',         aRole: 'driver',    bRole: 'navigator', cycle: 2 },
		{ phase: 'REFACTOR', label: 'Clean up',             aRole: 'navigator', bRole: 'driver',    cycle: 2 },
	] as const;

	const phases = ['RED', 'GREEN', 'REFACTOR'] as const;

	const phaseColor: Record<string, string> = {
		RED:      '#f43f5e',
		GREEN:    '#34d399',
		REFACTOR: '#818cf8',
	};

	const phaseLabel: Record<string, string> = {
		RED:      'Red',
		GREEN:    'Green',
		REFACTOR: 'Refactor',
	};

	let stepIndex = $state(0);
	let showSummary = $state(false);
	let isVisible = $state(false);
	let wrapper: HTMLElement | undefined = $state();
	let reducedMotion = $state(false);

	const current = $derived(steps[stepIndex]);
	const color = $derived(phaseColor[current.phase]);
	const aIsDriver = $derived(current.aRole === 'driver');
	const bIsDriver = $derived(current.bRole === 'driver');

	// Detect prefers-reduced-motion
	$effect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const handler = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});

	// IntersectionObserver — pause when offscreen
	$effect(() => {
		if (!wrapper) return;
		const observer = new IntersectionObserver(
			([entry]) => { isVisible = entry.isIntersecting; },
			{ threshold: 0.3 }
		);
		observer.observe(wrapper);
		return () => observer.disconnect();
	});

	// Auto-advance timer
	$effect(() => {
		if (!isVisible || reducedMotion) return;
		const delay = showSummary ? 3000 : 2500;
		const id = setInterval(() => {
			if (showSummary) {
				showSummary = false;
				stepIndex = 0;
			} else if (stepIndex === steps.length - 1) {
				showSummary = true;
			} else {
				stepIndex++;
			}
		}, delay);
		return () => clearInterval(id);
	});

	function goToStep(i: number) {
		showSummary = false;
		stepIndex = i;
	}
</script>

<div class="pp-diagram" bind:this={wrapper}>
	<!-- TDD Cycle track: Red → Green → Refactor ↩ -->
	<div class="pp-track">
		{#each phases as phase, i}
			{@const isActive = !showSummary && current.phase === phase}
			{@const c = phaseColor[phase]}
			{#if i > 0}
				<svg class="pp-arrow" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			{/if}
			<div
				class="pp-track-node"
				class:pp-track-active={isActive}
				style="--node-color: {c};"
			>
				<span class="pp-track-dot"></span>
				<span class="pp-track-label">{phaseLabel[phase]}</span>
			</div>
		{/each}
		<svg class="pp-arrow pp-arrow-loop" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M17 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M3 11V9a4 4 0 014-4h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>

	<!-- Main stage -->
	<div class="pp-stage" class:pp-summary-active={showSummary}>
		<!-- Person A -->
		<div class="pp-person" class:pp-active={aIsDriver} class:pp-faded={!aIsDriver}>
			<svg class="pp-icon" viewBox="0 0 48 48" aria-hidden="true">
				<defs>
					<linearGradient id="pp-grad-a" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#6366f1" />
						<stop offset="100%" stop-color="#818cf8" />
					</linearGradient>
				</defs>
				<circle cx="24" cy="16" r="9" fill="url(#pp-grad-a)" />
				<path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" fill="url(#pp-grad-a)" />
			</svg>
			<span class="pp-name">Dev A</span>
			<span class="pp-role-slot">
				{#key aIsDriver}
					<span
						class="pp-role"
						class:pp-role-driver={aIsDriver}
						class:pp-role-navigator={!aIsDriver}
					>
						{aIsDriver ? 'Driver' : 'Navigator'}
					</span>
				{/key}
			</span>
		</div>

		<!-- Phase badge -->
		<div class="pp-badge" style="--phase-color: {color};">
			{#key stepIndex}
				<span class="pp-badge-content">
					<span class="pp-phase-label">{current.label}</span>
				</span>
			{/key}
		</div>

		<!-- Person B -->
		<div class="pp-person" class:pp-active={bIsDriver} class:pp-faded={!bIsDriver}>
			<svg class="pp-icon" viewBox="0 0 48 48" aria-hidden="true">
				<defs>
					<linearGradient id="pp-grad-b" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#a855f7" />
						<stop offset="100%" stop-color="#c084fc" />
					</linearGradient>
				</defs>
				<circle cx="24" cy="16" r="9" fill="url(#pp-grad-b)" />
				<path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" fill="url(#pp-grad-b)" />
			</svg>
			<span class="pp-name">Dev B</span>
			<span class="pp-role-slot">
				{#key bIsDriver}
					<span
						class="pp-role"
						class:pp-role-driver={bIsDriver}
						class:pp-role-navigator={!bIsDriver}
					>
						{bIsDriver ? 'Driver' : 'Navigator'}
					</span>
				{/key}
			</span>
		</div>

		<!-- Summary overlay -->
		{#if showSummary}
			<div class="pp-overlay">
				<p class="pp-overlay-title">2 Cycles Complete</p>
				<p class="pp-overlay-text">Both devs have done every TDD phase.</p>
			</div>
		{/if}
	</div>

	<!-- Progress dots + cycle label -->
	<div class="pp-progress">
		<div class="pp-dots">
			{#each steps as _, i}
				<button
					class="pp-dot"
					class:pp-dot-active={i === stepIndex && !showSummary}
					class:pp-dot-done={i < stepIndex || showSummary}
					style="--dot-color: {phaseColor[steps[i].phase]};"
					onclick={() => goToStep(i)}
					aria-label="Go to step {i + 1}: {steps[i].phase}"
				></button>
			{/each}
		</div>
		<span class="pp-cycle-label">
			{showSummary ? 'Done' : `Cycle ${current.cycle} of 2`}
		</span>
	</div>
</div>

<style>
	.pp-diagram {
		padding: 2.5rem 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		transition: background 0.3s, border-color 0.3s;
	}

	.pp-diagram:hover {
		background: var(--bg-card-hover);
		border-color: var(--border-bright);
	}

	/* ── TDD Cycle track ────────────────────────────────────── */
	.pp-track {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.pp-track-node {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.75rem;
		border-radius: 100px;
		border: 1.5px solid var(--border);
		background: transparent;
		transition: border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			background 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-track-active {
		border-color: var(--node-color);
		background: color-mix(in srgb, var(--node-color) 12%, transparent);
		box-shadow: 0 0 16px color-mix(in srgb, var(--node-color) 25%, transparent);
		transform: scale(1.08);
	}

	.pp-track-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--text-muted);
		flex-shrink: 0;
		transition: background 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-track-active .pp-track-dot {
		background: var(--node-color);
		box-shadow: 0 0 6px var(--node-color);
	}

	.pp-track-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-muted);
		transition: color 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-track-active .pp-track-label {
		color: var(--node-color);
	}

	.pp-arrow {
		width: 18px;
		height: 18px;
		color: var(--text-muted);
		flex-shrink: 0;
		opacity: 0.4;
	}

	.pp-arrow-loop {
		opacity: 0.25;
		width: 16px;
		height: 16px;
	}

	/* ── Stage layout ───────────────────────────────────────── */
	.pp-stage {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1.25rem, 5vw, 3.5rem);
		position: relative;
		min-height: 160px;
	}

	/* ── Person column ──────────────────────────────────────── */
	.pp-person {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform, opacity;
	}

	.pp-active {
		transform: scale(1.08);
		filter: drop-shadow(0 0 12px rgba(129, 140, 248, 0.25));
	}

	.pp-faded {
		opacity: 0.45;
	}

	.pp-icon {
		width: 52px;
		height: 52px;
	}

	.pp-name {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	/* ── Role slot (fixed height container for crossfade) ──── */
	.pp-role-slot {
		display: block;
		position: relative;
		height: 1.4rem;
		min-width: 5.5rem;
	}

	.pp-role {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border-radius: 100px;
		animation: pp-crossfade 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-role-driver {
		background: rgba(129, 140, 248, 0.15);
		color: #818cf8;
	}

	.pp-role-navigator {
		background: rgba(161, 161, 170, 0.1);
		color: var(--text-muted);
	}

	/* ── Phase badge ────────────────────────────────────────── */
	.pp-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem 1.75rem;
		border-radius: 14px;
		border: 2px solid var(--phase-color);
		background: color-mix(in srgb, var(--phase-color) 8%, transparent);
		box-shadow: 0 0 24px color-mix(in srgb, var(--phase-color) 18%, transparent),
			inset 0 0 16px color-mix(in srgb, var(--phase-color) 4%, transparent);
		min-width: 140px;
		min-height: 80px;
		position: relative;
		transition: border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			background 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-badge-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		animation: pp-crossfade 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-phase-label {
		font-size: 0.8rem;
		color: var(--text-secondary);
		white-space: nowrap;
	}

	/* ── Crossfade keyframes ────────────────────────────────── */
	@keyframes pp-crossfade {
		0% {
			opacity: 0;
			transform: translateY(6px) scale(0.96);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* ── Summary overlay ────────────────────────────────────── */
	.pp-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(9, 9, 11, 0.88);
		border-radius: 8px;
		backdrop-filter: blur(4px);
		animation: pp-overlay-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-overlay-title {
		font-size: 1.15rem;
		font-weight: 700;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.3rem;
	}

	.pp-overlay-text {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	@keyframes pp-overlay-in {
		0% {
			opacity: 0;
			backdrop-filter: blur(0);
		}
		100% {
			opacity: 1;
			backdrop-filter: blur(4px);
		}
	}

	/* ── Progress dots ──────────────────────────────────────── */
	.pp-progress {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}

	.pp-dots {
		display: flex;
		gap: 0.5rem;
	}

	.pp-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1.5px solid var(--border-bright);
		background: transparent;
		padding: 0;
		cursor: pointer;
		transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pp-dot:hover {
		border-color: var(--dot-color);
		transform: scale(1.3);
	}

	.pp-dot-active {
		background: var(--dot-color);
		border-color: var(--dot-color);
		box-shadow: 0 0 8px color-mix(in srgb, var(--dot-color) 50%, transparent);
	}

	.pp-dot-done {
		background: var(--dot-color);
		border-color: var(--dot-color);
		opacity: 0.35;
	}

	.pp-cycle-label {
		font-size: 0.7rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 600;
	}

	/* ── Mobile ─────────────────────────────────────────────── */
	@media (max-width: 480px) {
		.pp-diagram {
			padding: 1.5rem 1rem;
		}

		.pp-track {
			gap: 0.25rem;
			margin-bottom: 1.25rem;
			padding-bottom: 1rem;
		}

		.pp-track-node {
			padding: 0.25rem 0.5rem;
		}

		.pp-track-label {
			font-size: 0.65rem;
		}

		.pp-track-dot {
			width: 6px;
			height: 6px;
		}

		.pp-arrow {
			width: 14px;
			height: 14px;
		}

		.pp-arrow-loop {
			width: 12px;
			height: 12px;
		}

		.pp-stage {
			gap: 0.75rem;
			min-height: 130px;
		}

		.pp-icon {
			width: 38px;
			height: 38px;
		}

		.pp-badge {
			padding: 1rem;
			min-width: 105px;
			min-height: 68px;
		}

		.pp-phase-label {
			font-size: 0.7rem;
		}

		.pp-name {
			font-size: 0.7rem;
		}

		.pp-role {
			font-size: 0.6rem;
		}

		.pp-role-slot {
			min-width: 4.5rem;
			height: 1.2rem;
		}
	}

	/* ── Reduced motion ─────────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.pp-person,
		.pp-badge,
		.pp-dot,
		.pp-track-node,
		.pp-track-dot,
		.pp-track-label {
			transition: none;
		}

		.pp-active {
			transform: none;
			filter: none;
		}

		.pp-track-active {
			transform: none;
		}

		.pp-badge-content,
		.pp-role,
		.pp-overlay {
			animation: none;
		}
	}
</style>
