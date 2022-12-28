import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

type Props = {
  placeholder: string;
  type: string;
  autocomplete?: boolean;
};

const Input = React.forwardRef(
  (
    {
      placeholder,
      name,
      onChange,
      type = 'text',
      autocomplete = 'off',
    }: Props & ReturnType<UseFormRegister<{}>>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        autoComplete={autocomplete}
        className={styles.input}
        ref={ref}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

export default Input;
