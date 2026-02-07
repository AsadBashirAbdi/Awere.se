import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkItems, getWorkItemBySlug } from "@/lib/content";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionHeader } from "@/components/ui/SectionHeader";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = getWorkItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    return {
      title: "Work — AWERE",
    };
  }

  return {
    title: `${item.title} — AWERE`,
    description: item.summary,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="space-y-10 py-12 max-w-3xl">
        <div className="space-y-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded px-2 py-1 -ml-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12 L6 8 L10 4" />
            </svg>
            Back to Work
          </Link>
          <SectionHeader
            label={`${item.type.toUpperCase()} / ${item.year || "2024"}`}
            title={item.title}
            description={item.summary}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3 text-xs">
          <div className="surface p-4 space-y-1">
            <p className="font-mono tracking-[0.18em] text-muted-foreground uppercase">
              Status
            </p>
            <p className="text-sm font-medium text-black">{item.status}</p>
          </div>
          <div className="surface p-4 space-y-1">
            <p className="font-mono tracking-[0.18em] text-muted-foreground uppercase">
              Stack
            </p>
            <p className="text-sm font-medium text-black">{item.stack}</p>
          </div>
          <div className="surface p-4 space-y-1">
            <p className="font-mono tracking-[0.18em] text-muted-foreground uppercase">
              Year
            </p>
            <p className="text-sm font-medium text-black">{item.year || "2024"}</p>
          </div>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(23,23,23,0.12)] bg-white/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {item.scope && (
          <div className="surface p-6 space-y-3">
            <h3 className="text-sm font-mono tracking-[0.18em] text-muted-foreground uppercase">
              Scope
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.scope}
            </p>
          </div>
        )}

        {item.overview && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.overview}
            </p>
          </div>
        )}

        {item.whatWeBuilt && item.whatWeBuilt.length > 0 && (
          <div className="surface p-6 space-y-4">
            <h3 className="text-sm font-mono tracking-[0.18em] text-muted-foreground uppercase">
              What We Built
            </h3>
            <ul className="space-y-3">
              {item.whatWeBuilt.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.systemsNotes && (
          <div className="surface p-6 space-y-3 border-l-2 border-[var(--accent)]">
            <h3 className="text-sm font-mono tracking-[0.18em] text-muted-foreground uppercase">
              Systems Notes
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.systemsNotes}
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-[rgba(23,23,23,0.08)]">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            Start a similar project
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
