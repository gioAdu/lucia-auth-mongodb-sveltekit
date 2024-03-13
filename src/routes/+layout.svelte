<script>
	import '../app.postcss';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data;
</script>

<AppBar gridColumns="1">
	<div class="flex justify-between items-center" id="test">
		<div class="w-100">
			<a href="/" class="btn variant-filled">HOME</a>
			<a href="/protected" class="btn variant-filled">PROTECTED</a>
			<a href="/not_protected" class="btn variant-filled">NOT PROTECTED</a>
			{#if !data.session}
				<a href="/signup" class="btn variant-filled">Signup</a>
				<a href="/signin" class="btn variant-filled">Login</a>
			{:else}
				<form method="post" action="/" use:enhance class="inline">
					<button class="btn variant-filled">Logout</button>
				</form>
			{/if}
		</div>

		<LightSwitch />
	</div>
</AppBar>

<slot />
