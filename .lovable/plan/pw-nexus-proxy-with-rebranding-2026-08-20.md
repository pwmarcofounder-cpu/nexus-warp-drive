# PW-NEXUS Proxy with Rebranding

A full reverse proxy of https://pwnexus.pages.dev served from this app, rewriting branding on the fly.

## What it does

- Every path (`/`, `/auth`, `/study`, `/_next/...`, API calls) is fetched from the origin site and returned to the visitor.
- Login works: cookies, headers, POST/PUT/DELETE bodies and redirects are forwarded both ways.
- Text responses (HTML, JS, CSS, JSON) get these exact replacements applied:
  - `PW-MARCO` -> `PW-NEXUS`
  - `https://i.ibb.co/YBbwNGxz/Logo-pw-removebg-preview.png` -> `https://i.ibb.co/3ykY8VZY/photo-6066420858273600154-x.jpg`
  - `https://t.me/official_marco_22` -> `https://t.me/PWNexuss`
- Images, fonts and other binary assets are streamed through untouched.

## Technical approach

- Add a catch-all server route `src/routes/$.tsx` (server handlers for GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS) that proxies to the origin.
- Proxy logic in a `*.server.ts` helper:
  - Build target URL: origin + incoming path + query.
  - Forward request headers minus `host`, `accept-encoding` (so we get plain text back), and hop-by-hop headers; set `host`/`origin`/`referer` to the origin domain.
  - Forward the raw request body for non-GET methods.
  - `redirect: "manual"`; rewrite `Location` headers that point at the origin domain back to the proxy host.
  - Rewrite `Set-Cookie`: strip the `Domain=` attribute so cookies bind to the proxy host (keeps login sessions working).
  - Strip `content-encoding`, `content-length`, `content-security-policy`, `x-frame-options` from the response.
  - If `content-type` is text/HTML/JS/CSS/JSON: read as text, apply the three replacements, plus rewrite absolute `https://pwnexus.pages.dev` URLs to relative ones. Otherwise stream the body as-is.
- Keep the origin URL and the replacement map in one constants file so it is easy to extend later.
- `src/routes/index.tsx` is replaced by the catch-all handling `/` too (an index server route that delegates to the same proxy handler).

## Notes and limits

- The origin is a Next.js app; if it ever pins its own domain (CORS/host checks) some API calls could fail — I will test login and the study page through the proxy after building and adjust header handling if needed.
- Only the exact strings above are replaced, as requested; other MARCO spellings stay untouched.
