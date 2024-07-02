<script>
	import { Drawer, ProgressBar, Toast } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import { cartItems, serverCartItems } from '$lib/stores/store';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import BurgerMenu from '$lib/components/BurgerMenu.svelte';

	export let data;

	let loading = false;
	let progress = tweened(0, { duration: 300, easing: cubicOut });

	beforeNavigate(() => {
		loading = true;
		progress.set(100);
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate(() => {
		loading = false;
		progress.set(0);
	});

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

{#if loading}
	<div class="absolute top-0 w-full">
		<ProgressBar meter="bg-tertiary-600" value={$progress} />
	</div>
{/if}

<Header session={data.isLoggedIn} categories={data.categoriesData} />
<slot />
