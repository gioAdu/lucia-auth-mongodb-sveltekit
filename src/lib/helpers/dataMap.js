import { User } from '$lib/server/MongoClient.js';

export const dataMap = (data, userId) => {
	console.log(data, userId);
	// Find the user and the item in the user's cart
	// User.findAndModify({
	// 	query: { _id: userId, 'cartItems.id': itemId, 'cartItems.category': category },
	// 	update: { $inc: { 'cartItems.$.count': count } }, // Increase or decrease the count
	// 	upsert: true // Create a new document if no documents match the query
	// });

	// // If the item doesn't exist in the user's cart, add it
	// User.update(
	// 	{ _id: userId, 'cartItems.id': { $ne: itemId }, 'cartItems.category': { $ne: category } },
	// 	{ $push: { cartItems: { id: itemId, category: category, count: count } } }
	// );
};
