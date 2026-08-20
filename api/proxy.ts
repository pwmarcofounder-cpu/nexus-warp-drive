// Vercel Edge Function. vercel.json rewrites all paths here.
import { proxyRequest } from "../_shared/proxy";

export const config = { runtime: "edge" };

export default function handler(request: Request) {
  return proxyRequest(request);
}
