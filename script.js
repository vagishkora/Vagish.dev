// Configuration
const CONFIG = {
    animationThreshold: 0.01,
    scrollOffset: 100
};



// --- Scroll Animations (Intersection Observer) ---
class ScrollAnimator {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.animationThreshold,
            rootMargin: '50px'
        });

        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            this.observer.observe(el);
            // Check if already in viewport
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animate-fade-in-up');
                el.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }
}

// --- Contact Form Handler (Web3Forms) ---
class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.btn = this.form.querySelector('button[type="submit"]');
            this.loadingIcon = document.getElementById('loading-icon');
            this.sendIcon = document.getElementById('send-icon');
            this.init();
        }
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // UI State: Loading
        this.setLoading(true);
        const btnText = this.btn.querySelector('span');
        const originalText = btnText.textContent;
        btnText.textContent = "Sending...";

        // Prepare Data
        const formData = new FormData(this.form);
        const object = Object.fromEntries(formData);

        // IMPORTANT: Replace this with your actual Access Key from Web3Forms
        object.access_key = '1c2c1346-e1f5-4e8c-9f1a-078ec5d2c3fd';

        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {
                // UI State: Success
                this.setLoading(false);
                btnText.textContent = "Message Sent!";
                this.btn.classList.remove('bg-primary', 'hover:bg-primary/90');
                this.btn.classList.add('bg-green-600', 'hover:bg-green-700');
                this.form.reset();

                // Reset Button after 3s
                setTimeout(() => {
                    btnText.textContent = originalText;
                    this.btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    this.btn.classList.add('bg-primary', 'hover:bg-primary/90');
                }, 3000);
            } else {
                throw new Error(result.message || "Submission failed");
            }
        } catch (error) {
            console.error(error);
            // UI State: Error
            this.setLoading(false);
            btnText.textContent = "Error! Try Again.";
            this.btn.classList.add('bg-red-600');

            setTimeout(() => {
                btnText.textContent = originalText;
                this.btn.classList.remove('bg-red-600');
            }, 3000);
        }
    }

    setLoading(isLoading) {
        if (!this.btn || !this.loadingIcon || !this.sendIcon) return;

        if (isLoading) {
            this.btn.disabled = true;
            this.loadingIcon.classList.remove('hidden');
            this.sendIcon.classList.add('hidden');
        } else {
            this.btn.disabled = false;
            this.loadingIcon.classList.add('hidden');
            this.sendIcon.classList.remove('hidden');
        }
    }
}



// --- FUSION LOGIC (Interceptor) ---
class BioIgnition {
    constructor() {
        this.btn = document.getElementById('bio-start');
        if (!this.btn) return;

        this.init();
    }

    init() {
        if (this.btn) {
            this.btn.addEventListener('click', () => this.startSequence());
        }
    }

    startSequence() {
        // Play Audio (Removed)
        // const audio = new AudioEngine();
        // audio.playEngineStart();

        // Haptic Feedback
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        // Visual Feedback
        this.btn.classList.add('animate-pulse');
        this.btn.style.borderColor = '#10B981'; // Success Green
        this.btn.style.boxShadow = '0 0 20px #10B981';

        const text = this.btn.querySelector('span');
        if (text) text.innerText = 'ACCESS GRANTED';

        // Smooth Scroll to Work
        setTimeout(() => {
            document.getElementById('work').scrollIntoView({ behavior: 'smooth' });

            // Reset Button
            setTimeout(() => {
                this.btn.classList.remove('animate-pulse');
                this.btn.style.borderColor = '';
                this.btn.style.boxShadow = '';
                if (text) text.innerText = 'INITIALIZE SYSTEM';
            }, 2000);
        }, 800);
    }
}

// RadarChart class removed as it has been replaced by the Skill Grid HTML/CSS.

class BMWCursor {
    constructor() {
        this.cursor = document.getElementById('bmw-cursor');
        if (!this.cursor) return;

        // Disable completely on mobile / touch pointer devices for buttery-smooth mobile execution!
        if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window || window.innerWidth < 640) {
            this.cursor.style.display = 'none';
            return;
        }

        this.trails = [];
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.cursorX = this.mouseX;
        this.cursorY = this.mouseY;
        this.time = 0;

