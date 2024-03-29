import { derived, writable } from 'svelte/store';

export const cartItems = writable([]);

export const derivedCount = derived(cartItems, $cartItems => 
	$cartItems.reduce((total, item) => total + item?.count, 0)
);