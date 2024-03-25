export const load = async (event) => {
	const session = event.locals.session;

	const categories = await fetch('https://dummyjson.com/products/categories');
	const categoriesData = await categories.json();

	return { session, categoriesData };
};
