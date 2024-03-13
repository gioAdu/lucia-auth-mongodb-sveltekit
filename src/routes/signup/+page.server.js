import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { lucia } from '../../lib/server/auth';
import { Argon2id } from 'oslo/password';
import { db } from '../../lib/server/MongoClient.js';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

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

		const userId = generateId(15);
		const hashedPasword = await new Argon2id().hash(password);

		const existingUser = await db.collection('user').findOne({ username });
		if (existingUser) {
			return fail(400, {
				message: 'Username already exists'
			});
		}

		await db.collection('user').insertOne({
			_id: userId,
			username,
			hashed_password: hashedPasword
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
