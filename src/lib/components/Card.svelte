<script>
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { cartItems, serverCartItems } from '$lib/stores/store.js';
	import { updateLocalCart } from '$lib/helpers/Cart.js';
	import { enhance, applyAction } from '$app/forms';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let productdata;

	let formTimeout;
	let dontCancel = false;
	let localCart = [];

	const toastStore = getToastStore();
	const t = {
		message: 'Something went wrong',
		background: 'variant-glass-error',
		timeout: 3500,
		classes: 'flex-row-reverse '
	};

	$: {
		if ($page.form?.serverErr) {
			t.message = $page.form.message;
			toastStore.trigger(t);
		}

		if ($page.form?.success) {
			t.message = 'Item added to cart';
			t.background = 'variant-glass-success';
			toastStore.trigger(t);
		}
	}

	const batchItemSubmissions = (id, category, cancel, formElement) => {
		if (!dontCancel) {
			cancel();
			localCart = updateLocalCart(id, category, $cartItems);

			if (formTimeout) clearTimeout(formTimeout);

			formTimeout = setTimeout(() => {
				dontCancel = true;

				formElement.requestSubmit();
				dontCancel = false;
			}, 350);
		}
	};
</script>

<div class="flex flex-wrap container m-auto">
	{#each productdata as item}
		<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex">
			<div class="card card-hover variant-ringed flex flex-col w-full justify-between">
				<a href="/categories/{item.id}">
					<header class="card-header relative">
						<img src={item.thumbnail} alt={item.title} />
						{#if item.discountPercentage}
							<span
								class="badge-icon w-11 h-11 text-base variant-filled-error absolute top-6 right-6"
								>-{item.discountPercentage.toFixed()}%</span
							>
						{/if}
					</header>

					<section class="p-4 flex-grow">
						<div class="card-body">
							<h1 class="card-title text-xl flex justify-between mb-2 border-t">
								{item.title}
								<span class="card-price">{item.price}$</span>
							</h1>

							<div class="card-brand">
								<span class="font-bold text-lg">Brand :</span>
								{item.brand}
							</div>

							<div class="mt-2 font-bold text-lg">Description :</div>
							<div class="card-description">{item.description}</div>
						</div>
					</section>
				</a>

				<form
					method="POST"
					action="/?/addCart"
					use:enhance={({ formElement, cancel }) => {
						batchItemSubmissions(item.id, item.category, cancel, formElement);

						return async ({ result }) => {
							if (result.type !== 'success') return;

							if (result.data.status === 200) {
								localStorage.setItem('cart', result.data.cartItems);
								cartItems.set(localCart);
							}

							if (result.data.status === 201) {
								serverCartItems.set(result.data.serverCart);
								cartItems.set([]);
							}
							await applyAction(result);
						};
					}}
				>
					<footer class="card-footer py-2 flex items-end justify-center border-t">
						<input type="hidden" name="cart_data" value={JSON.stringify(localCart)} />
						<button
							type="submit"
							class="flex gap-5 items-center scale-90 duration-300 active:scale-[1.15] active:duration-0"
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
							<div class="font-bold text-tertiary-900-50-token text-xl">Add To Cart</div>
						</button>
					</footer>
				</form>
			</div>
		</div>
	{/each}
</div>
