import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type ContentKind = "projects" | "open-source" | "notes";

export type ContentFrontmatter = {
  title: string;
  summary: string;
  date?: string;
  status?: string;
  tags?: string[];
  link?: string;
  featured?: boolean;
};

export type ContentItem = ContentFrontmatter & {
  slug: string;
  body: string;
  kind: ContentKind;
};

export async function getContentItems(kind: ContentKind): Promise<ContentItem[]> {
  const directory = path.join(contentRoot, kind);
  const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"));
  const items = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(directory, file), "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as Omit<ContentFrontmatter, "date"> & {
        date?: string | Date;
      };
      return {
        ...frontmatter,
        date:
          frontmatter.date instanceof Date
            ? frontmatter.date.toISOString().slice(0, 10)
            : frontmatter.date,
        body: content,
        kind,
        slug: file.replace(/\.mdx$/, "")
      };
    })
  );

  return items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getContentItem(kind: ContentKind, slug: string) {
  const items = await getContentItems(kind);
  return items.find((item) => item.slug === slug);
}
