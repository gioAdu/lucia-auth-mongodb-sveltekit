<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	export let session, categories;

	let showDropdown = false;
	let timeoutId;

	const hideDropDownAfterDelay = () => {
		timeoutId = setTimeout(() => {
			showDropdown = false;
		}, 300);
	};
</script>

<AppBar>
	<div slot="lead">
		<a href="/"> <img src="/home_logo.webp" alt="buyblitz" class="min-w-32 w-40" /> </a>
	</div>

	<div class="flex items-center gap-3" slot="trail">
		<div
			class="dropdown relative"
			role="button"
			tabindex="0"
			on:mouseenter={() => {
				clearTimeout(timeoutId);
				showDropdown = true;
			}}
			on:mouseleave={hideDropDownAfterDelay}
		>
			<button class="btn bg-gradient-to-br variant-gradient-secondary-tertiary flex items-center">
				<span>Shop</span>
				<img
					src="/dropdown_arrow.svg"
					alt="dropdown arrow"
					class:rotate-90={showDropdown}
					class="transition-all"
				/>
			</button>
			<ul
				class:hidden={!showDropdown}
				class=" z-50 absolute bg-surface-50-900-token grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 right-0 min-w-max p-2 pt- rounded-lg border"
			>
				{#each categories as item}
					<li class="border-b border-slate-700">
						<a class="p-2 inline-block w-full" on:click={() => (showDropdown = false)} href={item}
							>{item}</a
						>
					</li>
				{/each}
			</ul>
		</div>

		{#if session}
			<form method="post" action="/" use:enhance class="inline ms-4">
				<button class="btn bg-gradient-to-br variant-gradient-warning-error">Logout</button>
			</form>
		{:else}
			<a href="/signup" class="btn variant-filled-primary font-bold ms-4">Log In</a>
		{/if}
		<a href="/cart" class="hover:bg-slate-300 rounded-full p-2 relative">
			<span class="badge-icon variant-filled-warning absolute right-1 top-2 z-10 tex">2 </span>
			<img src="/cart.svg" alt="cart" />
		</a>
	</div>
</AppBar>
