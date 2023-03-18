import { createContext, useContext, useState } from 'react';
import styles from './Toast.module.css';

interface EmailModalContextInterface {
    setToast: (_: string | undefined | null) => void;
}
const ToastContext = createContext<EmailModalContextInterface>({
    setToast: (_: string | undefined | null) => { },
});

interface ToastWrapperProps {
    children: React.ReactNode;
}

export const ToastWrapper = ({ children }: ToastWrapperProps) => {
    const [toast, setToast] = useState<string | undefined | null>()
    return (
        <ToastContext.Provider
            value={{
                setToast,
            }}
        >
            {toast && <div className={styles.errorWrapper}>{toast}</div>}
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
