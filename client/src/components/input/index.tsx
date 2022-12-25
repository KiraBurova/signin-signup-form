import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

type Props = {
  placeholder: string;
  type: string;
};

const Input = React.forwardRef(
  (
    {
      placeholder,
      type = 'text',
      name,
      onChange,
    }: Props & ReturnType<UseFormRegister<{}>>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
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
