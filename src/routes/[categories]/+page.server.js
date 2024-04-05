import { fail } from '@sveltejs/kit';
import { dataMap } from '$lib/helpers/dataMap.js';
import { getCartFromServer } from '$lib/helpers/serverCart.js';

export async function load(event) {
	const categorieId = event.params.categories;
	const catDataJson = await fetch(`https://dummyjson.com/products/category/${categorieId}`);
	const catData = await catDataJson.json();

	return { cat: event.params.categories, catData: catData.products };
}

export const actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const userId = locals.session.userId;

		const cartItems = data.get('cart_data');

		if (!locals.session) {
			return fail(401, { session: false, message: 'Unauthorized' });
		}

		//Add item to cart on server
		try {
			await dataMap(cartItems, userId);
		} catch (error) {
			return fail(500, {
				serverErr: true,
				message: 'Unable to add item. Please try again later'
			});
		}

		//Get cart items from server
		try {
			const serverCart = await getCartFromServer(userId);
			return { success: true, serverCart };
		} catch (error) {
			console.log(error);
			return fail(500, {
				serverErr: true,
				message: 'Something went wrong'
			});
		}
	}
};
