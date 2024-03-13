<script>
	import { enhance } from '$app/forms';
	export let form;
  
	$: usernameError = form?.message.includes('Username') ? 'input-error' : '';
	$: passwordError = form?.message.includes('Password') ? 'input-error' : '';
</script>

<h1 class="p-2">Sign in</h1>

<form method="post" use:enhance class="p-2 w-fit">
	<div class=" mb-2">
		<input
			class="block variant-form-material {usernameError}"
			placeholder="username"
			name="username"
		/>
		{#if usernameError}
			<p class="text-error-500">{form?.message}</p>
		{/if}
	</div>

	<div class="mb-2">
		<input
			class="block variant-form-material {passwordError}"
			placeholder="password"
			type="password"
			name="password"
		/>
		{#if passwordError}
			<p class="text-error-500">{form?.message}</p>
		{/if}
	</div>

	<button class="btn variant-filled w-full">Continue</button>
</form>
