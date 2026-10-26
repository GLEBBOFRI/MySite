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
            burgerIcon.className = 'fa-solid fa-xmark text-sm text-white';
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
        burgerIcon.className = 'fa-solid fa-bars text-xs text-white';
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

    // 1. Update Desktop Nav Button States (Letter Design System: 2px, Paper White, Vault Ink)
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.className = "nav-btn px-4 py-2 rounded-[2px] text-xs font-medium font-sans uppercase tracking-[0.12em] transition-all duration-200 text-fog-gray hover:text-white hover:bg-white/5";
    });

    const activeBtn = document.getElementById('nav-' + tabId);
    if (activeBtn) {
        activeBtn.className = "nav-btn px-4 py-2 rounded-[2px] text-xs font-medium font-sans uppercase tracking-[0.12em] transition-all duration-200 bg-deep-teal text-white";
    }

    // 2. Update Mobile Drawer Buttons
    const drawerBtns = document.querySelectorAll('.drawer-nav-btn');
    drawerBtns.forEach(btn => {
        btn.className = "drawer-nav-btn w-full p-3.5 rounded-[2px] text-left text-xs font-medium uppercase tracking-[0.14em] flex items-center gap-3 transition-all text-fog-gray hover:text-white bg-white/5";
    });

    const activeDrawerBtn = document.getElementById('drawer-nav-' + tabId);
    if (activeDrawerBtn) {
        activeDrawerBtn.className = "drawer-nav-btn w-full p-3.5 rounded-[2px] text-left text-xs font-medium uppercase tracking-[0.14em] flex items-center gap-3 transition-all bg-deep-teal text-white";
    }

    // 3. Update Mobile Bottom Dock Buttons
    const dockBtns = document.querySelectorAll('.dock-nav-btn');
    dockBtns.forEach(btn => {
        btn.className = "dock-nav-btn flex-1 py-2 rounded-[2px] flex flex-col items-center justify-center gap-0.5 text-fog-gray hover:text-white transition-all";
    });

    const activeDockBtn = document.getElementById('dock-nav-' + tabId);
    if (activeDockBtn) {
        activeDockBtn.className = "dock-nav-btn flex-1 py-2 rounded-[2px] flex flex-col items-center justify-center gap-0.5 text-white bg-deep-teal transition-all";
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
        } catch (e) { }
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
            } catch (e) { }
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
// INTERACTIVE CAR SELECTION & LIGHTS SYSTEM
// ==========================================
let currentCar = 'octavia'; // 'octavia' | 'golf3'
let headlightsOn = false;
let isFlashingHeadlights = false;
let hazardLightsOn = false;
let hazardInterval = null;
let golfIronEasterEggActive = false;

