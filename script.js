// Cosmic Canvas Particles Simulation
const canvas = document.getElementById('cosmic-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.2;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = Math.random() > 0.6 ? 'rgba(16, 185, 129, 0.6)' : (Math.random() > 0.5 ? 'rgba(245, 158, 11, 0.5)' : 'rgba(0, 245, 212, 0.4)');
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            else if (this.x < 0) this.x = width;

            if (this.y > height) this.y = 0;
            else if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(80, Math.floor((width * height) / 12000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 - distance / 3000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('open');
    });
});

// Musaffa Interactive Simulation Demo
let simRunning = false;
let simInterval = null;
let simStep = 0; // 0 = Ayah 1 (Sheikh), 1 = Ayah 2 (You), 2 = Ayah 3 (Sheikh)
let simTimerSec = 0;

function toggleMusaffaSimulation() {
    const btn = document.getElementById('simToggleBtn');
    const btnIcon = document.getElementById('simBtnIcon');
    const btnText = document.getElementById('simBtnText');
    const statusText = document.getElementById('simStatusText');
    const timerDisplay = document.getElementById('simTimer');

    if (!simRunning) {
        simRunning = true;
        btnIcon.textContent = '⏹';
        btnText.textContent = 'Pause Simulation';
        simStep = 0;
        simTimerSec = 0;
        runMusaffaStep();

        simInterval = setInterval(() => {
            simTimerSec++;
            const mins = String(Math.floor(simTimerSec / 60)).padStart(2, '0');
            const secs = String(simTimerSec % 60).padStart(2, '0');
            timerDisplay.textContent = `${mins}:${secs}`;
        }, 1000);
    } else {
        stopMusaffaSimulation();
    }
}

function stopMusaffaSimulation() {
    simRunning = false;
    clearInterval(simInterval);
    clearTimeout(window.stepTimeout);
    const btnIcon = document.getElementById('simBtnIcon');
    const btnText = document.getElementById('simBtnText');
    const statusText = document.getElementById('simStatusText');
    btnIcon.textContent = '▶';
    btnText.textContent = 'Start Musaffa Simulation';
    statusText.textContent = 'Simulation paused. Click to restart.';
}

function runMusaffaStep() {
    if (!simRunning) return;

    const ayah1 = document.getElementById('ayah1');
    const ayah2 = document.getElementById('ayah2');
    const ayah3 = document.getElementById('ayah3');
    const statusText = document.getElementById('simStatusText');

    ayah1.classList.remove('active');
    ayah2.classList.remove('active');
    ayah3.classList.remove('active');

    if (simStep === 0) {
        ayah1.classList.add('active');
        statusText.innerHTML = '🎙️ <strong>Sheikh Al-Husary</strong> reciting Ayah 1 (Listen & calibrate Tajweed)...';
        window.stepTimeout = setTimeout(() => {
            if (simRunning) {
                simStep = 1;
                runMusaffaStep();
            }
        }, 4000);
    } else if (simStep === 1) {
        ayah2.classList.add('active');
        statusText.innerHTML = '✨ <strong>Your Turn:</strong> Recite Ayah 2 from your memory now!';
        window.stepTimeout = setTimeout(() => {
            if (simRunning) {
                simStep = 2;
                runMusaffaStep();
            }
        }, 4500);
    } else if (simStep === 2) {
        ayah3.classList.add('active');
        statusText.innerHTML = '🎙️ <strong>Sheikh Al-Husary</strong> taking next turn on Ayah 3...';
        window.stepTimeout = setTimeout(() => {
            if (simRunning) {
                simStep = 0;
                runMusaffaStep();
            }
        }, 4000);
    }
}

// Slider Demo Interactivity
function updateSliderDemo(value) {
    const indicator = document.getElementById('sliderAyahIndicator');
    const currentAyah = Math.max(1, Math.ceil((value / 100) * 10));
    indicator.textContent = `Ayah ${currentAyah} (Fingertip Synced)`;
}

// Voice Sample Audio Preview Simulation Toast
function playVoiceSample(reciterName) {
    const toast = document.getElementById('audioToast');
    const msg = document.getElementById('toastMsg');
    msg.textContent = `Now Playing Tajweed Preview: ${reciterName}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
