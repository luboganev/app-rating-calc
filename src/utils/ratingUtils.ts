/**
 * Calculates the average rating from an array of ratings counts.
 * @param ratings - An array where each element represents the number of ratings for a specific star level.
 * @returns The average rating as a number.
 */
export function calculateAverageRating(ratings: Array<number>): number {
  let totalRatings = 0;
  let weightedRatingsSum = 0;

  ratings.forEach((count, index) => {
    const rating = index + 1;
    weightedRatingsSum += rating * count;
    totalRatings += count;
  });

  return totalRatings === 0 ? 0 : weightedRatingsSum / totalRatings;
}

/**
 * Sums the counts of two rating count arrays.
 * Each array element represents the count of ratings for a specific star value.
 *
 * @param ratings1 - The first array of rating counts.
 * @param ratings2 - The second array of rating counts.
 * @returns A new array with the summed counts.
 */
export function sumRatingCounts(ratings1: Array<number>, ratings2: Array<number>): Array<number> {
  // Check that both arrays have the same length
  if (ratings1.length !== ratings2.length) {
    throw new Error('Both rating arrays must have the same length.');
  }

  // Create a new array by summing the corresponding elements of the input arrays
  return ratings1.map((count, index) => count + ratings2[index]);
}

/**
 * Creates an array with five elements, each initialized to 0.
 * Each element represents the count of ratings for a specific star value.
 *
 * @param urlRatings - An array of ratings counts.
 *
 * @returns An array with five elements, each initialized to 0.
 */
export function createRatingsCountArray(urlRatings: Array<number> = Array<number>()): Array<number> {
  const result = Array(5).fill(0);
  const lengthToCopy = Math.min(urlRatings.length, result.length);
  for (let i = 0; i < lengthToCopy; i++) {
    result[i] = urlRatings[i];
  }
  return result;
}
