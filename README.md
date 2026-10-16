# Blinds Co. - Custom Window Blinds & Parts Website

A premium, editorial-style e-commerce website for a custom window blinds and parts manufacturing company. Built with Next.js 14, React 18, and Tailwind CSS.

## Design Philosophy

- **Editorial, warm minimalist architectural style**
- **Background**: Stone/slate tones (`bg-stone-50`)
- **Typography**: Playfair Display (serif headers) + Inter (sans-serif body)
- **Responsive**: Mobile-first with generous padding (`p-8 md:p-16`)
- **Grid System**: 1 col mobile → 2 col tablet → 3-4 col desktop

## Project Structure

```
blinds-co/
├── app/
│   ├── globals.css          # Global styles, CSS variables, animations
│   ├── layout.tsx           # Root layout with fonts & metadata
│   └── page.tsx             # Home page (composes all sections)
├── components/
│   ├── Header.tsx           # Navigation bar with cart & mobile menu
│   ├── Hero.tsx             # Hero section with CTA & background image
│   ├── Showroom.tsx         # 6-category blinds grid with hover zoom
│   ├── PartsStore.tsx       # 12-part store with filters, qty, cart
│   ├── Footer.tsx           # Full footer with links, social, features
│   └── ConsultationModal.tsx # Booking modal with validation
├── public/                  # Static assets
├── tailwind.config.ts       # Custom theme (colors, fonts, spacing)
├── postcss.config.js        # PostCSS config
├── tsconfig.json            # TypeScript config
├── next.config.js           # Next.js config
└── package.json
```

## Key Features

### Header
- Fixed, scrolled state with backdrop blur
- Shopping cart icon with count badge
- Responsive mobile menu (hamburger → drawer)
- Smooth scroll navigation

### Hero Section
- Full-screen background image with gradient overlay
- Editorial typography with tracking-tight
- Three trust indicators (consultation, installation, warranty)
- Dual CTA buttons (primary + ghost)
- Floating price card

### Custom Blinds Showroom
- 6 categories: Roller, Venetian, Motorized, Roman, Cellular, Vertical
- Hover zoom micro-interaction (scale-110)
- Feature badges reveal on hover
- Starting price per window
- Staggered entrance animations

### Parts Store
- 12 professional-grade components
- Category filter tabs (All, Bottom Plates, Bead Chains, Materials, Hardware)
- Quantity selector with +/- buttons
- Add to cart with loading/confirmation states
- Stock status badges
- Specs chips per product
- Responsive grid: 1→2→3→4 columns

### Consultation Modal
- Full validation (name, email, phone, address, project type)
- Project type dropdown with 6 options
- Preferred date picker (min today)
- Contact method radio group
- Success state with auto-close
- Accessible (ARIA labels, focus management)

### Footer
- 4-link columns (Company, Support, Shop, Legal)
- Brand section with social icons (IG, Pinterest, Houzz)
- Feature bar (shipping, warranty, support, installation)
- Contact info with icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## Customization

### Colors
Edit `tailwind.config.ts` → `theme.extend.colors.stone` for the warm stone palette.

### Fonts
Change font imports in `app/layout.tsx` and CSS variables in `app/globals.css`.

### Content
- Categories: Edit `components/Showroom.tsx` → `categories` array
- Parts: Edit `components/PartsStore.tsx` → `parts` array
- Footer links: Edit `components/Footer.tsx` → `footerLinks` object

### Images
Replace Unsplash URLs with your own product photography. Configure domains in `next.config.js`.

## Accessibility

- Semantic HTML5 elements
- ARIA labels & roles
- Focus-visible outlines
- Reduced motion support
- Color contrast compliance
- Keyboard navigation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

## License

Private - Blinds Co. 2024