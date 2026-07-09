# Starline Hotel — Static Website

A lightweight, SEO-friendly static website for **Starline Hotel** in Dodoma, Tanzania. Designed for deployment on **Cloudflare Pages** (free hosting, SSL, CDN).

## Pages & Sections

- **Home** — Hero, amenities, brand intro
- **Rooms** — 5 room types with indicative pricing
- **Restaurant** — Dining information
- **Conference Hall** — Business event facilities
- **Gallery** — 20-photo lightbox gallery
- **Location** — Google Maps embed, directions, contact info
- **Book Now** — WhatsApp & phone CTAs
- **Review Us on Google** — Google Maps review link

## Local Preview

```bash
# Option 1: Python
cd startline-hotel
python3 -m http.server 8080

# Option 2: npx
npx serve .
```

Open http://localhost:8080

## Deploy to Cloudflare Pages

### Via Git (recommended)

1. Push this folder to a GitHub/GitLab repo
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select your repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

Your site will be live at `https://<project-name>.pages.dev`

### Via Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy . --project-name=starlinehotel
```

### Custom Domain (starlinehotel.co.tz)

1. In Cloudflare Pages → your project → **Custom domains** → Add `starlinehotel.co.tz`
2. In Cloudflare DNS, add a CNAME record pointing to `<project-name>.pages.dev`
3. SSL is automatic

## Google Business Profile

After deployment, set the **Website** field in your GBP to:

```
https://starlinehotel.pages.dev
```

or your custom domain:

```
https://starlinehotel.co.tz
```

## SEO

- Canonical URL: `https://starline-hotel.starlinehoteltz.workers.dev/` (update in `index.html`, `sitemap.xml`, `robots.txt` when custom domain is added)
- `robots.txt` and `sitemap.xml` included for search engine crawlers
- Schema.org: Hotel, WebSite, FAQPage with TZS pricing
- Submit sitemap in [Google Search Console](https://search.google.com/search-console) after deployment

## Customization Checklist

- [ ] Replace placeholder images in `images/` with real hotel photos (see `images/README.md`)
- [ ] Update room prices when they change

## Tech Stack

- Pure HTML / CSS / JavaScript (no build step)
- Google Fonts (Cormorant Garamond + Outfit)
- Schema.org Hotel structured data for SEO
- Mobile-responsive with hamburger menu

## Contact Info (from public listings)

| Field | Value |
|-------|-------|
| Address | Biringi Avenue, near DUWASA Roundabout, Dodoma 41000, Tanzania |
| Phone | +255 764 302 888 / +255 262 321 888 |
| Email | starlinehoteltz@gmail.com |
| Check-in | 1:00 PM |
| Check-out | 11:00 AM |
