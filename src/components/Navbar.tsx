const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact", href: "#contact" },
];

function ResumeLink({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/Khanittha-Hemngern-Resume.pdf"
      target="_blank"
      rel="noreferrer"
      className={`rounded-full border border-[#cdbba9] bg-[#ede4da] font-semibold text-[#766a60] ${
        compact ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
      }`}
    >
      Resume
    </a>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2d7cc] bg-[#f7f3ee]/95 backdrop-blur-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between gap-6 px-6"
      >
        <a
          href="#top"
          className="rounded-md text-xl font-bold tracking-tight text-[#2f2a26] transition-colors hover:text-[#7a5a3a]"
        >
          Ning
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md text-sm font-medium text-[#5f5a55] transition-colors hover:text-[#2f2a26]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ResumeLink compact />
        </div>

        <details className="group relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-[#d8cabd] bg-white px-4 py-2 text-sm font-semibold text-[#403a35] marker:content-none">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <div className="absolute right-0 top-12 w-56 rounded-3xl border border-[#ded2c7] bg-[#fffdfa] p-3 shadow-[0_18px_45px_rgba(76,58,42,0.12)]">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-[#4d4741] transition-colors hover:bg-[#f2ebe4]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-[#e6ddd5] px-2 pt-3">
              <ResumeLink />
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