        // Create 10 trails (Bigger size and quantity for impact)
        const mColors = ['#35A3D8', '#182C7D', '#E11A2B', '#35A3D8', '#182C7D', '#E11A2B', '#35A3D8', '#182C7D', '#35A3D8', '#182C7D'];
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = `m-trail`;
            trail.style.backgroundColor = mColors[i];
            trail.style.boxShadow = `0 0 15px ${mColors[i]}`;
            // Different sizes for a "tapered" look (Even bigger now)
            const size = 16 - (i * 1.2);
            trail.style.width = `${Math.max(size, 4)}px`;
            trail.style.height = `${Math.max(size, 4)}px`;
            trail.style.opacity = 0.9 - (i * 0.08);

            document.body.appendChild(trail);
            this.trails.push({
                el: trail,
                x: this.cursorX,
                y: this.cursorY,
                delay: 0.15 + (i * 0.05)
            });
        }

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover Effects
        document.querySelectorAll('a, button, .project-card, input').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hovering'));
        });

        this.animate();
    }

    animate() {
        this.time += 0.05;

        // Main Cursor (Smooth slow follow)
        const lerp = 0.15; // Lower lerp for more fluid feel
        this.cursorX += (this.mouseX - this.cursorX) * lerp;
        this.cursorY += (this.mouseY - this.cursorY) * lerp;

        // Rotation based on movement (smoothed)
        const dx = this.mouseX - this.cursorX;
        const dy = this.mouseY - this.cursorY;
        const targetAngle = Math.atan2(dy, dx) * 180 / Math.PI;

        // Apply transform to main cursor (Translate + Rotation)
        this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0) translate(-50%, -50%) rotate(${targetAngle + 45}deg)`;

        // Trails (Advanced wavy physics)
        this.trails.forEach((trail, i) => {
            // Smoothly move towards the previous trail or cursor
            const targetX = i === 0 ? this.cursorX : this.trails[i - 1].x;
            const targetY = i === 0 ? this.cursorY : this.trails[i - 1].y;

            trail.x += (targetX - trail.x) * (0.2);
            trail.y += (targetY - trail.y) * (0.2);

            // Add a natural "flowing" wave offset based on index and time
            const waveX = Math.sin(this.time * 2 + i * 0.8) * 3;
            const waveY = Math.cos(this.time * 2 + i * 0.8) * 3;

            trail.el.style.transform = `translate3d(${trail.x + waveX}px, ${trail.y + waveY}px, 0) translate(-50%, -50%)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// --- Gear Shift Navigation Logic ---
class GearNav {
    constructor() {
        this.gears = document.querySelectorAll('.gear-item');
        this.sections = [];
        this.init();
    }

    init() {
        if (!this.gears.length) return;

        // Map gears to sections
        this.gears.forEach(gear => {
            const targetId = gear.getAttribute('data-target');
            const section = document.querySelector(targetId);
            if (section) {
                this.sections.push({ gear, section, id: targetId });

                // Click to scroll
                gear.addEventListener('click', () => {
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                });
            }
        });

        // Observer for active state
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveGear(entry.target.id);
                }
            });
        }, { threshold: 0.5 }); // 50% visible

        this.sections.forEach(item => observer.observe(item.section));
    }

    setActiveGear(sectionId) {
        this.gears.forEach(gear => {
            const target = gear.getAttribute('data-target');
            if (target === `#${sectionId}`) {
                gear.classList.add('active');
            } else {
                gear.classList.remove('active');
            }
        });
    }
}

// --- Mobile Navigation Logic ---
class MobileMenu {
    constructor() {
        this.btn = document.getElementById('mobile-menu-btn');
        this.menu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        if (!this.btn || !this.menu) return;

        this.btn.addEventListener('click', () => {
            this.menu.classList.toggle('hidden');
        });

        // Close on link click
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.menu.classList.add('hidden');
            });
        });
    }
}

// --- Start Sequence (Push Start) Removed ---

// --- Holographic Deck Logic ---
// --- 3D Certificate Carousel Logic ---
class HolographicDeck {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.nextBtn = document.getElementById('next-cert');
        this.prevBtn = document.getElementById('prev-cert');

