export async function load(event) {
	const categorieId = event.params.categories;
	let catDataJson = [];
	let limit = 12;

	if (categorieId === 'categories') {
		catDataJson = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${limit}`);
		const catData = await catDataJson.json();
		return { cat: categorieId, catData: catData.products, initialLimit: limit};
	}

	catDataJson = await fetch(
		`https://dummyjson.com/products/category/${categorieId}?limit=${limit}`
	);
	const catData = await catDataJson.json();

	return { cat: event.params.categories, catData: catData.products, initialLimit: limit };
}
