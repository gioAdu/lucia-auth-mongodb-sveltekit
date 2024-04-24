export async function load(event) {
	const categorieId = event.params.categories;
	let catDataJson = [];

	if (categorieId === 'categories') {
		catDataJson = await fetch(`https://dummyjson.com/products?limit=12&skip=12`);
		const catData = await catDataJson.json();
		return { cat: categorieId, catData: catData.products}
	}

	catDataJson = await fetch(`https://dummyjson.com/products/category/${categorieId}`);
	const catData = await catDataJson.json();

	return { cat: event.params.categories, catData: catData.products };
}
