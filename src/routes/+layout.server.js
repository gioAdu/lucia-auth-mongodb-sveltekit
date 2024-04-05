import { getCartFromServer } from '$lib/helpers/serverCart.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ fetch, locals }) => {
	const session = locals.session;
	let cartServer;

	const categories = await fetch('https://dummyjson.com/products/categories');
	const categoriesData = await categories.json();

	if (session) {
		try {
			cartServer = await getCartFromServer(session.userId);
		} catch (error) {
			return fail(500, { message: 'Could not get cart data' });
		}
	}

	return { session, categoriesData, cartServer };
};
