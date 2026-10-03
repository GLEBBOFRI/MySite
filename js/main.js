// Ambient Glow Follower for Desktop
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        const glow = document.getElementById('glow-follow');
        if (glow) {
            glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
        }
    }, { passive: true });
}

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

// Mobile Menu Drawer Control
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-drawer');
    const burgerIcon = document.getElementById('burger-icon');
    if (!menu) return;

    const isOpen = !menu.classList.contains('hidden');
    const dock = document.getElementById('mobile-dock');
    if (isOpen) {
        closeMobileMenu();
    } else {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        if (dock) dock.classList.add('hidden');
        document.body.classList.add('overflow-hidden');
        if (burgerIcon) {
            burgerIcon.classList.remove('fa-bars-staggered');
            burgerIcon.classList.add('fa-xmark');
        }
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-drawer');
    const burgerIcon = document.getElementById('burger-icon');
    const dock = document.getElementById('mobile-dock');
    if (!menu) return;

    menu.classList.add('hidden');
    menu.classList.remove('flex');
    if (dock) dock.classList.remove('hidden');
    document.body.classList.remove('overflow-hidden');
    if (burgerIcon) {
        burgerIcon.classList.remove('fa-xmark');
        burgerIcon.classList.add('fa-bars-staggered');
    }
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

    // 1. Update Desktop Nav Button States
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.className = "nav-btn px-4 xl:px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5";
    });

    const activeBtn = document.getElementById('nav-' + tabId);
    if (activeBtn) {
        activeBtn.className = "nav-btn px-4 xl:px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 bg-gold-500 text-black shadow-md shadow-gold-500/20";
    }

    // 2. Update Mobile Drawer Buttons
    const drawerBtns = document.querySelectorAll('.drawer-nav-btn');
    drawerBtns.forEach(btn => {
        btn.classList.remove('bg-gold-500', 'text-black', 'border-gold-500/50');
        btn.classList.add('text-slate-300', 'bg-white/5', 'border-white/5');
    });

    const activeDrawerBtn = document.getElementById('drawer-nav-' + tabId);
    if (activeDrawerBtn) {
        activeDrawerBtn.classList.remove('text-slate-300', 'bg-white/5', 'border-white/5');
        activeDrawerBtn.classList.add('bg-gold-500', 'text-black', 'border-gold-500/50');
    }

    // 3. Update Mobile Bottom Dock Buttons
    const dockBtns = document.querySelectorAll('.dock-nav-btn');
    dockBtns.forEach(btn => {
        btn.classList.remove('text-gold-400', 'bg-gold-500/15', 'border-gold-500/30');
        btn.classList.add('text-slate-400', 'hover:text-white');
    });

    const activeDockBtn = document.getElementById('dock-nav-' + tabId);
    if (activeDockBtn) {
        activeDockBtn.classList.remove('text-slate-400');
        activeDockBtn.classList.add('text-gold-400', 'bg-gold-500/15', 'border-gold-500/30');
    }

    // Close mobile menu if opened
    closeMobileMenu();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Photo Click Functionality (Triggers navigation to "About Me")
