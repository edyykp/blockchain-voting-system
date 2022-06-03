import { createContext, useContext, useState } from 'react';

interface AuthContextInterface {
  ctaText: 'Sign in' | 'Register';
  changeText: () => void;
}
const AuthContext = createContext<AuthContextInterface>({
  ctaText: 'Sign in',
  changeText: () => {},
});

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [ctaText, setCtaText] =
    useState<AuthContextInterface['ctaText']>('Sign in');

  const changeText = () => {
    ctaText === 'Sign in' ? setCtaText('Register') : setCtaText('Sign in');
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
