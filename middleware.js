export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/flights/:path*', '/preferences/:path*', '/reserves/:path*', '/profile/:path*'] //PROTECT PATHS UNAUTHENTICATE
}