function switchCar(carId) {
    if (carId === currentCar) return;
    currentCar = carId;

    // Reset hazard flashers if running
    if (hazardLightsOn) {
        toggleHazardLights(false);
    }

    // Reset headlights state cleanly
    if (headlightsOn) {
        setHeadlightsState(false);
        headlightsOn = false;
        const btnText = document.getElementById('headlight-status-text');
        const btn = document.getElementById('headlight-toggle-btn');
        const btnIcon = document.getElementById('headlight-btn-icon');
        if (btnText) {
            btnText.innerText = "Фары: ВЫКЛ";
            btnText.classList.remove('text-cyan-400');
        }
        if (btnIcon) {
            btnIcon.className = "fa-solid fa-lightbulb text-gold-400";
        }
        if (btn) btn.classList.remove('border-cyan-400/50', 'bg-cyan-400/10');
    }

    // Stop engine sound loop if running
    if (engineRunning) {
        soundSystem.stopEngineLoop();
        engineRunning = false;
    }

    // Reset engine blown / overheat / easter egg states
    engineBlown = false;
    engineStarting = false;
    isPedalPressed = false;
    targetRpm = 0;
    currentRpm = 0;
    coolantTemp = 90.0;
    golfIronEasterEggActive = false;
    setCarShake(null);

    // Hide banners & smoke
    const smokeContainer = document.getElementById('engine-smoke-container');
    const overheatBanner = document.getElementById('overheat-banner');
    const ironBlockBanner = document.getElementById('iron-block-banner');
    if (smokeContainer) smokeContainer.classList.add('hidden');
    if (overheatBanner) overheatBanner.classList.add('hidden');
    if (ironBlockBanner) ironBlockBanner.classList.add('hidden');

    // Restore engine toggle button & gas pedal in case they were locked
    const engineBtn = document.getElementById('engine-toggle-btn');
    const engineBtnText = document.getElementById('engine-btn-text');
    const engineBtnIcon = document.getElementById('engine-btn-icon');
    if (engineBtn) {
        engineBtn.disabled = false;
        engineBtn.className = "flex-1 sm:flex-initial px-4 py-2.5 rounded-[2px] bg-gold-500/15 border border-gold-500/40 text-gold-400 text-xs font-mono uppercase tracking-wider hover:bg-gold-500/25 transition-all flex items-center justify-center gap-2";
    }
    if (engineBtnText) engineBtnText.innerText = "Завести двигатель";
    if (engineBtnIcon) engineBtnIcon.className = "fa-solid fa-power-off text-gold-400";

    const pedalBtn = document.getElementById('gas-pedal-btn');
    if (pedalBtn) {
        pedalBtn.disabled = false;
        pedalBtn.className = "gas-pedal w-full sm:w-auto px-5 py-2.5 rounded-[2px] bg-deep-teal/20 border border-deep-teal/40 text-teal-300 text-xs font-mono uppercase tracking-wider select-none flex items-center justify-center gap-2";
    }

    updateRpmDisplay(0);
    updateTempDisplay(90.0);

    const onlineTag = document.getElementById('telemetry-online-tag');
    if (onlineTag) {
        onlineTag.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE`;
        onlineTag.className = "text-[10px] text-emerald-400 flex items-center gap-1 font-bold";
    }

    // Toggle switcher UI buttons styling
    const octBtn = document.getElementById('car-select-octavia');
    const golfBtn = document.getElementById('car-select-golf3');
    const octVisual = document.getElementById('octavia-visual');
    const golfVisual = document.getElementById('golf3-visual');
    const octSpecs = document.getElementById('car-specs-octavia');
    const golfSpecs = document.getElementById('car-specs-golf3');
    const carTitle = document.getElementById('car-title');
    const carSubtitle = document.getElementById('car-subtitle');
    const carDesc = document.getElementById('car-desc-text');
    const ecuStatus = document.getElementById('ecu-status-text');
    const log1 = document.getElementById('vcds-log-line-1');
    const log2 = document.getElementById('vcds-log-line-2');
    const log3 = document.getElementById('vcds-log-line-3');

    if (currentCar === 'octavia') {
        if (octBtn) {
            octBtn.className = "px-3.5 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all bg-deep-teal text-white font-bold flex items-center gap-2";
        }
        if (golfBtn) {
            golfBtn.className = "px-3.5 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all text-fog-gray hover:text-white bg-transparent flex items-center gap-2";
        }

        if (octVisual) { octVisual.classList.remove('hidden'); octVisual.classList.add('flex'); }
        if (golfVisual) { golfVisual.classList.add('hidden'); golfVisual.classList.remove('flex'); }

        if (octSpecs) octSpecs.classList.remove('hidden');
        if (golfSpecs) golfSpecs.classList.add('hidden');

        const octLab = document.getElementById('lab-octavia');
        const golfLab = document.getElementById('lab-golf3');
        if (octLab) octLab.classList.remove('hidden');
        if (golfLab) golfLab.classList.add('hidden');

        if (carTitle) carTitle.innerText = "Škoda Octavia A7 Black Edition";
        if (carSubtitle) carSubtitle.innerText = "ИНТЕРАКТИВНЫЙ СТЕНД // ŠKODA OCTAVIA A7";
        if (carDesc) carDesc.innerText = "Черная Octavia A7 — образец сдержанного автомобильного дизайна и рабочий исследовательский стенд для отладки алгоритмов телеметрии CAN-шины.";

        if (ecuStatus) {
            ecuStatus.innerText = "Двигатель заглушен (0 RPM)";
            ecuStatus.className = "text-slate-400 font-bold";
        }
        if (log1) log1.innerText = "[VCDS Log]: Address 01: Engine (CWVA 1.6L)";
        if (log2) log2.innerText = "System: 1.6l R4 MPI H01 3231 • Component: ME17.5.26";
        if (log3) log3.innerText = "CAN-Bus: Gateway 500kbps • DTC Faults: 0";
    } else {
        if (octBtn) {
            octBtn.className = "px-3.5 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all text-fog-gray hover:text-white bg-transparent flex items-center gap-2";
        }
        if (golfBtn) {
            golfBtn.className = "px-3.5 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all bg-deep-teal text-white font-bold flex items-center gap-2";
        }

        if (octVisual) { octVisual.classList.add('hidden'); octVisual.classList.remove('flex'); }
        if (golfVisual) { golfVisual.classList.remove('hidden'); golfVisual.classList.add('flex'); }

        if (octSpecs) octSpecs.classList.add('hidden');
        if (golfSpecs) golfSpecs.classList.remove('hidden');

        const octLab = document.getElementById('lab-octavia');
        const golfLab = document.getElementById('lab-golf3');
        if (octLab) octLab.classList.add('hidden');
        if (golfLab) golfLab.classList.remove('hidden');

        if (carTitle) carTitle.innerText = "Volkswagen Golf Mk3 1.8 AAM (3-Door)";
        if (carSubtitle) carSubtitle.innerText = "ИНТЕРАКТИВНЫЙ СТЕНД // VOLKSWAGEN GOLF MK3";
        if (carDesc) carDesc.innerText = "Белоснежный трехдверный хэтчбек Golf Mk3 (Candy White) с легендарным 8-клапанным двигателем EA827 1.8 AAM (75 л.с.). Неубиваемый чугунный блок, надежный моновпрыск Mono-Motronic и немецкая классика 90-х.";

        if (ecuStatus) {
            ecuStatus.innerText = "Двигатель заглушен (0 RPM)";
            ecuStatus.className = "text-slate-400 font-bold";
        }
        if (log1) log1.innerText = "[VAG-COM KKL]: Address 01: Engine (AAM 1.8L Mono)";
        if (log2) log2.innerText = "ECU: Bosch Mono-Motronic 1.2.3 • Block: EA827 Cast Iron";
        if (log3) log3.innerText = "K-Line Protocol: 9600 baud • DTC Faults: 0 (No faults)";
    }
}

function setOrangeFlash(val) {
    const octaviaOrange = document.getElementById('octavia-orange-img');
    const golfOrange = document.getElementById('golf3-orange-img');
    if (currentCar === 'octavia') {
        if (octaviaOrange) octaviaOrange.style.opacity = val ? '1' : '0';
        if (golfOrange) golfOrange.style.opacity = '0';
    } else {
        if (golfOrange) golfOrange.style.opacity = val ? '1' : '0';
        if (octaviaOrange) octaviaOrange.style.opacity = '0';
    }
}

function setHeadlightsState(val) {
    const octaviaLights = document.getElementById('octavia-lights-img');
    const octaviaFrontBeam = document.getElementById('headlight-beam-cone');
    const octaviaRearBeam = document.getElementById('taillight-beam-cone');

    const golfLights = document.getElementById('golf3-lights-img');
    const golfFrontBeam = document.getElementById('golf3-headlight-beam-cone');
    const golfRearBeam = document.getElementById('golf3-taillight-beam-cone');

    const container = document.getElementById('car-svg-container');

    if (currentCar === 'octavia') {
        if (octaviaLights) octaviaLights.style.opacity = val ? '1' : '0';
        if (octaviaFrontBeam) octaviaFrontBeam.style.opacity = val ? '0.9' : '0';
        if (octaviaRearBeam) octaviaRearBeam.style.opacity = val ? '0.85' : '0';
        if (golfLights) golfLights.style.opacity = '0';
        if (golfFrontBeam) golfFrontBeam.style.opacity = '0';
        if (golfRearBeam) golfRearBeam.style.opacity = '0';
    } else {
        if (golfLights) golfLights.style.opacity = val ? '1' : '0';
        if (golfFrontBeam) golfFrontBeam.style.opacity = val ? '0.9' : '0';
        if (golfRearBeam) golfRearBeam.style.opacity = val ? '0.85' : '0';
        if (octaviaLights) octaviaLights.style.opacity = '0';
        if (octaviaFrontBeam) octaviaFrontBeam.style.opacity = '0';
        if (octaviaRearBeam) octaviaRearBeam.style.opacity = '0';
    }

    if (container) {
        if (val) container.classList.add('headlight-on');
        else container.classList.remove('headlight-on');
    }
}

function setCarShake(type) {
    const octaviaVisual = document.getElementById('octavia-visual');
    const golfVisual = document.getElementById('golf3-visual');
    const target = currentCar === 'octavia' ? octaviaVisual : golfVisual;

    if (octaviaVisual) octaviaVisual.classList.remove('engine-idling-shake', 'engine-revving-shake');
    if (golfVisual) golfVisual.classList.remove('engine-idling-shake', 'engine-revving-shake');

    if (target && type) {
        target.classList.add(type);
    }
}

async function toggleHeadlights() {
    if (engineBlown) return;
    if (isFlashingHeadlights) return;

    const btnText = document.getElementById('headlight-status-text');
    const btn = document.getElementById('headlight-toggle-btn');
    const btnIcon = document.getElementById('headlight-btn-icon');

    if (!headlightsOn) {
        isFlashingHeadlights = true;
        if (btnText) btnText.innerText = "Фары: ...";

        // Double Amber DRL / Emergency Flash before Xenon Ignition (using orange flash.png)
        setOrangeFlash(true);
        soundSystem.playRelayClick();
        await sleep(180);
        setOrangeFlash(false);
        await sleep(140);

        setOrangeFlash(true);
        soundSystem.playRelayClick();
        await sleep(180);
        setOrangeFlash(false);
        await sleep(140);

        // Turn ON main xenon/LED lights + ruby red rear lights (using lights.png)
        setHeadlightsState(true);

        if (btnText) {
            btnText.innerText = "Фары: ВКЛ";
            btnText.classList.add('text-cyan-400');
        }
        if (btnIcon) {
            btnIcon.className = "fa-solid fa-lightbulb text-cyan-400";
        }
        if (btn) btn.classList.add('border-cyan-400/50', 'bg-cyan-400/10');

        headlightsOn = true;
        isFlashingHeadlights = false;
    } else {
        // Smooth fade out
        setHeadlightsState(false);

        if (btnText) {
            btnText.innerText = "Фары: ВЫКЛ";
            btnText.classList.remove('text-cyan-400');
        }
        if (btnIcon) {
            btnIcon.className = "fa-solid fa-lightbulb text-gold-400";
        }
        if (btn) btn.classList.remove('border-cyan-400/50', 'bg-cyan-400/10');

        headlightsOn = false;
    }
}

function toggleHazardLights(force) {
    const newState = (force !== undefined) ? force : !hazardLightsOn;
    if (newState === hazardLightsOn) return;
    hazardLightsOn = newState;

    const btn = document.getElementById('hazard-toggle-btn');
    const btnText = document.getElementById('hazard-status-text');
    const btnIcon = document.getElementById('hazard-btn-icon');

    if (hazardInterval) {
        clearInterval(hazardInterval);
        hazardInterval = null;
    }

    if (hazardLightsOn) {
        if (btnText) btnText.innerText = "Аварийка: ВКЛ";
        if (btnIcon) btnIcon.className = "fa-solid fa-triangle-exclamation text-amber-400 animate-pulse";
        if (btn) {
            btn.classList.remove('bg-white/5', 'border-white/10');
            btn.classList.add('bg-amber-400/15', 'border-amber-400/50', 'text-amber-400', 'shadow-[0_0_15px_rgba(251,191,36,0.25)]');
        }

        let flashState = false;
        const doFlash = () => {
            flashState = !flashState;
            setOrangeFlash(flashState);
            soundSystem.playRelayClick();
        };

        doFlash();
        hazardInterval = setInterval(doFlash, 380);
    } else {
        setOrangeFlash(false);
        if (btnText) btnText.innerText = "Аварийка: ВЫКЛ";
        if (btnIcon) btnIcon.className = "fa-solid fa-triangle-exclamation text-amber-400";
        if (btn) {
            btn.classList.remove('bg-amber-400/15', 'border-amber-400/50', 'text-amber-400', 'shadow-[0_0_15px_rgba(251,191,36,0.25)]');
            btn.classList.add('bg-white/5', 'border-white/10');
        }
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

        setCarShake(null);
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

        setCarShake('engine-idling-shake');
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

    if (pedalBtn) pedalBtn.classList.add('pedal-active');
    setCarShake('engine-revving-shake');

    targetRpm = 5800 + Math.random() * 250;
}

function releaseGasPedal(e) {
    if (!isPedalPressed) return;
    isPedalPressed = false;

    const pedalBtn = document.getElementById('gas-pedal-btn');

    if (pedalBtn) pedalBtn.classList.remove('pedal-active');

    if (engineRunning && !engineBlown) {
        setCarShake('engine-idling-shake');
        targetRpm = 780;
    }
}

// Catastrophic 150°C Overheat Easter Egg Trigger (Octavia 1.6 CWVA)
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

    // Automatically trigger emergency hazard flashers (orange flash.png blinking!)
    toggleHazardLights(true);

    // Car visuals & smoke
    const smokeContainer = document.getElementById('engine-smoke-container');
    const banner = document.getElementById('overheat-banner');

    setCarShake(null);
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
        engineBtn.className = "flex-1 sm:flex-initial px-4 py-2.5 rounded-[2px] bg-red-950/60 border border-red-500/60 text-xs font-mono text-red-400 opacity-60 cursor-not-allowed flex items-center justify-center gap-2 font-bold";
    }
    if (engineBtnText) engineBtnText.innerText = "Двигатель заклинил";
    if (engineBtnIcon) engineBtnIcon.className = "fa-solid fa-skull text-red-400";

    const pedalBtn = document.getElementById('gas-pedal-btn');
    if (pedalBtn) {
        pedalBtn.disabled = true;
        pedalBtn.className = "gas-pedal w-full sm:w-auto px-5 py-2.5 rounded-[2px] bg-red-950/40 border border-red-500/40 text-red-400 opacity-50 cursor-not-allowed select-none flex items-center justify-center gap-2";
    }

    showToast("Октавия съела все масло! Сухой картер, коленвал намертво заклинил. Перезагрузите сайт.", false);
}

// Indestructible Cast Iron Block Easter Egg Trigger (Golf Mk3 1.8 AAM)
function triggerGolfIronBlockEasterEgg() {
    if (golfIronEasterEggActive) return;
    golfIronEasterEggActive = true;

    // Cap temperature at 150.0 °C - engine continues running strong!
    coolantTemp = 150.0;
    updateTempDisplay(150.0);

    const banner = document.getElementById('iron-block-banner');
    if (banner) {
        banner.classList.remove('hidden');
    }

    const ecuStatus = document.getElementById('ecu-status-text');
    if (ecuStatus) {
        ecuStatus.innerText = "ЧУГУННЫЙ БЛОК EA827 • 150°C (ПОЛЁТ НОРМАЛЬНЫЙ!)";
        ecuStatus.className = "text-emerald-400 font-black animate-pulse";
    }

    const log1 = document.getElementById('vcds-log-line-1');
    const log2 = document.getElementById('vcds-log-line-2');
    const log3 = document.getElementById('vcds-log-line-3');
    if (log1) log1.innerText = "[DIAGNOSTIC NOTICE]: Block: Heavy-Duty Cast Iron EA827";
    if (log2) log2.innerText = "Coolant Temp: 150.0°C | Mono-Motronic: NO KNOCK / NO DAMAGE";
    if (log3) log3.innerText = "STATUS: Чугунный блок неубиваем! Мотор 1.8 AAM продолжает работать.";

    showToast("Чугунный блок EA827 неубиваем! Температура 150°C, но этот 1.8 AAM отказывается умирать!", true);
}

function resetGolfEasterEgg() {
    golfIronEasterEggActive = false;
    const banner = document.getElementById('iron-block-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
    coolantTemp = 90.0;
    updateTempDisplay(90.0);

    const ecuStatus = document.getElementById('ecu-status-text');
    if (ecuStatus) {
        if (engineRunning) {
            ecuStatus.innerText = "0 ошибок (OK) • ХХ 780 RPM";
            ecuStatus.className = "text-emerald-400 font-bold";
        } else {
            ecuStatus.innerText = "Двигатель заглушен (0 RPM)";
            ecuStatus.className = "text-slate-400 font-bold";
        }
    }

    const log1 = document.getElementById('vcds-log-line-1');
    const log2 = document.getElementById('vcds-log-line-2');
    const log3 = document.getElementById('vcds-log-line-3');
    if (log1) log1.innerText = "[VAG-COM KKL]: Address 01: Engine (AAM 1.8L Mono)";
    if (log2) log2.innerText = "ECU: Bosch Mono-Motronic 1.2.3 • Block: EA827 Cast Iron";
    if (log3) log3.innerText = "K-Line Protocol: 9600 baud • DTC Faults: 0 (No faults)";
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
                    if (currentCar === 'octavia') {
                        triggerOverheatDisaster();
                    } else if (currentCar === 'golf3') {
                        triggerGolfIronBlockEasterEgg();
                    }
                }
            }
        } else {
            // Cool down back to 90°C
            if (coolantTemp > 90.0) {
                coolantTemp = Math.max(90.0, coolantTemp - 0.35);
                updateTempDisplay(coolantTemp);
                if (coolantTemp <= 92.0 && golfIronEasterEggActive) {
                    golfIronEasterEggActive = false;
                }
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

// ECU Scan Simulator Logic (with dramatic blown engine diagnostic output & Golf 3 OBD-2 Easter Egg)
function runECUScan() {
    if (currentCar === 'golf3') {
        const golfOutput = document.getElementById('ecu-scan-output-golf') || document.getElementById('ecu-scan-output');
        if (!golfOutput) return;
        golfOutput.innerHTML = "";

        const golfLogs = [
            { icon: "fa-solid fa-terminal text-emerald-400", text: "[K-Line / 2x2 переходник]: Подключение диагностических фишек под заглушкой у пепельницы...", color: "text-slate-300" },
            { icon: "fa-solid fa-question text-amber-400", text: "Адрес 01 [ЭБУ Двигателя Bosch Mono-Motronic]: Опрос датчиков... Ошибка: НЕ ЗНАЮ (ECU не отвечает на современные пакеты)", color: "text-amber-300" },
            { icon: "fa-solid fa-question text-amber-400", text: "Адрес 02 [АКПП / Трансмиссия]: Поиск блока управления... Ошибка: НЕ ЗНАЮ! (Здесь стоит чистая 5-ступенчатая механика 020)", color: "text-amber-300" },
            { icon: "fa-solid fa-question text-amber-400", text: "Адрес 03 [Тормозная система ABS/ESP]: Опрос шины... Ошибка: НЕ ЗНАЮ (Торможение силой правой ноги, системы стабилизации отсутствуют)", color: "text-amber-300" },
            { icon: "fa-solid fa-question text-amber-400", text: "Адрес 08 [Климат-контроль]: Опрос климатической установки... Ошибка: НЕ ЗНАЮ (Из климата — только тросики заслонок печки и ручной люк)", color: "text-amber-300" },
            { icon: "fa-solid fa-question text-amber-400", text: "Адрес 15 [Подушки безопасности SRS]: Опрос датчиков удара... Ошибка: НЕ ЗНАЮ", color: "text-amber-300" },
            { icon: "fa-solid fa-question text-amber-400", text: "Адрес 17 [Приборная панель]: Чтение цифрового одометра... Ошибка: НЕ ЗНАЮ (Спидометр крутится железным механическим тросиком)", color: "text-amber-300" },
            { icon: "fa-solid fa-triangle-exclamation text-amber-400", text: "Адрес 19 [Диагностический CAN Gateway]: Поиск цифровой шины данных... ВЫ СЕРЬЁЗНО?! Какая CAN-шина на платформе A3 в 90-х?!", color: "text-amber-400 font-bold" },
            { icon: "fa-solid fa-face-laugh-squint text-emerald-400 text-base", text: "ИТОГОВЫЙ ВЕРДИКТ: Брат, у Гольфа 3 НЕТУ OBD-2! Чего ты там вообще прочитать пытаешься?! Бери стробоскоп и ключ на 13 — чугунный 1.8 AAM переживёт нас всех!", color: "text-emerald-300 font-black" }
        ];

        golfLogs.forEach((item, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `flex items-start gap-2 ${item.color}`;
                line.innerHTML = `<i class="${item.icon} mt-0.5 flex-shrink-0"></i><span>${item.text}</span>`;
                golfOutput.appendChild(line);
                golfOutput.scrollTop = golfOutput.scrollHeight;
            }, index * 260);
        });
        return;
    }

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
        btn.className = "port-filter-btn px-3.5 py-1.5 rounded-[2px] text-xs font-sans uppercase tracking-[0.1em] bg-white/5 text-fog-gray border border-white/10 hover:text-white hover:bg-white/10";
    });

    const target = evt ? evt.currentTarget || evt.target : (window.event ? window.event.target : null);
    if (target) {
        target.className = "port-filter-btn px-3.5 py-1.5 rounded-[2px] text-xs font-sans uppercase tracking-[0.1em] bg-deep-teal text-white font-medium border border-deep-teal";
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
    if (tabHtml) tabHtml.className = "px-3 py-1.5 rounded-[2px] text-xs font-mono text-fog-gray hover:text-white bg-white/5 whitespace-nowrap";
    if (tabCss) tabCss.className = "px-3 py-1.5 rounded-[2px] text-xs font-mono text-fog-gray hover:text-white bg-white/5 whitespace-nowrap";
    if (tabJs) tabJs.className = "px-3 py-1.5 rounded-[2px] text-xs font-mono text-fog-gray hover:text-white bg-white/5 whitespace-nowrap";

    const targetTab = document.getElementById('code-tab-' + fileType);
    if (targetTab) targetTab.className = "px-3 py-1.5 rounded-[2px] text-xs font-mono bg-deep-teal text-white font-bold whitespace-nowrap";

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

function handleCodeModalBackdrop(e) {
    if (e.target && e.target.id === 'code-modal') {
        toggleCodeModal();
    }
}

// Toast notification helper (Solid Green for Success, Solid Red for Error)
function showToast(message, isSuccess = true) {
    const oldToast = document.getElementById('app-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = `fixed bottom-20 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-[10002] px-5 py-3.5 rounded-[2px] font-mono text-xs flex items-center gap-3 shadow-2xl transition-all duration-300 ${isSuccess
        ? 'bg-[#16a34a] text-white border border-[#22c55e]'
        : 'bg-[#dc2626] text-white border border-[#ef4444]'
        }`;
    toast.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'} text-white text-base flex-shrink-0"></i> <span class="break-words leading-relaxed font-medium">${message}</span>`;
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

// Secure Contact Form Backend Endpoint (Cloudflare Worker / Serverless Proxy)
// Replace with your deployed Cloudflare Worker URL or set window.CONTACT_API_URL
const CONTACT_API_ENDPOINT = window.CONTACT_API_URL || 'https://tgapi.vokhrameevgl.workers.dev';

// Unified Contact Form Submission Handler (Secure Serverless Architecture)
async function handleContactSubmit(event) {
    event.preventDefault();

    const btn = document.getElementById('contact-submit-btn');
    const btnText = document.getElementById('btn-text');

    const name = document.getElementById('contact-name').value.trim();
    const contact = document.getElementById('contact-contact').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const consent = document.getElementById('contact-consent');

    if (consent && !consent.checked) {
        showToast('Для отправки подтвердите согласие на обработку персональных данных (152-ФЗ)', false);
        consent.focus();
        return;
    }

    if (!name || !contact || !message) {
        showToast('Пожалуйста, заполните все обязательные поля формы.', false);
        return;
    }

    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Отправка...';

    try {
        const response = await fetch(CONTACT_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                contact: contact,
                subject: subject || 'Сообщение с сайта vokhr.is-a.dev',
                message: message
            })
        });

        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            data = { ok: response.ok };
        }

        if (response.ok && data.ok) {
            if (btnText) btnText.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Отправлено!';
            document.getElementById('contact-form').reset();
            showToast('Сообщение успешно отправлено мне в Telegram!', true);

            setTimeout(() => {
                if (btnText) btnText.innerHTML = 'Отправить в Telegram <i class="fa-solid fa-paper-plane ml-2"></i>';
                if (btn) btn.disabled = false;
            }, 3000);
        } else {
            throw new Error(data.error || data.message || `Ошибка сервера (${response.status})`);
        }
    } catch (error) {
        console.error('Ошибка отправки формы:', error);
        if (btnText) btnText.innerHTML = '<i class="fa-solid fa-xmark mr-2"></i>Ошибка';

        // Informative message if worker is still deploying
        const msg = error.message.includes('Failed to fetch')
            ? 'Сервер отправки недоступен или развертывается. Напишите мне напрямую в Telegram: @TLVRLX'
            : error.message;
        showToast('Не удалось отправить: ' + msg, false);

        setTimeout(() => {
            if (btnText) btnText.innerHTML = 'Отправить в Telegram <i class="fa-solid fa-paper-plane ml-2"></i>';
            if (btn) btn.disabled = false;
        }, 4000);
    }
}

