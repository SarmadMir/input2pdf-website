/**
 * Suspense fallback for the ContactForm client island.
 *
 * Rendered while Next.js 16 resolves the `useSearchParams()` call inside
 * `<ContactForm />`. Matches the form's rough field count + submit button so
 * the layout doesn't jump on hydration.
 */
export function ContactFormSkeleton() {
  return (
    <div
      className="space-y-4"
      aria-busy="true"
      aria-label="Loading contact form"
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-md bg-foreground/5 animate-pulse"
        />
      ))}
      <div className="h-12 w-40 rounded-md bg-foreground/10 animate-pulse" />
    </div>
  );
}
