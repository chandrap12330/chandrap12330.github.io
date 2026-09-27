import Link from "next/link";
import Image from "next/image";
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
        <div className="hero-copy">
          <p className="eyebrow">AI engineering · open source · practical systems</p>
          <h1>Building toward practical, local, realtime AI.</h1>
          <p className="lede">
            I&apos;m Chandra Prakash. This is a growing record of projects, experiments,
            and open-source work around AI systems, voice interfaces, and efficient
            inference.
          </p>
          <div className="hero-links">
            <a
              href="https://github.com/chandra-prakash-94"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/chandra-prakash-ds/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://drive.google.com/file/d/1sXqpQnDLJE0wIQMXvmLfPpklz3hGgb48/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
            >
              Resume ↗
            </a>
          </div>
        </div>
        <Image
          className="profile-photo"
          src="/profile.jpg"
          alt="Chandra Prakash"
          width={560}
          height={560}
          priority
        />
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
            <p>
              Exploring a CPU-first voice AI companion and the systems behind responsive
              voice interaction.
            </p>
          </article>
          <article>
            <span aria-hidden="true">🤗</span>
            <h3>Open source</h3>
            <p>
              Preparing to contribute to open-source AI infrastructure, beginning with
              speech-to-speech systems.
            </p>
          </article>
          <article>
            <span aria-hidden="true">⚡</span>
            <h3>Efficient inference</h3>
            <p>
              Learning how latency, streaming, quantization, and consumer hardware shape
              AI products.
            </p>
          </article>
        </div>
      </section>

      <ContentSection title="Open source" href="/open-source/" items={openSource} />
      <ContentSection title="Projects" href="/projects/" items={projects} />
      <ContentSection title="Latest notes" href="/notes/" items={notes} />
    </>
  );
}

function ContentSection({
  title,
  href,
  items
}: {
  title: string;
  href: string;
  items: Awaited<ReturnType<typeof getContentItems>>;
}) {
  return (
    <section
      className="section"
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
    >
      <div className="section-heading row-heading">
        <div>
          <p className="eyebrow">{title}</p>
          <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
            Work in progress.
          </h2>
        </div>
        <Link className="text-link" href={href}>
          View all <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="card-grid">
        {items.slice(0, 2).map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
