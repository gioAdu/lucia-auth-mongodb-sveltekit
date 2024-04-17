<script>
	import Card from '$lib/components/Card.svelte';

	export let data;
</script>

<Card productdata={data?.catData} session={data?.session} />
