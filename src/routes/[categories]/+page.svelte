<script>
	export let data;

	console.log(data.catData);

	const addToCart = (e) => {
		e.preventDefault();
	};
</script>

<div class="flex flex-wrap container m-auto">
	{#each data?.catData as item}
		<a href="/categories/{item.id}" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex">
			<div class="card card-hover variant-ringed flex flex-col w-full">
				<header class="card-header"><img src={item.thumbnail} alt={item.title} /></header>
				<section class="p-4 flex-grow">
					<div class="card-body">
						<h1 class="card-title text-xl flex justify-between mb-2 border-t">
							{item.title}
							<span class="card-price">$10</span>
						</h1>
						<div class="card-brand">
							<span class="font-bold text-lg">Brand :</span>
							{item.brand}
						</div>
						<div class="mt-2 font-bold text-lg">Description :</div>
						<div class="card-description">{item.description}</div>
					</div>
				</section>
				<footer class="card-footer flex flex-col items-end justify-center">
					<button class="flex flex-col items-center scale-90" on:click={addToCart}>
						<img src="/cart.svg" alt="cart" />
						<div class="font-bold text-tertiary-900-50-token">Add To Cart</div>
					</button>
				</footer>
			</div>
		</a>
	{/each}
</div>
