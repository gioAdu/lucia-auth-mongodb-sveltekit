<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { cartItems } from '$lib/stores/store.js';
	import { goto } from '$app/navigation';
	import { displayErrMsg } from '$lib/helpers/displayErrMsg';

	let cart;
	let loading = false;
	let errMsg;

	const clearLocalCart = () => {
		localStorage.removeItem('cart');
		cartItems.set([]);
	};

	onMount(() => {
		cart = localStorage.getItem('cart');
	});
</script>

<div class="flex flex-col items-center mt-12">
	<h1 class="p-2 text-4xl mb-2">Sign in</h1>

	<form
		method="post"
		class="p-2 w-full max-w-lg"
		use:enhance={() => {
			loading = true;
			return async ({ result, update }) => {
				if (result.type === 'failure') {
					loading = false;
					errMsg = displayErrMsg(result.data.message);
					console.log(errMsg);
				}

				if (result.type === 'success') {
					clearLocalCart();
					await update();
					loading = false;
					goto('/');
				}
			};
		}}
	>
		<input type="hidden" value={cart} name="cartItems" />
		<div class=" mb-2">
			<input
				class="input w-full"
				class:input-error={errMsg?.usernameError}
				placeholder="Username"
				name="username"
			/>
			{#if errMsg?.usernameError}
				<p class="text-error-500">{errMsg?.usernameError}</p>
			{/if}
		</div>

		<div class="mb-2">
			<input
				class="input w-full"
				class:input-error={errMsg?.passwordError}
				placeholder="Password"
				type="password"
				name="password"
			/>
			{#if errMsg?.passwordError}
				<p class="text-error-500">{errMsg?.passwordError}</p>
			{/if}
		</div>

		<div class="flex gap-2">
			<button class="btn variant-filled-primary w-full" disabled={loading}>Log in</button>
			<a href="/signup" class="btn variant-filled-secondary w-full">Sign up</a>
		</div>
	</form>
</div>
