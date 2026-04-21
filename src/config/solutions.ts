export interface Capability {
  label: string;
  description: string;
  highlight?: boolean;
}

export interface HowItWorksStep {
  /** Lucide icon name */
  icon: string;
  title: string;
  description: string;
  /** Small coral detail line beneath the description */
  detail?: string;
}

export interface HeroFeature {
  icon: string;
  title: string;
  description: string;
}

export interface SupportingFeature {
  icon: string;
  title: string;
  description: string;
}

export interface UseCase {
  tag: string;
  title: string;
  description: string;
  stat: string;
}

export type SolutionSlug =
  | 'certificates'
  | 'ecards'
  | 'forms'
  | 'invoices'
  | 'permits'
  | 'portals'
  | 'contracts';

export interface Solution {
  slug: SolutionSlug;
  number: string;
  title: string;
  /** Short marketing line — used on landing/overview cards */
  headline: string;
  /** Long description — used on /solutions overview page */
  description: string;
  forWho: string;
  icon: 'certificate' | 'ecard' | 'form' | 'invoice' | 'permit' | 'portal' | 'contract';
  badge?: string;

  /* ─── Detail page content (v3 design) ─── */

  /** Coral eyebrow above the H1 */
  heroEyebrow: string;
  /** Benefit-driven H1 */
  heroH1: string;
  /** Longer subtitle beneath the H1 */
  heroSubtitle: string;
  /** 3 check-mark proof bullets */
  proofBullets: [string, string, string];

  /** "How It Works" section */
  howItWorksH2: string;
  howItWorksSub: string;
  howItWorks: [HowItWorksStep, HowItWorksStep, HowItWorksStep];

  /** "Features" section — asymmetric layout */
  featuresH2: string;
  featuresSub: string;
  heroFeatures: [HeroFeature, HeroFeature];
  supportingFeatures: SupportingFeature[];

  /** "Use Cases" section — "Built for real programs" */
  useCasesH2: string;
  useCasesSub: string;
  useCases: [UseCase, UseCase, UseCase];

  /** CTA section */
  ctaH2: string;
  ctaSub: string;
  ctaMicro: string;

  /* ─── Used by landing teaser, /solutions overview, mega menu ─── */
  capabilities: Capability[];
  examples: string[];
  industries: string[];
}

