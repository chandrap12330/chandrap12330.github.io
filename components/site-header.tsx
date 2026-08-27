import Link from "next/link";

const navigation = [
  ["Open source", "/open-source/"],
  ["Projects", "/projects/"],
  ["Notes", "/notes/"]
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Home">
        Chandra Prakash
      </Link>
      <nav aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <a
          href="https://github.com/chandra-prakash-94"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
