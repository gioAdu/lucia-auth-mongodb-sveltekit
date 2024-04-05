<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { cartItems } from '$lib/stores/store.js';
	import { goto, invalidateAll } from '$app/navigation';

	let usernameError;
	let passwordError;
	let cart;
	let loading = false;

	const displayErrMsg = (errMsg) => {
		if (errMsg.includes('Username')) {
			usernameError = errMsg;
		} else {
			usernameError = '';
		}

		if (errMsg.includes('Password')) {
			passwordError = errMsg;
		} else {
			passwordError = '';
		}
	};

	const clearLocalCart = () => {
		localStorage.removeItem('cart');
		cartItems.set([]);
	};

	onMount(() => {
		cart = localStorage.getItem('cart');
	});
</script>

<h1 class="p-2">Sign in</h1>

<form
	method="post"
	class="p-2 w-fit"
	use:enhance={() => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'failure') {
				loading = false;
				displayErrMsg(result.data.message);
			}

			if (result.type === 'success') {
				clearLocalCart();
				await invalidateAll();				
				loading = false;
				goto('/');
			}
		};
	}}
>
	<input type="hidden" value={cart} name="cartItems" />
	<div class=" mb-2">
		<input
			class="block variant-form-material"
			class:input-error={usernameError}
			placeholder="username"
			name="username"
		/>
		{#if usernameError}
			<p class="text-error-500">{usernameError}</p>
		{/if}
	</div>

	<div class="mb-2">
		<input
			class="block variant-form-material"
			class:input-error={passwordError}
			placeholder="password"
			type="password"
			name="password"
		/>
		{#if passwordError}
			<p class="text-error-500">{passwordError}</p>
		{/if}
	</div>

	<button class="btn variant-filled w-full" disabled = {loading}>Log in</button>
</form>
