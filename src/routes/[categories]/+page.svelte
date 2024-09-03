<script>
	import Card from '$lib/components/Card.svelte';

	export let data;

	$: catData = data.catData;
</script>


{#if catData.length > 0}
	{#key catData}
		<Card productdata={catData} initialLimit={data.initialLimit} />
	{/key}
{:else}
	<h1 class="text-center pt-5 text-5xl">Products not found</h1>
{/if}
