import type { ReactNode } from 'react';

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
  icon: 'certificate' | 'ecard' | 'form' | 'portal';
  badge?: string;
  capabilities: Capability[];
  examples: string[];
}

export const solutions: Solution[] = [
  {
    number: '01',
    title: 'Certificates',
    headline: 'Professional certificates, generated and delivered instantly',
    description:
      'Achievement, training, course completion, and professional certifications — generated from user input and delivered without lifting a finger.',
    forWho: 'For course platforms, training providers, and schools',
    icon: 'certificate',
    badge: 'Most Popular',
    capabilities: [
      {
        label: 'Auto-Emailed',
        description: 'Delivered directly to each recipient\u2019s inbox',
        highlight: true,
      },
      {
        label: 'Custom Templates',
        description: 'Built to match your exact certificate design',
      },
      {
        label: 'Multi-Certificate Systems',
        description: 'Multiple certificate types from one platform',
      },
      {
        label: 'Branded Design',
        description: 'Your logo, colors, and styling throughout',
      },
    ],
    examples: [
      'Course completions',
      'Training certifications',
      'Achievement awards',
      'Professional credentials',
    ],
  },
  {
    number: '02',
    title: 'eCards & Invitations',
    headline: 'Digital cards branded to your design, generated at scale',
    description:
      'Digital cards for events, courses, programs, and special occasions — personalized to each recipient and branded to your design.',
    forWho: 'For event organizers and program coordinators',
    icon: 'ecard',
    capabilities: [
      {
        label: 'Branded Design',
        description: 'Every card matches your event\u2019s look and feel',
      },
      {
        label: 'Bulk Generation',
        description: 'Hundreds of personalized cards in seconds',
      },
      {
        label: 'Event Templates',
        description: 'Purpose-built layouts for every occasion',
      },
      {
        label: 'Digital Distribution',
        description: 'Ready to send via email or download',
        highlight: true,
      },
    ],
    examples: [
      'Course invitations',
      'Event announcements',
      'Program enrollment cards',
      'Special occasion cards',
    ],
  },
  {
    number: '03',
    title: 'Forms & Agreements',
    headline: 'Structured business documents with signature support',
    description:
      'Trade forms, questionnaires, contracts, and business documents — structured, professional, and ready for signatures.',
    forWho: 'For legal teams, HR, and finance departments',
    icon: 'form',
    capabilities: [
      {
        label: 'Signature Pad',
        description: 'Built-in digital signature capture',
        highlight: true,
      },
      {
        label: 'Multi-Language',
        description: 'Arabic, Italian, and more \u2014 RTL supported',
      },
      {
        label: 'Department Workflows',
        description: 'Route documents through approval chains',
      },
      {
        label: 'Secure Output',
        description: 'Professionally formatted, tamper-evident PDFs',
      },
    ],
    examples: [
      'Trade forms',
      'Contracts',
      'Questionnaires',
      'Department documents',
    ],
  },
  {
    number: '04',
    title: 'Generation Portals',
    headline: 'Full-scale platforms for document generation at volume',
    description:
      'Complete generation platforms for schools and organizations — white-labeled, managed, and built for scale.',
    forWho: 'For organizations generating at scale',
    icon: 'portal',
    badge: 'Enterprise',
    capabilities: [
      {
        label: 'White-Labeled',
        description: 'Your brand, your portal, your domain',
        highlight: true,
      },
      {
        label: 'Volume Generation',
        description: 'Thousands of documents, zero manual effort',
      },
      {
        label: 'Admin Dashboard',
        description: 'Track generation, manage templates, control access',
      },
      {
        label: 'Multi-Template',
        description: 'Certificates, badges, and documents from one portal',
      },
    ],
    examples: [
      'School certificate portals',
      'HR onboarding systems',
      'Multi-department platforms',
      'Client-facing generators',
    ],
  },
];
