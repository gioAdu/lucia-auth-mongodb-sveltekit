import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	let newData = [];
	const pageData = await request.json();

	const { productCount, skip, category } = pageData;

	try {
		if (category === 'categories' || category === null) {
			const newResp = await fetch(
				`https://dummyjson.com/products?limit=${productCount}&skip=${skip}`
			);
			newData = await newResp.json();

			return json({ status: 200, newData: newData.products });
		} else {
			const newResp = await fetch(
				`https://dummyjson.com/products/category/${category}?limit=${productCount}&skip=${skip}`
			);
			newData = await newResp.json();

			return json({ status: 200, newData: newData.products });
		}
	} catch (error) {
		return json({ status: 200, newData: [], error: error });
	}
}
