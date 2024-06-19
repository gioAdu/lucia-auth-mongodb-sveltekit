<script>
	import { Drawer, Toast } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { cartItems, serverCartItems } from '$lib/stores/store';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import BurgerMenu from '$lib/components/BurgerMenu.svelte';

	export let data;

	onMount(() => {
		cartItems.set(JSON.parse(localStorage.getItem('cart')) || []);
	});

	$: if (data.isLoggedIn) {
		serverCartItems.set(data.cartServer);
	}

	initializeStores();
</script>

<Drawer>
	<BurgerMenu />
</Drawer>

<Toast position="tl" spacing="gap-4" />

<Header session={data.isLoggedIn} categories={data.categoriesData} />

<slot />
