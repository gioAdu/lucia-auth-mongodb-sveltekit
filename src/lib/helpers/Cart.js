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