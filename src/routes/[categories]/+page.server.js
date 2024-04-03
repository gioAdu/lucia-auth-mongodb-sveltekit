import { fail } from '@sveltejs/kit';
import { dataMap } from '$lib/helpers/dataMap.js';

export async function load(event) {
	const categorieId = event.params.categories;
	const catDataJson = await fetch(`https://dummyjson.com/products/category/${categorieId}`);
	const catData = await catDataJson.json();

	return { cat: event.params.categories, catData: catData.products };
}

export const actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
 
		const cartItems = data.get('cartItems')

		if (!locals.session) {
			return fail(401, { session: false, message: 'Unauthorized' });
		}

		try {
			await dataMap(cartItems, locals.session.userId);
		} catch (error) {
			return fail(500, { message: error.message });
		}
	}
};
