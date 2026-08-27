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
        Chandrap
      </Link>
      <nav aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <a href="https://github.com/chandrap12330" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
