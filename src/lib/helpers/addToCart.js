import { get } from 'svelte/store';
import { cartItems } from '$lib/stores/store.js';

export const updateLocalCart = (id, category) => {
	let currentCartItems = get(cartItems) || [];

	let existingItem = currentCartItems.find((item) => item.id === id && item.category === category);

	if (existingItem) {
		existingItem.count += 1;
	} else {
		currentCartItems.push({ id, category, count: 1 });
	}

	localStorage.setItem('cart', JSON.stringify(currentCartItems));

	return currentCartItems;
};
