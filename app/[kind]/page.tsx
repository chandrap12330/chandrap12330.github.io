import { notFound } from "next/navigation";
import { ContentCard } from "@/components/content-card";
import { getContentItems, type ContentKind } from "@/lib/content";

const pageCopy: Record<ContentKind, { eyebrow: string; title: string; description: string }> = {
  "open-source": {
    eyebrow: "Open source",
    title: "Contributing in public.",
    description: "A transparent record of upstream work, contribution preparation, and the systems I am learning from."
  },
  projects: {
    eyebrow: "Projects",
    title: "Things I am building.",
    description: "Practical experiments and tools, with their current stage and technical direction made clear."
  },
  notes: {
    eyebrow: "Engineering notes",
    title: "Learning in the open.",
    description: "Short technical notes on AI systems, voice interfaces, inference, and the questions worth investigating."
  }
};

export function generateStaticParams() {
  return Object.keys(pageCopy).map((kind) => ({ kind }));
}

export default async function ListingPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!(kind in pageCopy)) notFound();
  const typedKind = kind as ContentKind;
  const copy = pageCopy[typedKind];
  const items = await getContentItems(typedKind);

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </section>
      <section className="listing" aria-label={copy.eyebrow}>
        {items.map((item) => <ContentCard key={item.slug} item={item} />)}
      </section>
    </>
  );
}
