import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { DemoConfig, TextOverlay } from '@/types/demo';
import { ordinalDate } from './transforms';

const fontMap = {
  Helvetica: StandardFonts.Helvetica,
  'Helvetica-Bold': StandardFonts.HelveticaBold,
  Courier: StandardFonts.Courier,
  TimesRoman: StandardFonts.TimesRoman,
} as const;

export async function generatePdf(
  config: DemoConfig,
  formValues: Record<string, string>,
  templateBytes: Uint8Array
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[config.templatePageIndex];
  const { width, height } = page.getSize();

  // Embed all needed fonts
  const embeddedFonts = new Map<string, Awaited<ReturnType<typeof pdfDoc.embedFont>>>();
  for (const overlay of config.textOverlays) {
    if (!embeddedFonts.has(overlay.font)) {
      const font = await pdfDoc.embedFont(fontMap[overlay.font]);
      embeddedFonts.set(overlay.font, font);
    }
  }

  for (const overlay of config.textOverlays) {
    const text = resolveText(overlay, formValues);
    if (!text) continue;

    const font = embeddedFonts.get(overlay.font)!;
    const textWidth = font.widthOfTextAtSize(text, overlay.fontSize);

    // Calculate X position
    let x = overlay.x;
    if (overlay.alignment === 'center') {
      x = (width - textWidth) / 2;
    }

    // Calculate Y position
    // overlay.y is stored as distance from bottom (pdf-lib native)
    // If overlay.y is 0 for centered items, calculate center
    let y = overlay.y;
    if (overlay.y === 0 && overlay.alignment === 'center') {
      y = height / 2 + 40; // Matching the PHP: centerY - 40, converted to bottom-origin
    }

    page.drawText(text, {
      x,
      y,
      size: overlay.fontSize,
      font,
      color: rgb(overlay.color.r, overlay.color.g, overlay.color.b),
      maxWidth: overlay.maxWidth,
    });
  }

  return pdfDoc.save();
}

function resolveText(
  overlay: TextOverlay,
  formValues: Record<string, string>
): string {
  let value: string;

  if (overlay.fieldName === '__auto_date') {
    value = ordinalDate();
  } else {
    value = formValues[overlay.fieldName] ?? '';
  }

  if (overlay.transform === 'uppercase') {
    value = value.toUpperCase();
  } else if (overlay.transform === 'lowercase') {
    value = value.toLowerCase();
  } else if (overlay.transform === 'capitalize') {
    value = value.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return value;
}
