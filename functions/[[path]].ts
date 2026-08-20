// Cloudflare Pages Functions catch-all. Every request hits the proxy.
import { proxyRequest } from "../_shared/proxy";

export const onRequest: PagesFunction = ({ request }) => proxyRequest(request);
