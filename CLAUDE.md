@AGENTS.md

# Input2PDFSolution — Website Rebuild

## Project Overview
Website for Input2PDFSolution — a custom PDF generation service where Sarmad builds tailored input-to-PDF systems for clients. The website demonstrates the service through live interactive demos, showcases past client work, and serves as a gateway for new clients.

**Key insight**: This service is hard to explain in words — the demos ARE the explanation. Visitors try it themselves and instantly understand the value.

**Future vision**: Automate the process so clients can upload/describe their form + PDF design and get a generator system built automatically.

## Tech Stack
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: `pdf-lib` (replaces PHP/FPDI from original project)
- **Animation**: Framer Motion
- **Theme**: `next-themes`
- **Email**: Resend (contact form)
- **Hosting**: Vercel

## Architecture
```
app/
├── layout.tsx                    # Root layout with branding
├── page.tsx                      # Landing: hero, industry categories, document samples, CTA
├── solutions/
│   ├── page.tsx                  # Solutions overview by industry
│   ├── certificates/page.tsx     # Certificate generation details
│   ├── forms/page.tsx            # Forms & agreements
│   └── documents/page.tsx        # Documents & invoices
├── demo/
│   ├── page.tsx                  # Demo gallery (6-8 projects)
│   └── [slug]/page.tsx           # Individual demo (form left, PDF preview right)
├── case-studies/page.tsx         # Past client work + Fiverr testimonials
├── pricing/page.tsx              # Service tiers
├── contact/page.tsx
└── api/generate-pdf/
    └── [template]/route.ts       # Dynamic PDF generation per template
```

## Branding
- **Primary**: `#f26380` (pink/coral — matches monogram)
- **Secondary**: `#63F2D5` (teal)
- **Secondary-dark**: `#387c6f`
- **Dark**: `#413543`
- **Light-dark**: `#665d68`
- **Logos**: Located in `/Users/sarmadmir/Documents/My Data/Projects/Input2PDF v1/Logo/`
- **Monogram**: Pink coral organic blob shape

## Live Demo Projects (6-8)
Each demo: split-screen (form left, PDF preview right) with DEMO watermark on output.

| Project | Domain | Type |
|---------|--------|------|
| Golfer Certificate | Sports | Achievement Certificate |
| CPR Certificate | Healthcare | Training Certificate |
| Corp Train Global | Corporate | Training Certificate + Case Study |
| Merit Badge Courses | Education | Multi-certificate (workshop, badge, course) |
| Agent PDF | Real Estate | Agreement + Signature Pad |
| Solaris Trade Form | Finance | Internal Department Form |
| Vehicle Permit Cert | Government | Official Permit |
| Bag Tag | Retail | Custom Tag/Sticker Generator |

## PDF Migration: PHP → JavaScript
Original PHP used FPDI to: load template PDF → overlay text → output.
```
pdf-lib equivalent:
PDFDocument.load(templateBytes)  // Load template
page.drawText(name, {x, y, size, color, rotate})  // Overlay text
pdfDoc.save()  // Generate output
```

## Key Requirements
- DEMO watermark on all generated PDFs
- Multi-lingual projects include English mode
- Case study for each demo (description + requirements)
- Link to client programs where applicable
- Characterize whether end-user or internal department system

## Existing Assets
- **Old website**: `/Users/sarmadmir/Documents/My Data/Projects/Input2PDFSolution/` (Bootstrap + PHP)
- **UI mockups**: `/Users/sarmadmir/Documents/My Data/Projects/Input2PDF v1/web app UI/Screenshot_1-4.png`
- **Logos**: `/Users/sarmadmir/Documents/My Data/Projects/Input2PDF v1/Logo/`
- **Project notes**: `/Users/sarmadmir/Documents/My Data/Projects/FPDF Projects.md`
- **Portfolio draft**: `/Users/sarmadmir/Documents/My Data/Projects/Portfolio.md`
- **Client links**: berardinonardella.it, accademiaholisticaavanzata.it, jpcannassociates.com, meritbadgecourses.com, solariscapitalinc.com
- **GitHub repo**: https://github.com/SarmadMir/Input2PDFSolution.git (existing, on development branch)

## Commands
```bash
npm run dev      # Start dev server (port 3001)
npm run build    # Production build
npm run lint     # Run ESLint
```
