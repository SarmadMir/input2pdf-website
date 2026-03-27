import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { DemoConfig, TextOverlay } from '@/types/demo';
import { ordinalDate } from './transforms';

const standardFontMap: Record<string, string> = {
  Helvetica: StandardFonts.Helvetica,
  'Helvetica-Bold': StandardFonts.HelveticaBold,
  Courier: StandardFonts.Courier,
  TimesRoman: StandardFonts.TimesRoman,
};

// Cache custom font bytes so we only fetch once
const customFontCache = new Map<string, Uint8Array>();

async function loadCustomFont(url: string): Promise<Uint8Array> {
  const cached = customFontCache.get(url);
  if (cached) return cached;

  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  customFontCache.set(url, bytes);
  return bytes;
}

export async function generatePdf(
  config: DemoConfig,
  formValues: Record<string, string>,
  templateBytes: Uint8Array
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);
  const page = pdfDoc.getPages()[config.templatePageIndex];
  const { width, height } = page.getSize();

  // Embed all needed fonts (standard or custom)
  const embeddedFonts = new Map<string, Awaited<ReturnType<typeof pdfDoc.embedFont>>>();
  for (const overlay of config.textOverlays) {
    if (!embeddedFonts.has(overlay.font)) {
      if (overlay.font in standardFontMap) {
        const font = await pdfDoc.embedFont(standardFontMap[overlay.font]);
        embeddedFonts.set(overlay.font, font);
      } else {
        // Custom font: font value is a URL path like "/fonts/Pacifico-Regular.ttf"
        const fontBytes = await loadCustomFont(overlay.font);
        const font = await pdfDoc.embedFont(fontBytes);
        embeddedFonts.set(overlay.font, font);
      }
    }
  }

  for (const overlay of config.textOverlays) {
    const text = resolveText(overlay, formValues);
    if (!text) continue;

    const font = embeddedFonts.get(overlay.font)!;

    // Auto-scale font size to fit within page margins
    const margin = width * 0.12;
    const maxTextWidth = width - margin * 2;
    let fontSize = overlay.fontSize;
    let textWidth = font.widthOfTextAtSize(text, fontSize);
    while (textWidth > maxTextWidth && fontSize > 10) {
      fontSize = Math.floor(fontSize * 0.9);
      textWidth = font.widthOfTextAtSize(text, fontSize);
    }

    // Calculate X position — always center relative to page
    let x = overlay.x;
    if (overlay.alignment === 'center') {
      x = (width - textWidth) / 2;
      // Ensure text doesn't start before left margin
      if (x < margin) x = margin;
    }

    // Calculate Y position
    // overlay.y is stored as distance from bottom (pdf-lib native)
    // If overlay.y is 0 for centered items, calculate center
    let y = overlay.y;
    if (overlay.y === 0 && overlay.alignment === 'center') {
      y = height / 2 + 40;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
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