        this.certs = [
            { title: "Ethical Hacking Workshop", issuer: "Ethical Edufabrica Pvt Ltd", key: "certificates/iicsbanglore.jpeg" },
            { title: "Cybersecurity Job Simulation", issuer: "Mastercard", key: "certificates/Cybersecurity Job Simulation Mastercard_page-0001.jpg" },
            { title: "Cybersecurity Analyst", issuer: "Tata", key: "certificates/Cybersecurity Analyst Job Simulation TATA - Forage_page-0001.jpg" },
            { title: "AI & Data Analytics", issuer: "AICTE", key: "certificates/Vagish N Kora_AICTE_Certificate_page-0001.jpg" },
            { title: "Internship Completion", issuer: "Karunadu Tech", key: "certificates/karunadu internship certificate_page-0001.jpg" },
            { title: "Data Visualization", issuer: "Accenture", key: "certificates/accenture data_visulatization_completion_certificate_page-0001.jpg" },
            { title: "Data Plus Overview", issuer: "TCS", key: "certificates/TSC Data Plus Overview Course_page-0001.jpg" },
            { title: "Hashgraph Developer", issuer: "Hedera", key: "certificates/Vagish_Kora_Hashgraph Developer Course_certificate_page-0001.jpg" },
            { title: "Career Edge", issuer: "TCS", key: "certificates/Tcs Certificate._page-0001.jpg" },
            { title: "Fundamentals of AI & ML", issuer: "Course Completion", key: "certificates/Fundamentals of AI&ML certification_page-0001.jpg" },
            { title: "AI for Metaverse", issuer: "Metaverse Cert", key: "certificates/Introduction to AI For Metaverse Certification_page-0001.jpg" },
            { title: "Info & Cyber Security", issuer: "Fundamentals", key: "certificates/Fundamentals of Information Security-Cyber Security_page-0001.jpg" }
        ];

        this.currentIndex = 0;
        this.cards = [];
        this.init();
    }

    init() {
        if (!this.track) return;
        this.track.innerHTML = '';

        // Create Cards
        this.certs.forEach((cert, index) => {
            const card = this.createCard(cert, index);
            this.cards.push(card);
            this.track.appendChild(card);
        });

        // Initialize Positions
        this.updateCarousel();

        // Event Listeners
        this.nextBtn?.addEventListener('click', () => this.rotate(1));
        this.prevBtn?.addEventListener('click', () => this.rotate(-1));

        // Keyboard Nav
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.rotate(1);
            if (e.key === 'ArrowLeft') this.rotate(-1);
        });
    }

    createCard(cert, index) {
        const card = document.createElement('div');
        // Base styles for 3D card
        card.className = 'absolute w-64 md:w-80 h-48 md:h-60 rounded-xl bg-surface/90 border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer hover:border-primary/50';

        // Image
        const img = document.createElement('img');
        img.src = cert.key;
        img.alt = cert.title;
        img.className = 'w-full h-full object-contain p-2 filter brightness-90';

        // Add click to view
        card.addEventListener('click', () => {
            if (this.getDistanceFromCenter(index) === 0) {
                window.open(cert.key, '_blank');
            } else {
                this.rotateTo(index);
            }
        });

        card.appendChild(img);
        return card;
    }

    getDistanceFromCenter(index) {
        const total = this.certs.length;
        let diff = (index - this.currentIndex + total) % total;
        if (diff > total / 2) diff -= total;
        return diff;
    }

    rotate(dir) {
        const total = this.certs.length;
        this.currentIndex = (this.currentIndex + dir + total) % total;
        this.updateCarousel();
    }

    rotateTo(targetIndex) {
        this.currentIndex = targetIndex;
        this.updateCarousel();
    }

    updateCarousel() {
        const total = this.certs.length;

        this.cards.forEach((card, index) => {
            const diff = this.getDistanceFromCenter(index);

            // 3D Transforms logic
            let transform = '';
            let zIndex = 0;
            let opacity = 0;
            let pointerEvents = 'none';

            if (diff === 0) {
                // Center Active
                transform = 'translateX(0) scale(1.2) rotateY(0deg)';
                zIndex = 50;
                opacity = 1;
                pointerEvents = 'auto';
                card.style.filter = 'brightness(1.1)';
            } else if (Math.abs(diff) === 1) {
                // Immediate Neighbors
                const dir = diff > 0 ? 1 : -1; // 1 is right, -1 is left
                transform = `translateX(${dir * 120}%) scale(0.9) rotateY(${-dir * 25}deg)`;
                zIndex = 40;
                opacity = 0.7;
                pointerEvents = 'auto';
                card.style.filter = 'brightness(0.6)';
            } else if (Math.abs(diff) === 2) {
                // Far Neighbors
                const dir = diff > 0 ? 1 : -1;
                transform = `translateX(${dir * 200}%) scale(0.7) rotateY(${-dir * 45}deg)`;
                zIndex = 30;
                opacity = 0.4;
                card.style.filter = 'brightness(0.4)';
            } else {
                // Hidden
                transform = 'translateX(0) scale(0) opacity(0)';
                opacity = 0;
            }

            // Apply styles
            card.style.transform = transform;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.pointerEvents = pointerEvents;
        });
    }
}