function openProfileCardDetail() {
    switchTab('about');
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// REALISTIC 1.6 MPI SKODA ENGINE SOUND SYNTHESIZER
// ==========================================
class OctaviaSoundSystem {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.compressor = null;

        // Combustion engine nodes
        this.oscSub = null;
        this.oscLow = null;
        this.oscMid = null;
        this.oscHigh = null;
        this.intakeNoise = null;
        this.noiseFilter = null;
        this.noiseGain = null;
        this.engineFilter = null;
        this.engineGain = null;
        this.shaper = null;

        this.isPlaying = false;
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        // Dynamics compressor to glue the sound and create punchy automotive presence
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.08, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
    }

    ensureContext() {
        this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Play quick relay tick for turn signal blinks
    playRelayClick() {
        try {
            this.ensureContext();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.025);
        } catch (e) {}
    }

    // Play starter cranking sequence
    playStarterCrank(duration = 0.95) {
        this.ensureContext();
        const now = this.ctx.currentTime;

        // Cranking rhythmic pulses
        const crankOsc = this.ctx.createOscillator();
        const crankGain = this.ctx.createGain();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        crankOsc.type = 'sawtooth';
        crankOsc.frequency.setValueAtTime(95, now);
        crankOsc.frequency.linearRampToValueAtTime(110, now + duration);

        // Filter crank sound
        const crankFilter = this.ctx.createBiquadFilter();
        crankFilter.type = 'lowpass';
        crankFilter.frequency.setValueAtTime(260, now);

        // LFO for rhythmic turn over
        lfo.type = 'square';
        lfo.frequency.setValueAtTime(6.5, now); // ~6.5 turns per sec (390 cranking RPM)
        lfoGain.gain.setValueAtTime(0.4, now);

        crankGain.gain.setValueAtTime(0.01, now);
        crankGain.gain.linearRampToValueAtTime(0.25, now + 0.08);
        crankGain.gain.setValueAtTime(0.25, now + duration - 0.05);
        crankGain.gain.linearRampToValueAtTime(0.001, now + duration);

        lfo.connect(crankGain.gain);
        crankOsc.connect(crankFilter);
        crankFilter.connect(crankGain);
        crankGain.connect(this.compressor);

        crankOsc.start(now);
        lfo.start(now);
        crankOsc.stop(now + duration);
        lfo.stop(now + duration);
    }

    // Start continuous engine combustion sound
    startEngineLoop(initialRpm = 780) {
        this.ensureContext();
        if (this.isPlaying) return;

        const now = this.ctx.currentTime;

        // Custom distortion curve for warm engine backpressure
        this.shaper = this.ctx.createWaveShaper();
        this.shaper.curve = this.makeDistortionCurve(18);
        this.shaper.oversample = '2x';

        this.engineFilter = this.ctx.createBiquadFilter();
        this.engineFilter.type = 'lowpass';
        this.engineFilter.frequency.setValueAtTime(180, now);
        this.engineFilter.Q.setValueAtTime(3.2, now);

        this.engineGain = this.ctx.createGain();
        this.engineGain.gain.setValueAtTime(0.01, now);
        this.engineGain.gain.linearRampToValueAtTime(0.35, now + 0.3);

        // 4-cylinder fundamental firing rate = RPM / 60 * 2
        const f0 = (initialRpm / 60) * 2;

        // 1. Sub-bass cylinder push (13 Hz at idle)
        this.oscSub = this.ctx.createOscillator();
        this.oscSub.type = 'sine';
        this.oscSub.frequency.setValueAtTime(f0 * 0.5, now);

        // 2. Fundamental combustion pulse (26 Hz at idle)
        this.oscLow = this.ctx.createOscillator();
        this.oscLow.type = 'triangle';
        this.oscLow.frequency.setValueAtTime(f0, now);

        // 3. 2nd harmonic exhaust pulse (52 Hz at idle)
        this.oscMid = this.ctx.createOscillator();
        this.oscMid.type = 'sawtooth';
        this.oscMid.frequency.setValueAtTime(f0 * 2, now);

        // 4. 3rd harmonic mechanical growl (78 Hz at idle)
        this.oscHigh = this.ctx.createOscillator();
        this.oscHigh.type = 'sawtooth';
        this.oscHigh.frequency.setValueAtTime(f0 * 3, now);

        // Sub gain
        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(0.7, now);
        this.oscSub.connect(subGain);
        subGain.connect(this.engineFilter);

        // Low gain
        const lowGain = this.ctx.createGain();
        lowGain.gain.setValueAtTime(0.65, now);
        this.oscLow.connect(lowGain);
        lowGain.connect(this.engineFilter);

        // Mid gain
        const midGain = this.ctx.createGain();
        midGain.gain.setValueAtTime(0.35, now);
        this.oscMid.connect(midGain);
        midGain.connect(this.engineFilter);

        // High gain
        const highGain = this.ctx.createGain();
        highGain.gain.setValueAtTime(0.18, now);
        this.oscHigh.connect(highGain);
        highGain.connect(this.engineFilter);

        // 5. Air intake & exhaust noise
        this.createNoiseLayer(now);

        this.engineFilter.connect(this.shaper);
        this.shaper.connect(this.engineGain);
        this.engineGain.connect(this.compressor);

        this.oscSub.start(now);
        this.oscLow.start(now);
        this.oscMid.start(now);
        this.oscHigh.start(now);

        this.isPlaying = true;
    }

    createNoiseLayer(now) {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        let b0 = 0, b1 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99 * b0 + white * 0.05;
            b1 = 0.95 * b1 + white * 0.08;
            output[i] = (b0 + b1) * 0.5;
        }

        this.intakeNoise = this.ctx.createBufferSource();
        this.intakeNoise.buffer = buffer;
        this.intakeNoise.loop = true;

        this.noiseFilter = this.ctx.createBiquadFilter();
        this.noiseFilter.type = 'bandpass';
        this.noiseFilter.frequency.setValueAtTime(320, now);
        this.noiseFilter.Q.setValueAtTime(1.8, now);

        this.noiseGain = this.ctx.createGain();
        this.noiseGain.gain.setValueAtTime(0.04, now);

        this.intakeNoise.connect(this.noiseFilter);
        this.noiseFilter.connect(this.noiseGain);
        this.noiseGain.connect(this.engineGain);

        this.intakeNoise.start(now);
    }

    makeDistortionCurve(amount) {
        const k = typeof amount === 'number' ? amount : 20;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < n_samples; ++i) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    // Dynamic RPM update (called each frame while running)
    updateRpm(rpm) {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const f0 = (rpm / 60) * 2;

        this.oscSub.frequency.setTargetAtTime(f0 * 0.5, now, 0.04);
        this.oscLow.frequency.setTargetAtTime(f0, now, 0.04);
        this.oscMid.frequency.setTargetAtTime(f0 * 2, now, 0.04);
        this.oscHigh.frequency.setTargetAtTime(f0 * 3, now, 0.04);

        // Filter opens with RPM (140 Hz at idle -> 750 Hz at redline)
        const filterCutoff = 140 + (rpm / 6200) * 650;
        this.engineFilter.frequency.setTargetAtTime(filterCutoff, now, 0.05);

        // Engine volume increases under load
        const vol = 0.28 + (rpm / 6200) * 0.35;
        this.engineGain.gain.setTargetAtTime(vol, now, 0.05);

        // Intake noise increases under throttle
        if (this.noiseGain) {
            const noiseVol = 0.03 + (rpm / 6200) * 0.16;
            this.noiseGain.gain.setTargetAtTime(noiseVol, now, 0.05);
            this.noiseFilter.frequency.setTargetAtTime(250 + (rpm / 6200) * 600, now, 0.05);
        }
    }

    // Stop engine sound smoothly (spin-down to zero)
    stopEngineLoop() {
        if (!this.isPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;

        this.engineGain.gain.setValueAtTime(this.engineGain.gain.value, now);
        this.engineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

        this.oscLow.frequency.setValueAtTime(this.oscLow.frequency.value, now);
        this.oscLow.frequency.exponentialRampToValueAtTime(10, now + 0.65);

        setTimeout(() => {
            try {
                if (this.oscSub) this.oscSub.stop();
                if (this.oscLow) this.oscLow.stop();
                if (this.oscMid) this.oscMid.stop();
                if (this.oscHigh) this.oscHigh.stop();
                if (this.intakeNoise) this.intakeNoise.stop();
            } catch (e) {}
            this.isPlaying = false;
        }, 700);
    }

    // Play catastrophic steam hiss and metal clunk on overheat
    playBlowupSound() {
        this.ensureContext();
        const now = this.ctx.currentTime;

        // Immediately kill combustion sound
        if (this.engineGain) {
            this.engineGain.gain.setValueAtTime(this.engineGain.gain.value, now);
            this.engineGain.gain.linearRampToValueAtTime(0.0001, now + 0.1);
        }

        // Metal clunk
        const clunkOsc = this.ctx.createOscillator();
        const clunkGain = this.ctx.createGain();
        clunkOsc.type = 'sawtooth';
        clunkOsc.frequency.setValueAtTime(150, now);
        clunkOsc.frequency.exponentialRampToValueAtTime(35, now + 0.25);
        clunkGain.gain.setValueAtTime(0.6, now);
        clunkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        clunkOsc.connect(clunkGain);
        clunkGain.connect(this.masterGain);
        clunkOsc.start(now);
        clunkOsc.stop(now + 0.3);

        // Steam release hiss (white noise burst)
        const bufferSize = this.ctx.sampleRate * 4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.45;
        }

        const steamNoise = this.ctx.createBufferSource();
        steamNoise.buffer = buffer;

        const steamFilter = this.ctx.createBiquadFilter();
        steamFilter.type = 'bandpass';
        steamFilter.frequency.setValueAtTime(2200, now);
        steamFilter.frequency.linearRampToValueAtTime(1400, now + 3.5);
        steamFilter.Q.setValueAtTime(1.5, now);

        const steamGain = this.ctx.createGain();
        steamGain.gain.setValueAtTime(0.01, now);
        steamGain.gain.linearRampToValueAtTime(0.45, now + 0.05);
        steamGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        steamNoise.connect(steamFilter);
        steamFilter.connect(steamGain);
        steamGain.connect(this.masterGain);

        steamNoise.start(now);
        steamNoise.stop(now + 4.0);

        this.isPlaying = false;
    }

    // Easter Egg: Turbo spool & flutter blow-off ("pshh-tu-tu-tu")
    playTurboBlowoff() {
        this.ensureContext();
        const now = this.ctx.currentTime;

        // Whistle
        const whistleOsc = this.ctx.createOscillator();
        const whistleGain = this.ctx.createGain();
        whistleOsc.type = 'sine';
        whistleOsc.frequency.setValueAtTime(1200, now);
        whistleOsc.frequency.exponentialRampToValueAtTime(3400, now + 0.35);
        whistleOsc.frequency.exponentialRampToValueAtTime(900, now + 0.8);

        whistleGain.gain.setValueAtTime(0.01, now);
        whistleGain.gain.linearRampToValueAtTime(0.28, now + 0.3);
        whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        whistleOsc.connect(whistleGain);
        whistleGain.connect(this.masterGain);
        whistleOsc.start(now);
        whistleOsc.stop(now + 0.9);

        // Blow-off flutter
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.9);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.45;
        }

        const bovNoise = this.ctx.createBufferSource();
        bovNoise.buffer = buffer;

        const bovFilter = this.ctx.createBiquadFilter();
        bovFilter.type = 'bandpass';
        bovFilter.frequency.setValueAtTime(2600, now + 0.25);
        bovFilter.Q.setValueAtTime(2.5, now);

        const bovGain = this.ctx.createGain();
        bovGain.gain.setValueAtTime(0.001, now + 0.25);
        bovGain.gain.linearRampToValueAtTime(0.4, now + 0.35);
        bovGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        bovNoise.connect(bovFilter);
        bovFilter.connect(bovGain);
        bovGain.connect(this.masterGain);

        bovNoise.start(now + 0.25);
        bovNoise.stop(now + 1.0);
    }

    // Easter Egg: Anti-lag Pops & Bangs backfires
    playPopsAndBangs(count = 4) {
        this.ensureContext();
        for (let i = 0; i < count; i++) {
            const delay = i * 0.13 + Math.random() * 0.05;
            setTimeout(() => {
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                // Bass thump
                const subOsc = this.ctx.createOscillator();
                const subGain = this.ctx.createGain();
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(120 + Math.random() * 40, now);
                subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.12);
                subGain.gain.setValueAtTime(0.75, now);
                subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                subOsc.connect(subGain);
                subGain.connect(this.masterGain);
                subOsc.start(now);
                subOsc.stop(now + 0.15);

                // Gunshot crackle burst
                const bufLen = Math.floor(this.ctx.sampleRate * 0.1);
                const buf = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
                const d = buf.getChannelData(0);
                for (let j = 0; j < bufLen; j++) {
                    d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufLen * 0.16));
                }
                const crackle = this.ctx.createBufferSource();
                crackle.buffer = buf;
                const cFilter = this.ctx.createBiquadFilter();
                cFilter.type = 'highpass';
                cFilter.frequency.setValueAtTime(950, now);
                const cGain = this.ctx.createGain();
                cGain.gain.setValueAtTime(0.65, now);
                cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                crackle.connect(cFilter);
                cFilter.connect(cGain);
                cGain.connect(this.masterGain);
                crackle.start(now);
                crackle.stop(now + 0.13);
            }, delay * 1000);
        }
    }

    // Easter Egg: Nitro Rocket Spool
    playNitroRoar() {
        this.ensureContext();
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.6);
        osc.frequency.exponentialRampToValueAtTime(140, now + 1.2);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 1.3);

        this.playTurboBlowoff();
    }
}

