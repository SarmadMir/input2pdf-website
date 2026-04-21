import type { FAQItem } from '@/types/faq';

/**
 * Full FAQ set — rendered on /pricing. Landing renders the condensed subset
 * via `landingFaqIds` below.
 *
 * Voice contract (see `.planning/brand-voice.md`):
 *   - Every answer is 2-4 sentences, 6 absolute max.
 *   - Zero banned phrases (CMP-04 — whole-phrase match, not substring; Plan 03-15
 *     adds the Vitest lint that enforces this).
 *   - Competitor names appear ONLY with respectful-complementary tone per the
 *     brand-voice playbook; every such entry sets the competitor-naming flag and
 *     is appended to COMPETITOR-LINES-REVIEW.md for Sarmad's CMP-06 sign-off
 *     before Wave 4 merge.
 *   - The 3 positioning baselines (ids: positioning-saas, positioning-compare-esign,
 *     positioning-when-not) are VERBATIM from `.planning/brand-voice.md` §FAQ.
 */
export const faqItems: FAQItem[] = [
  // ------- PRICING / PROCESS (7) -------
  {
    id: 'pricing-model',
    category: 'pricing',
    question: 'How do you price a project?',
    answer:
      'Per use case. We scope the work against what gets built — a single generator, a multi-input system, an admin portal, a workflow platform. Once the scope is clear, the price conversation happens in the first reply.',
  },
  {
    id: 'pricing-milestones',
    category: 'process',
    question: 'How do payments work?',
    answer:
      'Most engagements run on milestone billing — deposit, mid-project, delivery. Exact milestones are set in the proposal. Invoicing happens per milestone; the system rolls forward only after the prior milestone clears.',
  },
  {
    id: 'pricing-revisions',
    category: 'process',
    question: 'Do you include revisions?',
    answer:
      'Within-scope revisions are included. Out-of-scope changes get re-quoted honestly — we tell you up front when a request crosses the line. Scope is written into the proposal so this conversation stays short.',
  },
  {
    id: 'pricing-timeline',
    category: 'process',
    question: 'How long does a project take?',
    answer:
      'A single-template generator takes 1-2 weeks. A multi-input system 2-4 weeks. An admin portal 3-6 weeks. A full workflow platform 6-10 weeks. Enterprise platforms 10+ weeks. We commit to a range in the proposal, not a single date, unless the scope is locked.',
  },
  {
    id: 'pricing-ip-nda',
    category: 'process',
    question: 'Who owns the code and the data?',
    answer:
      'You own the delivered source code on final payment. An NDA covers the engagement where the data warrants it. We do not keep copies of your data after handover. Portfolio references are anonymized by default unless you opt in.',
  },
  {
    id: 'pricing-post-launch',
    category: 'process',
    question: 'What happens after launch?',
    answer:
      'Every engagement ends with a warranty window — typically 30 days — where we fix anything that does not match the proposal. After that, ongoing support is a separate arrangement. Most clients run the system themselves once it is handed over.',
  },
  {
    id: 'pricing-deliverables-format',
    category: 'process',
    question: 'What do I actually receive at the end?',
    answer:
      'Source code in your repository, a deployed system on your infrastructure (or ours during handoff), a handover document that covers how it runs, and a knowledge-transfer session. If the engagement includes training materials, those ship with the handoff.',
  },

  // ------- POSITIONING — 3 Sarmad-authored baselines (LOCKED verbatim from brand-voice.md) -------
  {
    id: 'positioning-saas',
    category: 'positioning',
    question: 'Are you a SaaS?',
    answer:
      'No. We design and build document systems tailored to your workflow. Some projects include reusable components or APIs, but the focus is solving your specific use case.',
  },
  {
    id: 'positioning-compare-esign',
    category: 'positioning',
    question: 'How do you compare to tools like DocuSign / PandaDoc?',
    answer:
      'Those tools are built for general use. We build around your exact workflow\u2014when off-the-shelf tools become limiting or inefficient.',
    namesCompetitor: true,
  },
  {
    id: 'positioning-when-not',
    category: 'positioning',
    question: 'When should I NOT use this?',
    answer:
      'If your needs are standard and fully covered by existing tools, you should use them. This is for cases where those tools break down or require too many workarounds.',
  },

  // ------- POSITIONING — 5 researcher drafts (pending Sarmad review per CMP-06) -------
  {
    id: 'positioning-tech-stack',
    category: 'positioning',
    question: 'What tech stacks do you work with?',
    answer:
      "Mostly Next.js, Node, Python, and PDF libraries (pdf-lib, FPDI, jsPDF). We pick what fits the project and your team's maintenance surface — not what is trendy. If your team already maintains a stack, we build on it.",
  },
  {
    id: 'positioning-code-ownership',
    category: 'positioning',
    question: 'Can we own the code?',
    answer:
      'Yes. On final payment, you own the delivered source. We keep the right to reference the project as portfolio work, scrubbed of your identifying details unless you have agreed otherwise.',
  },
  {
    id: 'positioning-one-off',
    category: 'positioning',
    question: 'What if I just need a one-off PDF, not a system?',
    answer:
      'We build systems. If you need a single PDF template and no workflow around it, you are better served by a freelancer hour or an off-the-shelf tool — tell us and we will say so.',
  },
  {
    id: 'positioning-data-confidentiality',
    category: 'positioning',
    question: 'How do you handle data confidentiality?',
    answer:
      'Every engagement starts with an NDA if the data warrants one. We do not keep copies of client data after handover. Case studies anonymize by default — we only use client names with explicit permission.',
  },
  {
    id: 'positioning-preview',
    category: 'positioning',
    question: 'Can I see something before committing?',
    answer:
      'The live demo on the home page is a working example of the pattern. If you want something closer to your specific workflow, we send a short walkthrough video with your quote — no proposal deck theatre.',
  },
];

/** Condensed subset rendered on the landing page (4-5 items).
 *  Researcher recommendation: the 3 Sarmad-authored positioning baselines + 1-2 process Q/A. */
export const landingFaqIds = [
  'positioning-saas',
  'positioning-compare-esign',
  'positioning-when-not',
  'pricing-timeline',
  'pricing-ip-nda',
] as const;
