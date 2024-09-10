export default function filterByRating(reviews, rating) {	
	return reviews.filter((review) => review.rating == rating);
}
