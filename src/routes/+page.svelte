<script lang="ts">
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import TeamResults from '$lib/components/TeamResults.svelte';
	import FeedbackForm from '$lib/components/FeedbackForm.svelte';
	import OriginSection from '$lib/components/OriginSection.svelte';
	import ArchitectureDiagram from '$lib/components/ArchitectureDiagram.svelte';
	import PracticalExample from '$lib/components/PracticalExample.svelte';
	import PingPongDiagram from '$lib/components/PingPongDiagram.svelte';
	import ExpertiseFormula from '$lib/components/ExpertiseFormula.svelte';
	import CombinedLoopDiagram from '$lib/components/CombinedLoopDiagram.svelte';
	import {
		benefits, safetyTips, classicObjections, pitfalls, pairingStyles,
		whenColumns, sessionSteps, bestPractices, summaryCards, sources,
		barriers, aiAnswers, modernObjections
	} from '$lib/data/presentationContent';

	// ── Interactive Review Formula (from CodeReviewWithAI) ──────
	let contentSize = $state(25);
	let timePassed = $state(15);
	let isDragging = $state(false);
	let svgElement: SVGSVGElement | null = $state(null);

	const minWidth = 50;
	const maxWidth = 520;
	const minHeight = 40;
	const maxHeight = 260;
	const originX = 100;
	const originY = 350;

	let rectWidth = $derived(minWidth + (contentSize / 100) * (maxWidth - minWidth));
	let rectHeight = $derived(minHeight + (timePassed / 100) * (maxHeight - minHeight));
	let handleX = $derived(originX + rectWidth);
	let handleY = $derived(originY - rectHeight);
	let areaPercent = $derived((rectWidth * rectHeight) / (maxWidth * maxHeight) * 100);

	let rectColor = $derived.by(() => {
		if (areaPercent < 15) return '#10b981';
		if (areaPercent < 30) return '#22c55e';
		if (areaPercent < 45) return '#84cc16';
		if (areaPercent < 60) return '#eab308';
		if (areaPercent < 75) return '#f97316';
		return '#ef4444';
	});

	let combinedMetric = $derived(contentSize * 0.7 + timePassed * 0.3);
	let lgtmOpacity = $derived(Math.min(1, Math.max(0, (combinedMetric - 25) / 35)));
	let meaningfulOpacity = $derived(Math.min(1, Math.max(0, (35 - combinedMetric) / 25)));

	let statusText = $derived.by(() => {
		if (areaPercent < 15) return 'Excellent: Deep, focused review possible';
		if (areaPercent < 30) return 'Good: Reviewer can understand the changes';
		if (areaPercent < 45) return 'Okay: Some details may be missed';
		if (areaPercent < 60) return 'Warning: Review quality declining';
		if (areaPercent < 75) return 'Poor: Surface-level review only';
		return 'Rubber Stamp: "Looks good to me!"';
	});

	let timeLabel = $derived.by(() => {
		if (timePassed < 15) return 'Just written';
		if (timePassed < 35) return 'Same day';
		if (timePassed < 55) return 'Few days later';
		if (timePassed < 75) return 'Week later';
		return 'Weeks/months later';
	});

	function screenToSvg(clientX: number, clientY: number) {
		if (!svgElement) return { x: 0, y: 0 };
		const pt = svgElement.createSVGPoint();
		pt.x = clientX;
		pt.y = clientY;
		const svgP = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
		return { x: svgP.x, y: svgP.y };
	}

	function handleDragStart(e: MouseEvent | TouchEvent) {
		e.preventDefault();
		isDragging = true;
		if (e.type === 'mousedown') {
			window.addEventListener('mousemove', handleDragMove);
			window.addEventListener('mouseup', handleDragEnd);
		} else {
			window.addEventListener('touchmove', handleDragMove);
			window.addEventListener('touchend', handleDragEnd);
		}
	}

	function handleDragMove(e: MouseEvent | TouchEvent) {
		if (!isDragging) return;
		const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
		const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
		const svgCoords = screenToSvg(clientX, clientY);
		const newWidth = Math.max(minWidth, Math.min(maxWidth, svgCoords.x - originX));
		const newHeight = Math.max(minHeight, Math.min(maxHeight, originY - svgCoords.y));
		contentSize = Math.max(5, Math.min(100, ((newWidth - minWidth) / (maxWidth - minWidth)) * 100));
		timePassed = Math.max(5, Math.min(100, ((newHeight - minHeight) / (maxHeight - minHeight)) * 100));
	}

	function handleDragEnd() {
		isDragging = false;
		window.removeEventListener('mousemove', handleDragMove);
		window.removeEventListener('mouseup', handleDragEnd);
		window.removeEventListener('touchmove', handleDragMove);
		window.removeEventListener('touchend', handleDragEnd);
	}

	// ── Synchronized Loop + Chart Animation ──────────────────
	const TOTAL_DUR = 24;       // seconds — ends mid-slow-cycle so red chart finishes on a rise
	const SLOW_CYCLE = 10;      // seconds per slow loop cycle
	const FAST_CYCLE = 2;       // seconds per fast loop cycle
	const SUB_LOOP_R = 22;      // sub-loop circle radius

	// Per-event gains (discrete jumps, not continuous)
	// Slow: 3 sub-loop passes per cycle → +3.33 each, 1 feedback → -6
	// Net per cycle: +10 - 6 = +4. ~2.86 cycles → final ≈11.4
	const SLOW_WRITE_GAIN = 10 / 3;
	const SLOW_FEEDBACK_LOSS = 6;
	// Fast: 1 write per cycle → +3, 1 feedback → -0.3
	// Net per cycle: +2.7. ~13.3 cycles → final ≈36
	const FAST_WRITE_GAIN = 3;
	const FAST_FEEDBACK_LOSS = 1;

	// Chart mapping
	const CHART_X_MIN = 40, CHART_X_MAX = 300;
	const CHART_Y_MIN = 20, CHART_Y_MAX = 130;
	const PROGRESS_MAX = 40;

	let slowPathEl: SVGPathElement | null = $state(null);
	let fastPathEl: SVGPathElement | null = $state(null);
	let loopSectionEl: HTMLElement | null = $state(null);

	let isLoopAnimating = $state(false);
	let loopAnimDone = $state(false);
	let animFrameId = 0;
	let animTime = $state(0);

	let slowDotPos = $state({ x: 200, y: 68 });
	let fastDotPos = $state({ x: 200, y: 130 });

	let slowChartPts: Array<{ x: number; y: number }> = $state([]);
	let fastChartPts: Array<{ x: number; y: number }> = $state([]);

	let slowProgress = $state(0);
	let fastProgress = $state(0);

	// Label highlight flashes (true = currently glowing)
	let slowWriteHl = $state(false);
	let slowFeedbackHl = $state(false);
	let fastWriteHl = $state(false);
	let fastFeedbackHl = $state(false);

	function progressToY(progress: number): number {
		const clamped = Math.max(0, Math.min(PROGRESS_MAX, progress));
		return CHART_Y_MAX - (clamped / PROGRESS_MAX) * (CHART_Y_MAX - CHART_Y_MIN);
	}

	function timeToX(t: number): number {
		return CHART_X_MIN + (t / TOTAL_DUR) * (CHART_X_MAX - CHART_X_MIN);
	}

	// Event thresholds are computed from path geometry at animation start
	type LoopEvent = { dist: number; type: 'write' | 'feedback' };

	function startLoopAnimation() {
		if (isLoopAnimating) return;
		if (!slowPathEl || !fastPathEl) return;
		isLoopAnimating = true;
		loopAnimDone = false;
		slowProgress = 0;
		fastProgress = 0;
		animTime = 0;
		slowChartPts = [{ x: CHART_X_MIN, y: CHART_Y_MAX }];
		fastChartPts = [{ x: CHART_X_MIN, y: CHART_Y_MAX }];

		// ── Compute event thresholds from path geometry ──
		const slowTotal = slowPathEl.getTotalLength();
		const subLoopCirc = 2 * Math.PI * SUB_LOOP_R;  // ≈138
		const mainLoopLen = slowTotal - 3 * subLoopCirc;

		// Slow events: chart jumps up at start of each sub-loop,
		// drops at ~80% through the main loop section (Get Feedback position)
		const slowEvents: LoopEvent[] = [
			{ dist: 0, type: 'write' },                                          // entering sub-loop 1
			{ dist: subLoopCirc, type: 'write' },                                // entering sub-loop 2
			{ dist: 2 * subLoopCirc, type: 'write' },                            // entering sub-loop 3
			{ dist: 3 * subLoopCirc + 0.78 * mainLoopLen, type: 'feedback' },    // Get Feedback
		];

		const fastTotal = fastPathEl.getTotalLength();
		// Fast events: write at start, feedback at ~25% (right side of loop)
		const fastEvents: LoopEvent[] = [
			{ dist: 0, type: 'write' },
			{ dist: 0.25 * fastTotal, type: 'feedback' },
		];

		let startTime: number | null = null;
		let slowEventIdx = -1;
		let fastEventIdx = -1;
		let prevSlowCycle = -1;
		let prevFastCycle = -1;

		// Write → diagonal rise (spread over RISE_DX pixels on x-axis)
		// Feedback → near-vertical drop (spread over DROP_DX pixels)
		const RISE_DX = 12;
		const DROP_DX = 2;

		function fireEvent(type: 'write' | 'feedback', loop: 'slow' | 'fast', x: number) {
			// Flash the corresponding label
			if (loop === 'slow') {
				if (type === 'write') { slowWriteHl = true; setTimeout(() => slowWriteHl = false, 350); }
				else { slowFeedbackHl = true; setTimeout(() => slowFeedbackHl = false, 350); }
			} else {
				if (type === 'write') { fastWriteHl = true; setTimeout(() => fastWriteHl = false, 350); }
				else { fastFeedbackHl = true; setTimeout(() => fastFeedbackHl = false, 350); }
			}

			if (loop === 'slow') {
				if (type === 'write') {
					slowProgress += SLOW_WRITE_GAIN;
					slowChartPts = [...slowChartPts,
						{ x: Math.min(x + RISE_DX, CHART_X_MAX), y: progressToY(slowProgress) }
					];
				} else {
					const lastX = slowChartPts.length > 0 ? slowChartPts[slowChartPts.length - 1].x : x;
					slowProgress = Math.max(0, slowProgress - SLOW_FEEDBACK_LOSS);
					slowChartPts = [...slowChartPts,
						{ x: lastX, y: progressToY(slowProgress) }
					];
				}
			} else {
				if (type === 'write') {
					fastProgress += FAST_WRITE_GAIN;
					fastChartPts = [...fastChartPts,
						{ x: Math.min(x + RISE_DX, CHART_X_MAX), y: progressToY(fastProgress) }
					];
				} else {
					const lastX = fastChartPts.length > 0 ? fastChartPts[fastChartPts.length - 1].x : x;
					fastProgress = Math.max(0, fastProgress - FAST_FEEDBACK_LOSS);
					fastChartPts = [...fastChartPts,
						{ x: lastX, y: progressToY(fastProgress) }
					];
				}
			}
		}

		function tick(now: number) {
			if (!startTime) startTime = now;
			const elapsed = (now - startTime) / 1000;

			if (elapsed >= TOTAL_DUR) {
				animTime = TOTAL_DUR;
				isLoopAnimating = false;
				loopAnimDone = true;
				return;
			}

			animTime = elapsed;
			const x = timeToX(elapsed);

			// ── Slow loop ──
			const slowCycleNum = Math.floor(elapsed / SLOW_CYCLE);
			const slowDist = ((elapsed % SLOW_CYCLE) / SLOW_CYCLE) * slowTotal;

			if (slowPathEl) {
				const pt = slowPathEl.getPointAtLength(slowDist);
				slowDotPos = { x: pt.x, y: pt.y };
			}

			// Reset event index on new cycle
			if (slowCycleNum !== prevSlowCycle) {
				slowEventIdx = -1;
				prevSlowCycle = slowCycleNum;
			}
			// Check if dot crossed any event thresholds
			for (let i = slowEventIdx + 1; i < slowEvents.length; i++) {
				if (slowDist >= slowEvents[i].dist) {
					fireEvent(slowEvents[i].type, 'slow', x);
					slowEventIdx = i;
				}
			}

			// ── Fast loop ──
			const fastCycleNum = Math.floor(elapsed / FAST_CYCLE);
			const fastDist = ((elapsed % FAST_CYCLE) / FAST_CYCLE) * fastTotal;

			if (fastPathEl) {
				const pt = fastPathEl.getPointAtLength(fastDist);
				fastDotPos = { x: pt.x, y: pt.y };
			}

			if (fastCycleNum !== prevFastCycle) {
				fastEventIdx = -1;
				prevFastCycle = fastCycleNum;
			}
			for (let i = fastEventIdx + 1; i < fastEvents.length; i++) {
				if (fastDist >= fastEvents[i].dist) {
					fireEvent(fastEvents[i].type, 'fast', x);
					fastEventIdx = i;
				}
			}

			animFrameId = requestAnimationFrame(tick);
		}

		animFrameId = requestAnimationFrame(tick);
	}

	function replayLoopAnimation() {
		if (animFrameId) cancelAnimationFrame(animFrameId);
		isLoopAnimating = false;
		loopAnimDone = false;
		slowProgress = 0;
		fastProgress = 0;
		animTime = 0;
		slowChartPts = [];
		fastChartPts = [];
		slowDotPos = { x: 200, y: 68 };
		fastDotPos = { x: 200, y: 130 };
		setTimeout(() => startLoopAnimation(), 50);
	}

	// Chart polyline strings: only event points, no trailing cursor
	let slowChartPointsStr = $derived(slowChartPts.map(p => `${p.x},${p.y}`).join(' '));
	let fastChartPointsStr = $derived(fastChartPts.map(p => `${p.x},${p.y}`).join(' '));

	// Final values for gap indicator
	let slowFinalY = $derived(progressToY(slowProgress));
	let fastFinalY = $derived(progressToY(fastProgress));

	// Auto-start on scroll into view
	$effect(() => {
		if (!loopSectionEl) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isLoopAnimating && !loopAnimDone) {
					startLoopAnimation();
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(loopSectionEl);
		return () => observer.disconnect();
	});
