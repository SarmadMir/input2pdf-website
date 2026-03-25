import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turning Data into PDFs,{' '}
            <span className="text-primary">Seamlessly</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-light-dark">
            We build custom PDF generation systems that transform your user inputs
            into professionally designed certificates, eCards, forms, and documents.
            Fast, reliable, and tailored to your business.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Get Your Custom Solution
            </Link>
            <a
              href="#demo"
              className="rounded-full border border-border px-8 py-3 text-base font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
            >
              Try the Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