const soundSystem = new OctaviaSoundSystem();

// ==========================================
// INTERACTIVE LIGHTS SYSTEM (DRL 2X BLINK -> ON)
// ==========================================
let headlightsOn = false;
let isFlashingHeadlights = false;

async function toggleHeadlights() {
    if (engineBlown) return;
    if (isFlashingHeadlights) return;

    const btnText = document.getElementById('headlight-status-text');
    const btn = document.getElementById('headlight-toggle-btn');
    const container = document.getElementById('car-svg-container');

    const frontAmber = document.getElementById('headlight-amber');
    const frontWhite = document.getElementById('headlight-white');
    const frontBeam = document.getElementById('headlight-beam-cone');

    const rearAmber = document.getElementById('taillight-amber');
    const rearRed = document.getElementById('taillight-red');
    const rearBeam = document.getElementById('taillight-beam-cone');

    const mirrorAmber = document.getElementById('mirror-amber');

    if (!headlightsOn) {
        isFlashingHeadlights = true;
        if (btnText) btnText.innerText = "Фары: ...";

        const setAmber = (val) => {
            if (frontAmber) frontAmber.style.opacity = val;
            if (rearAmber) rearAmber.style.opacity = val;
            if (mirrorAmber) mirrorAmber.style.opacity = val;
        };

        // Flash 1 (Emergency blinker / Аварийка)
        setAmber('1');
        soundSystem.playRelayClick();
        await sleep(180);
        setAmber('0');
        await sleep(140);

        // Flash 2
        setAmber('1');
        soundSystem.playRelayClick();
        await sleep(180);
        setAmber('0');
        await sleep(140);

        // Turn ON main xenon/LED lights + ruby red rear lights
        if (frontWhite) frontWhite.style.opacity = '1';
        if (frontBeam) frontBeam.style.opacity = '0.9';
        if (rearRed) rearRed.style.opacity = '1';
        if (rearBeam) rearBeam.style.opacity = '0.85';

        if (container) container.classList.add('headlight-on');
        if (btnText) {
            btnText.innerText = "Фары: ВКЛ";
            btnText.classList.add('text-cyan-400');
        }
        if (btn) btn.classList.add('border-cyan-400/50', 'bg-cyan-400/10');

        headlightsOn = true;
        isFlashingHeadlights = false;
    } else {
        // Smooth fade out to black
        if (frontWhite) frontWhite.style.opacity = '0';
        if (frontBeam) frontBeam.style.opacity = '0';
        if (rearRed) rearRed.style.opacity = '0';
        if (rearBeam) rearBeam.style.opacity = '0';

        if (container) container.classList.remove('headlight-on');
        if (btnText) {
            btnText.innerText = "Фары: ВЫКЛ";
            btnText.classList.remove('text-cyan-400');
        }
        if (btn) btn.classList.remove('border-cyan-400/50', 'bg-cyan-400/10');

        headlightsOn = false;
    }
}

