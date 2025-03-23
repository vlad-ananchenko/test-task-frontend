import { ReactElement, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import styles from './DashboardLayout.module.css';
import TableDataPage from '../../pages/TableDataPage';

const DashboardLayout = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const handleOverlayClick = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      {!open && (
        <button
          onClick={toggleDrawer}
          className={styles.hamburgerButton}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      )}

      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        onClick={handleOverlayClick}
      />

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <ul className={styles.navList}>
          <li className={styles.listItem}>
            <NavLink
              to="/admin/table-data"
              onClick={toggleDrawer}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Table Data
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route
            path="*"
            element={<TableDataPage />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