export const solutions: Solution[] = [
  {
    slug: 'certificates',
    number: '01',
    title: 'Certificates',
    headline: 'Professional certificates, generated and delivered instantly',
    description:
      'Training completions, course achievements, professional credentials, and merit badges — generated from user input, auto-numbered, and delivered directly to recipients.',
    forWho: 'For training providers, schools, and organizations',
    icon: 'certificate',
    badge: 'Most Popular',

    heroEyebrow: 'Certificate Systems',
    heroH1: 'Your certificates, delivered the moment someone finishes.',
    heroSubtitle:
      'Custom-built for training providers, schools, and credentialing bodies. Not a template \u2014 a system built specifically for your workflow, branded to your organization, with a custom form designed around your fields.',
    proofBullets: [
      'Branded to your design \u2014 emailed to each recipient the moment they complete your form',
      'Custom form built around your fields and logic \u2014 not a template',
      'Full generation history — searchable by name, date, or course',
    ],

    howItWorksH2: "From form submission to the recipient\u2019s inbox.",
    howItWorksSub:
      'From form submission to a branded PDF in the recipient\u2019s inbox. Here\u2019s the system we build.',
    howItWorks: [
      {
        icon: 'mail',
        title: 'A recipient fills out your form',
        description:
          'We build a custom web form tailored to your workflow \u2014 your fields, your logic, your branding. Every field serves your workflow.',
        detail: 'Your fields, your validation, your branding',
      },
      {
        icon: 'zap',
        title: 'We generate the certificate',
        description:
          'Branded to your design, populated with their inputs. The PDF generates from your template in seconds.',
        detail: 'Generated in seconds, not minutes',
      },
      {
        icon: 'send',
        title: 'It lands in their inbox',
        description:
          'The PDF is emailed to the recipient \u2014 from your address, with your message. Every certificate and its recipient logged automatically.',
        detail: 'Sent, logged, and searchable',
      },
    ],

    featuresH2: 'What your system includes.',
    featuresSub:
      'Built for your workflow. If you won\u2019t use it, it\u2019s not in the build.',
    heroFeatures: [
      {
        icon: 'mail',
        title: 'Delivered to their inbox.',
        description:
          'We connect your form to email delivery so recipients get the certificate the moment they qualify. They see your name in their inbox \u2014 not ours. Every send is logged so you know who received theirs.',
      },
      {
        icon: 'hash',
        title: 'Tracked and numbered.',
        description:
          'Need sequential certificate numbers? We build custom numbering \u2014 prefixes, date codes, whatever your record-keeping requires. Every certificate is searchable by recipient or date.',
      },
    ],
    supportingFeatures: [
      {
        icon: 'layers',
        title: 'Multi-certificate systems',
        description: 'One system, multiple certificate types. Different templates for different courses or programs.',
      },
      {
        icon: 'history',
        title: 'Full certificate history',
        description: 'Every certificate ever issued, searchable by name, date, or course.',
      },
      {
        icon: 'palette',
        title: 'Matches your brand',
        description: "Your colors, fonts, logo, signatures. The certificate looks like it\u2019s from your org, not ours.",
      },
      {
        icon: 'shield-check',
        title: 'Verification page',
        description:
          'On request: we build a public verification page \u2014 anyone can check if a certificate is real.',
      },
    ],

    useCasesH2: 'Built for real programs.',
    useCasesSub:
      'Based on systems we\u2019ve built. Names changed, workflows real.',
    useCases: [
      {
        tag: 'Training Provider',
        title: 'CPR & First Aid Certification',
        description:
          'Trainers submit results after each session. Each certificate includes a unique ID, course date, and instructor name \u2014 then emails directly to the participant.',
        stat: 'Health & safety sector',
      },
      {
        tag: 'Online Course Platform',
        title: 'Multi-Course Completion Badges',
        description:
          'Students complete courses on the platform. Each course has its own certificate template. Completions trigger generation automatically \u2014 every certificate logged and searchable.',
        stat: 'Multi-template setup',
      },
      {
        tag: 'Corporate HR',
        title: 'Employee Recognition Awards',
        description:
          'HR submits employee names and achievements. Certificates match company branding exactly \u2014 logo, colors, signatures. Delivered to managers for in-person or remote presentation.',
        stat: 'Bulk generation',
      },
    ],

    ctaH2: 'Ready for your own certificate system?',
    ctaSub:
      "Tell us about your workflow. We\u2019ll send back a fixed-scope quote in 48 hours \u2014 free, no obligation.",
    ctaMicro: 'Typical build: 1\u20133 weeks  \u00b7  Fixed scope  \u00b7  One payment, not a subscription',

    capabilities: [
      { label: 'Auto-Emailed', description: "Delivered directly to each recipient's inbox upon generation", highlight: true },
      { label: 'Auto-Numbered', description: 'Sequential certificate numbers with custom prefixes' },
      { label: 'Multi-Certificate Systems', description: 'Multiple certificate types from one platform' },
      { label: 'Certificate History', description: 'Track every certificate issued with searchable records' },
    ],
    examples: ['Course completions', 'Training certifications', 'Merit badges', 'Achievement awards', 'CPR & safety certs', 'Professional credentials'],
    industries: ['Education', 'Healthcare', 'Corporate Training', 'Government', 'Sports', 'Wellness'],
  },
  {
    slug: 'ecards',
    number: '02',
    title: 'eCards & Digital Cards',
    headline: 'Branded digital cards valid for years, delivered instantly',
    description: 'CPR eCards, course completion cards, event passes, and digital credentials — card-format documents branded to your design and distributed digitally.',
    forWho: 'For training programs, events, and credentialing bodies',
    icon: 'ecard',

    heroEyebrow: 'Digital Card Systems',
    heroH1: 'Digital credentials your recipients actually keep.',
    heroSubtitle: 'Custom eCard and digital credential systems with built-in expiry dates, branded to your organization, and delivered instantly over email. No printing, no postage, no delays.',
    proofBullets: ['Branded cards with validity periods and renewal tracking', 'Bulk generation — hundreds of personalized cards in seconds', 'Emailed or downloadable — no printing, no postage'],

    howItWorksH2: 'From enrollment to a card in their inbox.',
    howItWorksSub: "Here\u2019s the system we build \u2014 from someone completing your program to a branded card in their inbox.",
    howItWorks: [
      { icon: 'pen-tool', title: 'You design the card', description: 'Submit your card layout with branding, validity period, and custom fields. We build it exactly.', detail: 'Card-format PDF output' },
      { icon: 'upload', title: 'We build the intake', description: 'We build a custom form or spreadsheet import to capture cardholder details \u2014 whatever fits your process.', detail: 'Form or spreadsheet import' },
      { icon: 'mail', title: 'Cards go out instantly', description: 'Each recipient gets their personalized card by email \u2014 branded, numbered, with expiry date included.', detail: 'No printing, no postage' },
    ],

    featuresH2: 'Cards that work like credentials.',
    featuresSub: "Not just PDFs \u2014 these cards carry real data and real expiry dates.",
    heroFeatures: [
      { icon: 'send', title: 'Digital-first delivery.', description: 'Emailed or downloadable — no physical printing needed. Recipients get their card the moment they qualify, not weeks later in the mail.' },
      { icon: 'calendar-clock', title: 'Built-in validity periods.', description: 'Expiration dates, renewal tracking, and automatic expiry warnings. You always know which cards are active and which need renewal.' },
    ],
    supportingFeatures: [
      { icon: 'palette', title: 'Branded to your org', description: "Every card matches your organization's exact look and feel — logo, colors, fonts." },
      { icon: 'zap', title: 'Bulk generation', description: 'Generate hundreds of personalized cards from a single spreadsheet in seconds.' },
      { icon: 'hash', title: 'Unique card IDs', description: 'Every card gets a unique number for tracking, verification, and audit trails.' },
      { icon: 'search', title: 'Verification support', description: 'Optional public lookup so anyone can confirm a card is valid and current.' },
    ],

    useCasesH2: 'Built for real credential programs.',
    useCasesSub: 'Based on systems we\u2019ve built. Names changed, workflows real.',
    useCases: [
      { tag: 'Healthcare Training', title: 'CPR eCards with 2-Year Validity', description: 'Trainees complete a CPR course and receive a branded eCard valid for 2 years. Expiry date printed on the card, tracked in the system.', stat: 'Health & safety sector' },
      { tag: 'Event Organizer', title: 'Conference Attendee Badges', description: 'Attendees register online and receive a personalized digital badge. Bulk generated ahead of the event, emailed to each attendee.', stat: 'Bulk generation' },
      { tag: 'Professional Body', title: 'Membership Credential Cards', description: 'Members receive annually renewed digital credentials with their membership tier and unique member number.', stat: 'Annual renewal cycle' },
    ],

    ctaH2: 'Ready to go digital?',
    ctaSub: "Tell us about your card program. We'll send back a fixed-scope quote in 48 hours — free, no obligation.",
    ctaMicro: 'Typical build: 1–3 weeks  ·  Fixed scope  ·  One payment, not a subscription',

    capabilities: [
      { label: 'Digital Distribution', description: 'Emailed or downloadable — no physical printing needed', highlight: true },
      { label: 'Validity Periods', description: 'Built-in expiration dates and renewal tracking' },
      { label: 'Branded Design', description: "Every card matches your organization's look and feel" },
      { label: 'Bulk Generation', description: 'Hundreds of personalized cards in seconds' },
    ],
    examples: ['CPR eCards', 'Course completion cards', 'Event passes', 'Digital credentials', 'Membership cards', 'Program enrollment cards'],
    industries: ['Healthcare', 'Education', 'Events', 'Corporate Training'],
  },
  {
    slug: 'forms',
    number: '03',
    title: 'Forms & Agreements',
    headline: 'Structured business documents with digital signatures',
    description: 'Trade applications, labor agreements, real estate contracts, and business registration forms — with built-in signature capture and multi-language support.',
    forWho: 'For legal teams, HR, finance, and real estate',
    icon: 'form',

    heroEyebrow: 'Form & Agreement Systems',
    heroH1: 'Paperwork that fills itself out and signs itself.',
    heroSubtitle: 'Structured business documents with built-in digital signature capture, conditional logic, and multi-language support. Built for legal, HR, and finance teams who are done with manual PDF editing.',
    proofBullets: ['Digital signature pad built into every form', 'Multi-language support — English, German, Dutch, and more', 'Signed PDF delivered to all parties automatically'],

    howItWorksH2: 'From a blank form to a signed PDF in seconds.',
    howItWorksSub: "Here's how your team goes from capturing information to producing a signed, formatted document.",
    howItWorks: [
      { icon: 'file-text', title: 'We structure your form', description: 'Define fields, conditional logic, calculations, and signature requirements. We match your exact document layout.', detail: 'Supports conditional fields & auto-calc' },
      { icon: 'pen-tool', title: 'Users sign and submit', description: 'Recipients fill out the form and capture digital signatures directly on any device — phone, tablet, or desktop.', detail: 'Works on any device' },
      { icon: 'send', title: 'Signed PDF, delivered', description: 'A signed, formatted PDF is generated instantly and delivered to all parties automatically.', detail: 'Both parties get a copy' },
    ],

    featuresH2: 'Beyond a form builder.',
    featuresSub: "Each system is built to match your exact document and workflow \u2014 not a drag-and-drop template.",
    heroFeatures: [
      { icon: 'pen-tool', title: 'Real signature capture.', description: 'Built-in signature pad on every form. Users draw their signature on any device. It appears on the final PDF exactly where it should \u2014 built in, not bolted on.' },
      { icon: 'languages', title: 'Multi-language, multi-format.', description: 'English, German, Dutch, and more — including RTL layouts. Each language version produces its own correctly formatted PDF.' },
    ],
    supportingFeatures: [
      { icon: 'git-branch', title: 'Conditional fields', description: 'Forms adapt based on user selections — show or hide sections, change options, adjust calculations.' },
      { icon: 'calculator', title: 'Auto-calculations', description: 'Totals, taxes, rates, and fees computed automatically from the inputs. No manual math.' },
      { icon: 'palette', title: 'Pixel-perfect layout', description: 'The PDF matches your original document layout exactly — headers, footers, tables, logos.' },
      { icon: 'shield-check', title: 'Audit-ready output', description: 'Every generated document is logged with timestamp, signer identity, and a unique document ID.' },
    ],

    useCasesH2: 'Built for real business workflows.',
    useCasesSub: 'Based on systems we\u2019ve built. Names changed, workflows real.',
    useCases: [
      { tag: 'Finance', title: 'Trade Application Forms', description: 'Clients fill out a sophisticated application form. Conditional fields adapt to account type. Final PDF routes to the accounts department automatically.', stat: 'Internal department tool' },
      { tag: 'Real Estate', title: 'Agent Agreements with Signature', description: 'Agents and clients fill in contract details and sign digitally on a tablet. Both parties receive a signed copy immediately.', stat: 'Digital signature built in' },
      { tag: 'Transportation', title: 'German Business Registration', description: 'Taxi and restaurant businesses fill out registration forms in German. Vehicle details and fee calculations auto-populate. Emailed to the registering office.', stat: 'Multi-language \u00b7 DE/EN' },
    ],

    ctaH2: 'Ready to streamline your paperwork?',
    ctaSub: "Tell us about your document workflow. We'll send back a fixed-scope quote in 48 hours — free, no obligation.",
    ctaMicro: 'Typical build: 1–3 weeks  ·  Fixed scope  ·  One payment, not a subscription',

    capabilities: [
      { label: 'Signature Pad', description: 'Built-in digital signature capture on any form', highlight: true },
      { label: 'Multi-Language', description: 'English, German, Dutch, and more — RTL supported' },
      { label: 'Conditional Fields', description: 'Forms adapt based on user selections and business type' },
      { label: 'Auto-Calculations', description: 'Totals, taxes, and fees computed automatically' },
    ],
    examples: ['Trade applications', 'Labor agreements', 'Real estate contracts', 'Business registration', 'Service agreements', 'Department forms'],
    industries: ['Finance', 'Real Estate', 'Legal', 'Transportation', 'HR'],
  },
  {
    slug: 'invoices',
    number: '04',
    title: 'Invoices & Orders',
    headline: 'Order confirmations and financial documents, calculated and formatted',
    description: 'Reservation forms, order confirmations, withdrawal documents, and wire transfer records — with pricing calculations, shipping options, and professional formatting.',
    forWho: 'For e-commerce, banking, and service businesses',
    icon: 'invoice',

    heroEyebrow: 'Invoice & Order Systems',
    heroH1: 'Stop building invoices by hand.',
    heroSubtitle: 'Automated order forms and invoices with auto-calculated totals, line items, tax handling, and professional formatting. Built for businesses that need reliable document generation at scale.',
    proofBullets: ['Line items, subtotals, taxes — calculated automatically', 'Branded invoices emailed to clients as PDF attachments', 'Professional layout with your logo, fonts, and payment terms'],

    howItWorksH2: 'Turn an order into a branded invoice without opening a spreadsheet.',
    howItWorksSub: "Here\u2019s how your orders become professional invoices \u2014 automatically.",
    howItWorks: [
      { icon: 'file-text', title: 'Design your invoice', description: 'Submit your invoice layout with your branding, line item structure, and payment terms. We build it exactly.', detail: 'Your logo, fonts, and layout' },
      { icon: 'link', title: 'We build the intake', description: 'We build a custom form or data import to capture order details and line items \u2014 whatever fits your process.', detail: 'Form or spreadsheet import' },
      { icon: 'send', title: 'Invoices go out automatically', description: 'Invoices are generated as PDFs with calculated totals and emailed to clients automatically.', detail: 'Calculated, formatted, delivered' },
    ],

    featuresH2: 'More than a template.',
    featuresSub: "Every invoice system is built around your exact line items, tax rules, and payment terms.",
    heroFeatures: [
      { icon: 'calculator', title: 'Totals that calculate themselves.', description: 'Line items, quantities, unit prices, subtotals, tax rates, discounts, and grand totals — all computed automatically from your data. No formulas to maintain.' },
      { icon: 'paintbrush', title: 'Your brand, every time.', description: 'Your logo, colors, fonts, and layout. Every invoice looks like it came from your business, not a generic tool.' },
    ],
    supportingFeatures: [
      { icon: 'layers', title: 'Bulk generation', description: 'Generate hundreds of invoices from a spreadsheet or database in one batch operation.' },
      { icon: 'mail', title: 'Email delivery', description: 'Invoices are automatically emailed to clients as PDF attachments with customizable messages.' },
      { icon: 'credit-card', title: 'Payment details', description: 'Account numbers, tracking IDs, reference codes, and payment terms — all in the right place.' },
      { icon: 'truck', title: 'Shipping integration', description: 'Pickup, shipping, and delivery options with pricing — calculated and formatted automatically.' },
    ],

    useCasesH2: 'Built for real billing workflows.',
    useCasesSub: 'Based on systems we\u2019ve built. Names changed, workflows real.',
    useCases: [
      { tag: 'Service Business', title: 'Project-Based Invoicing', description: 'Freelancers and agencies submit project details. Invoices generate with line items, hours, rates, and tax \u2014 then email to the client.', stat: 'Service & consulting sector' },
      { tag: 'E-Commerce', title: 'Order Confirmation PDFs', description: 'Customers place orders online. A branded confirmation PDF with line items, shipping, and totals is emailed instantly.', stat: 'Auto-calculated totals' },
      { tag: 'Pet Sales', title: 'Reservation & Shipping Forms', description: 'Buyers reserve online. Reservation form calculates pricing with shipping options and generates a branded PDF receipt.', stat: 'Pricing + shipping calc' },
    ],

    ctaH2: 'Ready to automate your invoices?',
    ctaSub: "Tell us about your invoicing workflow. We'll send back a fixed-scope quote in 48 hours — free, no obligation.",
    ctaMicro: 'Typical build: 1–3 weeks  ·  Fixed scope  ·  One payment, not a subscription',

    capabilities: [
      { label: 'Price Calculations', description: 'Subtotals, shipping, taxes, and fees computed on the fly', highlight: true },
      { label: 'Payment Details', description: 'Account numbers, tracking IDs, and reference codes' },
      { label: 'Shipping Integration', description: 'Pickup, shipping, and delivery options with pricing' },
      { label: 'Professional Layout', description: 'Clean, structured documents ready for records' },
    ],
    examples: ['Order confirmations', 'Reservation forms', 'Wire transfer records', 'Withdrawal documents', 'Payment receipts', 'Billing statements'],
    industries: ['E-Commerce', 'Banking', 'Finance', 'Retail'],
  },
  {
    slug: 'permits',
    number: '05',
    title: 'Permits & Licenses',
    headline: 'Official documents for inspections, compliance, and credentials',
    description: 'Vehicle inspection permits, health compliance records, vaccination certificates, and official licenses — formatted to government standards with verification support.',
    forWho: 'For government agencies, inspectors, and compliance teams',
    icon: 'permit',

    heroEyebrow: 'Permit & License Systems',
    heroH1: 'Official documents that meet the standard — every time.',
    heroSubtitle: 'Custom-built permit and license generation systems formatted to government standards, with image overlays, stamps, seals, and public verification lookups.',
    proofBullets: ['Formatted to regulatory and government standards', 'Official stamps, seals, and image overlays built in', 'Public verification available on request'],

    howItWorksH2: 'From inspection data to an official document.',
    howItWorksSub: "Here\u2019s how your inspectors or applicants go from data entry to an issued, verifiable permit.",
    howItWorks: [
      { icon: 'shield-check', title: 'We define the requirements', description: 'We build the document to regulatory standards \u2014 layout, seals, stamps, and all required fields.', detail: 'Meets compliance standards' },
      { icon: 'file-text', title: 'Inspectors capture data', description: 'Inspectors or applicants submit details through a custom form. The system enforces validation and compliance rules.', detail: 'Validation built in' },
      { icon: 'send', title: 'Permit issued and verifiable', description: 'Official PDF is issued. On request, we build a public verification page so anyone can confirm the permit is real.', detail: 'Public verification available' },
    ],

    featuresH2: 'Built for compliance, not convenience.',
    featuresSub: "These systems are designed around regulatory requirements — not generic document templates.",
    heroFeatures: [
      { icon: 'shield-check', title: 'Regulation-ready formatting.', description: 'Every document meets government and regulatory formatting standards. Official headers, footers, stamps, and data fields in the exact positions required.' },
      { icon: 'search', title: 'Public verification.', description: 'Anyone can verify a permit is real with a single lookup. No login required — just enter the permit number and get instant confirmation.' },
    ],
    supportingFeatures: [
      { icon: 'image', title: 'Image overlays', description: 'Stamps, seals, and official marks layered onto documents at the correct positions.' },
      { icon: 'clipboard-check', title: 'Compliance-ready fields', description: 'Structured data fields for audit trails, inspection records, and regulatory reporting.' },
      { icon: 'hash', title: 'Unique permit numbers', description: 'Custom numbering schemes that meet your record-keeping requirements.' },
      { icon: 'history', title: 'Full issuance history', description: 'Every permit ever issued, searchable for audits and compliance reviews.' },
    ],

    useCasesH2: 'Built for real compliance programs.',
    useCasesSub: 'Based on systems we\u2019ve built. Names changed, workflows real.',
    useCases: [
      { tag: 'Government', title: 'Vehicle Inspection Permits', description: 'Inspectors submit vehicle details and inspection results. Permits auto-generate with official stamps, image overlays, and unique permit numbers.', stat: 'State-level program' },
      { tag: 'Healthcare', title: 'Vaccination Certificates', description: 'Health providers record vaccination data. Certificates generate with patient details, batch numbers, and provider credentials. Publicly verifiable.', stat: 'Public verification enabled' },
      { tag: 'Transportation', title: 'Driver Compliance Records', description: 'Transport companies generate compliance documents for each driver. Records include license details, medical clearances, and expiry dates.', stat: 'Annual renewal cycle' },
    ],

    ctaH2: 'Ready to issue official documents?',
    ctaSub: "Tell us about your compliance workflow. We'll send back a fixed-scope quote in 48 hours — free, no obligation.",
    ctaMicro: 'Typical build: 1–3 weeks  ·  Fixed scope  ·  One payment, not a subscription',

    capabilities: [
      { label: 'Official Formatting', description: 'Meets government and regulatory document standards', highlight: true },
      { label: 'Verification Support', description: 'Public lookup for permit and license validation' },
      { label: 'Image Overlays', description: 'Stamps, seals, and official marks layered onto documents' },
      { label: 'Compliance Ready', description: 'Structured data fields for audit and inspection records' },
    ],
    examples: ['Vehicle permits', 'Inspection certificates', 'Health compliance records', 'Vaccination certificates', 'Official licenses', 'Regulatory documents'],
    industries: ['Government', 'Healthcare', 'Transportation', 'Compliance'],
  },
  {
    slug: 'portals',
    number: '06',
    title: 'Generation Portals',
    headline: 'Full-scale platforms for document generation at volume',
    description: 'Admin dashboards, multi-user systems, and white-labeled portals for organizations that generate documents at scale — with role-based access, history tracking, and public verification.',
    forWho: 'For organizations generating at scale',
    icon: 'portal',
    badge: 'Enterprise',

    heroEyebrow: 'Generation Portal Systems',
    heroH1: 'Your own document generation platform.',
    heroSubtitle: 'Full-scale portals for organizations that outgrow single-form tools. Admin dashboards, multi-user access, history tracking, and public verification \u2014 white-labeled to your brand.',
    proofBullets: ['Admin dashboard with role-based multi-user access', 'Public verification page for certificate and document lookup', 'White-labeled to your brand — your users never see ours'],

    howItWorksH2: 'From requirements to a running platform.',
    howItWorksSub: "Here's how we take your document workflows and turn them into a self-service portal your team runs independently.",
    howItWorks: [
      { icon: 'layers', title: 'We scope your workflows', description: 'We map out document types, user roles, approval flows, and integration points with your existing systems.', detail: 'Custom architecture per org' },
      { icon: 'users', title: 'We build your portal', description: 'Custom admin dashboard, role-based login, branded UI, and multi-document generation pipelines — all built to your spec.', detail: 'White-labeled to your brand' },
      { icon: 'database', title: 'Your team runs it', description: 'Generate thousands of documents with full history, audit logs, and public verification. We hand it off, you run it.', detail: 'Self-service from day one' },
    ],

    featuresH2: 'Enterprise infrastructure, not enterprise pricing.',
    featuresSub: "These are full platforms — not form builders with a coat of paint.",
    heroFeatures: [
      { icon: 'gauge', title: 'Admin dashboard.', description: 'Manage templates, users, generation history, and delivery status from a single interface. Role-based access means instructors, admins, and staff each see what they need.' },
      { icon: 'search', title: 'Public status checker.', description: 'No-login lookup for certificate and document verification. Anyone can check if a document is valid by entering its number — no account required.' },
    ],
    supportingFeatures: [
      { icon: 'users', title: 'Multi-user access', description: 'Role-based login for instructors, admins, and staff. Each role sees only what they need.' },
      { icon: 'file-stack', title: 'Multi-format output', description: 'Certificates, flash cards, worksheets — multiple document types from one system.' },
      { icon: 'workflow', title: 'Department workflows', description: 'Different departments, different templates, different approval chains — all in one portal.' },
      { icon: 'lock', title: 'Secure by default', description: 'Encrypted storage, role-based permissions, and audit logging on every action.' },
    ],

    useCasesH2: 'Built for real organizations at scale.',
    useCasesSub: 'Based on systems we\u2019ve built. Names changed, workflows real.',
    useCases: [
      { tag: 'Education', title: 'Scout Merit Badge Portal', description: 'Instructors log in, manage scouts, and generate Blue Card PDFs for each merit badge. Public status checker lets parents verify badges independently.', stat: 'Multi-user \u00b7 3 roles \u00b7 public checker' },
      { tag: 'Corporate Training', title: 'Instructor Certificate Platform', description: 'A training company manages multiple instructors, each generating certificates for their own students. Admin dashboard tracks everything. Custom numbering with company prefix.', stat: 'Multi-instructor \u00b7 admin dashboard' },
      { tag: 'Banking', title: 'Customer Onboarding Portal', description: 'A bank\u2019s admin team uses a custom portal to generate Personal Account Opening Forms for new customers. Document generation built into their onboarding flow.', stat: 'Internal tool \u00b7 custom-built' },
    ],

    ctaH2: 'Ready to scale your document operations?',
    ctaSub: "Tell us about your workflows and volume. We'll send back a fixed-scope quote in 48 hours — free, no obligation.",
    ctaMicro: 'Typical build: 2–4 weeks  ·  Fixed scope  ·  One payment, not a subscription',

    capabilities: [
      { label: 'Admin Dashboard', description: 'Manage templates, users, and generation history', highlight: true },
      { label: 'Multi-User Access', description: 'Role-based login for instructors, admins, and staff' },
      { label: 'Public Status Checker', description: 'No-login lookup for certificate and document verification' },
      { label: 'Multi-Format Output', description: 'Certificates, flash cards, worksheets from one system' },
    ],
    examples: ['Scout badge portals', 'Training certificate platforms', 'School assessment systems', 'Customer onboarding portals', 'HR document platforms', 'White-labeled generators'],
    industries: ['Education', 'Corporate Training', 'Banking', 'HR'],
  },
  {
    slug: 'contracts',
    number: '07',
    title: 'Contracts & eSign',
    headline: 'Structured inputs in. Legal-style documents out.',
    description:
      'Service agreements, contractor agreements, NDAs, consent forms, and structured legal forms — generated from intake inputs and delivered as branded PDFs. Optional extension for workflows that require approvals or signatures.',
    forWho: 'For legal teams, HR, real estate, and compliance',
    icon: 'contract',

    heroEyebrow: 'Contract & eSign Systems',
    heroH1: 'Legal-style documents, generated from structured inputs.',
    heroSubtitle:
      'Service agreements, contractor agreements, NDAs, and consent forms — built around your exact clauses and workflow. Optional extension for approvals or signatures.',
    proofBullets: [
      'Legal-style output from form or API inputs — your templates, your clauses',
      'Conditional fields and auto-calculations for contract-specific logic',
      'Optional eSign integration where approvals or signatures are required',
    ],

    howItWorksH2: 'From intake to signature-ready in one pass',
    howItWorksSub:
      'A single intake captures engagement specifics. The system composes the agreement and delivers a signature-ready PDF. Async approval routing is an optional add-on.',
    howItWorks: [
      {
        icon: 'file-text',
        title: 'Capture the specifics',
        description:
          'Structured intake collects scope, fees, deliverables, milestones, jurisdiction, and conditional clauses.',
        detail: 'One entry, not ten copy-pastes.',
      },
      {
        icon: 'workflow',
        title: 'Compose the document',
        description:
          'The system merges inputs into your clause library. Conditional clauses appear only when their conditions are met.',
        detail: 'Consistent by construction.',
      },
      {
        icon: 'send',
        title: 'Deliver signature-ready',
        description:
          'Output ships as a branded PDF. Optional routing to your eSign platform handles asynchronous approvals.',
        detail: 'Your signature platform, not ours.',
      },
    ],

    featuresH2: 'Built around your clauses, not a template market',
    featuresSub:
      'Your contract template, your variable fields, your conditional logic. The system encodes the engagement so legal review validates the inputs, not every clause.',
    heroFeatures: [
      {
        icon: 'layers',
        title: 'Clause-level control.',
        description:
          'Your clause library lives as structured templates. Every generated document is consistent with your legal review — no drag-and-drop template compromise.',
      },
      {
        icon: 'sliders',
        title: 'Workflow-aware generation.',
        description:
          'Input from a form, a spreadsheet, or an API event. The system fills the template, applies conditional logic, and logs the record — end to end.',
      },
    ],
    supportingFeatures: [
      {
        icon: 'pen-tool',
        title: 'eSign integration (optional)',
        description:
          'Optional extension for workflows that require approvals or signatures. When your use case needs signature collection, we integrate with your preferred eSign platform.',
      },
      {
        icon: 'shield-check',
        title: 'Audit-ready output',
        description:
          'Every generation logs with a timestamp and input fingerprint. Compliance review gets a clean trail without extra bookkeeping.',
      },
      {
        icon: 'git-merge',
        title: 'Conditional clauses',
        description:
          'Clauses appear only when their conditions are met — jurisdiction, scope, engagement tier. No dead text, no manual toggles per draft.',
      },
      {
        icon: 'database',
        title: 'Source-of-truth intake',
        description:
          'The intake record is the single source the document is composed from. Amendments update the inputs; the document regenerates cleanly.',
      },
    ],

    useCasesH2: 'Built for real engagements',
    useCasesSub:
      'Every engagement with structured inputs and a specific document pattern — agencies, HR departments, legal teams, consent flows.',
    useCases: [
      {
        tag: 'Agency',
        title: 'Service agreements from structured briefs',
        description:
          'Intake captures scope, fees, milestones, and conditional clauses; the system composes a signature-ready service agreement.',
        stat: 'Half-day drafts in minutes',
      },
      {
        tag: 'HR',
        title: 'Contractor agreements with role-specific clauses',
        description:
          'Role-keyed clause libraries produce consistent contractor agreements — jurisdiction-aware, schedule-aware, approval-aware.',
        stat: 'Consistent by construction',
      },
      {
        tag: 'Healthcare',
        title: 'Structured consent forms',
        description:
          'Patient-specific consent forms composed from structured intake. Conditional disclosures appear only where required.',
        stat: 'Every form, every visit',
      },
    ],

    ctaH2: 'Your clauses, your workflow, our system.',
    ctaSub:
      'Tell us about the document — scope, clauses, approval flow. We build the system around it.',
    ctaMicro: 'Most engagements start with a 30-minute scope call.',

    capabilities: [
      {
        label: 'Clause-level control',
        description: 'Your clause library, structured and conditional.',
        highlight: true,
      },
      {
        label: 'Conditional logic',
        description: 'Clauses appear only when their conditions are met.',
      },
      {
        label: 'Audit-ready output',
        description: 'Every generation timestamped with input fingerprint.',
      },
      {
        label: 'eSign integration (optional)',
        description: 'Route to your preferred signature platform when approvals are required.',
      },
    ],
    examples: [
      'Service agreements',
      'Contractor agreements',
      'NDAs',
      'Consent forms',
      'Disclosure forms',
      'Compliance attestations',
    ],
    industries: ['Legal', 'HR', 'Real estate', 'Healthcare consent', 'Compliance'],
  },
];

/** Record for O(1) lookup by slug */
export const solutionsBySlug: Record<SolutionSlug, Solution> = Object.fromEntries(
  solutions.map((s) => [s.slug, s])
) as Record<SolutionSlug, Solution>;

/** Safe lookup with descriptive error. Param type is SolutionSlug — compile-time guard (WR-02). */
export function getSolutionBySlug(slug: SolutionSlug): Solution {
  const solution = solutionsBySlug[slug];
  if (!solution) {
    throw new Error(
      `[solutions] No solution found for slug "${slug}". ` +
      `Valid slugs: ${solutions.map((s) => s.slug).join(', ')}`
    );
  }
  return solution;
}
