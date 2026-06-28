import Link from "next/link";
import { COLORS, BLUSH_BG } from "@/components/theme";
import { ArrowLeftIcon, SparkleIcon } from "@/components/Icons";
import LayoutImage from "@/components/layout/LayoutImage";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Show the floral bouquets at the top corners. */
  florals?: boolean;
}

export default function PageShell({ title, subtitle, children, florals = true }: PageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: BLUSH_BG }}>
      {florals && (
        <div className="absolute inset-x-0 top-0 h-px">
          <LayoutImage id="shell.bouquetL" />
          <LayoutImage id="shell.bouquetR" />
        </div>
      )}

      <div
        className="relative z-10 mx-auto w-full max-w-md px-5 pb-14"
        style={{ paddingTop: "calc(38vw + 24px)" }}
      >
        <header className="text-center mb-8">
          <SparkleRow />
          <h1 className="font-script text-5xl" style={{ color: COLORS.pink }}>
            {title}
          </h1>
          {subtitle && (
            <p className="font-heading text-base mt-1" style={{ color: COLORS.mauve }}>
              {subtitle}
            </p>
          )}
        </header>

        {children}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-heading text-sm tracking-wide hover:underline"
            style={{ color: COLORS.rose }}
          >
            <ArrowLeftIcon size={16} />
            Voltar ao convite
          </Link>
        </div>
      </div>

      {/* Discreet butterflies near the bottom */}
      <div className="absolute inset-x-0 bottom-0 z-0" aria-hidden="true">
        <LayoutImage id="shell.butterfly1" />
        <LayoutImage id="shell.butterfly2" />
        <LayoutImage id="shell.butterfly3" />
      </div>
    </main>
  );
}

export function SparkleRow() {
  return (
    <div className="flex items-center justify-center gap-3 mb-3" style={{ color: COLORS.rose }} aria-hidden="true">
      <SparkleIcon size={9} />
      <SparkleIcon size={14} />
      <SparkleIcon size={9} />
    </div>
  );
}