// ==========================================
// ENGINE START / STOP & ACCELERATOR WITH EASTER EGG
// ==========================================
let engineRunning = false;
let engineStarting = false;
let engineBlown = false;
let currentRpm = 0;
let targetRpm = 0;
let coolantTemp = 90.0;
let isPedalPressed = false;
let pedalPressStartTime = 0;

function updateRpmDisplay(rpm) {
    const val = document.getElementById('rpm-value');
    const bar = document.getElementById('rpm-bar');
    const clamped = Math.max(0, Math.round(rpm));
    if (val) val.innerText = clamped + " RPM";
    if (bar) bar.style.width = Math.min(100, (clamped / 6500) * 100).toFixed(1) + "%";
}

function updateTempDisplay(temp) {
    const el = document.getElementById('temp-value');
    if (!el) return;
    el.innerText = temp.toFixed(1) + " °C";

    if (temp >= 125.0) {
        el.className = "text-red-500 font-black temp-alarm";
    } else if (temp >= 105.0) {
        el.className = "text-amber-400 font-bold pulse-glow";
    } else {
        el.className = "text-cyan-400 font-bold transition-colors";
    }
}

async function toggleEngine() {
    if (engineBlown) return;
    if (engineStarting) return;

    const btn = document.getElementById('engine-toggle-btn');
    const btnText = document.getElementById('engine-btn-text');
    const btnIcon = document.getElementById('engine-btn-icon');
    const carImg = document.getElementById('octavia-car-img');
    const ecuStatus = document.getElementById('ecu-status-text');

    if (engineRunning) {
        // Stop Engine
        engineRunning = false;
        targetRpm = 0;
        soundSystem.stopEngineLoop();

        // Automatically turn off headlights when stopping engine (smooth fade)
        if (headlightsOn) {
            toggleHeadlights();
        }

        if (carImg) {
            carImg.classList.remove('engine-idling-shake', 'engine-revving-shake');
        }
        if (btnText) btnText.innerText = "Завести двигатель";
        if (btnIcon) btnIcon.className = "fa-solid fa-power-off text-gold-400";
        if (btn) {
            btn.classList.remove('bg-emerald-500/20', 'border-emerald-500/40', 'text-emerald-400');
            btn.classList.add('bg-gold-500/15', 'border-gold-500/40', 'text-gold-400');
        }
        if (ecuStatus) {
            ecuStatus.innerText = "Двигатель заглушен (0 RPM)";
            ecuStatus.className = "text-slate-400 font-bold";
        }
    } else {
        // Start Engine
        engineStarting = true;
        if (btnText) btnText.innerText = "Запуск...";
        if (btnIcon) btnIcon.className = "fa-solid fa-spinner fa-spin text-gold-400";

        // Auto turn on headlights with 2x amber emergency blink if not already on
        if (!headlightsOn && !isFlashingHeadlights) {
            toggleHeadlights();
        }

        // Cranking sound
        soundSystem.playStarterCrank(0.95);

        // Cranking RPM jitter
        const crankInterval = setInterval(() => {
            if (engineStarting) {
                currentRpm = 220 + Math.random() * 80;
                updateRpmDisplay(currentRpm);
            }
        }, 75);

        await sleep(950);
        clearInterval(crankInterval);

        if (engineBlown) return;

        // Catch fire and rev up to 1350 then settle to idle 780
        soundSystem.startEngineLoop(780);
        engineRunning = true;
        engineStarting = false;

        currentRpm = 1350;
        targetRpm = 780;

        if (carImg) {
            carImg.classList.add('engine-idling-shake');
        }
        if (btnText) btnText.innerText = "Заглушить двигатель";
        if (btnIcon) btnIcon.className = "fa-solid fa-power-off text-emerald-400 animate-pulse";
        if (btn) {
            btn.classList.remove('bg-gold-500/15', 'border-gold-500/40', 'text-gold-400');
            btn.classList.add('bg-emerald-500/20', 'border-emerald-500/40', 'text-emerald-400');
        }
        if (ecuStatus) {
            ecuStatus.innerText = "0 ошибок (OK) • ХХ 780 RPM";
            ecuStatus.className = "text-emerald-400 font-bold";
        }
    }
}

// Gas Pedal Handlers
function pressGasPedal(e) {
    if (e && e.cancelable) e.preventDefault();
    if (engineBlown) return;

    if (!engineRunning) {
        showToast("Сначала заведите двигатель кнопкой «Завести двигатель»!", false);
        return;
    }

    if (isPedalPressed) return;
    isPedalPressed = true;
    pedalPressStartTime = Date.now();

    const pedalBtn = document.getElementById('gas-pedal-btn');
    const carImg = document.getElementById('octavia-car-img');

    if (pedalBtn) pedalBtn.classList.add('pedal-active');
    if (carImg) {
        carImg.classList.remove('engine-idling-shake');
        carImg.classList.add('engine-revving-shake');
    }

    targetRpm = 5800 + Math.random() * 250;
}

function releaseGasPedal(e) {
    if (!isPedalPressed) return;
    isPedalPressed = false;

    const pedalBtn = document.getElementById('gas-pedal-btn');
    const carImg = document.getElementById('octavia-car-img');

    if (pedalBtn) pedalBtn.classList.remove('pedal-active');

    if (engineRunning && !engineBlown) {
        if (carImg) {
            carImg.classList.remove('engine-revving-shake');
            carImg.classList.add('engine-idling-shake');
        }
        targetRpm = 780;
    }
}

