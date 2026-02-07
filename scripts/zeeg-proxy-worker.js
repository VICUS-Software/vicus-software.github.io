/**
 * Zeeg API Proxy — Cloudflare Worker
 *
 * This worker proxies requests from your static website to the Zeeg API,
 * keeping your API token secure on the server side.
 *
 * === DEPLOYMENT ===
 *
 * 1. Install Wrangler CLI:
 *      npm install -g wrangler
 *
 * 2. Create a new worker:
 *      wrangler init zeeg-proxy
 *      Copy this file to zeeg-proxy/src/index.js
 *
 * 3. Set secrets:
 *      wrangler secret put ZEEG_API_TOKEN
 *        → Paste your Zeeg API token (from Zeeg Dashboard → Settings → API Tokens)
 *
 * 4. Configure wrangler.toml:
 *      [vars]
 *      ALLOWED_ORIGIN = "https://your-website.com"
 *
 * 5. Deploy:
 *      wrangler deploy
 *
 * 6. Set PUBLIC_ZEEG_PROXY_URL in your website's environment:
 *      PUBLIC_ZEEG_PROXY_URL=https://zeeg-proxy.<your-subdomain>.workers.dev
 *
 *
 * === API ENDPOINTS (Zeeg) ===
 *
 * This proxy maps to the following Zeeg API endpoints:
 *
 *  GET /slots → GET https://zeeg.me/api/v1/scheduling-pages/{username}/{slug}/available-time-slots
 *    Query: username, event_type, date_from (YYYY-MM-DD), date_to (YYYY-MM-DD)
 *    Docs: https://zeeg.stoplight.io/docs/api/myzppoboyrqo8-get-available-time-slots-of-a-scheduling-page
 *
 *  POST /book → POST https://zeeg.me/api/v1/scheduled-events
 *    Body: { username, event_type, start_time, first_name, last_name, email, company?, notes? }
 *    Docs: https://zeeg.stoplight.io/docs/api/4byij32kyeiiz-zeeg-public-api
 *
 * NOTE: The exact Zeeg API request/response format may vary. Check the Zeeg Stoplight
 * docs (links above) and adjust the mapping in handleBook() if needed. The Stoplight
 * docs are SPA-rendered, so you must open them in a browser.
 */

const ZEEG_API_BASE = 'https://zeeg.me/api/v1';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const authHeaders = {
      'Authorization': 'Token ' + env.ZEEG_API_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'ZeegProxy/1.0 (VICUS Software; +https://vicus-software.com)',
    };

    try {
      // GET /slots — Fetch available time slots
      if (url.pathname === '/slots' && request.method === 'GET') {
        return await handleSlots(url, authHeaders, corsHeaders);
      }

      // POST /book — Create a booking
      if (url.pathname === '/book' && request.method === 'POST') {
        return await handleBook(request, authHeaders, corsHeaders);
      }

      // Health check
      if (url.pathname === '/' || url.pathname === '/health') {
        return new Response(JSON.stringify({ status: 'ok', service: 'zeeg-proxy' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (err) {
      console.error('Proxy error:', err);
      return new Response(JSON.stringify({ error: 'Internal proxy error', detail: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};


/**
 * GET /slots?username=...&event_type=...&date_from=YYYY-MM-DD&date_to=YYYY-MM-DD
 *
 * Proxies to Zeeg: GET /api/v1/scheduling-pages/{username}/{event_type}/available-time-slots
 */
async function handleSlots(url, authHeaders, corsHeaders) {
  const username = url.searchParams.get('username');
  const eventType = url.searchParams.get('event_type');
  const dateFrom = url.searchParams.get('date_from');
  const dateTo = url.searchParams.get('date_to');

  if (!username || !eventType || !dateFrom || !dateTo) {
    return new Response(JSON.stringify({
      error: 'Missing required parameters: username, event_type, date_from, date_to',
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate date format (basic)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateFrom) || !dateRegex.test(dateTo)) {
    return new Response(JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Sanitize username and event type (only allow alphanumeric, hyphens, underscores)
  const slugRegex = /^[a-zA-Z0-9_-]+$/;
  if (!slugRegex.test(username) || !slugRegex.test(eventType)) {
    return new Response(JSON.stringify({ error: 'Invalid username or event_type format.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const zeegUrl = ZEEG_API_BASE
    + '/scheduling-pages/' + encodeURIComponent(username)
    + '/' + encodeURIComponent(eventType)
    + '/available-time-slots'
    + '?date_from=' + dateFrom
    + '&date_to=' + dateTo;

  const response = await fetch(zeegUrl, { headers: authHeaders });
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}


/**
 * POST /book
 * Body: { username, event_type, start_time, first_name, last_name, email, company?, notes? }
 *
 * Proxies to Zeeg: POST /api/v1/scheduled-events
 *
 * NOTE: The exact Zeeg API body format for scheduling via a scheduling page may differ.
 * Check https://zeeg.stoplight.io/docs/api/ for the correct schema and adjust below.
 */
async function handleBook(request, authHeaders, corsHeaders) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { username, event_type, start_time, first_name, last_name, email, company, notes } = body;

  if (!start_time || !first_name || !last_name || !email) {
    return new Response(JSON.stringify({
      error: 'Missing required fields: start_time, first_name, last_name, email',
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Map to Zeeg API format
  // Adjust this payload based on the actual Zeeg API documentation
  const zeegBody = {
    event_type_slug: event_type,
    start_time: start_time,
    invitee: {
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
    answers: {},
    notes: notes || '',
    // Add additional fields as required by your Zeeg event type configuration
  };

  // If company is provided, you might pass it as a custom field or answer
  if (company) {
    zeegBody.answers.company = company;
  }

  const zeegUrl = ZEEG_API_BASE + '/scheduled-events';

  const response = await fetch(zeegUrl, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(zeegBody),
  });
  const responseBody = await response.text();

  return new Response(responseBody, {
    status: response.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
