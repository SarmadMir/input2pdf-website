export const brand = {
  name: 'Input2PDF',
  tagline: 'Custom document systems, built for your business.',
  description:
    'We build custom systems that generate certificates, agreements, and business documents from simple form inputs. Tailored to your needs, delivered fast.',
  colors: {
    primary: '#f26380',
    secondary: '#63F2D5',
    secondaryDark: '#387c6f',
    dark: '#413543',
    lightDark: '#665d68',
  },
} as const;

export interface SolutionNavItem {
  label: string;
  href: string;
  description: string;
  icon: 'certificate' | 'ecard' | 'form' | 'invoice' | 'permit' | 'portal';
}

export const solutionNavItems: SolutionNavItem[] = [
  {
    label: 'Certificates',
    href: '/solutions/certificates',
    description: 'Generated from a form, emailed to recipients',
    icon: 'certificate',
  },
  {
    label: 'eCards & Digital Cards',
    href: '/solutions/ecards',
    description: 'Branded cards with built-in expiry dates',
    icon: 'ecard',
  },
  {
    label: 'Forms & Agreements',
    href: '/solutions/forms',
    description: 'Contracts and forms with digital signatures',
    icon: 'form',
  },
  {
    label: 'Invoices & Orders',
    href: '/solutions/invoices',
    description: 'Order forms with auto-calculated totals',
    icon: 'invoice',
  },
  {
    label: 'Permits & Licenses',
    href: '/solutions/permits',
    description: 'Government-formatted official documents',
    icon: 'permit',
  },
  {
    label: 'Generation Portals',
    href: '/solutions/portals',
    description: 'Your own document platform, white-labeled',
    icon: 'portal',
  },
];

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions', hasDropdown: true },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const socialLinks = {
  github: 'https://github.com/SarmadMir',
  linkedin: 'https://www.linkedin.com/in/sarmadmir/',
} as const;
