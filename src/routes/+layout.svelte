<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Header from '../lib/components/Header.svelte';

	export let data;
</script>

<Header session={data.session} categories={data.categoriesData} />

<slot />

<div class="fixed bottom-2 right-4">
	<LightSwitch />
</div>
