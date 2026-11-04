import { next } from '@vercel/functions';
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'grantops_auth';
const MAX_AGE = 60 * 60 * 24 * 7;

function sessionToken(secret) {
  return createHmac('sha256', secret).update('grantops-session-v1').digest('hex');
}
function cookieValue(request) {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === COOKIE) return decodeURIComponent(rest.join('='));
  }
  return '';
}
function equal(a, b) {
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
function page(error = false) {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive,nosnippet">
<title>GrantOps · OBEFREE</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d1117;color:#f3f4f6;font:16px/1.45 Inter,system-ui,sans-serif}.card{width:min(92vw,420px);padding:32px;border:1px solid #28303d;border-radius:20px;background:#151b24;box-shadow:0 24px 70px #0008}.mark{font-weight:800;font-size:26px;margin-bottom:8px}.muted{color:#9aa4b2;margin:0 0 22px}label{display:block;font-size:13px;color:#c5cbd4;margin-bottom:7px}input{width:100%;padding:13px 14px;border:1px solid #364154;border-radius:11px;background:#0d1117;color:#fff;font:inherit;outline:none}input:focus{border-color:#7aa2ff}button{width:100%;margin-top:13px;padding:13px;border:0;border-radius:11px;background:#f3f4f6;color:#111827;font:700 15px/1 system-ui;cursor:pointer}.error{margin:13px 0 0;color:#ff9b9b;font-size:13px}.back{display:block;margin-top:20px;color:#aeb8c8;text-decoration:none;font-size:13px}
</style></head><body><main class="card"><div class="mark">GrantOps</div>
<p class="muted">Private OBEFREE workspace</p><form method="post" autocomplete="off">
<label for="password">Password</label><input id="password" name="password" type="password" required autofocus autocomplete="current-password">
<button type="submit">Open workspace</button>${error?'<p class="error">Incorrect password.</p>':''}</form>
<a class="back" href="https://obefree.com/">← obefree.com</a></main></body></html>`;
}

export const config = { runtime: 'nodejs' };

export default async function proxy(request) {
  const secret = process.env.GRANTOPS_PASSWORD;
  if (!secret) return new Response('GrantOps access is temporarily unavailable.', {
    status:503, headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'}
  });

  const token = sessionToken(secret);
  if (equal(cookieValue(request), token)) return next();

  if (request.method === 'POST') {
    let supplied = '';
    try {
      const form = await request.formData();
      supplied = String(form.get('password') || '');
    } catch {}
    if (equal(supplied, secret)) {
      const url = new URL(request.url);
      return new Response(null, {status:303, headers:{
        Location:url.pathname + url.search,
        'Set-Cookie':`${COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        'Cache-Control':'no-store',
        'X-Robots-Tag':'noindex, nofollow'
      }});
    }
    return new Response(page(true), {status:401, headers:{
      'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'
    }});
  }

  return new Response(page(false), {status:200, headers:{
    'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'
  }});
}
