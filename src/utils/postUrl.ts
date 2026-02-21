/** Generates a post URL from its content collection slug (e.g. "2016/06/my-post" -> "/blog/2016/06/my-post/"). */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}/`;
}
