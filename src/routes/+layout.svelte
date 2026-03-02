<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let scrollProgress = $state(0);

	function handleScroll() {
		const scrollTop = document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
	}
</script>

<svelte:head>
	<title>Pair Programming — A Guide</title>
	<meta name="description" content="An interactive guide to pair programming and mob programming" />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<div class="progress-bar" style="width: {scrollProgress}%"></div>

{@render children()}
