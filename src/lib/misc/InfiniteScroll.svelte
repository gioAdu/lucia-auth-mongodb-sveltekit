<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let threshold = 0;
	export let elementScroll = null;
	export let hasMore = true;

	const dispatch = createEventDispatcher();
	let observer;

	onMount(() => {
		if (elementScroll) {
			observer = new IntersectionObserver(onIntersection, {
				root: null, // use the viewport as the root
				rootMargin: '0px',
				threshold: threshold
			});

			observer.observe(elementScroll);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});

	const onIntersection = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (hasMore) {
					dispatch('loadMore');
				}
			}
		});
	};
</script>

<div bind:this={elementScroll} />
