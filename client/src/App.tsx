import { Outlet } from 'react-router-dom';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  );
}

export default App;
