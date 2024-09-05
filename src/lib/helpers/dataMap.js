import { User } from '$lib/server/MongoClient.js';
import { fail } from '@sveltejs/kit';

/**
 * Maps the given data to the user's cart.
 * 
 * @param {string} data - The data to be mapped.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<void>} - A promise that resolves when the mapping is complete.
 */
export const dataMap = async (data, userId) => {
	const normalData = JSON.parse(data);

	try {
		const user = await User.findOne({ _id: userId });
		if (user) {
			await addToCart(user, normalData);
		} else {
			return fail(404, { message: 'User not found' });
		}
	} catch (error) {
		return fail(500, { message: error });
	}
};

/**
 * Adds items to the user's cart.
 * 
 * @param {Object} user - The user object.
 * @param {Array} cartItemsData - An array of cart items to be added.
 * @returns {Object} - An object indicating the success or failure of the operation.
 */
async function addToCart(user, cartItemsData) {
	const existingCart = user.cartItems || [];
	for (const item of cartItemsData) {
		const existingItem = existingCart.find((cartItem) => cartItem.id === item.id);
		if (existingItem) {
			existingItem.count += item.count;
		} else {
			existingCart.push(item);
		}
	}

	user.cartItems = existingCart;

	try {
		const result = await User.updateOne({ _id: user._id }, { $set: { cartItems: user.cartItems } });
		if (result.modifiedCount === 1) {
			return { success: true };
		} else {
			return fail(500, { message: 'failed to add item' });
		}
	} catch (error) {
		return fail(500, { message: error });
	}
}
