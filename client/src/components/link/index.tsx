import { Link as RouterLink } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  link: string;
  children: React.ReactNode;
};

const Link = ({ link, children }: Props) => {
  return (
    <RouterLink className={styles.link} to={link}>
      {children}
    </RouterLink>
  );
};

export default Link;
