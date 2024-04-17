export async function load(event) {
	const categorieId = event.params.categories;
	const catDataJson = await fetch(`https://dummyjson.com/products/category/${categorieId}`);
	const catData = await catDataJson.json();

	return { cat: event.params.categories, catData: catData.products };
}