// Catastrophic 150°C Overheat Easter Egg Trigger
function triggerOverheatDisaster() {
    engineBlown = true;
    engineRunning = false;
    isPedalPressed = false;
    targetRpm = 0;
    currentRpm = 0;
    coolantTemp = 150.0;

    soundSystem.playBlowupSound();

    // Automatically turn off headlights on engine seize (smooth fade)
    if (headlightsOn) {
        toggleHeadlights();
    }

    // Car visuals & smoke
    const carImg = document.getElementById('octavia-car-img');
    const smokeContainer = document.getElementById('engine-smoke-container');
    const banner = document.getElementById('overheat-banner');

    if (carImg) {
        carImg.classList.remove('engine-idling-shake', 'engine-revving-shake');
    }
    if (smokeContainer) {
        smokeContainer.classList.remove('hidden');
    }
    if (banner) {
        banner.classList.remove('hidden');
    }

    updateRpmDisplay(0);
    const tempEl = document.getElementById('temp-value');
    if (tempEl) {
        tempEl.innerText = "150.0 °C (ПЕРЕГРЕВ)";
        tempEl.className = "text-red-500 font-black temp-alarm";
    }

    const ecuStatus = document.getElementById('ecu-status-text');
    if (ecuStatus) {
        ecuStatus.innerText = "КЛИН ДВИГАТЕЛЯ (150°C)";
        ecuStatus.className = "text-red-500 font-black";
    }
    const onlineTag = document.getElementById('telemetry-online-tag');
    if (onlineTag) {
        onlineTag.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-red-500 pulse-glow"></span> OVERHEATED`;
        onlineTag.className = "text-[10px] text-red-400 flex items-center gap-1 font-bold";
    }

    const log1 = document.getElementById('vcds-log-line-1');
    const log2 = document.getElementById('vcds-log-line-2');
    const log3 = document.getElementById('vcds-log-line-3');
    if (log1) log1.innerText = "[CRITICAL FAULT]: DTC 00532 - Oil Pressure Zero (0.0 bar)";
    if (log2) log2.innerText = "16788 - P0016 Crankshaft/Camshaft Mechanical Lockup";
    if (log3) log3.innerText = "STATUS: ОКТАВИЯ СЪЕЛА ВСЕ МАСЛО. ДВИГАТЕЛЬ ЗАКЛИНИЛ.";

    // Lock controls permanently
    const engineBtn = document.getElementById('engine-toggle-btn');
    const engineBtnText = document.getElementById('engine-btn-text');
    const engineBtnIcon = document.getElementById('engine-btn-icon');
    if (engineBtn) {
        engineBtn.disabled = true;
        engineBtn.className = "flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-500/60 text-xs font-mono text-red-400 opacity-60 cursor-not-allowed flex items-center justify-center gap-2 font-bold";
    }
    if (engineBtnText) engineBtnText.innerText = "Двигатель заклинил";
    if (engineBtnIcon) engineBtnIcon.className = "fa-solid fa-skull text-red-400";

    const pedalBtn = document.getElementById('gas-pedal-btn');
    if (pedalBtn) {
        pedalBtn.disabled = true;
        pedalBtn.className = "gas-pedal w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 opacity-50 cursor-not-allowed select-none flex items-center justify-center gap-2";
    }

    showToast("Октавия съела все масло! Сухой картер, коленвал намертво заклинил. Перезагрузите сайт.", false);
}

// Continuous Frame Loop
function animationLoop() {
    requestAnimationFrame(animationLoop);

    if (engineStarting) return;

    if (engineRunning && !engineBlown) {
        // Smooth RPM interpolation
        if (isPedalPressed) {
            currentRpm += (targetRpm - currentRpm) * 0.12;
        } else {
            currentRpm += (targetRpm - currentRpm) * 0.08;
        }

        const jitter = (Math.random() - 0.5) * (isPedalPressed ? 45 : 10);
        updateRpmDisplay(currentRpm + jitter);
        soundSystem.updateRpm(currentRpm);

        // EASTER EGG: Check pedal hold duration
        if (isPedalPressed) {
            const elapsed = (Date.now() - pedalPressStartTime) / 1000;
            if (elapsed >= 1.8) {
                // Coolant temp begins skyrocketing from 90°C to 150°C
                const progress = Math.min(1.0, (elapsed - 1.8) / 3.2); // reaches 1.0 at 5.0 seconds
                coolantTemp = 90.0 + progress * 60.0;
                updateTempDisplay(coolantTemp);

                if (progress >= 1.0 || coolantTemp >= 150.0) {
                    triggerOverheatDisaster();
                }
            }
        } else {
            // Cool down back to 90°C
            if (coolantTemp > 90.0) {
                coolantTemp = Math.max(90.0, coolantTemp - 0.35);
                updateTempDisplay(coolantTemp);
            }
        }
    } else if (!engineRunning && !engineBlown) {
        if (currentRpm > 0) {
            currentRpm = Math.max(0, currentRpm - 25);
            updateRpmDisplay(currentRpm);
        }
    }
}

// Initialize event listeners & loop
document.addEventListener('DOMContentLoaded', () => {
    const pedal = document.getElementById('gas-pedal-btn');
    if (pedal) {
        pedal.addEventListener('mousedown', pressGasPedal);
        pedal.addEventListener('touchstart', pressGasPedal, { passive: false });
        window.addEventListener('mouseup', releaseGasPedal);
        window.addEventListener('touchend', releaseGasPedal);
        window.addEventListener('touchcancel', releaseGasPedal);

        pedal.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                pressGasPedal();
            }
        });
        pedal.addEventListener('keyup', (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                releaseGasPedal();
            }
        });
    }

    animationLoop();
});

// Run loop immediately if DOM is already ready
if (document.readyState !== 'loading') {
    const pedal = document.getElementById('gas-pedal-btn');
    if (pedal) {
        pedal.addEventListener('mousedown', pressGasPedal);
        pedal.addEventListener('touchstart', pressGasPedal, { passive: false });
        window.addEventListener('mouseup', releaseGasPedal);
        window.addEventListener('touchend', releaseGasPedal);
        window.addEventListener('touchcancel', releaseGasPedal);
    }
    animationLoop();
}

