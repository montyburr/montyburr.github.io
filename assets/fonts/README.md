# Fonts

Self-hosted so the site has no third-party runtime dependency and works offline.
Latin subsets only (`U+0000-00FF` + general punctuation) — 62KB total.

| File | Family | Weights | Size |
|---|---|---|---|
| `playfair-display-var-latin.woff2` | Playfair Display (variable) | 400–700 | 38KB |
| `poppins-400-latin.woff2` | Poppins | 400 | 8KB |
| `poppins-500-latin.woff2` | Poppins | 500 | 8KB |
| `poppins-600-latin.woff2` | Poppins | 600 | 8KB |

Both families are licensed under the SIL Open Font License 1.1:
<https://openfontlicense.org/>

- Playfair Display — Claus Eggers Sørensen. <https://fonts.google.com/specimen/Playfair+Display>
- Poppins — Indian Type Foundry, Jonny Pinhorn. <https://fonts.google.com/specimen/Poppins>

Retrieved from the Google Fonts CDN (`fonts.gstatic.com`) and committed unmodified.
To refresh, re-request the CSS with a modern browser User-Agent and pull the `latin`
`unicode-range` block's woff2 URL for each face.
