# Veechelz Nigeria - Website

Website for Veechelz Nigeria Limited: custom window blinds and installation. Built with Next.js 14, React 18 and Tailwind CSS.

## Run locally

    npm install
    npm run dev

Open http://localhost:3000. Run `npm run build` before opening a pull request.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in (never commit `.env.local`). Needed for the quote, consultation and brochure emails: `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, `RESEND_FROM_EMAIL`. Optional: `NEXT_PUBLIC_SITE_URL` (the live domain, used by the sitemap).

## Where things live

- `app/page.tsx` is the landing page. Do not put other pages in this file.
- `components/` holds shared sections (Header, Hero, Showroom, Footer, modals).
- `public/brochure.pdf` is the file customers download from the brochure form.
- `/promo` and `/flier` are internal marketing pages, hidden from search engines.

## Making changes

The `main` branch is protected. Work on a branch, open a pull request, check the Vercel preview link, then merge.
