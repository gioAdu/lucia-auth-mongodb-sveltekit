<script>
	import '../app.postcss';
	import Header from '../lib/components/Header.svelte';

	export let data;
</script>

<Header session={data.session} />

<slot />
