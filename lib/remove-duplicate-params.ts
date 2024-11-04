/**
 * Removes duplicates from a `URLSearchParams` object and keeps only the first occurrence of each key.
 * @param urlSearchParams the `URLSearchParams` object to be formatted
 * @returns a new `URLSearchParams` object
 */

function removeDuplicateParams(urlSearchParams: URLSearchParams) {
  const uniqueParams = new URLSearchParams();
  const seenKeys = new Set();

  for (const [key, value] of urlSearchParams.entries()) {
    if (!seenKeys.has(key)) {
      uniqueParams.append(key, value);
      seenKeys.add(key);
    }
  }

  return uniqueParams;
}

export default removeDuplicateParams;
