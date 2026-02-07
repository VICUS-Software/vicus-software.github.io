export const ZEEG_CONFIG = {
  // URL of your Zeeg API proxy (Cloudflare Worker, Vercel Function, etc.)
  // The proxy holds the ZEEG_API_TOKEN securely and forwards requests to zeeg.me/api/v1/
  apiBaseUrl: import.meta.env.PUBLIC_ZEEG_PROXY_URL || 'https://zeeg-proxy.vicus-software.workers.dev',

  // Zeeg username (visible in your scheduling page URL: zeeg.me/{username}/...)
  username: 'vicus',

  // Event type slugs (from your Zeeg dashboard scheduling pages)
  eventTypes: {
    buildings: 'buildings-demo',
    districts: 'district-demo',
  },
};
