import { json } from '@sveltejs/kit';

export async function POST({request} ) {
	const pageData = await request.json();

	const {productCount, skip} = pageData;


  const newResp = await fetch(`https://dummyjson.com/products?limit=${productCount}&skip=${skip}`);
  const newData = await newResp.json();


	return json({ status: 200, newData : newData.products });
}
