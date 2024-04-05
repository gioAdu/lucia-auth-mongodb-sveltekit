import { lucia } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/MongoClient.js';
import { dataMap } from '$lib/helpers/dataMap.js';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const cartItems = formData.get('cartItems');

		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid Username'
			});
		}

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid Password'
			});
		}

		const existingUser = await db.collection('user').findOne({ username: username.toLowerCase() });

		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect Username or Password'
			});
		}

		const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect Username or Password'
			});
		}

		const session = await lucia.createSession(existingUser._id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		const userId = session.userId;

		if (cartItems) {
			try {
				await dataMap(cartItems, userId);
			} catch (error) {
				return fail(500, { message: error });
			}
		}

		return { status: 200, body: { success: true } };
	}
};