// ==========================================
// EASTER EGG SYSTEM (VAG-COM STAGE 3 & MACOS TERMINAL)
// ==========================================
let easterEggModalOpen = false;
let clickSparksEnabled = (localStorage.getItem('vag_click_sparks') === 'true');
let logoClickCount = 0;
let logoClickTimer = null;
let keyBuffer = '';
const konamiSequence = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let konamiStep = 0;
let terminalExpanded = false;
let terminalHistory = [];
let terminalHistoryIndex = -1;

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

function spawnParticles(x, y, count = 35, colors = ['#186f64', '#536eff', '#f5d061', '#ffffff', '#00f0ff']) {
    if (!eggCanvas || !eggCtx) {
        initEggCanvas();
        if (!eggCanvas || !eggCtx) return;
    }
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

function syncSparksButtonUI() {
    const btnText = document.getElementById('toggle-sparks-text');
    const btnIcon = document.getElementById('toggle-sparks-icon');
    const btn = document.getElementById('toggle-sparks-btn');
    if (btnText) {
        btnText.innerText = clickSparksEnabled ? 'ИСКРЫ КЛИКА: ВКЛ' : 'ИСКРЫ КЛИКА: ВЫКЛ';
    }
    if (btnIcon) {
        btnIcon.className = clickSparksEnabled ? 'fa-solid fa-wand-magic-sparkles text-emerald-400' : 'fa-solid fa-wand-magic-sparkles text-fog-gray';
    }
    if (btn) {
        if (clickSparksEnabled) {
            btn.classList.add('border-emerald-500/50', 'bg-emerald-500/10', 'text-white');
            btn.classList.remove('border-white/20');
        } else {
            btn.classList.remove('border-emerald-500/50', 'bg-emerald-500/10');
            btn.classList.add('border-white/20');
        }
    }
}

function toggleClickSparks() {
    clickSparksEnabled = !clickSparksEnabled;
    try {
        localStorage.setItem('vag_click_sparks', clickSparksEnabled ? 'true' : 'false');
    } catch (e) { }
    syncSparksButtonUI();
    if (clickSparksEnabled) {
        spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 45, ['#186f64', '#536eff', '#ffffff', '#00f0ff', '#f5d061']);
        showToast('✨ Неоновые искры включены! Кликайте по экрану', true);
    } else {
        showToast('Искры клика выключены', true);
    }
}

