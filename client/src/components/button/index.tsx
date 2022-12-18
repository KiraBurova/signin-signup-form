import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  disabled: boolean;
};

const Button = ({ children, disabled }: Props) => {
  return (
    <button className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
