# Google Search Console Setup

This site is configured to use the canonical domain:

- `https://coastwideexteriors.com.au/`

The homepage should resolve at `/`, and `/index.html` should redirect to `/` after deployment.

## 1. Property To Add

Use a **Domain property** in Google Search Console:

- `coastwideexteriors.com.au`

This covers:

- `https://coastwideexteriors.com.au/`
- `https://www.coastwideexteriors.com.au/`
- any future subdomains

## 2. DNS Verification Record

In Search Console, choose the domain property and Google will give you a TXT record to add.

It will look like:

```txt
Type: TXT
Host/Name: @
Value: google-site-verification=YOUR_TOKEN_FROM_SEARCH_CONSOLE
TTL: 3600
```

## 3. Sitemap To Submit

Submit this sitemap in Search Console:

- `https://coastwideexteriors.com.au/sitemap.xml`

## 4. URLs To Inspect And Request Indexing

Inspect these URLs after the site is deployed on the canonical domain:  

1. `https://coastwideexteriors.com.au/`
2. `https://coastwideexteriors.com.au/about.html`
3. `https://coastwideexteriors.com.au/services.html`
4. `https://coastwideexteriors.com.au/gallery.html`
5. `https://coastwideexteriors.com.au/contact.html`

Inspect these URLs as validation checks:

1. `https://coastwideexteriors.com.au/index.html`
   Expected result: redirects to `https://coastwideexteriors.com.au/`
2. `https://www.coastwideexteriors.com.au/`
   Expected result: redirects to `https://coastwideexteriors.com.au/`
3. `https://coastwideexteriors.com.au/robots.txt`
4. `https://coastwideexteriors.com.au/sitemap.xml`
5. `https://coastwideexteriors.com.au/images/og-image.jpg`
6. `https://coastwideexteriors.com.au/images/favicon-32x32.png`

## 5. Search Console Checklist

1. Add the `Domain property`.
2. Add the TXT record in DNS.
3. Wait for DNS to propagate.
4. Click `Verify` in Search Console.
5. Submit `https://coastwideexteriors.com.au/sitemap.xml`.
6. Run URL Inspection on the homepage.
7. Request indexing for the homepage.
8. Request indexing for the other core pages.

## 6. Important Note About Schema

Google Search Console does **not** have a place where you upload schema manually.

Schema lives in the website HTML as JSON-LD and is picked up by Google when the page is crawled.

Use Search Console and the Rich Results Test to validate what is already on the site after deployment.

## 7. Current Schema On The Site

The site already includes `LocalBusiness` JSON-LD on each page.

Core entity ID:

- `https://coastwideexteriors.com.au/#business`

## 8. Recommended Fill-In Schema Templates

Use these when you are ready to add more complete business details.

### LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://coastwideexteriors.com.au/#business",
  "name": "Coastwide Exterior Cleaning",
  "url": "https://coastwideexteriors.com.au",
  "telephone": "+61486222093",
  "email": "coastwideext@gmail.com",
  "logo": "https://coastwideexteriors.com.au/images/logo.png",
  "image": "https://coastwideexteriors.com.au/images/og-image.jpg",
  "priceRange": "$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "FILL_THIS_IN",
    "addressRegion": "QLD",
    "postalCode": "FILL_THIS_IN",
    "addressCountry": "AU"
  },
  "areaServed": [
    { "@type": "Place", "name": "Wide Bay" },
    { "@type": "Place", "name": "Cooloola Coast" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/people/Coastwide-exterior-cleaning/61587450993307/"
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://coastwideexteriors.com.au/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://coastwideexteriors.com.au/services.html"
    }
  ]
}
```

### Service

Use this on dedicated service pages once they exist.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Driveway Pressure Cleaning",
  "serviceType": "Pressure Cleaning",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://coastwideexteriors.com.au/#business"
  },
  "areaServed": [
    { "@type": "Place", "name": "Wide Bay" },
    { "@type": "Place", "name": "Cooloola Coast" }
  ],
  "url": "https://coastwideexteriors.com.au/services/driveway-pressure-cleaning.html"
}
```

## 9. External Items Still Required

These cannot be completed only from this repository:

1. DNS for `coastwideexteriors.com.au`
2. DNS for `www.coastwideexteriors.com.au`
3. An ACM certificate in `us-east-1` covering both hostnames
4. The GitHub secret `ACM_CERTIFICATE_ARN` if CloudFront should serve the custom domains directly
