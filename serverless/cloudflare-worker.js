/**
 * Cloudflare Worker: Secure Telegram Contact Proxy
 * 
 * Protects Telegram BOT_TOKEN and CHAT_ID from public exposure.
 * Accepts POST requests from vokhr.is-a.dev with JSON payload { name, contact, subject, message }
 * and safely relays them to Telegram Bot API.
 * 
 * Setup in Cloudflare Dashboard:
 * 1. Create a Worker (e.g. named "vokhr-contact-api").
 * 2. Paste this code into the Worker editor.
 * 3. In Worker Settings -> Variables and Secrets, add:
 *    - BOT_TOKEN (Secret): Your Telegram Bot Token (e.g. 123456789:ABC...)
 *    - CHAT_ID (Secret or Variable): Your Telegram Chat ID (e.g. 1016044756)
 * 4. Deploy and copy the Worker URL (or bind custom domain like api.vokhr.is-a.dev).
 */

const ALLOWED_ORIGINS = [
    'https://vokhr.is-a.dev',
    'https://glebbofri.github.io',
    'http://localhost:8080',
    'http://localhost:8089',
    'http://localhost:63342',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8089',
    'http://127.0.0.1:63342'
];

function getCorsHeaders(request) {
    const origin = request.headers.get('Origin') || '';
    const isAllowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.vokhr.is-a.dev');
    const allowOrigin = isAllowed ? origin : 'https://vokhr.is-a.dev';

    return {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin'
    };
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export default {
    async fetch(request, env, ctx) {
        const corsHeaders = getCorsHeaders(request);

        // Handle CORS Preflight request
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders
            });
        }

        // Only allow POST
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ ok: false, error: 'Method Not Allowed' }), {
                status: 405,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Check environment configuration
        const BOT_TOKEN = env.BOT_TOKEN;
        const CHAT_ID = env.CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            return new Response(JSON.stringify({
                ok: false,
                error: 'Server configuration error: BOT_TOKEN or CHAT_ID is missing in Worker secrets.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Parse and validate incoming payload
        let payload;
        try {
            payload = await request.json();
        } catch (e) {
            return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON payload' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const name = (payload.name || '').trim();
        const contact = (payload.contact || '').trim();
        const subject = (payload.subject || '').trim();
        const message = (payload.message || '').trim();

        if (!name || name.length > 100) {
            return new Response(JSON.stringify({ ok: false, error: 'Имя обязательно (до 100 символов).' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        if (!contact || contact.length > 150) {
            return new Response(JSON.stringify({ ok: false, error: 'Контактные данные обязательны (до 150 символов).' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        if (!message || message.length > 3500) {
            return new Response(JSON.stringify({ ok: false, error: 'Сообщение обязательно (до 3500 символов).' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Format Telegram message
        const clientIp = request.headers.get('CF-Connecting-IP') || 'Unknown';
        const clientCountry = request.headers.get('CF-IPCountry') || '';
        const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

        const telegramText =
            `<b>[НОВОЕ СООБЩЕНИЕ С САЙТА]</b>\n` +
            `<i>vokhr.is-a.dev • ${escapeHtml(now)} МСК</i>\n\n` +
            `<b>От:</b> ${escapeHtml(name)}\n` +
            `<b>Контакт:</b> ${escapeHtml(contact)}\n` +
            `<b>Тема:</b> ${escapeHtml(subject || 'Без темы')}\n\n` +
            `<b>Сообщение:</b>\n${escapeHtml(message)}\n\n` +
            `<code>Geo: ${escapeHtml(clientCountry)} (${escapeHtml(clientIp)}) • 152-ФЗ OK</code>`;

        try {
            const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramText,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                })
            });

            const telegramResult = await telegramResponse.json();

            if (telegramResult.ok) {
                return new Response(JSON.stringify({
                    ok: true,
                    message: 'Сообщение успешно доставлено в Telegram!'
                }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } else {
                return new Response(JSON.stringify({
                    ok: false,
                    error: telegramResult.description || 'Ошибка Telegram API'
                }), {
                    status: 502,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        } catch (err) {
            return new Response(JSON.stringify({
                ok: false,
                error: 'Сетевая ошибка при обращении к Telegram API: ' + err.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};
