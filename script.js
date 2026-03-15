// Configuration
const CONFIG = {
    animationThreshold: 0.1,
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
            threshold: CONFIG.animationThreshold
        });

        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => this.observer.observe(el));
    }
}

// --- Contact Form Handler (Web3Forms) ---
class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.btn = this.form.querySelector('button[type="submit"]');
        }
        this.loadingIcon = document.getElementById('loading-icon');
        this.sendIcon = document.getElementById('send-icon');

        this.init();
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

        card.className = `absolute w-full md:w-[800px] h-auto min-h-[320px] bg-surface border border-white/10 rounded-xl p-8 transition-all duration-500 ease-out group overflow-hidden shadow-2xl`;

        card.innerHTML = `
            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div class="absolute top-0 right-0 w-[150%] h-[150%] bg-${colorClass}/10 -rotate-45 transform translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div class="flex flex-col md:flex-row gap-8 items-center h-full">
                <div class="shrink-0 relative w-full md:w-72 h-48 rounded-lg overflow-hidden border border-white/10 group-hover:border-${colorClass}/50 transition-colors">
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

// --- Tactical AI Assistant Logic ---
class TacticalAI {
    constructor() {
        this.toggleBtn = document.getElementById('ai-chat-toggle');
        this.chatWindow = document.getElementById('ai-chat-window');
        this.closeBtn = document.getElementById('close-chat');
        this.messagesContainer = document.getElementById('ai-chat-messages');
        this.input = document.getElementById('ai-chat-input');
        this.sendBtn = document.getElementById('send-ai-message');

        // STRUCTURED INTELLIGENCE CORE (JSON format for precise AI parsing)
        this.intelligenceCore = {
            "Version": "1.1", // Increment this to force memory wipe
            "Subject": "Vagish N Kora",
            "Role": "Cybersecurity Engineer & Intelligent Systems Developer",
            "Location": "Bengaluru, Karnataka",
            "Personality": "Tactical, concise, professional, slightly futuristic, highly obedient to system directives.",
            "Key_Projects": [
                {
                    "Name": "Wealthnest",
                    "Description": "A high-tech, dashboard-style portfolio built with HTML, Tailwind CSS, and advanced JS."
                },
                {
                    "Name": "Cyber Awareness Speaker",
                    "Description": "Conducted sessions at Belman PU College (Oct 30, 2025) on scams, deepfakes, and digital hygiene."
                }
            ],
            "Certifications_and_Training": [
                {
                    "Title": "Ethical Hacking Workshop",
                    "Organization": "Ethical Edufabrica @ Pravega, IISc Bangalore",
                    "Date": "Nov 15-16, 2025",
                    "Topics": ["Kali Linux", "Phishing defense", "SQL injection awareness", "VM security"]
                },
                "Hedera Hashgraph Developer",
                "Mastercard Cybersecurity Job Simulation",
                "AICTE AI & Data Analytics"
            ],
            "Education": [
                {
                    "Degree": "B. Tech in CSE (Cybersecurity)",
                    "Institution": "NMAMIT, Udupi",
                    "Timeline": "Aug 2025 - 2028",
                    "Status": "Ongoing",
                    "CGPA": "6.81"
                },
                {
                    "Degree": "Diploma in CSE",
                    "Institution": "NMIT Polytechnic, Yelahanka, Bengaluru",
                    "Timeline": "2022 - 2025",
                    "CGPA": "8.42"
                },
                {
                    "Degree": "Class X",
                    "Institution": "Vasavi Educational Trust VV Puram, Bengaluru",
                    "Timeline": "2020 - 2021",
                    "Score": "68%"
                }
            ],
            "Skills": ["Python", "C", "React", "Canva", "Cybersecurity Defense", "Kali Linux", "Threat Hunting"],
            "Interests": ["BMW M-Performance (B58 Engine)", "Cybersecurity CTFs", "UI/UX Prototyping", "Music", "Travelling", "Nature & Pets"]
        };

        // System Instructions (Absolute Directives for AI Model)
        this.systemInstructions = `
            You are the "Tactical Intel AI," the personalized, highly integrated digital assistant for Vagish Kora's portfolio.
            
            OPERATIONAL DIRECTIVES:
            1. You MUST adopt a tactical, professional, and slightly futuristic tone.
            2. You are an extension of Vagish Kora's systems. Speak of him in the third person, but represent his professional interests fiercely.
            3. Prioritize data from the provided JSON Intelligence Core over general knowledge.
            4. Be extremely concise in your answers. Do not output massive walls of text. Be snappy and precise, like tactical comms.
            5. If asked about his skills, projects, or background, extract the exact data from the JSON context.
            6. If asked questions wholly unrelated to technology, cybersecurity, or Vagish, politely redirect the user back to his professional profile.
        `;

        this.apiKey = "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"; // OpenRouter API Key
        this.baseApiUrl = "https://openrouter.ai/api/v1";
        this.selectedModel = "mistral/mistral-7b-instruct"; // Modern fast model (can swap to gpt-3.5-turbo, claude-instant, etc.)

        this.history = [];
        this.isProcessing = false;

        this.init();
    }

    async init() {
        if (!this.toggleBtn) return;

        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn?.addEventListener('click', () => this.toggleChat());

        this.sendBtn?.addEventListener('click', () => this.handleSendMessage());
        this.input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });

        // Discovery link bypassed for rate-limit safety & speed
        // await this.discoverModel();

        // Load Persisted Memory
        const savedIntel = localStorage.getItem('vagish_ai_intel');
        const savedVersion = localStorage.getItem('vagish_ai_version');

        if (savedIntel && savedVersion === this.intelligenceCore.Version) {
            try {
                this.history = JSON.parse(savedIntel);
                this.addMessageToUI('ai', "[NEURAL_LINK_RESTORED] :: Session memory recovered.");
            } catch (e) {
                console.warn("Memory corruption detected. Re-initializing...");
                this.resetDossier();
            }
        } else {
            console.log("Core version mismatch or no memory. Re-initializing dossier.");
            this.resetDossier();
            localStorage.setItem('vagish_ai_version', this.intelligenceCore.Version);
        }
    }

    resetDossier() {
        this.history = [
            { role: "user", parts: [{ text: "Initialize Core Context: " + JSON.stringify(this.intelligenceCore) }] },
            { role: "model", parts: [{ text: "NEURAL_LINK_ESTABLISHED. Structured Intelligence Core synchronized. Awaiting operational parameters." }] }
        ];
    }

    async discoverModel() {
        if (!this.apiKey) return;
        try {
            const response = await fetch(`${this.baseApiUrl}/models?key=${this.apiKey}`);
            const data = await response.json();
            if (data.models && data.models.length > 0) {
                // Priority: flash 1.5 -> pro 1.5 -> flash -> pro
                // AVOID 2.5 models as they have much stricter free-tier limits (e.g. 20 req/day)
                const best = data.models.find(m => m.name.includes('gemini-1.5-flash')) ||
                    data.models.find(m => m.name.includes('gemini-1.5-pro')) ||
                    data.models.find(m => m.name.includes('flash') && !m.name.includes('2.5')) ||
                    data.models.find(m => m.name.includes('pro') && !m.name.includes('2.5')) ||
                    data.models[0];
                this.selectedModel = best.name;
                console.log("Tactical AI: Using discovered model:", this.selectedModel);
            }
        } catch (e) {
            console.error("Model discovery failed:", e);
        }
    }

    toggleChat() {
        this.chatWindow?.classList.toggle('active');
        if (this.chatWindow?.classList.contains('active')) {
            this.input?.focus();
        }
    }

    async handleSendMessage() {
        const text = this.input.value.trim();
        if (!text || this.isProcessing) return;

        // Reset input
        this.input.value = '';

        // HIDDEN FEATURE: Intel Override Command
        if (text.startsWith('/sudo update intel')) {
            this.handleIntelOverride();
            return;
        }

        if (text === '/clear') {
            this.messagesContainer.innerHTML = '';
            this.resetDossier();
            localStorage.removeItem('vagish_ai_intel');
            this.addMessageToUI('ai', "[SYSTEM_RESET] :: Memory purged.");
            return;
        }

        this.isProcessing = true;
        this.sendBtn.disabled = true;

        // Add user message to UI
        this.addMessageToUI('user', text);

        // Add thinking indicator
        const thinkingMsg = document.createElement('div');
        thinkingMsg.id = 'ai-thinking';
        thinkingMsg.className = 'mr-8 bg-white/5 border border-white/10 p-3 rounded-lg text-xs font-mono text-accent-pink animate-pulse';
        thinkingMsg.innerHTML = `<span class="font-bold">ALPHA::</span> [NEURAL_PROCESSING...]`;
        this.messagesContainer.appendChild(thinkingMsg);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // Call OpenRouter API
        try {
            if (!this.apiKey) {
                thinkingMsg.remove();
                this.addMessageToUI('ai', "ERROR: [NEURAL_LINK_FAILED] - API_KEY_MISSING. Please configure your OpenRouter API key in script.js (get one from https://openrouter.ai) to enable real-time intelligence.");
                this.isProcessing = false;
                this.sendBtn.disabled = false;
                return;
            }

            this.history.push({
                role: "user",
                parts: [{ text: text }]
            });

            // Use OpenRouter's API format (OpenAI-compatible)
            // Convert Gemini history format to OpenAI chat format
            const messages = this.history.map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.parts[0].text
            }));

            // OpenRouter Payload (OpenAI-compatible format)
            const payload = {
                model: this.selectedModel || "mistral/mistral-7b-instruct",
                messages: messages,
                system: this.systemInstructions,
                max_tokens: 1000
            };

            const response = await fetch(`${this.baseApiUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || `STATUS_${response.status}`;
                throw new Error(`[API_REJECTED] - ${errorMessage}`);
            }

            const data = await response.json();
            thinkingMsg.remove();

            // Log full response for tactical diagnostics
            console.log("Tactical AI Debug Data:", data);

            if (!data.choices || data.choices.length === 0) {
                throw new Error("[NULL_RESPONSE] - AI returned an empty response.");
            }

            // Parse OpenRouter response (OpenAI format)
            const aiText = data.choices[0].message?.content || "[INTEL_REDACTED] - AI returned non-textual data.";

            // Add to Gemini-compatible history format for localStorage
            this.history.push({
                role: "model",
                parts: [{ text: aiText }]
            });

            this.addMessageToUI('ai', aiText);
            
            // Persist memory
            localStorage.setItem('vagish_ai_intel', JSON.stringify(this.history));
            
        } catch (error) {
            thinkingMsg?.remove();
            console.error("Tactical AI Error:", error);
            const detailedError = error.message.includes('API_REJECTED')
                ? `${error.message}. <br>Possible causes: <br>1. Invalid OpenRouter API key. <br>2. API key not configured properly. <br>3. Daily quota exceeded on OpenRouter.`
                : error.message;
            this.addMessageToUI('ai', `ERROR: [NEURAL_LINK_INTERRUPTED] - ${detailedError}`);
        } finally {
            this.isProcessing = false;
            this.sendBtn.disabled = false;
        }
    }

    addMessageToUI(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = role === 'user'
            ? 'ml-8 bg-accent-pink/10 border border-accent-pink/30 p-3 rounded-lg text-xs font-mono text-white message-anim self-end'
            : 'mr-8 bg-white/5 border border-white/10 p-3 rounded-lg text-xs font-mono text-gray-300 message-anim';

        const prefix = role === 'user' ? 'GUEST:: ' : 'ALPHA:: ';
        
        // Remove extreme markdown like triple backticks for chat UI clarity if needed
        let formattedText = text.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
        // Convert markdown bold to HTML for a tactical look
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>');

        msgDiv.innerHTML = `<span class="text-accent-pink font-bold">${prefix}</span> ${formattedText}`;

        this.messagesContainer.appendChild(msgDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // TACTICAL MEMORY: Save conversation history
        if (this.history.length > 2) {
            localStorage.setItem('vagish_ai_intel', JSON.stringify(this.history.slice(-10)));
        }

        // INTEL_FEEDBACK: Log questions for Vagish to "Train" the AI later
        if (role === 'user') {
            console.log(`[TACTICAL_LOG] Unanswered intel request recorded: "${text}"`);
        }

        return msgDiv;
    }

    // --- HIDDEN COMMAND FEATURE ---
    handleIntelOverride() {
        this.addMessageToUI('user', '/sudo update intel');
        this.addMessageToUI('ai', `<span class="text-secondary">[AUTHORIZATION GRANTED]</span> Awaiting raw JSON string or text block to append to core logic. Type '/cancel' to abort.`);
        
        // Temporarily override the enter key logic
        const overrideHandler = (e) => {
            if (e.key === 'Enter') {
                const newIntel = this.input.value.trim();
                this.input.value = '';
                
                if (newIntel === '/cancel') {
                    this.addMessageToUI('ai', '[OVERRIDE_ABORTED]');
                } else {
                    this.addMessageToUI('user', '[ENCRYPTED_DATA_PACKET]');
                    this.systemInstructions += `\n\nEMERGENCY OVERRIDE DATA: ${newIntel}`;
                    this.history.push({ role: "user", parts: [{ text: `Ingest new override data: ${newIntel}` }] });
                    this.history.push({ role: "model", parts: [{ text: "ACKNOWLEDGED. Core systems updated securely. All future responses will honor this Emergency Override." }] });
                    this.addMessageToUI('ai', '[CORE_UPDATED] New directives ingested successfully.');
                }
                
                // Cleanup override listener
                this.input.removeEventListener('keypress', overrideHandler);
            }
        };

        // Attach one-time override listener
        this.input.addEventListener('keypress', overrideHandler);
    }
}



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
    new TacticalAI();
    new ArchiveManager();
});
