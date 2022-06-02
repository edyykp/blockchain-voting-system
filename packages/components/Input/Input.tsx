import { useState } from 'react';
import styles from './Input.module.css';

type InputProps = {
  field: 'email' | 'password';
  type: 'text' | 'password';
  isRequired: boolean;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Input = ({ field, type, isRequired }: InputProps) => {
  const [isFilled, setIsFilled] = useState(false);

  return (
    <div className={styles.container}>
      <input
        type={type}
        id={field}
        className={styles.input}
        autoComplete="off"
        placeholder={`Enter your ${field}`}
        required={isRequired}
        onChange={(event) =>
          event.target.value === '' ? setIsFilled(false) : setIsFilled(true)
        }
      />
      <label
        className={`${styles.label} ${isFilled ? styles.filled : ''}`}
        htmlFor={field}
      >
        {capitalizeFirstLetter(field)}
      </label>
    </div>
  );
};