// ECU Scan Simulator Logic (with dramatic blown engine diagnostic output)
function runECUScan() {
    const output = document.getElementById('ecu-scan-output');
    if (!output) return;
    output.innerHTML = "";

    if (engineBlown) {
        const brokenLogs = [
            { icon: "fa-solid fa-terminal text-cyan-400", text: "[OBD-II CAN-Bus 500kbps]: Считывание кодов DTC...", color: "text-slate-300" },
            { icon: "fa-solid fa-circle-xmark text-red-500", text: "[01 - ЭБУ ДВИГАТЕЛЯ (Bosch ME17)]: 000532 - Давление масла: 0.0 BAR (КРИТИЧЕСКИ НИЗКОЕ)", color: "text-red-400" },
            { icon: "fa-solid fa-circle-xmark text-red-500", text: "[01 - ЭБУ ДВИГАТЕЛЯ]: P0016 - Фатальное несоответствие коленвала/распредвала (МЕХАНИЧЕСКИЙ КЛИН)", color: "text-red-400" },
            { icon: "fa-solid fa-circle-xmark text-red-500", text: "[01 - ЭБУ ДВИГАТЕЛЯ]: P0219 - Превышение предельных оборотов отсечки (Over-Rev Recorded)", color: "text-red-400" },
            { icon: "fa-solid fa-circle-xmark text-red-500", text: "[01 - ЭБУ ДВИГАТЕЛЯ]: P0118 - Температура ОЖ 150.0°C (Тепловой шок и коробление ГБЦ)", color: "text-red-400" },
            { icon: "fa-solid fa-triangle-exclamation text-amber-400", text: "[02 - АКПП Aisin 09G]: U0100 - Потеря шины связи с блоком управления двигателем", color: "text-amber-400" },
            { icon: "fa-solid fa-triangle-exclamation text-amber-400", text: "[03 - Блок ABS/ESP MK100]: 01314 - Опрос блока ДВС: Сигнал недостоверен / Аварийный режим", color: "text-amber-400" },
            { icon: "fa-solid fa-oil-can text-red-500 animate-pulse", text: "[17 - Приборная панель]: Загорелась КРАСНАЯ МАСЛЕНКА: STOP! ENGINE OIL DEFECT!", color: "text-red-400 font-semibold" },
            { icon: "fa-solid fa-triangle-exclamation text-amber-400", text: "[19 - Диагностический Gateway]: Аварийный переход CAN-сети в защитный режим", color: "text-amber-400" },
            { icon: "fa-solid fa-skull-crossbones text-red-500", text: "ВЕРДИКТ VAG ODIS: Октавия съела все масло. Провернуло шатунные вкладыши. ДВС мертв!", color: "text-red-400 font-extrabold" }
        ];

        brokenLogs.forEach((item, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `flex items-start gap-2 ${item.color}`;
                line.innerHTML = `<i class="${item.icon} mt-0.5 flex-shrink-0"></i><span>${item.text}</span>`;
                output.appendChild(line);
                output.scrollTop = output.scrollHeight;
            }, index * 260);
        });
        return;
    }

    const logs = [
        { icon: "fa-solid fa-terminal text-cyan-400", text: "Подключение к разъему OBD-II (CAN-High 500kbps)...", color: "text-slate-300" },
        { icon: "fa-solid fa-check text-emerald-400", text: "Адрес 01: ЭБУ Двигателя (Bosch ME17.5.26 CWVA) - OK", color: "text-cyan-300" },
        { icon: "fa-solid fa-check text-emerald-400", text: "Адрес 02: АКПП (Aisin 09G 6-speed) - OK", color: "text-cyan-300" },
        { icon: "fa-solid fa-check text-emerald-400", text: "Адрес 03: Блок ABS/ESP (MK100) - OK", color: "text-cyan-300" },
        { icon: "fa-solid fa-circle-check text-emerald-400", text: "Сканирование ошибок DTC: 0 Faults Found.", color: "text-cyan-300" },
        { icon: "fa-solid fa-check text-emerald-400", text: "Проверка параметров VAG: Давление масла OK, Лямбда 1.00", color: "text-cyan-300" },
        { icon: "fa-solid fa-shield-halved text-emerald-400", text: "СТАТУС: Все системы Octavia A7 функционируют идеально!", color: "text-emerald-400 font-bold" }
    ];

    logs.forEach((item, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = `flex items-start gap-2 ${item.color}`;
            line.innerHTML = `<i class="${item.icon} mt-0.5 flex-shrink-0"></i><span>${item.text}</span>`;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }, index * 320);
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
        btn.className = "port-filter-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono bg-white/5 text-slate-300 hover:bg-white/10 transition-colors flex-shrink-0";
    });

    const target = evt ? evt.currentTarget || evt.target : (window.event ? window.event.target : null);
    if (target) {
        target.className = "port-filter-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono bg-gold-500 text-black font-bold flex-shrink-0";
    }
}

// Dynamic Live Source Code Loader for Code Modal
const codeCache = {
    html: null,
    css: null,
    js: null
};
let currentCodeTab = 'html';

async function switchCodeTab(fileType) {
    currentCodeTab = fileType;

    const tabHtml = document.getElementById('code-tab-html');
    const tabCss = document.getElementById('code-tab-css');
    const tabJs = document.getElementById('code-tab-js');
    if (tabHtml) tabHtml.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5 whitespace-nowrap";
    if (tabCss) tabCss.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5 whitespace-nowrap";
    if (tabJs) tabJs.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5 whitespace-nowrap";

    const targetTab = document.getElementById('code-tab-' + fileType);
    if (targetTab) targetTab.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono bg-gold-500 text-black font-bold whitespace-nowrap";

    const display = document.getElementById('code-display');
    const loading = document.getElementById('code-loading');
    if (!display) return;

    // Syntax color palette
    if (fileType === 'html') {
        display.className = "whitespace-pre-wrap leading-relaxed font-mono text-[11px] sm:text-xs text-emerald-400";
    } else if (fileType === 'css') {
        display.className = "whitespace-pre-wrap leading-relaxed font-mono text-[11px] sm:text-xs text-amber-300";
    } else {
        display.className = "whitespace-pre-wrap leading-relaxed font-mono text-[11px] sm:text-xs text-cyan-300";
    }

    if (codeCache[fileType]) {
        display.textContent = codeCache[fileType];
        return;
    }

    const filePaths = {
        html: 'index.html',
        css: 'css/style.css',
        js: 'js/main.js'
    };

    if (loading) loading.classList.remove('hidden');

    try {
        const response = await fetch(filePaths[fileType]);
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        const codeText = await response.text();
        codeCache[fileType] = codeText;
        display.textContent = codeText;
    } catch (err) {
        display.textContent = `// Не удалось динамически загрузить ${filePaths[fileType]}: ${err.message}\n// При просмотре через локальный веб-сервер код автоматически подгружается в полном объеме.`;
    } finally {
        if (loading) loading.classList.add('hidden');
    }
}

