import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="bg-dark py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Transform Your Document Workflow?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          Tell us what you need — certificates, eCards, forms, or a full generation
          portal. We&apos;ll build a custom solution that fits your business perfectly.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Start Your Project
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/20 px-8 py-3 text-base font-semibold text-white transition-all hover:border-white/40"
          >
            View Past Work
          </Link>
        </div>
      </div>
    </section>
  );
}
