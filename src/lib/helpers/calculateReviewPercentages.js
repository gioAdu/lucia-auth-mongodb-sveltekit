/**
 * Calculates the percentages of each rating based on the given reviews.
 *
 * @param {Array} reviews - The array of reviews.
 * @returns {Object} - The object containing the percentages of each rating.
 */
export default function calculateReviewPercentages(reviews) {
	const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

	const totalReviews = reviews.length;

	if (totalReviews === 0) {
		return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }; // No reviews, return all 0%
	}

	// Count the occurrences of each rating
	reviews.forEach((review) => {
		if (ratingCounts[review.rating] !== undefined) {
			ratingCounts[review.rating]++;
		}
	});

	const percentages = {};

	Object.keys(ratingCounts).forEach((rating) => {
		const count = ratingCounts[rating];

		percentages[rating] = count > 0 ? ((ratingCounts[rating] / totalReviews) * 100).toFixed(0) : 0;
	});

	return percentages;
}

