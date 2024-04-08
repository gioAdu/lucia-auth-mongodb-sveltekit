<script>
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { cartItems, serverCartItems } from '$lib/stores/store.js';
	import { updateLocalCart } from '$lib/helpers/Cart.js';
	import { enhance } from '$app/forms';
	import { getToastStore } from '@skeletonlabs/skeleton';

	export let data;
	export let form;

	let formTimeout;
	let cartData;

	const toastStore = getToastStore();
	const t = {
		message: 'Something went wrong',
		background: 'variant-glass-error',
		timeout: 3500,
		classes: 'flex-row-reverse '
	};

	$: {
		if (form?.serverErr) {
			t.message = form.message;
			toastStore.trigger(t);
		}

		if (form?.success) {
			cartItems.set([]);
			localStorage.removeItem('cart');
			serverCartItems.set(form.serverCart);
			
			t.message = 'Item added to cart';
			t.background = 'variant-glass-success';
			toastStore.trigger(t);
		}
	}

	const addToCart = async (e, id, category) => {
		e.preventDefault();

		const formEl = e.currentTarget.form;

		if (formTimeout) {
			clearTimeout(formTimeout);
		}

		let localCart = updateLocalCart(id, category, $cartItems);

		if (!data.session) {
			localStorage.setItem('cart', JSON.stringify(localCart));
			cartItems.set(localCart);
			return;
		}

		cartData = updateLocalCart(id, category, cartData);

		formTimeout = setTimeout(() => {
			formEl.requestSubmit();
			cartData = [];
		}, 350);
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
					<form method="POST" use:enhance>
						<input type="hidden" name="cart_data" value={JSON.stringify(cartData)} />
						<button
							type="submit"
							class="flex flex-col items-center scale-90 duration-300 active:scale-[1.15] active:duration-0"
							on:click={(event) => addToCart(event, item.id, item.category)}
						>
							<svg
								width="50"
								height="50"
								viewBox="0 0 24 24"
								data-name="Line Color"
								xmlns="http://www.w3.org/2000/svg"
								class="icon line-color"
							>
								<path
									d="M11 20.5h.1m5.9 0h.1"
									style="fill:none;stroke:{$modeCurrent
										? '#000'
										: '#fff'};stroke-linecap:round;stroke-linejoin:round;stroke-width:2"
								/>
								<path
									d="M3 3h2.14a1 1 0 0 1 1 .85L6.62 7 8 16l11-1 2-8H6.62"
									style="fill:none;stroke:{$modeCurrent
										? '#000'
										: '#fff'};stroke-linecap:round;stroke-linejoin:round;stroke-width:2"
								/>
							</svg>
							<div class="font-bold text-tertiary-900-50-token">Add To Cart</div>
						</button>
					</form>
				</footer>
			</a>
		</div>
	{/each}
</div>