function toggleCodeModal() {
    const modal = document.getElementById('code-modal');
    if (!modal) return;
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        document.body.classList.add('overflow-hidden');
        switchCodeTab(currentCodeTab);
    } else {
        document.body.classList.remove('overflow-hidden');
    }
}

// Toast notification helper
function showToast(message, isSuccess = true) {
    const oldToast = document.getElementById('app-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = `fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-50 px-5 py-3.5 rounded-2xl font-mono text-xs flex items-center gap-3 shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
        isSuccess 
        ? 'glass-card-gold text-gold-400 border-gold-500/40' 
        : 'bg-red-950/90 text-red-300 border-red-500/40'
    }`;
    toast.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-circle-check text-base text-gold-400' : 'fa-circle-exclamation text-base text-red-400'} flex-shrink-0"></i> <span class="break-words leading-relaxed">${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4500);
}

// Escape HTML for safe Telegram markdown/HTML formatting
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Unified Contact Form Submission Handler (reads token securely from git-ignored config.js)
async function handleContactSubmit(event) {
    event.preventDefault();

    const BOT_TOKEN = (window.TG_CONFIG && window.TG_CONFIG.BOT_TOKEN) 
        ? window.TG_CONFIG.BOT_TOKEN 
        : '';
    const CHAT_ID = (window.TG_CONFIG && window.TG_CONFIG.CHAT_ID) 
        ? window.TG_CONFIG.CHAT_ID 
        : '1016044756';

    const btn = document.getElementById('contact-submit-btn');
    const btnText = document.getElementById('btn-text');

    const name = document.getElementById('contact-name').value.trim();
    const contact = document.getElementById('contact-contact').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
        showToast('Токен бота не настроен в js/config.js. Заполните js/config.js для отправки.', false);
        return;
    }

    const text = `<b>[НОВОЕ СООБЩЕНИЕ С САЙТА]</b>\n\n` +
        `<b>От:</b> ${escapeHtml(name)}\n` +
        `<b>Контакт:</b> ${escapeHtml(contact)}\n` +
        `<b>Тема:</b> ${escapeHtml(subject)}\n\n` +
        `<b>Сообщение:</b>\n${escapeHtml(message)}`;

    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Отправка...';

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
            if (btnText) btnText.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Отправлено!';
            document.getElementById('contact-form').reset();
            showToast('Сообщение успешно отправлено Глебу в Telegram!', true);

            setTimeout(() => {
                if (btnText) btnText.innerHTML = 'Отправить <i class="fa-solid fa-paper-plane ml-2"></i>';
                if (btn) btn.disabled = false;
            }, 3000);
        } else {
            throw new Error(data.description || 'Ошибка Telegram API');
        }
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        if (btnText) btnText.innerHTML = '<i class="fa-solid fa-xmark mr-2"></i>Ошибка';
        showToast('Не удалось отправить сообщение: ' + (error.message || 'Ошибка сети'), false);

        setTimeout(() => {
            if (btnText) btnText.innerHTML = 'Отправить <i class="fa-solid fa-paper-plane ml-2"></i>';
            if (btn) btn.disabled = false;
        }, 3000);
    }
}

// ==========================================
// VAG-COM STAGE 3 EASTER EGG & CLICK PARTICLES SYSTEM
// ==========================================
let easterEggActive = false;
let clickSparksEnabled = (localStorage.getItem('vag_stage3_unlocked') === 'true' && localStorage.getItem('vag_click_sparks') !== 'false');
let logoClickCount = 0;
let logoClickTimer = null;
let keyBuffer = '';
const konamiSequence = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiStep = 0;

// Particle Canvas Management
const eggCanvas = document.getElementById('easter-egg-canvas');
let eggCtx = null;
let eggParticles = [];
let eggAnimFrame = null;

function initEggCanvas() {
    if (!eggCanvas) return;
    eggCtx = eggCanvas.getContext('2d');
    const resize = () => {
        eggCanvas.width = window.innerWidth;
        eggCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
}

function spawnParticles(x, y, count = 35, colors = ['#f5d061', '#e6b94e', '#00f0ff', '#ff3b30', '#ffffff']) {
    if (!eggCanvas || !eggCtx) return;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 7;
        eggParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (Math.random() * 2.5),
            size: 1.5 + Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: 0.02 + Math.random() * 0.03,
            gravity: 0.1
        });
    }
    if (!eggAnimFrame) {
        renderEggParticles();
    }
}

function renderEggParticles() {
    if (!eggCtx) return;
    eggCtx.clearRect(0, 0, eggCanvas.width, eggCanvas.height);

    for (let i = eggParticles.length - 1; i >= 0; i--) {
        const p = eggParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            eggParticles.splice(i, 1);
            continue;
        }

        eggCtx.save();
        eggCtx.globalAlpha = Math.max(0, p.alpha);
        eggCtx.fillStyle = p.color;
        eggCtx.shadowColor = p.color;
        eggCtx.shadowBlur = 6;
        eggCtx.beginPath();
        eggCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        eggCtx.fill();
        eggCtx.restore();
    }

    if (eggParticles.length > 0) {
        eggAnimFrame = requestAnimationFrame(renderEggParticles);
    } else {
        eggAnimFrame = null;
        eggCtx.clearRect(0, 0, eggCanvas.width, eggCanvas.height);
    }
}

// Logo Click Trigger (5 rapid clicks on "GV" brand logo)
function handleLogoClick(e) {
    logoClickCount++;
    clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(() => {
        logoClickCount = 0;
    }, 2200);

    if (logoClickCount >= 5) {
        if (e) e.preventDefault();
        logoClickCount = 0;
        triggerStage3EasterEgg(e ? e.clientX : window.innerWidth / 2, e ? e.clientY : 100);
        return false;
    } else if (logoClickCount >= 2) {
        showToast(`⚡ Доступ к ЭБУ: ещё ${5 - logoClickCount} клика...`, true);
    }
}

// Keyboard Triggers (Konami code, 'vag', 'stage3', 'turbo', 'itmo')
window.addEventListener('keydown', (e) => {
    const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' || targetTag === 'textarea') return;

    if (e.key === 'Escape') {
        closeEasterEggModal();
        return;
    }

    const keyLower = e.key.toLowerCase();

    // Check Konami Code (supports EN and RU keyboard layout for B/A keys)
    const expected = konamiSequence[konamiStep];
    const isMatch = (keyLower === expected) ||
        (expected === 'b' && (keyLower === 'b' || keyLower === 'и')) ||
        (expected === 'a' && (keyLower === 'a' || keyLower === 'ф'));

    if (isMatch) {
        konamiStep++;
        if (konamiStep === konamiSequence.length) {
            konamiStep = 0;
            triggerStage3EasterEgg();
            return;
        }
    } else {
        konamiStep = 0;
    }

    // Word Buffer Check
    keyBuffer += keyLower;
    if (keyBuffer.length > 12) keyBuffer = keyBuffer.slice(-12);

    if (keyBuffer.endsWith('vag') || keyBuffer.endsWith('ваг') ||
        keyBuffer.endsWith('stage3') || keyBuffer.endsWith('turbo') ||
        keyBuffer.endsWith('турбо') || keyBuffer.endsWith('itmo') || keyBuffer.endsWith('итмо')) {
        keyBuffer = '';
        triggerStage3EasterEgg();
    }
});

// Dynamic Click Sparks (Energetic lightweight feedback on clicks)
window.addEventListener('click', (e) => {
    if (!clickSparksEnabled) return;
    const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' || targetTag === 'textarea') return;

    spawnParticles(e.clientX, e.clientY, 8, ['#f5d061', '#00f0ff', '#ffffff']);
}, { passive: true });

function triggerStage3EasterEgg(originX, originY) {
    const modal = document.getElementById('easter-egg-modal');
    if (!modal) return;

    soundSystem.playTurboBlowoff();
    soundSystem.playPopsAndBangs(3);

    // Screen Shake
    document.body.classList.remove('stage3-shake');
    void document.body.offsetWidth;
    document.body.classList.add('stage3-shake');
    setTimeout(() => document.body.classList.remove('stage3-shake'), 500);

    // Explosive particle burst
    const x = originX || window.innerWidth / 2;
    const y = originY || window.innerHeight / 2;
    spawnParticles(x, y, 60, ['#f5d061', '#ff3b30', '#00f0ff', '#ffffff', '#ff9500']);

    // Animate HP counter
    const hpCounter = document.getElementById('stage3-hp-counter');
    if (hpCounter) {
        let val = 180;
        const target = 450;
        const interval = setInterval(() => {
            val += 15;
            if (val >= target) {
                val = target;
                clearInterval(interval);
            }
            hpCounter.innerText = val + " HP";
        }, 25);
    }

    modal.classList.remove('hidden');
    easterEggActive = true;

    // Enable click sparks for the user who discovered the easter egg!
    clickSparksEnabled = true;
    try {
        localStorage.setItem('vag_stage3_unlocked', 'true');
        localStorage.setItem('vag_click_sparks', 'true');
    } catch (err) {}

    const btnText = document.getElementById('toggle-sparks-text');
    const btnIcon = document.getElementById('toggle-sparks-icon');
    if (btnText) btnText.innerText = 'ИСКРЫ КЛИКА: ВКЛ';
    if (btnIcon) btnIcon.className = 'fa-solid fa-wand-magic-sparkles text-amber-400';

    showToast('🚀 VAG-COM STAGE 3: Секретная прошивка разблокирована!', true);
}

function closeEasterEggModal() {
    const modal = document.getElementById('easter-egg-modal');
    if (modal) modal.classList.add('hidden');
    easterEggActive = false;
}

function triggerNitroBoost() {
    soundSystem.playNitroRoar();
    soundSystem.playPopsAndBangs(4);

    // Flash speed lines
    const overlay = document.getElementById('speed-lines-overlay');
    if (overlay) {
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 1100);
    }

    // Shake
    document.body.classList.remove('stage3-shake');
    void document.body.offsetWidth;
    document.body.classList.add('stage3-shake');
    setTimeout(() => document.body.classList.remove('stage3-shake'), 600);

    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 70, ['#ff3b30', '#ff9500', '#f5d061', '#00f0ff']);
    showToast('🔥 ЗАКИСЬ АЗОТА АКТИВИРОВАНА: +150 HP BOOST!', true);
}

function triggerPopsAndBangs() {
    soundSystem.playPopsAndBangs(5);
    spawnParticles(window.innerWidth / 2, window.innerHeight * 0.7, 40, ['#ff3b30', '#f5d061', '#ffffff']);
    showToast('💥 ВЫХЛОП: Отстрелы Anti-Lag активированы!', true);
}

function openOctaviaStage3() {
    closeEasterEggModal();
    switchTab('octavia');
    const carSection = document.getElementById('octavia-car-img');
    if (carSection) carSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
        if (!engineRunning && !engineBlown) {
            toggleEngine();
        }
        showToast('🏁 Octavia A7 переведена в боевой режим STAGE 3!', true);
    }, 400);
}

function toggleClickSparks() {
    clickSparksEnabled = !clickSparksEnabled;
    try {
        localStorage.setItem('vag_click_sparks', clickSparksEnabled ? 'true' : 'false');
    } catch (e) {}
    const btnText = document.getElementById('toggle-sparks-text');
    const btnIcon = document.getElementById('toggle-sparks-icon');
    if (btnText) btnText.innerText = clickSparksEnabled ? 'ИСКРЫ КЛИКА: ВКЛ' : 'ИСКРЫ КЛИКА: ВЫКЛ';
    if (btnIcon) {
        btnIcon.className = clickSparksEnabled ? 'fa-solid fa-wand-magic-sparkles text-amber-400' : 'fa-solid fa-wand-magic-sparkles text-slate-500';
    }
    showToast(clickSparksEnabled ? '✨ Неоновые искры курсора включены' : 'Искры курсора выключены', true);
}

// Initialize Easter Egg canvas and developer teaser
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEggCanvas);
} else {
    initEggCanvas();
}

console.log(
    "%c🏎️ VAG-COM DIAGNOSTICS %c| Ищешь пасхалку? Введи на клавиатуре 'vag', нажми Konami Code (↑↑↓↓←→←→BA) или кликни 5 раз по логотипу GV!",
    "background: #e6b94e; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
    "color: #00f0ff; font-weight: bold; font-size: 12px;"
);