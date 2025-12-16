const cache = new Map();

export async function fetchWithCache(url) {
  if (cache.has(url)) {
    console.log("From cache:", url);
    return cache.get(url);
  }
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  cache.set(url, data);
  return data;
}

export function deleteFromCache(url) {
  console.log("Deleting from cache:", url);
  console.log(cache.has(url));
  cache.delete(url);
}