// Window Click listener for sparks
window.addEventListener('click', (e) => {
    if (!clickSparksEnabled) return;
    const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' && e.target.id === 'terminal-input') return;
    spawnParticles(e.clientX, e.clientY, 10, ['#186f64', '#536eff', '#ffffff', '#f5d061', '#00f0ff']);
}, { passive: true });

function openTerminal() {
    const modal = document.getElementById('easter-egg-modal');
    if (!modal) return;
    initEggCanvas();
    modal.classList.remove('hidden');
    easterEggModalOpen = true;
    setTimeout(focusTerminalInput, 60);
}

function openEasterEggModal() {
    openTerminal();
}

function closeEasterEggModal() {
    const modal = document.getElementById('easter-egg-modal');
    if (modal) modal.classList.add('hidden');
    easterEggModalOpen = false;
}

function handleTerminalBackdropClick(e) {
    if (e.target && e.target.id === 'easter-egg-modal') {
        closeEasterEggModal();
    }
}

function triggerNitroBoost() {
    soundSystem.playNitroRoar();
    soundSystem.playPopsAndBangs(4);

    const overlay = document.getElementById('speed-lines-overlay');
    if (overlay) {
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 1100);
    }

    document.body.classList.remove('stage3-shake');
    void document.body.offsetWidth;
    document.body.classList.add('stage3-shake');
    setTimeout(() => document.body.classList.remove('stage3-shake'), 600);

    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 70, ['#186f64', '#536eff', '#ffffff', '#00f0ff']);
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

