# Image Checklist

Current state of every image asset shipped with the site, with measured
dimensions and the action each one still needs. Dimensions below were read
from the actual PNG headers on 2026-09-12.

Legend: ✅ ok · ⚠️ works but needs attention · ❌ missing/action required

## Favicons

| File | Format | Size | Used as | Status |
| --- | --- | --- | --- | --- |
| `public/favicon.ico` | ICO | 15 KB | classic favicon | ⚠️ Ship and reference it (`<link rel="icon" href="/favicon.ico">`). Not wired in `src/index.html` yet. |
| `public/favicon.png` | PNG | 1024×1024 — 206 KB | site favicon (`src/index.html`) | ⚠️ Way oversized for a favicon. Replace with a real 64×64 (or 48×48) PNG to cut the 206 KB download. |

> Recommend: add `apple-touch-icon` 180×180 PNG and reference both icons.

## Profile

| File | Format | Size | Used as | Status |
| --- | --- | --- | --- | --- |
| `public/images/profile/portrait.png` | PNG | 400×400 — 66 KB | Hero profile card photo (rendered 400×400, `loading="eager"` — LCP asset) | ✅ A square 400×400 is exactly what the card needs. Could swap to WebP/AVIF for a smaller LCP payload, optional. |
| `public/images/profile/og.png` | PNG | 1424×752 — 852 KB | — | ❌ Orphan. Not referenced anywhere in code. Delete or repurpose. |

## Social / SEO

| File | Format | Size | Used as | Status |
| --- | --- | --- | --- | --- |
| `public/images/seo/og-default.png` | PNG | 1424×752 — 365 KB | Site-wide OG/Twitter fallback (`SITE.defaultOgImage`) | ⚠️ Generic placeholder. Replace with a branded 1200×630 OG image before sharing the site. |

## Blog

All four articles reuse what is effectively a single placeholder (identical
1424×752, 365 KB files).

| File | Format | Size | Used as | Status |
| --- | --- | --- | --- | --- |
| `blog/algorithm-complexity/og.png` | PNG | 1424×752 — 365 KB | Article OG image | ❌ Placeholder. Produce a per-article OG image (1200×630 ideally). |
| `blog/docker-explained/og.png` | PNG | 1424×752 — 365 KB | Article OG image | ❌ Placeholder — same as above. |
| `blog/git-and-github/og.png` | PNG | 1424×752 — 365 KB | Article OG image | ❌ Placeholder — same as above. |
| `blog/git-workflow/og.png` | PNG | 1424×752 — 365 KB | Article OG image | ❌ Placeholder — same as above. |

## Projects

Every project ships a `hero.png` (media / card / case-study hero, always
rendered inside a 16:10 crop) and an identical `og.png` (same placeholder
852 KB file every time).

| Project | `hero.png` | `og.png` | hero status |
| --- | --- | --- | --- |
| `ai-surveillance` | 721×444 — 13 KB | ⚠️ placeholder 852 KB | ✅ ~16:10, light file |
| `carpool-optimization` | 666×342 — 48 KB | ⚠️ placeholder 852 KB | ✅ close to 16:10 |
| `e-banking` | 1039×959 — 94 KB | ⚠️ placeholder 852 KB | ⚠️ ~1.08:1 — crops heavily in 16:10. Re-crop to 1200×750. |
| `marocsphere` | 1513×843 — 1.9 MB | ⚠️ placeholder 852 KB | ⚠️ 1.79:1 and very heavy. Optimize to WebP/AVIF ≤ ~300 KB. |
| `recommendation-system` | 628×349 — 76 KB | ⚠️ placeholder 852 KB | ✅ ~16:10 |
| `syndic` | 1429×631 — 767 KB | ⚠️ placeholder 852 KB | ⚠️ 2.27:1 — crops heavily in 16:10. Re-crop + optimize. |
| `uca-sustainability` | 1771×871 — 2.4 MB | ⚠️ placeholder 852 KB | ⚠️ 2.03:1 and heaviest file. Re-crop + optimize. |

**Open Graph images (all projects):** replace the shared 852 KB placeholder
with a real per-project OG image at 1200×630.

## Gallery screenshots — referenced but MISSING

These media entries exist in the project data and point at files that do not
exist on disk. They 404 on load and the gallery falls back to a placeholder
frame (`media.mediaInPreparation`).

| Referenced path | Project |
| --- | --- |
| `/images/projects/marocsphere/dashboard.png` | marocsphere |
| `/images/projects/marocsphere/itinerary.png` | marocsphere |
| `/images/projects/ai-surveillance/detection.png` | ai-surveillance |
| `/images/projects/ai-surveillance/architecture.png` | ai-surveillance |

**Action:** either add these screenshots (1200×750, 16:10, PNG or better
WebP/AVIF) or remove the media entries so the case studies ship gallery-free.

## Conventions

- **OG images:** 1200×630 (2:1.05). Current 1424×752 works but is non-standard.
- **Media / hero:** 1200×750 (16:10) — the exact aspect every project media
  container uses (`aspect-[16/10]` + `object-cover`).
- **Format:** prefer WebP/AVIF for photos; keep PNG for anything with
  transparency. The code accepts any `src`.
- **Weight:** hero images above ~300 KB and OG images above ~400 KB should be
  optimized.