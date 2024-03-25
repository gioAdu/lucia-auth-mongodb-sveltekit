<script>
	export let data;

	console.log(data.catData);
</script>



{#each data?.catData as item}
<div>{item.title}</div>
	
{/each}