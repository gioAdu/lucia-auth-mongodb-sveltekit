<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let session;
	console.log(session);
</script>

<AppBar>
	<div class="flex items-center gap-4" slot="lead">
		<a href="/"><img src="/home_logo.png" alt="buyblitz" class="min-w-32 w-40" /></a>
		<a href="/protected" class="btn bg-gradient-to-br variant-gradient-secondary-tertiary"
			>PROTECTED</a
		>
		<a href="/not_protected" class="btn bg-gradient-to-br variant-gradient-secondary-tertiary"
			>NOT PROTECTED</a
		>
	</div>

	<div class="flex items-center gap-3" slot="trail">
		{#if session}
			<form method="post" action="/" use:enhance class="inline">
				<button class="btn bg-gradient-to-br variant-gradient-warning-error">Logout</button>
			</form>
		{:else}
			<a href="/signin" class="btn bg-gradient-to-br variant-gradient-secondary-tertiary">Log In</a>
			<a href="/signup" class="btn variant-filled-secondary font-bold">Sign Up</a>
		{/if}
		<LightSwitch />
	</div>
</AppBar>
