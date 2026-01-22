// @ts-ignore
const animeLib = require('animejs');
const anime = animeLib.default || animeLib;

// Helper to force visibility on error
const forceVisible = (selector: string) => {
    try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'none';
        });
    } catch (e) {
        console.error("Force visible error:", e);
    }
};

// Entry animation for lists (staggered fade-in + slide-up)
export const animateListEntry = (selector: string, delay: number = 0) => {
    try {
        anime({
            targets: selector,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100, { start: delay }),
            easing: 'easeOutQuad',
            duration: 800,
        });
    } catch (e) {
        console.error("Animation error:", e);
        forceVisible(selector);
    }
};

// Hero text reveal animation
export const animateHeroText = (selector: string, delay: number = 0) => {
    try {
        anime({
            targets: selector,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: delay,
            easing: 'easeOutExpo',
            duration: 1200,
        });
    } catch (e) {
        console.error("Animation error:", e);
        forceVisible(selector);
    }
};

// Card hover effect (scale + shadow)
export const animateCardHover = (element: HTMLElement, scale: number = 1.02) => {
    try {
        anime({
            targets: element,
            scale: scale,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 300,
            easing: 'easeOutQuad',
        });
    } catch (e) {
        console.error("Animation error:", e);
        // No need to force visible on hover error, just ignore
    }
};

// Card hover exit
export const animateCardLeave = (element: HTMLElement) => {
    try {
        anime({
            targets: element,
            scale: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            duration: 300,
            easing: 'easeOutQuad',
        });
    } catch (e) {
        console.error("Animation error:", e);
    }
};
