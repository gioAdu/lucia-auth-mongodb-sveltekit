export async function load(event) {
	console.log(event.params);

	const jsonData = await fetch(`https://dummyjson.com/products/${event.params.id}`);

	const productInfo = await jsonData.json();

	return { productInfo };
}
