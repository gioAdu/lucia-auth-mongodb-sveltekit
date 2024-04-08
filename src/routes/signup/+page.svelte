<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { displayErrMsg } from '$lib/helpers/displayErrMsg';

	let loading;
	let errMsg;
</script>

<div class="flex flex-col items-center mt-12">
	<h1 class="p-2 text-4xl mb-2">Sign up</h1>
	<form
		method="post"
		use:enhance={() => {
			loading = true;
			return async ({ result }) => {
				if (result.type === 'failure') {
					loading = false;
					errMsg = displayErrMsg(result.data.message);
				}

				if (result.type === 'success') {
					loading = false;
					goto('/signin');
				}
			};
		}}
		class="p-2 w-full max-w-lg"
	>
		<div class=" mb-2">
			<input
				class:input-error={errMsg?.usernameError}
				class="input w-full"
				placeholder="Username"
				name="username"
			/>
			{#if errMsg?.usernameError}
				<p class="text-error-500">{errMsg?.usernameError}</p>
			{/if}
		</div>

		<div class="mb-2">
			<input
				class:input-error={errMsg?.passwordError}
				class="input w-full"
				placeholder="Password"
				type="password"
				name="password"
			/>
			{#if errMsg?.passwordError}
				<p class="text-error-500">{errMsg?.passwordError}</p>
			{/if}
		</div>

		<div class="flex gap-2">
			<button class="btn variant-filled-secondary w-full" disabled={loading}>Sign Up</button>
			<a
				href="/signin"
				class="btn variant-filled-primary w-full"
				class:pointer-events-none={loading}
				class:opacity-50={loading}>Log In</a
			>
		</div>
	</form>
</div>
