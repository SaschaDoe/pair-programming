<script lang="ts">
	import { fadeCalc } from '$lib/utils/scroll';
	import { xpBullets } from '$lib/data/presentationContent';

	let originWrapper: HTMLElement | undefined = $state();
	let originScroll = $state(0);

	$effect(() => {
		if (!originWrapper) return;
		const onScroll = () => {
			const rect = originWrapper!.getBoundingClientRect();
			const total = originWrapper!.scrollHeight - window.innerHeight;
			originScroll = Math.min(1, Math.max(0, -rect.top / total));
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	let opPhotos  = $derived(fadeCalc(originScroll, -0.01, 0.02, 0.18, 0.28));
	let opText    = $derived(fadeCalc(originScroll, 0.20, 0.30, 0.45, 0.55));
	let opBullets = $derived(fadeCalc(originScroll, 0.48, 0.58, 0.72, 0.82));
	let opGermany = $derived(fadeCalc(originScroll, 0.75, 0.85, 0.97, 1.01));
</script>

<section class="origin-scroll" bind:this={originWrapper}>
	<div class="origin-sticky">
		<div class="container">
			<p class="label">The Origin</p>
			<h2>Where It Came From</h2>

			<div class="origin-stage">
				<!-- Phase 1: Photos -->
				<div class="origin-phase" style="opacity: {opPhotos}; transform: translateY({(1 - opPhotos) * 30}px);">
					<div class="origin-portraits">
						<div class="origin-portrait">
							<img src="/pics/Kent_Beck.jpg" alt="Kent Beck" />
							<span>Kent Beck</span>
						</div>
						<div class="origin-portrait">
							<img src="/pics/Ron_Jeffries.jpg" alt="Ron Jeffries" />
							<span>Ron Jeffries</span>
						</div>
						<div class="origin-portrait">
							<img src="/pics/Martin_Fowler.jpg" alt="Martin Fowler" />
							<span>Martin Fowler</span>
						</div>
						<div class="origin-portrait">
							<img src="/pics/Robert_C._Martin.jpg" alt="Robert C. Martin" />
							<span>Robert C. Martin</span>
						</div>
					</div>
				</div>

				<!-- Phase 2: XP explanation -->
				<div class="origin-phase" style="opacity: {opText}; transform: translateY({(1 - opText) * 30}px);">
					<p class="lead">
						The late 1990s. People were fed up with endless processes that led nowhere.
					</p>
					<p class="body" style="margin-top: 1.5rem;">
						Kent Beck created <strong>Extreme Programming (XP)</strong> — a radical approach that put working software and fast feedback above heavy documentation and planning. Sit with the customer. Understand requirements <strong>fast</strong>. Ship in short cycles.
					</p>
					<p class="body" style="margin-top: 1rem;">
						Pair programming was one of its core practices — two developers, one screen. That was the cutting edge.
					</p>
				</div>

				<!-- Phase 3: XP bullet points -->
				<div class="origin-phase" style="opacity: {opBullets}; transform: translateY({(1 - opBullets) * 30}px);">
					<p class="lead" style="margin-bottom: 1.5rem;">Extreme Programming in a nutshell:</p>
					<ul class="origin-bullets">
						{#each xpBullets as bullet}
							<li><strong>{bullet.bold}</strong> — {bullet.text}</li>
						{/each}
					</ul>
				</div>

				<!-- Phase 4: Germany note -->
				<div class="origin-phase" style="opacity: {opGermany}; transform: translateY({(1 - opGermany) * 30}px);">
					<div class="era-tag">
						<span class="era-dot"></span>
						<p>Neither TDD nor pair programming ever fully took hold in the German dev community. In 2026, that seems more unlikely than ever.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.origin-scroll {
		position: relative;
		height: 500vh;
	}

	.origin-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		align-items: center;
		padding: 4rem 0;
	}

	.origin-sticky > :global(.container) {
		width: 100%;
	}

	.origin-stage {
		position: relative;
		margin-top: 2rem;
		min-height: 350px;
	}

	.origin-phase {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		will-change: opacity, transform;
	}

	.origin-portraits {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.origin-portrait {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.origin-portrait img {
		width: 100%;
		max-width: 180px;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		filter: grayscale(0.3);
	}

	.origin-portrait span {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.origin-bullets {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.origin-bullets li {
		padding: 0.75rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.origin-portraits {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}

		.origin-portrait img {
			max-width: 140px;
		}
	}
</style>
