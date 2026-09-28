// Custom Mouse Pointer Position Tracker
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    const glow = document.getElementById('glow-follow');
    if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    if (glow) {
        glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    }
});

function updateDynamicAge() {
    // 13 декабря 2006 года (месяцы в JS нумеруются с 0, поэтому 11 = декабрь)
    const birthDate = new Date(2006, 11, 13);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    function getDeclension(n) {
        const lastDigit = n % 10;
        const lastTwoDigits = n % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'лет';
        if (lastDigit === 1) return 'год';
        if (lastDigit >= 2 && lastDigit <= 4) return 'года';
        return 'лет';
    }

    const fullAgeText = `${age} ${getDeclension(age)}`;

    document.querySelectorAll('.user-age-text').forEach(el => {
        el.textContent = fullAgeText;
    });

    document.querySelectorAll('.user-age-num').forEach(el => {
        el.textContent = age;
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDynamicAge);
} else {
    updateDynamicAge();
}

// Tab Switching Logic (Home, About, Octavia, Portfolio, Contact)
function switchTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));

    // Show selected tab
    const activeTab = document.getElementById('tab-' + tabId);
    if (activeTab) {
        activeTab.classList.remove('hidden');
    }

    // Update Desktop Nav Button States
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.className = "nav-btn px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5";
    });

    const activeBtn = document.getElementById('nav-' + tabId);
    if (activeBtn) {
        activeBtn.className = "nav-btn px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 bg-gold-500 text-black shadow-md shadow-gold-500/20";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Photo Click Functionality (Triggers navigation to "About Me")
function openProfileCardDetail() {
    switchTab('about');
}

// Headlight Toggle Feature for Octavia A7
let headlightsOn = false;
function toggleHeadlights() {
    headlightsOn = !headlightsOn;
    const container = document.getElementById('car-svg-container');
    const statusText = document.getElementById('headlight-status-text');

    if (headlightsOn) {
        container.classList.add('headlight-on');
        statusText.innerText = "Фары: ВКЛ";
        statusText.classList.add('text-cyan-400');
    } else {
        container.classList.remove('headlight-on');
        statusText.innerText = "Фары: ВЫКЛ";
        statusText.classList.remove('text-cyan-400');
    }
}

// Web Audio Engine Synthesizer for 1.6 MPI Skoda Octavia Rev Sound
function playEngineSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();

        // Oscillator for low engine rumble
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';

        // Frequency sweep simulating engine rev (CWVA 1.6 MPI Idle -> Rev -> Idle)
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(70, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.6);
        osc.frequency.exponentialRampToValueAtTime(75, now + 1.4);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.5);

        // Temporarily increase RPM Telemetry Bar Visual
        const rpmVal = document.getElementById('rpm-value');
        const rpmBar = document.getElementById('rpm-bar');
        if (rpmVal && rpmBar) {
            rpmVal.innerText = "3400 RPM";
            rpmBar.style.width = "65%";
            setTimeout(() => {
                rpmVal.innerText = "780 RPM";
                rpmBar.style.width = "15%";
            }, 1200);
        }
    } catch (e) {
        console.log("Audio play error", e);
    }
}

// ECU Scan Simulator Logic
function runECUScan() {
    const output = document.getElementById('ecu-scan-output');
    output.innerHTML = "";
    const logs = [
        "> Подключение к разъему OBD-II (CAN-High 500kbps)...",
        "> Адрес 01: ЭБУ Двигателя (Bosch ME17.5.26 CWVA) - OK",
        "> Адрес 02: АКПП (Aisin 09G 6-speed) - OK",
        "> Адрес 03: Блок ABS/ESP (MK100) - OK",
        "> Сканирование ошибок DTC: 0 Faults Found.",
        "> Проверка параметров VAG: Давление масла OK, Лямбда 1.00",
        "> СТАТУС: Все системы Octavia A7 функционируют идеально!"
    ];

    logs.forEach((log, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = index === logs.length - 1 ? "text-emerald-400 font-bold" : "text-cyan-300";
            line.innerText = log;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }, index * 400);
    });
}

// Portfolio Filter Handler
function filterPortfolio(category, evt) {
    const cards = document.querySelectorAll('.port-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    const filterBtns = document.querySelectorAll('.port-filter-btn');
    filterBtns.forEach(btn => {
        btn.className = "port-filter-btn px-4 py-2 rounded-xl text-xs font-mono bg-white/5 text-slate-300 hover:bg-white/10";
    });

    const target = evt ? evt.target : (window.event ? window.event.target : null);
    if (target) {
        target.className = "port-filter-btn px-4 py-2 rounded-xl text-xs font-mono bg-gold-500 text-black font-bold";
    }
}

// Code Structure Modal Control
function toggleCodeModal() {
    const modal = document.getElementById('code-modal');
    modal.classList.toggle('hidden');
}

function switchCodeTab(fileType) {
    document.getElementById('code-display-html').classList.add('hidden');
    document.getElementById('code-display-css').classList.add('hidden');
    document.getElementById('code-display-js').classList.add('hidden');

    document.getElementById('code-tab-html').className = "px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5";
    document.getElementById('code-tab-css').className = "px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5";
    document.getElementById('code-tab-js').className = "px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5";

    document.getElementById('code-display-' + fileType).classList.remove('hidden');
    document.getElementById('code-tab-' + fileType).className = "px-3 py-1.5 rounded-lg text-xs font-mono bg-gold-500 text-black font-bold";
}
async function handleContactSubmit(event) {
    event.preventDefault();

    // ⚠️ Замени на свои токен бота и chat_id
    const BOT_TOKEN = '8825903840:AAGCI-QnaEih51YERaXq5LgxeFbWqftL6rU';
    const CHAT_ID = '1016044756';

    const btn = document.getElementById('contact-submit-btn');
    const btnText = document.getElementById('btn-text');

    const name = document.getElementById('contact-name').value.trim();
    const contact = document.getElementById('contact-contact').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Форматированное сообщение в HTML для Telegram
    const text = `📬 <b>Новое сообщение с сайта!</b>\n\n` +
        `👤 <b>Имя:</b> ${escapeHtml(name)}\n` +
        `💬 <b>Контакт:</b> ${escapeHtml(contact)}\n` +
        `📌 <b>Тема:</b> ${escapeHtml(subject)}\n\n` +
        `📝 <b>Сообщение:</b>\n${escapeHtml(message)}`;

    // Индикация загрузки
    btn.disabled = true;
    btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Отправка...';

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (data.ok) {
            btnText.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Отправлено!';
            document.getElementById('contact-form').reset();

            setTimeout(() => {
                btnText.innerHTML = 'Отправить <i class="fa-solid fa-paper-plane ml-2"></i>';
                btn.disabled = false;
            }, 3000);
        } else {
            throw new Error(data.description || 'Ошибка Telegram API');
        }
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        btnText.innerHTML = '<i class="fa-solid fa-xmark mr-2"></i>Ошибка!';

        setTimeout(() => {
            btnText.innerHTML = 'Отправить <i class="fa-solid fa-paper-plane ml-2"></i>';
            btn.disabled = false;
        }, 3000);
    }
}

// Вспомогательная функция для безопасного экранирования спецсимволов HTML
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
// Custom Toast Notification
function handleContactSubmit(e) {
    e.preventDefault();
    const toast = document.createElement('div');
    toast.className = "fixed bottom-8 right-8 z-50 glass-card-gold px-6 py-4 rounded-2xl text-gold-400 font-mono text-xs flex items-center gap-3 shadow-2xl animate-bounce";
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-lg"></i> Сообщение успешно отправлено Глебу!`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);

    e.target.reset();
}