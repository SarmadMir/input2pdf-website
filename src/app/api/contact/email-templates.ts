import type { ContactFormData } from '@/types/contact';
import {
  PROJECT_TYPE_LABELS,
  BUDGET_RANGE_LABELS,
  TIMELINE_LABELS,
} from '@/lib/contact/schema';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderContactText(d: ContactFormData): string {
  const lines = [
    `New Input2PDF lead`,
    ``,
    `Name:           ${d.name}`,
    `Email:          ${d.email}`,
    `Project type:   ${PROJECT_TYPE_LABELS[d.projectType] ?? d.projectType}`,
    `Budget range:   ${BUDGET_RANGE_LABELS[d.budgetRange] ?? d.budgetRange}`,
    `Timeline:       ${d.timeline ? (TIMELINE_LABELS[d.timeline] ?? d.timeline) : '(not specified)'}`,
    `Tech stack:     ${d.techStack || '(not specified)'}`,
    ``,
    `--- Project details ---`,
    d.projectDetails,
    ``,
    `Reply directly to this email to respond to ${d.name}.`,
  ];
  return lines.join('\n');
}

export function renderContactHtml(d: ContactFormData): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#667;">${escapeHtml(label)}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`;

  return `<!doctype html>
<html><body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#222;max-width:620px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 16px;color:#413543;">New Input2PDF lead</h2>
  <table style="border-collapse:collapse;width:100%;background:#fafafa;border-radius:8px;">
    ${row('Name', d.name)}
    ${row('Email', d.email)}
    ${row('Project type', PROJECT_TYPE_LABELS[d.projectType] ?? d.projectType)}
    ${row('Budget', BUDGET_RANGE_LABELS[d.budgetRange] ?? d.budgetRange)}
    ${row('Timeline', d.timeline ? (TIMELINE_LABELS[d.timeline] ?? d.timeline) : '(not specified)')}
    ${row('Tech stack', d.techStack || '(not specified)')}
  </table>
  <h3 style="margin:24px 0 8px;">Project details</h3>
  <div style="white-space:pre-wrap;background:#fafafa;padding:16px;border-radius:8px;">${escapeHtml(d.projectDetails)}</div>
  <p style="margin-top:24px;color:#667;font-size:13px;">Reply directly to this email to respond to ${escapeHtml(d.name)}.</p>
</body></html>`;
}
