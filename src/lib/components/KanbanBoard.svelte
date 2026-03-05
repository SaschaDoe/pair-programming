<script lang="ts">
	type Person = { name: string; initials: string; color: string };
	type Ticket = { id: number; title: string; column: string; assignees: Person[] };
	type Column = { id: string; label: string };

	const people: Record<string, Person> = {
		alex:   { name: 'Alex',   initials: 'A', color: '#6366f1' },
		sam:    { name: 'Sam',    initials: 'S', color: '#ec4899' },
		jordan: { name: 'Jordan', initials: 'J', color: '#f59e0b' },
		taylor: { name: 'Taylor', initials: 'T', color: '#10b981' },
	};

	const columns: Column[] = [
		{ id: 'todo',        label: 'To Do' },
		{ id: 'in-progress', label: 'In Progress' },
		{ id: 'review',      label: 'Review' },
		{ id: 'done',        label: 'Done' },
	];

	function taskPreset(): Ticket[] {
		return [
			{ id: 1,  title: 'Setup CI pipeline',    column: 'done',        assignees: [people.alex] },
			{ id: 2,  title: 'Write unit tests',      column: 'done',        assignees: [people.sam] },
			{ id: 3,  title: 'Create login page',     column: 'review',      assignees: [people.jordan] },
			{ id: 4,  title: 'Add form validation',   column: 'review',      assignees: [people.taylor] },
			{ id: 5,  title: 'Build API client',      column: 'in-progress', assignees: [people.alex] },
			{ id: 6,  title: 'Design settings UI',    column: 'in-progress', assignees: [people.sam] },
			{ id: 7,  title: 'Fix auth bug',          column: 'in-progress', assignees: [people.jordan] },
			{ id: 8,  title: 'Refactor data layer',   column: 'in-progress', assignees: [people.taylor] },
			{ id: 9,  title: 'Implement caching',     column: 'todo',        assignees: [people.alex] },
			{ id: 10, title: 'Write API docs',        column: 'todo',        assignees: [people.sam] },
			{ id: 11, title: 'Add dark mode',         column: 'todo',        assignees: [people.jordan] },
			{ id: 12, title: 'Performance audit',     column: 'todo',        assignees: [people.taylor] },
		];
	}

	function featurePreset(): Ticket[] {
		return [
			{ id: 1, title: 'User Authentication Flow', column: 'in-progress', assignees: [people.alex, people.sam] },
			{ id: 2, title: 'Lab Protocol Manager',     column: 'in-progress', assignees: [people.jordan, people.taylor] },
			{ id: 3, title: 'Data Export Pipeline',      column: 'todo',        assignees: [] },
		];
	}

	let viewMode: 'task' | 'feature' = $state('task');
	let tickets: Ticket[] = $state(taskPreset());

	function switchView(mode: 'task' | 'feature') {
		viewMode = mode;
		tickets = mode === 'task' ? taskPreset() : featurePreset();
	}

	// ── Drag-and-drop state ──────────────────────────────────
	let dragTicketId: number | null = $state(null);
	let ghostX = $state(0);
	let ghostY = $state(0);
	let ghostW = $state(0);
	let ghostH = $state(0);
	let ghostTitle = $state('');
	let ghostAssignees: Person[] = $state([]);
	let highlightCol: string | null = $state(null);
	let isDragging = $state(false);

	function onPointerDown(e: PointerEvent, ticket: Ticket) {
		const card = (e.currentTarget as HTMLElement);
		const rect = card.getBoundingClientRect();
		ghostW = rect.width;
		ghostH = rect.height;
		ghostX = e.clientX - rect.width / 2;
		ghostY = e.clientY - rect.height / 2;
		ghostTitle = ticket.title;
		ghostAssignees = ticket.assignees;
		dragTicketId = ticket.id;
		isDragging = true;
		card.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		ghostX = e.clientX - ghostW / 2;
		ghostY = e.clientY - ghostH / 2;

		const els = document.elementsFromPoint(e.clientX, e.clientY);
		let found: string | null = null;
		for (const el of els) {
			const col = (el as HTMLElement).dataset?.column;
			if (col) { found = col; break; }
		}
		highlightCol = found;
	}

	function onPointerUp() {
		if (!isDragging) return;
		if (highlightCol && dragTicketId !== null) {
			tickets = tickets.map(t =>
				t.id === dragTicketId ? { ...t, column: highlightCol! } : t
			);
		}
		isDragging = false;
		dragTicketId = null;
		highlightCol = null;
	}

	function ticketsFor(col: string): Ticket[] {
		return tickets.filter(t => t.column === col);
	}
</script>

