import raw from './disposable-domains.json';

const SET = new Set<string>((raw as string[]).map((d) => d.toLowerCase()));

/** Returns true if the email's domain is a known disposable / throwaway provider. */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return !!domain && SET.has(domain);
}
