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

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socialLinks = {
  github: 'https://github.com/SarmadMir',
  linkedin: 'https://www.linkedin.com/in/sarmadmir/',
} as const;
