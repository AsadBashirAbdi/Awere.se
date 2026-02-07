import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/awere",
    icon: "/social/linkedin.svg",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/awere",
    icon: "/social/facebook.svg",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/awere",
    icon: "/social/instagram.svg",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/46123456789",
    icon: "/social/whatsapp.svg",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
        {/* Top section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground">
              AWERE Studio
            </p>
            <p className="text-sm text-muted-foreground">
              Modern websites that feel like products.
            </p>
            <p className="text-sm text-[var(--text)] font-medium">
              <a
                href="mailto:contact@awere.se"
                className="hover:text-[var(--accent)] transition-colors"
              >
                contact@awere.se
              </a>
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={20}
                  height={20}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  style={{
                    filter:
                      "invert(var(--invert-social, 0)) brightness(var(--brightness-social, 1))",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} AWERE. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="hover:text-[var(--text)] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[var(--text)] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/work"
              className="hover:text-[var(--text)] transition-colors"
            >
              Work
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

