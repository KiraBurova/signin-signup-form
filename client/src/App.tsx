import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Outlet />
      <ToastContainer autoClose={800} />
    </div>
  );
};

export default App;
