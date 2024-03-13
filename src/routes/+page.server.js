import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '../lib/server/auth.js';

export async function load(event) {
	return { data: 'test' };
}
export const actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	}
};
