import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