// Logo Click Trigger (Navigates to home tab; 5 rapid clicks triggers terminal)
function handleLogoClick(e) {
    if (e) e.preventDefault();
    switchTab('home');

    logoClickCount++;
    clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(() => {
        logoClickCount = 0;
    }, 2200);

    if (logoClickCount >= 5) {
        logoClickCount = 0;
        openTerminal();
        return false;
    } else if (logoClickCount >= 3) {
        showToast(`Доступ к терминалу: ещё ${5 - logoClickCount} клика...`, true);
    }
}

// Keyboard Triggers (Konami code, 'term', 'zsh', 'vag', 'stage3')
window.addEventListener('keydown', (e) => {
    const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' && e.target.id !== 'terminal-input') return;
    if (targetTag === 'textarea') return;

    if (e.key === 'Escape') {
        const legalModal = document.getElementById('legal-modal');
        if (legalModal && !legalModal.classList.contains('hidden')) {
            closeLegalModal();
            return;
        }
        const codeModal = document.getElementById('code-modal');
        if (codeModal && !codeModal.classList.contains('hidden')) {
            toggleCodeModal();
            return;
        }
        if (easterEggModalOpen) {
            closeEasterEggModal();
            return;
        }
    }

    if (easterEggModalOpen && e.target.id === 'terminal-input') return;

    const keyLower = e.key.toLowerCase();

    // Check Konami Code
    const expected = konamiSequence[konamiStep];
    const isMatch = (keyLower === expected) ||
        (expected === 'b' && (keyLower === 'b' || keyLower === 'и')) ||
        (expected === 'a' && (keyLower === 'a' || keyLower === 'ф'));

    if (isMatch) {
        konamiStep++;
        if (konamiStep === konamiSequence.length) {
            konamiStep = 0;
            openTerminal();
            return;
        }
    } else {
        konamiStep = 0;
    }

    // Word Buffer Check
    keyBuffer += keyLower;
    if (keyBuffer.length > 12) keyBuffer = keyBuffer.slice(-12);

    if (keyBuffer.endsWith('vag') || keyBuffer.endsWith('ваг') ||
        keyBuffer.endsWith('stage3') || keyBuffer.endsWith('turbo') || keyBuffer.endsWith('турбо')) {
        keyBuffer = '';
        openTerminal();
    } else if (keyBuffer.endsWith('term') || keyBuffer.endsWith('терм') ||
        keyBuffer.endsWith('terminal') || keyBuffer.endsWith('zsh') || keyBuffer.endsWith('bash')) {
        keyBuffer = '';
        openTerminal();
    }
});

