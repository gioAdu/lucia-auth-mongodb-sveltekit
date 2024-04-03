import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

const protectedRoutes = ['/protected'];
const authRoutes = ['/signup', '/signin'];

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	const { session, user } = await lucia.validateSession(sessionId);

	event.locals.session = session;

	if (authRoutes.some((route) => event.route.id?.startsWith(route))) {
		if (user) redirect(302, '/');
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set.bind(event.cookies)(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}


	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set.bind(event.cookies)(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (protectedRoutes.some((route) => event.route.id?.startsWith(route))) {
		if (!user) redirect(302, '/signin');
	}

	return resolve(event);
}
