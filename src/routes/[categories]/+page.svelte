<script>
	import { onMount } from 'svelte';
	import { count } from '$lib/stores/store.js';

	export let data;
	let cartItems = [];

	onMount(() => {
		cartItems = JSON.parse(localStorage.getItem('cart')) || [];
	});

	const addToCart = (e, id, category) => {
		e.preventDefault();
		count.update((n) => n + 1);

		if (!data.session) {
			const existingItem = cartItems.find((item) => item.id === id && item.category === category);

			if (existingItem) {
				existingItem.count += 1;
			} else {
				cartItems.push({ id, category, count: 1 });
			}
			localStorage.setItem('cart', JSON.stringify(cartItems));

			return;
		}

		const timeOut = setTimeout(() => {
			console.log('test');
		}, 300);
	};

	const btnAnimation = (e, size) => {
		const button = e.currentTarget;
		button.style.transform = `scale(${size})`;
		setTimeout(() => {
			button.style.transform = 'scale(1)';
		}, 300);
	};
</script>

<div class="flex flex-wrap container m-auto">
	{#each data?.catData as item}
		<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex">
			<a href="/categories/{item.id}" class="card card-hover variant-ringed flex flex-col w-full">
				<header class="card-header">
					<img src={item.thumbnail} alt={item.title} />
				</header>

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
					<button
						class="flex flex-col items-center scale-90 transition-transform duration-300"
						on:click={(event) => {
							addToCart(event, item.id, item.category);
							btnAnimation(event, 1.15);
						}}
					>
						<img src="/cart.svg" alt="cart" />
						<div class="font-bold text-tertiary-900-50-token">Add To Cart</div>
					</button>
				</footer>
			</a>
		</div>
	{/each}
</div>
