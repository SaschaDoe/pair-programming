<script lang="ts">
	import { rampIn } from '$lib/utils/scroll';

	let complexWrapper: HTMLElement | undefined = $state();
	let complexScroll = $state(0);

	$effect(() => {
		if (!complexWrapper) return;
		const onScroll = () => {
			const rect = complexWrapper!.getBoundingClientRect();
			const total = complexWrapper!.scrollHeight - window.innerHeight;
			complexScroll = Math.min(1, Math.max(0, -rect.top / total));
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Phase opacities — progressive build-up
	let cpxLayers  = $derived(Math.min(rampIn(complexScroll, 0.0, 0.06), 1 - rampIn(complexScroll, 0.14, 0.24)));
	let cpxNodes   = $derived(rampIn(complexScroll, 0.18, 0.28));
	let cpxLines   = $derived(rampIn(complexScroll, 0.30, 0.40));
	let cpxArrow   = $derived(rampIn(complexScroll, 0.44, 0.54));
	let cpxRed     = $derived(rampIn(complexScroll, 0.58, 0.68));
	let cpxAll     = $derived(complexScroll < 0.76 ? 1 : Math.max(0, 1 - (complexScroll - 0.76) / 0.08));
	let cpxEnd     = $derived(rampIn(complexScroll, 0.82, 0.92));

	// Class nodes data
	type CNode = { id: string; label: string; x: number; y: number; w: number; layer: string; red?: boolean };
	const classNodes: CNode[] = [
		// ── Config ──
		{ id: 'appConfig',    label: 'AppConfig',        x: 255, y: 14,  w: 84,  layer: 'config' },
		{ id: 'routes',       label: 'Routes',           x: 365, y: 22,  w: 62,  layer: 'config' },
		// ── UI ──
		{ id: 'loginPage',    label: 'LoginPage',        x: 28,  y: 78,  w: 82,  layer: 'ui' },
		{ id: 'dashboard',    label: 'Dashboard',        x: 150, y: 85,  w: 82,  layer: 'ui' },
		{ id: 'labPanel',     label: 'LabPanel',         x: 320, y: 78,  w: 76,  layer: 'ui' },
		{ id: 'protEditor',   label: 'ProtocolEditor',   x: 460, y: 85,  w: 110, layer: 'ui' },
		// ── Services / VMs / DTOs ──
		{ id: 'authSvc',      label: 'AuthService',      x: 12,  y: 152, w: 88,  layer: 'svc' },
		{ id: 'loginVM',      label: 'LoginVM',          x: 12,  y: 186, w: 72,  layer: 'svc' },
		{ id: 'labPanelVM',   label: 'LabPanelVM',       x: 195, y: 152, w: 92,  layer: 'svc' },
		{ id: 'protocolVM',   label: 'ProtocolVM',       x: 195, y: 186, w: 88,  layer: 'svc' },
		{ id: 'jsonExporter', label: 'JsonExporter',     x: 375, y: 160, w: 96,  layer: 'svc' },
		{ id: 'userDTO',      label: 'UserDTO',          x: 545, y: 168, w: 70,  layer: 'svc' },
		// ── Use Cases ──
		{ id: 'loginUC',      label: 'Login',            x: 48,  y: 255, w: 56,  layer: 'uc' },
		{ id: 'runProtocol',  label: 'RunProtocol',      x: 230, y: 250, w: 96,  layer: 'uc' },
		{ id: 'exportData',   label: 'ExportData',       x: 430, y: 255, w: 86,  layer: 'uc' },
		// ── Domain ──
		{ id: 'user',         label: 'User',             x: 55,  y: 338, w: 52,  layer: 'domain' },
		{ id: 'liquidHandler',label: 'LiquidHandler',    x: 210, y: 332, w: 106, layer: 'domain' },
		{ id: 'protocol',     label: 'Protocol',         x: 420, y: 338, w: 72,  layer: 'domain' },
	];

	type Conn = { from: string; to: string; red?: boolean };
	const connections: Conn[] = [
		// ── Stable chain (User / Login) ──
		{ from: 'loginPage',    to: 'loginVM' },
		{ from: 'loginVM',      to: 'loginUC' },
		{ from: 'loginVM',      to: 'authSvc' },
		{ from: 'loginUC',      to: 'user' },
		{ from: 'authSvc',      to: 'userDTO' },
		{ from: 'appConfig',    to: 'loginPage' },
		{ from: 'routes',       to: 'dashboard' },
		// ── Volatile chain (Lab Handling) — turns red ──
		{ from: 'labPanel',     to: 'labPanelVM',   red: true },
		{ from: 'protEditor',   to: 'protocolVM',   red: true },
		{ from: 'dashboard',    to: 'labPanelVM',   red: true },
		{ from: 'labPanelVM',   to: 'runProtocol',  red: true },
		{ from: 'labPanelVM',   to: 'jsonExporter', red: true },
		{ from: 'protocolVM',   to: 'runProtocol',  red: true },
		{ from: 'runProtocol',  to: 'liquidHandler', red: true },
		{ from: 'runProtocol',  to: 'protocol',     red: true },
		{ from: 'exportData',   to: 'protocol',     red: true },
		{ from: 'jsonExporter', to: 'exportData',   red: true },
	];

	function nodeById(id: string) { return classNodes.find(n => n.id === id)!; }
	function cx(n: CNode) { return n.x + n.w / 2; }
	function cy(n: CNode) { return n.y + 13; }
</script>

<section class="complex-scroll" bind:this={complexWrapper}>
	<div class="complex-sticky">
		<div class="container">
			<p class="label">Where It Matters</p>
			<h2>Where to Pair Program</h2>

			<div class="complex-stage">
				<div style="opacity: {cpxAll};">
					<svg class="arch-svg" viewBox="0 0 660 400">
						<!-- ── Phase 1: Layer categorization boxes ── -->
						<g style="opacity: {cpxLayers};">
							<!-- Config -->
							<rect x="230" y="5" width="200" height="52" rx="8" class="layer-box layer-config" />
							<text x="330" y="27" class="layer-title">Config</text>
							<text x="330" y="43" class="layer-sub">Architecture / Non-functional Req.</text>
							<!-- UI -->
							<rect x="230" y="78" width="200" height="48" rx="8" class="layer-box layer-ui" />
							<text x="330" y="99" class="layer-title">UI</text>
							<text x="330" y="113" class="layer-sub">Visual Requirements</text>
							<!-- IO Service -->
							<rect x="55" y="155" width="140" height="48" rx="8" class="layer-box layer-svc" />
							<text x="125" y="176" class="layer-title">IO Service</text>
							<text x="125" y="191" class="layer-sub">Data / Integration Req.</text>
							<!-- Viewmodel -->
							<rect x="260" y="155" width="140" height="48" rx="8" class="layer-box layer-svc" />
							<text x="330" y="176" class="layer-title">Viewmodel</text>
							<text x="330" y="191" class="layer-sub">UX Requirements</text>
							<!-- DTOs -->
							<rect x="465" y="155" width="140" height="48" rx="8" class="layer-box layer-svc" />
							<text x="535" y="176" class="layer-title">DTOs</text>
							<!-- Use Case -->
							<rect x="230" y="235" width="200" height="48" rx="8" class="layer-box layer-uc" />
							<text x="330" y="256" class="layer-title">Use Case</text>
							<text x="330" y="271" class="layer-sub">User Requirements</text>
							<!-- Domain -->
							<rect x="230" y="318" width="200" height="48" rx="8" class="layer-box layer-domain" />
							<text x="330" y="339" class="layer-title">Domain</text>
							<text x="330" y="354" class="layer-sub">Glossary</text>
						</g>

						<!-- ── Connection lines (rendered BELOW nodes) ── -->
						<g style="opacity: {cpxLines};">
							{#each connections as c}
								{@const f = nodeById(c.from)}
								{@const t = nodeById(c.to)}
								<line
									x1={cx(f)} y1={cy(f)}
									x2={cx(t)} y2={cy(t)}
									class="cline"
									class:cline-red={c.red && cpxRed > 0.5}
								/>
							{/each}
						</g>

						<!-- ── Class nodes (rendered ON TOP of lines) ── -->
						<g style="opacity: {cpxNodes};">
							{#each classNodes as n, i}
								<g style="transform: translateY({(1 - cpxNodes) * 15}px); opacity: {Math.min(1, cpxNodes * 3 - i * 0.1)};">
									<rect
										x={n.x} y={n.y} width={n.w} height={26} rx={5}
										class="cnode cnode-{n.layer}"
										class:cnode-trigger={n.id === 'runProtocol' && cpxRed > 0.5}
									/>
									<text x={n.x + n.w / 2} y={n.y + 16} class="cnode-label">{n.label}</text>
								</g>
							{/each}
						</g>

						<!-- ── Change frequency arrow ── -->
						<g style="opacity: {cpxArrow};">
							<!-- Vertical line -->
							<line x1="635" y1="370" x2="635" y2="25" stroke="#fb923c" stroke-width="2" />
							<!-- Arrowhead pointing UP /\ -->
							<path d="M625,25 L635,8 L645,25" fill="none" stroke="#fb923c" stroke-width="2" stroke-linejoin="round" />
							<text x="650" y="200" class="arrow-label" transform="rotate(90, 650, 200)">More changes at the top</text>
						</g>
					</svg>

					<!-- Impact text below SVG -->
					{#if cpxRed > 0.3}
						<p class="arch-impact" style="opacity: {cpxRed};">
							When a user requirement changes, everything connected above it is affected.
						</p>
					{/if}
				</div>

				<!-- Conclusion (fades in as diagram fades out) -->
				<div class="complex-end" style="opacity: {cpxEnd}; transform: translateY({(1 - cpxEnd) * 30}px);">
					<p class="lead">
						Pair program the parts that hurt most when they break &mdash; highly interconnected code that sits on top of <strong>changing requirements</strong>.
					</p>
					<div class="era-tag" style="margin-top: 1.5rem;">
						<span class="era-dot"></span>
						<p>The User login barely changes. But the lab handling chain? One new pipetting requirement and everything from Use Case to UI needs to adapt. That's where pairing pays off.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.complex-scroll {
		position: relative;
		height: 700vh;
	}

	.complex-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		align-items: center;
		padding: 4rem 0;
	}

	.complex-sticky > :global(.container) {
		width: 100%;
	}

	.complex-stage {
		position: relative;
		margin-top: 1.5rem;
	}

	.complex-end {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		will-change: opacity, transform;
	}

	/* ── SVG Diagram ───────────────────────────────────────── */
	.arch-svg {
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		display: block;
		overflow: visible;
	}

	/* ── Phase 1: Layer boxes ──────────────────────────────── */
	.layer-box { stroke-width: 1.5; }
	.layer-config { fill: rgba(244, 63, 94, 0.25); stroke: rgba(244, 63, 94, 0.6); }
	.layer-ui { fill: rgba(236, 72, 153, 0.25); stroke: rgba(236, 72, 153, 0.6); }
	.layer-svc { fill: rgba(234, 179, 8, 0.25); stroke: rgba(234, 179, 8, 0.6); }
	.layer-uc { fill: rgba(96, 165, 250, 0.25); stroke: rgba(96, 165, 250, 0.6); }
	.layer-domain { fill: rgba(74, 222, 128, 0.25); stroke: rgba(74, 222, 128, 0.6); }

	.layer-title {
		fill: #ffffff;
		font-size: 13px;
		font-weight: 700;
		text-anchor: middle;
		dominant-baseline: middle;
	}

	.layer-sub {
		fill: #a1a1aa;
		font-size: 9px;
		text-anchor: middle;
		dominant-baseline: middle;
	}

	/* ── Phase 2: Class nodes ──────────────────────────────── */
	.cnode { stroke-width: 1.5; }
	.cnode-config { fill: #1f0a10; stroke: rgba(244, 63, 94, 0.7); }
	.cnode-ui { fill: #1f0a16; stroke: rgba(236, 72, 153, 0.7); }
	.cnode-svc { fill: #1a1708; stroke: rgba(234, 179, 8, 0.7); }
	.cnode-uc { fill: #0a1220; stroke: rgba(96, 165, 250, 0.7); }
	.cnode-domain { fill: #0a1a0e; stroke: rgba(74, 222, 128, 0.7); }

	.cnode-label {
		fill: #fafafa;
		font-size: 10px;
		font-weight: 600;
		text-anchor: middle;
		dominant-baseline: middle;
		pointer-events: none;
	}

	/* ── Connection lines ──────────────────────────────────── */
	.cline {
		stroke: rgba(255, 255, 255, 0.12);
		stroke-width: 1;
		stroke-linecap: round;
		transition: stroke 0.6s, stroke-width 0.6s, filter 0.6s;
	}

	.cline-red {
		stroke: #f43f5e;
		stroke-width: 1.5;
		filter: drop-shadow(0 0 4px rgba(244, 63, 94, 0.4));
	}

	/* ── Red highlights ────────────────────────────────────── */
	.cnode-trigger {
		stroke: #f43f5e !important;
		stroke-width: 2 !important;
		filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.5));
		animation: svg-pulse 2s ease-in-out infinite;
	}

	.cnode-affected {
		stroke: rgba(244, 63, 94, 0.6) !important;
		filter: drop-shadow(0 0 4px rgba(244, 63, 94, 0.25));
	}

	@keyframes svg-pulse {
		0%, 100% { filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.4)); }
		50% { filter: drop-shadow(0 0 16px rgba(244, 63, 94, 0.7)); }
	}

	/* ── Arrow label ───────────────────────────────────────── */
	.arrow-label {
		fill: #fb923c;
		font-size: 10px;
		font-weight: 600;
		text-anchor: middle;
		dominant-baseline: middle;
	}

	/* ── Impact text ───────────────────────────────────────── */
	.arch-impact {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.95rem;
		color: #f43f5e;
		font-weight: 600;
	}
</style>
