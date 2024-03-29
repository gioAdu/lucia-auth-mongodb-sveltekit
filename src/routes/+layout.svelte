<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Header from '../lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { cartItems } from '../lib/stores/store';

	export let data;

	onMount(() => {
		$cartItems = JSON.parse(localStorage.getItem('cart')) || [];
	});
</script>

<Header session={data.session} categories={data.categoriesData} />

<slot />

<div class="fixed bottom-2 right-4">
	<LightSwitch />
</div>
