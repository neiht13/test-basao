import { defineMiddleware } from 'astro:middleware';
import { auth } from '@/lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
    // Protect admin routes
    if (context.url.pathname.startsWith('/admin')) {
        try {
            const session = await auth.api.getSession({
                headers: context.request.headers
            });

            if (!session) {
                return context.redirect('/login');
            }
        } catch (error) {
            return context.redirect('/login');
        }
    }

    return next();
});
