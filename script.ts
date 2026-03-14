// [NOTE] This file would ideally be compiled by tsc. 
// For this environment, I will ensure the content is valid JS as well so it runs in browser directly if renamed, 
// or I will provide manual compilation to script.js.

// Configuration
const CONFIG = {
    animationThreshold: 0.1,
    scrollOffset: 100
};

// --- Theme Toggle Logic ---
class ThemeManager {
    private toggleBtn: HTMLElement | null;
    private html: HTMLElement;
    private sunIcon: HTMLElement | null;
    private moonIcon: HTMLElement | null;

    constructor() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.sunIcon = document.getElementById('sun-icon');
        this.moonIcon = document.getElementById('moon-icon');

        this.init();
    }

    private init(): void {
        this.toggleBtn?.addEventListener('click', () => this.toggleTheme());

        // Check local storage or system preference could go here
    }

    private toggleTheme(): void {
        const isDark = this.html.classList.toggle('dark');

        // Simple Icon Toggle
        if (isDark) {
            this.sunIcon?.classList.add('hidden');
            this.moonIcon?.classList.remove('hidden');
        } else {
            this.sunIcon?.classList.remove('hidden');
            this.moonIcon?.classList.add('hidden');
            // In light mode, override some colors if needed by tailwind classes
        }
    }
}

// --- Scroll Animations (Intersection Observer) ---
class ScrollAnimator {
    private observer: IntersectionObserver;

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

    private init(): void {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => this.observer.observe(el));
    }
}

// --- Contact Form Handler ---
class FormHandler {
    private form: HTMLFormElement | null;
    private btn: HTMLButtonElement | null;
    private loadingIcon: HTMLElement | null;
    private sendIcon: HTMLElement | null;

    constructor() {
        this.form = document.getElementById('contact-form') as HTMLFormElement;
        this.btn = this.form?.querySelector('button[type="submit"]') as HTMLButtonElement;
        this.loadingIcon = document.getElementById('loading-icon');
        this.sendIcon = document.getElementById('send-icon');

        this.init();
    }

    private init(): void {
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        // Start Loading
        this.setLoading(true);

        // Simulate Network Request
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success State
        this.setLoading(false);
        alert('Message sent successfully! (Simulation)');
        this.form?.reset();
    }

    private setLoading(isLoading: boolean): void {
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

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ScrollAnimator();
    new FormHandler();
    initGalaxy();
});

// Galaxy Constellation Logic
function initGalaxy() {
    const galaxy = document.getElementById('cert-galaxy');
    if (!galaxy) return;

    const stars = galaxy.querySelectorAll('.star');

    // Mouse Parallax
    galaxy.addEventListener('mousemove', (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = galaxy.getBoundingClientRect();

        // Calculate center-based coordinates (-1 to 1)
        const xVal = (clientX - left) / width - 0.5;
        const yVal = (clientY - top) / height - 0.5;

        stars.forEach((star: any) => {
            const depth = parseFloat(star.getAttribute('data-depth') || '1');
            const moveX = xVal * 50 * depth; // Max movement determined by depth
            const moveY = yVal * 50 * depth;

            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Reset on mouse leave
    galaxy.addEventListener('mouseleave', () => {
        stars.forEach((star: any) => {
            star.style.transform = `translate(0px, 0px)`;
        });
    });

    // Handle Star Clicks
    stars.forEach((star: any) => {
        star.addEventListener('click', () => {
            const link = star.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });
    });
}