</script>

<!-- ============================================================ -->
<!-- HERO                                                         -->
<!-- ============================================================ -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="hero-content">
		<ScrollReveal direction="none" delay={200}>
			<p class="hero-label">A Guide to</p>
		</ScrollReveal>
		<ScrollReveal direction="none" delay={500}>
			<h1 class="hero-title">
				Pair<br />Programming
			</h1>
		</ScrollReveal>
		<ScrollReveal direction="none" delay={800}>
			<p class="hero-subtitle">A tool for your toolbox — for when it's time to look closely.</p>
		</ScrollReveal>
		<div class="scroll-hint">
			<span>Scroll to explore</span>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- THE VISUAL — standalone                                      -->
<!-- ============================================================ -->
<section class="section section-visual-hero">
	<div class="container">
		<ScrollReveal direction="none">
			<div class="visual-pair">
				<div class="visual-person">
					<div class="visual-icon">D</div>
					<span>Driver</span>
				</div>
				<div class="visual-connector">
					<div class="visual-screen"></div>
				</div>
				<div class="visual-person">
					<div class="visual-icon">N</div>
					<span>Navigator</span>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHAT IS PAIR PROGRAMMING?                                    -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Concept</p>
			<h2>What is Pair Programming?</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Two developers. One workstation. One writes code, the other reviews every line in real time.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={300}>
			<p class="body">
				Then the roles switch.
			</p>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHERE IT CAME FROM                                           -->
<!-- ============================================================ -->
<OriginSection />

