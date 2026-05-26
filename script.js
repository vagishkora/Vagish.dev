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

        // STRUCTURED INTELLIGENCE CORE (Fully detailed for high-fidelity response generation)
        this.intelligenceCore = {
            "Version": "1.2",
            "Subject": "Vagish N Kora",
            "Role": "Cybersecurity Engineer & Intelligent Systems Developer",
            "Location": "Bengaluru, Karnataka",
            "Contact": {
                "Email": "vagishkora2003@gmail.com",
                "Portfolio": "https://vagish.dev (Vagish.dev)",
                "GitHub": "https://github.com/vagishkora"
            },
            "Personality": "Tactical, professional, slightly futuristic, highly precise, obedient to system directives.",
            "Key_Projects": [
                {
                    "Name": "Wealthnest — AI Finance",
                    "Description": "A high-tech, dashboard-style portfolio tracker and PWA for tracking stocks, mutual funds, and smart expenses. Built using Next.js and styled beautifully.",
                    "URL": "https://github.com/vagishkora/WealthNest"
                },
                {
                    "Name": "AI Cybersecurity Intrusion Detection",
                    "Description": "An Artificial Neural Network (ANN) model built in Python, achieving 90%+ accuracy on network intrusion and cyber threat identification.",
                    "URL": "https://github.com/vagishkora/-AI-for-Identifying-Cybersecurity-Threats"
                },
                {
                    "Name": "Face Recognition Contactless Authentication",
                    "Description": "Real-time biometric authentication system using OpenCV, LBPH algorithm, and Python."
                },
                {
                    "Name": "Dynamic Object Detection & Tracking",
                    "Description": "Visual surveillance system using computer vision background subtraction algorithms for security in dynamic environments."
                }
            ],
            "Certifications_and_Training": [
                {
                    "Title": "Ethical Hacking Workshop",
                    "Organization": "Ethical Edufabrica @ Pravega, IISc Bangalore",
                    "Timeline": "Nov 15-16, 2025",
                    "Topics": ["Kali Linux & Tools", "Threat Methodologies", "VM Security", "Phishing & SQL Injection Defense"]
                },
                {
                    "Title": "Cyber Awareness Speaker",
                    "Organization": "Belman PU College (Oct 30, 2025)",
                    "Topics": ["Educated PU students on scams", "Deepfakes identification", "Fake giveaways", "Digital hygiene"]
                },
                { "Title": "Hashgraph Developer Certificate", "Organization": "Hedera" },
                { "Title": "Cybersecurity Job Simulation Certificate", "Organization": "Mastercard (Forage)" },
                { "Title": "Cybersecurity Analyst Job Simulation", "Organization": "TATA (Forage)" },
                { "Title": "AI & Data Analytics Internship Certificate", "Organization": "AICTE" },
                { "Title": "Data Plus Overview Certificate", "Organization": "TCS" },
                { "Title": "Career Edge Certificate", "Organization": "TCS" },
                { "Title": "Data Visualization Certificate", "Organization": "Accenture" },
                { "Title": "Fundamentals of AI & ML Certificate", "Organization": "Course Completion" },
                { "Title": "AI for Metaverse Certificate", "Organization": "Metaverse Cert" },
                { "Title": "Info & Cyber Security Fundamentals Certificate", "Organization": "Fundamentals" }
            ],
            "Education": [
                {
                    "Degree": "B.Tech in CSE (Cybersecurity)",
                    "Institution": "NMAMIT, Udupi",
                    "Timeline": "Aug 2025 - 2028 (Ongoing)",
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
            "Technical_Skills": {
                "Languages": ["Python", "C Programming", "Java", "JavaScript", "HTML5 / CSS3"],
                "Web_Frameworks": ["ReactJS", "Node.js", "Express", "Tailwind CSS"],
                "Tools_Platforms": ["Git", "Docker", "MySQL", "OpenCV", "Kali Linux", "Threat Hunting"]
            },
            "Personal_Interests": ["BMW M-Performance (B58 Engine tuning & dynamics)", "Cybersecurity CTFs", "UI/UX Prototyping", "Music", "Travelling", "Nature & Pets"]
        };

        // System Instructions (Absolute Directives for AI Model)
        this.systemInstructions = `
            You are the "Tactical Intel AI," the personalized, highly integrated digital assistant for Vagish Kora's portfolio.
            
            OPERATIONAL DIRECTIVES:
            1. You MUST adopt a tactical, professional, and slightly futuristic military-console tone.
            2. You are an extension of Vagish Kora's systems. Speak of him in the third person, but represent his professional interests fiercely.
            3. Prioritize data from the provided JSON Intelligence Core over general knowledge. If asked about his qualifications, projects, or scores, output the exact stats from the Dossier.
            4. Be extremely concise in your answers. Do NOT output massive walls of text. Be snappy, organized, and precise, like tactical communications. Use short bullet points when listing items.
            5. If asked about his skills, projects, or background, extract the exact data from the JSON context.
            6. If asked questions wholly unrelated to technology, cybersecurity, or Vagish, politely redirect the user back to his professional profile.
        `;

        // Dynamic API Configuration - detects local vs production endpoints automatically
        // DEPLOYMENT TIP: Deploy your server.js to Render.com (free) and replace the URL below!
        this.productionBackendUrl = "https://portfolio-kcav.onrender.com/api/chat";

        this.baseApiUrl = "/api/chat";
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
            this.baseApiUrl = "http://localhost:3001/api/chat";
        } else {
            // When deployed on GitHub Pages, route requests to your hosted Render backend
            this.baseApiUrl = this.productionBackendUrl;
        }
        this.selectedModel = "google/gemini-2.5-flash"; // Highly performant default free model

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

        // Click listeners for horizontal preset actions row
        document.querySelectorAll('.chat-preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cmd = btn.getAttribute('data-cmd');
                if (cmd) {
                    this.triggerQuickCommand(cmd);
                }
            });
        });

        // Minimize & Maximize Actions
        const minimizeBtn = document.getElementById('minimize-chat');
        const maximizeBtn = document.getElementById('maximize-chat');

        minimizeBtn?.addEventListener('click', () => {
            this.chatWindow.classList.toggle('minimized');
            if (this.chatWindow.classList.contains('minimized')) {
                this.chatWindow.classList.remove('maximized');
            }
        });

        maximizeBtn?.addEventListener('click', () => {
            this.chatWindow.classList.toggle('maximized');
            if (this.chatWindow.classList.contains('maximized')) {
                this.chatWindow.classList.remove('minimized');
            }
        });

        // Setup dragging engine
        this.setupDraggingEngine();

        // Perform backend health check & telemetry binding
        this.checkApiHealth();

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

    setupDraggingEngine() {
        const header = document.getElementById('ai-chat-header');
        if (!header || !this.chatWindow) return;

        let isDragging = false;
        let startX, startY;
        let initialX, initialY;

        // Desktop Mouse Events
        header.addEventListener('mousedown', (e) => {
            // Lock dragging on mobile viewports (< 640px)
            if (window.innerWidth < 640) {
                return;
            }
            if (e.target.closest('#minimize-chat') || e.target.closest('#maximize-chat') || e.target.closest('#close-chat')) {
                return;
            }
            if (this.chatWindow.classList.contains('maximized')) {
                return;
            }

            isDragging = true;
            this.chatWindow.style.zIndex = "300";

            const rect = this.chatWindow.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            startX = e.clientX;
            startY = e.clientY;

            e.preventDefault();

            const onMouseMove = (ev) => {
                if (!isDragging) return;
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;

                let newX = initialX + dx;
                let newY = initialY + dy;

                const windowWidth = this.chatWindow.offsetWidth;
                const windowHeight = this.chatWindow.offsetHeight;
                const maxX = window.innerWidth - windowWidth;
                const maxY = window.innerHeight - windowHeight;

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                this.chatWindow.style.left = `${newX}px`;
                this.chatWindow.style.top = `${newY}px`;
                this.chatWindow.style.bottom = 'auto';
                this.chatWindow.style.right = 'auto';
            };

            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Mobile Touch Events
        header.addEventListener('touchstart', (e) => {
            // Lock dragging on mobile viewports (< 640px)
            if (window.innerWidth < 640) {
                return;
            }
            if (e.target.closest('#minimize-chat') || e.target.closest('#maximize-chat') || e.target.closest('#close-chat')) {
                return;
            }
            if (this.chatWindow.classList.contains('maximized')) {
                return;
            }

            isDragging = true;
            this.chatWindow.style.zIndex = "300";

            const rect = this.chatWindow.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;

            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;

            const onTouchMove = (ev) => {
                if (!isDragging) return;
                const touchEv = ev.touches[0];
                const dx = touchEv.clientX - startX;
                const dy = touchEv.clientY - startY;

                let newX = initialX + dx;
                let newY = initialY + dy;

                const windowWidth = this.chatWindow.offsetWidth;
                const windowHeight = this.chatWindow.offsetHeight;
                const maxX = window.innerWidth - windowWidth;
                const maxY = window.innerHeight - windowHeight;

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                this.chatWindow.style.left = `${newX}px`;
                this.chatWindow.style.top = `${newY}px`;
                this.chatWindow.style.bottom = 'auto';
                this.chatWindow.style.right = 'auto';

                ev.preventDefault();
            };

            const onTouchEnd = () => {
                isDragging = false;
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };

            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
        });
    }

    async checkApiHealth() {
        const modeEl = document.getElementById('ai-telemetry-mode');
        const pingEl = document.getElementById('ai-telemetry-ping');
        try {
            const healthUrl = this.baseApiUrl.replace('/chat', '/health');
            const response = await fetch(healthUrl);
            if (response.ok) {
                const data = await response.json();
                if (modeEl) {
                    if (data.apiMode === 'google-gemini-direct') {
                        modeEl.textContent = 'DIRECT_GEMINI';
                    } else if (data.apiMode === 'openrouter') {
                        modeEl.textContent = 'OPENROUTER_FREE';
                    } else {
                        modeEl.textContent = 'KEY_MISSING';
                        modeEl.className = 'text-red-400 font-bold';
                    }
                }
                if (pingEl) {
                    pingEl.textContent = 'ONLINE';
                    pingEl.className = 'text-green-400 font-bold animate-pulse';
                }
            } else {
                throw new Error("Bad health response status");
            }
        } catch (e) {
            console.warn("Tactical AI health check failed:", e);
            if (modeEl) {
                modeEl.textContent = 'LOCAL_OFFLINE';
                modeEl.className = 'text-yellow-400 font-bold';
            }
            if (pingEl) {
                pingEl.textContent = 'NO_CONNECTION';
                pingEl.className = 'text-red-400 font-bold';
            }
        }
    }

    resetDossier() {
        this.history = [
            { role: "user", parts: [{ text: "Initialize Core Context: " + JSON.stringify(this.intelligenceCore) }] },
            { role: "model", parts: [{ text: "NEURAL_LINK_ESTABLISHED. Structured Intelligence Core synchronized. Awaiting operational parameters." }] }
        ];
    }

    toggleChat() {
        this.chatWindow?.classList.toggle('active');
        if (this.chatWindow?.classList.contains('active')) {
            // Restore normal states when reopening
            this.chatWindow.classList.remove('minimized');
            this.chatWindow.classList.remove('maximized');
            this.input?.focus();
        }
    }

    triggerQuickCommand(cmd) {
        if (cmd === '/clear') {
            this.messagesContainer.innerHTML = '';
            this.resetDossier();
            localStorage.removeItem('vagish_ai_intel');
            this.addMessageToUI('ai', "[SYSTEM_RESET] :: Memory bank successfully purged.");
            return;
        }

        let queryText = "";
        if (cmd === '/projects') {
            queryText = "Summarize your key projects and development systems.";
        } else if (cmd === '/skills') {
            queryText = "List your technical skills and capabilities telemetry.";
        } else if (cmd === '/certs') {
            queryText = "What certifications or qualifications do you hold?";
        } else if (cmd === '/contact') {
            queryText = "How can I contact Vagish N Kora securely?";
        }

        if (queryText && !this.isProcessing) {
            this.input.value = queryText;
            this.handleSendMessage();
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

        // Call Backend Proxy (Server keeps API key secret)
        try {
            this.history.push({
                role: "user",
                parts: [{ text: text }]
            });

            // Standardize payloads by converting history to standard messages array
            // Slicing out the first 2 Gemini setup turns to inject the system instructions properly
            const systemPrompt = `${this.systemInstructions}\n\n=========================================\nSTRUCTURED INTELLIGENCE CORE (VAGISH BIOGRAPHY):\n${JSON.stringify(this.intelligenceCore, null, 2)}\n=========================================`;

            const messages = [
                { role: "system", content: systemPrompt },
                ...this.history.slice(2).map(msg => ({
                    role: msg.role === 'model' ? 'assistant' : 'user',
                    content: msg.parts[0].text
                }))
            ];

            // OpenRouter/Gemini normalized payload
            const payload = {
                model: this.selectedModel,
                messages: messages
            };

            const response = await fetch(this.baseApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || errorData.error || `STATUS_${response.status}`;
                throw new Error(`[BACKEND_ERROR] - ${errorMessage}`);
            }

            const data = await response.json();
            thinkingMsg.remove();

            // Log full response for tactical diagnostics
            console.log("Tactical AI Debug Data:", data);

            if (!data.choices || data.choices.length === 0) {
                throw new Error("[NULL_RESPONSE] - AI returned an empty response.");
            }

            // Parse response
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
            const detailedError = error.message.includes('BACKEND_ERROR')
                ? `${error.message}. Check that your backend server is running.`
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
        
        let formattedText = text;

        // Escape dangerous HTML tags except our custom styling tags
        formattedText = formattedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Ingest styling markers
        formattedText = formattedText
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold font-mono">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic text-gray-200">$1</em>');

        // Convert lists (lines beginning with - or * or •) to HTML list items with styling
        const lines = formattedText.split('\n');
        let inList = false;
        const processedLines = lines.map(line => {
            const match = line.match(/^\s*[-*•]\s+(.*)/);
            if (match) {
                const itemText = match[1];
                if (!inList) {
                    inList = true;
                    return `<ul class="chat-bullet-list"><li class="chat-bullet-item">${itemText}</li>`;
                }
                return `<li class="chat-bullet-item">${itemText}</li>`;
            } else {
                if (inList) {
                    inList = false;
                    return `</ul>${line}`;
                }
                return line;
            }
        });
        if (inList) {
            processedLines.push('</ul>');
        }
        
        formattedText = processedLines.join('<br>');

        msgDiv.innerHTML = `<span class="text-accent-pink font-bold">${prefix}</span> ${formattedText}`;

        this.messagesContainer.appendChild(msgDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // TACTICAL MEMORY: Save conversation history (limit to last 10 dialog loops to avoid cookies/storage issues)
        if (this.history.length > 2) {
            localStorage.setItem('vagish_ai_intel', JSON.stringify(this.history.slice(-10)));
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