function initTerminal() {
    const timeEl = document.getElementById('terminal-login-time');
    if (timeEl) {
        timeEl.innerText = new Date().toLocaleString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
    }

    const input = document.getElementById('terminal-input');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (terminalHistory.length > 0) {
                if (terminalHistoryIndex === -1) {
                    terminalHistoryIndex = terminalHistory.length - 1;
                } else if (terminalHistoryIndex > 0) {
                    terminalHistoryIndex--;
                }
                input.value = terminalHistory[terminalHistoryIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (terminalHistoryIndex !== -1) {
                if (terminalHistoryIndex < terminalHistory.length - 1) {
                    terminalHistoryIndex++;
                    input.value = terminalHistory[terminalHistoryIndex] || '';
                } else {
                    terminalHistoryIndex = -1;
                    input.value = '';
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const val = input.value.trim().toLowerCase();
            const cmds = ['help', 'about', 'skills', 'stack', 'projects', 'github', 'octavia', 'contact', 'sparks', 'clear', 'exit', 'whoami', 'date'];
            const match = cmds.find(c => c.startsWith(val));
            if (match) {
                input.value = match;
            }
        }
    });
}

function focusTerminalInput() {
    const input = document.getElementById('terminal-input');
    if (input) input.focus();
}

function clearTerminal() {
    const log = document.getElementById('terminal-log');
    if (log) log.innerHTML = '';
    focusTerminalInput();
}

function toggleTerminalExpand() {
    const win = document.getElementById('terminal-window');
    const screen = document.getElementById('terminal-screen');
    if (!win || !screen) return;
    terminalExpanded = !terminalExpanded;
    if (terminalExpanded) {
        win.classList.remove('max-w-2xl');
        win.classList.add('max-w-4xl');
        screen.classList.remove('h-[340px]', 'sm:h-[400px]');
        screen.classList.add('h-[520px]', 'sm:h-[620px]');
    } else {
        win.classList.add('max-w-2xl');
        win.classList.remove('max-w-4xl');
        screen.classList.add('h-[340px]', 'sm:h-[400px]');
        screen.classList.remove('h-[520px]', 'sm:h-[620px]');
    }
    focusTerminalInput();
}

async function handleTerminalSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('terminal-input');
    const log = document.getElementById('terminal-log');
    const screen = document.getElementById('terminal-screen');
    if (!input || !log) return;

    const cmd = input.value.trim();
    input.value = '';

    if (!cmd) return;

    terminalHistory.push(cmd);
    terminalHistoryIndex = -1;

    // Append entered command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'flex items-center gap-2 text-slate-300';
    cmdLine.innerHTML = `<span class="text-deep-teal font-bold select-none whitespace-nowrap">gleb:~/site$</span> <span>${escapeHtml(cmd)}</span>`;
    log.appendChild(cmdLine);

    // Process command
    const parts = cmd.split(/\s+/);
    const primary = parts[0].toLowerCase();

    const outputDiv = document.createElement('div');
    outputDiv.className = 'text-slate-300 text-xs sm:text-[13px] leading-relaxed pb-1';

    switch (primary) {
        case 'help':
            outputDiv.innerHTML = `
<div class="text-fog-gray space-y-0.5">
  <div class="text-white font-semibold mb-1">Доступные команды:</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">about</span> - краткая информация и досье</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">skills</span> - стек технологий и компетенции</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">projects</span> - инженерные проекты и репозитории</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">github</span> - live запрос публичных репозиториев GitHub</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">octavia</span> - досье Škoda Octavia A7 Black Edition</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">contact</span> - способы связи и Telegram</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">sparks</span> - управление искрами клика [on/off]</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">whoami</span> - идентификатор текущего пользователя</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">date</span> - текущее системное время</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">clear</span> - очистить экран</div>
  <div>  <span class="text-deep-teal font-bold w-24 inline-block">exit</span> - закрыть терминал (Esc)</div>
</div>`;
            break;

        case 'sparks':
        case 'sparkles':
        case 'cursor':
        case 'искры': {
            const subArg = parts[1] ? parts[1].toLowerCase() : '';
            if (subArg === 'on' || subArg === '1' || subArg === 'вкл' || subArg === 'true') {
                clickSparksEnabled = true;
            } else if (subArg === 'off' || subArg === '0' || subArg === 'выкл' || subArg === 'false') {
                clickSparksEnabled = false;
            } else {
                clickSparksEnabled = !clickSparksEnabled;
            }
            try {
                localStorage.setItem('vag_click_sparks', clickSparksEnabled ? 'true' : 'false');
            } catch (err) { }
            syncSparksButtonUI();

            if (clickSparksEnabled) {
                spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 50, ['#186f64', '#536eff', '#ffffff', '#00f0ff', '#f5d061']);
                outputDiv.innerHTML = `
<div class="space-y-1 text-emerald-400 font-mono">
  <div class="font-bold">✨ Эффект искр из-под курсора: ВКЛЮЧЕН [ACTIVE]</div>
  <div class="text-slate-300 text-xs">Кликайте в любой точке экрана для генерации неоновых импульсов.</div>
  <div class="text-slate-500 text-[11px]">Параметр сохранен. Для отключения введите: <span class="text-white">sparks off</span></div>
</div>`;
                showToast('✨ Неоновые искры включены! Кликайте по экрану', true);
            } else {
                outputDiv.innerHTML = `
<div class="space-y-1 text-slate-400 font-mono">
  <div class="text-slate-200 font-bold">Эффект искр из-под курсора: ВЫКЛЮЧЕН [DISABLED]</div>
  <div class="text-slate-500 text-xs">Для включения введите команду: <span class="text-emerald-400 font-bold">sparks on</span></div>
</div>`;
                showToast('Искры клика выключены', true);
            }
            break;
        }

        case 'about':
            outputDiv.innerHTML = `
<div class="space-y-1 text-slate-300">
  <div class="text-white font-bold">Глеб Вохрамеев (Gleb Vokhrameev)</div>
  <div class="text-fog-gray">Backend & Systems Developer • ИТМО (Санкт-Петербург)</div>
  <p class="text-slate-300 mt-1">
    Разрабатываю надежные распределенные серверные сервисы, Telegram-боты и решения на Java Spring Boot.
    Исследую низкоуровневые протоколы автомобильной телеметрии VAG CAN-Bus.
  </p>
</div>`;
            break;

        case 'skills':
        case 'stack':
            outputDiv.innerHTML = `
<div class="space-y-1 text-slate-300 font-mono">
  <div><span class="text-deep-teal font-bold">Backend:</span>    Java 17/21, Spring Boot, Spring Security, Python, REST APIs</div>
  <div><span class="text-deep-teal font-bold">Databases:</span>  PostgreSQL, Redis, Liquibase, Hibernate</div>
  <div><span class="text-deep-teal font-bold">Systems:</span>    macOS / Linux, zsh/bash, Docker, Git, iCal / Apple EventKit</div>
  <div><span class="text-deep-teal font-bold">Automotive:</span> CAN-Bus sniffer, VCDS, ODIS Service, Bosch ME17 ECU telemetry</div>
</div>`;
            break;

        case 'projects':
            outputDiv.innerHTML = `
<div class="space-y-2 text-slate-300">
  <div>
    <span class="text-white font-bold">1. SBLink Telegram Bot</span>
    <span class="text-fog-gray text-xs ml-2">[Java • Spring Boot • PostgreSQL]</span>
    <div class="text-fog-gray">Бот для распределенной обработки потоковых данных и ссылок.</div>
    <a href="https://github.com/GLEBBOFRI/SBLink" target="_blank" rel="noopener" class="text-deep-teal text-xs hover:underline">↳ github.com/GLEBBOFRI/SBLink</a>
  </div>
  <div>
    <span class="text-white font-bold">2. TestRain Platform</span>
    <span class="text-fog-gray text-xs ml-2">[Spring Boot • Redis • Security]</span>
    <div class="text-fog-gray">Платформа автоматизированного тестирования микросервисных архитектур.</div>
    <a href="https://github.com/GLEBBOFRI/TestRain" target="_blank" rel="noopener" class="text-deep-teal text-xs hover:underline">↳ github.com/GLEBBOFRI/TestRain</a>
  </div>
  <div>
    <span class="text-white font-bold">3. MyItmo to Apple Calendar</span>
    <span class="text-fog-gray text-xs ml-2">[Python • iCal • EventKit]</span>
    <div class="text-fog-gray">Синхронизация расписания ИТМО по токену в нативный Apple Calendar.</div>
    <a href="https://github.com/GLEBBOFRI/schedule" target="_blank" rel="noopener" class="text-deep-teal text-xs hover:underline">↳ github.com/GLEBBOFRI/schedule</a>
  </div>
</div>`;
            break;

        case 'github':
        case 'repos':
            outputDiv.innerHTML = `<div class="text-fog-gray"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Запрос данных с api.github.com/users/GLEBBOFRI/repos...</div>`;
            log.appendChild(outputDiv);
            if (screen) screen.scrollTop = screen.scrollHeight;

            try {
                const res = await fetch('https://api.github.com/users/GLEBBOFRI/repos?sort=updated&per_page=6');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const repos = await res.json();
                if (!Array.isArray(repos) || repos.length === 0) {
                    outputDiv.innerHTML = `<div class="text-amber-400">Репозитории не найдены или профиль скрыт.</div>`;
                } else {
                    let html = `<div class="text-white font-bold mb-1.5">Публичные репозитории @GLEBBOFRI:</div><div class="space-y-1.5">`;
                    repos.forEach(r => {
                        const lang = r.language ? `<span class="text-deep-teal font-mono text-[11px]">[${r.language}]</span>` : '';
                        const stars = r.stargazers_count > 0 ? ` ⭐ ${r.stargazers_count}` : '';
                        const desc = r.description ? `<div class="text-fog-gray text-[11px]">${escapeHtml(r.description)}</div>` : '';
                        html += `
<div>
  <a href="${r.html_url}" target="_blank" rel="noopener" class="text-white font-bold hover:underline">📁 ${escapeHtml(r.name)}</a>
  ${lang}${stars}
  ${desc}
</div>`;
                    });
                    html += `</div><div class="text-fog-gray text-[11px] mt-2">Всего публичных проектов: ${repos.length}. <a href="https://github.com/GLEBBOFRI" target="_blank" class="text-deep-teal underline">Открыть GitHub профиль ↗</a></div>`;
                    outputDiv.innerHTML = html;
                }
            } catch (err) {
                outputDiv.innerHTML = `
<div class="text-amber-400 text-xs">
  <div>Не удалось подключиться к GitHub API (лимит запросов или офлайн).</div>
  <div class="text-fog-gray mt-1">Основные репозитории:</div>
  <div>• <a href="https://github.com/GLEBBOFRI/SBLink" target="_blank" class="text-white underline">SBLink</a> (Java/Spring Boot)</div>
  <div>• <a href="https://github.com/GLEBBOFRI/TestRain" target="_blank" class="text-white underline">TestRain</a> (Spring Boot/Redis)</div>
  <div>• <a href="https://github.com/GLEBBOFRI/schedule" target="_blank" class="text-white underline">schedule</a> (Python/Apple Calendar)</div>
</div>`;
            }
            if (screen) screen.scrollTop = screen.scrollHeight;
            return;

        case 'octavia':
            outputDiv.innerHTML = `
<div class="space-y-1 text-slate-300 font-mono">
  <div class="text-white font-bold">Škoda Octavia A7 Black Edition (Typ 5E)</div>
  <div>  Кузов:        Лифтбек (Deep Black Pearl)</div>
  <div>  Двигатель:    1.6 MPI CWVA (EA211), 16V DOHC, 110 л.с., 155 Н·м</div>
  <div>  Трансмиссия:  6-ступенчатая гидротрансформаторная АКПП Aisin 09G</div>
  <div>  Диагностика:  VCDS / ODIS Service (CAN-Bus Gateway, Bosch ME17)</div>
  <div class="text-fog-gray text-xs mt-1">Инженерный стенд доступен во вкладке <span class="text-deep-teal font-bold">'Octavia A7'</span> на сайте.</div>
</div>`;
            break;

        case 'contact':
            outputDiv.innerHTML = `
<div class="space-y-1 text-slate-300">
  <div><span class="text-deep-teal font-bold">Telegram:</span>  <a href="https://t.me/TLVRLX" target="_blank" rel="noopener" class="text-white underline">@TLVRLX</a></div>
  <div><span class="text-deep-teal font-bold">GitHub:</span>    <a href="https://github.com/GLEBBOFRI" target="_blank" rel="noopener" class="text-white underline">github.com/GLEBBOFRI</a></div>
  <div><span class="text-deep-teal font-bold">Локация:</span>   Санкт-Петербург, Россия</div>
</div>`;
            break;

        case 'whoami':
            outputDiv.innerHTML = `<div class="text-emerald-400">gleb (uid=1000 gid=1000 groups=staff,admin,wheel)</div>`;
            break;

        case 'sudo':
            outputDiv.innerHTML = `<div class="text-red-400">gleb is not in the sudoers file. This incident will be reported.</div>`;
            break;

        case 'date':
            outputDiv.innerHTML = `<div>${new Date().toString()}</div>`;
            break;

        case 'clear':
            clearTerminal();
            return;

        case 'exit':
        case 'quit':
            closeEasterEggModal();
            return;

        default:
            outputDiv.innerHTML = `<div class="text-red-400">zsh: command not found: ${escapeHtml(primary)}. Введите <span class="text-deep-teal font-bold">'help'</span> для списка команд.</div>`;
            break;
    }

    log.appendChild(outputDiv);
    if (screen) {
        screen.scrollTop = screen.scrollHeight;
    }
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


