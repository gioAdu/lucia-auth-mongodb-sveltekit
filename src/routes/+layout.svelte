<script>
	import { LightSwitch, Toast } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { cartItems, serverCartItems } from '$lib/stores/store';
	import { initializeStores } from '@skeletonlabs/skeleton';

	export let data;

	onMount(() => {
		cartItems.set(JSON.parse(localStorage.getItem('cart')) || []);
	});

	$: if (data.isLoggedIn) {
		serverCartItems.set(data.cartServer);
	}

	initializeStores();
</script>

<Toast position="tl" spacing="gap-4" />

<Header session={data.isLoggedIn} categories={data.categoriesData} />

<slot />

<div class="fixed bottom-2 right-2">
	<LightSwitch />
</div>
