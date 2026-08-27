import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getContentItems } from "@/lib/content";

export default async function Home() {
  const [projects, openSource, notes] = await Promise.all([
    getContentItems("projects"),
    getContentItems("open-source"),
    getContentItems("notes")
  ]);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">AI engineering · open source · practical systems</p>
        <h1>Building toward practical, local, realtime AI.</h1>
        <p className="lede">
          I&apos;m Chandrap. This is a growing record of projects, experiments, and open-source
          work around AI systems, voice interfaces, and efficient inference.
        </p>
        <div className="hero-links">
          <a href="https://github.com/chandrap12330" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <span>LinkedIn — coming soon</span>
          <span>Resume — coming soon</span>
        </div>
      </section>

      <section className="section current" aria-labelledby="current-heading">
        <div className="section-heading">
          <p className="eyebrow">Currently</p>
          <h2 id="current-heading">The direction I&apos;m exploring</h2>
        </div>
        <div className="current-grid">
          <article>
            <span aria-hidden="true">🎙</span>
            <h3>Local voice AI</h3>
            <p>Exploring a CPU-first voice AI companion and the systems behind responsive voice interaction.</p>
          </article>
          <article>
            <span aria-hidden="true">🤗</span>
            <h3>Open source</h3>
            <p>Preparing to contribute to open-source AI infrastructure, beginning with speech-to-speech systems.</p>
          </article>
          <article>
            <span aria-hidden="true">⚡</span>
            <h3>Efficient inference</h3>
            <p>Learning how latency, streaming, quantization, and consumer hardware shape AI products.</p>
          </article>
        </div>
      </section>

      <ContentSection title="Open source" href="/open-source/" items={openSource} />
      <ContentSection title="Projects" href="/projects/" items={projects} />
      <ContentSection title="Latest notes" href="/notes/" items={notes} />
    </>
  );
}

function ContentSection({ title, href, items }: { title: string; href: string; items: Awaited<ReturnType<typeof getContentItems>> }) {
  return (
    <section className="section" aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <div className="section-heading row-heading">
        <div>
          <p className="eyebrow">{title}</p>
          <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>Work in progress, documented honestly.</h2>
        </div>
        <Link className="text-link" href={href}>View all <span aria-hidden="true">→</span></Link>
      </div>
      <div className="card-grid">
        {items.slice(0, 2).map((item) => <ContentCard key={item.slug} item={item} />)}
      </div>
    </section>
  );
}
