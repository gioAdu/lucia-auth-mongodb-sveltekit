/**
 * Updates the local cart with a new item or increments the count of an existing item.
 * @param {string} id - The ID of the item.
 * @param {string} category - The category of the item.
 * @param {Array} cartItems - The current cart items.
 * @returns {Array} - The updated cart items.
 */
export const updateLocalCart = (id, category, cartItems) => {
	let currentCartItems = cartItems || [];

	let existingItem = currentCartItems.find((item) => item.id === id && item.category === category);

	if (existingItem) {
		existingItem.count += 1;
	} else {
		currentCartItems.push({ id, category, count: 1 });
	}

	return currentCartItems;
};