class ArchiveManager {
    constructor() {
        this.toggleBtn = document.getElementById('toggle-archive');
        this.archiveSection = document.getElementById('projects-archive');
        if (this.toggleBtn && this.archiveSection) {
            this.init();
        }
    }

    init() {
        this.toggleBtn.addEventListener('click', () => {
            const isHidden = this.archiveSection.classList.contains('hidden');
            if (isHidden) {
                this.archiveSection.classList.remove('hidden');
                this.archiveSection.scrollIntoView({ behavior: 'smooth' });
                this.toggleBtn.innerHTML = '<span class="relative z-10">CLOSE PROJECT ARCHIVE &uarr;</span>';
            } else {
                this.archiveSection.classList.add('hidden');
                this.toggleBtn.innerHTML = '<span class="relative z-10">VIEW PROJECT ARCHIVE &darr;</span>';
                document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}


// --- Outreach Carousel Logic ---
class OutreachCarousel {
    constructor() {
        this.track = document.getElementById('outreach-track');
        this.nextBtn = document.getElementById('next-outreach');
        this.prevBtn = document.getElementById('prev-outreach');

        this.items = [
            {
                title: "Ethical Hacking Workshop",
                org: "Participant • Ethical Edufabrica @ Pravega, IISc Bangalore",
                date: "15th & 16th Nov 2025",
                img: "assets/IISc_Banglore.jpeg",
                desc: "Completed a two-day intensive workshop gaining hands-on exposure to cybersecurity concepts and defensive techniques.",
                curriculum: ["Kali Linux & Tools", "Threat Methodologies", "VM Security", "Phishing & SQL Injection(for educational purpose only)"],
                color: "accent-pink"
            },
            {
                title: "Cyber Awareness Speaker",
                org: "Speaker • Belman PU College",
                date: "30th Oct 2025",
                img: "assets/speaking.png",
                desc: "Leading interactive sessions to educate students on digital safety and the evolving threat landscape.",
                curriculum: ["Scam Detection", "Social Engineering", "Fake Giveaways", "Digital Hygiene"],
                color: "secondary"
            }
        ];

        this.currentIndex = 0;
        this.cards = [];
        this.init();
    }

    init() {
        if (!this.track) return;
        this.track.innerHTML = '';

        this.items.forEach((item, index) => {
            const card = this.createCard(item, index);
            this.cards.push(card);
            this.track.appendChild(card);
        });

        this.updateCarousel();

        this.nextBtn?.addEventListener('click', () => this.rotate(1));
        this.prevBtn?.addEventListener('click', () => this.rotate(-1));
    }

    createCard(item, index) {
        const card = document.createElement('div');
        const colorClass = item.color === 'accent-pink' ? 'accent-pink' : 'secondary';

        card.className = `absolute w-full md:w-[800px] h-auto min-h-[320px] bg-surface border border-white/10 rounded-xl p-5 md:p-8 transition-all duration-500 ease-out group overflow-hidden shadow-2xl`;

        card.innerHTML = `
            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div class="absolute top-0 right-0 w-[150%] h-[150%] bg-${colorClass}/10 -rotate-45 transform translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div class="flex flex-col md:flex-row gap-4 md:gap-8 items-center h-full">
                <div class="shrink-0 relative w-full md:w-72 h-40 md:h-48 rounded-lg overflow-hidden border border-white/10 group-hover:border-${colorClass}/50 transition-colors">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>

                <div class="flex-1 space-y-2">
                    <div>
                        <h3 class="text-xl font-bold text-white group-hover:text-${colorClass} transition-colors">${item.title}</h3>
                        <p class="text-gray-400 font-mono text-sm mt-1">${item.org}</p>
                        <p class="text-gray-500 text-xs mt-1">${item.date}</p>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed">${item.desc}</p>
                    <ul class="grid grid-cols-2 gap-2 text-xs text-gray-400">
                        ${item.curriculum.map(c => `<li class="flex items-center gap-2"><span class="text-${colorClass}">➜</span> ${c}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        return card;
    }

    rotate(dir) {
        const total = this.items.length;
        this.currentIndex = (this.currentIndex + dir + total) % total;
        this.updateCarousel();
    }

    updateCarousel() {
        this.cards.forEach((card, index) => {
            const total = this.items.length;
            let diff = (index - this.currentIndex + total) % total;
            if (diff > total / 2) diff -= total;

            let transform = '';
            let zIndex = 0;
            let opacity = 0;
            let visibility = 'hidden';

            if (diff === 0) {
                transform = 'translateX(0) scale(1) translateZ(0)';
                zIndex = 50;
                opacity = 1;
                visibility = 'visible';
            } else if (diff === 1 || diff === -1) {
                const dir = diff > 0 ? 1 : -1;
                transform = `translateX(${dir * 105}%) scale(0.8) translateZ(-100px) rotateY(${-dir * 15}deg)`;
                zIndex = 40;
                opacity = 0.5;
                visibility = 'visible';
            } else {
                transform = 'scale(0)';
                opacity = 0;
            }

            card.style.transform = transform;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.visibility = visibility;
        });
    }
}




/* --- ScrollStack Logic ---
class ScrollStack {
    constructor() {
        this.scroller = document.getElementById('projects-scroller');
        if (!this.scroller) return;

        this.cards = Array.from(this.scroller.querySelectorAll('.scroll-stack-card'));
        this.endElement = this.scroller.querySelector('.scroll-stack-end');
        if (!this.cards.length) return;

        this.itemDistance = 40;
        this.itemScale = 0.03;
        this.itemStackDistance = 30;
        this.stackPosition = '20%';
        this.scaleEndPosition = '10%';
        this.baseScale = 0.9;
        this.rotationAmount = 0;
        this.blurAmount = 0;

        this.lastTransforms = new Map();
        this.isUpdating = false;

        this.init();
    }

    init() {
        this.cards.forEach((card, i) => {
            if (i < this.cards.length - 1) {
                card.style.marginBottom = `${this.itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.webkitTransform = 'translateZ(0)';
            card.style.perspective = '1000px';
            card.style.webkitPerspective = '1000px';
        });

        if (window.Lenis) {
            this.lenis = new window.Lenis({
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1
            });

            this.lenis.on('scroll', () => this.updateCardTransforms());

            const raf = (time) => {
                this.lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        } else {
            // Fallback if Lenis not loaded
            window.addEventListener('scroll', () => this.updateCardTransforms());
        }

        this.updateCardTransforms();
    }

    calculateProgress(scrollTop, start, end) {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }

    parsePercentage(value, containerHeight) {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }

    getStableOffset(element) {
        let offset = 0;
        let el = element;
        while(el) {
            offset += el.offsetTop;
            el = el.offsetParent;
        }
        return offset;
    }

    updateCardTransforms() {
        if (this.isUpdating) return;
        this.isUpdating = true;

        const scrollTop = window.scrollY;
        const containerHeight = window.innerHeight;

        const stackPositionPx = this.parsePercentage(this.stackPosition, containerHeight);
        const scaleEndPositionPx = this.parsePercentage(this.scaleEndPosition, containerHeight);

        const endElementTop = this.endElement ? this.getStableOffset(this.endElement) : 0;

        this.cards.forEach((card, i) => {
            if (!card) return;

            const cardTop = this.getStableOffset(card);
            const triggerStart = cardTop - stackPositionPx - this.itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - this.itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = this.calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = this.baseScale + i * this.itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = this.rotationAmount ? i * this.rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (this.blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < this.cards.length; j++) {
                    const jCardTop = this.getStableOffset(this.cards[j]);
                    const jTriggerStart = jCardTop - stackPositionPx - this.itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * this.blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + this.itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + this.itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = this.lastTransforms.get(i);
            const hasChanged = !lastTransform || 
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;
                this.lastTransforms.set(i, newTransform);
            }
        });

        this.isUpdating = false;
    }
}
*/

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
    new FormHandler();
    new BioIgnition();
    new BMWCursor();
    new MobileMenu();
    new GearNav();
    new HolographicDeck();
    new OutreachCarousel();
    // new TacticalAI();
    new ArchiveManager();
});
