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
  icon: 'certificate' | 'ecard' | 'form' | 'portal';
}

export const solutionNavItems: SolutionNavItem[] = [
  {
    label: 'Certificates',
    href: '/solutions/certificates',
    description: 'Auto-generated and delivered instantly',
    icon: 'certificate',
  },
  {
    label: 'eCards & Invitations',
    href: '/solutions/ecards',
    description: 'Branded digital cards at scale',
    icon: 'ecard',
  },
  {
    label: 'Forms & Agreements',
    href: '/solutions/forms',
    description: 'Structured documents with signatures',
    icon: 'form',
  },
  {
    label: 'Generation Portals',
    href: '/solutions/portals',
    description: 'Full-scale platforms for volume',
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
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const socialLinks = {
  github: 'https://github.com/SarmadMir',
  linkedin: 'https://www.linkedin.com/in/sarmadmir/',
} as const;
