/** Computes the featured image URL, matching the Hugo img-path partial logic. */
export function getFeaturedImageUrl(
  featured: string,
  featuredpath: string,
  date: Date,
): string | null {
  if (!featured) return null;

  if (featuredpath === 'date') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `/img/${year}/${month}/${featured}`;
  }

  if (featuredpath) {
    return `${featuredpath}${featured}`;
  }

  return `/img/${featured}`;
}