// ==========================================
// 152-FZ COMPLIANCE & LEGAL MODAL SYSTEM
// ==========================================
let currentLegalTab = 'privacy';

function openLegalModal(tab = 'privacy') {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    switchLegalTab(tab);
}

function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (window.location.hash === '#privacy' || window.location.hash === '#consent') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
}

function handleLegalModalBackdrop(e) {
    if (e.target && e.target.id === 'legal-modal') {
        closeLegalModal();
    }
}

function switchLegalTab(tab = 'privacy') {
    currentLegalTab = tab;
    const tabPrivacyBtn = document.getElementById('legal-tab-privacy');
    const tabConsentBtn = document.getElementById('legal-tab-consent');
    const viewPrivacy = document.getElementById('legal-view-privacy');
    const viewConsent = document.getElementById('legal-view-consent');
    const bodyContainer = document.getElementById('legal-modal-body');

    if (tab === 'consent') {
        if (tabPrivacyBtn) {
            tabPrivacyBtn.className = 'px-3 py-1.5 rounded-[2px] text-xs font-mono text-fog-gray hover:text-white bg-white/5 whitespace-nowrap transition-colors';
        }
        if (tabConsentBtn) {
            tabConsentBtn.className = 'px-3 py-1.5 rounded-[2px] text-xs font-mono bg-deep-teal text-white font-bold whitespace-nowrap transition-colors';
        }
        if (viewPrivacy) viewPrivacy.classList.add('hidden');
        if (viewConsent) viewConsent.classList.remove('hidden');
    } else {
        if (tabPrivacyBtn) {
            tabPrivacyBtn.className = 'px-3 py-1.5 rounded-[2px] text-xs font-mono bg-deep-teal text-white font-bold whitespace-nowrap transition-colors';
        }
        if (tabConsentBtn) {
            tabConsentBtn.className = 'px-3 py-1.5 rounded-[2px] text-xs font-mono text-fog-gray hover:text-white bg-white/5 whitespace-nowrap transition-colors';
        }
        if (viewPrivacy) viewPrivacy.classList.remove('hidden');
        if (viewConsent) viewConsent.classList.add('hidden');
    }
    if (bodyContainer) {
        bodyContainer.scrollTop = 0;
    }
}

