# Coastwide Exterior Cleaning — Static Website

Production-ready static website for Coastwide Exterior Cleaning, a family-run exterior cleaning business in Wide Bay / Cooloola Coast, QLD, Australia.

## Tech Stack

- HTML5, CSS3 (custom properties, Flexbox, Grid), vanilla ES6+ JavaScript
- Google Fonts (Montserrat, Open Sans)
- Formspree for contact form handling
- Deployed via GitHub Actions to AWS S3 + CloudFront

## Project Structure

```
coastwide-website/
├── .github/workflows/deploy.yml
├── src/
│   ├── index.html          # Home page
│   ├── about.html          # About Us
│   ├── services.html       # Services (11 service cards)
│   ├── gallery.html        # Before & After gallery
│   ├── contact.html        # Contact / Get a Quote form
│   ├── css/
│   │   ├── variables.css   # Design tokens
│   │   └── styles.css      # All styles
│   ├── js/
│   │   ├── main.js         # Nav toggle, smooth scroll
│   │   ├── gallery.js      # Filter & before/after slider
│   │   └── form.js         # Validation & Formspree submission
│   ├── images/             # Logo, OG image, photos
│   └── icons/              # SVG service icons
├── sitemap.xml
├── robots.txt
└── README.md
```

## Setup

1. Clone the repository
2. Replace placeholder images in `src/images/` with actual assets:
   - `logo.png` — navigation logo
   - `og-image.jpg` — Open Graph / social sharing image
   - `favicon.ico` — browser favicon
3. Replace `YOUR_FORMSPREE_ID` in `src/contact.html` with your actual Formspree endpoint
4. Update social media links in the footer (currently `#` placeholders)
5. Replace team photo placeholders in `src/about.html` once ready
6. Replace gallery placeholders in `src/gallery.html` with actual before/after images

## Deployment

The site deploys automatically on push to `main` via GitHub Actions.

### Infrastructure (Automatic)

The S3 bucket and CloudFront distribution are created automatically via CloudFormation on the first deploy. No need to create them manually — push to `main` and it handles everything.

The CloudFormation template lives at `infrastructure/cloudformation.yml`.

### Required GitHub Secrets (just 2)

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key (needs S3, CloudFront, CloudFormation permissions) |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |

The region (`ap-southeast-2`) and stack name (`coastwide-website`) are configured in the workflow file.

## Domain

Production domain (placeholder): `https://www.coastwideext.com.au`

Update canonical URLs, sitemap, and structured data once the final domain is confirmed.
