import { createContext, useContext, useState } from 'react';

interface AuthContextInterface {
  ctaText: 'Sign in' | 'Sign up';
  changeText: () => void;
}
const AuthContext = createContext<AuthContextInterface>({
  ctaText: 'Sign up',
  changeText: () => {},
});

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [animating, setAnimating] = useState(false);
  const [ctaText, setCtaText] =
    useState<AuthContextInterface['ctaText']>('Sign up');

  const requestAnimFrame = (callback: TimerHandler) => {
    window.setTimeout(callback, 1000 / 60);
  };

  const changeText = () => {
    const authContainer = document.getElementById('authContainer');
    if (animating) return;

    authContainer?.classList.add('active');
    setAnimating(true);

    setTimeout(() => {
      requestAnimFrame(() => {});
    });
    setTimeout(() => {
      requestAnimFrame(() => {
        setAnimating(false);
        authContainer?.classList.remove('active');
        authContainer?.classList.toggle('reverse');
        ctaText === 'Sign in' ? setCtaText('Sign up') : setCtaText('Sign in');
      });
    }, 680);
  };

  return (
    <AuthContext.Provider
      value={{
        changeText,
        ctaText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
