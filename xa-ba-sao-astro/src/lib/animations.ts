import { animate, stagger } from 'animejs';

export function animateHeroText(selector: string, delay: number = 0) {
    if (typeof window === 'undefined') return;

    animate(selector, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100, { start: delay }),
        easing: 'easeOutQuad',
        duration: 600,
    });
}

export function animateListEntry(selector: string, delay: number = 0) {
    if (typeof window === 'undefined') return;

    animate(selector, {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(80, { start: delay }),
        easing: 'easeOutCubic',
        duration: 500,
    });
}

export function animateCardHover(element: HTMLElement) {
    if (typeof window === 'undefined') return;

    animate(element, {
        scale: 1.02,
        duration: 300,
        easing: 'easeOutQuad',
    });
}

export function animateCardLeave(element: HTMLElement) {
    if (typeof window === 'undefined') return;

    animate(element, {
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad',
    });
}
