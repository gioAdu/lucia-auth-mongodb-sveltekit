import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth.js';
import { dataMap } from '$lib/helpers/dataMap.js';
import { getCartFromServer } from '$lib/helpers/serverCart.js';

export async function load() {
	const initialLimit = 12;
	const data = await fetch(`https://dummyjson.com/products?limit=${initialLimit}`);
	const resp = await data.json();

	return { products: resp.products, initialLimit };
}

export const actions = {
	logOut: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/signin');
	},

	addCart: async ({ locals, request }) => {
		const data = await request.formData();
		const userId = locals.session?.userId;

		const cartItems = data.get('cart_data');

		if (!locals.session) {
			return { success: true, status: 200, message: 'Items added to cart', cartItems: cartItems };
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
			return { success: true, status: 201, serverCart };
		} catch (error) {
			console.log(error);
			return fail(500, {
				serverErr: true,
				message: 'Something went wrong'
			});
		}
	}
};
