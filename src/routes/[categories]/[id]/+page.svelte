<script>
	import DynamicRatings from '$lib/components/DynamicRatings.svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';

	export let data;

	const itemInfo = data.productInfo;
	console.log(data.productInfo);

	const checkStock = () => {
		if (itemInfo.stock === 0) {
			return '<span class="text-error-500 text-2xl mr-2">Out of Stock</span>';
		}

		if (itemInfo.stock < 10) {
			return '<span class="text-warning-500 text-2xl mr-2">Low Stock</span>';
		}

		return '<span class="text-primary-600 text-2xl mr-2 font-bold">In Stock</span>';
	};

	const convertTimeStamp = (timeStamp) => {
		const date = new Date(timeStamp);
		const options = { month: 'short', day: 'numeric', year: 'numeric' };
		return date.toLocaleDateString('en-US', options);
	};
</script>

<div class="container mx-auto mt-6 text-xl">
	<div class="flex flex-col md:flex-row">
		<div class="md:w-1/3">
			<img src={itemInfo.thumbnail} alt={itemInfo.title} class="w-full" />
		</div>

		<div class="md:w-2/3">
			<h1 class="text-4xl font-bold p-2">{itemInfo.title}</h1>

			<div class="p-2">{@html checkStock()}</div>
			<div class="p-2">Price: <span class=" text-sm -top-1 relative">$</span>{itemInfo.price}</div>

			<div class="flex items-center p-2">
				<span class="mr-2">Rating:</span>
				<DynamicRatings rating={itemInfo.rating} />
			</div>

			<p class="p-2">
				{itemInfo.description}
			</p>

			<div class="flex items-center p-2">
				<span class=" mr-2">Shipping:</span>
				<span class="">{itemInfo.shippingInformation}</span>
			</div>

			<div class="flex items-center p-2">
				<span class=" mr-2">Warranty:</span>
				<span class="">{itemInfo.warrantyInformation}</span>
			</div>

			<div>
				<button
					type="submit"
					class="p-2 bg-secondary-400-500-token rounded-lg flex gap-5 items-center scale-90 duration-300 active:scale-[1.15] active:duration-0"
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
					<div class="font-bold text-xl">Add To Cart</div>
				</button>
			</div>
		</div>
	</div>

	<h2 class="mt-4 text-3xl p-2">Product information</h2>
	<h3 class="mt-2 p-2">Technical Details</h3>

	<div class="p-2">
		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Dimensions</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.dimensions.depth}"W {itemInfo.dimensions.height}"H {itemInfo.dimensions.depth}"D
			</div>
		</div>

		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Weight</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.weight} KG
			</div>
		</div>

		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Brand</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.brand}
			</div>
		</div>

		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Sku</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.sku}
			</div>
		</div>
	</div>

	<h3 class="mt-2 p-2">Additional Details</h3>

	<div class="p-2">
		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Return Policy</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.returnPolicy}
			</div>
		</div>

		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Shipping</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.shippingInformation}
			</div>
		</div>

		<div class="flex border-t border-surface-400-500-token w-full md:w-1/2 xl:w-1/3">
			<div class="bg-surface-200-700-token w-1/2 px-2">Warranty</div>
			<div class="ps-2 pe-4 w-1/2">
				{itemInfo.warrantyInformation}
			</div>
		</div>
	</div>

	<h3 class="mt-2 p-2 text-3xl">Reviews</h3>

	<div class="p-2">
		{#each itemInfo.reviews as review}
			<div class="py-2">
				<div>{review.reviewerName}</div>
				<DynamicRatings rating={review.rating} ratingSize={'w-4'} />
				<div class="text-base text-gray-500">Reviewed on {convertTimeStamp(review.date)}</div>
				<div>{review.comment}</div>
			</div>
		{/each}
		<div></div>
	</div>
</div>
