import { User } from '$lib/server/MongoClient';

/**
 * Retrieves the cart items from the server for a given user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of cart items.
 */
export const getCartFromServer = async (userId) => {
	try {
		const user = await User.findOne({ _id: userId });
		const cartItems = user.cartItems;

		return cartItems;
	} catch (error) {
		console.log(error);

		return fail(500, {
			serverErr: true,
			message: 'Something went wrong'
		});
	}
};
