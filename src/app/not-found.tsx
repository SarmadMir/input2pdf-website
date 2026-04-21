import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-20 sm:px-8">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        404
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        No page here.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-light-dark">
        The link may have moved, or it never existed. Try one of these.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/solutions" variant="secondary">
          Explore solutions
        </ButtonLink>
        <ButtonLink href="/case-studies" variant="secondary">
          See case studies
        </ButtonLink>
      </div>

      <p className="mt-10 text-sm text-foreground/55">
        Think something is broken?{/* voice-exempt: 404 copy asks visitor about their experience, not a competitor claim */}{' '}
        <Link
          href="/contact"
          className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          Tell us.
        </Link>
      </p>
    </main>
  );
}
