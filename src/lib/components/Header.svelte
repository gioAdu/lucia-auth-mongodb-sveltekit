<script>
	import { AppBar, LightSwitch, getDrawerStore, modeCurrent } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { derivedCount, derivedServerCount } from '../stores/store';
	import { slide } from 'svelte/transition';
	export let session, categories;
	
	let showDropdown = false;
	let timeoutId;
	let cartItemCount;
	
	const drawerStore = getDrawerStore();

	const drawerSettings = {
		id: 'example-1',
		width: 'w-[60%]'
	};

	const hideDropDownAfterDelay = () => {
		timeoutId = setTimeout(() => {
			showDropdown = false;
		}, 300);
	};

	$: if (session) {
		cartItemCount = $derivedServerCount;
	} else {
		cartItemCount = $derivedCount;
	}
</script>

<!-- <div class="relative top-0 left-0 z-50 p-2 bg-green-800 text-sm text-white">
	<div class="sm:hidden">XS</div>
	<div class="hidden sm:block md:hidden">SM</div>
	<div class="hidden md:block lg:hidden">MD</div>
	<div class="hidden lg:block xl:hidden">LG</div>
	<div class="hidden xl:block 2xl:hidden">XL</div>
	<div class="hidden 2xl:block">2XL</div>
</div> -->

<div class="bg-surface-100-800-token">
	<AppBar class="container mx-auto px-4" background="bg-transparent">
		<div slot="lead">
			<a href="/"> <img src="/home_logo.webp" alt="buyblitz" class="min-w-32 w-40" /> </a>
		</div>

		<div class="flex items-center gap-5" slot="trail">
			<button class="btn block sm:hidden" on:click={() => drawerStore.open(drawerSettings)}>
				<img class="w-[25px]" src="/burger_icon.svg" alt="menu" />
			</button>

			<div class="hidden sm:flex items-center gap-5">
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
					<button
						class="btn bg-gradient-to-br variant-gradient-secondary-tertiary flex items-center"
					>
						<span>Shop</span>
						<img
							src="/dropdown_arrow.svg"
							alt="dropdown arrow"
							class:rotate-90={showDropdown}
							class="transition-all"
						/>
					</button>

					{#if showDropdown}
						<ul
							transition:slide
							class="z-50 absolute bg-surface-50-900-token grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 right-0 min-w-max p-2 pt- rounded-lg border"
						>
							{#each categories as item}
								<li class="border-b border-slate-700">
									<a
										class="p-2 inline-block w-full hover:bg-surface-200-700-token rounded-t"
										on:click={() => (showDropdown = false)}
										href="/{item}">{item}</a
									>
								</li>
							{/each}
						</ul>
					{/if}
				</div>

				{#if session}
					<form method="post" action="?/logOut" use:enhance>
						<button class="btn bg-gradient-to-br variant-gradient-warning-error">Logout</button>
					</form>
				{:else}
					<a href="/signin" class="btn variant-filled-primary font-bold">Log In</a>
				{/if}

				<a href="/cart" class="hover:bg-surface-200-700-token rounded-full relative">
					<span class="badge-icon variant-filled-warning absolute right-0 top-0 z-10">
						{cartItemCount}
					</span>
					<svg
						width="50"
						height="50"
						viewBox="0 0 24 24"
						data-name="Line Color"
						xmlns="http://www.w3.org/2000/svg"
						class="icon line-color"
					>
						<path
							d="M11 20.5h.1m5.9 0h.1"
							style="fill:none;stroke:{$modeCurrent
								? '#000'
								: '#fff'};stroke-linecap:round;stroke-linejoin:round;stroke-width:2"
						/>
						<path
							d="M3 3h2.14a1 1 0 0 1 1 .85L6.62 7 8 16l11-1 2-8H6.62"
							style="fill:none;stroke:{$modeCurrent
								? '#000'
								: '#fff'};stroke-linecap:round;stroke-linejoin:round;stroke-width:2"
						/>
					</svg>
				</a>
			</div>
			<LightSwitch />
		</div>
	</AppBar>
</div>
