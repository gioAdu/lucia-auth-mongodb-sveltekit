<script>
	import Card from '$lib/components/Card.svelte';

	export let data;
	const products = data.products;
</script>

<div class="bg-[url('/banner.avif')] bg-no-repeat bg-cover">
	<div class="px-6 h-[400px] text-white">
		<h1 class="text-5xl mb-8 pt-16">Explore Everything You Need</h1>
		<div class="text-2xl">Your one-stop-shop for style, tech, and beyond</div>
		<a
			href="/categories"
			class="text-center block mt-8 variant-filled-success px-5 py-3 w-1/4 text-xl rounded-full"
			>Check our shop</a
		>
	</div>
</div>

<h1 class="text-5xl px-4 pt-4 border-b border-surface-500">Limited Time Deals</h1>
<Card productdata={products} showDiscount={true} initialLimit={data.initialLimit}/>
