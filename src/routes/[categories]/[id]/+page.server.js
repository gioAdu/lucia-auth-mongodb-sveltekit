export async function load(event) {
	const jsonData = await fetch(`https://dummyjson.com/products/${event.params.id}`);

	const productInfo = await jsonData.json();

	return { productInfo };
}
