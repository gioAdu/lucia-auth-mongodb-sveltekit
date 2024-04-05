import { User } from '$lib/server/MongoClient';

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
