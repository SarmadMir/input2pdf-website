import Image from 'next/image';
import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';

export const metadata = {
  title: 'Generation Portals — Input2PDFSolution',
  description:
    'Full-scale white-labeled platforms for document generation at volume. Built for organizations at scale.',
};

function PortalPreview() {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <Image
        src="/images/solutions/portal-dashboard-mockup.png"
        alt="CertPortal admin dashboard — 142 certificates, 28 pending, 96% delivered"
        width={720}
        height={560}
        className="w-full rounded-xl"
      />
    </div>
  );
}

export default function PortalsPage() {
  const solution = solutions.find((s) => s.icon === 'portal')!;
  return <SolutionPageLayout solution={solution} preview={<PortalPreview />} />;
}