function printLegalDoc() {
    const activeView = currentLegalTab === 'consent'
        ? document.getElementById('legal-view-consent')
        : document.getElementById('legal-view-privacy');

    if (!activeView) {
        window.print();
        return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
        window.print();
        return;
    }

    printWin.document.write(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="utf-8">
            <title>${currentLegalTab === 'consent' ? 'Согласие на обработку персональных данных' : 'Политика конфиденциальности (152-ФЗ)'}</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111; padding: 40px; max-width: 800px; margin: 0 auto; font-size: 14px; }
                h2 { font-size: 20px; border-bottom: 2px solid #ccc; padding-bottom: 8px; margin-bottom: 20px; }
                h3 { font-size: 15px; margin-top: 20px; margin-bottom: 8px; }
                p, li { margin-bottom: 8px; color: #333; }
                ul { padding-left: 20px; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            ${activeView.innerHTML}
        </body>
        </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
        try {
            printWin.print();
        } catch (e) { }
    }, 250);
}

// ==========================================
// COOKIE & LOCALSTORAGE BANNER SYSTEM
// ==========================================
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.classList.remove('pointer-events-none', 'translate-y-8', 'opacity-0');
    banner.classList.add('translate-y-0', 'opacity-100');
}

function initCookieBanner() {
    // Show banner reliably on site entry across all devices (PC, tablet, mobile)
    setTimeout(() => {
        showCookieBanner();
    }, 500);
}

function acceptCookieConsent() {
    try {
        localStorage.setItem('gv_cookie_consent', 'accepted');
    } catch (e) { }
    dismissCookieBanner();
    showToast('Настройки конфиденциальности приняты', true);
}

function dismissCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.classList.remove('translate-y-0', 'opacity-100');
    banner.classList.add('translate-y-8', 'opacity-0', 'pointer-events-none');
}

function initDeepLinking() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'privacy' || hash === 'consent') {
        openLegalModal(hash);
    } else if (hash && ['home', 'about', 'octavia', 'portfolio', 'contact'].includes(hash)) {
        switchTab(hash);
    }
}

window.addEventListener('hashchange', () => {
    initDeepLinking();
});

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTerminal();
        initEggCanvas();
        syncSparksButtonUI();
        initDeepLinking();
        initCookieBanner();
    });
} else {
    initTerminal();
    initEggCanvas();
    syncSparksButtonUI();
    initDeepLinking();
    initCookieBanner();
}

console.log(
    "%cGLEB VOKHRAMEEV // DEV %c| Открыть терминал: нажми 5 раз на логотип GV или введи 'term'",
    "background: #191b1f; color: #186f64; font-weight: bold; padding: 4px 8px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.1);",
    "color: #9fabad; font-size: 11px;"
);
