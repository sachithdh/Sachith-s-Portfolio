export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: string;
  content: string; // markdown body
}

// import all .md files as raw text at build time
const markdownFiles = import.meta.glob("./posts/*.md", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

// import all image files from the posts directory as resolved URLs
const imageFiles = import.meta.glob(
  "./posts/**/*.{png,jpg,jpeg,gif,svg,webp,avif}",
  { eager: true }
) as Record<string, { default: string }>;

/**
 * Map of image path (relative to posts/) to resolved asset URL.
 */
export const blogImageMap: Record<string, string> = {};
for (const [path, mod] of Object.entries(imageFiles)) {
  const relativePath = path.replace(/^\.\/posts\//, "");
  blogImageMap[relativePath] = mod.default;
  const filename = path.split("/").pop() || "";
  if (!blogImageMap[filename]) {
    blogImageMap[filename] = mod.default;
  }
}

function parseFrontmatter(raw: string): {
  meta: Record<string, string | string[]>;
  content: string;
} {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = raw.match(fmRegex);

  if (!match) {
    return { meta: {}, content: raw };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const meta: Record<string, string | string[]> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Parse arrays like ["tag1", "tag2"]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1);
      meta[key] = inner
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      meta[key] = value;
    }
  }

  return { meta, content };
}

/**
 * Derive a URL slug from a file path.
 * e.g., "./posts/my-awesome-post.md" → "my-awesome-post"
 */
function slugFromPath(path: string): string {
  const filename = path.split("/").pop() || "";
  return filename.replace(/\.md$/, "");
}

/**
 * Returns all blog posts, parsed and sorted by date (newest first).
 */
export function useBlogPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const [path, mod] of Object.entries(markdownFiles)) {
    const raw = mod.default;
    const { meta, content } = parseFrontmatter(raw);

    posts.push({
      slug: slugFromPath(path),
      title: (meta.title as string) || slugFromPath(path),
      date: (meta.date as string) || "1970-01-01",
      description: (meta.description as string) || "",
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      readTime: (meta.readTime as string) || "",
      content,
    });
  }

  // Sort by date descending (newest first)
  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return posts;
}
