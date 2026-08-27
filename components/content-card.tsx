import Link from "next/link";
import type { ContentItem } from "@/lib/content";

export function ContentCard({ item }: { item: ContentItem }) {
  const href = `/${item.kind}/${item.slug}/`;

  return (
    <article className="content-card">
      <div className="card-meta">
        {item.status && <span>{item.status}</span>}
        {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
      </div>
      <h3>
        <Link href={href}>{item.title}</Link>
      </h3>
      <p>{item.summary}</p>
      {item.tags && (
        <ul className="tags" aria-label="Topics">
          {item.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <Link className="text-link" href={href}>
        Read more <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(`${date}T00:00:00`)
  );
}
