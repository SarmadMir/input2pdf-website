import { DemoConfig } from '@/types/demo';

/**
 * Landing page demo config — migrated from Input2PDFSolution/Demo/certificate.php
 *
 * Original PHP coordinates (FPDI, Y=0 at top):
 *   Name: SetXY(0, pageHeight/2 - 40), font 140, color (236,28,71), center-aligned
 *   Date: SetXY(130, pageHeight - 170), font 90, color (0,0,0)
 *
 * pdf-lib uses Y=0 at bottom, so: pdfLibY = pageHeight - fpdiY
 * Template page height needs to be measured after optimization.
 * Using estimated values — will calibrate once template is loaded.
 */
export const landingDemo: DemoConfig = {
  slug: 'certificate-demo',
  title: 'Certificate Generator Demo',
  description:
    'Try our interactive demo — enter a name and watch a professional certificate generate instantly.',
  templatePdf: '/templates/certificate-demo.pdf',
  templatePageIndex: 0,
  formFields: [
    {
      name: 'fname',
      label: 'Recipient Name',
      type: 'text',
      placeholder: 'Try typing your name...',
      maxLength: 25,
      required: true,
    },
  ],
  textOverlays: [
    {
      fieldName: 'fname',
      // Centered horizontally, vertically centered on page
      // These values will be calibrated once we measure the actual template
      x: 0,
      y: 0, // Will be calculated as: pageHeight/2 + 40 (pdf-lib bottom-origin)
      fontSize: 185,
      color: { r: 200 / 255, g: 75 / 255, b: 100 / 255 },
      font: '/fonts/Pacifico-Regular.ttf',
      alignment: 'center',
    },
    {
      fieldName: '__auto_date',
      x: 460,
      y: 510, // Will be: 170 points from bottom
      fontSize: 70,
      color: { r: 0, g: 0, b: 0 },
      font: 'Helvetica',
      alignment: 'left',
    },
  ],
};
