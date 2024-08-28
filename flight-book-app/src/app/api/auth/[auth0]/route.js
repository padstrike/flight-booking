import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/booking-detail",  // Specify the redirect URL after login
  }),
});
