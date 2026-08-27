import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/content-card";
import { getContentItem, getContentItems, type ContentKind } from "@/lib/content";

const kinds: ContentKind[] = ["projects", "open-source", "notes"];

export async function generateStaticParams() {
  const all = await Promise.all(kinds.map((kind) => getContentItems(kind)));
  return all.flatMap((items) => items.map(({ kind, slug }) => ({ kind, slug })));
}

export default async function ArticlePage({ params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  if (!kinds.includes(kind as ContentKind)) notFound();
  const item = await getContentItem(kind as ContentKind, slug);
  if (!item) notFound();

  return (
    <article className="article">
      <Link className="back-link" href={`/${kind}/`}>← Back to {kind}</Link>
      <header className="article-header">
        <p className="eyebrow">{item.status ?? kind}</p>
        <h1>{item.title}</h1>
        <p className="article-summary">{item.summary}</p>
        <div className="card-meta">
          {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
          {item.link && <a href={item.link} target="_blank" rel="noreferrer">External link ↗</a>}
        </div>
      </header>
      <div className="prose"><MDXRemote source={item.body} /></div>
    </article>
  );
}
