import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

type Props = {
  placeholder: string;
};

const Input = React.forwardRef(
  (
    { placeholder, name, onChange }: Props & ReturnType<UseFormRegister<{}>>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        className={styles.input}
        ref={ref}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

export default Input;
