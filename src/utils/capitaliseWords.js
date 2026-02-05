export function capitalizeWords(string) {
  // Split the string into an array of words
  const words = string.split(" ");

  // Iterate over each word and capitalize the first letter
  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word; // Return empty strings as-is
  });

  // Join the words back into a single string with spaces
  return capitalizedWords.join(" ");
}
