import { init } from 'next-firebase-auth';

console.log(process.env.HOSTNAME);
export const initAuth = () => {
  init({
    authPageURL: '/',
    appPageURL: '/dashboard',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'voting-system-cca07',
        clientEmail:
          'firebase-adminsdk-4i011@voting-system-cca07.iam.gserviceaccount.com',
        privateKey:
          process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
      },
      databaseURL: 'https://voting-system-cca07-default-rtdb.firebaseio.com',
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyD9sUbajIjQUxJxNheqHH2h4sZnxWW5Kp0',
      authDomain: process.env.HOSTNAME,
      projectId: 'voting-system-cca07',
      storageBucket: 'voting-system-cca07.appspot.com',
    },
    cookies: {
      name: 'authCookie',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};
