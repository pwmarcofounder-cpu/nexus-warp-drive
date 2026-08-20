# Rebrand proxy to NEXT STUDY

Update the reverse-proxy branding rewrites so the mirrored site shows **NEXT STUDY** branding, a new logo, and a single Telegram invite link.

## Changes

1. Update text replacement in both proxy modules (`_shared/proxy.ts` and `src/lib/proxy.server.ts`):
   - Replace `PW-MARCO` with `NEXT STUDY` (remove the existing `PW-NEXUS` replacement).
2. Update logo replacement:
   - Replace the old logo URL with `https://i.ibb.co/wNRx0G85/IMG-20260820-222244-446.jpg`.
3. Replace all Telegram links:
   - Remove the existing specific-handle replacements (`official_marco_22`, `officialmarco22`, `t.me/official_marco_22`).
   - Add regex/pattern replacements so any URL starting with `https://t.me/`, `http://t.me/`, `https://telegram.me/`, or `http://telegram.me/` becomes `https://t.me/+AoDvIVg9UPkzODI1`.
4. Keep the rest of the proxy logic unchanged (header forwarding, cookie rewriting, origin URL rewriting, binary pass-through).
5. Verify by fetching the homepage and a few routes through the local preview to confirm the new name, logo, and Telegram link appear.

## Technical details

Both proxy files must stay in sync because Cloudflare Pages / Vercel use `_shared/proxy.ts`, while the Lovable TanStack route uses `src/lib/proxy.server.ts`. The Telegram replacement will be implemented as a regex replacement applied after the simple string replacements in `rewriteText`, so it catches every `t.me/*` or `telegram.me/*` URL regardless of the specific handle.
