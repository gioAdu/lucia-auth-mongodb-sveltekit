<script>
	import Card from '$lib/components/Card.svelte';

	export let data;

	$: catData = data.catData;
</script>

{#key catData}
	<Card productdata={catData} category={data.cat} initialLimit={data.initialLimit} />
{/key}
