export interface Capability {
  label: string;
  description: string;
  highlight?: boolean;
}

export interface Solution {
  number: string;
  title: string;
  headline: string;
  description: string;
  forWho: string;
  icon: 'certificate' | 'ecard' | 'form' | 'invoice' | 'permit' | 'portal';
  badge?: string;
  capabilities: Capability[];
  examples: string[];
  industries: string[];
}

export const solutions: Solution[] = [
  {
    number: '01',
    title: 'Certificates',
    headline: 'Professional certificates, generated and delivered instantly',
    description:
      'Training completions, course achievements, professional credentials, and merit badges \u2014 generated from user input, auto-numbered, and delivered directly to recipients.',
    forWho: 'For training providers, schools, and organizations',
    icon: 'certificate',
    badge: 'Most Popular',
    capabilities: [
      {
        label: 'Auto-Emailed',
        description: 'Delivered directly to each recipient\u2019s inbox upon generation',
        highlight: true,
      },
      {
        label: 'Auto-Numbered',
        description: 'Sequential certificate numbers with custom prefixes',
      },
      {
        label: 'Multi-Certificate Systems',
        description: 'Multiple certificate types from one platform',
      },
      {
        label: 'Certificate History',
        description: 'Track every certificate issued with searchable records',
      },
    ],
    examples: [
      'Course completions',
      'Training certifications',
      'Merit badges',
      'Achievement awards',
      'CPR & safety certs',
      'Professional credentials',
    ],
    industries: ['Education', 'Healthcare', 'Corporate Training', 'Government', 'Sports', 'Wellness'],
  },
  {
    number: '02',
    title: 'eCards & Digital Cards',
    headline: 'Branded digital cards valid for years, delivered instantly',
    description:
      'CPR eCards, course completion cards, event passes, and digital credentials \u2014 card-format documents branded to your design and distributed digitally.',
    forWho: 'For training programs, events, and credentialing bodies',
    icon: 'ecard',
    capabilities: [
      {
        label: 'Digital Distribution',
        description: 'Emailed or downloadable \u2014 no physical printing needed',
        highlight: true,
      },
      {
        label: 'Validity Periods',
        description: 'Built-in expiration dates and renewal tracking',
      },
      {
        label: 'Branded Design',
        description: 'Every card matches your organization\u2019s look and feel',
      },
      {
        label: 'Bulk Generation',
        description: 'Hundreds of personalized cards in seconds',
      },
    ],
    examples: [
      'CPR eCards',
      'Course completion cards',
      'Event passes',
      'Digital credentials',
      'Membership cards',
      'Program enrollment cards',
    ],
    industries: ['Healthcare', 'Education', 'Events', 'Corporate Training'],
  },
  {
    number: '03',
    title: 'Forms & Agreements',
    headline: 'Structured business documents with digital signatures',
    description:
      'Trade applications, labor agreements, real estate contracts, and business registration forms \u2014 with built-in signature capture and multi-language support.',
    forWho: 'For legal teams, HR, finance, and real estate',
    icon: 'form',
    capabilities: [
      {
        label: 'Signature Pad',
        description: 'Built-in digital signature capture on any form',
        highlight: true,
      },
      {
        label: 'Multi-Language',
        description: 'English, German, Dutch, and more \u2014 RTL supported',
      },
      {
        label: 'Conditional Fields',
        description: 'Forms adapt based on user selections and business type',
      },
      {
        label: 'Auto-Calculations',
        description: 'Totals, taxes, and fees computed automatically',
      },
    ],
    examples: [
      'Trade applications',
      'Labor agreements',
      'Real estate contracts',
      'Business registration',
      'Service agreements',
      'Department forms',
    ],
    industries: ['Finance', 'Real Estate', 'Legal', 'Transportation', 'HR'],
  },
  {
    number: '04',
    title: 'Invoices & Orders',
    headline: 'Order confirmations and financial documents, calculated and formatted',
    description:
      'Reservation forms, order confirmations, withdrawal documents, and wire transfer records \u2014 with pricing calculations, shipping options, and professional formatting.',
    forWho: 'For e-commerce, banking, and service businesses',
    icon: 'invoice',
    capabilities: [
      {
        label: 'Price Calculations',
        description: 'Subtotals, shipping, taxes, and fees computed on the fly',
        highlight: true,
      },
      {
        label: 'Payment Details',
        description: 'Account numbers, tracking IDs, and reference codes',
      },
      {
        label: 'Shipping Integration',
        description: 'Pickup, shipping, and delivery options with pricing',
      },
      {
        label: 'Professional Layout',
        description: 'Clean, structured documents ready for records',
      },
    ],
    examples: [
      'Order confirmations',
      'Reservation forms',
      'Wire transfer records',
      'Withdrawal documents',
      'Payment receipts',
      'Billing statements',
    ],
    industries: ['E-Commerce', 'Banking', 'Finance', 'Retail'],
  },
  {
    number: '05',
    title: 'Permits & Licenses',
    headline: 'Official documents for inspections, compliance, and credentials',
    description:
      'Vehicle inspection permits, health compliance records, vaccination certificates, and official licenses \u2014 formatted to government standards with verification support.',
    forWho: 'For government agencies, inspectors, and compliance teams',
    icon: 'permit',
    capabilities: [
      {
        label: 'Official Formatting',
        description: 'Meets government and regulatory document standards',
        highlight: true,
      },
      {
        label: 'Verification Support',
        description: 'Public lookup for permit and license validation',
      },
      {
        label: 'Image Overlays',
        description: 'Stamps, seals, and official marks layered onto documents',
      },
      {
        label: 'Compliance Ready',
        description: 'Structured data fields for audit and inspection records',
      },
    ],
    examples: [
      'Vehicle permits',
      'Inspection certificates',
      'Health compliance records',
      'Vaccination certificates',
      'Official licenses',
      'Regulatory documents',
    ],
    industries: ['Government', 'Healthcare', 'Transportation', 'Compliance'],
  },
  {
    number: '06',
    title: 'Generation Portals',
    headline: 'Full-scale platforms for document generation at volume',
    description:
      'Admin dashboards, multi-user systems, and white-labeled portals for organizations that generate documents at scale \u2014 with role-based access, history tracking, and public verification.',
    forWho: 'For organizations generating at scale',
    icon: 'portal',
    badge: 'Enterprise',
    capabilities: [
      {
        label: 'Admin Dashboard',
        description: 'Manage templates, users, and generation history',
        highlight: true,
      },
      {
        label: 'Multi-User Access',
        description: 'Role-based login for instructors, admins, and staff',
      },
      {
        label: 'Public Status Checker',
        description: 'No-login lookup for certificate and document verification',
      },
      {
        label: 'Multi-Format Output',
        description: 'Certificates, flash cards, worksheets from one system',
      },
    ],
    examples: [
      'Scout badge portals',
      'Training certificate platforms',
      'School assessment systems',
      'Customer onboarding portals',
      'HR document platforms',
      'White-labeled generators',
    ],
    industries: ['Education', 'Corporate Training', 'Banking', 'HR'],
  },
];
