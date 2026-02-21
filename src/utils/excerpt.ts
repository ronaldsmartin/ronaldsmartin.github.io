/** Strips HTML tags and Markdown syntax, returns the first ~wordCount words. Matches Hugo's .Summary behavior. */
export function getExcerpt(content: string, wordCount = 70): string {
  const text = content
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove images: ![alt](url)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // Convert links to just text: [text](url) → text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove reference-style links: [text][ref]
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
    // Remove headings: # text → text
    .replace(/^#{1,6}\s+/gm, '')
    // Remove blockquote markers
    .replace(/^>\s?/gm, '')
    // Remove bold/italic markers
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // Remove inline code backticks
    .replace(/`([^`]+)`/g, '$1')
    // Remove fenced code block markers
    .replace(/^```[\s\S]*?^```/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Remove shortcode-like patterns
    .replace(/\{\{[^}]*\}\}/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  const words = text.split(/\s+/).slice(0, wordCount);
  return words.join(' ') + '...';
}