<div class="kanban-wrap">
	<!-- Toggle -->
	<div class="toggle-bar">
		<button
			class="toggle-btn"
			class:active={viewMode === 'task'}
			onclick={() => switchView('task')}
		>Task-based</button>
		<button
			class="toggle-btn"
			class:active={viewMode === 'feature'}
			onclick={() => switchView('feature')}
		>Feature-based</button>
	</div>

	<p class="view-hint">
		{#if viewMode === 'task'}
			8 small tickets, each assigned to 1 person — everyone works in silos.
		{:else}
			3 feature tickets, 2 people per ticket — shared context, built-in review.
		{/if}
	</p>

	<!-- Board -->
	{#key viewMode}
		<div class="board">
			{#each columns as col}
				<div
					class="column"
					class:column-highlight={highlightCol === col.id}
					data-column={col.id}
				>
					<div class="col-header">
						<span class="col-label">{col.label}</span>
						<span class="col-count">{ticketsFor(col.id).length}</span>
					</div>

					<div class="col-cards" data-column={col.id}>
						{#each ticketsFor(col.id) as ticket (ticket.id)}
							<div
								class="ticket"
								class:ticket-dragging={dragTicketId === ticket.id}
								onpointerdown={(e) => onPointerDown(e, ticket)}
								onpointermove={onPointerMove}
								onpointerup={onPointerUp}
								role="listitem"
							>
								<span class="ticket-title">{ticket.title}</span>
								<div class="ticket-assignees">
									{#each ticket.assignees as person}
										<span class="avatar" style="background:{person.color}" title={person.name}>
											{person.initials}
										</span>
									{/each}
									{#if ticket.assignees.length === 0}
										<span class="avatar avatar-empty" title="Unassigned">?</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/key}

	<p class="drag-hint">Drag cards between columns to reorganize.</p>
</div>

<!-- Ghost card -->
{#if isDragging}
	<div
		class="ghost-card"
		style="left:{ghostX}px;top:{ghostY}px;width:{ghostW}px;height:{ghostH}px"
	>
		<span class="ticket-title">{ghostTitle}</span>
		<div class="ticket-assignees">
			{#each ghostAssignees as person}
				<span class="avatar" style="background:{person.color}">{person.initials}</span>
			{/each}
		</div>
	</div>
{/if}

<style>
	/* ── Wrapper ──────────────────────────────────────────────── */
	.kanban-wrap {
		margin-top: 2rem;
	}

	/* ── Toggle ──────────────────────────────────────────────── */
	.toggle-bar {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		margin-bottom: 0.75rem;
	}

	.toggle-btn {
		padding: 0.55rem 1.4rem;
		border: 1px solid var(--border-bright);
		border-radius: 999px;
		background: transparent;
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.25s;
	}

	.toggle-btn.active {
		background: var(--accent);
		border-color: var(--accent);
		color: #fff;
	}

	.toggle-btn:hover:not(.active) {
		border-color: var(--accent);
		color: var(--text-primary);
	}

	.view-hint {
		text-align: center;
		color: var(--text-muted);
		font-size: 0.85rem;
		margin-bottom: 1.5rem;
	}

	.drag-hint {
		text-align: center;
		color: var(--text-muted);
		font-size: 0.8rem;
		margin-top: 1rem;
	}

	/* ── Board Grid ──────────────────────────────────────────── */
	.board {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
		animation: boardFade 0.4s ease;
	}

	@keyframes boardFade {
		from { opacity: 0; transform: translateY(12px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* ── Column ──────────────────────────────────────────────── */
	.column {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.75rem;
		min-height: 140px;
		transition: border-color 0.2s;
	}

	.column-highlight {
		border-color: var(--accent);
		box-shadow: 0 0 0 1px var(--accent);
	}

	.col-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.6rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.col-label {
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-secondary);
	}

	.col-count {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--text-muted);
		background: rgba(255, 255, 255, 0.06);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}

	.col-cards {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 60px;
	}

	/* ── Ticket Card ─────────────────────────────────────────── */
	.ticket {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.6rem 0.75rem;
		cursor: grab;
		touch-action: none;
		user-select: none;
		transition: opacity 0.2s, border-color 0.2s;
	}

	.ticket:hover {
		border-color: var(--border-bright);
	}

	.ticket-dragging {
		opacity: 0.3;
	}

	.ticket-title {
		display: block;
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 0.4rem;
		line-height: 1.3;
	}

	.ticket-assignees {
		display: flex;
		gap: 0.3rem;
	}

	/* ── Avatar ───────────────────────────────────────────────── */
	.avatar {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.65rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.avatar-empty {
		background: var(--text-muted);
	}

	/* ── Ghost ────────────────────────────────────────────────── */
	.ghost-card {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		background: var(--bg-secondary);
		border: 1px solid var(--accent);
		border-radius: 6px;
		padding: 0.6rem 0.75rem;
		opacity: 0.9;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
	}

	/* ── Responsive ──────────────────────────────────────────── */
	@media (max-width: 640px) {
		.board {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 400px) {
		.board {
			grid-template-columns: 1fr;
		}
	}
</style>
