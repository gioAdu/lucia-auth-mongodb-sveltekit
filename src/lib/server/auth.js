import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { adapter } from './MongoClient';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
});
