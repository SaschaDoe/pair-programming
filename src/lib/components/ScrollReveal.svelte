<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		threshold = 0.15,
		delay = 0,
		direction = 'up'
	}: {
		children: Snippet;
		threshold?: number;
		delay?: number;
		direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	} = $props();

	let element: HTMLDivElement | undefined = $state();
	let visible = $state(false);

	$effect(() => {
		if (!element) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.unobserve(element!);
				}
			},
			{ threshold }
		);
		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class="scroll-reveal {direction}"
	class:visible
	style="transition-delay: {delay}ms"
>
	{@render children()}
</div>

<style>
	.scroll-reveal {
		opacity: 0;
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.scroll-reveal.up {
		transform: translateY(40px);
	}
	.scroll-reveal.down {
		transform: translateY(-40px);
	}
	.scroll-reveal.left {
		transform: translateX(-40px);
	}
	.scroll-reveal.right {
		transform: translateX(40px);
	}
	.scroll-reveal.none {
		transform: none;
	}

	.scroll-reveal.visible {
		opacity: 1;
		transform: none;
	}
</style>