<!-- ============================================================ -->
<!-- THE TWO ROLES                                                -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Roles</p>
			<h2>Driver &amp; Navigator</h2>
		</ScrollReveal>
		<div class="roles-grid">
			<ScrollReveal delay={150} direction="left">
				<div class="card role-card">
					<div class="role-badge driver-badge">D</div>
					<h3>The Driver</h3>
					<ul>
						<li>Controls the keyboard and mouse</li>
						<li>Focuses on writing code</li>
						<li>Thinks <strong>tactically</strong> — syntax, implementation details</li>
						<li>Translates ideas into working code</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={300} direction="right">
				<div class="card role-card">
					<div class="role-badge navigator-badge">N</div>
					<h3>The Navigator</h3>
					<ul>
						<li>Reviews code as it's written</li>
						<li>Thinks <strong>strategically</strong> — architecture, edge cases</li>
						<li>Catches bugs in real time</li>
						<li>Keeps the big picture in mind</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>
		<ScrollReveal delay={450}>
			<div class="callout">
				<span class="callout-icon">&#x21bb;</span>
				<p><strong>Switch roles every 15–25 minutes.</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SECTION 1: SMALL FEEDBACK LOOPS                              -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container" bind:this={loopSectionEl}>
		<ScrollReveal>
			<p class="label">The Foundation</p>
			<h2>Small Loops Win</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				The tighter your feedback loop, the cheaper every fix becomes. Compare these two systems:
			</p>
		</ScrollReveal>

		<ScrollReveal delay={250}>
			<div class="loops-comparison">
				<!-- Slow Loop -->
				<div class="loop-column">
					<h3 class="loop-title loop-title-slow">Slow Feedback</h3>
					<div class="loop-track loop-track-slow">
						<svg viewBox="-50 0 500 380" class="loop-svg">
							<!-- Main loop track -->
							<path
								d="M 200 90 C 310 70, 340 130, 340 190 C 340 250, 310 300, 270 315 C 230 330, 170 330, 130 315 C 90 300, 60 250, 60 190 C 60 130, 90 70, 200 90"
								fill="none" stroke="rgba(239,68,68,0.12)" stroke-width="22" stroke-linecap="round"
							/>
							<!-- Sub-loop track at Write Code -->
							<circle cx="200" cy="90" r="22" fill="none" stroke="rgba(239,68,68,0.12)" stroke-width="22"/>

							<!-- Hidden motion path: 3 sub-loops at Write Code + main loop -->
							<path
								bind:this={slowPathEl}
								d="M 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 A 22 22 0 1 1 200 112 A 22 22 0 1 1 200 68 C 290 50, 340 120, 340 190 C 340 255, 310 300, 270 315 C 230 330, 170 330, 130 315 C 90 300, 60 250, 60 190 C 60 120, 100 55, 200 68"
								fill="none" stroke="none"
							/>

							<!-- Stage labels (highlight on event) -->
							<text x="200" y="42" class="loop-label" fill={slowWriteHl ? '#ef4444' : '#a1a1aa'} font-size={slowWriteHl ? '15' : '13'} text-anchor="middle" font-weight="700">Write Code</text>
							<text x="358" y="195" fill="#a1a1aa" font-size="13" text-anchor="start" font-weight="600">Commit</text>
							<text x="285" y="340" fill="#a1a1aa" font-size="13" text-anchor="start" font-weight="600">Open PR</text>
							<text x="115" y="340" fill="#a1a1aa" font-size="13" text-anchor="end" font-weight="600">Wait for Review</text>
							<text x="42" y="195" class="loop-label" fill={slowFeedbackHl ? '#ef4444' : '#a1a1aa'} font-size={slowFeedbackHl ? '15' : '13'} text-anchor="end" font-weight="600">Get Feedback</text>

							<!-- JS-driven dot -->
							<circle cx={slowDotPos.x} cy={slowDotPos.y} r="7" fill="#ef4444" filter="drop-shadow(0 0 6px rgba(239,68,68,0.6))"/>
						</svg>
					</div>
					<!-- Sawtooth progress chart: big drops (reactive) -->
					<div class="loop-chart">
						<svg viewBox="0 0 320 160" class="loop-progress-svg">
							<rect x="0" y="0" width="320" height="160" fill="#111113" rx="8"/>
							<!-- Grid -->
							<line x1="40" y1="30" x2="300" y2="30" stroke="#1e1e22" stroke-width="1" stroke-dasharray="3,3"/>
							<line x1="40" y1="65" x2="300" y2="65" stroke="#1e1e22" stroke-width="1" stroke-dasharray="3,3"/>
							<line x1="40" y1="100" x2="300" y2="100" stroke="#1e1e22" stroke-width="1" stroke-dasharray="3,3"/>
							<!-- Axes -->
							<line x1="40" y1="130" x2="300" y2="130" stroke="#52525b" stroke-width="1"/>
							<line x1="40" y1="130" x2="40" y2="20" stroke="#52525b" stroke-width="1"/>
							<!-- Axis labels -->
							<text x="170" y="152" fill="#52525b" font-size="9" text-anchor="middle">Time</text>
							<text x="12" y="75" fill="#52525b" font-size="9" text-anchor="middle" transform="rotate(-90, 12, 75)">Features</text>
							<!-- Reactive sawtooth line -->
							{#if slowChartPts.length > 1}
								<polyline
									points={slowChartPointsStr}
									fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								/>
							{/if}
						</svg>
					</div>
				</div>

				<!-- Fast Loop -->
				<div class="loop-column">
					<h3 class="loop-title loop-title-fast">Fast Feedback</h3>
					<div class="loop-track loop-track-fast">
						<svg viewBox="-50 0 500 380" class="loop-svg">
							<!-- Fast loop path: small tight circle -->
							<path
								d="M 200 130 C 270 130, 290 170, 290 200 C 290 230, 270 270, 200 270 C 130 270, 110 230, 110 200 C 110 170, 130 130, 200 130"
								fill="none" stroke="rgba(16,185,129,0.12)" stroke-width="22" stroke-linecap="round"
							/>

							<!-- Hidden motion path for JS sampling -->
							<path
								bind:this={fastPathEl}
								d="M 200 130 C 270 130, 290 170, 290 200 C 290 230, 270 270, 200 270 C 130 270, 110 230, 110 200 C 110 170, 130 130, 200 130"
								fill="none" stroke="none"
							/>

							<!-- Stage labels (highlight on event) -->
							<text x="200" y="112" class="loop-label" fill={fastWriteHl ? '#10b981' : '#a1a1aa'} font-size={fastWriteHl ? '15' : '13'} text-anchor="middle" font-weight="700">Write Code</text>
							<text x="308" y="205" class="loop-label" fill={fastFeedbackHl ? '#10b981' : '#a1a1aa'} font-size={fastFeedbackHl ? '15' : '13'} text-anchor="start" font-weight="600">Get Feedback</text>
							<text x="200" y="298" fill="#a1a1aa" font-size="13" text-anchor="middle" font-weight="600">Fix</text>

							<!-- JS-driven dot -->
							<circle cx={fastDotPos.x} cy={fastDotPos.y} r="7" fill="#10b981" filter="drop-shadow(0 0 6px rgba(16,185,129,0.6))"/>
						</svg>
					</div>
					<!-- Sawtooth progress chart: tiny drops (reactive) -->
					<div class="loop-chart">
						<svg viewBox="0 0 320 160" class="loop-progress-svg">
							<rect x="0" y="0" width="320" height="160" fill="#111113" rx="8"/>
							<!-- Grid -->
							<line x1="40" y1="30" x2="300" y2="30" stroke="#1e1e22" stroke-width="1" stroke-dasharray="3,3"/>
							<line x1="40" y1="65" x2="300" y2="65" stroke="#1e1e22" stroke-width="1" stroke-dasharray="3,3"/>
							<line x1="40" y1="100" x2="300" y2="100" stroke="#1e1e22" stroke-width="1" stroke-dasharray="3,3"/>
							<!-- Axes -->
							<line x1="40" y1="130" x2="300" y2="130" stroke="#52525b" stroke-width="1"/>
							<line x1="40" y1="130" x2="40" y2="20" stroke="#52525b" stroke-width="1"/>
							<!-- Axis labels -->
							<text x="170" y="152" fill="#52525b" font-size="9" text-anchor="middle">Time</text>
							<text x="12" y="75" fill="#52525b" font-size="9" text-anchor="middle" transform="rotate(-90, 12, 75)">Features</text>
							<!-- Reactive sawtooth line -->
							{#if fastChartPts.length > 1}
								<polyline
									points={fastChartPointsStr}
									fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								/>
							{/if}
						</svg>
					</div>
				</div>
			</div>
		</ScrollReveal>

		{#if loopAnimDone}
			<div class="replay-wrap">
				<button class="replay-btn" onclick={replayLoopAnimation}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
					</svg>
					Replay
				</button>
			</div>
		{/if}

		<ScrollReveal delay={400}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>Catching a bug in the moment costs minutes. Finding it in a PR review costs hours. Discovering it in production costs days. <strong>The tighter the loop, the cheaper the fix.</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SECTION: EXPERTISE FUNCTION                                   -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Insight</p>
			<h2>The Expertise Function</h2>
		</ScrollReveal>

		<ScrollReveal delay={250}>
			<ExpertiseFormula />
		</ScrollReveal>

		<ScrollReveal delay={400}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>Pair programming builds <strong>all three layers simultaneously</strong> &mdash; in real time, not as an afterthought.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SECTION 2: MENTORING COMPOUNDS                               -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Investment</p>
			<h2>Mentoring Compounds Fast</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Even on a three-month project, pairing a junior with a senior pays off. The initial slowdown is an investment — not a cost.
			</p>
		</ScrollReveal>

		<ScrollReveal delay={250}>
			<div class="mentoring-chart-wrap">
				<svg viewBox="0 0 780 400" class="mentoring-svg">
					<rect x="0" y="0" width="780" height="400" fill="#111113" rx="12"/>

					<!-- Grid -->
					<g stroke="#1e1e22" stroke-width="1">
						<line x1="80" y1="70" x2="620" y2="70" stroke-dasharray="4,4"/>
						<line x1="80" y1="130" x2="620" y2="130" stroke-dasharray="4,4"/>
						<line x1="80" y1="190" x2="620" y2="190" stroke-dasharray="4,4"/>
						<line x1="80" y1="250" x2="620" y2="250" stroke-dasharray="4,4"/>
					</g>

					<!-- Axes -->
					<line x1="80" y1="310" x2="620" y2="310" stroke="#52525b" stroke-width="1.5"/>
					<line x1="80" y1="310" x2="80" y2="50" stroke="#52525b" stroke-width="1.5"/>

					<!-- Axis labels -->
					<text x="350" y="365" fill="#a1a1aa" font-size="13" text-anchor="middle" font-weight="600">Time</text>
					<text x="32" y="180" fill="#a1a1aa" font-size="13" text-anchor="middle" font-weight="600" transform="rotate(-90, 32, 180)">Productivity</text>

					<!-- Time markers -->
					<text x="175" y="335" fill="#a1a1aa" font-size="11" text-anchor="middle">Week 2</text>
					<text x="350" y="335" fill="#a1a1aa" font-size="11" text-anchor="middle">Month 1</text>
					<text x="530" y="335" fill="#a1a1aa" font-size="11" text-anchor="middle">Month 3</text>

					<!-- Solo line: starts ok, grows slowly, plateaus -->
					<path
						d="M 80 250 C 150 245, 250 232, 350 222 C 450 212, 550 207, 620 200"
						fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"
						stroke-dasharray="1200" stroke-dashoffset="1200"
					>
						<animate attributeName="stroke-dashoffset" from="1200" to="0" dur="2.5s" begin="0.5s" fill="freeze"/>
					</path>
					<!-- Solo label: positioned inside chart area, end-anchored -->
					<text x="620" y="195" fill="#ef4444" font-size="13" font-weight="700" text-anchor="end" opacity="0">
						Solo
						<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.8s" fill="freeze"/>
					</text>

					<!-- With mentoring line: dips initially, then rises steeply, crosses over -->
					<path
						d="M 80 250 C 120 265, 160 270, 200 260 C 280 235, 340 190, 400 150 C 460 115, 530 90, 620 75"
						fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"
						stroke-dasharray="1200" stroke-dashoffset="1200"
					>
						<animate attributeName="stroke-dashoffset" from="1200" to="0" dur="2.5s" begin="0.5s" fill="freeze"/>
					</path>
					<!-- With Mentoring label: positioned inside chart area, end-anchored -->
					<text x="620" y="70" fill="#10b981" font-size="13" font-weight="700" text-anchor="end" opacity="0">
						With Mentoring
						<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.8s" fill="freeze"/>
					</text>

					<!-- Legend (top-right, always visible) -->
					<g transform="translate(630, 70)" opacity="0">
						<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.8s" fill="freeze"/>
						<rect x="0" y="0" width="135" height="70" fill="#111113" fill-opacity="0.9" stroke="#1e1e22" stroke-width="1" rx="6"/>
						<line x1="12" y1="22" x2="36" y2="22" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
						<text x="44" y="26" fill="#10b981" font-size="11" font-weight="600">With Mentoring</text>
						<line x1="12" y1="48" x2="36" y2="48" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
						<text x="44" y="52" fill="#ef4444" font-size="11" font-weight="600">Solo</text>
					</g>

					<!-- Crossover highlight -->
					<g opacity="0">
						<animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="3.2s" fill="freeze"/>
						<line x1="260" y1="242" x2="260" y2="310" stroke="#818cf8" stroke-width="1" stroke-dasharray="4,3"/>
						<circle cx="260" cy="242" r="5" fill="#818cf8" opacity="0.8"/>
						<text x="272" y="239" fill="#818cf8" font-size="11" font-weight="600" text-anchor="start">Crossover</text>
					</g>

					<!-- Investment zone shade -->
					<rect x="80" y="250" width="180" height="28" fill="#10b981" fill-opacity="0.06" rx="4" opacity="0">
						<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="3.5s" fill="freeze"/>
					</rect>
					<text x="170" y="292" fill="#52525b" font-size="10" text-anchor="middle" opacity="0">
						Investment phase
						<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="3.5s" fill="freeze"/>
					</text>
				</svg>
			</div>
		</ScrollReveal>

		<ScrollReveal delay={400}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>Knowledge silos kill velocity. A junior who pairs with a senior learns more in weeks than one who reads documentation for months. <strong>Mentoring isn't optional — it's an investment that pays off fast.</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SECTION 3: REVIEWS NEED INSIGHT (Interactive Formula)        -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Formula</p>
			<h2>Reviews Need Codebase Knowledge</h2>
		</ScrollReveal>
		<!-- Interactive SVG Diagram (from CodeReviewWithAI) -->
		<ScrollReveal delay={250}>
			<div class="formula-diagram-wrap">
				<svg
					bind:this={svgElement}
					viewBox="0 0 700 420"
					class="formula-interactive-svg"
				>
					<rect x="0" y="0" width="700" height="420" fill="#111113" rx="12"/>

					<!-- Grid lines -->
					<g stroke="#1e1e22" stroke-width="1">
						<line x1="100" y1="350" x2="650" y2="350"/>
						<line x1="100" y1="280" x2="650" y2="280" stroke-dasharray="5,5"/>
						<line x1="100" y1="210" x2="650" y2="210" stroke-dasharray="5,5"/>
						<line x1="100" y1="140" x2="650" y2="140" stroke-dasharray="5,5"/>
						<line x1="100" y1="70" x2="650" y2="70"/>
						<line x1="100" y1="70" x2="100" y2="350"/>
						<line x1="237" y1="70" x2="237" y2="350" stroke-dasharray="5,5"/>
						<line x1="375" y1="70" x2="375" y2="350" stroke-dasharray="5,5"/>
						<line x1="512" y1="70" x2="512" y2="350" stroke-dasharray="5,5"/>
						<line x1="650" y1="70" x2="650" y2="350"/>
					</g>

					<!-- Axes -->
					<g stroke="#fafafa" stroke-width="2">
						<line x1="100" y1="350" x2="650" y2="350"/>
						<line x1="100" y1="350" x2="100" y2="70"/>
						<polygon points="650,350 640,345 640,355" fill="#fafafa"/>
						<polygon points="100,70 95,80 105,80" fill="#fafafa"/>
					</g>

					<!-- Axis labels -->
					<text x="375" y="395" fill="#fafafa" font-size="14" font-weight="600" text-anchor="middle">Content (Amount of Code to Review)</text>
					<text x="40" y="210" fill="#818cf8" font-size="14" font-weight="600" text-anchor="middle" transform="rotate(-90, 40, 210)">Insight (Understanding)</text>

					<!-- Scale labels X -->
					<text x="100" y="370" fill="#52525b" font-size="11" text-anchor="middle">0</text>
					<text x="237" y="370" fill="#52525b" font-size="11" text-anchor="middle">Small</text>
					<text x="375" y="370" fill="#52525b" font-size="11" text-anchor="middle">Medium</text>
					<text x="512" y="370" fill="#52525b" font-size="11" text-anchor="middle">Large</text>
					<text x="650" y="370" fill="#52525b" font-size="11" text-anchor="middle">Huge</text>

					<!-- Scale labels Y -->
					<text x="90" y="354" fill="#52525b" font-size="11" text-anchor="end">High</text>
					<text x="90" y="214" fill="#52525b" font-size="11" text-anchor="end">Medium</text>
					<text x="90" y="74" fill="#52525b" font-size="11" text-anchor="end">Low</text>

					<!-- Interactive rectangle -->
					<rect
						x="100"
						y={350 - rectHeight}
						width={rectWidth}
						height={rectHeight}
						fill={rectColor}
						fill-opacity="0.35"
						stroke={rectColor}
						stroke-width="3"
						style="transition: all 0.15s ease-out;"
					/>

					<!-- "Meaningful Review" text -->
					{#if meaningfulOpacity > 0.1}
						<g opacity={meaningfulOpacity} style="transition: opacity 0.2s;">
							<text x={100 + rectWidth / 2} y={350 - rectHeight / 2 - 10} fill="#10b981" font-size="16" font-weight="700" text-anchor="middle">Meaningful</text>
							<text x={100 + rectWidth / 2} y={350 - rectHeight / 2 + 12} fill="#10b981" font-size="16" font-weight="700" text-anchor="middle">Review</text>
						</g>
					{/if}

					<!-- "LGTM" text -->
					{#if lgtmOpacity > 0.1}
						<g opacity={lgtmOpacity} style="transition: opacity 0.2s;">
							<text x={100 + rectWidth / 2} y={350 - rectHeight / 2 - 8} fill="#ef4444" font-size="22" font-weight="800" text-anchor="middle">"Looks Good</text>
							<text x={100 + rectWidth / 2} y={350 - rectHeight / 2 + 18} fill="#ef4444" font-size="22" font-weight="800" text-anchor="middle">To Me!"</text>
						</g>
					{/if}

					<!-- Draggable handle -->
					<g
						class="drag-handle"
						role="slider"
						aria-label="Drag to resize review area"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow={Math.round(areaPercent)}
						tabindex="0"
						onmousedown={handleDragStart}
						ontouchstart={handleDragStart}
						style="cursor: nwse-resize;"
					>
						<circle cx={handleX} cy={handleY} r="18" fill="transparent"/>
						<circle cx={handleX} cy={handleY} r="10" fill={isDragging ? '#ffffff' : rectColor} stroke="#ffffff" stroke-width="2" style="transition: fill 0.1s;" class:dragging={isDragging}/>
						<circle cx={handleX} cy={handleY} r="3" fill={isDragging ? rectColor : '#ffffff'} style="transition: fill 0.1s;"/>
					</g>
				</svg>

				<!-- Status -->
				<div class="formula-status" style="border-color: {rectColor};">
					<span class="formula-status-dot" style="background: {rectColor};"></span>
					<span>{statusText}</span>
				</div>
			</div>

			<!-- Sliders -->
			<div class="formula-sliders">
				<div class="formula-slider-group">
					<label for="content-slider">
						<span><strong>Content</strong> (lines of code)</span>
						<span class="formula-slider-value">{contentSize < 30 ? 'Small' : contentSize < 60 ? 'Medium' : contentSize < 85 ? 'Large' : 'Huge'}</span>
					</label>
					<input id="content-slider" type="range" min="5" max="100" bind:value={contentSize} class="formula-range"/>
					<div class="formula-slider-labels"><span>10 lines</span><span>1000+ lines</span></div>
				</div>
				<div class="formula-slider-group">
					<label for="time-slider">
						<span><strong>Time Passed</strong></span>
						<span class="formula-slider-value">{timeLabel}</span>
					</label>
					<input id="time-slider" type="range" min="5" max="100" bind:value={timePassed} class="formula-range"/>
					<div class="formula-slider-labels"><span>Just written</span><span>Weeks/months later</span></div>
				</div>
			</div>

			<!-- Scenario buttons -->
			<div class="formula-scenarios">
				<button class="scenario-btn" onclick={() => { contentSize = 15; timePassed = 10; }}>Pair Programming</button>
				<button class="scenario-btn" onclick={() => { contentSize = 35; timePassed = 30; }}>Same Day PR</button>
				<button class="scenario-btn" onclick={() => { contentSize = 55; timePassed = 60; }}>Week Later</button>
				<button class="scenario-btn" onclick={() => { contentSize = 85; timePassed = 90; }}>Month Later</button>
			</div>
		</ScrollReveal>

		<ScrollReveal delay={400}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>Pair programming maximizes both variables: <strong>tiny content</strong> (one line at a time) and <strong>maximum insight</strong> (you just discussed it). That's why it's the tightest possible review.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SECTION: COMBINED LOOPS — REVIEW FOCUS                       -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Payoff</p>
			<h2>Two Loops, One Workflow</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<CombinedLoopDiagram />
		</ScrollReveal>

	</div>
</section>

<!-- ============================================================ -->
<!-- BENEFITS                                                     -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Good</p>
			<h2>Why Pair Program?</h2>
		</ScrollReveal>
		<div class="benefits-grid">
			{#each benefits as b, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="card benefit-card">
						<div class="benefit-stat">{@html b.stat}</div>
						<h3>{b.title}</h3>
						<p>{b.description}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT II — THE HUMAN PROBLEM                                   -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- WHY IT HASN'T CAUGHT ON                                      -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Human Problem</p>
			<h2>Why It Hasn't Caught On</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				25 years of research. Clear benefits. And yet — most devs don't do it. Not because it doesn't work. Because it asks something most workplaces don't talk about.
			</p>
		</ScrollReveal>
		<div class="barrier-grid">
			{#each barriers as b, i}
				<ScrollReveal delay={(i + 2) * 100}>
					<div class="card barrier-card">
						<h3>{b.title}</h3>
						<p>{b.description}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
		<ScrollReveal delay={600}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>The question isn't "Should we pair?" — it's <strong>"Does your team feel safe enough to try?"</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- TEAM QUIZ RESULTS                                            -->
<!-- ============================================================ -->
<section class="section" id="team-results">
	<div class="container">
		<ScrollReveal>
			<p class="label">Check In</p>
			<h2>How Safe Does Your Team Feel?</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Before we talk about techniques, let's get honest. Take the psychological safety quiz and see where your team really stands.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={300}>
			<TeamResults />
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHAT WE CAN DO                                               -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">Building Safety</p>
			<h2>What We Can Do</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Psychological safety isn't a personality trait. It's a team condition. And conditions can be changed.
			</p>
		</ScrollReveal>
		<div class="tips-grid">
			{#each safetyTips as tip, i}
				<ScrollReveal delay={(i + 1) * 50 + 50}>
					<div class="tip">
						<span class="tip-num">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3>{tip.title}</h3>
							<p>{tip.description}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
		<ScrollReveal delay={400}>
			<div class="callout">
				<span class="callout-icon">&rarr;</span>
				<p>Safety is not about being comfortable all the time. It's about knowing that <strong>discomfort won't be punished</strong>.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT III — PRACTICAL MASTERY                                  -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- CLASSIC OBJECTIONS                                           -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Timeless Pushback</p>
			<h2>Classic Objections</h2>
		</ScrollReveal>
		<div class="objection-response-list">
			{#each classicObjections as obj, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="objection-response">
						<div class="objection-quote">
							<p>{obj.objection}</p>
						</div>
						<div class="response">
							<p>{@html obj.response}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PITFALLS                                                     -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Challenges</p>
			<h2>Common Pitfalls</h2>
		</ScrollReveal>
		<div class="pitfalls-list">
			{#each pitfalls as p, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="pitfall">
						<div class="pitfall-header">
							<h3>{p.title}</h3>
							<span class="pitfall-severity {p.severity}">{p.severityLabel}</span>
						</div>
						<p>{p.description}</p>
						<div class="pitfall-solution">
							<strong>Fix:</strong> {p.fix}
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHERE TO PAIR — ARCHITECTURE DIAGRAM                         -->
<!-- ============================================================ -->
<ArchitectureDiagram />

<!-- ============================================================ -->
<!-- PAIRING STYLES                                               -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Methods</p>
			<h2>Pairing Styles</h2>
		</ScrollReveal>
		<div class="styles-list">
			{#each pairingStyles as style, i}
				<ScrollReveal delay={i * 150 + 200}>
					<div class="card style-card">
						<div class="style-number">{String(i + 1).padStart(2, '0')}</div>
						<h3>{style.title}</h3>
						<p class="style-tag">{style.tag}</p>
						<p>{style.description}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- WHEN TO PAIR                                                 -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Decision</p>
			<h2>When to Pair</h2>
		</ScrollReveal>
		<div class="when-grid">
			{#each whenColumns as col, i}
				<ScrollReveal delay={i * 150 + 100}>
					<div class="card when-card {col.variant}">
						<h3>{col.title}</h3>
						<ul>
							{#each col.items as item}
								<li>{@html item}</li>
							{/each}
						</ul>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- SESSION STRUCTURE                                            -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Rhythm</p>
			<h2>Session Structure</h2>
		</ScrollReveal>
		<div class="session-steps">
			{#each sessionSteps as step, i}
				<ScrollReveal delay={(i + 1) * 100}>
					<div class="session-step">
						<span class="session-step-num">{i + 1}</span>
						<div>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PRACTICAL EXAMPLE                                            -->
<!-- ============================================================ -->
<PracticalExample />

<!-- ============================================================ -->
<!-- TDD PING-PONG VISUALIZATION                                  -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">TDD In Action</p>
			<h2>Ping-Pong Pairing</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Roles switch at <strong>every</strong> phase. After two full cycles, both developers have written tests, implementations, and refactorings.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={300}>
			<PingPongDiagram />
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT IV — MODERN CONTEXT                                      -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- THE 2026 QUESTION                                            -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Elephant in the Room</p>
			<h2>But It's 2026.</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				AI is fast. Work is parallelized. Why would you pair?
			</p>
		</ScrollReveal>
		<ScrollReveal delay={200}>
			<p class="body">
				You've seen the techniques. You know the human challenges. Now let's talk about the machine in the room.
			</p>
		</ScrollReveal>

		<div class="objections">
			{#each modernObjections as obj, i}
				<ScrollReveal delay={i * 150 + 250}>
					<div class="objection">
						<div class="objection-quote">
							<p>{obj.quote}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		<ScrollReveal delay={700}>
			<p class="body" style="margin-top: 2rem;">
				These aren't beginner thoughts. These are <strong>real questions</strong>. And just like the human challenges we explored earlier, they deserve honest answers.
			</p>
		</ScrollReveal>

		<ScrollReveal delay={850}>
			<div class="answers">
				{#each aiAnswers as a}
					<div class="answer">
						<h3>{a.title}</h3>
						<p>{@html a.description}</p>
					</div>
				{/each}
			</div>
		</ScrollReveal>

		<ScrollReveal delay={1000}>
			<div class="callout">
				<span class="callout-icon">&#x1F9F0;</span>
				<p><strong>A tool for your toolbox</strong> — for when it's time to look at something really carefully.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- AI WORKFLOWS                                                 -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">Human + Machine</p>
			<h2>AI Workflows</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				AI assistants are fast, tireless, and never feel awkward. But they never push back, never ask "does this actually make sense?"
			</p>
		</ScrollReveal>
		<div class="ai-grid">
			<ScrollReveal delay={250}>
				<div class="card ai-card ai-human">
					<h3>Pair with a Human</h3>
					<ul>
						<li>Architecture &amp; system design</li>
						<li>Security-critical code</li>
						<li>Domain logic &amp; business rules</li>
						<li>Onboarding &amp; knowledge transfer</li>
						<li>Challenging assumptions</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card ai-card ai-machine">
					<h3>Let AI Assist</h3>
					<ul>
						<li>Boilerplate &amp; scaffolding</li>
						<li>Isolated, well-defined tasks</li>
						<li>Prototyping &amp; spike work</li>
						<li>Repetitive refactoring</li>
						<li>Test generation</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>
		<ScrollReveal delay={500}>
			<div class="callout">
				<span class="callout-icon">&#x21C4;</span>
				<p><strong>The hybrid session:</strong> AI generates a draft. Two humans pair-review and refine. You get speed <em>and</em> understanding.</p>
			</div>
		</ScrollReveal>
		<ScrollReveal delay={600}>
			<div class="key-takeaway" style="margin-top: 2rem;">
				<p>AI makes solo coding faster. Pair programming makes team understanding deeper. <strong>The best teams use both.</strong></p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- ACT V — EXTENSIONS & WRAP-UP                                 -->
<!-- ============================================================ -->

<!-- ============================================================ -->
<!-- MOB PROGRAMMING                                              -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">Beyond Pairing</p>
			<h2>Mob Programming</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">
				Take pair programming further — the whole team works on the same thing, at the same time, on the same computer.
			</p>
		</ScrollReveal>
		<ScrollReveal delay={250}>
			<div class="mob-visual">
				<div class="mob-person mob-driver">
					<div class="mob-icon">D</div>
					<span>Driver</span>
				</div>
				<div class="mob-group">
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
					<div class="mob-person">
						<div class="mob-icon mob-nav-icon">N</div>
						<span>Navigator</span>
					</div>
				</div>
			</div>
		</ScrollReveal>

		<div class="mob-details">
			<ScrollReveal delay={350}>
				<div class="card">
					<h3>How It Works</h3>
					<ol class="mob-steps">
						<li>The whole team gathers at one screen</li>
						<li>One person drives (types)</li>
						<li>Everyone else navigates (discusses, guides)</li>
						<li>Rotate the driver every <strong>10–15 minutes</strong></li>
						<li>Use a mob timer to keep rotations regular</li>
					</ol>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={450}>
				<div class="card">
					<h3>When to Use It</h3>
					<ul>
						<li>Complex problems needing diverse expertise</li>
						<li>Onboarding new team members</li>
						<li>Knowledge sharing across the team</li>
						<li>Critical-path code everyone must understand</li>
						<li>Architectural decisions with team-wide impact</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={550}>
				<div class="card">
					<h3>Tooling</h3>
					<ul>
						<li><strong>Mob Timer</strong> — mobti.me or Mobster app</li>
						<li><strong>VS Code Live Share</strong> — real-time collaborative editing</li>
						<li><strong>Screen sharing</strong> — Zoom, Teams, or Google Meet</li>
						<li><strong>Shared workspace</strong> — Tuple, Pop, or CodeTogether</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>

		<ScrollReveal delay={650}>
			<div class="callout">
				<span class="callout-icon">&#x2194;</span>
				<p><strong>Pair = 2 people, deep focus.</strong> Mob = whole team, broad knowledge sharing. Both have their place. Use pairing for daily work, mobbing for complex or high-impact tasks.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- REMOTE PAIRING                                               -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">Distributed Teams</p>
			<h2>Remote Pairing</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<p class="lead">Most teams are remote or hybrid now. Pairing still works — it just needs the right setup.</p>
		</ScrollReveal>
		<div class="remote-grid">
			<ScrollReveal delay={250}>
				<div class="card">
					<h3>Essential Tools</h3>
					<ul>
						<li><strong>VS Code Live Share</strong> — both edit the same codebase</li>
						<li><strong>JetBrains Code With Me</strong> — same, for IntelliJ users</li>
						<li><strong>Screen sharing</strong> — Zoom, Teams, Discord</li>
						<li><strong>Good audio</strong> — headsets, mute when not talking</li>
					</ul>
				</div>
			</ScrollReveal>
			<ScrollReveal delay={400}>
				<div class="card">
					<h3>Remote Tips</h3>
					<ul>
						<li><strong>Over-communicate</strong> — no body language to read</li>
						<li><strong>Driver's cursor</strong> — point with your mouse when explaining</li>
						<li><strong>More breaks</strong> — screen fatigue is real</li>
						<li><strong>Agree on shortcuts</strong> — "your turn" / "I've got this"</li>
					</ul>
				</div>
			</ScrollReveal>
		</div>
		<ScrollReveal delay={500}>
			<div class="callout">
				<span class="callout-icon">&bull;</span>
				<p><strong>Audio is essential. Video is optional.</strong> A stable connection and a good mic matter more than seeing each other's face.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- BEST PRACTICES                                               -->
<!-- ============================================================ -->
<section class="section">
	<div class="container">
		<ScrollReveal>
			<p class="label">The Playbook</p>
			<h2>Best Practices</h2>
		</ScrollReveal>
		<div class="tips-grid">
			{#each bestPractices as bp, i}
				<ScrollReveal delay={i * 50 + 100}>
					<div class="tip">
						<span class="tip-num">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3>{bp.title}</h3>
							<p>{bp.description}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- SUMMARY                                                      -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">At a Glance</p>
			<h2>Summary</h2>
		</ScrollReveal>

		<ScrollReveal delay={150}>
			<div class="summary-grid">
				{#each summaryCards as card}
					<div class="summary-card">
						<h3>{card.title}</h3>
						<p>{card.description}</p>
					</div>
				{/each}
			</div>
		</ScrollReveal>

		<ScrollReveal delay={300}>
			<div class="key-takeaway">
				<p>Pair programming is not about being faster. In 2026, AI already does that.<br />It's about building <strong>understanding</strong> — in your head, and in your team — for when it truly matters.</p>
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- SOURCES                                                      -->
<!-- ============================================================ -->
<section class="section section-sources">
	<div class="container">
		<ScrollReveal>
			<p class="label">References</p>
			<h2>Sources &amp; Further Reading</h2>
		</ScrollReveal>
		<ScrollReveal delay={150}>
			<div class="sources-list">
				{#each sources as src, i}
					<div class="source">
						<span class="source-num">{i + 1}</span>
						<div>
							<a href={src.url} target="_blank" rel="noopener" class="source-title">{src.title}</a>
							<p class="source-meta">{@html src.meta}</p>
						</div>
					</div>
				{/each}
			</div>
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- FEEDBACK                                                     -->
<!-- ============================================================ -->
<section class="section section-alt">
	<div class="container">
		<ScrollReveal>
			<p class="label">Feedback</p>
			<h2>Was This Helpful?</h2>
			<FeedbackForm />
		</ScrollReveal>
	</div>
</section>

<!-- ============================================================ -->
<!-- FOOTER                                                       -->
<!-- ============================================================ -->
<footer class="footer">
	<p>Built with SvelteKit. Content based on research and industry best practices.</p>
</footer>

<!-- ============================================================ -->
<!-- STYLES                                                       -->
<!-- ============================================================ -->
<style>
	/* ── Hero ────────────────────────────────────────────────── */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		overflow: hidden;
		padding: 2rem;
	}

	.hero-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(99, 102, 241, 0.15) 0%, transparent 70%),
			radial-gradient(ellipse 40% 40% at 60% 55%, rgba(168, 85, 247, 0.1) 0%, transparent 60%);
		animation: glow-pulse 8s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	.hero-content {
		position: relative;
		z-index: 1;
	}

	.hero-label {
		font-size: 0.85rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: clamp(3.5rem, 10vw, 8rem);
		font-weight: 800;
		line-height: 0.95;
		letter-spacing: -0.04em;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1.5rem;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 2.5vw, 1.35rem);
		color: var(--text-secondary);
		font-weight: 300;
		max-width: 500px;
		margin: 0 auto;
	}

	.scroll-hint {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-muted);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		animation: hint-bounce 2.5s ease-in-out infinite;
	}

	@keyframes hint-bounce {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(6px); }
	}

	/* ── Visual Hero Section ─────────────────────────────────── */
	.section-visual-hero {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.section-visual-hero .visual-pair {
		background: none;
		border: none;
		padding: 0;
		gap: 3rem;
	}

	.section-visual-hero .visual-icon {
		width: 80px;
		height: 80px;
		font-size: 1.6rem;
	}

	.section-visual-hero .visual-person span {
		font-size: 0.9rem;
	}

	.section-visual-hero .visual-screen {
		width: 90px;
		height: 60px;
	}

	/* ── Visual: Pair Diagram ────────────────────────────────── */
	.visual-pair {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		margin-top: 2.5rem;
		padding: 2.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.visual-person {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.visual-person span {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.visual-icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.2rem;
		background: var(--gradient);
		color: white;
	}

	.visual-connector {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.visual-screen {
		width: 70px;
		height: 48px;
		border: 2px solid var(--border-bright);
		border-radius: 6px;
		position: relative;
	}

	.visual-screen::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 24px;
		height: 6px;
		background: var(--border-bright);
		border-radius: 0 0 3px 3px;
	}

	/* ── Roles Grid ──────────────────────────────────────────── */
	.roles-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 640px) {
		.roles-grid {
			grid-template-columns: 1fr;
		}
	}

	.role-card {
		text-align: center;
	}

	.role-card ul {
		text-align: left;
	}

	.role-badge {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.driver-badge {
		background: linear-gradient(135deg, #6366f1, #818cf8);
		color: white;
	}

	.navigator-badge {
		background: linear-gradient(135deg, #a855f7, #c084fc);
		color: white;
	}

	/* ── Section 1: Feedback Loops ──────────────────────────── */
	.loops-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin: 1.5rem 0 2rem;
	}

	@media (max-width: 640px) {
		.loops-comparison {
			grid-template-columns: 1fr;
		}
	}

	.loop-column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loop-title {
		font-size: 1.1rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		text-align: center;
	}

	.loop-title-slow { color: #ef4444; }
	.loop-title-fast { color: #10b981; }

	.loop-track {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.loop-track-slow { border-color: rgba(239, 68, 68, 0.15); }
	.loop-track-fast { border-color: rgba(16, 185, 129, 0.15); }

	.loop-svg {
		width: 100%;
		max-width: 280px;
		display: block;
	}

	.loop-chart {
		width: 100%;
		margin-top: 1rem;
	}

	.loop-progress-svg {
		width: 100%;
		display: block;
		border-radius: 8px;
	}

	.loop-label {
		transition: fill 0.15s ease, font-size 0.15s ease;
	}

	.replay-wrap {
		display: flex;
		justify-content: center;
		margin: 1rem 0 0.5rem;
	}

	.replay-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 1rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: #a1a1aa;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.replay-btn:hover {
		color: #e4e4e7;
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
	}

	/* ── Section 2: Mentoring Graph ────────────────────────── */
	.mentoring-chart-wrap {
		margin: 1.5rem 0 2rem;
	}

	.mentoring-svg {
		width: 100%;
		max-width: 700px;
		display: block;
		border-radius: 12px;
	}

	/* ── Section 3: Interactive Formula ────────────────────── */
	.formula-diagram-wrap {
		margin: 1.5rem 0 1rem;
	}

	.formula-interactive-svg {
		width: 100%;
		max-width: 700px;
		display: block;
		border-radius: 12px;
		user-select: none;
	}

	.formula-status {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		margin-top: 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-left-width: 3px;
		border-radius: var(--radius-sm);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text-secondary);
		transition: border-color 0.3s;
	}

	.formula-status-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
		transition: background 0.3s;
	}

	.formula-sliders {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		max-width: 700px;
		margin: 1.5rem 0;
	}

	@media (max-width: 540px) {
		.formula-sliders {
			grid-template-columns: 1fr;
		}
	}

	.formula-slider-group label {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.formula-slider-value {
		color: var(--text-muted);
	}

	.formula-range {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background: var(--bg-card);
		border-radius: 4px;
		outline: none;
		cursor: pointer;
	}

	.formula-range::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: var(--accent);
		border-radius: 50%;
		cursor: pointer;
		transition: background 0.2s, transform 0.1s;
	}

	.formula-range::-webkit-slider-thumb:hover {
		background: var(--accent-bright);
		transform: scale(1.1);
	}

	.formula-range::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: var(--accent);
		border-radius: 50%;
		cursor: pointer;
		border: none;
	}

	.formula-slider-labels {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
	}

	.formula-scenarios {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		max-width: 700px;
		margin-bottom: 2rem;
	}

	.scenario-btn {
		padding: 0.5rem 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 6px;
		color: var(--text-primary);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.scenario-btn:hover {
		background: var(--accent);
		border-color: var(--accent);
	}

	.drag-handle {
		cursor: nwse-resize;
	}

	.drag-handle:hover circle:nth-child(2) {
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
	}

	.drag-handle circle.dragging {
		filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.7));
	}

	/* ── Benefits Grid ───────────────────────────────────────── */
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.benefits-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 480px) {
		.benefits-grid {
			grid-template-columns: 1fr;
		}
	}

	.benefit-card {
		text-align: center;
	}

	.benefit-card p {
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.benefit-stat {
		font-size: 2rem;
		font-weight: 800;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}

	/* ── Barrier Grid (Why It Hasn't Caught On) ──────────────── */
	.barrier-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-top: 1.5rem;
	}

	@media (max-width: 640px) {
		.barrier-grid {
			grid-template-columns: 1fr;
		}
	}

	.barrier-card h3 {
		color: #fb923c;
		margin-bottom: 0.75rem;
	}

	.barrier-card p {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	/* ── AI Workflows Grid ───────────────────────────────────── */
	.ai-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 640px) {
		.ai-grid {
			grid-template-columns: 1fr;
		}
	}

	.ai-human h3 {
		color: #818cf8;
		border-bottom: 2px solid rgba(129, 140, 248, 0.3);
		padding-bottom: 0.75rem;
		margin-bottom: 1rem;
	}

	.ai-machine h3 {
		color: #34d399;
		border-bottom: 2px solid rgba(52, 211, 153, 0.3);
		padding-bottom: 0.75rem;
		margin-bottom: 1rem;
	}

	/* ── Pitfalls ────────────────────────────────────────────── */
	.pitfalls-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.pitfall {
		padding: 1.5rem 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		transition: border-color 0.3s;
	}

	.pitfall:hover {
		border-color: var(--border-bright);
	}

	.pitfall-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.pitfall-header h3 {
		margin-bottom: 0;
	}

	.pitfall > p {
		color: var(--text-secondary);
		font-size: 0.95rem;
		margin-bottom: 0.75rem;
	}

	.pitfall-severity {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.2rem 0.6rem;
		border-radius: 100px;
	}

	.pitfall-severity.high {
		background: rgba(251, 146, 60, 0.12);
		color: #fb923c;
	}

	.pitfall-severity.medium {
		background: rgba(250, 204, 21, 0.1);
		color: #facc15;
	}

	.pitfall-severity.low {
		background: rgba(52, 211, 153, 0.1);
		color: #34d399;
	}

	.pitfall-solution {
		font-size: 0.9rem;
		color: var(--text-secondary);
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.pitfall-solution strong {
		color: var(--accent);
	}

	/* ── Pairing Styles ──────────────────────────────────────── */
	.styles-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-top: 1rem;
	}

	.style-card {
		position: relative;
		padding-left: 5rem;
	}

	@media (max-width: 480px) {
		.style-card {
			padding-left: 2rem;
		}
		.style-number {
			position: static !important;
			margin-bottom: 0.5rem;
		}
	}

	.style-number {
		position: absolute;
		left: 2rem;
		top: 2rem;
		font-size: 1.6rem;
		font-weight: 800;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
	}

	.style-tag {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		background: rgba(129, 140, 248, 0.1);
		padding: 0.15rem 0.6rem;
		border-radius: 100px;
		margin-bottom: 0.75rem;
	}

	.style-card p:last-child {
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	/* ── Mob Programming ─────────────────────────────────────── */
	.mob-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		margin: 2rem 0;
		padding: 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.mob-group {
		display: flex;
		gap: 1.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.mob-person {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
	}

	.mob-person span {
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.mob-icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.95rem;
		color: white;
	}

	.mob-driver .mob-icon {
		background: var(--gradient);
		width: 56px;
		height: 56px;
		font-size: 1.1rem;
	}

	.mob-nav-icon {
		background: rgba(168, 85, 247, 0.2);
		border: 1px solid rgba(168, 85, 247, 0.3);
		color: #c084fc !important;
	}

	.mob-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin: 1.5rem 0;
	}

	.mob-details .card:last-child {
		grid-column: 1 / -1;
	}

	@media (max-width: 640px) {
		.mob-details {
			grid-template-columns: 1fr;
		}
	}

	.mob-steps {
		list-style: none;
		counter-reset: step;
		padding: 0;
	}

	.mob-steps li {
		counter-increment: step;
		position: relative;
		padding-left: 2rem;
		margin-bottom: 0.6rem;
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	.mob-steps li::before {
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: rgba(129, 140, 248, 0.12);
		color: var(--accent);
		font-size: 0.7rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mob-steps li strong {
		color: var(--text-primary);
	}

	/* ── Summary ─────────────────────────────────────────────── */
	.summary-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
		margin-bottom: 2.5rem;
	}

	@media (max-width: 900px) {
		.summary-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.summary-grid {
			grid-template-columns: 1fr;
		}
	}

	.summary-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		transition: border-color 0.3s;
	}

	.summary-card:hover {
		border-color: var(--border-bright);
	}

	.summary-card h3 {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.summary-card p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* ── Sources ──────────────────────────────────────────────── */
	.sources-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.source {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem 1.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
	}

	.source-num {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--accent);
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(129, 140, 248, 0.1);
		border-radius: 50%;
		font-variant-numeric: tabular-nums;
	}

	.source-title {
		font-weight: 600;
		font-size: 0.95rem;
		margin-bottom: 0.15rem;
		display: block;
	}

	a.source-title {
		color: var(--text-primary);
		text-decoration: none;
		transition: color 0.2s;
	}

	a.source-title:hover {
		color: var(--accent);
	}

	.source-meta {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	/* ── 2026 Question Section ───────────────────────────────── */
	.objections {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.objection-quote {
		padding: 1.5rem 2rem;
		background: rgba(251, 146, 60, 0.04);
		border-left: 3px solid rgba(251, 146, 60, 0.4);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.objection-quote p {
		font-size: 1.05rem;
		color: var(--text-secondary);
		font-style: italic;
		line-height: 1.6;
	}

	.answers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-top: 1rem;
	}

	@media (max-width: 640px) {
		.answers {
			grid-template-columns: 1fr;
		}
	}

	.answer {
		padding: 1.5rem;
		background: rgba(52, 211, 153, 0.04);
		border: 1px solid rgba(52, 211, 153, 0.12);
		border-radius: var(--radius);
	}

	.answer h3 {
		font-size: 1rem;
		color: #34d399;
		margin-bottom: 0.6rem;
		line-height: 1.4;
	}

	.answer p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.answer em {
		color: var(--text-primary);
		font-style: italic;
	}

	/* ── Classic Objections ──────────────────────────────────── */
	.objection-response-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-top: 1rem;
	}

	.objection-response {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.objection-response .objection-quote {
		border-left: none;
		border-radius: 0;
		border-bottom: 1px solid var(--border);
		padding: 1.25rem 1.5rem;
	}

	.objection-response .objection-quote p {
		font-size: 0.95rem;
	}

	.response {
		padding: 1.25rem 1.5rem;
	}

	.response p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.response strong {
		color: #34d399;
	}

	/* ── When to Pair ────────────────────────────────────────── */
	.when-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.when-grid {
			grid-template-columns: 1fr;
		}
	}

	.when-card h3 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 2px solid;
	}

	.when-always h3 {
		color: #34d399;
		border-color: rgba(52, 211, 153, 0.3);
	}

	.when-consider h3 {
		color: #facc15;
		border-color: rgba(250, 204, 21, 0.3);
	}

	.when-skip h3 {
		color: var(--text-muted);
		border-color: var(--border);
	}

	/* ── Session Structure ───────────────────────────────────── */
	.session-steps {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.session-step {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.25rem 1.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		transition: border-color 0.3s;
	}

	.session-step:hover {
		border-color: var(--border-bright);
	}

	.session-step-num {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.9rem;
		background: var(--gradient);
		color: white;
		flex-shrink: 0;
	}

	.session-step h3 {
		font-size: 1rem;
		margin-bottom: 0.15rem;
	}

	.session-step p {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* ── Remote Pairing ──────────────────────────────────────── */
	.remote-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin: 1.5rem 0;
	}

	@media (max-width: 640px) {
		.remote-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ── Footer ──────────────────────────────────────────────── */
	.footer {
		text-align: center;
		padding: 3rem 2rem;
		color: var(--text-muted);
		font-size: 0.8rem;
		border-top: 1px solid var(--border);
	}

</style>
