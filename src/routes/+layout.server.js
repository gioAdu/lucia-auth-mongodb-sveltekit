export const load = async (event) => {
	const session = event.locals.session;

	return { session };
};
